const fs = require('fs');

const books = JSON.parse(fs.readFileSync(`${__dirname}/../data/book.json`));

exports.getBooksPublication = (req, res) => {
  if (!books || books.length === 0) {
    return res.status(404).json({
      status: 'error',
      message: 'No books found',
    });
  }

  const publicationYears = books.map((book) => {
    if (book.date_published.toLowerCase() === 'bce') {
      return 0;
    } else {
      return parseInt(book.date_published.split('-')[0]);
    }
  });

  const totalBooks = publicationYears.length;
  const totalPublicationYears = publicationYears.reduce(
    (sum, year) => sum + year,
    0
  );

  const averagePublicationYear = totalPublicationYears / totalBooks;
  console.log(averagePublicationYear);
  res.status(200).json({
    status: 'success',
    data: {
      books: books,
      averagePublicationYear: averagePublicationYear,
    },
  });
};

exports.getEarliestBook = (req, res) => {
  if (!books || books.length === 0) {
    return res.status(404).json({
      status: 'error',
      message: 'No books found',
    });
  }

  const earliestBook = books.reduce((earliest, current) => {
    const earliestYear =
      earliest.date_published.toLowerCase() === 'bce'
        ? 0
        : parseInt(earliest.date_published.split('-')[0]);
    const currentYear =
      current.date_published.toLowerCase() === 'bce'
        ? 0
        : parseInt(current.date_published.split('-')[0]);

    return earliestYear < currentYear ? earliest : current;
  });
  console.log(earliestBook);
  res.status(200).json({
    status: 'success',
    data: {
      earliestBook: earliestBook,
    },
  });
};

exports.getBooksAuthor = (req, res) => {
  const authorName = req.query.author;
  if (!authorName) {
    return res.status(404).json({
      status: 'error',
      message: 'Please provide an author name in the query parameter',
    });
  }
  const booksByAuthor = books.filter((book) => book.author === authorName);
  console.log(authorName, booksByAuthor);
  res.status(200).json({
    status: 'success',
    data: {
      author: authorName,
      books: booksByAuthor,
    },
  });
};

exports.getNewestBook = (req, res) => {
  if (!books || books.length === 0) {
    return res.status(404).json({
      status: 'error',
      message: 'No books found.',
    });
  }

  // Find the newest published book
  const newestBook = books.reduce((newest, current) => {
    const newestYear =
      newest.date_published.toLowerCase() === 'bce'
        ? 0
        : parseInt(newest.date_published.split('-')[0]);
    const currentYear =
      current.date_published.toLowerCase() === 'bce'
        ? 0
        : parseInt(current.date_published.split('-')[0]);

    return newestYear > currentYear ? newest : current;
  });

  // Ensure that the identified book has the expected name
  const expectedName = 'The Road'; // Replace with the actual expected name
  if (newestBook.name !== expectedName) {
    return res.status(400).json({
      status: 'error',
      message: 'The identified book does not have the expected name.',
    });
  }
  console.log(newestBook);
  res.status(200).json({
    status: 'success',
    data: {
      newestBook: newestBook,
    },
  });
};

exports.getSortedBooks = (req, res) => {
  if (!books || books.length === 0) {
    return res.status(404).json({
      status: 'error',
      message: 'No books found.',
    });
  }

  const sortedBooks = books.slice().sort((a, b) => {
    const yearA =
      a.date_published.toLowerCase() === 'bce'
        ? 0
        : parseInt(a.date_published.split('-')[0]);
    const yearB =
      b.date_published.toLowerCase() === 'bce'
        ? 0
        : parseInt(b.date_published.split('-')[0]);
    return yearA - yearB;
  });

  console.log(sortedBooks);
  res.status(200).json({
    status: 'success',
    data: {
      books: sortedBooks,
    },
  });
};

exports.getTotalBooks = (req, res) => {
  if (!books || books.length === 0) {
    return res.status(404).json({
      status: 'error',
      message: 'No books found.',
    });
  }

  const totalBooks = books.length;

  const expectedTotal = 20;

  if (totalBooks !== expectedTotal) {
    return res.status(400).json({
      status: 'error',
      message: `Mismatch in total number of books. Expected: ${expectedTotal}, Actual: ${totalBooks}.`,
    });
  }

  console.log(totalBooks);
  res.status(200).json({
    status: 'success',
    data: {
      totalBooks: totalBooks,
    },
  });
};
