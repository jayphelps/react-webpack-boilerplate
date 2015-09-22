import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import ApplicationPage from './components/pages/ApplicationPage/ApplicationPage';
import IndexPage from './components/pages/IndexPage/IndexPage';
import AboutPage from './components/pages/AboutPage/AboutPage';

export default (
  <Router history={createHistory()}>
    <Route path="/" component={ApplicationPage} >
      <IndexRoute component={IndexPage} />
      <Route path="about" component={AboutPage}/>
    </Route>
  </Router>
);
