export const complaintStatusUpdatedEmail = (name, complaintType, status, complaintId) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Complaint Status Update</title>
      <style>
        body {
          background-color: #ffffff;
          font-family: Arial, sans-serif;
          color: #333333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        .logo {
          max-width: 180px;
          margin-bottom: 20px;
        }
        .title {
          font-size: 22px;
          font-weight: bold;
          color: #222;
          margin-bottom: 10px;
        }
        .body {
          font-size: 16px;
          line-height: 1.6;
          text-align: left;
        }
        .highlight {
          color: #007BFF;
          font-weight: bold;
        }
        .status {
          color: ${
            status === "RESOLVED"
              ? "#16a34a"
              : status === "IN PROGRESS"
              ? "#2563eb"
              : status === "REJECTED"
              ? "#dc2626"
              : "#ca8a04"
          };
          font-weight: bold;
        }
        .footer {
          margin-top: 25px;
          font-size: 14px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img class="logo" src="https://i.ibb.co/MR2qk2D/digit-ledger-logo.png" alt="GrievEase Logo" />
        <div class="title">Complaint Status Updated</div>
        <div class="body">
          <p>Dear ${name},</p>
          <p>
            Your complaint regarding <span class="highlight">${complaintType}</span> 
            (ID: <strong>${complaintId}</strong>) has been updated.
          </p>
          <p>
            Current Status: <span class="status">${status}</span>
          </p>
          <p>
            You can view more details by logging into your GrievEase dashboard.
          </p>
        </div>
        <div class="footer">
          If you have any questions, please contact us at 
          <a href="mailto:support@grievease.in">support@grievease.in</a>.
        </div>
      </div>
    </body>
  </html>`;
};
