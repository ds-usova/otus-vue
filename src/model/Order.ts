import {Country} from "./Country";

export class Order {
    emailAddress: string
    country: Country
    firstName: string
    lastName: string
    postalCode: string
    city: string
    address: string
    birthday: Date
    nameOnCard: string
    creditCardNumber: string
    expiration: string
    cvv: string

    constructor(emailAddress: string, country: Country, firstName: string, lastName:
        string, postalCode: string, city: string, address: string, birthday: Date,
                nameOnCard: string, creditCardNumber: string, expiration: string, cvv: string) {
        this.emailAddress = emailAddress;
        this.country = country;
        this.firstName = firstName;
        this.lastName = lastName;
        this.postalCode = postalCode;
        this.city = city;
        this.address = address;
        this.birthday = birthday;
        this.nameOnCard = nameOnCard;
        this.creditCardNumber = creditCardNumber;
        this.expiration = expiration;
        this.cvv = cvv;
    }

}