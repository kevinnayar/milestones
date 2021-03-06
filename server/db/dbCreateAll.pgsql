-- roles
CREATE TABLE IF NOT EXISTS roles (
  id VARCHAR NOT NULL UNIQUE,
  name VARCHAR NOT NULL,
  right_ids VARCHAR[] NOT NULL
);

INSERT INTO
  roles (id, name, right_ids)
VALUES
  ('role_owner', 'Owner', '{"right_create", "right_read", "right_update", "right_delete"}'),
  ('role_editor', 'Editor', '{"right_read", "right_update"}'),
  ('role_viewer', 'Viewer', '{"right_read"}')
;

-- users
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR NOT NULL UNIQUE,
  role_id VARCHAR NOT NULL,
  display_name VARCHAR NOT NULL,
  img_url VARCHAR,
  full_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  utc_time_created BIGINT NOT NULL,
  utc_time_updated BIGINT
);

CREATE INDEX ON users ("email");

CREATE TABLE IF NOT EXISTS user_credentials (
  user_id VARCHAR NOT NULL UNIQUE,
  email VARCHAR NOT NULL,
  hashed_password VARCHAR NOT NULL,
  utc_time_created BIGINT NOT NULL,
  utc_time_updated BIGINT
);

CREATE INDEX ON user_credentials ("email");

-- teams
CREATE TABLE IF NOT EXISTS teams (
  id VARCHAR NOT NULL UNIQUE,
  name VARCHAR NOT NULL,
  description VARCHAR,
  img_url VARCHAR,
  utc_time_created BIGINT NOT NULL,
  utc_time_updated BIGINT
);

-- teams
CREATE TABLE IF NOT EXISTS users_teams_junction (
  user_id VARCHAR NOT NULL,
  team_id VARCHAR NOT NULL,
  UNIQUE (user_id, team_id)
);

-- tracks
CREATE TABLE IF NOT EXISTS tracks (
  id VARCHAR NOT NULL UNIQUE,
  team_id VARCHAR NOT NULL,
  type VARCHAR NOT NULL,
  version SMALLINT,
  template VARCHAR,
  name VARCHAR NOT NULL,
  description VARCHAR,
  img_url VARCHAR,
  start_date JSONB NOT NULL,
  utc_time_created BIGINT NOT NULL,
  utc_time_updated BIGINT
);

-- track_actions
CREATE TABLE IF NOT EXISTS track_actions (
  id VARCHAR NOT NULL UNIQUE,
  track_id VARCHAR NOT NULL,
  user_id VARCHAR NOT NULL,
  action_type VARCHAR NOT NULL,
  action JSONB NOT NULL,
  state JSONB NOT NULL,
  utc_time_created BIGINT NOT NULL
);

CREATE INDEX ON track_actions ("track_id");
CREATE INDEX ON track_actions ("user_id");
CREATE INDEX ON track_actions ("track_id", "utc_time_created");
CREATE INDEX ON track_actions ("track_id", "action_type");


