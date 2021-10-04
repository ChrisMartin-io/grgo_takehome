
# Grabango exercise

## **Overview**
Sample library app, built on Postgres database with Flask & SQLAlchemy on the back end and React on the front end. Data set is Amazon top 50 bestselling books 2009-2019, found here: https://www.kaggle.com/sootersaalu/amazon-top-50-bestselling-books-2009-2019.

--

In case it might be helpful, I've recorded a demo video of installation and functionality. [Demo video here](https://vimeo.com/622656058)
## **Contents**
* [Directory Index](#directory-index)
* [Installation](#installation)
* [Testing](#testing)
* [Project details](#project-details)

## **Directory Index**
```
├── README.md
├── backend
│   ├── app.py
│   ├── books2.csv
│   ├── db.py
│   ├── models.py
│   └── requirements.txt
└── frontend
    ├── package.json
    ├── public
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src
    │   ├── App.css
    │   ├── App.js
    │   ├── Components
    │   │   ├── AutoComplete.js
    │   │   ├── Books.js
    │   │   ├── BorrowedBooks.js
    │   │   ├── Interface
    │   │   │   ├── Button.js
    │   │   │   ├── Input.js
    │   │   │   └── Table.js
    │   │   ├── Main.js
    │   │   ├── Search.js
    │   │   └── Users.js
    │   ├── Styles
    │   │   └── Main.css
    │   ├── Tests
    │   │   ├── App.test.js
    │   │   └── Main.test.js
    │   ├── index.css
    │   ├── index.js
    │   └── reportWebVitals.js
    └── yarn.lock
```

## **Installation**
```
git clone git@github.com:ChrisMartin-io/grgo_takehome.git
cd grgo_takehome
```
### **Back end**
```
cd backend
pip3 install -r requirements.txt
createdb grgo_takehome
python3 -m venv venv
source venv/bin/activate
flask run
```
### **Front end**
```
cd frontend
yarn install
yarn start
```

## **Testing**
### **Back end**
```
cd backend
py.test -vv
```
Expected response:
```
===================================================== test session starts ======================================================
platform darwin -- Python 3.9.7, pytest-6.2.5, py-1.10.0, pluggy-1.0.0 -- /usr/local/opt/python@3.9/bin/python3.9
cachedir: .pytest_cache
rootdir: /Users/chris/work/grabango/backend
collected 12 items                                                                                                             

test_app.py::test_hello_world PASSED                                                                                     [  8%]
test_app.py::test_search PASSED                                                                                          [ 16%]
test_app.py::test_empty_search PASSED                                                                                    [ 25%]
test_app.py::test_autocomplete PASSED                                                                                    [ 33%]
test_app.py::test_books PASSED                                                                                           [ 41%]
test_app.py::test_users PASSED                                                                                           [ 50%]
test_app.py::test_borrow_get PASSED                                                                                      [ 58%]
test_app.py::test_borrow_post PASSED                                                                                     [ 66%]
test_app.py::test_borrow_delete PASSED                                                                                   [ 75%]
test_app.py::test_borrow_error PASSED                                                                                    [ 83%]
test_app.py::test_borrow_error_post PASSED                                                                               [ 91%]
test_app.py::test_incorrect_route PASSED                                                                                 [100%]

====================================================== 12 passed in 0.80s ======================================================
```
### **Front end**
```
cd frontend
yarn test --verbose
```
Expected response:
```
PASS src/Tests/Main.test.js
  Component renders
    ✓ Main component (28 ms)
    ✓ AutoComplete component (70 ms)
    ✓ Books component (2 ms)
    ✓ BorrowedBooks component (1 ms)
    ✓ Search component (15 ms)
  Interface renders
    ✓ Button (5 ms)
    ✓ Input (1 ms)
    ✓ Table (1 ms)

PASS src/App.test.js
  App
    ✓ renders App component (20 ms)

Test Suites: 2 passed, 2 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        1.684 s, estimated 2 s
Ran all test suites.
✨  Done in 2.48s.
```
## **Project Details**
 To reserve a book, you can search for it first, or use the autocomplete box. Each action pulls directly from the database. Then click on the user and book to reserve, and click borrow. To return a book, highlight the book in the Borrowed Books box, and click return. 
### Database
3 tables:
* **books** - contains all books and additional info (ie year, reviews, genre)
* **users** - list of users, pre-populated
* **borrowed_books** - composite of 2 foreign keys, books.id and users.id


### Back end
* **db.py** - imports 'books.csv' with pandas and populates data base with book details and users
* **models.py** - using SQLAlchemy, creates models and tables for the 3 tables mentioned above
* **app.py** - main app, with the following routes available:
  * **GET '/'** - hello world
  * **GET '/books'** - get all books
  * **GET '/users'** - get all users
  * **GET '/search?term='** - get all results that has [term] in them
  * **GET '/autocomplete?term='** - get all results the begins with [term]
  * **GET '/borrow'** - get all books borrowed - JOINS users and books tables
  * **POST '/borrow'** - create new entry of borrowed book
  * **DELETE '/borrow'** - remove existing entry of borrowed book

 ### Front End
* **Main.js** - main window render
  * **Functional Components**:
    * **Books.js** - Displays books from db, either all books or narrowed by search / autocomplete
    * **Users.js** - Displays users from db
    * **BorrowedBooks** - Displays borrowed books from db
    * **Search** - Search bar, updates Books component from db on state change for any book containing term
    * **Autocomplete** - Autocomplete bar, updates Books component on state change, displays autocomplete text
  * **Interface Components**:
    * **Button.js** - used for Borrow and Return
    * **Input.js** - used for Search and Autocomplete
    * **Table.js** - used for Books, Users, BorrowedBooks