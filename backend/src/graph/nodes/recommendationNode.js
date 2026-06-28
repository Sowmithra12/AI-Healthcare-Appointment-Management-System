const doctorRecommendationAgent =
require("../../agents/doctorRecommendationAgent");

module.exports = async (state) => {

    console.log("===== RECOMMENDATION NODE =====");

    const result =
        await doctorRecommendationAgent(
            state.message
        );

    console.log("RESULT FROM AGENT");
    console.dir(result, { depth: null });

    const newState = {

        ...state,

        action: result.action,

        reply: result.reply || "",

        specialization: result.specialization,

        doctors: result.doctors,

        slots: [],

        appointments: [],

        appointment: null,

        specializations: []

    };

    console.log("RETURNING FROM NODE");
    console.dir(newState, { depth: null });

    return newState;

};