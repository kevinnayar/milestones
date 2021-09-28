# milestones


```tsx
<Route path="/login" exact component={AuthLoginPage} />
<Route path="/register" exact component={AuthRegisterPage} />

<PrivateRoute path="/teams" exact component={TeamsListPage} />
<PrivateRoute path="/teams/create" exact component={TeamCreatePage} />
<PrivateRoute path="/teams/:teamId" exact component={TeamInfoPage} />
<PrivateRoute path="/teams/:teamId/edit" exact component={TeamEditPage} />

<PrivateRoute path="/teams/:teamId/tracks/create" exact component={TrackCreatePage} />
<PrivateRoute path="/teams/:teamId/tracks/:trackId" exact component={TrackInfoPage} />
<PrivateRoute path="/teams/:teamId/tracks/:trackId/edit" exact component={TrackEditePage} />

<PrivateRoute path="/teams/:teamId/members/create" exact component={MemberCreatePage} />
<PrivateRoute path="/teams/:teamId/members/:memberId" exact component={MemberInfoPage} />
<PrivateRoute path="/teams/:teamId/members/:memberId/edit" exact component={MemberEditPage} />
```