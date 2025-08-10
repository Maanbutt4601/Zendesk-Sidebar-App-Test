export const generateReplyTemplate = (ticket, customer, posts = [], tone = 'friendly') => {
  const name = customer.name || 'there'
  const subject = ticket.subject || 'your message'
  const company = customer.company?.name || 'your organization'
  const city = customer.address?.city || 'your location'
  const hasRecentActivity = posts.length > 0
  
  // Smart ticket type detection
  const description = (ticket.description || '').toLowerCase()
  const subjectLower = (ticket.subject || '').toLowerCase()
  const fullText = description + ' ' + subjectLower
  
  // Detect ticket type
  const isAppreciation = /thank|appreciate|grateful|excellent|outstanding|amazing|wonderful|great job|well done|kudos|impressed/i.test(fullText)
  const isComplaint = /disappointed|frustrated|angry|terrible|awful|horrible|worst|disgusted|unacceptable/i.test(fullText)
  const isUrgent = /urgent|emergency|critical|asap|immediate|breaking|down|not working/i.test(fullText)
  const isQuestion = /question|how to|help me understand|can you explain|what is|wondering/i.test(fullText)
  const isFeatureRequest = /feature|enhancement|suggestion|improve|add|new functionality|would like to see/i.test(fullText)
  
  // Choose template type
  let templateType = 'standard'
  if (isAppreciation) templateType = 'appreciation'
  else if (isComplaint) templateType = 'complaint'
  else if (isUrgent) templateType = 'urgent'
  else if (isQuestion) templateType = 'question'
  else if (isFeatureRequest) templateType = 'feature'

  const templates = {
    appreciation: {
      friendly: {
        greetings: [
          `Hi ${name}! Thank you so much for taking the time to share this wonderful feedback!`,
          `Hello ${name}! Your message absolutely made our day - thank you!`,
          `Dear ${name}, wow! Thank you for such kind words about our service.`,
          `Hi ${name}! We're thrilled to hear about your positive experience!`
        ],
        contexts: [
          `It means the world to us to know that our team at ${company} in ${city} exceeded your expectations.`,
          `Feedback like yours is what motivates our entire team to keep delivering exceptional service to ${company}.`,
          `We're so glad we could provide the level of service that ${company} deserves.`,
          `Your success with our platform is exactly what we strive for with all our ${city}-based partners.`
        ],
        actions: [
          `I'll make sure to share your feedback with the team - they'll be absolutely delighted to hear this!`,
          `Your kind words will definitely be shared with our support team. They work hard and feedback like this keeps them motivated!`,
          `I'm forwarding your appreciation to our entire support team. Recognition like this means everything to us!`,
          `The team that helped you will be so happy to hear this. I'll make sure they know how much you appreciated their work!`
        ],
        closings: [
          `Thank you for being such a wonderful customer. We're here whenever you need us!`,
          `We truly appreciate customers like you. Please don't hesitate to reach out anytime!`,
          `It's customers like you that make our work so rewarding. Thank you for choosing us!`,
          `We're grateful for your business and look forward to continuing to serve you excellently!`
        ]
      },
      concise: {
        greetings: [`Hi ${name}, thank you for the feedback!`],
        contexts: [`Great to hear ${company} had a positive experience.`],
        actions: [`I'll share this with the team.`],
        closings: [`We appreciate your business!`]
      },
      formal: {
        greetings: [`Dear ${name}, thank you for your valuable feedback regarding our service.`],
        contexts: [`We are pleased to learn that our support exceeded expectations for ${company}.`],
        actions: [`Your commendation will be forwarded to our service team for recognition.`],
        closings: [`We appreciate your continued partnership and look forward to serving you.`]
      },
      empathetic: {
        greetings: [`Dear ${name}, your message truly warmed our hearts!`],
        contexts: [`Knowing we made a positive impact for ${company} in ${city} is incredibly meaningful to us.`],
        actions: [`I'll personally ensure your appreciation reaches every team member who helped you.`],
        closings: [`Thank you for taking time to share this. You've made our entire team's day brighter!`]
      }
    },

    complaint: {
      friendly: {
        greetings: [
          `Hi ${name}, I sincerely apologize for the experience you've described.`,
          `Hello ${name}, I'm truly sorry this happened and want to make it right immediately.`,
          `Dear ${name}, I understand your frustration and I'm here to resolve this right away.`
        ],
        contexts: [
          `I've immediately escalated this to our senior team and reviewed your account with ${company} in ${city}.`,
          `This is absolutely not the standard we hold ourselves to for ${company}. I'm personally investigating.`,
          `I want to ensure ${company} receives the exceptional service you deserve. Let me fix this.`
        ],
        actions: [
          `I'm personally taking ownership of this issue and will provide updates every step of the way.`,
          `I've already started working on a comprehensive solution and will have an update within 2 hours.`,
          `This is now my top priority. I'll stay with this until it's completely resolved to your satisfaction.`
        ],
        closings: [
          `Thank you for giving us the opportunity to make this right. I'm committed to exceeding your expectations.`,
          `I appreciate your patience as we resolve this. You have my personal commitment to excellence.`
        ]
      },
      concise: {
        greetings: [`Hi ${name}, I apologize for this issue.`],
        contexts: [`Investigating your ${company} account immediately.`],
        actions: [`Resolving this as top priority.`],
        closings: [`Will update you within 2 hours.`]
      }
    },

    question: {
      friendly: {
        greetings: [
          `Hi ${name}! Great question about "${subject}".`,
          `Hello ${name}! I'd be happy to help explain this for you.`,
          `Dear ${name}, excellent question! Let me walk you through this.`
        ],
        contexts: [
          `Based on your ${company} account in ${city}, I can provide some specific guidance.`,
          `Looking at your setup with ${company}, here's what I recommend.`,
          `For your ${company} configuration, here's the best approach.`
        ],
        actions: [
          `I'll provide a detailed explanation and some helpful resources to get you started.`,
          `Let me break this down step-by-step and provide some examples specific to your use case.`,
          `I'll give you a comprehensive answer plus some additional tips that might be helpful.`
        ],
        closings: [
          `Please let me know if you need any clarification or have follow-up questions!`,
          `Feel free to ask if anything needs more explanation - I'm here to help!`
        ]
      }
    },

    feature: {
      friendly: {
        greetings: [
          `Hi ${name}! Thank you for this thoughtful feature suggestion.`,
          `Hello ${name}! I love hearing ideas from customers like you at ${company}.`,
          `Dear ${name}, what an interesting enhancement idea!`
        ],
        contexts: [
          `Your perspective as a ${company} user in ${city} gives us valuable insight into real-world needs.`,
          `Feedback from active users like ${company} helps shape our product roadmap.`
        ],
        actions: [
          `I'm forwarding this directly to our product team with details about your ${company} use case.`,
          `I'll make sure this gets proper consideration in our upcoming planning sessions.`,
          `This aligns with feedback we've received from other enterprise customers. I'll prioritize this discussion.`
        ],
        closings: [
          `Keep the great ideas coming! Customer input like yours drives our innovation.`,
          `Thank you for helping us build a better product for companies like ${company}!`
        ]
      }
    },

    urgent: {
      friendly: {
        greetings: [
          `Hi ${name}, I see this is urgent and I'm prioritizing it immediately.`,
          `Hello ${name}, I understand the urgency and I'm on this right now.`,
          `Dear ${name}, I'm treating this as a priority incident for ${company}.`
        ],
        contexts: [
          `I've escalated this to our senior technical team and pulled your ${company} account details.`,
          `Our emergency response team is now engaged for ${company}'s critical issue.`
        ],
        actions: [
          `I'll provide status updates every 30 minutes until this is fully resolved.`,
          `I'm coordinating with our technical team for immediate resolution and will update you within 15 minutes.`
        ],
        closings: [
          `I'm personally monitoring this until resolution. You have my direct attention.`,
          `Thank you for alerting us quickly. We'll get ${company} back up and running ASAP.`
        ]
      }
    },

    standard: {
      // Your existing standard templates here
      friendly: {
        greetings: [
          `Hi ${name}, thanks for reaching out about "${subject}".`,
          `Hello ${name}, I appreciate you contacting us regarding "${subject}".`,
          `Dear ${name}, thank you for your message about "${subject}".`
        ],
        contexts: [
          `I've reviewed your account with ${company} in ${city}${hasRecentActivity ? ' and checked your recent activity' : ''}.`,
          `After looking into your profile for ${company} in ${city}, I can see the full picture.`
        ],
        actions: [
          `Here's what I can do: I'll investigate this thoroughly and provide you with a comprehensive solution.`,
          `I'm here to assist - I'll look into this carefully and get back to you with the best solution.`
        ],
        closings: [
          `Please don't hesitate to share any additional details that might help.`,
          `Feel free to let me know if you have any other questions or concerns.`
        ]
      },
      concise: {
        greetings: [`Hello ${name},`],
        contexts: [`I've reviewed your account.`],
        actions: [`I'll resolve this for you.`],
        closings: [`Questions? Let me know.`]
      }
    }
  }

  // Select appropriate template set
  const selectedTemplate = templates[templateType] || templates.standard
  const toneTemplates = selectedTemplate[tone] || selectedTemplate.friendly || templates.standard.friendly
  
  // Generate response
  const greeting = toneTemplates.greetings[Math.floor(Math.random() * toneTemplates.greetings.length)]
  const context = toneTemplates.contexts[Math.floor(Math.random() * toneTemplates.contexts.length)]
  const action = toneTemplates.actions[Math.floor(Math.random() * toneTemplates.actions.length)]
  const closing = toneTemplates.closings[Math.floor(Math.random() * toneTemplates.closings.length)]
  
  // Smart signature based on ticket type
  let signature = 'Best regards,\nCustomer Support Team'
  
  if (templateType === 'appreciation') {
    signature = 'With gratitude,\nCustomer Success Team\n💙 Thank you for being amazing!'
  } else if (templateType === 'complaint') {
    signature = 'Committed to excellence,\nCustomer Advocate\n🔧 Here to make things right'
  } else if (templateType === 'urgent') {
    signature = 'Priority Support,\nEmergency Response Team\n🚨 24/7 monitoring active'
  } else if (templateType === 'feature') {
    signature = 'Innovation together,\nProduct Team Liaison\n💡 Your ideas shape our future'
  }
  
  if (company && tone !== 'concise' && templateType !== 'appreciation') {
    signature += `\n\nWe value our partnership with ${company}.`
  }

  return `${greeting}\n\n${context}\n\n${action}\n\n${closing}\n\n${signature}`
}