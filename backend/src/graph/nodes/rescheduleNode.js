const rescheduleAgent =
require("../../agents/rescheduleAgent");

module.exports =
async (state) => {

    console.log("===== RESCHEDULE NODE =====");

    const result =
    await rescheduleAgent(

        state.message,

        state.state,

        state.patient

    );

    return {

        ...state,

        ...result

    };

};