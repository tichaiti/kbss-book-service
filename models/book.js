const mongoose = require('mongoose');

const { Schema } = mongoose;


const BookSchema = new Schema({
    inventaire: Number,
    dateEnregistrement: {
        type: Date,
        default: Date.now,
    },
    description: String,
    lieuEdition: String,
    dateEdition: {
        type: String,
        default: Date.now,
    },
    nombrePage: Number,
    observation: String,
    nomLivre: String,
    authors: [
        { type: Schema.Types.ObjectId, ref: 'Author' },
    ],
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;
