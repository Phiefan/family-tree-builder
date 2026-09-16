# FamilyTree
Represents a family tree and manages the people belonging to it.

`FamilyTree` is responsible for managing the collection of people, assigning unique identifiers, maintaining each person's `kin` status within the tree, and enforcing the rules for adding and removing people.

A `FamilyTree` does not store personal information or relationship data directly. That information is stored by `Person` objects.

## Properties
| Property | Type | Purpose |
| :--- | :--- | :--- |
| `people` | `Map<number, PersonEntry>` | Stores the people belonging to the family tree, indexed by unique ID |
| `nextId` | `number` | The next identifier available for assignment |

## PersonEntry
A `PersonEntry` represents a person's membership within a `FamilyTree`.

| Property | Type | Purpose |
| :--- | :--- | :--- |
| `person` | `Person` | Reference to the person |
| `kin` | `boolean` | Indicates whether the person belongs to the family lineage |

`PersonEntry` is specific to the `FamilyTree`. The `Person` object itself does not contain an ID or `kin` property.

## IDs
Each person in the `FamilyTree` has a unique numeric identifier.

The identifier is stored as the key in the `people` map.

The ID is not stored on the `Person` object.

IDs are assigned when a person is added to the FamilyTree.

IDs are not reused after a person is removed from the family tree.

IDs are used to identify people when the family tree is saved or loaded.

## Kin
`kin` indicates whether a person belongs to the family lineage represented by the `FamilyTree`.

`kin` is stored in the `PersonEntry`, rather than on the `Person` object.

A person can therefore have different `kin` status in different family trees.

### Kin Rules
A person is considered kin when they are part of the family lineage.

The first person added to an empty FamilyTree becomes kin.

A new person added through a kin person becomes part of the family lineage when the relationship represents a lineage connection.

A spouse does not automatically become kin.

A non-kin person cannot be used as the starting point for adding another person.

## Adding People

### Adding the First Person
The first person can be added to an empty FamilyTree without an existing person as the starting point.

The first person added to the tree becomes kin.

### Adding Subsequent People
After the first person has been added, people can only be added through an existing person in the tree.

The existing person must be kin.

This prevents a separate branch of unrelated people from being added through a non-kin person.

Adding a person through an invalid or non-kin person is rejected.

A rejected addition must not modify the `FamilyTree` or the relationships of the people involved.

### Adding a Parent
A parent can be added to an existing kin person.

The new parent becomes kin.

The new parent is added to the `FamilyTree` and assigned a unique ID.

The parent-child relationship is established through `Person`.

### Adding a Child
A child can be added to an existing kin person.

The new child becomes kin.

The new child is added to the `FamilyTree` and assigned a unique ID.

The parent-child relationship is established through `Person`.

### Adding a Spouse
A spouse can be added to an existing kin person.

The spouse is added to the `FamilyTree` but is not automatically considered kin.

The spouse can still be part of the `FamilyTree` and can have relationships with other people.

The spouse cannot be used as the starting point for adding new people.

The spouse relationship is established through `Person`.

### Adding Existing People
A `Person` can only have one entry within a `FamilyTree`.

Adding a person who already belongs to the `FamilyTree` does not create another entry.

An existing person's ID and `kin` status are not replaced by another entry.

## Methods
| Method | Parameters | Purpose |
| :--- | :--- | :--- |
| `addPerson(person)` | `Person` | Adds the first person to an empty tree |
| `getPerson(id)` | `number` | Returns the person associated with an ID |
| `removePerson(id)` | `number` | Removes a person and cleans up their relationships |
| `isKin(id)` | `number` | Returns whether the person associated with an ID is kin |
| `addParent(personId, parent)` | `number, Person` | Adds a parent to an existing person |
| `addChild(personId, child)` | `number, Person` | Adds a child to an existing person |
| `setSpouse(personId, spouse)` | `number, Person` | Adds a spouse to an existing person |
| `removeSpouse(personId)` | `number` | Removes the person's spouse relationship |

## Unknown IDs
Operations that reference an ID that does not exist in the `FamilyTree` are rejected.

`getPerson(id)` returns **undefined** when the ID does not exist.

An operation using an unknown ID must not modify the `FamilyTree` or any person's relationships.

## Relationship Management
`Person` is responsible for maintaining the consistency of its relationships.

`FamilyTree` is responsible for deciding whether a relationship may be created and for managing the consequences of adding or removing people from the tree.

