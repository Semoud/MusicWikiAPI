require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { getAllArtists } = require('./controllers/artist');
const artist = require('./routes/artist');

// Connect to DB then listen for request on success
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT || 7000, () => {
			console.log(`Server listening on Port ${process.env.PORT}`);
		});
	})
	.catch(error => {
		console.error(error);
	});

// Converts request body to JSON and adds it to request object
app.use(express.json());

// GET all artist
app.get('/api', getAllArtists);

app.use('/api/artist', artist);
