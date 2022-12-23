export interface CompleteOrderRequest {
    paymentId: string;
    orderId: string;
    paymentTypeId: number;
    companyId: number;
    createdBy: number;
    createdTime: Date;
    modifiedBy: number;
    modifiedTime: Date;
}