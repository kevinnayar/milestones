# Notes

#### ApiClient
- `ApiClient` is a singleton, so it's exported as an instance and not as a class
- Its purpose is to abstract away the logic to make authenticated API calls
- It contains a copy of auth state which mirrors the copy in the redux store

#### Notes
- Notes are generated off of any comment that starts with `// @notes[NAMESPACE]`
- Namespaces are there to group related comments under one title

#### Rights
- There are 4 right types: `right_create`, `right_read`, `right_update`, `right_delete`

#### Services
- Each service exports a typed (`ServiceDefinition`) service handler from its `api.ts`
- They are passed the Express app, the DB client, and a namespaced logging utility

