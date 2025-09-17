'use client';

import { useParams } from 'next/navigation';
import RosterManager from '@/components/raids/RosterManager';

export default function RosterPage() {
  const params = useParams();
  const raidId = params.id as string;

  return <RosterManager raidId={raidId} />;
}
