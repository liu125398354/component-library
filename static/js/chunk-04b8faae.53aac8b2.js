(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04b8faae"],{2974:function(e,t,n){},"58bb":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"screen-container"},[n("div",{staticClass:"screen-btn"},[n("el-button",{attrs:{type:"primary",disabled:e.sFlag},on:{click:e.startRecord}},[e._v("开始")]),n("el-button",{attrs:{type:"danger",disabled:!e.sFlag},on:{click:e.endRecord}},[e._v("结束")]),n("el-button",{attrs:{type:"success",disabled:e.dFlag},on:{click:e.downloadRecord}},[e._v("下载")])],1),n("video",{attrs:{id:"video",controls:"",width:"600px"}})])},i=[],a=(n("4160"),n("b0c0"),n("d3b7"),n("3ca3"),n("159b"),n("ddb0"),n("2b3d"),{props:{recordType:{type:String,default:function(){return"screen"}}},data:function(){return{videoElement:null,mediaRecorder:null,chunks:[],sFlag:!1,dFlag:!0}},mounted:function(){this.videoElement=document.getElementById("video")},methods:{startRecord:function(){var e=this;if("screen"===this.recordType)navigator&&navigator.mediaDevices&&navigator.mediaDevices.getDisplayMedia&&navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0,cursor:"always"}).then((function(t){e.handleMedia(t)})).catch((function(e){console.log("err---\x3e",e)}));else if("camera"===this.recordType){var t={audio:!0,video:{width:1280,height:720}};navigator.mediaDevices.getUserMedia(t).then((function(t){e.handleMedia(t)})).catch((function(e){console.log(e.name+": "+e.message)}))}},endRecord:function(){if("screen"===this.recordType){var e=this.videoElement.srcObject.getTracks();e.forEach((function(e){return e.stop()}))}this.mediaRecorder.stop()},downloadRecord:function(){var e=new Blob(this.chunks,{type:"video/ogg; codecs=opus"}),t=window.URL.createObjectURL(e),n=document.createElement("a");n.style.display="none",n.href=t,n.setAttribute("download","video.webm"),document.body.appendChild(n),n.click(),document.body.removeChild(n)},handleMedia:function(e){var t=this;this.chunks=[],this.sFlag=!0,this.dFlag=!0,this.mediaRecorder=new MediaRecorder(e),this.mediaRecorder.start(),this.mediaRecorder.ondataavailable=function(e){console.log("available",e),t.sFlag=!1,t.dFlag=!1,t.chunks.push(e.data);var n=URL.createObjectURL(e.data,{type:"video/ogg"});t.videoElement.srcObject=null,t.videoElement.src=n,t.videoElement.autoplay=!1},window.URL.revokeObjectURL(this.videoElement.src),this.videoElement.srcObject=e,this.videoElement.play()}}}),c=a,r=(n("7cb8"),n("2877")),d=Object(r["a"])(c,o,i,!1,null,null,null);t["a"]=d.exports},"7cb8":function(e,t,n){"use strict";var o=n("2974"),i=n.n(o);i.a},b0c0:function(e,t,n){var o=n("83ab"),i=n("9bf2").f,a=Function.prototype,c=a.toString,r=/^\s*function ([^ (]*)/,d="name";o&&!(d in a)&&i(a,d,{configurable:!0,get:function(){try{return c.call(this).match(r)[1]}catch(e){return""}}})},d01f:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("recording",{attrs:{recordType:e.recordType}})],1)},i=[],a=n("58bb"),c={data:function(){return{recordType:"screen"}},components:{Recording:a["a"]},destroyed:function(){console.log("销毁captivate")}},r=c,d=n("2877"),s=Object(d["a"])(r,o,i,!1,null,null,null);t["default"]=s.exports}}]);