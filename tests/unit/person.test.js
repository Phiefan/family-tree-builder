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

    describe('Parent Relationships', () => {
        let parent1, parent2, parent3;

        beforeEach(() => {
            parent1 = new Person('Richard', 'Doe', 'm');
            parent2 = new Person('Jane', 'Doe', 'f');
            parent3 = new Person('Jane', 'Roe');
        });

        test('allows zero parents', () => {
            expect(person.parents).toHaveLength(0)
        });

        test('allows one parent', () => {
            person.addParent(parent1);

            expect(person.parents).toContain(parent1);
        });

        test('allows two parents', () => {
            person.addParent(parent1);
            person.addParent(parent2);

            expect(person.parents).toEqual(
                expect.arrayContaining([parent1, parent2])
            );
        });

        test('rejects a third parent', () => {
            person.addParent(parent1);
            person.addParent(parent2);

            expect(() => {
                person.addParent(parent3);
            }).toThrow();
        });

        test("adding a parent also adds the person to parent's children", () => {
            person.addParent(parent1);

            expect(parent1.children).toContain(person);
        });

        test("removing a parent also removes the person from parent's children", () => {
            person.addParent(parent1);

            person.removeParent(parent1);

            expect(person.parents).not.toContain(parent1);
            expect(parent1.children).not.toContain(person);
        });

        test('prevents duplicate parent relationships', () => {
            person.addParent(parent1);
            person.addParent(parent1);

            expect(person.parents).toHaveLength(1)
            expect(parent1.children).toHaveLength(1)
        })

        test('rejecting a third parent does not modify relationship data', () => {
            person.addParent(parent1);
            person.addParent(parent2);

            expect(() => {
                person.addParent(parent3);
            }).toThrow();

            expect(person.parents).toEqual(
                expect.arrayContaining([parent1, parent2])
            );
            expect(person.parents).not.toContain(parent3);
            expect(parent3.children).not.toContain(person);
        });
    });

});