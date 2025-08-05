'use client';

import { redirect } from 'next/navigation';

function Settings() {
  redirect('/employees/settings/rolePermission');
  return null;
}
export default Settings;
