import React from 'react';
// import logo from './logo.svg';
import {Route, Switch} from 'react-router-dom'
import Helmet from 'react-helmet'
import './App.scss';

import Header from "./components/header/header.component"

import LettersPage from "./pages/letters/letters.page"
import WordsPage from "./pages/words/words.page"


function App() {
  return (
    <div className="App">
      <Helmet>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" />
      </Helmet>
      <Header />
      <main>
        <Switch>
          <Route path="/letters" component={LettersPage} />
          <Route path="/words" component={WordsPage} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
