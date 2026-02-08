import type GlobalPermissions from './GlobalPermissions';
import type GlobalPagePermissions from './PagePermissions';

export type UserType = Record<string, unknown> | null;

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
