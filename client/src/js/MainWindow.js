import React, { Component } from 'react';
import PropTypes from 'proptypes';
import  startCall  from './app.js';
let friendID;
var url_string = window.location.href;
let searchParams = new URLSearchParams(url.search);
var abc = searchParams.get('c');
var bcd = searchParams.get('varName');
console.log('loooooooooooooooooooooooooo',abc);
console.log('loooooooooooooooooooooooooo',bcd);

class MainWindow extends Component {
  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
  constructor(props) {
     
    super(props);
    const config = { audio: true};
    this.startCall(true, friendID, config);
  }
  
  
  callWithVideo(video) {
    const { startCall } = this.props;
    const config = { audio: true, video};
    return () => startCall(true, friendID, config);
  }
  callWithVideo12(video) {
    const { startCall12 } = this.props;
    const config = { audio: true, video: false};
    return () => startCall12(true, friendID, config);
  }

  
  render() {
    const { clientId } = this.props;
    console.log(`${clientId}`);
    document.title = `${clientId} - VideoCall`;
    return (
      <div className="container main-window">
        <button
              type="button"
              className="btn-action fa fa-video-camera"
              onClick={this.callWithVideo(true)}
            />
            <button
              type="button"
              className="btn-action fa fa-phone"
              onClick={this.callWithVideo12(false)}
            />
          </div>
    );
  }
}

MainWindow.propTypes = {
  clientId: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired,
  startCall12: PropTypes.func.isRequired
};

export default MainWindow;
