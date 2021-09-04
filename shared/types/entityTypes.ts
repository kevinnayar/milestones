import { Maybe, SimpleDate, RelativeRange, AbsoluteRange } from './baseTypes';

// roles
export type RightType = 'create' | 'read' | 'update' | 'delete';
export type RoleType = 'role_owner' | 'role_editor' | 'role_viewer';

export type EntityRole = {
  roleId: RoleType;
  name: string;
  rightIds: string[];
};

// users
export type EntityUser = {
  userId: string;
  roleId: string;
  teamId?: Maybe<string>;
  displayName: string;
  imgUrl?: Maybe<string>;
  firstName: string;
  lastName: string;
  email: string;
  utcTimeCreated: number;
  utcTimeUpdated?: Maybe<number>;
};

export type UserCreateParams = {
  roleId: string;
  teamId?: Maybe<string>;
  displayName: string;
  imgUrl?: Maybe<string>;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserNoPII = {
  userId: string;
  teamId?: Maybe<string>;
  displayName: string;
  imgUrl?: Maybe<string>;
  utcTimeCreated: number;
  utcTimeUpdated?: Maybe<number>;
};

// teams
export type EntityTeam = {
  teamId: string;
  trackIds: string[];
  name: string;
  description?: Maybe<string>;
  imgUrl?: Maybe<string>;
  utcTimeCreated: number;
  utcTimeUpdated?: Maybe<number>;
};

export type TeamCreateParams = {
  name: string;
  description?: Maybe<string>;
  imgUrl?: Maybe<string>;
};

// tracks
export type TrackType = 'TEMPLATE' | 'CUSTOM';

export type TrackTemplate = 'CHILD_MILESTONES' | 'PET_MILESTONES';

export type TrackConfigTemplate = {
  type: 'TEMPLATE';
  template: TrackTemplate;
  version: number;
};

export type TrackConfigCustom = {
  type: 'CUSTOM';
};

export type EntityTrack = {
  trackId: string;
  name: string;
  config: TrackConfigCustom | TrackConfigTemplate;
  description?: Maybe<string>;
  imgUrl?: Maybe<string>;
  utcTimeCreated: number;
  utcTimeUpdated?: Maybe<number>;
};

export type TrackCreateParams = {
  name: string;
  config: TrackConfigCustom | TrackConfigTemplate;
  description?: Maybe<string>;
  imgUrl?: Maybe<string>;
  startDate: SimpleDate;
};

// milestones
export type MilestoneStatus = 'MARKER' | 'INCOMPLETE' | 'COMPLETE';

export type EntityMilestone = {
  id: string;
  name: string;
  description: string;
  ranges: {
    relative: RelativeRange;
    absolute: null | AbsoluteRange;
  };
  status: MilestoneStatus;
};

export type ResolvedMilestone = EntityMilestone & {
  ranges: {
    relative: RelativeRange;
    absolute: AbsoluteRange;
  }
};

export type StartActionPayload = {
  startDate: SimpleDate;
  template: TrackTemplate;
  version: number;
};

export type TrackActionStart = {
  type: 'START',
  payload: StartActionPayload,
};

export type TrackActionAdd = {
  type: 'ADD';
  payload: {
    milestone: EntityMilestone,
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




