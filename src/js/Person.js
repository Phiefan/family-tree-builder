export class Person {
    constructor(firstName, lastName, gender = null) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(_) {
        // Intentionally ignored
    }

    get gender() {
        return this._gender
    }

    set gender(value) {
        if (value !== null && !['f', 'm', 'd'].includes(value)) {
            throw new TypeError('Invalid gender value');
        }

        this._gender = value;
    }
}