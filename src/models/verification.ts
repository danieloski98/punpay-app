export enum STATUS {
    PENDING = 'PENDING',
    VERIFIED = 'VERIFIED',
    REJECTED = 'REJECTED',
}

export class VerificationModel {
    id: string;
    userId: string;
    front: string;
    back: string;
    approvedBy: string;
    status:  STATUS;
}