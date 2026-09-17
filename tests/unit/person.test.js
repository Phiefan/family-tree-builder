import { Person } from "../../src/js/Person.js";

describe('Person', () => {
    let person;

    beforeEach(() => {
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
            test('combines firstName and lastName', () => {
                expect(person.fullName).toBe('John Doe');
            });

            test('reflects changes to firstName and lastName', () => {
                person.firstName = 'Richard';
                person.lastName = 'Roe';

                expect(person.fullName).toBe('Richard Roe');
            });

            test('is read-only', () => {
                person.fullName = 'Richard Roe';

                expect(person.fullName).toBe('John Doe');
            });
        });
    });

    describe('Gender', () => {
        test('defaults to null when not specified', () => {
            expect(person.gender).toBeNull();
        });

        test.each(['f', 'm', 'd'])(
            'accepts %s when creating a person',
            (gender) => {
                const person = new Person('J.', 'Doe', gender)

                expect(person.gender).toBe(gender);
            }
        );

        test.each(['f', 'm', 'd'])(
            'accepts %s when changing gender',
            (gender) => {
                person.gender = gender;

                expect(person.gender).toBe(gender);
            }
        );

        test('can be unset', () => {
            person.gender = 'd';

            person.gender = null;

            expect(person.gender).toBeNull();
        });

        const invalids = [
            { gender: 'x', label: 'x' },
            { gender: 'female', label: 'female' },
            { gender: '', label: 'empty string' },
            { gender: 1, label: 'number' },
        ];

        test.each(invalids)(
            'rejects invalid gender value $label when creating a person',
            ({ gender }) => {
                expect(() => {
                    new Person('J.', 'Doe', gender);
                }).toThrow();
            }
        );

        test.each(invalids)(
            'rejects invalid gender value $label when changing gender',
            ({ gender }) => {
                expect(() => {
                    person.gender = gender;
                }).toThrow();
            }
        );
    });
    
});