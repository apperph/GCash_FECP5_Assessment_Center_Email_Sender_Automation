function sendEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("not yet sent"); // Change if needed
  var data = sheet.getDataRange().getValues(); // Get all data from the sheet
  var sentCount = 0;
  var senderEmail = "coach@apper.ph"; // Change to your Google Group email
  var imageUrl = "https://drive.google.com/uc?export=view&id=15wH43J7sN-O3i4jM0WcCKItUt74hN_0j"; // Optional: Change to your actual image URL

  for (var i = 1; i < data.length; i++) { // Start from 1 to skip headers
    var firstName = data[i][0]; // Column A: First Name
    var lastName = data[i][1];  // Column B: Last Name
    var email = data[i][2];     // Column C: Email
    var password = data[i][3];  // Column D: Password

    if (!firstName || !lastName || !email || !password) {
      Logger.log("Skipping row " + (i + 1) + " due to missing data.");
      continue; // Skip empty rows
    }

    var subject = "Online Assessment for GCash Fintech Engineer Cadetship Program 2025!";
    
    var body = `
      <p><b>Congratulations, Aspiring Cadet!</b></p>

      <p>You have passed the first screening of the <b>GCash Fintech Engineer Cadetship Program 2025</b>!</p>

      <p>To proceed with your application, please complete your online assessment through this link:<br>
      <a href="https://candidate.gcashfintechcadetship.xyz/" target="_blank">https://candidate.gcashfintechcadetship.xyz/</a></p>

      <p><b>The Online Assessment will be open from today until Saturday, March 29, 2025, at 4:00 PM.</b></p>

      <p><b>Instructions:</b></p>
      <ul>
        <li>In your preferred browser, go to <a href="https://candidate.gcashfintechcadetship.xyz/" target="_blank">https://candidate.gcashfintechcadetship.xyz/</a></li>
        <li>Click on <b>"Start Assessment"</b> and fill out the necessary details.</li>
      </ul>

      <p><b>Your exam password:</b> <span style="font-size: 18px; color: #007bff;">${password}</span></p>

      <p><b>Best of luck!</b></p>

      <p>Best,</p>
      <p>GCash FECP5 Enablement Partner</p>
      
      

      <br>
      <img src="${imageUrl}" alt="Signature" width="200"> 
      <p><b>Technical Support Inquiries: coach@apper.ph</b><p>
    `;

    try {
      GmailApp.sendEmail(email, subject, "", {
        from: senderEmail,  // Send from Group Email
        name: "GCash FECP5 Enablement Partner", // Customize sender name
        htmlBody: body // Use HTML for formatting
      });
      Logger.log("✅ Email sent to: " + email);
      sentCount++;

      Utilities.sleep(2000); // 2-second delay to avoid spam flags
    } catch (e) {
      Logger.log("❌ Failed to send to: " + email + " - " + e.message);
    }
  }

  SpreadsheetApp.getUi().alert(sentCount + " emails sent successfully!");
}
