export const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
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
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
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
			<a href="https://meetingapp.com"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="MeetingApp Logo"></a>
			<div class="message">OTP Verification Email from GrievEase</div>
			<div class="body">
				<p>Hey there,</p>
				<p>Welcome to GrievEase</! We're excited to have you on board. To get started with your new account, we just need you to verify your identity with the OTP (One-Time Password) below:</p>
				<h2 class="highlight">${otp}</h2>
				<p>This OTP will be valid for the next 5 minutes, so be sure to use it soon. If you didn’t request this, please feel free to ignore this email.</p>
				<p>Once you verify your account, you'll be able to join meetings, manage schedules, and enjoy all the amazing features of MeetingApp.</p>
			</div>
			<div class="support">If you have any questions or need help, we're here for you! Reach us at <a href="mailto:support@meetingapp.com">support@meetingapp.com</a>.</div>
		</div>
	</body>
	
	</html>`;
};