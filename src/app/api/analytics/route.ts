import { NextResponse } from 'next/server';
import { getAnalyticsData } from '@/lib/analytics-api';
import { cookies } from 'next/headers';

export async function GET() {
  // Check if the user is authenticated via cookie
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await getAnalyticsData();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('GA4 API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data', details: error.message },
      { status: 500 }
    );
  }
}
