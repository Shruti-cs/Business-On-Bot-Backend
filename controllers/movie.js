const Movie = require("../models/movie");

module.exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
            .lean()
            .exec()
        return res.status(200).json({
            movies
        })
    } catch (error) {
        return res.status(500).json({
            message: 'An unexpected error occured!'
        })
    }
}

module.exports.getMovie = async (req, res) => {
    try {
        const { movieName } = req?.params
        const movie = await Movie.findOne({ movie_name: movieName })
            .lean()
            .exec()
        return res.status(200).json({
            movie
        })
    } catch (error) {
        return res.status(500).json({
            message: 'An unexpected error occured!'
        })
    }
}