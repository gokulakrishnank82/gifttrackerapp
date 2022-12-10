export interface EmployeeAddFunds {
    companyId: number;
    employeeId:number;
    perkTypeIsIndividual:string;
    perkValue:number;
    comment:string;
    createdBy: string;
}