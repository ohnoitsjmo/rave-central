export class MemberObject {
    displayName:string;
    email:string;
    phone:string;
    city:string;

    constructor(displayName:string, email:string, phone:string, city:string) {
        this.displayName = displayName;
        this.email = email;
        this.phone = phone;
        this.city = city;
    }
}