import axios from "axios";

// Required variables in .env
const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
// The email of the Zoom user who will host the meeting
const ZOOM_HOST_EMAIL = process.env.ZOOM_HOST_EMAIL || "me";

/**
 * Retrieves an access token using Server-to-Server OAuth.
 */
async function getZoomAccessToken() {
  if (!ZOOM_ACCOUNT_ID || !ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
    throw new Error("Zoom credentials are not fully configured in the environment.");
  }

  const tokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`;
  const authHeader = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString("base64");

  try {
    const response = await axios.post(
      tokenUrl,
      {},
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching Zoom access token:", error);
    throw new Error("Failed to get Zoom access token.");
  }
}

/**
 * Creates a Zoom meeting for a given start time and topic.
 * @param topic The topic/title of the meeting
 * @param startTime ISO string representing the start time (e.g., "2026-05-01T10:00:00Z")
 * @returns The join URL of the created meeting
 */
export async function createZoomMeeting(topic: string, startTime: string): Promise<string> {
  const token = await getZoomAccessToken();

  if (!token) {
    throw new Error("Unable to authenticate with Zoom.");
  }

  // To create a meeting for a specific user, we hit /users/{userId}/meetings
  // Using "me" creates it for the API user, otherwise specify user email
  const endpoint = `https://api.zoom.us/v2/users/${ZOOM_HOST_EMAIL}/meetings`;

  try {
    const response = await axios.post(
      endpoint,
      {
        topic: topic,
        type: 2, // 2 = Scheduled meeting
        start_time: startTime,
        duration: 45, // Default 45 mins
        timezone: "Asia/Dhaka", // Default timezone for Solution Squad based on provided metadata time
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          waiting_room: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Join URL is what the client uses to join the meeting
    return response.data.join_url;
  } catch (error) {
    console.error("Error creating Zoom meeting:", error);
    throw new Error("Failed to create Zoom meeting.");
  }
}
