import nodemailer from "nodemailer";

export const sendContactEmail = async (
  userName: string,
  userEmail: string,
  subject: string,
  message: string
) => {
  try {
    const { SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_HOST, CONTACT_RECEIVER } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_PORT) {
      console.error("Configuración SMTP incompleta");
      return;
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const html = `
      <div style="font-family: sans-serif; padding: 20px; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 10px; border: 1px solid #e5e7eb;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Nuevo Mensaje de Contacto</h2>
          
          <p style="margin: 15px 0;"><strong>Nombre:</strong> ${userName}</p>
          <p style="margin: 15px 0;"><strong>Email de contacto:</strong> ${userEmail}</p>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="color: #4b5563; font-style: italic;">"${message}"</p>
          </div>


        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"${userName}" <${SMTP_USER}>`, // El remitente técnico sigue siendo tu SMTP_USER para evitar spam
      to: CONTACT_RECEIVER || SMTP_USER,   // A dónde quieres que llegue el aviso
      replyTo: userEmail,                  // Para que cuando des a "Responder", le escribas al usuario
      subject: `Contacto: ${subject}`,
      html,
    });

    console.log("Mensaje de contacto enviado:", info.messageId);
  } catch (error) {
    console.error("Error enviando correo de contacto:", error);
  }
};