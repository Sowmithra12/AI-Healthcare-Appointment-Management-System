require("dotenv").config();

const connectDB = require("./config/db");
const User = require("./models/User");
const healthcareGraph = require("./graph/healthcareGraph");

async function test() {

    await connectDB();

    const patient = await User.findOne({
        email: "sow@gmail.com"
    });

    const result = await healthcareGraph.invoke({

        message: "book an appointment",

        patient,

        state: {}

    });

    console.log(result);

    process.exit();
}

test();