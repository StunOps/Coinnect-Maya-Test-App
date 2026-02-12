import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src', 'data');
const paymentStatusFile = path.join(dataDir, 'payment_status.json');
const pendingTransactionFile = path.join(dataDir, 'pending_transaction.json');

export function savePaymentStatus(data: any) {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(paymentStatusFile, JSON.stringify(data, null, 2));
}

export function getPaymentStatus() {
    if (!fs.existsSync(paymentStatusFile)) {
        return { status: 'waiting' };
    }
    try {
        const data = fs.readFileSync(paymentStatusFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { status: 'waiting' };
    }
}

// Store pending transaction details (phone, amount, fee) from the frontend
export function savePendingTransaction(data: any) {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(pendingTransactionFile, JSON.stringify(data, null, 2));
}

export function getPendingTransaction() {
    if (!fs.existsSync(pendingTransactionFile)) {
        return null;
    }
    try {
        const data = fs.readFileSync(pendingTransactionFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}

export function clearPendingTransaction() {
    if (fs.existsSync(pendingTransactionFile)) {
        fs.unlinkSync(pendingTransactionFile);
    }
}
