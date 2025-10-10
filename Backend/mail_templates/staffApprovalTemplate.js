
export const staffAccountApprovedTemplate = (firstName) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Staff Account Approved</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
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
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
                text-align: left; /* Aligned left for better readability */
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #28a745; /* Green for approval */
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="#"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Circus City Logo"></a>
            <div class="message">Your Staff Account is Now Active!</div>
            <div class="body">
                <p>Hello <span class="highlight">${firstName}</span>,</p>
                <p>Great news! Your staff account for the Circus City portal has been reviewed and <span class="highlight">approved</span> by an administrator.</p>
                <p>You can now log in using the credentials you signed up with to access staff-only features, view assigned tasks, and manage complaints.</p>
                <p>Welcome to the team! We're excited to have you on board.</p>
                <a href="#" class="cta">Login to Your Account</a>
            </div>
            <div class="support">If you have any questions or need help, please contact the administration office or reply to this email.</div>
        </div>
    </body>
    
    </html>`;
};

