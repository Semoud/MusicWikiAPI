const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema(
	{
		thumbnail: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		release_date: {
			type: String,
			required: true,
		},
		tracks: {
			type: Array,
			required: true,
		},
		features: {
			type: Array,
			required: false,
		},
		first_week: {
			type: Number,
			required: false,
		},
	},
	{ timestamps: true }
);

const artistSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		albums: [albumSchema],
		picture: {
			type: String,
			required: true,
		},
		genre: {
			type: Array,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Artist', artistSchema);