For example, when a parent is added:
1. `FamilyTree` verifies that the existing person is allowed to introduce a new person.
2. `FamilyTree` adds the new parent to `people`.
3. `FamilyTree` assigns the new parents's ID.
4. `FamilyTree` determines the new parents's `kin` status.
5. The parent-child relationship is established through `Person`.

The same separation applies when adding children and spouses.

## Removing People
Removing a person from the `FamilyTree` also removes all relationships involving that person.

This includes:
- parent relationships
- child relationships
- spouse relationships

Removing a person also removes their entry from people.

No remaining person in the `FamilyTree` may reference a removed person.

### Removing Disconnected Non-Kin People
A non-kin person remains in the `FamilyTree` while they have a relationship connecting them to a kin person.

When a person is removed, the `FamilyTree` checks whether any non-kin people have become disconnected from the family lineage.

A non-kin person who no longer has a relationship connecting them to a kin person is automatically removed.

Removing a disconnected non-kin person also cleans up all relationships involving that person.

Cleanup is recursive. Removing one non-kin person may cause another non-kin person to become disconnected.

Cleanup continues until no disconnected non-kin people remain.

Kin people are not automatically removed as a consequence of another person's removal.

## Collection Integrity
The `FamilyTree` maintains the following rules:
- Every person in `people` has a unique ID.
- Every person in `people` has exactly one `PersonEntry`.
- The ID is not stored on the `Person` object.
- `kin` is stored in the `PersonEntry`.
- A person outside `people` must not be referenced by a person inside the tree.
- Every person referenced by a relationship from a person inside the tree must also exist in `people`.
- Removing a person cleans up all relationships involving that person.
- Disconnected non-kin people are removed automatically.
- Removing a person does not automatically remove other kin people.

## Acceptance Criteria
### *People*
- [ ] A `FamilyTree` can contain multiple people
- [ ] People are stored as `Person` objects
- [ ] The first person can be added to an empty `FamilyTree`
- [ ] The first person added to an empty `FamilyTree` is kin
- [ ] Each person has a unique numeric ID within the tree
- [ ] A person can be retrieved using their ID
- [ ] An unknown ID returns no person
- [ ] A person can be removed using their ID
- [ ] A `Person` object does not contain its ID
- [ ] The same Person cannot have multiple entries in the same FamilyTree

### *Kin*
- [ ] `kin` is stored separately from the `Person` object
- [ ] `kin` indicates whether a person belongs to the family lineage
- [ ] A new person can only be introduced through an existing kin person after the tree has been initialized
- [ ] Adding a parent to a kin person makes the parent kin
- [ ] Adding a child to a kin person makes the child kin
- [ ] Adding a spouse to a kin person does not automatically make the spouse kin
- [ ] A non-kin person cannot be used to introduce another person
- [ ] An invalid introduction does not modify the `FamilyTree`
- [ ] An invalid introduction does not modify the relationships of the people involved

### *IDs*
- [ ] IDs are numeric
- [ ] Each ID uniquely identifies one person within the tree
- [ ] IDs are assigned when people are added
- [ ] IDs are stored by `FamilyTree`, not by `Person`
- [ ] IDs are not reused after a person is removed 
- [ ] An existing person's ID does not change when another person is added or removed

### *Relationships*
- [ ] Relationships are maintained by `Person`
- [ ] `FamilyTree` controls whether a new relationship/person can be added
- [ ] Adding a parent through a valid kin person adds the parent to the tree
- [ ] Adding a child through a valid kin person adds the child to the tree
- [ ] Adding a spouse through a valid kin person adds the spouse to the tree
- [ ] Adding a person through a valid relationship establishes the corresponding relationship through `Person`
- [ ] A person cannot be introduced through a non-kin person
- [ ] An operation using an unknown person ID does not modify the tree

### *Removal*
- [ ] Removing a person removes them from `people`
- [ ] Removing a person removes their parent relationships
- [ ] Removing a person removes their child relationships
- [ ] Removing a person removes their spouse relationship
- [ ] No remaining person references a removed person
- [ ] Disconnected non-kin people are automatically removed
- [ ] Automatically removed non-kin people have their relationships cleaned up
- [ ] Cleanup continues until no disconnected non-kin people remain
- [ ] Removing a person does not automatically remove other kin people
- [ ] Removing an unknown ID does not modify the `FamilyTree`