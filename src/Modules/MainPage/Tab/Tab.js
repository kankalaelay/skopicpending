import React, { Component } from 'react';
import "./Tab.css"
class Tab extends Component {
    onClick = () => {
      const { label, onClick } = this.props;
      onClick(label);
    }
  
    render() {
      const {
        onClick,
        props: {
          activeTab,
          label,
        },
      } = this;
  
      let className = 'tab-list-item';
  
      if (activeTab === label) {
        className += ' tab-list-active';
      }
  
      return (
        <div
          className={className}
          onClick={onClick}
        >
          {label}
        </div>
      );
    }
  }
  
  export default Tab;