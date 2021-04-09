const { addBookHandler, 
        getAllBooksHandler, 
        getDetailBooksHandler,
        editBookByIdHanler } = require('./handler')

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
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookByIdHanler
    },
]

module.exports = routes