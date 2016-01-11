import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import createMemoryHistory from 'history/lib/createMemoryHistory'
import { Router, Route } from 'react-router';
import Application from '../../../../src/components/routes/application';

describe('route - application', function () {
  function renderIntoRouter(Component) {
    return TestUtils.renderIntoDocument(
      <Router history={createMemoryHistory('/')}>
        <Route path="/" component={Component} />
      </Router>
    );
  }

  it('renders without error', function () {
    const application = renderIntoRouter(Application);

    ReactDOM.findDOMNode(application).firstChild.innerHTML.should.equal('App');
  });
});
