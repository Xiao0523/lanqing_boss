(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b0c0843"],{"0e74":function(t,e,a){"use strict";var s=a("bcc5"),n=a.n(s);n.a},"2e08":function(t,e,a){var s=a("9def"),n=a("9744"),r=a("be13");t.exports=function(t,e,a,o){var c=String(r(t)),l=c.length,i=void 0===a?" ":String(a),u=s(e);if(u<=l||""==i)return c;var d=u-l,m=n.call(i,Math.ceil(d/i.length));return m.length>d&&(m=m.slice(0,d)),o?m+c:c+m}},3729:function(t,e,a){t.exports=a.p+"static/img/no-comment.f9977fe1.png"},3846:function(t,e,a){a("9e1e")&&"g"!=/./g.flags&&a("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:a("0bfb")})},"49e5":function(t,e,a){"use strict";a.d(e,"g",(function(){return n})),a.d(e,"f",(function(){return r})),a.d(e,"h",(function(){return o})),a.d(e,"i",(function(){return c})),a.d(e,"a",(function(){return l})),a.d(e,"c",(function(){return i})),a.d(e,"b",(function(){return u})),a.d(e,"e",(function(){return d})),a.d(e,"d",(function(){return m}));var s=a("b775");function n(t){return s["a"].post("/boss/v2/student",t)}function r(t){var e=t.id;return s["a"].get("/boss/v2/student/"+e)}function o(t){return s["a"].post("/boss/v2/studentLocked",t)}function c(t){return s["a"].post("/boss/v2/studentUnlock",t)}function l(t){var e=t.entrustId,a=t.studentId;return s["a"].post("/boss/v2/student/unlock/"+e+"/"+a)}function i(t){var e=t.id;return s["a"].get("/boss/v2/comment4StudentView/"+e)}function u(t){var e=t.id,a=t.type;return s["a"].get("/boss/v2/evaluation/"+e+"/"+a)}function d(t){var e=t.studentId,a=t.type;return s["a"].get("/boss/v2/studentOrder/"+e+"/"+a)}function m(){return s["a"].get("/boss/v2/student/mainInfo")}},"6b54":function(t,e,a){"use strict";a("3846");var s=a("cb7c"),n=a("0bfb"),r=a("9e1e"),o="toString",c=/./[o],l=function(t){a("2aba")(RegExp.prototype,o,t,!0)};a("79e5")((function(){return"/a/b"!=c.call({source:"a",flags:"b"})}))?l((function(){var t=s(this);return"/".concat(t.source,"/","flags"in t?t.flags:!r&&t instanceof RegExp?n.call(t):void 0)})):c.name!=o&&l((function(){return c.call(this)}))},"820e":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("h2",{staticClass:"title"},[t._v("学员详情")]),t._v(" "),s("div",{staticClass:"panel"},[s("h3",{staticClass:"panel__hd"},[t._v("学员基本信息")]),t._v(" "),s("div",{staticClass:"panel__bd"},[s("div",{staticClass:"student"},[s("img",{staticClass:"student-avatar",attrs:{src:t.studentContent.icon}}),t._v(" "),s("div",[s("div",{staticClass:"student-name"},[t._v(t._s(t.studentContent.nickName))]),t._v(" "),s("div",{staticClass:"student-slogan"},[t._v("好好学习 天天向上")])])]),t._v(" "),s("el-row",{attrs:{gutter:50}},[s("el-col",{attrs:{span:6}},[s("span",{staticClass:"info-title"},[t._v("手机号码")]),t._v(" "),s("strong",{staticClass:"info-data"},[t._v(t._s(t.studentContent.phone))])]),t._v(" "),s("el-col",{attrs:{span:6}},[s("span",{staticClass:"info-title"},[t._v("正在学习")]),t._v(" "),s("strong",{staticClass:"info-data"},[t._v(t._s(t.studentContent.studyNum))])]),t._v(" "),s("el-col",{attrs:{span:6}},[s("span",{staticClass:"info-title"},[t._v("消费总额（元）")]),t._v(" "),s("strong",{staticClass:"info-data"},[t._v(t._s(t.studentContent.money))])]),t._v(" "),s("el-col",{attrs:{span:6}},[s("span",{staticClass:"info-title"},[t._v("评价数量")]),t._v(" "),s("strong",{staticClass:"info-data"},[t._v(t._s(t.studentContent.commentNum))])])],1)],1)]),t._v(" "),s("div",{staticClass:"panel tabs-wraper"},[s("el-tabs",{on:{"tab-click":t.getClassList},model:{value:t.activeName0,callback:function(e){t.activeName0=e},expression:"activeName0"}},[s("el-tab-pane",{attrs:{label:"正在学习中"}},[s("div",{staticClass:"table-wraper"},[s("el-table",{staticClass:"table",attrs:{data:t.classList}},[s("el-table-column",{attrs:{label:"订单号",prop:"orderNum"}}),t._v(" "),s("el-table-column",{attrs:{label:"课程名称",prop:"curriculumName"}}),t._v(" "),s("el-table-column",{attrs:{label:"课时",prop:"hours"}}),t._v(" "),s("el-table-column",{attrs:{label:"课程价格（元）",prop:"curriculumPrice"}}),t._v(" "),s("el-table-column",{attrs:{label:"当前讲师"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(e.row.currentTeacherName)+"\n                "),s("span",{staticClass:"change",on:{click:function(a){return t.openChangeTeacher(e.row.curriculumId,e.row.id)}}},[t._v("切换")])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"状态"}},[[t._v("\n                学习中\n              ")]],2),t._v(" "),s("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.openGraduate(e.row.id)}}},[t._v("结业")])]}}])}),t._v(" "),s("template",{slot:"empty"},[s("div",{staticClass:"empty-content"},[s("img",{staticClass:"empty-img",attrs:{src:a("f7fa"),alt:""}}),t._v(" "),s("p",{staticClass:"empty-text"},[t._v("暂无课程")])])])],2)],1)]),t._v(" "),s("el-tab-pane",{attrs:{label:"退款课程"}},[s("div",{staticClass:"table-wraper"},[s("el-table",{staticClass:"table",attrs:{data:t.classList}},[s("el-table-column",{attrs:{label:"订单号",prop:"orderNum"}}),t._v(" "),s("el-table-column",{attrs:{label:"课程名称",prop:"curriculumName"}}),t._v(" "),s("el-table-column",{attrs:{label:"课时",prop:"hours"}}),t._v(" "),s("el-table-column",{attrs:{label:"课程价格（元）",prop:"curriculumPrice"}}),t._v(" "),s("el-table-column",{attrs:{label:"当前讲师",prop:"currentTeacherName"}}),t._v(" "),s("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(t._f("refundStatusStr")(e.row.status))+"\n                ")]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"退款金额（元）",prop:"payPrice"}}),t._v(" "),s("template",{slot:"empty"},[s("div",{staticClass:"empty-content"},[s("img",{staticClass:"empty-img",attrs:{src:a("f7fa"),alt:""}}),t._v(" "),s("p",{staticClass:"empty-text"},[t._v("暂无课程")])])])],2)],1)]),t._v(" "),s("el-tab-pane",{attrs:{label:"结束课程"}},[s("div",{staticClass:"table-wraper"},[s("el-table",{staticClass:"table",attrs:{data:t.classList}},[s("el-table-column",{attrs:{label:"订单号",prop:"orderNum"}}),t._v(" "),s("el-table-column",{attrs:{label:"课程名称",prop:"curriculumName"}}),t._v(" "),s("el-table-column",{attrs:{label:"课时",prop:"hours"}}),t._v(" "),s("el-table-column",{attrs:{label:"课程价格（元）",prop:"curriculumPrice"}}),t._v(" "),s("el-table-column",{attrs:{label:"当前讲师",prop:"currentTeacherName"}}),t._v(" "),s("el-table-column",{attrs:{label:"状态"}},[[t._v("\n                已结束\n              ")]],2),t._v(" "),s("el-table-column",{attrs:{label:"评价"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(t._f("storeEvaluateStr")(e.row.storeEvaluate))+"\n              ")]}}])}),t._v(" "),s("template",{slot:"empty"},[s("div",{staticClass:"empty-content"},[s("img",{staticClass:"empty-img",attrs:{src:a("f7fa"),alt:""}}),t._v(" "),s("p",{staticClass:"empty-text"},[t._v("暂无课程")])])])],2)],1)])],1)],1),t._v(" "),s("div",{staticClass:"panel tabs-wraper"},[s("el-tabs",{model:{value:t.activeName1,callback:function(e){t.activeName1=e},expression:"activeName1"}},[s("el-tab-pane",{attrs:{label:"学员评价",name:"evaluate"}},[s("el-radio-group",{staticClass:"evaluate-radio",attrs:{size:"medium"},model:{value:t.evaluateTarget,callback:function(e){t.evaluateTarget=e},expression:"evaluateTarget"}},[s("el-radio-button",{attrs:{label:"shop"}},[t._v("店铺")]),t._v(" "),s("el-radio-button",{attrs:{label:"course"}},[t._v("课程")]),t._v(" "),s("el-radio-button",{attrs:{label:"teacher"}},[t._v("讲师")])],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:"shop"===t.evaluateTarget,expression:"evaluateTarget === 'shop'"}]},[s("div",{staticClass:"table-wraper box-p"},[s("el-table",{staticClass:"table",attrs:{data:t.commentList.comment4StudentStoreViews}},[s("el-table-column",{attrs:{label:"发布时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("commentTimeStr")(e.row.commentTime)))]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"评价星级"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("star",{attrs:{score:t.row.score}})]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"评论内容",prop:"commentWords"}}),t._v(" "),s("template",{slot:"empty"},[s("div",{staticClass:"empty-content"},[s("img",{staticClass:"empty-img",attrs:{src:a("3729"),alt:""}}),t._v(" "),s("p",{staticClass:"empty-text"},[t._v("暂无评价")])])])],2)],1)]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:"course"===t.evaluateTarget,expression:"evaluateTarget === 'course'"}]},[s("div",{staticClass:"table-wraper box-p"},[s("el-table",{staticClass:"table",attrs:{data:t.commentList.comment4StudentCurriculumViews}},[s("el-table-column",{attrs:{label:"课程名称",prop:"curriculumName"}}),t._v(" "),s("el-table-column",{attrs:{label:"发布时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("commentTimeStr")(e.row.commentTime)))]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"评价星级"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("star",{attrs:{score:t.row.score}})]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"评论内容",prop:"commentWords"}}),t._v(" "),s("template",{slot:"empty"},[s("div",{staticClass:"empty-content"},[s("img",{staticClass:"empty-img",attrs:{src:a("3729"),alt:""}}),t._v(" "),s("p",{staticClass:"empty-text"},[t._v("暂无评价")])])])],2)],1)]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:"teacher"===t.evaluateTarget,expression:"evaluateTarget === 'teacher'"}]},[s("div",{staticClass:"table-wraper box-p"},[s("el-table",{staticClass:"table",attrs:{data:t.commentList.comment4StudentTeacherViews}},[s("el-table-column",{attrs:{label:"讲师名称",prop:"realName"}}),t._v(" "),s("el-table-column",{attrs:{label:"发布时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("commentTimeStr")(e.row.commentTime)))]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"评价星级"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("star",{attrs:{score:t.row.score}})]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"评论内容",prop:"commentWords"}}),t._v(" "),s("template",{slot:"empty"},[s("div",{staticClass:"empty-content"},[s("img",{staticClass:"empty-img",attrs:{src:a("3729"),alt:""}}),t._v(" "),s("p",{staticClass:"empty-text"},[t._v("暂无评价")])])])],2)],1)])],1)],1)],1),t._v(" "),s("el-dialog",{attrs:{title:"确认该课程学员已结业吗？",visible:t.isGraduateShow,center:!0},on:{close:function(e){t.isGraduateShow=!1}}},[s("div",{staticClass:"dialog-radio-wraper"},[s("el-radio-group",{attrs:{fill:"#00D2A5","text-color":"#00D2A5",size:"medium"},model:{value:t.studentEvaluate,callback:function(e){t.studentEvaluate=e},expression:"studentEvaluate"}},[s("el-radio",{attrs:{border:"",size:"medium",label:"1"}},[t._v("成绩超群")]),t._v(" "),s("el-radio",{attrs:{border:"",size:"medium",label:"2"}},[t._v("成绩优秀")]),t._v(" "),s("el-radio",{attrs:{border:"",size:"medium",label:"3"}},[t._v("成绩良好")]),t._v(" "),s("el-radio",{attrs:{border:"",size:"medium",label:"4"}},[t._v("成绩一般")]),t._v(" "),s("el-radio",{attrs:{border:"",size:"medium",label:"5"}},[t._v("不及格")])],1)],1),t._v(" "),s("span",{attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.isGraduateShow=!1}}},[t._v("取 消")]),t._v(" "),s("el-button",{staticClass:"colorfulBtn",attrs:{type:"primary"},on:{click:t.onComment}},[t._v("立即结业")])],1)]),t._v(" "),s("el-dialog",{attrs:{visible:t.isChangeShow},on:{close:function(e){t.isChangeShow=!1}}},[s("h6",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[t._v("切换讲师")]),t._v(" "),s("el-form",{ref:"teacherFrom",attrs:{"inline-message":!0,"label-width":"7em"}},[s("el-form-item",{attrs:{label:"课程讲师"}},[s("el-select",{attrs:{placeholder:"选择课程讲师"},model:{value:t.teacherId,callback:function(e){t.teacherId=e},expression:"teacherId"}},t._l(t.teacherList,(function(t){return s("el-option",{key:t.realName,attrs:{value:t.id,label:t.realName}})})),1)],1)],1),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticClass:"colorfulBtn",attrs:{type:"primary"},on:{click:t.onChangeTeacher}},[t._v("确认切换")])],1)],1)],1)},n=[],r=a("db72"),o=(a("a481"),a("49e5")),c=a("cabd"),l=a("b30f"),i=a("a1d7"),u=a("c466"),d={name:"StudentDetail",components:{Star:i["a"]},filters:{storeEvaluateStr:function(t){return 0===t?"成绩超群":1===t?"成绩优异":2===t?"成绩良好":3===t?"成绩一般":4===t?"不及格":""},refundStatusStr:function(t){return 5===t?"退款中":"已到账"},orderTimeStr:function(t){return t&&Object(u["a"])(t)},commentTimeStr:function(t){return t&&Object(u["a"])(t)},statusStr:function(t){return 4===t?"已结业":6===t?"退款完成，课程终止":"其他"}},data:function(){return{list:[],activeName0:0,activeName1:"evaluate",evaluateTarget:"shop",isGraduateShow:!1,isCommentShow:!1,studentEvaluate:"",isRefundShow:!1,refundForm:{applyPrice:"",refundDescription:""},backObj:{},backFlag:!1,refundFormRules:{},isChangeShow:!1,teacherFormRules:{},studentContent:{},viewId:"",classList:[{}],classOrder:[],commentList:{comment4StudentCurriculumViews:[],comment4StudentStoreViews:[],comment4StudentTeacherViews:[]},refundId:"",curriculumId:"",teacherList:[],teacherId:"",editId:""}},created:function(){var t=this.$route.query.id;t&&(this.viewId=t,this.getView(t),this.getClassList(t),this.getComment(t))},methods:{getView:function(t){var e=this,a={id:t};Object(o["f"])(a).then((function(t){if(t.code)return t.message&&e.$warn(t.message);t.data&&(e.studentContent=t.data)}))},getTeacher:function(t){var e=this,a={id:t};Object(c["h"])(a).then((function(t){if(t.code)return t.message&&e.$warn(t.message);t.data&&(e.teacherList=t.data.teachers,1===e.teacherList.length&&(e.$warn("该门课只有一位老师上课，无法切换！"),e.isChangeShow=!1))}))},proving:function(){this.refundForm.applyPrice=this.refundForm.applyPrice.replace(/[^\.\d]/g,""),this.refundForm.applyPrice=this.refundForm.applyPrice.replace(".","")},getComment:function(t){var e=this,a={id:t};Object(o["c"])(a).then((function(t){if(t.code)return t.message&&e.$warn(t.message);t.data&&(e.commentList=t.data)}))},getClassList:function(){var t=this,e={studentId:this.viewId,type:this.activeName0};Object(o["e"])(e).then((function(e){if(e.code)return e.message&&t.$warn(e.message);e.data&&(t.classList=e.data)}))},openGraduate:function(t){this.curriculumId=t,this.isGraduateShow=!0},onComment:function(){var t=this,e={id:this.curriculumId,type:this.studentEvaluate};Object(o["b"])(e).then((function(e){if(e.code)return e.message&&t.$warn(e.message);t.$success(e.message),t.getClassList(t.viewId),t.isGraduateShow=!1}))},onRefund:function(){var t=this,e=Object(r["a"])({refundId:this.refundId},this.refundForm);Object(l["c"])(e).then((function(e){if(e.code)return e.message&&t.$warn(e.message);t.$success(e.message),t.getClassList(t.viewId),t.isRefundShow=!1}))},openChangeTeacher:function(t,e){this.editId=e,this.getTeacher(t),this.isChangeShow=!0},onChangeTeacher:function(){var t=this,e={teacherId:this.teacherId,tscId:this.editId};Object(c["e"])(e).then((function(e){if(e.code)return e.message&&t.$warn(e.message);t.$success(e.message),t.isChangeShow=!1,t.getClassList(t.viewId)}))}}},m=d,v=(a("0e74"),a("2877")),f=Object(v["a"])(m,s,n,!1,null,"53796ad1",null);e["default"]=f.exports},9744:function(t,e,a){"use strict";var s=a("4588"),n=a("be13");t.exports=function(t){var e=String(n(this)),a="",r=s(t);if(r<0||r==1/0)throw RangeError("Count can't be negative");for(;r>0;(r>>>=1)&&(e+=e))1&r&&(a+=e);return a}},b30f:function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"b",(function(){return o}));var s=a("b775");function n(t){return s["a"].post("/boss/v2/order",t)}function r(t){return s["a"].post("/boss/v2/refund",t)}function o(t){var e=t.pageNum,a=t.pageSize;return s["a"].get("/boss/v2/refund/"+e+"/"+a)}},bcc5:function(t,e,a){},c466:function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));a("28a5"),a("f576"),a("a481"),a("6b54"),a("7618");function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"YYYY-MM-DD hh:mm:ss",a=(new Date).getTime();t||(t=a);while(t.toString().length<13)t+="0";var s=new Date(t);s.getMonth();var n={year:s.getFullYear(),month:s.getMonth()+1,day:s.getDate(),hours:s.getHours(),minutes:s.getMinutes(),seconds:s.getSeconds()};switch(n.day<10&&(n.day="0"+n.day),n.minutes<10&&(n.minutes="0"+n.minutes),e){case"YYYY-MM-DD hh:mm:ss":return"".concat(n.year,"-").concat(n.month,"-").concat(n.day," ").concat(n.hours,":").concat(n.minutes,":").concat(n.seconds);case"YYYY-MM-DD":return"".concat(n.year,"-").concat(n.month,"-").concat(n.day);case"MM-DD":return"".concat(n.month,"-").concat(n.day);case"hh:mm:ss":return"".concat(n.hours,":").concat(n.minutes,":").concat(n.seconds);case"hh:mm":return"".concat(n.hours,":").concat(n.minutes);case"computed":if(a>t){var r=Math.abs(t-a),o=r/1e3,c=o/60,l=c/60,i=l/24,u=i/7;if(~~u>0&&u<3)return~~u+"周前";if(i<7&&~~i>0)return~~i+"天前";if(~~l>0&&l<24)return~~l+"小时前";if(~~c>0&&c<60)return~~c+"分钟前";if(~~o>0&&o<60)return~~o+"秒前"}else console.log("未来的时间");return"".concat(n.year,"-").concat(n.month,"-").concat(n.day," ").concat(n.hours,":").concat(n.minutes,":").concat(n.seconds)}}},cabd:function(t,e,a){"use strict";a.d(e,"g",(function(){return n})),a.d(e,"a",(function(){return r})),a.d(e,"h",(function(){return o})),a.d(e,"d",(function(){return i})),a.d(e,"c",(function(){return l})),a.d(e,"b",(function(){return c})),a.d(e,"f",(function(){return u})),a.d(e,"e",(function(){return d}));var s=a("b775");function n(t){return s["a"].post("/boss/v2/curriculumList",t)}function r(t){return s["a"].post("/boss/v2/curriculum",t)}function o(t){var e=t.id;return s["a"].get("/boss/v2/curriculum/"+e)}function c(t){var e=t.id;return s["a"].get("/boss/v2/curriculum/off/"+e)}function l(t){var e=t.id;return s["a"].get("/boss/v2/curriculum/on/"+e)}function i(t){return s["a"].patch("/boss/v2/curriculum",t)}function u(t){return s["a"].post("/boss/v2/curriculum4teacher",t)}function d(t){return s["a"].post("/boss/v2/curriculum/distributionTeacher4Student",t)}},f576:function(t,e,a){"use strict";var s=a("5ca1"),n=a("2e08"),r=a("a25f"),o=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(r);s(s.P+s.F*o,"String",{padStart:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0,!0)}})},f7fa:function(t,e,a){t.exports=a.p+"static/img/no-cursor.4293addf.png"}}]);