import { BetaAnalyticsDataClient } from '@google-analytics/data';

/**
 * Initialize the Google Analytics Data API client
 * Requires: GA_PROPERTY_ID, GA_CLIENT_EMAIL, GA_PRIVATE_KEY in .env
 */
const getGAClient = () => {
  const propertyId = process.env.GA_PROPERTY_ID;
  const clientEmail = process.env.GA_CLIENT_EMAIL;
  const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!propertyId || !clientEmail || !privateKey) {
    throw new Error('Missing Google Analytics configuration in environment variables.');
  }

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
  });
};

export async function getAnalyticsData() {
  const analyticsDataClient = getGAClient();
  const propertyId = process.env.GA_PROPERTY_ID;

  // 1. Fetch Basic Metrics (Sessions, Users, etc.)
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'date' }],
    metrics: [
      { name: 'activeUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'engagementRate' }
    ],
  });

  // 2. Fetch Device Category Breakdown
  const [deviceResponse] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'deviceCategory' }],
    metrics: [{ name: 'activeUsers' }],
  });

  // 3. Fetch Top Pages
  const [pagesResponse] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }],
    limit: 10,
  });

  // 4. Fetch Traffic Sources
  const [sourceResponse] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'sessionSourceMedium' }],
    metrics: [{ name: 'sessions' }],
    limit: 5,
  });

  // 5. Real-time (Simplified since we use runReport here)
  // For true real-time, use runRealtimeReport
  const [realtimeResponse] = await analyticsDataClient.runRealtimeReport({
    property: `properties/${propertyId}`,
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'activeUsers' }],
  });

  return {
    overview: response.rows?.map(row => ({
      date: row.dimensionValues?.[0]?.value,
      users: parseInt(row.metricValues?.[0]?.value || '0'),
      sessions: parseInt(row.metricValues?.[1]?.value || '0'),
      views: parseInt(row.metricValues?.[2]?.value || '0'),
    })),
    devices: deviceResponse.rows?.map(row => ({
      category: row.dimensionValues?.[0]?.value,
      users: parseInt(row.metricValues?.[0]?.value || '0'),
    })),
    pages: pagesResponse.rows?.map(row => ({
      path: row.dimensionValues?.[0]?.value,
      views: parseInt(row.metricValues?.[0]?.value || '0'),
    })),
    sources: sourceResponse.rows?.map(row => ({
      source: row.dimensionValues?.[0]?.value,
      sessions: parseInt(row.metricValues?.[0]?.value || '0'),
    })),
    realtime: {
        activeUsers: realtimeResponse.rows?.reduce((acc, row) => acc + parseInt(row.metricValues?.[0]?.value || '0'), 0) || 0,
        topPages: realtimeResponse.rows?.map(row => ({
            path: row.dimensionValues?.[0]?.value,
            users: parseInt(row.metricValues?.[0]?.value || '0'),
        }))
    }
  };
}
