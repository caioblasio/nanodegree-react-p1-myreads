import React from 'react'
import ReactDOM from 'react-dom'
import BooksApp from './BooksApp'
import './index.css'

//import BooksApp from './utils/ExampleApp';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <BooksApp />
    </BrowserRouter>, document.getElementById('root'));