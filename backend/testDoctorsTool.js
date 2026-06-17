const mongoose =
  require("mongoose");

const dotenv =
  require("dotenv");

dotenv.config();

const getDoctorsBySpecialization =
  require(
    "./src/tools/getDoctorsTool"
  );

async function test() {

  await mongoose.connect(
    process.env.MONGO_URI
  );

  const doctors =
    await getDoctorsBySpecialization(
      "Dermatologist"
    );

  console.log(doctors);

  process.exit();

}

test();