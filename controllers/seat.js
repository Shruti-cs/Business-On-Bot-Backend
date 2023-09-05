const Booking = require("../models/booking");
const Seat = require("../models/seat");

module.exports.getUnavailableSeats = async (req, res) => {
    try {
        const { movie_id, date, time } = req.body
        const movieSeats = await Seat.findOne({ movie_id, date, time }).lean().exec()
        return res.status(200).json({
            unavailableSeats: movieSeats?.seats
        })
    } catch (error) {
        return res.status(500).json({
            message: 'An unexpected error occured!'
        })
    }
}