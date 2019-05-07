const Book = require('../models/book');
const Author = require('../models/author');

module.exports = {
    findAll: (req, res) => {
        Book
            .find(req.query)
            .populate('authors')
            .sort({})
            .then(books => res.json(books))
            .catch(err => res.status(422).json(err));
    },

    findById: (req, res) => {
        Book
            .findById(req.params.id)
            .populate('authors')
            .then(books => res.json(books))
            .catch(err => res.status(422).json(err));
    },

    create: (req, res) => {
        if (req.body.authorId) {
            const { authorId } = req.body;
            return Book
                .create(req.body)
                .then(dbBook => Author.findOneAndUpdate({ _id: authorId }, { $push: { books: dbBook._id } }, { new: true }))
                .then(book => res.json(book))
                .catch(err => res.status(422).json(err));
        }
        return Book
            .create(req.body)
            .then(book => res.json(book))
            .catch(err => res.status(422).json(err));
    },

    update: (req, res) => {
        Book
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(books => res.json(books))
            .catch(err => res.status(422).json(err));
    },

    remove: (req, res) => {
        Book
            .findById({ _id: req.params.id })
            .then(book => book.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
};
