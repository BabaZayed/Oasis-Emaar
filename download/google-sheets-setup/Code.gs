/**
 * OASIS EMAAR - Google Sheets Lead Capture
 * 
 * SETUP INSTRUCTIONS:
 * 
 * Step 1: Create a Google Sheet
 * - Go to https://sheets.google.com and create a new spreadsheet
 * - Name it "Oasis Emaar Leads"
 * - In row 1, add these column headers (A through N):
 *   A: Timestamp
 *   B: Name
 *   C: Email
 *   D: Phone
 *   E: Budget
 *   F: Timeline
 *   G: Nationality
 *   H: Property Interest
 *   I: Form Type
 *   J: Message
 *   K: Page URL
 *   L: Lead Score
 *   M: Qualified
 *   N: Source
 * - Format the header row (bold, background color)
 * 
 * Step 2: Add the Apps Script
 * - In the Google Sheet, click Extensions > Apps Script
 * - Delete any existing code in the editor
 * - Paste ALL the code below into the editor
 * - Click Save (floppy disk icon)
 * 
 * Step 3: Deploy as Web App
 * - Click Deploy > New deployment
 * - Click the gear icon next to "Select type" and choose "Web app"
 * - Description: "Oasis Lead Capture"
 * - Execute as: "Me" (your Google account)
 * - Who has access: "Anyone" (this allows the website to POST data)
 * - Click Deploy
 * - Authorize the script when prompted (click Advanced > Go to script)
 * - Copy the Web App URL that appears
 * 
 * Step 4: Add the URL to your website
 * - Go to your Vercel project settings > Environment Variables
 * - Add: GOOGLE_SHEETS_WEBHOOK_URL = <paste the URL>
 * - Redeploy the website
 * 
 * That's it! Every new lead will automatically appear in your Google Sheet.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Append the lead data as a new row
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.budget || "",
      data.timeline || "",
      data.nationality || "",
      data.propertyInterest || "",
      data.formType || "",
      data.message || "",
      data.pageUrl || "",
      data.leadScore || 0,
      data.isQualified || "No",
      data.source || "website"
    ]);
    
    // Auto-format: highlight qualified leads in green
    var lastRow = sheet.getLastRow();
    if (data.isQualified === "Yes") {
      sheet.getRange(lastRow, 1, 1, 14).setBackground("#d4edda"); // light green
    }
    
    // Auto-resize columns periodically
    if (lastRow % 10 === 0) {
      sheet.autoResizeColumns(1, 14);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: "active", 
      message: "Oasis Emaar Lead Capture is running. Send POST requests with lead data." 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: Set up daily email summary
// To enable: In Apps Script, click Triggers (clock icon) > Add Trigger
// Function: sendDailySummary, Event source: Time-driven, Day timer: 8am-9am
function sendDailySummary() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  
  var todayLeads = [];
  var todayQualified = 0;
  
  for (var i = 1; i < data.length; i++) { // Skip header row
    var timestamp = new Date(data[i][0]);
    if (timestamp >= today) {
      todayLeads.push(data[i]);
      if (data[i][12] === "Yes") { // isQualified column
        todayQualified++;
      }
    }
  }
  
  var totalLeads = data.length - 1; // Exclude header
  
  var subject = "Oasis Emaar Daily Lead Summary - " + todayLeads.length + " New Leads";
  var body = "Daily Lead Summary for " + today.toLocaleDateString() + "\n\n" +
    "New Leads Today: " + todayLeads.length + "\n" +
    "Qualified Today: " + todayQualified + "\n" +
    "Total Leads (All Time): " + totalLeads + "\n\n";
  
  if (todayLeads.length > 0) {
    body += "TODAY'S LEADS:\n" + "=".repeat(50) + "\n\n";
    todayLeads.forEach(function(lead) {
      body += "Name: " + lead[1] + "\n";
      body += "Email: " + lead[2] + "\n";
      body += "Phone: " + lead[3] + "\n";
      body += "Budget: " + lead[4] + "\n";
      body += "Interest: " + lead[7] + "\n";
      body += "Score: " + lead[11] + " | Qualified: " + lead[12] + "\n";
      body += "-".repeat(30) + "\n";
    });
  }
  
  body += "\nView all leads: " + SpreadsheetApp.getActiveSpreadsheet().getUrl();
  
  // Replace with your email address
  var recipientEmail = "sales@oasisemaar.com";
  MailApp.sendEmail(recipientEmail, subject, body);
}
