import React, { Component } from 'react';
import PropTypes from 'proptypes';

let friendID;
var url_string = window.location.href;
let searchParams = new URLSearchParams(url.search);
var abc = searchParams.get('c');
var bcd = searchParams.get('varName');
console.log('loooooooooooooooooooooooooo',abc);
console.log('loooooooooooooooooooooooooo',bcd);
function submit()
    {
        document.getElementById("startrunning").click(); // Simulates button click
        document.submitForm.submit(); // Submits the form without the button
    }
class MainWindow extends Component {
  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
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
      <body onload="submit()">
      
      <div className="container main-window">
        <div>
          <h3>
            Hi, your ID is
            <input
              type="text"
              className="txt-clientId"
              defaultValue={clientId}
              readOnly
            />
          </h3>
          <h4>Get started by calling a friend below</h4>
        </div>
        <div>
          


          <input
            type="text"
            className="txt-clientId"
            spellCheck={false}
            placeholder="Your friend ID"
           onChange={event => friendID = event.target.value}
          />
          
          <div>
             <form id="submitForm">
            <button
              type="button"
              className="btn-action fa fa-video-camera"
              onload={this.callWithVideo(true)}
            />
            <button
              type="button"
              className="btn-action fa fa-phone"
              onload={this.callWithVideo12(false)}
            />
             </form>
    
          </div>
        </div>
      </div>
     </body>
    );
  }
}

MainWindow.propTypes = {
  clientId: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired,
  startCall12: PropTypes.func.isRequired
};

export default MainWindow;
