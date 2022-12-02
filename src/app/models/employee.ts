export interface Employee {
    employeeId: number;
    employeeNumber:number;
    employeeName: string;
    email: string;
    mobileNumber: string;
    companyId: number;
    companyName: string;
    password:string;
    designation:string;
    isPasswordChange:boolean;
    roleId: number;
    roleName: string;
    moneyBalance: number;
    perkValue: number;
    active:boolean;
    createdBy: number;
    createdTime: Date;
    modifiedBy: number;
    modifiedTime: Date;
}