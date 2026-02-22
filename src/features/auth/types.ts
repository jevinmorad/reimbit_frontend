import type GlobalPermissions from './GlobalPermissions';
import type GlobalPagePermissions from './PagePermissions';

export type UserType = {
  UserId: string;
  OrganizationId: string;
  Email: string;
  RoleId: string;
} | null;

export type AuthState = {
  User: UserType;
  loading: boolean;
  UserPermissions: GlobalPermissions;
  GlobalPagePermissions: GlobalPagePermissions;
};

export type AuthContextValue = {
  User: UserType;
  loading: boolean;
  UserPermissions: GlobalPermissions;
  authenticated: boolean;
  unauthenticated: boolean;
  checkUserSession?: () => Promise<void>;
};
