(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fa8c8872"],{"2dd1":function(i,e,s){},"5b0f":function(i,e,s){"use strict";s.r(e);var t=function(){var i=this,e=i.$createElement,s=i._self._c||e;return s("div",{staticClass:"p-music"},[s("el-button",{attrs:{type:"success",plain:""},on:{click:i.preview}},[i._v("播放音频")]),s("preview-music",{attrs:{musicBlob:i.altMusic,previewMusicDialog:i.previewMusicDialog},on:{clearPreMusic:i.clearPreMp3}})],1)},c=[],a=function(){var i=this,e=i.$createElement,s=i._self._c||e;return s("div",[s("el-dialog",{staticClass:"img-dialog",attrs:{visible:i.previewMusicDialog,"before-close":i.clearPreMusic,width:"56%"},on:{"update:visible":function(e){i.previewMusicDialog=e}}},[s("div",{staticClass:"poster-wrapper"},[s("audio",{ref:"musicAudio",staticClass:"img-poster",attrs:{src:i.musicBlob,controls:"",autoplay:"",loop:"loop"}})])])],1)},u=[],l={props:{musicBlob:{type:String},previewMusicDialog:{type:Boolean,default:!1}},methods:{clearPreMusic:function(){var i=this.$refs.musicAudio;i.paused||i.pause(),this.$emit("clearPreMusic")}}},r=l,o=s("2877"),n=Object(o["a"])(r,a,u,!1,null,null,null),p=n.exports,d={data:function(){return{altMusic:null,previewMusicDialog:!1}},methods:{clearPreMp3:function(){this.previewMusicDialog=!1,this.altMusic=null},preview:function(){this.previewMusicDialog=!0;var i=this;setTimeout((function(){i.altMusic=s("ae3c")}),3e3)}},components:{PreviewMusic:p}},v=d,f=(s("adbf"),Object(o["a"])(v,t,c,!1,null,null,null));e["default"]=f.exports},adbf:function(i,e,s){"use strict";var t=s("2dd1"),c=s.n(t);c.a},ae3c:function(i,e,s){i.exports=s.p+"static/media/宇桐非 - 擦肩而过.2645d49e.mp3"}}]);