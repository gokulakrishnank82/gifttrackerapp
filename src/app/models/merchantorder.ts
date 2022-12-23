export interface MerchantOrder {
    orderId: number;
    razorpayKey: string;
    amount: number;
    currency: string;
    name:string;
    email:string;
    phoneNumber:string;
    address:string;
    description:string
}