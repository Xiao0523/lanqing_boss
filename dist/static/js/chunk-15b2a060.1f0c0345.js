(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15b2a060"],{"27ce":function(t,e,i){},"28a5":function(t,e,i){"use strict";var s=i("aae3"),a=i("cb7c"),r=i("ebd6"),o=i("0390"),n=i("9def"),c=i("5f1b"),l=i("520a"),u=i("79e5"),f=Math.min,v=[].push,m="split",p="length",d="lastIndex",h=4294967295,g=!u((function(){RegExp(h,"y")}));i("214f")("split",2,(function(t,e,i,u){var b;return b="c"=="abbc"[m](/(b)*/)[1]||4!="test"[m](/(?:)/,-1)[p]||2!="ab"[m](/(?:ab)*/)[p]||4!="."[m](/(.?)(.?)/)[p]||"."[m](/()()/)[p]>1||""[m](/.?/)[p]?function(t,e){var a=String(this);if(void 0===t&&0===e)return[];if(!s(t))return i.call(a,t,e);var r,o,n,c=[],u=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),f=0,m=void 0===e?h:e>>>0,g=new RegExp(t.source,u+"g");while(r=l.call(g,a)){if(o=g[d],o>f&&(c.push(a.slice(f,r.index)),r[p]>1&&r.index<a[p]&&v.apply(c,r.slice(1)),n=r[0][p],f=o,c[p]>=m))break;g[d]===r.index&&g[d]++}return f===a[p]?!n&&g.test("")||c.push(""):c.push(a.slice(f)),c[p]>m?c.slice(0,m):c}:"0"[m](void 0,0)[p]?function(t,e){return void 0===t&&0===e?[]:i.call(this,t,e)}:i,[function(i,s){var a=t(this),r=void 0==i?void 0:i[e];return void 0!==r?r.call(i,a,s):b.call(String(a),i,s)},function(t,e){var s=u(b,t,this,e,b!==i);if(s.done)return s.value;var l=a(t),v=String(this),m=r(l,RegExp),p=l.unicode,d=(l.ignoreCase?"i":"")+(l.multiline?"m":"")+(l.unicode?"u":"")+(g?"y":"g"),_=new m(g?l:"^(?:"+l.source+")",d),C=void 0===e?h:e>>>0;if(0===C)return[];if(0===v.length)return null===c(_,v)?[v]:[];var x=0,F=0,y=[];while(F<v.length){_.lastIndex=g?F:0;var w,k=c(_,g?v:v.slice(F));if(null===k||(w=f(n(_.lastIndex+(g?0:F)),v.length))===x)F=o(v,F,p);else{if(y.push(v.slice(x,F)),y.length===C)return y;for(var E=1;E<=k.length-1;E++)if(y.push(k[E]),y.length===C)return y;F=x=w}}return y.push(v.slice(x)),y}]}))},"2e08":function(t,e,i){var s=i("9def"),a=i("9744"),r=i("be13");t.exports=function(t,e,i,o){var n=String(r(t)),c=n.length,l=void 0===i?" ":String(i),u=s(e);if(u<=c||""==l)return n;var f=u-c,v=a.call(l,Math.ceil(f/l.length));return v.length>f&&(v=v.slice(0,f)),o?v+n:n+v}},3846:function(t,e,i){i("9e1e")&&"g"!=/./g.flags&&i("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:i("0bfb")})},"50c8":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"login-container"},[-1!==t.examineResult||t.loadFlag?t._e():i("el-form",{ref:"certificateForm",staticClass:"organize-form",attrs:{model:t.certificateForm,"auto-complete":"on"}},[i("div",{staticClass:"title-container"},[i("h3",{staticClass:"title"},[t._v("机构认证")])]),t._v(" "),i("div",{staticClass:"cell"},[i("div",{staticClass:"label"},[t._v("企业名称")]),t._v(" "),i("el-form-item",[i("el-input",{attrs:{placeholder:"请输入企业名称"},model:{value:t.certificateForm.enterpriseName,callback:function(e){t.$set(t.certificateForm,"enterpriseName","string"===typeof e?e.trim():e)},expression:"certificateForm.enterpriseName"}})],1)],1),t._v(" "),i("div",{staticClass:"cell"},[i("div",{staticClass:"label"},[t._v("银行开户名")]),t._v(" "),i("el-form-item",[i("el-input",{attrs:{placeholder:"请输入银行开户名"},model:{value:t.certificateForm.bankName,callback:function(e){t.$set(t.certificateForm,"bankName","string"===typeof e?e.trim():e)},expression:"certificateForm.bankName"}})],1)],1),t._v(" "),i("div",{staticClass:"cell"},[i("div",{staticClass:"label"},[t._v("开户银行")]),t._v(" "),i("el-form-item",[i("el-input",{attrs:{placeholder:"请输入开户银行"},model:{value:t.certificateForm.bankNo,callback:function(e){t.$set(t.certificateForm,"bankNo","string"===typeof e?e.trim():e)},expression:"certificateForm.bankNo"}})],1)],1),t._v(" "),i("div",{staticClass:"cell"},[i("div",{staticClass:"label"},[t._v("联系人")]),t._v(" "),i("el-form-item",[i("el-input",{attrs:{placeholder:"请输入联系人"},model:{value:t.certificateForm.contacts,callback:function(e){t.$set(t.certificateForm,"contacts","string"===typeof e?e.trim():e)},expression:"certificateForm.contacts"}})],1)],1),t._v(" "),i("div",{staticClass:"cell"},[i("div",{staticClass:"label"},[t._v("联系方式")]),t._v(" "),i("el-form-item",[i("el-input",{attrs:{placeholder:"请输入联系方式"},model:{value:t.certificateForm.contactInformation,callback:function(e){t.$set(t.certificateForm,"contactInformation","string"===typeof e?e.trim():e)},expression:"certificateForm.contactInformation"}})],1)],1),t._v(" "),i("div",{staticClass:"cell "},[i("div",{staticClass:"label upload-label"},[t._v("办学许可证")]),t._v(" "),i("el-upload",{ref:"schoolLicense",attrs:{action:t.uploadUrl,name:"multipartFile","list-type":"fileList","on-remove":t.schoolLicenseRemove,"on-success":t.schoolLicenseuploadSuccess,"before-upload":t.beforeUpload}},[i("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb")])],1)],1),t._v(" "),i("div",{staticClass:"cell "},[i("div",{staticClass:"label upload-label"},[t._v("民办非企业单位登记证")]),t._v(" "),i("el-upload",{attrs:{action:t.uploadUrl,name:"multipartFile","list-type":"fileList","on-remove":t.registLicenceRemove,"on-success":t.registLicenceuploadSuccess,"before-upload":t.beforeUpload}},[i("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb")])],1)],1),t._v(" "),i("div",{staticClass:"cell"},[i("div",{staticClass:"label upload-label"},[t._v("上传工商执照")]),t._v(" "),i("el-upload",{attrs:{action:t.uploadUrl,name:"multipartFile","list-type":"fileList","on-remove":t.companeylLicenceRemove,"on-success":t.companeylLicenceuploadSuccess,"before-upload":t.beforeUpload}},[i("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb")])],1)],1),t._v(" "),i("div",{staticClass:"cell"},[i("div",{staticClass:"label upload-label"},[t._v("上传Logo")]),t._v(" "),i("el-upload",{attrs:{action:t.uploadUrl,name:"multipartFile","list-type":"fileList","on-remove":t.logoRemove,"on-success":t.logouploadSuccess,"before-upload":t.beforeUpload}},[i("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb")])],1)],1),t._v(" "),i("div",[i("el-checkbox",{attrs:{"true-label":"1","false-label":"0"},model:{value:t.certificateForm.joinTheFlowSupportPlan,callback:function(e){t.$set(t.certificateForm,"joinTheFlowSupportPlan",e)},expression:"certificateForm.joinTheFlowSupportPlan"}},[t._v("是否加入流量扶持计划")])],1),t._v(" "),i("el-alert",{directives:[{name:"show",rawName:"v-show",value:t.isError,expression:"isError"}],attrs:{type:"error","show-icon":"",closable:!1,title:t.errorText}}),t._v(" "),i("div",[i("el-button",{staticClass:"btn btn-prove",attrs:{type:"primary"},on:{click:function(e){return t.onProve("certificateForm")}}},[t._v("立即认证")])],1),t._v(" "),i("p",{staticClass:"result-text back-login",on:{click:t.loginOut}},[t._v("返回")])],1),t._v(" "),-1===t.examineResult||t.loadFlag?t._e():i("div",{staticClass:"result-tip"},[0===t.examineResult?i("div",[t._m(0),t._v(" "),i("p",{staticClass:"result-text"},[t._v("您的机构正在审核中请耐心等待…")]),t._v(" "),i("p",{staticClass:"result-text"},[t._v("请耐心等待…")]),t._v(" "),i("p",{staticClass:"result-text back-login",on:{click:t.loginOut}},[t._v("返回")])]):t._e(),t._v(" "),2===t.examineResult?i("div",[t._m(1),t._v(" "),i("p",{staticClass:"result-text"},[t._v("审核失败")]),t._v(" "),i("p",{staticClass:"result-text"},[t._v("反馈时间："+t._s(t.lastDate))]),t._v(" "),i("p",{staticClass:"result-text"},[t._v("失败原因是："+t._s(t.logInfo))]),t._v(" "),i("el-button",{staticClass:"result-btn",attrs:{type:"primary"},on:{click:t.resetPost}},[t._v("重新提交审核")]),t._v(" "),i("p",{staticClass:"result-text back-login",on:{click:t.loginOut}},[t._v("返回")])],1):t._e()]),t._v(" "),t.loadFlag?i("div",{staticClass:"result-tip loader-box"},[i("div",{staticClass:"loader"})]):t._e()],1)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"result-img-wraper"},[i("img",{staticClass:"result-img",attrs:{src:"",alt:""}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"result-img-wraper",staticStyle:{"margin-top":"50px"}},[i("img",{staticClass:"result-img",attrs:{src:"",alt:""}})])}],r=(i("96cf"),i("3b8d")),o=i("39bb"),n=i("c24f"),c=i("c466"),l={name:"Login",data:function(){return{certificateForm:{enterpriseName:"",bankName:"",bankNo:"",contacts:"",contactInformation:"",businessLicense:"",schoolLicense:"",registrationCertificateOfPrivateNonEnterpriseUnit:"",logo:"",joinTheFlowSupportPlan:"0"},isBusinessUnpass:!1,examineResult:"",uploadUrl:o["c"],isError:!1,errorText:"",loadFlag:!0,tranTime:2e3,logInfo:"",lastDate:""}},mounted:function(){this.getBusiness()},methods:{loginOut:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$store.dispatch("user/logout");case 2:this.$router.push("/login");case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),getBusiness:function(){var t=this;Object(n["a"])().then((function(e){if(e.code)return e.message&&t.$warn(e.message);t.examineResult=e.data?e.data.status:-1,1===t.examineResult&&t.$router.push({name:"Home"}),2===t.examineResult&&(t.lastDate=Object(c["a"])(e.data.latelySubmitDate),t.logInfo=e.data.logInfo),t.$store.commit("user/SET_STATUS",t.examineResult),setTimeout((function(){t.loadFlag=!1}),t.tranTime)})).catch((function(t){console.log(t)}))},onProve:function(){var t=this,e=this.certificateForm;return e.enterpriseName?e.bankName?e.bankNo?e.contacts?e.contactInformation?e.schoolLicense?e.businessLicense?e.registrationCertificateOfPrivateNonEnterpriseUnit?e.logo?void Object(n["d"])(e).then((function(e){if(e.code&&1!==e.code&&-1!==e.code)return e.message&&t.$warn(e.message);t.$success(e.message),t.getBusiness()})):this.showError("请上传Logo"):this.showError("请上传民办非企业单位登记证"):this.showError("请上传营业许可"):this.showError("请上传办学许可"):this.showError("请输入联系方式"):this.showError("请输入联系人"):this.showError("请输入开户银行"):this.showError("请输入银行开户名"):this.showError("请输入企业名称")},resetPost:function(){this.examineResult=-1},beforeUpload:function(t){var e=1024,i=t.size/e<300;return i||this.$warn("文件大于 300kb"),i},schoolLicenseuploadSuccess:function(t,e){this.certificateForm.schoolLicense=t.data},schoolLicenseRemove:function(t,e){this.certificateForm.schoolLicense=""},registLicenceuploadSuccess:function(t,e){this.certificateForm.registrationCertificateOfPrivateNonEnterpriseUnit=t.data},registLicenceRemove:function(t,e){this.certificateForm.registrationCertificateOfPrivateNonEnterpriseUnit=""},logouploadSuccess:function(t,e){this.certificateForm.logo=t.data},logoRemove:function(t,e){this.certificateForm.logo=""},companeylLicenceuploadSuccess:function(t,e){this.certificateForm.businessLicense=t.data},companeylLicenceRemove:function(t,e){this.certificateForm.businessLicense=""},showError:function(t){this.errorText=t,this.isError=!0},hideError:function(){this.errorText="",this.isError=!1}}},u=l,f=(i("ba02"),i("2877")),v=Object(f["a"])(u,s,a,!1,null,null,null);e["default"]=v.exports},"6b54":function(t,e,i){"use strict";i("3846");var s=i("cb7c"),a=i("0bfb"),r=i("9e1e"),o="toString",n=/./[o],c=function(t){i("2aba")(RegExp.prototype,o,t,!0)};i("79e5")((function(){return"/a/b"!=n.call({source:"a",flags:"b"})}))?c((function(){var t=s(this);return"/".concat(t.source,"/","flags"in t?t.flags:!r&&t instanceof RegExp?a.call(t):void 0)})):n.name!=o&&c((function(){return n.call(this)}))},9744:function(t,e,i){"use strict";var s=i("4588"),a=i("be13");t.exports=function(t){var e=String(a(this)),i="",r=s(t);if(r<0||r==1/0)throw RangeError("Count can't be negative");for(;r>0;(r>>>=1)&&(e+=e))1&r&&(i+=e);return i}},ba02:function(t,e,i){"use strict";var s=i("27ce"),a=i.n(s);a.a},c466:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));i("28a5"),i("f576"),i("a481"),i("6b54"),i("7618");function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"YYYY-MM-DD hh:mm:ss",i=(new Date).getTime();t||(t=i);while(t.toString().length<13)t+="0";var s=new Date(t);s.getMonth();var a={year:s.getFullYear(),month:s.getMonth()+1,day:s.getDate(),hours:s.getHours(),minutes:s.getMinutes(),seconds:s.getSeconds()};switch(e){case"YYYY-MM-DD hh:mm:ss":return"".concat(a.year,"-").concat(a.month,"-").concat(a.day," ").concat(a.hours,":").concat(a.minutes,":").concat(a.seconds);case"YYYY-MM-DD":return"".concat(a.year,"-").concat(a.month,"-").concat(a.day);case"MM-DD":return"".concat(a.month,"-").concat(a.day);case"hh:mm:ss":return"".concat(a.hours,":").concat(a.minutes,":").concat(a.seconds);case"hh:mm":return"".concat(a.hours,":").concat(a.minutes);case"computed":if(i>t){var r=Math.abs(t-i),o=r/1e3,n=o/60,c=n/60,l=c/24,u=l/7;if(~~u>0&&u<3)return~~u+"周前";if(l<7&&~~l>0)return~~l+"天前";if(~~c>0&&c<24)return~~c+"小时前";if(~~n>0&&n<60)return~~n+"分钟前";if(~~o>0&&o<60)return~~o+"秒前"}else console.log("未来的时间");return"".concat(a.year,"-").concat(a.month,"-").concat(a.day," ").concat(a.hours,":").concat(a.minutes,":").concat(a.seconds)}}},f576:function(t,e,i){"use strict";var s=i("5ca1"),a=i("2e08"),r=i("a25f"),o=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(r);s(s.P+s.F*o,"String",{padStart:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0,!0)}})}}]);