const { createArtist, getArtist, updateArtist, deleteArtist, createArtistAlbum, getArtistAlbum, updateArtistAlbum, deleteArtistAlbum } = require('../controllers/artist');
const express = require('express');
const router = express.Router();

// CREATE single artist
router.post('/', createArtist);

// GET single artist
router.get('/:artist', getArtist);

// // UPDATE single artist
router.patch('/:artist', updateArtist);

// // DELETE single artist
router.delete('/:artist', deleteArtist);

// // CREATE single artist album
router.post('/:artist/album', createArtistAlbum);

// // GET single artist album
router.get('/:artist/:album', getArtistAlbum);

// // UPDATE single artist album
router.patch('/:artist/:album', updateArtistAlbum);

// // DELETE single artist album
router.delete('/:artist/:album', deleteArtistAlbum);

module.exports = router;
