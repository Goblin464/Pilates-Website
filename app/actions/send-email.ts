"use server"

type ContactForm = {
  name: string
  email: string
  phone: string
  message: string
}

export async function sendEmail(data: ContactForm) {
  const { name, email, phone, message } = data

  if (!name || !email || !message) {
    return { success: false, error: "Bitte füllen Sie alle Pflichtfelder aus." }
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        subject: `Neue Kontaktanfrage von ${name}`,
        from_name: "Pure Pilates Website",
        name,
        email,
        phone: phone || "Nicht angegeben",
        message,
      }),
    })

    const result = await response.json()

    if (result.success) {
      return { success: true }
    }

    return { success: false, error: "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut." }
  } catch {
    return { success: false, error: "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut." }
  }
}
