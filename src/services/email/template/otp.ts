export const OtpHTMLTemplate = (firstname: string, otp: string, otpPurpose: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>100xCode OTP Verification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; margin-top: 40px; margin-bottom: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden;">
        
        <!-- Header -->
        <tr>
          <td align="center" style="padding: 32px 0; background-color: #09090b; border-bottom: 1px solid #27272a;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">100xCode</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding: 40px 32px;">
            <p style="margin: 0 0 16px 0; font-size: 16px; color: #3f3f46; line-height: 24px;">
              Hi <strong>${firstname}</strong>,
            </p>
            <p style="margin: 0 0 24px 0; font-size: 16px; color: #3f3f46; line-height: 24px;">
              You recently requested to <strong>${otpPurpose}</strong>. Please use the verification code below to complete this process:
            </p>

            <!-- OTP Box -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td align="center" style="background-color: #f4f4f5; border-radius: 6px; padding: 24px;">
                  <div style="font-family: monospace; font-size: 32px; font-weight: 700; color: #18181b; letter-spacing: 6px;">
                    ${otp}
                  </div>
                </td>
              </tr>
            </table>

            <p style="margin: 24px 0 0 0; font-size: 14px; color: #71717a; line-height: 20px; text-align: center;">
              This code will expire in 5 minutes.
            </p>
            <p style="margin: 16px 0 0 0; font-size: 14px; color: #71717a; line-height: 20px; text-align: center;">
              If you didn't request this, you can safely ignore this email and your account will remain secure.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding: 24px 32px; background-color: #f4f4f5; border-top: 1px solid #e4e4e7;">
            <p style="margin: 0; font-size: 12px; color: #a1a1aa;">
              &copy; ${new Date().getFullYear()} 100xCode. All rights reserved.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};