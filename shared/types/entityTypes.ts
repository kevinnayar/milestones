import { Maybe, SimpleDate } from './baseTypes';

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



