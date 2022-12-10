export interface EmployeeOrder {
    employeeOrderId: number;
    employeeId:number;
    catalogId:number;
    cardValue:number;
    quantity:number;
    total: number;
    deliveryMode: string;
    createdBy: number;
    createdTime: Date;
    modifiedBy: number;
    modifiedTime: Date;
}