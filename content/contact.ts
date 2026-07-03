// Contact copy: the section intro + direct links, the form's labels /
// placeholders / button text / messages, and the API's user-facing responses.
//
// The form's field-error strings are the single source of truth for BOTH the
// client-side validation (contact-form.tsx) and the server-side validation
// (lib/contact.ts), so they can never drift apart.
export const contact = {
  section: {
    intro:
      "Whether it's an interesting project, a difficult engineering problem, or just a conversation worth having, feel free to reach out. Drop a note below and it'll land straight in my inbox.",
    directLabel: "Prefer something direct?",
    social: {
      // Email aria label is composed as `${emailAriaPrefix} ${site.email}`.
      emailAriaPrefix: "Email",
      githubAria: "GitHub profile",
      githubTitle: "GitHub",
      linkedinAria: "LinkedIn profile",
      linkedinTitle: "LinkedIn",
    },
  },
  form: {
    labels: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
    },
    placeholders: {
      name: "Who are you?",
      email: "you@example.com",
      subject: "What's on your mind?",
      message: "Tell me more.",
    },
    submit: "Send message",
    submitting: "Sending…",
    success: "Thanks for reaching out. I'll be in touch soon.",
    errors: {
      // Field-level (shared client + server).
      name: "Please enter your name.",
      email: "Please enter your email.",
      emailInvalid: "Please enter a valid email address.",
      subject: "Please enter a subject.",
      message: "Please enter a message.",
      // Client-side generic fallbacks.
      sendFailed: "Your message couldn't be sent. Please try again.",
      network: "Network error — please check your connection and try again.",
    },
  },
  /** User-facing responses returned by app/api/contact/route.ts. */
  api: {
    invalidBody: "Invalid request body.",
    validationFailed: "Please check the form and try again.",
    notConfigured:
      "The contact form isn't configured yet. Please email me directly.",
    sendFailed: "Your message couldn't be sent. Please try again in a moment.",
    unexpected: "Something went wrong. Please try again.",
    rateLimited: "Too many messages from this network. Please try again later.",
    methodNotAllowed: "Method not allowed.",
  },
} as const
