import React, {Component} from 'react';
import './navbar.less'
export default class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        {this.props.title}
      </div>
    )
  }
}