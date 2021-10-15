import { Maybe, SimpleDate, RelativeRange, AbsoluteRange } from './baseTypes';

// ROLES
export type RightType = 'right_create' | 'right_read' | 'right_update' | 'right_delete';
export type RoleType = 'role_owner' | 'role_editor' | 'role_viewer';

export type EntityRole = {
  roleId: RoleType;
  name: string;
  rightIds: string[];
};


// USERS
export type EntityUser = {
  userId: string;
  roleId: string;
  displayName: string;
  imgUrl?: Maybe<string>;
  fullName: string;
  email: string;
  utcTimeCreated: number;
  utcTimeUpdated?: Maybe<number>;
};

export type UserCreateParams = {
  roleId: string;
  displayName: string;
  imgUrl?: Maybe<string>;
  fullName: string;
  email: string;
  password: string;
};

export type UserNoPII = {
  userId: string;
  displayName: string;
  imgUrl?: Maybe<string>;
  utcTimeCreated: number;
  utcTimeUpdated?: Maybe<number>;
  rightIds?: RightType[];
};

export type TeamMember = {
  userId: string;
  isOwner: boolean;
  displayName: string;
  imgUrl?: Maybe<string>;
  utcTimeCreated: number;
};

export type UserAuthResponseTrue = {
  isAuthenticated: true;
  userId: string;
  token: string;
  tokenExpiration: number;
};

export type UserAuthResponseFalse = {
  isAuthenticated: false;
  userId: null;
  token: null;
  tokenExpiration: null;
};

export type UserAuthResponse = UserAuthResponseTrue | UserAuthResponseFalse;


// TEAMS
export type UserTeamGuids = {
  userId: string;
  teamId: string;
};

export type EntityTeam = {
  teamId: string;
  name: string;
  description?: Maybe<string>;
  imgUrl?: Maybe<string>;
  utcTimeCreated: number;
  utcTimeUpdated?: Maybe<number>;
};

export type TeamUpsertParams = {
  name: string;
  description?: Maybe<string>;
  imgUrl?: Maybe<string>;
};

// TRACKS
export type UserTeamTrackGuids = UserTeamGuids & { trackId: string; };

export type TrackTemplate =
  | 'CHILD_MILESTONES'
  | 'PET_MILESTONES'
  | 'CUSTOM_MILESTONES';

export type TrackConfig = {
  template: TrackTemplate;
  version: number;
};

export type EntityTrack = {
  teamId: string;
  trackId: string;
  name: string;
  config: TrackConfig;
  description?: Maybe<string>;
  imgUrl?: Maybe<string>;
  startDate: SimpleDate;
  utcTimeCreated: number;
  utcTimeUpdated?: Maybe<number>;
};

export type TrackUpsertParams = {
  teamId: string;
  name: string;
  config: TrackConfig;
  description?: Maybe<string>;
  imgUrl?: Maybe<string>;
  startDate: SimpleDate;
};


// MILESTONES
export type EntityMilestone = {
  id: string;
  name: string;
  description: string;
  ranges: {
    relative: RelativeRange;
    absolute: null | AbsoluteRange;
    completed: null | AbsoluteRange;
  };
};

export type ResolvedMilestone = EntityMilestone & {
  ranges: {
    relative: RelativeRange;
    absolute: AbsoluteRange;
    completed: null | AbsoluteRange;
  };
};

export type StartActionPayload = {
  startDate: SimpleDate;
  template: TrackTemplate;
  version: number;
};

export type TrackActionStart = {
  type: 'START';
  payload: StartActionPayload;
};

export type TrackActionAdd = {
  type: 'ADD';
  payload: {
    milestone: EntityMilestone;
  };
};

export type TrackActionUpdate = {
  type: 'UPDATE';
  payload: {
    milestone: EntityMilestone;
  };
};

export type TrackActionRemove = {
  type: 'REMOVE';
  payload: {
    milestoneId: string;
  };
};

export type TrackActionIncomplete = {
  type: 'INCOMPLETE';
  payload: {
    milestoneId: string;
  };
};

export type TrackActionComplete = {
  type: 'COMPLETE';
  payload: {
    milestoneId: string;
    completedRanges: AbsoluteRange;
  };
};

export type TrackAction =
  | TrackActionStart
  | TrackActionAdd
  | TrackActionUpdate
  | TrackActionRemove
  | TrackActionIncomplete
  | TrackActionComplete;

export type TrackState = {
  startDate: SimpleDate;
  ids: string[];
  idMap: { [k: string]: ResolvedMilestone };
};

export type TrackReduction = {
  actions: TrackAction[],
  state: TrackState,
};


