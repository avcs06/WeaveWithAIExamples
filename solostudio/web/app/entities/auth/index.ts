import { createPersistentStore } from '@packages/utils/state';
import { useSyncExternalStore } from 'react';

import { mockCall } from '../mock';

// Sign up and sign in take any email: there is no backend yet.

export type User = { email: string; role?: string };

/** A role a member signs up as. */
export type Role = { id: string; name: string };

// `roles` keeps each email's role from sign up, so signing in again restores it.
// `knownEmails` keeps every email this browser has signed up, so changing to one of them conflicts.
type AuthState = { user: User | null; roles: Record<string, string>; knownEmails: string[] };

// The scaffold writes the run's key over this, so no two apps on one origin share a session.
const AUTH_KEY = "weave:20261104-0428-freelancer-workspace:auth";

// The scaffold writes the app's signed-in roles over this; sign up asks for one when there are several.
export const ROLES: Role[] = [{"id":"designer","name":"Designer"}];

// The scaffold writes the app's first signed-in page over this: where signing in or up leads.
export const HOME_ROUTE = "/home";

const useAuthStore = createPersistentStore<AuthState>(
  () => ({ user: null, roles: {}, knownEmails: [] }),
  AUTH_KEY,
);

/** Adds an email to the store's known emails, once. */
function rememberEmail(email: string): string[] {
  const knownEmails = useAuthStore.getState().knownEmails ?? [];
  return knownEmails.includes(email) ? knownEmails : [...knownEmails, email];
}

export async function signUp(email: string, role?: string): Promise<User> {
  await mockCall('signUp');
  const user = role ? { email, role } : { email };
  useAuthStore.setState((state) => ({
    user,
    roles: role ? { ...state.roles, [email]: role } : state.roles,
    knownEmails: rememberEmail(email),
  }));
  return user;
}

export type AccountUpdate = { email: string; password: string };

/**
 * Save the designer's sign-in email and password. The password is checked by
 * the caller and never stored: there is no backend yet, so anyone signs in
 * with any password. Throws a coded error when the email is taken.
 */
export async function updateAccount(input: AccountUpdate): Promise<User> {
  await mockCall('updateAccount');
  const current = useAuthStore.getState().user;
  if (!current) throw new Error('Not signed in');
  const knownEmails = useAuthStore.getState().knownEmails ?? [];
  if (input.email !== current.email && knownEmails.includes(input.email)) {
    const taken = new Error('That email is already in use') as Error & { code: string };
    taken.code = 'email-taken';
    throw taken;
  }
  const user = { ...current, email: input.email };
  useAuthStore.setState({ user, knownEmails: rememberEmail(current.email) });
  return user;
}

export async function signIn(email: string): Promise<User> {
  await mockCall('signIn');
  const role = useAuthStore.getState().roles[email];
  const user = role ? { email, role } : { email };
  useAuthStore.setState({ user });
  return user;
}

export function signOut(): void {
  useAuthStore.setState({ user: null });
}

const noSubscription = () => () => undefined;

/**
 * The signed-in user, null for a visitor, or undefined until the saved session is read: the server and the
 * first render after it cannot read the browser's storage, so a page waits instead of taking a member for a visitor.
 */
export function useCurrentUser(): User | null | undefined {
  const user = useAuthStore('user');
  const read = useSyncExternalStore(noSubscription, () => true, () => false);
  return read ? user : undefined;
}
