(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1fa2e977"],{"09f4":function(t,e,a){"use strict";a.d(e,"a",(function(){return r})),Math.easeInOutQuad=function(t,e,a,n){return t/=n/2,t<1?a/2*t*t+e:(t--,-a/2*(t*(t-2)-1)+e)};var n=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function s(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function i(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function r(t,e,a){var r=i(),c=t-r,o=20,l=0;e="undefined"===typeof e?500:e;var u=function t(){l+=o;var i=Math.easeInOutQuad(l,r,c,e);s(i),l<e?n(t):a&&"function"===typeof a&&a()};u()}},"2e08":function(t,e,a){var n=a("9def"),s=a("9744"),i=a("be13");t.exports=function(t,e,a,r){var c=String(i(t)),o=c.length,l=void 0===a?" ":String(a),u=n(e);if(u<=o||""==l)return c;var d=u-o,v=s.call(l,Math.ceil(d/l.length));return v.length>d&&(v=v.slice(0,d)),r?v+c:c+v}},3846:function(t,e,a){a("9e1e")&&"g"!=/./g.flags&&a("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:a("0bfb")})},"6b54":function(t,e,a){"use strict";a("3846");var n=a("cb7c"),s=a("0bfb"),i=a("9e1e"),r="toString",c=/./[r],o=function(t){a("2aba")(RegExp.prototype,r,t,!0)};a("79e5")((function(){return"/a/b"!=c.call({source:"a",flags:"b"})}))?o((function(){var t=n(this);return"/".concat(t.source,"/","flags"in t?t.flags:!i&&t instanceof RegExp?s.call(t):void 0)})):c.name!=r&&o((function(){return c.call(this)}))},"721a":function(t,e,a){},"94a7":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"container"},[a("h2",{staticClass:"title"},[t._v("课程详情")]),t._v(" "),a("div",{staticClass:"wraper panel"},[a("div",{staticClass:"panel__hd"},[a("h3",{staticClass:"panel-title"},[t._v("课程基本信息")]),t._v(" "),a("router-link",{attrs:{to:{name:"CourseEdit",query:{id:t.viewId}}}},[a("el-button",[t._v("编辑课程")])],1)],1),t._v(" "),a("div",{staticClass:"panel__bd"},[a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课程封面")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("img",{staticClass:"avatar",attrs:{src:t.content.cover}})])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课程名称")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("strong",[t._v(t._s(t.content.name))])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课程价格")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("strong",[t._v(t._s(t.content.price))])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("开课时间")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("strong",[t._v(t._s(t.content.beginDate))])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("班型")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("strong",[t._v(t._s(t.content.enrolment))])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课程类目")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("strong",[t._v(t._s(t.content.categoryName))])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("适合年龄段")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("strong",[t._v(t._s(t._f("ageIntervalStr")(t.content.ageInterval)))])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课时")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("strong",[t._v(t._s(t.content.hours))])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课程标签")]),t._v(" "),a("div",{staticClass:"flex__bd"},t._l(t.tagList,(function(e){return a("el-tag",{key:e,staticClass:"tags",attrs:{type:"danger"}},[t._v(t._s(e))])})),1)]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("推荐讲师")]),t._v(" "),a("div",{staticClass:"flex__bd"},t._l(t.content.teachers,(function(e){return a("div",{key:e.name,staticClass:"teacher"},[a("img",{staticClass:"teacher-avatar",attrs:{src:e.photo,alt:"头像"}}),t._v(" "),a("div",{staticClass:"teacher-info"},[a("h6",{staticClass:"teacher-name"},[t._v(t._s(e.realName))]),t._v(" "),a("div",{staticClass:"teacher-slogan"},[t._v(t._s(e.briefIntroduction))])])])})),0)]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课程介绍")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("p",{staticClass:"course-intro",domProps:{innerHTML:t._s(t.content.detailWords)}})])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课程大纲")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("a",{attrs:{href:t.content.outline,target:"_blank"}},[a("el-button",{attrs:{type:"primary"}},[t._v("打开大纲")])],1)])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("学员风采")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("ul",{staticClass:"list"},t._l(t.content.studentStyle,(function(t){return a("li",{key:t},[a("img",{staticClass:"list-img",attrs:{src:t,alt:""}})])})),0)])])])]),t._v(" "),a("div",{staticClass:"panel tabs-wraper"},[a("el-tabs",{model:{value:t.activeName0,callback:function(e){t.activeName0=e},expression:"activeName0"}},[a("el-tab-pane",{attrs:{label:"正在上课",name:"learning"}},[a("div",{staticClass:"table-wraper"},[a("el-table",{staticClass:"table",attrs:{data:t.studentList}},[a("el-table-column",{attrs:{label:"学员名称",prop:"studentName"}}),t._v(" "),a("el-table-column",{attrs:{label:"手机号",prop:"phone"}}),t._v(" "),a("el-table-column",{attrs:{label:"入学时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(t._f("orderTimeStr")(e.row.orderTime))+"\n              ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"当前讲师"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(e.row.currentTeacherName)+"\n                "),a("span",{staticClass:"change",on:{click:function(a){return t.openChangeTeacher(e.row.id)}}},[t._v("切换")])]}}])})],1)],1)])],1),t._v(" "),a("div",[a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total > 0"}],attrs:{total:t.total,page:t.listQuery.pageNum,limit:t.listQuery.pageSize},on:{"update:page":function(e){return t.$set(t.listQuery,"pageNum",e)},"update:limit":function(e){return t.$set(t.listQuery,"pageSize",e)},pagination:t.getStudentList}})],1)],1),t._v(" "),a("el-dialog",{attrs:{visible:t.isChangeShow},on:{close:function(e){t.isChangeShow=!1}}},[a("h6",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[t._v("更换讲师")]),t._v(" "),a("el-form",{ref:"redrawFrom",attrs:{"inline-message":!0,"label-width":"7em"}},[a("el-form-item",{staticClass:"redraw-item",attrs:{label:"讲师"}},[a("el-select",{attrs:{placeholder:"请选择讲师"},on:{change:t.teacherChange},model:{value:t.teacherStr,callback:function(e){t.teacherStr=e},expression:"teacherStr"}},t._l(t.content.teachers,(function(t){return a("el-option",{key:t.realName,attrs:{value:t.realName}})})),1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"dialog-btn",attrs:{type:"primary"},on:{click:t.onChangeTeacher}},[t._v("确定切换")])],1)],1)],1)},s=[],i=(a("ac4d"),a("8a81"),a("ac6a"),a("7f7f"),a("28a5"),a("db72")),r=(a("c5f6"),a("cabd")),c=a("333d"),o=a("c466"),l={name:"CourseDetail",components:{Pagination:c["a"]},filters:{orderTimeStr:function(t){return Object(o["a"])(t)},ageIntervalStr:function(t){var e=Number(t);return 0===e?"0-3":1===e?"3-6":2===e?"6-9":3===e?"9-12":4===e?"12-15":"15-18"}},data:function(){return{content:{},isEdit:!1,imageUrl:"",dialogImageUrl:"",dialogVisible:!1,list:[],activeName0:"learning",listQuery:{pageNum:1,pageSize:9},ageList:[{value:0,label:"0-3"},{value:1,label:"3-6"},{value:2,label:"6-9"},{value:3,label:"9-12"},{value:4,label:"12-15"},{value:5,label:"15-18"}],total:0,isChangeShow:!1,teacherStr:"",isLeaveShow:!1,tagList:[],studentList:[],classId:"",teacherId:"",viewId:""}},created:function(){var t=this.$route.query.id;t&&(this.viewId=t,this.getView(t),this.getStudentList(t))},methods:{getStudentList:function(t){var e=this,a=Object(i["a"])({curriculumId:t},this.listQuery);Object(r["f"])(a).then((function(t){if(t.code)return t.message&&e.$wran(t.message);if(t.data){var a=t.data;e.total=a.total;var n=a.records;e.studentList=n&&n.length?n:[]}}))},getView:function(t){var e=this,a={id:t};Object(r["h"])(a).then((function(t){if(t.code)return t.message&&e.$warn(t.message);t.data&&(e.content=t.data,e.tagList=t.data.tags.split(","))}))},goBack:function(){this.$router.goBack()},handleAvatarSuccess:function(t,e){this.imageUrl=URL.createObjectURL(e.raw)},beforeAvatarUpload:function(t){var e="image/jpeg"===t.type,a=t.size/1024/1024<2;return e||this.$message.error("上传头像图片只能是 JPG 格式!"),a||this.$message.error("上传头像图片大小不能超过 2MB!"),e&&a},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},delTeacher:function(t,e){this.teacherArr.splice(e,1)},addTeacher:function(){this.teacherArr.push({catelogVal:""})},handleExceed:function(t,e){this.$message.warning("当前限制选择 3 个文件，本次选择了 ".concat(t.length," 个文件，共选择了 ").concat(t.length+e.length," 个文件"))},beforeRemove:function(t,e){return this.$confirm("确定移除 ".concat(t.name,"？"))},openChangeTeacher:function(t){this.isChangeShow=!0,this.classId=t},teacherChange:function(){var t=!0,e=!1,a=void 0;try{for(var n,s=this.content.teachers[Symbol.iterator]();!(t=(n=s.next()).done);t=!0){var i=n.value;if(i.realName===this.teacherStr)return void(this.teacherId=i.id)}}catch(r){e=!0,a=r}finally{try{t||null==s.return||s.return()}finally{if(e)throw a}}},onChangeTeacher:function(){var t=this,e={teacherId:this.teacherId,tscId:this.classId};Object(r["e"])(e).then((function(e){if(e.code)return e.message&&t.$warn(e.message);t.$success(e.message),t.isChangeShow=!1,t.getStudentList(t.viewId)}))},openGraduate:function(t){this.isLeaveShow=!0}}},u=l,d=(a("c064"),a("2877")),v=Object(d["a"])(u,n,s,!1,null,"65030f7a",null);e["default"]=v.exports},9744:function(t,e,a){"use strict";var n=a("4588"),s=a("be13");t.exports=function(t){var e=String(s(this)),a="",i=n(t);if(i<0||i==1/0)throw RangeError("Count can't be negative");for(;i>0;(i>>>=1)&&(e+=e))1&i&&(a+=e);return a}},c064:function(t,e,a){"use strict";var n=a("721a"),s=a.n(n);s.a},c466:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"a",(function(){return s}));a("28a5"),a("f576"),a("a481"),a("6b54"),a("7618");function n(t){var e=new Date(t),a=e.getFullYear(),n=e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1,s=e.getDate()<10?"0"+e.getDate():e.getDate(),i=e.getHours()<10?"0"+e.getHours():e.getHours(),r=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),c=new Date,o=c.getFullYear(),l=c.getMonth()+1<10?"0"+(c.getMonth()+1):c.getMonth()+1,u=c.getDate()<10?"0"+c.getDate():c.getDate();return o===a&&l===n&&u===s?i+":"+r:n+"-"+s+" "+i+":"+r}function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"YYYY-MM-DD hh:mm:ss",a=(new Date).getTime();t||(t=a);while(t.toString().length<13)t+="0";var n=new Date(t);n.getMonth();var s={year:n.getFullYear(),month:n.getMonth()+1,day:n.getDate(),hours:n.getHours(),minutes:n.getMinutes(),seconds:n.getSeconds()};switch(s.day<10&&(s.day="0"+s.day),s.minutes<10&&(s.minutes="0"+s.minutes),e){case"YYYY-MM-DD hh:mm:ss":return"".concat(s.year,"-").concat(s.month,"-").concat(s.day," ").concat(s.hours,":").concat(s.minutes,":").concat(s.seconds);case"YYYY-MM-DD":return"".concat(s.year,"-").concat(s.month,"-").concat(s.day);case"MM-DD":return"".concat(s.month,"-").concat(s.day);case"hh:mm:ss":return"".concat(s.hours,":").concat(s.minutes,":").concat(s.seconds);case"hh:mm":return"".concat(s.hours,":").concat(s.minutes);case"computed":if(a>t){var i=Math.abs(t-a),r=i/1e3,c=r/60,o=c/60,l=o/24,u=l/7;if(~~u>0&&u<3)return~~u+"周前";if(l<7&&~~l>0)return~~l+"天前";if(~~o>0&&o<24)return~~o+"小时前";if(~~c>0&&c<60)return~~c+"分钟前";if(~~r>0&&r<60)return~~r+"秒前"}else console.log("未来的时间");return"".concat(s.year,"-").concat(s.month,"-").concat(s.day," ").concat(s.hours,":").concat(s.minutes,":").concat(s.seconds)}}},cabd:function(t,e,a){"use strict";a.d(e,"g",(function(){return s})),a.d(e,"a",(function(){return i})),a.d(e,"h",(function(){return r})),a.d(e,"d",(function(){return l})),a.d(e,"c",(function(){return o})),a.d(e,"b",(function(){return c})),a.d(e,"f",(function(){return u})),a.d(e,"e",(function(){return d}));var n=a("b775");function s(t){return n["a"].post("/boss/v2/curriculumList",t)}function i(t){return n["a"].post("/boss/v2/curriculum",t)}function r(t){var e=t.id;return n["a"].get("/boss/v2/curriculum/"+e)}function c(t){var e=t.id;return n["a"].get("/boss/v2/curriculum/off/"+e)}function o(t){var e=t.id;return n["a"].get("/boss/v2/curriculum/on/"+e)}function l(t){return n["a"].patch("/boss/v2/curriculum",t)}function u(t){return n["a"].post("/boss/v2/curriculum4teacher",t)}function d(t){return n["a"].post("/boss/v2/curriculum/distributionTeacher4Student",t)}},f576:function(t,e,a){"use strict";var n=a("5ca1"),s=a("2e08"),i=a("a25f"),r=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);n(n.P+n.F*r,"String",{padStart:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0,!0)}})}}]);