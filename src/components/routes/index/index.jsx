import React, { Component } from 'react';
import applyStyles from 'react-css-modules';
import styles from './index.less';
import { autobind } from 'core-decorators';

export default
@applyStyles(styles)
class IndexPage extends Component {
  @autobind
  didClick() {
    alert('you clicked me!');
  }

  render() {
    return (
      <div styleName="localExample" className="globalExample" onClick={this.didClick}>
        hello world from index
      </div>
    );
  }
}
