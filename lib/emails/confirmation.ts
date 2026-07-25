export function buildConfirmationEmail(name: string, nextPeriodLabel: string) {
  const firstName = name.split(" ")[0] || "there";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're all set</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5efe6; font-family: 'Inter Tight', system-ui, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5efe6; padding: 48px 24px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px;">

          <tr>
            <td style="padding-bottom: 40px;">
              <span style="font-size: 18px; font-weight: 500; color: #1a1410; letter-spacing: -0.02em;">
                ● Cycle
              </span>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom: 12px;">
              <h1 style="margin: 0; font-size: 36px; font-weight: 400; color: #1a1410; line-height: 1.2; font-family: Georgia, serif;">
                You&rsquo;re all set, ${firstName}.
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom: 36px;">
              <p style="margin: 0; font-size: 16px; color: #4a3f37; line-height: 1.6;">
                We&rsquo;ll remind you and help prep your cart 2 days before
                <strong style="color: #1a1410;">${nextPeriodLabel}</strong> — your next predicted period.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding-top: 8px;">
              <p style="margin: 0; font-size: 13px; color: #4a3f37;">
                Take care of yourself. ♡
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `You're all set, ${firstName}.

We'll remind you and help prep your cart 2 days before ${nextPeriodLabel} — your next predicted period.

Take care of yourself.
— Cycle`;

  return { html, text };
}
