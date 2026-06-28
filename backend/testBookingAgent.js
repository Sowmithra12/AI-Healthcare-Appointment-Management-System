const bookingAgent = require('./src/agents/bookingAgent');

(async () => {
  const patient = {
    _id: 'mock-patient-id',
    name: 'Test Patient',
    phone: '0000000000',
    age: 30
  };

  try {
    const res = await bookingAgent('I need to book an appointment for chest pain', [], patient);
    console.log('Agent response:', res);
  } catch (err) {
    console.error('Agent error:', err);
  }
})();
