import React, { Component } from 'react';
import PropTypes from 'proptypes';

let friendID;
var url_string = window.location.href;
let searchParams = new URLSearchParams(url.search);
var abc = searchParams.get('c');
var bcd = searchParams.get('varName');
console.log('loooooooooooooooooooooooooo',abc);
console.log('loooooooooooooooooooooooooo',bcd);


  window.onload = function(){
    console.log('5555555555555555555555555555555555',bcd);
    const { startCall } = this.props;
    const config = { audio: true, video};
    startCall(true, bcd, config);
  }
  

MainWindow.propTypes = {
  clientId: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired,
  startCall12: PropTypes.func.isRequired
};

export default MainWindow;
