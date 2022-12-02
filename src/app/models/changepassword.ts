export interface ChangePassword {
    employeeId: number;
    currentPassword: string;
    newPassword: string;
    modifiedBy: number;
    modifiedTime: Date;
}