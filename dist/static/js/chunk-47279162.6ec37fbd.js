(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-47279162"],{2298:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("el-button",{staticClass:"el-icon-plus add-btn",attrs:{size:"medium",type:"primary"},on:{click:t.goEdit}},[t._v("新增讲师")]),t._v(" "),n("h2",{staticClass:"title"},[t._v("讲师管理")]),t._v(" "),n("el-form",{staticClass:"search-box",attrs:{inline:!0}},[n("el-form-item",{staticClass:"search-item"},[n("el-input",{attrs:{placeholder:"搜索老师名称","suffix-icon":"el-icon-search"},model:{value:t.keywords.name,callback:function(e){t.$set(t.keywords,"name","string"===typeof e?e.trim():e)},expression:"keywords.name"}})],1),t._v(" "),n("el-form-item",{staticClass:"search-item",attrs:{label:"课程类目"}},[n("el-select",{model:{value:t.keywords.categoryId,callback:function(e){t.$set(t.keywords,"categoryId",e)},expression:"keywords.categoryId"}},t._l(t.categoryList,(function(t){return n("el-option",{key:t.categoryName+t.categoryId,attrs:{value:t.categoryId,label:t.categoryName}})})),1)],1),t._v(" "),n("el-form-item",{attrs:{label:"讲师状态"}},[n("el-select",{model:{value:t.keywords.status,callback:function(e){t.$set(t.keywords,"status",e)},expression:"keywords.status"}},t._l(t.statusList,(function(t){return n("el-option",{key:t.label+t.value,attrs:{value:t.value,label:t.label}})})),1),t._v(" "),n("el-form-item",{staticClass:"search-item seacher-btn"},[n("el-button",{attrs:{size:"small"},on:{click:t.fetchList}},[t._v("搜索")])],1)],1)],1),t._v(" "),n("div",{staticClass:"table-wraper"},[n("el-table",{staticClass:"table",attrs:{data:t.list}},[n("el-table-column",{attrs:{label:"讲师名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{staticClass:"img-box"},[n("img",{staticClass:"img-warpper",attrs:{src:e.row.photo,alt:""}}),t._v("\n            "+t._s(e.row.realName)+"\n          ")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"课程类目"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t._f("categoriesStr")(e.row.categories))+"\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"课程数",prop:"curriculumAmount"}}),t._v(" "),n("el-table-column",{attrs:{label:"学生数",prop:"studentAmount"}}),t._v(" "),n("el-table-column",{attrs:{label:"评分"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("star",{attrs:{score:Number(t.row.score)}})]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t._f("statusStr")(e.row.status))+"\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("router-link",{attrs:{to:{name:"TeacherDetail",query:{id:e.row.id}}}},[n("el-button",{attrs:{size:"mini"}},[t._v("详情")])],1),t._v(" "),n("el-popconfirm",{attrs:{"confirm-button-text":"好的","cancel-button-text":"不用了",icon:"el-icon-info","icon-color":"red",title:"是否确定该老师的当前状态？"},on:{onConfirm:function(a){return t.editStatus(e.row.id,e.row.status)}}},[n("el-button",{attrs:{slot:"reference",size:"mini"},slot:"reference"},[t._v(t._s(t._f("statusBtn")(e.row.status)))])],1)]}}])}),t._v(" "),n("template",{slot:"empty"},[n("div",{staticClass:"empty-content"},[n("img",{staticClass:"empty-img",attrs:{src:a("a774"),alt:""}}),t._v(" "),n("p",{staticClass:"empty-text"},[t._v("暂无记录")])])])],2)],1)],1)},s=[],r=a("9afb"),o=a("66da"),c=a("c57c"),i=a("a1d7"),u={name:"Stuedent",components:{Star:i["a"]},filters:{statusStr:function(t){return 0===t?"在职":"离职"},statusBtn:function(t){return 0===t?"离职":"在职"},categoriesStr:function(t){return t.length?t.join(","):""}},data:function(){return{list:[],statusList:[{label:"全部",value:""},{label:"在职",value:0},{label:"离职",value:1}],categoryList:[{categoryName:"全部",categoryId:""}],keywords:{name:"",categoryId:"",status:""},value1:!0,value2:!0,total:0,pageNum:1,pageSize:10}},created:function(){this.fetchList(),this.getCategory()},methods:{getCategory:function(){var t=this;Object(o["d"])().then((function(e){if(e.code)return e.message&&t.$warn(e.message);e.data&&console.log(e.data)}))},fetchList:function(){var t=this,e=this.keywords;Object(r["f"])(e).then((function(e){if(e.code)return e.message&&t.$(e.message);e.data&&(t.list=e.data)}))},editStatus:function(t,e){var a=this,n={id:t};n.status=0===e?1:0,Object(r["c"])(n).then((function(t){if(t.code)return t.message&&a.$warn(t.message);a.fetchList()}))},goEdit:function(){1===Object(c["a"])("examineStatus")?this.$router.push({name:"TeacherEdit"}):this.$warn("请先前往店铺认证！！！")}}},l=u,f=(a("8b9a"),a("2877")),d=Object(f["a"])(l,n,s,!1,null,"5683b34f",null);e["default"]=d.exports},"66da":function(t,e,a){"use strict";a.d(e,"c",(function(){return s})),a.d(e,"e",(function(){return r})),a.d(e,"f",(function(){return o})),a.d(e,"a",(function(){return c})),a.d(e,"b",(function(){return i})),a.d(e,"d",(function(){return u}));var n=a("b775");function s(){return n["a"].get("/boss/v2/category")}function r(){return n["a"].get("/boss/v2/category/one")}function o(t){var e=t.id;return n["a"].get("/boss/v2/category/two/"+e)}function c(t){var e=t.id;return n["a"].post("/boss/v2/category/"+e)}function i(t){var e=t.id;return n["a"].delete("/boss/v2/category/"+e)}function u(){return n["a"].get("/boss/v2/curriculum/category")}},"8b9a":function(t,e,a){"use strict";var n=a("9249"),s=a.n(n);s.a},9249:function(t,e,a){},"9afb":function(t,e,a){"use strict";a.d(e,"f",(function(){return s})),a.d(e,"a",(function(){return r})),a.d(e,"d",(function(){return c})),a.d(e,"b",(function(){return o})),a.d(e,"e",(function(){return i})),a.d(e,"c",(function(){return u}));var n=a("b775");function s(t){return n["a"].post("/boss/v2/teacherList",t)}function r(t){return n["a"].post("/boss/v2/teacher",t)}function o(t){return n["a"].patch("/boss/v2/teacher",t)}function c(t){var e=t.id;return n["a"].get("/boss/v2/teacher/"+e)}function i(t){return n["a"].post("/boss/v2/teacher/student",t)}function u(t){var e=t.id,a=t.status;return n["a"].post("/boss/v2/teacher/"+e+"/"+a)}},a774:function(t,e,a){t.exports=a.p+"static/img/no-record.cfe34615.png"}}]);