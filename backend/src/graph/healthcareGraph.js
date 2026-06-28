const {
    StateGraph,
    START,
    END
} = require("@langchain/langgraph");

const HealthcareState =
require("./state");

const routerNode =
require("./routerNode");

const bookingNode =
require("./nodes/bookingNode");

const cancelNode =
require("./nodes/cancelNode");

const rescheduleNode =
require("./nodes/rescheduleNode");

const queueNode =
require("./nodes/queueNode");

const recommendationNode =
require("./nodes/recommendationNode");

const confirmNode =
require("./nodes/confirmNode");

const graph =
new StateGraph({

    channels:
    HealthcareState

});

// =========================
// Nodes
// =========================

graph.addNode(
    "router",
    routerNode
);

graph.addNode(
    "booking",
    bookingNode
);

graph.addNode(
    "cancel",
    cancelNode
);

graph.addNode(
    "reschedule",
    rescheduleNode
);

graph.addNode(
    "queue",
    queueNode
);

graph.addNode(
    "doctor",
    recommendationNode
);

graph.addNode(
    "confirm",
    confirmNode
);

// =========================
// Start
// =========================

graph.addEdge(
    START,
    "router"
);

// =========================
// Conditional Routing
// =========================

graph.addConditionalEdges(

    "router",

    (state) => state.next,

    {

        booking:
        "booking",

        cancel:
        "cancel",

        reschedule:
        "reschedule",

        queue:
        "queue",

        doctor:
        "doctor",

        confirm:
        "confirm"

    }

);

// =========================
// End
// =========================

graph.addEdge(
    "booking",
    END
);

graph.addEdge(
    "cancel",
    END
);

graph.addEdge(
    "reschedule",
    END
);

graph.addEdge(
    "queue",
    END
);

graph.addEdge(
    "doctor",
    END
);

graph.addEdge(
    "confirm",
    END
);

module.exports =
graph.compile();