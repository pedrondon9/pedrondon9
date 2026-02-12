import nodemailer from "nodemailer"

export const sendVerificationEmail = async (
  to: string,
  url: string,
  title: string,
  description: string,
  test_botton: string
) => {
  try {
    //Verificar que las variables de entorno existen
    const { SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_HOST } = process.env

    console.log(SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_HOST)

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_PORT) {

      console.log('data incomplete')

    }

    //Crear el transportador SMTP
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465, // true si es puerto 465 (SSL)
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    //Contenido HTML del correo
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb;">
        <div style="max-width: 480px; margin: auto; background-color: #fff; padding: 32px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <h2 style="color: #111827; font-size: 24px; margin-bottom: 8px;">${title}</h2>
          <p style="color: #4b5563; font-size: 14px;">${description}</p>
          <a href="${url}" style="
            display: inline-block;
            margin-top: 16px;
            padding: 12px 24px;
            background-color: #2563eb;
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
          ">${test_botton}</a>
          <p style="margin-top: 24px; color: #9ca3af; font-size: 12px;">
            Si no solicitaste esta accion, puedes ignorar este mensaje.
          </p>
        </div>
      </div>
    `

    //xEnviar el correo
    const info = await transporter.sendMail({
      from: `"Soporte" <${SMTP_USER}>`,
      to,
      subject: "Verifica tu correo electrónico",
      html,
    })

    console.log("Correo de verificación enviado:", info.messageId)
  } catch (error) {
    console.error("⚠️ Error enviando correo de verificación:", error)
  }
}
