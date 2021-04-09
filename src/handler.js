const { nanoid } = require('nanoid');
const { books } = require('./books')

const addBookHandler = (request, h) => {
    const { 
        name, year, author, summary,
        publisher, pageCount, readPage,
        reading } = request.payload
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt
    const finished = pageCount === readPage ? true : false
    const newBook = {
        id, name, year, author, summary,
        publisher, pageCount, readPage,
        reading, finished, insertedAt, updatedAt
    }

    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku'
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      });
      response.code(400);
      return response;
    }


    books.push(newBook)

    const isSuccess = books.filter((books) => books.id === id).length > 0
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
              bookId: id,
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

// Belum Done
const getAllBooksHandler = (request, h) => {
  const {id} = request.params;
  const data = books.filter((book) => {
    return book.id
  })
  const response = h.response({
    status: 'success',
    data: books
  });
  response.code(200);
  return response;
}

const getDetailBooksHandler = (request, h) => {
  const {bookId} = request.params;
  const book = books.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
      const response = h.response({
      status: 'success',
      data: book
      });
      response.code(200)
      return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
}

const editBookByIdHanler = (request, h) => {
  const {bookId} = request.params;
  const { 
    name, year, author, summary,
    publisher, pageCount, readPage,
    reading } = request.payload
    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === bookId);
  
  if ( index !== -1 ) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }

    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      });
      response.code(400);
      return response;
    }

    const response = h.response({
      status: 'success',
      message: 'Buku Berhasil Memperbarui Catatan',
    });
    response.code(200);
    return response;
  }
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

const deleteBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku Berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus, Id tidak ditemukan',
  });
  response.code(404);
  return response;

}

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getDetailBooksHandler,
  editBookByIdHanler,
  deleteBookByIdHandler
}

