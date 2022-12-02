export interface CompanyContact {
    companyContactId: number;
    companyId:number;
    companyName:string;
    productId:number;
    productName:string;
    contactName: string;
    email: string;
    contactNumber: string;
    alternateNumber: string;
    createdBy: number;
    createdTime: Date;
    modifiedBy: number;
    modifiedTime: Date;
}