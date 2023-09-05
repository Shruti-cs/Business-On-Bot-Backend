const express = require("express");
const auth = require("../middleware/auth");

const {
    book,
    getBookings,
    getBooking
} = require("../controllers/booking");

const router = express.Router();

router.post('/book', auth, book);
router.get('/all', auth, getBookings);
router.get('/:id', auth, getBooking);

module.exports = router