import { wrapInArray } from '@/casimir-framework/all';
import { intersectionWith } from 'lodash';

export const hasRoles = (userRoles, roles) => {
  const rolesList = wrapInArray(roles);
  return intersectionWith(
    userRoles,
    rolesList,
    (uR, rR) => uR.role === rR
  ).length > 0;
};
