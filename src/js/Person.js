export class Person {
    constructor(firstName, lastName, gender = null) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;

        this.parents = [];
        this.children = [];
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(_) {
        // No-op
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

    addParent(parent) {
        if (this.parents.includes(parent)) {
            return;
        }

        if (this.parents.length >= 2) {
            throw new RangeError('Person can only have two parents');
        }

        this.parents.push(parent);
        parent.children.push(this);
    }

    removeParent(parent) {
        this.parents.splice(this.parents.indexOf(parent), 1);
        parent.children.splice(parent.children.indexOf(this), 1);
    }
}