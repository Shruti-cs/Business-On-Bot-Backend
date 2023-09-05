const express = require("express");
const auth = require("../middleware/auth");

const {
    getMovies,
    getMovie
} = require("../controllers/movie");

const router = express.Router();

router.get('/', auth, getMovies)
router.get('/:movieName', auth, getMovie)

module.exports = router