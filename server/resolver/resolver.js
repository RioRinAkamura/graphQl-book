const { books, authors } = require('../data/static')
const Author = require('../models/Author')
const Book = require('../models/Book')

const resolvers = {
    // Query
    Query: {
        books: async (parent, args, context) => await context.mongoDataMethods.getAllBooks(),
        book: async (parent, args, context) =>
            await context.mongoDataMethods.getBookById(args.id),
        authors: async (parent, args, context) => await context.mongoDataMethods.getAllAuthors(),
        author: async (parent, args, context) => await context.mongoDataMethods.getAuthorById(args.id)
    },
    Book: {
        author: async (parent, args, context) => await context.mongoDataMethods.getAuthorById(parent.authorId)
    },
    Author: {
        books: async (parent, args, context) => await context.mongoDataMethods.getAllBooks({ authorId: parent.id }),
    },

    // Mutaition
    Mutation: {
        createAuthor: async (parent, args, context) =>
            await context.mongoDataMethods.createAuthor(args),
        createBook: async (parent, args, context) =>
            await context.mongoDataMethods.createBook(args)

    }
}

module.exports = resolvers