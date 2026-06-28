const cancelAgent =
require("../../agents/cancelAgent");

module.exports =
async (state) => {

    console.log("===== CANCEL NODE =====");

    const result =
    await cancelAgent(

        state.message,

        state.state,

        state.patient

    );

    return {

        ...state,

        ...result

    };

};