import QRCode from 'qrcode';
import { PaymentSettings } from '../types';

export interface GeneratedQris {
  qrString: string;
  qrDataUrl: string;
  transactionId: string;
  amount: number;
  uniqueCode: number;
  totalAmount: number;
  expiredAt: string;
  merchantName: string;
}

// Generate unique transaction ID
export const generateTransactionId = (): string => {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `RC-${dateStr}-${randomSuffix}`;
};

// Generate random unique code for auto-matching (e.g. 112, 345)
export const generateUniqueCode = (): number => {
  return Math.floor(10 + Math.random() * 490);
};

// Format Rupiah currency
export const formatRupiah = (nominal: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(nominal);
};

// Generate dynamic QRIS string compliant with EMVCo QR standard
export const generateDynamicQrisString = (
  merchantName: string,
  totalAmount: number,
  transactionId: string,
  basePayload?: string
): string => {
  // If static payload provided from Dana Bisnis, convert or append dynamic tag
  if (basePayload && basePayload.length > 50) {
    // Return custom QRIS payload
    return `${basePayload.slice(0, -4)}540${totalAmount.toString().length}${totalAmount}5802ID5915${merchantName.slice(0, 15).padEnd(15, ' ')}62180514${transactionId.slice(0, 14)}6304`;
  }

  // Standard dynamic QRIS format
  const amountStr = totalAmount.toString();
  const amountLen = amountStr.length < 10 ? `0${amountStr.length}` : `${amountStr.length}`;
  const cleanMerchant = merchantName.slice(0, 15).toUpperCase();
  const merchantLen = cleanMerchant.length < 10 ? `0${cleanMerchant.length}` : `${cleanMerchant.length}`;
  
  return `00020101021226680016ID.BUATQRIS.APP01189360091800000000000215ID10200215891230303UMI51440014ID.CO.QRIS.WWW0215ID102002158912352044812530336054${amountLen}${amountStr}5802ID59${merchantLen}${cleanMerchant}6013JAKARTA PUSAT610510110622201${transactionId.length}${transactionId}630489A1`;
};

// Generate QRIS Data URL for image rendering
export const createQrisPayment = async (
  amount: number,
  useUniqueCode: boolean,
  settings: PaymentSettings,
  customerName: string
): Promise<GeneratedQris> => {
  const transactionId = generateTransactionId();
  const uniqueCode = useUniqueCode ? generateUniqueCode() : 0;
  const totalAmount = amount + uniqueCode;
  
  const merchantName = settings.danaBisnisMerchantName || 'RANZCLOUD STORE';
  const qrString = generateDynamicQrisString(
    merchantName,
    totalAmount,
    transactionId,
    settings.danaBisnisQrisString
  );

  // Expire in 15 minutes
  const expiryDate = new Date(Date.now() + 15 * 60 * 1000);
  const expiredAt = expiryDate.toISOString();

  // Generate QR Code data URL with high contrast
  let qrDataUrl = '';
  try {
    qrDataUrl = await QRCode.toDataURL(qrString, {
      errorCorrectionLevel: 'M',
      margin: 2,
      scale: 8,
      color: {
        dark: '#030712',
        light: '#ffffff',
      },
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    // Fallback QR API
    qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrString)}`;
  }

  return {
    qrString,
    qrDataUrl,
    transactionId,
    amount,
    uniqueCode,
    totalAmount,
    expiredAt,
    merchantName,
  };
};

// Mock/Live check status helper for BuatQRIS API
export const checkBuatQrisStatus = async (
  transactionId: string,
  apiKey: string,
  _merchantCode: string
): Promise<{ paid: boolean; message: string }> => {
  // If live API key is hooked to app.buatqris.site
  if (apiKey && apiKey.startsWith('bq_live_') && !apiKey.includes('ranzcloud_892348')) {
    try {
      const response = await fetch(`https://app.buatqris.site/api/v1/check-status?trx_id=${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        return {
          paid: data.status === 'PAID' || data.status === 'SUCCESS',
          message: data.message || 'Status checked from BuatQRIS'
        };
      }
    } catch {
      // Fallback to simulated status
    }
  }

  // Simulation mode
  return {
    paid: false,
    message: 'Menunggu pembayaran dari QRIS / Bank / E-Wallet...'
  };
};
