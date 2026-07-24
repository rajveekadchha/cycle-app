import { PERIOD_KIT_ITEMS as PRODUCTS } from "@/lib/cart-items";

export function buildReminderEmail(name: string, cartUrl: string) {
  const firstName = name.split(" ")[0];

  const productRows = PRODUCTS.map(
    (p) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #ede4d3;">
        <a href="${p.url}"
           style="color: #6e1f3a; font-size: 15px; text-decoration: none; font-family: 'Inter Tight', system-ui, sans-serif;">
          ${p.name} →
        </a>
      </td>
    </tr>`
  ).join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your period kit is almost ready</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5efe6; font-family: 'Inter Tight', system-ui, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5efe6; padding: 48px 24px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom: 40px;">
              <span style="font-size: 18px; font-weight: 500; color: #1a1410; letter-spacing: -0.02em;">
                ● Cycle
              </span>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td style="padding-bottom: 12px;">
              <h1 style="margin: 0; font-size: 36px; font-weight: 400; color: #1a1410; line-height: 1.2; font-family: Georgia, serif;">
                Hi ${firstName}, your period is in 2 days.
              </h1>
            </td>
          </tr>

          <!-- Subtext -->
          <tr>
            <td style="padding-bottom: 36px;">
              <p style="margin: 0; font-size: 16px; color: #4a3f37; line-height: 1.6;">
                Here&rsquo;s what we&rsquo;d suggest picking up from Instamart before it arrives.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <a href="${cartUrl}"
                 style="display: inline-block; background: #6e1f3a; color: #f5efe6; font-size: 15px; font-weight: 500; text-decoration: none; padding: 16px 32px; border-radius: 999px; font-family: 'Inter Tight', system-ui, sans-serif;">
                Prepare my cart →
              </a>
            </td>
          </tr>

          <!-- Products -->
          <tr>
            <td style="background: #ffffff; border-radius: 16px; padding: 8px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${productRows}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 40px;">
              <p style="margin: 0; font-size: 13px; color: #4a3f37;">
                You&rsquo;re receiving this because you set up Cycle.
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

  const text = `Hi ${firstName},

Your period is in 2 days. Prepare your cart: ${cartUrl}

Or grab items individually from Instamart:

${PRODUCTS.map((p) => `- ${p.name}: ${p.url}`).join("\n")}

Take care of yourself.
— Cycle`;

  return { html, text };
}
