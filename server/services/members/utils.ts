import { TeamMember } from '../../../common/types/entityTypes';

export function convertRowToMember(row: any): TeamMember {
  const member: TeamMember = {
    userId: row.id,
    isOwner: row.role_id === 'role_owner',
    displayName: row.display_name,
    imgUrl: row.img_url,
    utcTimeCreated: parseInt(row.utc_time_created, 10),
  };
  return member;
}


