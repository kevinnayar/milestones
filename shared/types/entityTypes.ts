import { Maybe, SimpleDate } from './baseTypes';

export type RoleType = 'role_owner' | 'role_editor' | 'role_viewer';

export type EntityRole = {
  roleId: RoleType;
  name: string;
  rightIds: string[];
};

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

export type EntityTeam = {
  teamId: string;
  trackIds: string[];
  name: string;
  description?: Maybe<string>;
  imgUrl?: Maybe<string>;
  utcTimeCreated: number;
  utcTimeUpdated?: Maybe<number>;
};

export type TrackType = 'CUSTOM' | 'TEMPLATE';

export type TrackTemplate = 'CHILD_MILESTONES' | 'PET_MILESTONES';

export type EntityTrack = {
  trackId: string;
  trackType: TrackType;
  trackTemplate?: Maybe<TrackTemplate>;
  trackVersion?: Maybe<number>;
  name: string;
  description?: Maybe<string>;
  imgUrl?: Maybe<string>;
  startDate: SimpleDate;
  utcTimeCreated: number;
  utcTimeUpdated?: Maybe<number>;
};



