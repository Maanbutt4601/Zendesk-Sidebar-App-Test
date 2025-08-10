export const generateReplyTemplate = (ticket, customer, posts = [], tone = 'friendly') => {
  const name = customer.name || 'there'
  const subject = ticket.subject || 'your inquiry'
  const company = customer.company?.name || 'your organization'
  const city = customer.address?.city || 'your location'
  
  // Add variations for regenerate functionality
  const variations = {
    friendly: {
      greetings: [
        `Hi ${name}, thanks for reaching out about "${subject}".`,
        `Hello ${name}, I appreciate you contacting us regarding "${subject}".`,
        `Dear ${name}, thank you for your message about "${subject}".`
      ],
      contexts: [
        `I've reviewed your message and account with ${company} in ${city}.`,
        `I've looked into your account details for ${company} in ${city}.`,
        `After reviewing your information with ${company} in ${city}, I can help.`
      ],
      actions: [
        `Here's what I can do next: I'll investigate this matter thoroughly and provide you with a comprehensive solution.`,
        `Let me help you resolve this: I'll look into this issue right away and get back to you with a solution.`,
        `I'm here to assist: I'll investigate this immediately and provide you with the best possible resolution.`
      ],
      closings: [
        `Please confirm any extra details so I can proceed with the best possible assistance.`,
        `Let me know if you have any additional information that might help resolve this faster.`,
        `Feel free to share any other details that could help me assist you better.`
      ]
    },
    concise: {
      greetings: [
        `Hello ${name},`,
        `Hi ${name},`,
        `Dear ${name},`
      ],
      contexts: [
        `I've reviewed your message.`,
        `I've checked your account.`,
        `I've looked into this.`
      ],
      actions: [
        `I'll help resolve this for you.`,
        `I'll fix this issue.`,
        `I'll handle this matter.`
      ],
      closings: [
        `Please let me know if you need clarification.`,
        `Contact me if you have questions.`,
        `Let me know if you need more help.`
      ]
    }
  }
  
  const toneVariations = variations[tone] || variations.friendly
  
  // Randomly select variations (this makes regenerate work)
  const greeting = toneVariations.greetings[Math.floor(Math.random() * toneVariations.greetings.length)]
  const context = toneVariations.contexts[Math.floor(Math.random() * toneVariations.contexts.length)]
  const action = toneVariations.actions[Math.floor(Math.random() * toneVariations.actions.length)]
  const closing = toneVariations.closings[Math.floor(Math.random() * toneVariations.closings.length)]
  
  const signature = tone === 'concise'
    ? `Best regards,\nCustomer Support Team`
    : `Best regards,\nCustomer Support Team\n\nWe appreciate your business with ${company}.`

  return `${greeting}\n\n${context}\n\n${action}\n\n${closing}\n\n${signature}`
}