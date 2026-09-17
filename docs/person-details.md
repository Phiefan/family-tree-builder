# Person
Represents an individual within a family tree.

A `Person` contains personal information and maintains references to their family relationships. 
It is responsible for maintaining the consistency of its own relationship data.

## Properties
| Property | Type | Purpose |
| :--- | :--- | :--- |
| `firstName` | `string` | The person's first name |
| `lastName` | `string` | The person's last name |
| `gender` | `"f" \| "m" \| "d" \| null` | The person's gender |
| `parents` | `Person[]` | References to the person's parents |
| `children` | `Person[]` | References to the person's children |
| `spouse` | `Person \| null` | Reference to the person's spouse |

## Getters
| Getter | Return Type | Purpose |
| :--- | :--- | :--- |
| `fullName` | `string` | Return the person's first and last name combined |

### fullName
`fullName` is derived from combining the person's `firstName` and `lastName` and is not stored separately.

Changes to either `firstName` or `lastName` are therefore reflected automatically in `fullName`.

`fullName` is read-only. Assigning a value to `fullName` has no effect.

## Methods
| Method | Parameters | Purpose |
| :--- | :--- | :--- |
| `addParent(parent)` | `Person` | Adds a parent and establishes the corresponding child relationship |
| `removeParent(parent)` | `Person` | Removes a parent and the corresponding child relationship |
| `addChild(child)` | `Person` | Adds a child and establishes the corresponding parent relationship |
| `removeChild(child)` | `Person` | Removes a child and the corresponding parent relationship |
| `setSpouse(spouse)` | `Person`| Establishes a spouse relationship with another person |
| `removeSpouse()` | none | Removes the person's current spouse relationship |

## Relationships
Relationships are stored directly on the `Person` object as references to other `Person` objects.

When a relationship is added or removed, the corresponding relationship on the other person is updated as well.

## Parents
A person can have zero, one, or two parents.

Adding a parent adds the person to that parent's `children` collection.

Removing a parent removes the person from that parent's `children` collection.

A person cannot have more than two parents.

Duplicate parent relationships are prevented.

## Children
A person can have any number of children.

Adding a child adds the person to that child's `parents` collection.

Removing a child removes the person from that child's `parents` collection.

Duplicate parent-child relationships are prevented.

## Spouse
A person can have zero or one spouse.

Setting a spouse establishes the relationship for both people.

Removing a spouse removes the relationship for both people.

Duplicate spouse relationships are prevented.

## Gender
Gender is represented using one of the following values:

| Value | Meaning |
| :--- | :--- |
| **f** | Female |
| **m** | Male |
| **d** | Other |

Gender may initially be unset.

Only **f**, **m**, or **d** are accepted as gender values.

Gender can be changed after the person has been created.

## Acceptance Criteria
### *Personal Information*
- [ ] A person has a `firstName`
- [ ] A person has a `lastName`
- [ ] A person's `fullName` returns `firstName` followed by `lastName`
- [ ] `fullName` is read-only. Assigning a value to `fullName` has no effect
- [ ] Changes to `firstName` or `lastName` are reflected in `fullName`

### *Gender*
- [ ] A person's gender can be **f**, **m**, or **d**
- [ ] No other gender values are accepted
- [ ] Gender can initially be unset
- [ ] Gender can be changed after the person has been created

### *Parent Relationships*
- [ ] A person can have zero, one, or two parents
- [ ] A person cannot have more than two parents
- [ ] Adding a parent also adds the person as a child of that parent
- [ ] Removing a parent also removes the person from that parent's children
- [ ] Duplicate parent relationships are prevented
- [ ] Adding an existing parent does not create a duplicate relationship
- [ ] Adding a third parent is rejected
- [ ] Rejecting a third parent does not modify either person's relationship data

### *Child Relationships*
- [ ] A person can have multiple children
- [ ] Adding a child also adds the person as a parent of that child
- [ ] Removing a child also removes the person from that child's parents
- [ ] Duplicate parent-child relationships are prevented
- [ ] Adding an existing child does not create a duplicate relationship
 
### *Spouse Relationships*
- [ ] A person can have zero or one spouse
- [ ] Setting a spouse establishes the relationship for both people
- [ ] Removing a spouse removes the relationship for both people
- [ ] Duplicate spouse relationships are prevented
- [ ] Setting an existing spouse does not create or alter the relationship
- [ ] A person's spouse always references the same person as that person's spouse
