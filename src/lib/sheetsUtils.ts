import { google } from "googleapis";

// Define the scopes required for Google Sheets API
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// We expect these variables in our .env file.
// Because the private key might contain literal '\n' characters if stored as a single line, we replace them.
const credentials = {
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

/**
 * Initializes and returns an authenticated Google Sheets API client
 */
export async function getSheetsClient() {
  if (!credentials.client_email || !credentials.private_key || !SPREADSHEET_ID) {
    console.warn("Google Sheets API credentials or SPREADSHEET_ID are not fully set in environment variables.");
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });

  return google.sheets({ version: "v4", auth });
}

/**
 * Fetches available time slots from the "Availability" sheet.
 * Assumes the sheet has "Date" in column A and "Time" in column B (e.g., 2026-05-01, 10:00 AM).
 */
export async function getAvailableTimeSlots() {
  const sheets = await getSheetsClient();
  if (!sheets) return "Error: Google Sheets is not configured on the server.";

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Availability!A2:B", // Skip header row
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return "No availability found in the schedule.";
    }

    // Return as a formatted string for the LLM to understand
    const availabilityStr = rows
      .map((row) => `${row[0]} at ${row[1]}`)
      .join("\n");
    return `Available time slots:\n${availabilityStr}`;
  } catch (error) {
    console.error("Error reading availability from Google Sheets:", error);
    return "Error: Could not retrieve availability at this time.";
  }
}

/**
 * Appends a new booked meeting to the "Bookings" sheet.
 * Assumes headers: Name | Email | Date | Time | Zoom Link
 */
export async function appendBookingRecord(name: string, email: string, date: string, time: string, zoomLink: string) {
  const sheets = await getSheetsClient();
  if (!sheets) return false;

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Bookings!A:E",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, email, date, time, zoomLink]],
      },
    });

    return true;
  } catch (error) {
    console.error("Error appending booking to Google Sheets:", error);
    return false;
  }
}
