const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4200;

let books = [
    { "book_id": 1, "title": "Book 1", "author": "Author 1" },
    { "book_id": 2, "title": "Book 2", "author": "Author 2" },
    { "book_id": 3, "title": "Book 3", "author": "Author 3" },
    { "book_id": 4, "title": "Book 4", "author": "Author 4" },
    { "book_id": 5, "title": "Book 5", "author": "Author 5" },
    { "book_id": 6, "title": "Book 6", "author": "Author 6" },
    { "book_id": 7, "title": "Book 7", "author": "Author 7" },
    { "book_id": 8, "title": "Book 8", "author": "Author 8" },
    { "book_id": 9, "title": "Book 9", "author": "Author 9" },
    { "book_id": 10, "title": "Book 10", "author": "Author 10" },
    { "book_id": 11, "title": "Book 11", "author": "Author 11" },
    { "book_id": 12, "title": "Book 12", "author": "Author 12" },
    { "book_id": 13, "title": "Book 13", "author": "Author 13" },
    { "book_id": 14, "title": "Book 14", "author": "Author 14" },
    { "book_id": 15, "title": "Book 15", "author": "Author 15" },
    { "book_id": 16, "title": "Book 16", "author": "Author 16" },
];
let page = 1;
let size = 3;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist/visteon/'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/dist/visteon/index.html')
})

app.get('/api/books', (req, res) => {

    inputPage = parseInt(req.query.page ? req.query.page : page);
    inputSize = parseInt(req.query.size ? req.query.size : size);
    inputTitle = req.query.title ? req.query.title : "";

    var inputBooks = books;

    if (inputTitle != "")
        inputBooks = inputBooks.filter(book => book.title.toLowerCase().includes(inputTitle.toLowerCase()));

    let resultset = [];

    let startIndex = (inputPage * inputSize) - inputSize;
    let endIndex = (inputPage * inputSize);
    startIndex = startIndex >= books.length - 1 ? books.length - 1 : startIndex;
    endIndex = endIndex > books.length - 1 ? books.length - 1 : endIndex;
    endIndex = (startIndex == endIndex) ? (endIndex + 1) : endIndex;

    for (let i = startIndex; i < endIndex; i++) {
        resultset.push(inputBooks[i]);
    }

    res.send(resultset);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));