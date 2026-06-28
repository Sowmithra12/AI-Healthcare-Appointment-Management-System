const express = require("express");

const router = express.Router();

const {

    getDoctors,

    updateAvailability

} = require("../controllers/adminController");

router.get(

    "/doctors",

    getDoctors

);

router.put(

    "/doctor/:id",

    updateAvailability

);

module.exports = router;