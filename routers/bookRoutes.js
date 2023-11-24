const express = require('express');
const bookController = require('./../controllers/bookController');
const router = express.Router();

router.route('/api').get(bookController.getBooksPublication);

router.route('/earliest').get(bookController.getEarliestBook);

router.route('/name').get(bookController.getBooksAuthor);

router.route('/newest').get(bookController.getNewestBook);

router.route('/sort-by-year').get(bookController.getSortedBooks);

router.route('/total').get(bookController.getTotalBooks);

module.exports = router;
