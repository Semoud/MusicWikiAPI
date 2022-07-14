const Artist = require('../models/artistModel');

const getAllArtists = async (req, res) => {
	const artists = await Artist.find({});
	res.status(200).json(artists);
};

const createArtist = async (req, res) => {
	const { name, picture, albums, genre } = req.body;
	try {
		const artist = await Artist.create({ name, picture, albums, genre });
		res.status(201).json(artist);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getArtist = async (req, res) => {
	const artist = await Artist.findOne({ name: req.params.artist });
	if (!artist) return res.status(404).json({ error: 'Artist not found' });
	res.status(200).json(artist);
};

const updateArtist = async (req, res) => {
	const artist = await Artist.findOneAndUpdate({ name: req.params.artist }, { ...req.body });
	if (!artist) res.status(404).json({ error: 'Artist not found' });
	res.status(200).json(artist);
};

const deleteArtist = async (req, res) => {
	const artist = await Artist.findOneAndDelete({ name: req.params.artist });
	if (!artist) res.status(404).json({ error: 'Artist not found' });
	res.status(200).json(artist);
};

const createArtistAlbum = async (req, res) => {
	// Checks if the artist parameter exsists
	const artist = await Artist.findOne({ name: req.params.artist });
	if (!artist) return res.status(404).json({ error: 'Artist not found' });

	// Updates the artist albums object with a new entry
	try {
		const artistAlbum = await Artist.findOneAndUpdate({ name: req.params.artist }, { $push: { albums: req.body } });
		res.status(201).json(artistAlbum);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getArtistAlbum = async (req, res) => {
	const artistAlbum = await Artist.findOne({ name: req.params.artist, 'albums.title': req.params.album }, { _id: 1, name: 1, 'albums.$': 1 });
	if (!artistAlbum) return res.status(404).json({ error: 'Artist and album not found' });
	res.status(200).json(artistAlbum);
};

const updateArtistAlbum = async (req, res) => {
	const { thumbnail, title, release_date, tracks, features, first_week } = req.body;
	// If the Track or Features are not set it will assign an empty array
	let newTracks = tracks;
	let newFeatures = features;
	if (!tracks) newTracks = [];
	if (!features) newFeatures = [];

	const artist = await Artist.findOneAndUpdate(
		{ name: req.params.artist, 'albums.title': req.params.album },
		{
			$set: {
				'albums.$.thumbnail': thumbnail,
				'albums.$.title': title,
				'albums.$.release_date': release_date,
				'albums.$.first_week': first_week,
			},
			$addToSet: {
				'albums.$.tracks': { $each: newTracks },
				'albums.$.features': { $each: newFeatures },
			},
		}
	);
	if (!artist) res.status(404).json({ error: 'Artist and album not found' });
	res.status(200).json(artist);
};

const deleteArtistAlbum = async (req, res) => {
	const { artist, album } = req.params;
	const artistAlbum = await Artist.findOneAndUpdate(
		{ name: artist, 'albums.title': album },
		{
			$pull: {
				albums: { title: album },
			},
		}
	);
	if (!artistAlbum) res.status(404).json({ error: 'Artist and album not found' });
	res.status(200).json(artistAlbum);
};

module.exports = {
	getAllArtists,
	createArtist,
	getArtist,
	updateArtist,
	deleteArtist,
	createArtistAlbum,
	getArtistAlbum,
	updateArtistAlbum,
	deleteArtistAlbum,
};
