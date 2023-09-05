const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const bookingSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    movie_id: {
        type: ObjectId,
        ref: 'Movie'
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    seats: [{
        type: String
    }],
    qr: {
        type: String
    }
})

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;