# milestones


-> user.auth
-> user.self


    /teams
      -> teams.getTeams: EntityTeam[]

    /teams/create
    -> teams.createTeam: EntityTeam

    /teams/:id
      -> teams.getTeam: EntityTeam
      -> tracks.getTeamTracks: EntityTrack[]
      -> teams.getTeamMembers: UserNoPII[]
    
    /teams/:id/members/create
      -> teams.createTeamMember: Partial<EntityUser>

    /teams/:id/members/:id
      -> teams.getTeamMember: UserNoPII[]

    /teams/:id/tracks/create
      -> tracks.createTeamTrack: Partial<EntityTrack>
    
    /teams/:id/track/:id
      -> teams.getTeamTrack: EntityTrack[]