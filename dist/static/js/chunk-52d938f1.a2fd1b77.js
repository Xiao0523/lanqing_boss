(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-52d938f1"],{1169:function(t,e,n){var r=n("2d95");t.exports=Array.isArray||function(t){return"Array"==r(t)}},"2ddf":function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r={methods:{goBack:function(){var t=this;this.$confirm("正在离开本页面，本页面内所有未保存数据都会丢失","警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.clearLocal&&t.clearLocal(),t.$router.go(-1)})).catch((function(){return!1}))}}}},"37c8":function(t,e,n){e.f=n("2b4c")},"3a72":function(t,e,n){var r=n("7726"),a=n("8378"),o=n("2d00"),i=n("37c8"),c=n("86cc").f;t.exports=function(t){var e=a.Symbol||(a.Symbol=o?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||c(e,t,{value:i.f(t)})}},"456d":function(t,e,n){var r=n("4bf8"),a=n("0d58");n("5eda")("keys",(function(){return function(t){return a(r(t))}}))},5754:function(t,e,n){"use strict";var r=n("829c"),a=n.n(r);a.a},"5eda":function(t,e,n){var r=n("5ca1"),a=n("8378"),o=n("79e5");t.exports=function(t,e){var n=(a.Object||{})[t]||Object[t],i={};i[t]=e(n),r(r.S+r.F*o((function(){n(1)})),"Object",i)}},"66da":function(t,e,n){"use strict";n.d(e,"c",(function(){return a})),n.d(e,"d",(function(){return o})),n.d(e,"e",(function(){return i})),n.d(e,"a",(function(){return c})),n.d(e,"b",(function(){return s}));var r=n("b775");function a(){return r["a"].get("/boss/v2/category")}function o(){return r["a"].get("/boss/v2/category/one")}function i(t){var e=t.id;return r["a"].get("/boss/v2/category/two/"+e)}function c(t){var e=t.id;return r["a"].post("/boss/v2/category/"+e)}function s(t){var e=t.id;return r["a"].delete("/boss/v2/category/"+e)}},"67ab":function(t,e,n){var r=n("ca5a")("meta"),a=n("d3f4"),o=n("69a8"),i=n("86cc").f,c=0,s=Object.isExtensible||function(){return!0},l=!n("79e5")((function(){return s(Object.preventExtensions({}))})),u=function(t){i(t,r,{value:{i:"O"+ ++c,w:{}}})},f=function(t,e){if(!a(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,r)){if(!s(t))return"F";if(!e)return"E";u(t)}return t[r].i},d=function(t,e){if(!o(t,r)){if(!s(t))return!0;if(!e)return!1;u(t)}return t[r].w},p=function(t){return l&&h.NEED&&s(t)&&!o(t,r)&&u(t),t},h=t.exports={KEY:r,NEED:!1,fastKey:f,getWeak:d,onFreeze:p}},"72ea":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"container"},[n("div",{staticClass:"page-head-wraper"},[n("page-head",{attrs:{content:"编辑讲师"},on:{back:t.goBack,click:t.clearLocal}})],1),t._v(" "),n("div",{staticClass:"wraper"},[n("el-form",{ref:"courseForm",attrs:{model:t.content,rules:t.courseFormRules,"label-width":"7em"}},[n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"讲师头像"}},[n("el-upload",{staticClass:"uploader",attrs:{action:t.uploadUrl,name:"multipartFile","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[t.content.photo?n("img",{staticClass:"avatar",attrs:{src:t.content.photo}}):n("i",{staticClass:"el-icon-picture uploader-icon"})]),t._v(" "),n("p",{staticClass:"upload-tips"},[t._v("只能上传jpg/png文件，建议尺寸为500x500px。")]),t._v(" "),n("input",{attrs:{type:"hidden"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"奖牌/荣誉"}},[n("el-upload",{attrs:{action:t.uploadUrl,name:"multipartFile","list-type":"picture-card","file-list":t.AchievementsImgList,limit:9,"before-upload":t.beforeAvatarUpload,"on-remove":t.handleRemove,"on-success":t.handleSuccess}},[n("i",{staticClass:"el-icon-plus"}),t._v(" "),n("div",{staticClass:"el-upload__tip upload-tips-color",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且最多上传9张，建议尺寸为750x560px。")])])],1)],1)],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"讲师名称"}},[n("el-input",{attrs:{placeholder:"请输入讲师名称"},model:{value:t.content.realName,callback:function(e){t.$set(t.content,"realName","string"===typeof e?e.trim():e)},expression:"content.realName"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"讲师简介"}},[n("el-input",{attrs:{placeholder:"请以简洁的语言突出讲师风采"},model:{value:t.content.briefIntroduction,callback:function(e){t.$set(t.content,"briefIntroduction","string"===typeof e?e.trim():e)},expression:"content.briefIntroduction"}})],1)],1)],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"年龄"}},[n("el-input",{attrs:{placeholder:"请输入讲师年龄",maxlength:"3"},model:{value:t.content.age,callback:function(e){t.$set(t.content,"age","string"===typeof e?e.trim():e)},expression:"content.age"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"教龄"}},[n("el-input",{attrs:{placeholder:"请输入讲师教龄",maxlength:"3"},model:{value:t.content.teachAge,callback:function(e){t.$set(t.content,"teachAge","string"===typeof e?e.trim():e)},expression:"content.teachAge"}})],1)],1)],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"联系电话"}},[n("el-input",{attrs:{placeholder:"请输入讲师联系电话",maxlength:"40"},model:{value:t.content.contactPhone,callback:function(e){t.$set(t.content,"contactPhone","string"===typeof e?e.trim():e)},expression:"content.contactPhone"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"累计课程数"}},[n("el-input",{attrs:{placeholder:"请输入累计课程区间，如10-50",maxlength:"40"},model:{value:t.content.curriculumAmount,callback:function(e){t.$set(t.content,"curriculumAmount","string"===typeof e?e.trim():e)},expression:"content.curriculumAmount"}})],1)],1)],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"课程类目"}},[n("el-select",{staticStyle:{"margin-left":"20px"},attrs:{multiple:"","collapse-tags":"",placeholder:"请选择类目"},model:{value:t.content.categoryViews,callback:function(e){t.$set(t.content,"categoryViews",e)},expression:"content.categoryViews"}},t._l(t.categoriesValList,(function(t){return n("el-option",{key:t.categoryId,attrs:{label:t.categoryName,value:t.categoryId}})})),1),t._v(" "),n("p",{staticClass:"upload-tips addCategories",on:{click:t.addCategories}},[t._v("保存当页，前往添加类目")])],1)],1),t._v(" "),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"累计学员数"}},[n("el-input",{attrs:{placeholder:"请输入累计学员区间，如500-700 "},model:{value:t.content.studentAmount,callback:function(e){t.$set(t.content,"studentAmount","string"===typeof e?e.trim():e)},expression:"content.studentAmount"}})],1)],1)],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"讲师标签"}},[n("el-input",{attrs:{placeholder:"输入标签展示讲师优势"},model:{value:t.content.tags,callback:function(e){t.$set(t.content,"tags","string"===typeof e?e.trim():e)},expression:"content.tags"}}),t._v(" "),n("div",{staticClass:"tags-msg"},[t._v("多个标识用半角逗号分隔")])],1)],1)],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:20}},[n("el-form-item",{attrs:{label:"讲师介绍"}},[n("Tinymce",{model:{value:t.content.detailedDescription,callback:function(e){t.$set(t.content,"detailedDescription",e)},expression:"content.detailedDescription"}})],1)],1)],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("提交")]),t._v(" "),n("el-button",{on:{click:function(e){t.goBack(),t.clearLocal()}}},[t._v("取消")])],1)],1)],1),t._v(" "),n("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1)},a=[],o=(n("ac6a"),n("9afb")),i=n("66da"),c=n("0de1"),s=n("c57c"),l=n("39bb"),u=n("8256"),f=n("2ddf"),d={name:"CourseEdit",components:{PageHead:c["a"],Tinymce:u["a"]},mixins:[f["a"]],data:function(){return{content:{achievements:[],age:"",briefIntroduction:"",categoryViews:[],contactPhone:"",curriculumAmount:"",detailedDescription:"",photo:"",realName:"",studentAmount:"",tags:"",teachAge:""},AchievementsImgList:[],categoriesValList:[],courseFormRules:{},teacherArr:[{}],imageUrl:"",dialogImageUrl:"",dialogVisible:!1,fileList:[],uploadUrl:l["c"],isAdd:!0,otherFrom:!1}},created:function(){var t=this;this.getCategory();var e=this.$route.query.otherFlag;if(String(e)&&(this.otherFrom=e),Object(s["a"])("teacherView")&&String(Object(s["a"])("teacherAdd"))&&!this.otherFrom)return this.content=Object(s["a"])("teacherView"),this.isAdd=Object(s["a"])("teacherAdd"),this.content.achievements.forEach((function(e){t.AchievementsImgList.push({url:e})})),void this.clearLocal();var n=this.$route.query.id;n&&(this.isAdd=!1,this.getView(n))},methods:{clearLocal:function(){Object(s["b"])("teacherAdd",""),Object(s["b"])("teacherView","")},addCategories:function(){Object(s["b"])("teacherAdd",this.isAdd),Object(s["b"])("teacherView",this.content),this.$router.push({name:"CategoryList",query:{otherFlag:!0}})},getView:function(t){var e=this,n={id:t};Object(o["d"])(n).then((function(t){if(t.code)return t.message&&e.$warn(t.message);if(t.data){e.content=t.data,e.content.achievements.forEach((function(t){e.AchievementsImgList.push({url:t})}));var n=[];e.content.categoryViews.forEach((function(t){n.push(t.categoryId)})),e.content.categoryViews=n}}))},getCategory:function(){var t=this;Object(i["c"])().then((function(e){if(e.code)return e.message&&t.$warn(e.message);e.data&&(t.categoriesValList=e.data)}))},handleAvatarSuccess:function(t,e){if(t.code)return t.message&this.$warn(t.message);t.data&&(this.content.photo=t.data)},beforeAvatarUpload:function(t){var e="image/jpeg"===t.type||"image/png"===t.type;return e||this.$message.error("请上传JPG/PNG格式的图片"),e},changeAge:function(t){this.content[t]>100&&(this.content[t]=100)},handleRemove:function(t,e){if("success"!==t.status)return this.$warn("删除失败");if(t.url){var n=this.content.achievements.indexOf(t.url);this.content.achievements.splice(n,1)}},handleSuccess:function(t,e){if(t.code)return t.message&this.$warn(t.message);t.data&&this.content.achievements.push(t.data)},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},save:function(){var t=this,e=this.isAdd?o["a"]:o["b"],n=this.content;e(n).then((function(e){return e.code?e.message&&t.$warn(e.message):(t.$success(e.message),t.clearLocal(),t.otherFrom?t.$router.go(-1):void t.$router.push({name:"Teacher"}))}))}}},p=d,h=(n("5754"),n("2877")),m=Object(h["a"])(p,r,a,!1,null,"8efb0ec0",null);e["default"]=m.exports},"7bbc":function(t,e,n){var r=n("6821"),a=n("9093").f,o={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return a(t)}catch(e){return i.slice()}};t.exports.f=function(t){return i&&"[object Window]"==o.call(t)?c(t):a(r(t))}},"829c":function(t,e,n){},"8a81":function(t,e,n){"use strict";var r=n("7726"),a=n("69a8"),o=n("9e1e"),i=n("5ca1"),c=n("2aba"),s=n("67ab").KEY,l=n("79e5"),u=n("5537"),f=n("7f20"),d=n("ca5a"),p=n("2b4c"),h=n("37c8"),m=n("3a72"),g=n("d4c0"),v=n("1169"),b=n("cb7c"),y=n("d3f4"),w=n("4bf8"),A=n("6821"),O=n("6a99"),_=n("4630"),S=n("2aeb"),x=n("7bbc"),j=n("11e9"),k=n("2621"),$=n("86cc"),C=n("0d58"),F=j.f,P=$.f,V=x.f,E=r.Symbol,I=r.JSON,L=I&&I.stringify,N="prototype",U=p("_hidden"),T=p("toPrimitive"),D={}.propertyIsEnumerable,J=u("symbol-registry"),B=u("symbols"),R=u("op-symbols"),q=Object[N],G="function"==typeof E&&!!k.f,K=r.QObject,W=!K||!K[N]||!K[N].findChild,M=o&&l((function(){return 7!=S(P({},"a",{get:function(){return P(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=F(q,e);r&&delete q[e],P(t,e,n),r&&t!==q&&P(q,e,r)}:P,Y=function(t){var e=B[t]=S(E[N]);return e._k=t,e},z=G&&"symbol"==typeof E.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof E},H=function(t,e,n){return t===q&&H(R,e,n),b(t),e=O(e,!0),b(n),a(B,e)?(n.enumerable?(a(t,U)&&t[U][e]&&(t[U][e]=!1),n=S(n,{enumerable:_(0,!1)})):(a(t,U)||P(t,U,_(1,{})),t[U][e]=!0),M(t,e,n)):P(t,e,n)},Q=function(t,e){b(t);var n,r=g(e=A(e)),a=0,o=r.length;while(o>a)H(t,n=r[a++],e[n]);return t},X=function(t,e){return void 0===e?S(t):Q(S(t),e)},Z=function(t){var e=D.call(this,t=O(t,!0));return!(this===q&&a(B,t)&&!a(R,t))&&(!(e||!a(this,t)||!a(B,t)||a(this,U)&&this[U][t])||e)},tt=function(t,e){if(t=A(t),e=O(e,!0),t!==q||!a(B,e)||a(R,e)){var n=F(t,e);return!n||!a(B,e)||a(t,U)&&t[U][e]||(n.enumerable=!0),n}},et=function(t){var e,n=V(A(t)),r=[],o=0;while(n.length>o)a(B,e=n[o++])||e==U||e==s||r.push(e);return r},nt=function(t){var e,n=t===q,r=V(n?R:A(t)),o=[],i=0;while(r.length>i)!a(B,e=r[i++])||n&&!a(q,e)||o.push(B[e]);return o};G||(E=function(){if(this instanceof E)throw TypeError("Symbol is not a constructor!");var t=d(arguments.length>0?arguments[0]:void 0),e=function(n){this===q&&e.call(R,n),a(this,U)&&a(this[U],t)&&(this[U][t]=!1),M(this,t,_(1,n))};return o&&W&&M(q,t,{configurable:!0,set:e}),Y(t)},c(E[N],"toString",(function(){return this._k})),j.f=tt,$.f=H,n("9093").f=x.f=et,n("52a7").f=Z,k.f=nt,o&&!n("2d00")&&c(q,"propertyIsEnumerable",Z,!0),h.f=function(t){return Y(p(t))}),i(i.G+i.W+i.F*!G,{Symbol:E});for(var rt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),at=0;rt.length>at;)p(rt[at++]);for(var ot=C(p.store),it=0;ot.length>it;)m(ot[it++]);i(i.S+i.F*!G,"Symbol",{for:function(t){return a(J,t+="")?J[t]:J[t]=E(t)},keyFor:function(t){if(!z(t))throw TypeError(t+" is not a symbol!");for(var e in J)if(J[e]===t)return e},useSetter:function(){W=!0},useSimple:function(){W=!1}}),i(i.S+i.F*!G,"Object",{create:X,defineProperty:H,defineProperties:Q,getOwnPropertyDescriptor:tt,getOwnPropertyNames:et,getOwnPropertySymbols:nt});var ct=l((function(){k.f(1)}));i(i.S+i.F*ct,"Object",{getOwnPropertySymbols:function(t){return k.f(w(t))}}),I&&i(i.S+i.F*(!G||l((function(){var t=E();return"[null]"!=L([t])||"{}"!=L({a:t})||"{}"!=L(Object(t))}))),"JSON",{stringify:function(t){var e,n,r=[t],a=1;while(arguments.length>a)r.push(arguments[a++]);if(n=e=r[1],(y(e)||void 0!==t)&&!z(t))return v(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!z(e))return e}),r[1]=e,L.apply(I,r)}}),E[N][T]||n("32e9")(E[N],T,E[N].valueOf),f(E,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},"9afb":function(t,e,n){"use strict";n.d(e,"f",(function(){return a})),n.d(e,"a",(function(){return o})),n.d(e,"d",(function(){return c})),n.d(e,"b",(function(){return i})),n.d(e,"e",(function(){return s})),n.d(e,"c",(function(){return l}));var r=n("b775");function a(t){return r["a"].post("/boss/v2/teacherList",t)}function o(t){return r["a"].post("/boss/v2/teacher",t)}function i(t){return r["a"].patch("/boss/v2/teacher",t)}function c(t){var e=t.id;return r["a"].get("/boss/v2/teacher/"+e)}function s(t){return r["a"].post("/boss/v2/teacher/student",t)}function l(t){var e=t.id,n=t.status;return r["a"].post("/boss/v2/teacher/"+e+"/"+n)}},ac4d:function(t,e,n){n("3a72")("asyncIterator")},d4c0:function(t,e,n){var r=n("0d58"),a=n("2621"),o=n("52a7");t.exports=function(t){var e=r(t),n=a.f;if(n){var i,c=n(t),s=o.f,l=0;while(c.length>l)s.call(t,i=c[l++])&&e.push(i)}return e}}}]);