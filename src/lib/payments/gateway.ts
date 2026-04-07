// Abstract payment gateway interface — pluggable implementations

export interface PaymentRequest {
  registrationId: string;
  referenceNumber: string;
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
  customerName: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface PaymentResult {
  success: boolean;
  gatewaySessionId?: string;
  paymentUrl?: string;
  error?: string;
}

export interface PaymentGateway {
  name: string;
  createPayment(request: PaymentRequest): Promise<PaymentResult>;
  verifyWebhook(body: string, signature: string): Promise<boolean>;
  getPaymentStatus(sessionId: string): Promise<"pending" | "completed" | "failed">;
}

// Bank Transfer "gateway" — generates a reference and instructions
class BankTransferGateway implements PaymentGateway {
  name = "Bank Transfer";

  async createPayment(request: PaymentRequest): Promise<PaymentResult> {
    return {
      success: true,
      gatewaySessionId: `BT-${request.referenceNumber}`,
    };
  }

  async verifyWebhook(): Promise<boolean> {
    return false; // Bank transfers are confirmed manually
  }

  async getPaymentStatus(): Promise<"pending" | "completed" | "failed"> {
    return "pending"; // Always pending until admin confirms
  }
}

// Singleton gateway instance — replace with BML gateway when available
let activeGateway: PaymentGateway = new BankTransferGateway();

export function setPaymentGateway(gateway: PaymentGateway) {
  activeGateway = gateway;
}

export function getPaymentGateway(): PaymentGateway {
  return activeGateway;
}
