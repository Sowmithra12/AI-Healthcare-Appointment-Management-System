const bookingAgent = require("../../agents/bookingAgent");

module.exports = async (state) => {
  console.log("===== BOOKING NODE =====");
  console.log("GRAPH STATE");
console.log(state);

    const result = await bookingAgent(

        state.message,

        state.state || {},

        state.patient

    );

    return {

        ...state,

        ...result

    };

};