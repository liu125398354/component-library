(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b04adee"],{3162:function(e,t,n){"use strict";var a=n("9b99"),i=n.n(a);i.a},"3f5e":function(e,t,n){"use strict";var a=n("5530"),i=n("e443");t["a"]={uploadCommonFile:function(e,t){return Object(i["a"])(Object(a["a"])(Object(a["a"])({},t),{},{url:"/apk/upload",method:"post",data:e,timeout:0}))},uploadMaxFile:function(e){return Object(i["a"])({url:"/uploadChunk",method:"post",data:e,timeout:0})}}},"959a":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"file"},[n("el-upload",{ref:"upload",staticClass:"avatar-uploader",attrs:{multiple:"",limit:5,action:"https://192.168.6.17:3000/uploadImg/","on-change":e.handleChange,"on-remove":e.handleRemove,"on-exceed":e.handleExceed,"auto-upload":!1,"http-request":e.uploadRequest}},[n("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),n("el-button",{staticClass:"submit-btn",attrs:{type:"primary"},on:{click:e.submitBtn}},[e._v("上传按钮")]),n("mask-progress",{attrs:{detailShow:e.detailShow,progress:e.progress}})],1)},i=[],o=(n("c740"),n("a434"),n("3f5e")),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"fade"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.detailShow,expression:"detailShow"}],staticClass:"detail"},[n("div",{staticClass:"detail-wrapper clearfix"},[n("div",{staticClass:"uploadProcess"},[n("el-progress",{attrs:{type:"circle",percentage:e.progress,color:e.colors}})],1)])])])},r=[],l=(n("a9e3"),{props:{detailShow:{type:Boolean},progress:{type:Number}},data:function(){return{colors:[{color:"#f56c6c",percentage:20},{color:"#e6a23c",percentage:40},{color:"#6f7ad3",percentage:60},{color:"#1989fa",percentage:80},{color:"#67c23a",percentage:100}]}}}),c=l,u=(n("a2e0"),n("2877")),d=Object(u["a"])(c,s,r,!1,null,null,null),f=d.exports,p={data:function(){return{detailShow:!1,count:0,progress:0,fileList:[]}},methods:{handleChange:function(e,t){console.log(e.raw),this.fileList.push({uid:e.uid,file:e.raw})},handleRemove:function(e){var t=this.fileList.findIndex((function(t){return t.uid===e.uid}));-1!==t&&this.fileList.splice(t,1)},handleExceed:function(e,t){this.$message.warning("最多只能上传 5 个文件")},uploadRequest:function(e){if(this.count++,this.count===this.fileList.length){for(var t=new FormData,n=0;n<this.fileList.length;n++)t.append("file",this.fileList[n].file);this.finalUpload(t)}},finalUpload:function(e){var t=this;this.detailShow=!0;var n={onUploadProgress:function(e){var n=e.loaded/e.total*100|0;t.progress=n}};o["a"].uploadCommonFile(e,n).then((function(e){setTimeout((function(){t.detailShow=!1}),800),setTimeout((function(){t.$confirm("文件上传成功！","温馨提示",{confirmButtonText:"查看文件",cancelButtonText:"继续上传"}).then((function(){t.$message.success("跳转到文件页面"),t.progress=0,t.count=0,t.fileList=[],t.$refs.upload.clearFiles()})).catch((function(){t.progress=0,t.count=0,t.fileList=[],t.$refs.upload.clearFiles()}))}),1500)}))},submitBtn:function(){this.fileList.length>0?this.$refs.upload.submit():(this.$message.closeAll(),this.$message({message:"你还没有上传文件",type:"warning"}))}},components:{MaskProgress:f}},h=p,m=(n("3162"),Object(u["a"])(h,a,i,!1,null,null,null));t["default"]=m.exports},"9b99":function(e,t,n){},a2e0:function(e,t,n){"use strict";var a=n("d5c7"),i=n.n(a);i.a},a434:function(e,t,n){"use strict";var a=n("23e7"),i=n("23cb"),o=n("a691"),s=n("50c4"),r=n("7b0b"),l=n("65f0"),c=n("8418"),u=n("1dde"),d=n("ae40"),f=u("splice"),p=d("splice",{ACCESSORS:!0,0:0,1:2}),h=Math.max,m=Math.min,g=9007199254740991,v="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!f||!p},{splice:function(e,t){var n,a,u,d,f,p,b=r(this),w=s(b.length),x=i(e,w),C=arguments.length;if(0===C?n=a=0:1===C?(n=0,a=w-x):(n=C-2,a=m(h(o(t),0),w-x)),w+n-a>g)throw TypeError(v);for(u=l(b,a),d=0;d<a;d++)f=x+d,f in b&&c(u,d,b[f]);if(u.length=a,n<a){for(d=x;d<w-a;d++)f=d+a,p=d+n,f in b?b[p]=b[f]:delete b[p];for(d=w;d>w-a+n;d--)delete b[d-1]}else if(n>a)for(d=w-a;d>x;d--)f=d+a-1,p=d+n-1,f in b?b[p]=b[f]:delete b[p];for(d=0;d<n;d++)b[d+x]=arguments[d+2];return b.length=w-a+n,u}})},c740:function(e,t,n){"use strict";var a=n("23e7"),i=n("b727").findIndex,o=n("44d2"),s=n("ae40"),r="findIndex",l=!0,c=s(r);r in[]&&Array(1)[r]((function(){l=!1})),a({target:"Array",proto:!0,forced:l||!c},{findIndex:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),o(r)},d5c7:function(e,t,n){},e443:function(e,t,n){"use strict";n("d3b7");var a=n("bc3a"),i=n.n(a),o=i.a.create({baseURL:"https://liu125398354.github.io",timeout:1e4});o.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),o.interceptors.response.use((function(e){var t=e.data;return t}),(function(e){return Promise.reject(e)})),t["a"]=o}}]);