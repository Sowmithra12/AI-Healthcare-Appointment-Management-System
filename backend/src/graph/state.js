const HealthcareState = {

  message: {
    value: (x, y) => y ?? x,
    default: () => ""
  },

  patient: {
    value: (x, y) => y ?? x,
    default: () => null
  },

  state: {
    value: (x, y) => y ?? x,
    default: () => ({})
  },

  next: {
    value: (x, y) => y ?? x,
    default: () => ""
  },

  action: {
    value: (x, y) => y ?? x,
    default: () => ""
  },

  reply: {
    value: (x, y) => y ?? x,
    default: () => ""
  },

  specialization: {
    value: (x, y) => y ?? x,
    default: () => ""
  },
  
  doctors: {
    value: (x, y) => y ?? x,
    default: () => []
  },

  slots: {
    value: (x, y) => y ?? x,
    default: () => []
  },

  appointments: {
    value: (x, y) => y ?? x,
    default: () => []
  },

  appointment: {
    value: (x, y) => y ?? x,
    default: () => null
  },

  specializations: {
    value: (x, y) => y ?? x,
    default: () => []
  }

};

module.exports = HealthcareState;