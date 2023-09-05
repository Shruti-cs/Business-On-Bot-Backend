const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movie_name: {
        type: String
    },
    theatre_name: {
        type: String
    },
    theatre_location: {
        type: String
    },
    release_date: {
        type: String
    }
})

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;