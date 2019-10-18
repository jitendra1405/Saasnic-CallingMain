import React, { Component } from 'react';
import PropTypes from 'proptypes';
let friendID;
var url_string = window.location.href;
let searchParams = new URLSearchParams(url.search);
var abc = searchParams.get('FriendId');
var bcd = searchParams.get('varName');
var a = 'https://jitendra1405.github.io/Saasnic-CallingMain/client/src/html/chatting.html';
console.log('loooooooooooooooooooooooooo',abc);
console.log('loooooooooooooooooooooooooo',bcd);
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
render() {
const { clientId } = this.props;
console.log(`${clientId}`);
document.title = `${clientId} - VideoCall`;
return (
<div className="main-window">
   <div class="user-display">
      <h4>Hey User Name</h4>
   </div>
   <div class="call-box">
      
         <input type="text" className="txt-clientId" defaultValue={clientId} readOnly />
      
      <input type="text" className="txt-clientId" spellCheck={false} placeholder="Your friend ID" defaultValue={abc} readOnly/>
      
	  
	  <div>
	  
	  <h4>Get started by calling a friend below</h4>
	  
         <button type="button"className="btn-action fa fa-video-camera" onClick={this.callWithVideo(true)} />
         <button type="button" className="btn-action fa fa-phone"  onClick={this.callWithVideo12(false)}  />
         
		 
		 <a href="javascript:window.open('https://jitendra1405.github.io/Saasnic-CallingMain/client/src/html/chatting.html?varName='+abc'&friend2='+bcd','mywindowtitle','top=250,left=950,width=400,height=400,toolbar=no,scrollbars=no,location=no,resizable =no')" class="btn-action fa fa-phone"></a>
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
