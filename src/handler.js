const { nanoid } = require('nanoid');
const books = require('./books')

const addBookHandler = (request, h) => {
    const { 
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt
    const finished = pageCount === readPage ? true : false
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        insertedAt,
        updatedAt
    }
    books.push(newBook)
    const isSuccess = books.filter((books) => books.id === id).length > 0
    console.log(isSuccess);
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
              nodeId: id,
            },
          });
          response.code(201);
          return response;
    }
    
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
      });
      response.code(500);
      return response;
}

module.exports = { addBookHandler }

