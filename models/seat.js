const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const seatsSchema = new mongoose.Schema({
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
    }]
})

const Seat = mongoose.model("Seat", seatsSchema);

module.exports = Seat;