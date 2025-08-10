export const generateReplyTemplate = (ticket, customer, posts = [], tone = 'friendly') => {
  const name = customer.name || 'there'
  const subject = ticket.subject || 'your inquiry'
  const company = customer.company?.name || 'your organization'
  const city = customer.address?.city || 'your location'
  const hasRecentActivity = posts.length > 0
  
  // Analyze ticket sentiment and urgency
  const description = ticket.description || ''
  const isUrgent = /urgent|emergency|critical|asap|immediate/i.test(subject + description)
  const isPositive = /thank|appreciate|love|great|excellent/i.test(description)
  const isNegative = /frustrated|angry|disappointed|terrible|awful/i.test(description)
  
  const templates = {
    friendly: {
      greetings: [
        `Hi ${name}! Thanks for reaching out about "${subject}".`,
        `Hello ${name}! I appreciate you contacting us regarding "${subject}".`,
        `Dear ${name}, thank you for your message about "${subject}".`,
        `Hi there ${name}! I'm here to help with "${subject}".`
      ],
      contexts: [
        `I've reviewed your account with ${company} in ${city}${hasRecentActivity ? ' and noticed your recent activity' : ''}.`,
        `After looking into your profile for ${company} in ${city}, I can see the full picture.`,
        `I've pulled up your information with ${company} in ${city}${hasRecentActivity ? ' and reviewed your recent posts' : ''}.`,
        `Let me help you with this - I've checked your account details for ${company} in ${city}.`
      ],
      actions: isUrgent ? [
        `I understand this is urgent, so I'll prioritize this and investigate immediately.`,
        `Given the urgency, I'll escalate this right away and ensure a swift resolution.`,
        `I see this needs immediate attention - I'm on it and will resolve this quickly.`
      ] : [
        `Here's what I can do: I'll investigate this thoroughly and provide you with a comprehensive solution.`,
        `Let me help you resolve this step by step with a detailed investigation.`,
        `I'm here to assist - I'll look into this carefully and get back to you with the best solution.`,
        `I'll dive into this issue and make sure we get everything sorted out for you.`
      ],
      closings: isNegative ? [
        `I sincerely apologize for any frustration this has caused. Let me make this right for you.`,
        `I understand your disappointment and I'm committed to resolving this to your satisfaction.`
      ] : isPositive ? [
        `Thank you for your patience and for being such a valued customer!`,
        `I appreciate your understanding and look forward to helping you.`
      ] : [
        `Please don't hesitate to share any additional details that might help.`,
        `Feel free to let me know if you have any other questions or concerns.`,
        `I'm here if you need any clarification or have additional information to share.`
      ]
    },
    
    concise: {
      greetings: [
        `Hello ${name},`,
        `Hi ${name},`,
        `Dear ${name},`
      ],
      contexts: [
        `I've reviewed your account.`,
        `I've checked your information.`,
        `Account reviewed.`
      ],
      actions: isUrgent ? [
        `Prioritizing this issue.`,
        `Escalating immediately.`,
        `Fast-tracking resolution.`
      ] : [
        `I'll resolve this for you.`,
        `Working on a solution.`,
        `Investigating now.`
      ],
      closings: [
        `Questions? Let me know.`,
        `Need clarification? Ask away.`,
        `Contact me for updates.`
      ]
    },
    
    formal: {
      greetings: [
        `Dear ${name}, thank you for contacting us regarding "${subject}".`,
        `Dear ${name}, I acknowledge receipt of your inquiry concerning "${subject}".`,
        `Dear ${name}, we have received your message about "${subject}".`
      ],
      contexts: [
        `I have thoroughly reviewed your account information for ${company} located in ${city}.`,
        `Upon examination of your profile with ${company} in ${city}, I have obtained a comprehensive understanding.`,
        `After careful review of your account details with ${company} in ${city}, I am prepared to assist.`
      ],
      actions: [
        `I shall conduct a comprehensive investigation and provide you with a detailed resolution.`,
        `Please allow me to investigate this matter thoroughly and respond with appropriate solutions.`,
        `I will proceed with a detailed analysis and ensure proper resolution of your concern.`
      ],
      closings: [
        `Should you require any additional information or clarification, please do not hesitate to contact me.`,
        `I remain at your disposal for any further assistance you may require.`,
        `Please feel free to reach out if you need any additional support or information.`
      ]
    },
    
    empathetic: {
      greetings: isNegative ? [
        `Hi ${name}, I'm so sorry to hear about the trouble you're experiencing with "${subject}".`,
        `Dear ${name}, I can understand how frustrating this must be regarding "${subject}".`,
        `Hello ${name}, I sincerely apologize for the inconvenience you've faced with "${subject}".`
      ] : [
        `Hi ${name}, I'm here to help you with "${subject}" and want to make sure we get this sorted out.`,
        `Hello ${name}, thank you for reaching out about "${subject}" - I'm committed to helping you.`,
        `Dear ${name}, I appreciate your patience regarding "${subject}" and I'm here to assist.`
      ],
      contexts: [
        `I've carefully reviewed your account with ${company} in ${city} and I want to understand exactly what happened.`,
        `After looking at your information for ${company} in ${city}, I can see why this would be concerning.`,
        `I've examined your profile with ${company} in ${city} and I want to make sure we address this properly.`
      ],
      actions: isUrgent ? [
        `I completely understand the urgency here, and I'm making this my top priority right now.`,
        `I know you need this resolved quickly, so I'm personally ensuring this gets immediate attention.`
      ] : [
        `I want to make sure we solve this completely for you, so I'll investigate every aspect thoroughly.`,
        `Your experience matters to me, so I'll take the time to find the best possible solution.`,
        `I'm committed to making this right for you and will explore every option available.`
      ],
      closings: [
        `Thank you for your patience as we work through this together.`,
        `I'm here for you every step of the way until this is resolved.`,
        `Please know that I'm personally invested in getting this fixed for you.`
      ]
    }
  }
  
  const selectedTone = templates[tone] || templates.friendly
  
  // Smart selection based on context
  const greeting = selectedTone.greetings[Math.floor(Math.random() * selectedTone.greetings.length)]
  const context = selectedTone.contexts[Math.floor(Math.random() * selectedTone.contexts.length)]
  const action = selectedTone.actions[Math.floor(Math.random() * selectedTone.actions.length)]
  const closing = selectedTone.closings[Math.floor(Math.random() * selectedTone.closings.length)]
  
  // Dynamic signature based on urgency and tone
  let signature = 'Best regards,\nCustomer Support Team'
  
  if (tone === 'formal') {
    signature = 'Sincerely,\nCustomer Success Specialist\nZenYC Support Team'
  } else if (isUrgent) {
    signature = 'Priority Support,\nCustomer Success Team\n🚀 Available 24/7'
  } else if (tone === 'empathetic') {
    signature = 'With care,\nCustomer Advocate\nZenYC Support Family'
  }
  
  if (company && tone !== 'concise') {
    signature += `\n\nWe value our partnership with ${company}.`
  }

  return `${greeting}\n\n${context}\n\n${action}\n\n${closing}\n\n${signature}`
}