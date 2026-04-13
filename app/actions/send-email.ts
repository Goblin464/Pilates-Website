type ContactForm = {
  name: string
  email: string
  phone: string
  message: string
  website?: string // honeypot
}

export async function sendEmail(data: ContactForm) {
  const { name, email, phone, message, website } = data

  // 🕳️ Honeypot (Bot-Check)
  if (website) {
    return { success: true } // Bots bekommen fake success
  }

  // 🛡️ Validation
  if (!name || !email || !message) {
    return { success: false, error: "Bitte alle Pflichtfelder ausfüllen." }
  }

  if (message.length > 2000) {
    return { success: false, error: "Nachricht ist zu lang." }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: "Ungültige E-Mail-Adresse." }
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        subject: `Neue Anfrage von ${name}`,
        from_name: "Pure Pilates Website",
        name,
        email,
        phone: phone || "Nicht angegeben",
        message,
      }),
    })

    // 👉 WICHTIG: nur EINMAL lesen
    const result = await response.json()
    console.log("WEB3 RESPONSE:", result)

    if (result.success) {
      return { success: true }
    }

    return {
      success: false,
      error: result.message || "E-Mail konnte nicht gesendet werden.",
    }

  } catch (err) {
    console.error("SEND EMAIL ERROR:", err)

    return {
      success: false,
      error: "Serverfehler. Bitte später erneut versuchen.",
    }
  }
}