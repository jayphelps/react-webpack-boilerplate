import React, { addons, findDOMNode } from 'react';
import createMemoryHistory from 'history/lib/createMemoryHistory'
import { Router, Route } from 'react-router';
import Application from 'etui/components/routes/application';

const { TestUtils } = addons;

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

    findDOMNode(application).firstChild.innerHTML.should.equal('App');
  });
});
