const Booking = require("../models/booking");
const Seat = require("../models/seat");

module.exports.book = async (req, res) => {
    try {
        const {
            movie_id,
            date,
            time,
            seats,
            qr
        } = req.body;
        const booking = new Booking({
            user: req?.user?._id,
            movie_id,
            date,
            time,
            seats,
            qr
        })
        const movieSeats = await Seat.findOne({ movie_id, date, time }).exec()
        if (movieSeats) {
            let unavailableSeats = movieSeats?.seats
            unavailableSeats = Array.from(new Set([...unavailableSeats, ...seats]))
            movieSeats.seats = unavailableSeats
            await movieSeats.save()
        } else {
            const movieSeats = new Seat({
                movie_id,
                date,
                time,
                seats
            })
            await movieSeats.save()
        }
        const savedBooking = await booking.save()
        res.status(200).json({
            message: '',
            savedBooking
        })
    } catch (error) {
        return res.status(400).json({
            message: error?.toString()
        })
    }
}

module.exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({})
            .populate({ path: 'movie_id' })
            .populate({ path: 'user' })
            .lean()
            .exec()
        return res.status(200).json({
            bookings
        })
    } catch (error) {
        return res.status(500).json({
            message: 'An unexpected error occured!'
        })
    }
}

module.exports.getBooking = async (req, res) => {
    try {
        const { id } = req?.params
        const booking = await Booking.findById(id).lean().exec()
        return res.status(200).json({
            booking
        })
    } catch (error) {
        return res.status(500).json({
            message: 'An unexpected error occured!'
        })
    }
}