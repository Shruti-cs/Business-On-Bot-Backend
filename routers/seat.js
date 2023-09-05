const express = require("express");
const auth = require("../middleware/auth");

const {
    getUnavailableSeats,
} = require("../controllers/seat");

const router = express.Router();

router.post('/unavailable', auth, getUnavailableSeats);

module.exports = router