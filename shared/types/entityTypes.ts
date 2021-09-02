import { Maybe } from './baseTypes';

export type RoleType = 'role_owner' | 'role_editor' | 'role_viewer';

export type EntityRole = {
  roleId: string,
  name: string,
  rightIds: string[],
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

export type EntityTrack = {
  trackId: string,
  version: number,
  name: string,
  description?: Maybe<string>,
  imgUrl?: Maybe<string>,
  utcTimeCreated: number,
};



