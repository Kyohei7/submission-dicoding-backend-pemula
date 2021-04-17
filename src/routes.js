const {addBookHandler, getAllBooksHandler, getDetailBooksHandler,
editBookByIdHanler, deleteBookByIdHandler, getListBooksByNameHandler } = require('./handler')

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
    // {
    //     method: 'GET',
    //     path: '/books?{name}',
    //     handler: getListBooksByNameHandler
    // },
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
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookByIdHandler
    },
]

module.exports = routes