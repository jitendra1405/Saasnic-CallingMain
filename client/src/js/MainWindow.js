import React, { Component } from 'react';
import PropTypes from 'proptypes';
let friendID;
var url_string = window.location.href;
let searchParams = new URLSearchParams(url.search);
var bcd = searchParams.get('varName');
var abc = searchParams.get('FriendId');


class MainWindow extends Component {
/**
* Start the call with or without video
* @param {Boolean} video
*/
callWithVideo(video) {
const { startCall } = this.props;
const config = { audio: true, video};
return () => startCall(true, abc, config);
}

callWithVideo12(video) {
const { startCall12 } = this.props;
const config = { audio: true, video: false};
return () => startCall12(true, abc, config);
}
testClass(){
  console.log("Test class accessed on file a.js");
}
render() {
const { clientId } = this.props;
console.log(`${clientId}`);
  console.log('the value of abc',bcd);
document.title = `${clientId} - VideoCall`;
return (
<div className="main-window">
   <div class="call-box">
      <div casss="row">
  <div class="col-md-5 c-align">
  <div >
          <img src="https://permintalk.com/img/avatar.png"/>
  </div>
         <input type="text" className="txt-clientId" defaultValue={clientId} readOnly />
      </div>
  <div class="col-md-2 c-align">
  <!--<img src="https://permintalk.com/img/source.gif" />-->
  </div>
  
  <div class="col-md-5 c-align">
  <div>
  <img src="https://permintalk.com/img/avatar.png"/>
  </div>
      <input type="text" className="txt-clientId" spellCheck={false} placeholder="Your friend ID" defaultValue={abc} readOnly/>
  </div>    
  </div>
	  
	  <div class="text-center mt-5" >
	  
	  <h4 class="title">Get started by calling a friend below</h4>
	  
         <button type="button"className="btn-action fa fa-video-camera" onClick={this.callWithVideo(true)} />
         <button type="button" className="btn-action fa fa-phone"  onClick={this.callWithVideo12(false)}  />
                 

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
