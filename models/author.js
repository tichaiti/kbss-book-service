const mongoose = require('mongoose');

const { Schema } = mongoose;

const AuthorSchema = new Schema({
    prenom: String,
    nom: String,
    username: String,
    bio: String,
    photo: Number,
    books: [
        { type: Schema.Types.ObjectId, ref: 'Book' },
    ],
});

const Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;
