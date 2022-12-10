export interface CompanyFundTransaction {
    companyFundTransactionId: number;
    companyId:number;
    companyName:string;
    amount: number;
    paymentTypeId: number;
    modeOfPayment: string;
    createdBy: number;
    createdTime: Date;
    modifiedBy: number;
    modifiedTime: Date;
    addedBy: string;
    addedDate: Date;
}