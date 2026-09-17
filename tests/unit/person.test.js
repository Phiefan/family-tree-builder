import { Person } from "../../src/js/Person.js";

describe('Person', () => {
    let person;

    beforeEach(()=>{
        person = new Person('John', 'Doe');
    });

    describe('Personal Information', () => {
        test('stores firstName', () => {
            expect(person.firstName).toBe('John');
        });

        test('stores last name', () => {
            expect(person.lastName).toBe('Doe');
        });

        describe('fullName', () => {
            test('combines firstName and lastName', ()=>{
                expect(person.fullName).toBe('John Doe');
            });

            test('reflects changes to firstName and lastName', ()=>{
                person.firstName='Richard';
                person.lastName= 'Roe';

                expect(person.fullName).toBe('Richard Roe');
            });

            test('is read-only', ()=>{
                person.fullName = 'Richard Roe';
                
                expect(person.fullName).toBe('John Doe');
            });
        });
    });

});