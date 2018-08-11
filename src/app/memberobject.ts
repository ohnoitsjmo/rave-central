export class MemberObject {
    displayName:string;
    mail:string;
    ieeeMemberNumber:number;
    ieeeExpiration:string;

    constructor(displayName:string, mail:string, ieeeMemberNumber:number, ieeeExpiration:string) {
        this.displayName = displayName;
        this.mail = mail;
        this.ieeeMemberNumber = ieeeMemberNumber;
        this.ieeeExpiration = ieeeExpiration;
    }
}