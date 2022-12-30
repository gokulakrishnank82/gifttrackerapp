export interface BulkuploadHistory {
    employeeHeaderId: number;
    companyId: string;
    fileName: string;
    importedCount: number;
    successCount: number;
    failedCount: number;
    createdBy: number;
    createdTime: Date;
    modifiedBy: number;
    modifiedTime: Date;
    uploadedBy:string;
    uploadedDate:Date;
}