export interface PaymentType {
    paymentTypeId: number;
    paymentTypeName: string;
    active: boolean;
    createdBy: number;
    createdTime: Date;
    modifiedBy: number;
    modifiedTime: Date;
}