const Book = require('../models/book');
const Author = require('../models/author');

module.exports = {
    findAll: (req, res) => {
        Author
            .find(req.query)
            .populate('books')
            .sort({})
            .then(author => res.json(author))
            .catch(err => res.status(422).json(err));
    },

    findById: (req, res) => {
        Author
            .findById(req.params.id)
            .populate('books')
            .then(author => res.json(author))
            .catch(err => res.status(422).json(err));
    },

    create: (req, res) => {
        if (req.body.bookId) {
            const { bookId } = req.body;
            return Author
                .create(req.body)
                .then(dbAuthor => Book.findOneAndUpdate({ _id: bookId }, { $push: { authors: dbAuthor._id } }, { new: true }))
                .then(author => res.json(author))
                .catch(err => res.status(422).json(err));
        }
        return Author
            .create(req.body)
            .then(author => res.json(author))
            .catch(err => res.status(422).json(err));
    },

    update: (req, res) => {
        Author
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(author => res.json(author))
            .catch(err => res.status(422).json(err));
    },

    remove: (req, res) => {
        Author
            .findById({ _id: req.params.id })
            .then(author => author.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
};
