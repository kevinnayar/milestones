-- roles
CREATE TABLE IF NOT EXISTS roles (
  id VARCHAR NOT NULL UNIQUE,
  name VARCHAR NOT NULL,
  right_ids VARCHAR[] NOT NULL
);

INSERT INTO
  roles (id, name, right_ids)
VALUES
  ('role_owner', 'Owner', '{"team_create", "team_read", "team_update", "team_delete"}'),
  ('role_editor', 'Editor', '{"team_read", "team_update"}'),
  ('role_viewer', 'Viewer', '{"team_read"}')
;

-- users
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR NOT NULL UNIQUE,
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

CREATE INDEX ON users ("email");

-- teams
CREATE TABLE IF NOT EXISTS teams (
  id VARCHAR NOT NULL UNIQUE,
  track_ids VARCHAR[],
  name VARCHAR NOT NULL,
  description VARCHAR,
  img_url VARCHAR,
  utc_time_created BIGINT NOT NULL,
  utc_time_updated BIGINT
);

-- tracks
CREATE TABLE IF NOT EXISTS tracks (
  id VARCHAR NOT NULL UNIQUE,
  type VARCHAR NOT NULL,
  template VARCHAR,
  version SMALLINT,
  name VARCHAR NOT NULL,
  description VARCHAR,
  img_url VARCHAR,
  start_date JSONB,
  utc_time_created BIGINT NOT NULL
);

-- track_state
CREATE TABLE IF NOT EXISTS track_state (
  track_id VARCHAR NOT NULL,
  milestone_id VARCHAR NOT NULL,
  action VARCHAR NOT NULL,
  state JSONB NOT NULL,
  utc_time_created BIGINT NOT NULL
);

CREATE INDEX ON track_state ("track_id");
CREATE INDEX ON track_state ("track_id", "utc_time_created");


