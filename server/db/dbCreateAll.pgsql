-- roles
CREATE TABLE IF NOT EXISTS roles (
  role_id VARCHAR NOT NULL UNIQUE,
  name VARCHAR NOT NULL,
  right_ids VARCHAR[] NOT NULL -- [teamCreate, teamRead, teamUpdate, teamDelete]
);

CREATE INDEX ON roles ("role_id");

INSERT INTO
  roles (role_id, name, right_ids)
VALUES
  ('role_owner', 'Owner', '{"team_create", "team_read", "team_update", "team_delete"}'),
  ('role_editor', 'Editor', '{"team_read", "team_update"}'),
  ('role_viewer', 'Viewer', '{"team_read"}')
;

-- users
CREATE TABLE IF NOT EXISTS users (
  user_id VARCHAR NOT NULL UNIQUE,
  role_id VARCHAR NOT NULL,
  team_id VARCHAR,
  display_name VARCHAR NOT NULL,
  img_url VARCHAR,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  utc_time_created BIGINT NOT NULL,
  utc_time_updated BIGINT
);

CREATE INDEX ON users ("user_id");

-- teams
CREATE TABLE IF NOT EXISTS teams (
  team_id VARCHAR NOT NULL UNIQUE,
  track_ids VARCHAR[],
  name VARCHAR NOT NULL,
  description VARCHAR,
  img_url VARCHAR,
  utc_time_created BIGINT NOT NULL,
  utc_time_updated BIGINT
);

CREATE INDEX ON teams ("team_id");

-- tracks
CREATE TABLE IF NOT EXISTS tracks (
  track_id VARCHAR NOT NULL UNIQUE,
  version SMALLINT,
  name VARCHAR NOT NULL,
  description VARCHAR,
  img_url VARCHAR,
  utc_time_created BIGINT NOT NULL
);

CREATE INDEX ON tracks ("track_id");

-- track_state
CREATE TABLE IF NOT EXISTS track_state (
  track_id VARCHAR NOT NULL,
  milestone_id VARCHAR NOT NULL, -- "CUSTOM" | "<MILESTONE_ID>"
  action VARCHAR NOT NULL,
  state JSONB NOT NULL,
  utc_time_created BIGINT NOT NULL
);

CREATE INDEX ON track_state ("track_id", "utc_time_created");


