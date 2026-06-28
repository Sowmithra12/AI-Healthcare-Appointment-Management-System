const queueAgent =
require("../../agents/queueAgent");

module.exports =
async (state) => {

    console.log("===== QUEUE NODE =====");

    const result =
    await queueAgent(

        state.message,

        state.state,

        state.patient

    );

    return {

        ...state,

        ...result

    };

};