'use client';

import { signOut } from './actions';

export function SignOut() {
  return (
    <button className="underline" onClick={() => signOut()}>
      Sign out
    </button>
  );
}
