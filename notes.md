# Notes

#### Notes
- Notes are generated off of any comment that starts with `@notes[NAMESPACE]`
- Namespaces are there to group related comments under one title

#### Services
- Each service exports a typed (`ServiceDefinition`) service handler from its `api.ts`
- They are passed the Express app, a DB client, and a namespaced logging utility following a dependency injection pattern

