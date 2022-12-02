export interface Role {
    roleId: number;
    roleName: string;
    active: boolean;
    createdBy: number;
    createdTime: Date;
    modifiedBy: number;
    modifiedTime: Date;
}