# Notes

#### API Client
- `ApiClient` is a client-side class to abstract away the logic to make authenticated API calls
- It is a singleton, so it's exported as an instance and not as a class
- It contains a copy of auth state which mirrors the copy in the redux store

#### Notes
- Notes are generated off of any comment that starts with `// @notes[NAMESPACE]`
- Namespaces are there to group related comments under one title

#### Rights and Roles
- There are 4 right types: `right_create`, `right_read`, `right_update`, `right_delete`
- These are leveraged to create 3 basic roles: `role_owner`, `role_editor`, and `role_viewer`

#### Services
- Each API service exports a typed handler function `handler: (opts: ServiceHandlerOpts) => void` from its `api.ts` file
- It expects `opts: { app: Application, client: DBClient, logger: Logger }`
- Then each service is started via the `startApi` script
- A `ServiceDefinition` is defined with the service `name` (for logging) and the `handler` function is executed

