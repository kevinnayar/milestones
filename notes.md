# Notes

#### Notes
- Notes are generated off of any comment that starts with `@notes[NAMESPACE]`
- Namespaces are there to group related comments under one title

#### Rights
- There are 4 right types: `right_create`, `right_read`, `right_update`, `right_delete`

#### Services
- Each service exports a typed (`ServiceDefinition`) service handler from its `api.ts`
- Services are passed the express app, a db client, and a logging utility
- They are passed the Express app, the DB client, and a namespaced logging utility following a dependency injection pattern

