import React, { Component } from 'react';
import applyStyles from 'react-css-modules';
import styles from './style.less';
import { Link } from 'react-router';

export default
@applyStyles(styles)
class Application extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
