import React, { Component } from 'react';
import PropTypes from 'proptypes';
import classnames from 'classnames';
import _ from 'lodash';
import  endcall  from './app.js'; 

// var endTime = new Date().setTime(1362009600000);
//var currentTime = new Date().getTime();
//var remainingTime = endTime - currentTime;
//var mins = 5;
//var mins = Math.floor((remainingTime/1000)/60);
// calculate the seconds (don't change this! unless time progresses at a different speed for you...)
//var secs = mins * 60;
//var secs = Math.floor(remainingTime/1000);
//var recorder = new RecordRTC_Extension(); 
var blobs = [];
var recorder;
class CallWindow extends Component {
  constructor(props) {
     
    super(props);
    this.state = {
      Video: true,
      Audio: true
    };

    this.btns = [
      { type: 'Video', icon: 'fa-video-camera' },
      { type: 'Audio', icon: 'fa-microphone' }
    ];
    
   

    
    
    
    
  }

  componentDidMount() {
    this.setMediaStream();
    
   
    
    
    
    
  }

  componentWillReceiveProps(nextProps) {
    const { config: currentConfig } = this.props;
    // Initialize when the call started
    if (!currentConfig && nextProps.config) {
      
      const { config, mediaDevice } = nextProps;
      _.forEach(config, (conf, type) => mediaDevice.toggle(_.capitalize(type), conf));

      this.setState({
        Video: config.video,
        Audio: config.audio
      });
    }
    
    
    
  }
  startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
           window.location.replace("https://saasnicwebrtc.herokuapp.com/");
        }else{console.log('Tgggggggggggggggggggggggggggggggggggg');}
    }, 1000);
}

 abc(){
    
    document.getElementById("myBtn").disabled = true;
    var fiveMinutes = 60 * 5,
       display = document.querySelector('#time');
    this.startTimer(fiveMinutes, display);
}
btnstartrecording() {  
  
 if(typeof RecordRTC_Extension === 'undefined') {
  
   if (window.confirm('To enable recording please download the extension by clicking OK')) 
{
window.open(
  'https://chrome.google.com/webstore/detail/recordrtc/ndcljioonkecdnaaihodjgiliohngojp?hl=en',
  '_blank' // <- This is what makes it open in a new window.
);recorder = new RecordRTC_Extension(); 
};
   
}

 recorder = new RecordRTC_Extension();   
document.getElementById("myBtn").disabled = false;
    //var video = document.querySelector('video');
    this.disabled = true;
    // you can find list-of-options here:
    // https://github.com/muaz-khan/Chrome-Extensions/tree/master/screen-recording#getsupoortedformats
    var options = recorder.getSupoortedFormats()[3];
    recorder.startRecording(options, function() {
        document.getElementById('btn-stop-recording').disabled = false;
    });
}   
 stopRecordingCallback(blob) {
    
    var video = document.querySelector('video');
    
    video.src = video.srcObject = null;
   var blob = new File(blobs, 'video.mp4', {
        type: 'video/mp4'
    });
    //video.src = URL.createObjectURL(blob);
    
    recorder = null;
}  
 btnstoprecording(){
  
  //this.disabled = true;

    // third and last step
   var options = recorder.getSupoortedFormats()[3];
    recorder.stopRecording(this.stopRecordingCallback());
   const { peerSrc, localSrc } = this.props;
   this.peerVideo.srcObject = peerSrc; 
} 

  
  componentDidUpdate() {
    this.setMediaStream();
  }

  setMediaStream() {
    const { peerSrc, localSrc } = this.props;
    if (this.peerVideo && peerSrc) {this.abc();this.peerVideo.srcObject = peerSrc;}
    if (this.localVideo && localSrc) this.localVideo.srcObject = localSrc;
  }

  /**
   * Turn on/off a media device
   * @param {String} deviceType - Type of the device eg: Video, Audio
   */
  toggleMediaDevice(deviceType) {
    const { mediaDevice } = this.props;
    const deviceState = _.get(this.state, deviceType);
    this.setState({ [deviceType]: !deviceState });
    mediaDevice.toggle(deviceType);
  }

  renderControlButtons() {
    const getClass = (icon, type) => classnames(`btn-action fa ${icon}`, {
      disable: !_.get(this.state, type)
    });

    return this.btns.map(btn => (
      <button
        key={`btn${btn.type}`}
        type="button"
        className={getClass(btn.icon, btn.type)}
        onClick={() => this.toggleMediaDevice(btn.type)}
      />
    ));
  }

  render() {
    const { status, endCall } = this.props;
    return (
      <div className={classnames('call-window', status)}>
      
      
        <video id="peerVideo" ref={el => this.peerVideo = el} autoPlay />
        <video id="localVideo" ref={el => this.localVideo = el} autoPlay muted />
        <div className="video-control">
<div id="timer">

<span id="time"></span>
</div>


<section id="logs-message" class="experiment" style="display: none;text-align: center;font-size: 1.5em;line-height: 2;color: red;">WebRTC getDisplayMedia API.</section>

 <!-- just copy this <section> and next script -->
 <section class="experiment">
 <section class="hide-after-join" style="text-align: center;"> 
 <input type="text" id="room-name" placeholder="Enter " style="width: 80%; text-align: center; display: none;">
 <button id="share-screen" class="setup">Share Your Screen</button>
 </section>

 <!-- local/remote videos container -->
 <div id="videos-container"></div>

 <section id="unique-token" style="display: none; text-align: center; padding: 20px;"></section>
 </section>
<section><small id="send-message"></small></section>

 </article>

<script>

 var config = {
 // via: https://github.com/muaz-khan/WebRTC-Experiment/tree/master/socketio-over-nodejs
 openSocket: function(config) {
 var SIGNALING_SERVER = 'https://socketio-over-nodejs2.herokuapp.com:443/';

 config.channel = config.channel || location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
 var sender = Math.round(Math.random() * 999999999) + 999999999;

 io.connect(SIGNALING_SERVER).emit('new-channel', {
 channel: config.channel,
 sender: sender
 });

 var socket = io.connect(SIGNALING_SERVER + config.channel);
 socket.channel = config.channel;
 socket.on('connect', function () {
 if (config.callback) config.callback(socket);
 });

 socket.send = function (message) {
 socket.emit('message', {
 sender: sender,
 data: message
 });
 };

 socket.on('message', config.onmessage);
 },
 onRemoteStream: function(media) {
 if(isbroadcaster) return;

 var video = media.video;
 videosContainer.insertBefore(video, videosContainer.firstChild);
 rotateVideo(video);

 document.querySelector('.hide-after-join').style.display = 'none';
 },
 onRoomFound: function(room) {
 if(isbroadcaster) return;

 conferenceUI.joinRoom({
 roomToken: room.roomToken,
 joinUser: room.broadcaster
 });

 document.querySelector('.hide-after-join').innerHTML = '<img src="https://www.webrtc-experiment.com/images/key-press.gif" style="margint-top:10px; width:50%;" />';
 },
 onNewParticipant: function(numberOfParticipants) {
 var text = numberOfParticipants + ' users are viewing your screen!';
 
 if(numberOfParticipants <= 0) {
 text = 'No one is viewing your screen YET.';
 }
 else if(numberOfParticipants == 1) {
 text = 'Only one user is viewing your screen!';
 }

 document.title = text;
 showErrorMessage(document.title, 'green');
 },
 oniceconnectionstatechange: function(state) {
 var text = '';

 if(state == 'closed' || state == 'disconnected') {
 text = 'One of the participants just left.';
 document.title = text;
 showErrorMessage(document.title);
 }

 if(state == 'failed') {
 text = 'Failed to bypass Firewall rules. It seems that target user did not receive your screen. Please ask him reload the page and try again.';
 document.title = text;
 showErrorMessage(document.title);
 }

 if(state == 'connected' || state == 'completed') {
 text = 'A user successfully received your screen.';
 document.title = text;
 showErrorMessage(document.title, 'green');
 }

 if(state == 'new' || state == 'checking') {
 text = 'Someone is trying to join you.';
 document.title = text;
 showErrorMessage(document.title, 'green');
 }
 }
 };

 function showErrorMessage(error, color) {
 var errorMessage = document.querySelector('#logs-message');
 errorMessage.style.color = color || 'red';
 errorMessage.innerHTML = error;
 errorMessage.style.display = 'block';
 }

 function getDisplayMediaError(error) {
 if (location.protocol === 'http:') {
 showErrorMessage('Please test this WebRTC experiment on HTTPS.');
 } else {
 showErrorMessage(error.toString());
 }
 }

 function captureUserMedia(callback) {
 var video = document.createElement('video');
 video.muted = true;
 video.volume = 0;
 try {
 video.setAttributeNode(document.createAttribute('autoplay'));
 video.setAttributeNode(document.createAttribute('playsinline'));
 video.setAttributeNode(document.createAttribute('controls'));
 } catch (e) {
 video.setAttribute('autoplay', true);
 video.setAttribute('playsinline', true);
 video.setAttribute('controls', true);
 }

 if(navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia) {
 function onGettingSteam(stream) {
 video.srcObject = stream;
 videosContainer.insertBefore(video, videosContainer.firstChild);

 addStreamStopListener(stream, function() {
 location.reload();
 });

 config.attachStream = stream;
 callback && callback();
 rotateVideo(video);

 addStreamStopListener(stream, function() {
 location.reload();
 });

 showPrivateLink();

 document.querySelector('.hide-after-join').style.display = 'none';
 }

 if(navigator.mediaDevices.getDisplayMedia) {
 navigator.mediaDevices.getDisplayMedia({video: true}).then(stream => {
 onGettingSteam(stream);
 }, getDisplayMediaError).catch(getDisplayMediaError);
 }
 else if(navigator.getDisplayMedia) {
 navigator.getDisplayMedia({video: true}).then(stream => {
 onGettingSteam(stream);
 }, getDisplayMediaError).catch(getDisplayMediaError);
 }
 }
 else {
 if (DetectRTC.browser.name === 'Chrome') {
 if (DetectRTC.browser.version == 71) {
 showErrorMessage('Please enable "Experimental WebPlatform" flag via chrome://flags.');
 } else if (DetectRTC.browser.version < 71) {
 showErrorMessage('Please upgrade your Chrome browser.');
 } else {
 showErrorMessage('Please make sure that you are not using Chrome on iOS.');
 }
 }

 if (DetectRTC.browser.name === 'Firefox') {
 showErrorMessage('Please upgrade your Firefox browser.');
 }

 if (DetectRTC.browser.name === 'Edge') {
 showErrorMessage('Please upgrade your Edge browser.');
 }

 if (DetectRTC.browser.name === 'Safari') {
 showErrorMessage('Safari does NOT supports getDisplayMedia API yet.');
 }
 }
 }

 /* on page load: get public rooms */
 var conferenceUI = conference(config);

 /* UI specific */
 var videosContainer = document.getElementById("videos-container") || document.body;

 document.getElementById('share-screen').onclick = function() {
 var roomName = document.getElementById('room-name') || { };
 roomName.disabled = true;
 captureUserMedia(function() {
 conferenceUI.createRoom({
 roomName: (roomName.value || 'Anonymous') + ' shared his screen with you'
 });
 });
 this.disabled = true;
 };

 function rotateVideo(video) {
 video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
 //setTimeout(function() {
// video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(360deg)';
// }, 1000);
 }

 function showPrivateLink() {
 var uniqueToken = document.getElementById('unique-token');
 uniqueToken.innerHTML = '<a href="' + location.href + '" target="_blank">Copy & Share This Private Room Link</a>';
 uniqueToken.style.display = 'block';
 }

 </script>






{this.renderControlButtons()}

          <button
            type="button"
            className="btn-action hangup fa fa-phone"
            onClick={() => endCall(true)}
          />

    
      <button
            type="button"
			className="btn-action fa fa-file-video-o"
            Style="background-color: green;"
            onClick={() => this.btnstartrecording()}
          />
        <button
            type="button"
			className="btn-action fa fa-stop"
            id="myBtn"
            Style="background-color: red;"
            onClick={() => this.btnstoprecording()}
          />
        
        </div>
      </div>
    );
  }
}


CallWindow.propTypes = {
  status: PropTypes.string.isRequired,
  localSrc: PropTypes.object, // eslint-disable-line
  peerSrc: PropTypes.object, // eslint-disable-line
  config: PropTypes.object, // eslint-disable-line
  mediaDevice: PropTypes.object, // eslint-disable-line
  endCall: PropTypes.func.isRequired
};

export default CallWindow;
