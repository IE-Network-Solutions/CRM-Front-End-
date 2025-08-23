'use client';

export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';

const Charts = () => {
  redirect('/organization/chart/org-structure');
  return <></>;
};

export default Charts;
