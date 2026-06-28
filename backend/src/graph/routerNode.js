async function routerNode(state) {

    console.log("===== ROUTER NODE =====");
    console.log("Incoming Message:", state.message);

    const message =
        (state.message || "").toLowerCase();

    // ==========================
    // CONFIRM FLOW
    // ==========================

    if (state.state?.flow === "confirm") {

        console.log("→ Routing to CONFIRM");

        return {

            ...state,

            next: "confirm"

        };

    }

    // ==========================
    // CANCEL FLOW
    // ==========================

    if (

        state.state?.flow === "cancel"

        ||

        (

            state.state?.flow === "reschedule"

            &&

            state.state?.step === "ASK_ACTION"

            &&

            message === "cancel"

        )

        ||

        message.includes("cancel")

    ) {

        console.log("→ Routing to CANCEL");

        return {

            ...state,

            next: "cancel"

        };

    }

    // ==========================
    // RESCHEDULE FLOW
    // ==========================

    if (

        state.state?.flow === "reschedule"

        ||

        message.includes("reschedule")

        ||

        message.includes("busy")

        ||

        message.includes("can't come")

        ||

        message.includes("cannot come")

        ||

        message.includes("cannot attend")

        ||

        message.includes("not available")

        ||

        message.includes("cannot make it")

    ) {

        console.log("→ Routing to RESCHEDULE");

        return {

            ...state,

            next: "reschedule"

        };

    }

    // ==========================
    // QUEUE FLOW
    // ==========================

    if (

        state.state?.flow === "queue"

        ||

        message.includes("queue")

        ||

        message.includes("turn")

        ||

        message.includes("position")

        ||

        message.includes("wait")

        ||

        message.includes("status")

    ) {

        console.log("→ Routing to QUEUE");

        return {

            ...state,

            next: "queue"

        };

    }

    // ==========================
    // DOCTOR RECOMMENDATION
    // ==========================

    if (

        message.includes("pain")

        ||

        message.includes("headache")

        ||

        message.includes("fever")

        ||

        message.includes("rash")

        ||

        message.includes("itching")

        ||

        message.includes("skin")

        ||

        message.includes("chest")

        ||

        message.includes("joint")

        ||

        message.includes("knee")

        ||

        message.includes("back pain")

        ||

        message.includes("migraine")

        ||

        message.includes("dizzy")

    ) {

        console.log("→ Routing to RECOMMENDATION");

        return {

            ...state,

            next: "doctor"

        };

    }

    // ==========================
    // DEFAULT
    // ==========================

    console.log("→ Routing to BOOKING");

    return {

        ...state,

        next: "booking"

    };

}

module.exports = routerNode;