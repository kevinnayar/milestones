type RightType = 'create' | 'read' | 'update' | 'delete';

export function userCan(rightType: RightType, rightIds: string[]): boolean {
  const rightPrefixed = `right_${rightType}`;
  return rightIds.includes(rightPrefixed);
}

