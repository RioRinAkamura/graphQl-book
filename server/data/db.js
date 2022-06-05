const Author = require('../models/Author')
const Book = require('../models/Book')

const mongoDataMethods = {
    // Book
    getAllBooks: async (condition = null) => condition === null ? await Book.find() : await Book.find(condition),
    getBookById: async id => await Book.findById(id),
    createBook: async (args) => {
        const newBook = new Book(args)
        return await newBook.save()

    },


    // Author
    getAllAuthors: async () => await Author.find(),
    getAuthorById: async id => await Author.findById(id),
    createAuthor: async (args) => {
        const newAuthor = new Author(args)
        return await newAuthor.save()
    },

}


module.exports = mongoDataMethods