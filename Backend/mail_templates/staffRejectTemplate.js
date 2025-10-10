export const staffAccountRejectionTemplate = (name) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Account Application Update</title>
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
                border: 1px solid #e0e0e0;
                border-radius: 8px;
            }
    
            .logo {
                max-width: 150px;
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
                text-align: left;
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
            <a href="https://your-app-domain.com"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Circus City Logo"></a>
            <div class="message">Update on Your Staff Account Application</div>
            <div class="body">
                <p>Hello <span class="highlight">${name}</span>,</p>
                <p>Thank you for your interest in joining the Circus City team. After careful review, we regret to inform you that we will not be moving forward with your staff account application at this time.</p>
                <p>For security and privacy, your account and all associated data have been permanently removed from our system.</p>
                <p>We appreciate you taking the time to apply and wish you the best in your future endeavors.</p>
            </div>
            <div class="support">If you believe this was a mistake or have any questions, please contact our support team at <a href="mailto:support@circuscity.com">support@circuscity.com</a>.</div>
        </div>
    </body>
    
    </html>`;
};
