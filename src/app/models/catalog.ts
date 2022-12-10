export interface Catalog {
    catalogId: number;
    catalogName: string;
    catalogTypeId: number;
    catalogType: string;
    fileDetails: any;
    createdBy: number;
    createdTime: Date;
    modifiedBy: number;
    modifiedTime: Date;
}