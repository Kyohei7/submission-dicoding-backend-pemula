const { addBookHandler, 
        getAllBooksHandler, 
        getDetailBooksHandler } = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getDetailBooksHandler
    },
]

module.exports = routes