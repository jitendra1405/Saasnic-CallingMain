import React, { Component } from 'react';
import PropTypes from 'proptypes';

let friendID;
var url_string = window.location.href;
let searchParams = new URLSearchParams(url.search);
var abc = searchParams.get('c');
console.log('loooooooooooooooooooooooooo',abc);

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
chatting(video){
     resp.writeHead(200, { 'Content-Type': 'text/html' });
     resp.write('<html>
<head>
  <title>Simple Chat via Piping Server</title>
  <style>
    body, input, button {
      font-size: 20px;
    }
    .me {
      text-align: right;
    }
  </style>
</head>
<body>
  <p>
    <input placeholder="Your ID" id='your_id'>
    <input placeholder="Peer ID" id='peer_id'>
    <button onclick='receiveLoop(this)'>Connect</button>
  </p>
  <p style='position: absolute; bottom: 0;'>
    <input placeholder="Message" id='message' size='50'>
    <button onclick="send()">Send</button>
  </p>

  <hr>
  <div id='talks'>
    <!--This will be added by JavaScript -->
  </div>
  <script>
    // Receive-loop
    async function receiveLoop(btn) {
      your_id.disabled = peer_id.disabled = btn.disabled = true;
      while(true) {
        try {
          // Get peer's response
          const res = await fetch(`https://ppng.ml/${peer_id.value}-${your_id.value}`);
          // Create talk element
          const talk = document.createElement('div');
          // Set peer's message
          talk.innerText = await res.text();
          // Add peer's message
          talks.appendChild(talk);
        } catch(err) {
          console.error(err);
        }
      }
    }

    // Send your message
    function send() {
      // Send your message
      fetch(`https://ppng.ml/${your_id.value}-${peer_id.value}`, {
        'method': 'POST',
        body: message.value
      });
      // Create talk element
      const talk = document.createElement('div');
      talk.innerText = message.value;
      talk.classList.add('me');
      talks.appendChild(talk);
      // Empty your message
      message.value = '';
    }
  </script>
</body>
<html>');
    resp.end();
       

}
  
  render() {
    const { clientId } = this.props;
    console.log(`${clientId}`);
    document.title = `${clientId} - VideoCall`;
    return (
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
                <button
              type="button"
              className="btn-action fa fa-phone"
              onClick={this.chatting(false)}
            />
          </div>
        </div>
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
