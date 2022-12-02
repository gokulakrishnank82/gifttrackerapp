export interface Company {
    companyId: number;
    companyName: string;
    address: string;
    email: string;
    contactNumber: string;
    website: string;
    businessTypeId: number;
    businessTypeName: string;
    totalAvailableFund:number;
    active: boolean;
    createdBy: number;
    createdTime: Date;
    modifiedBy: number;
    modifiedTime: Date;
}