(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cac86514"],{1169:function(e,t,r){var i=r("2d95");e.exports=Array.isArray||function(e){return"Array"==i(e)}},"11e9":function(e,t,r){var i=r("52a7"),n=r("4630"),o=r("6821"),s=r("6a99"),a=r("69a8"),c=r("c69a"),u=Object.getOwnPropertyDescriptor;t.f=r("9e1e")?u:function(e,t){if(e=o(e),t=s(t,!0),c)try{return u(e,t)}catch(r){}if(a(e,t))return n(!i.f.call(e,t),e[t])}},"37c8":function(e,t,r){t.f=r("2b4c")},"3a72":function(e,t,r){var i=r("7726"),n=r("8378"),o=r("2d00"),s=r("37c8"),a=r("86cc").f;e.exports=function(e){var t=n.Symbol||(n.Symbol=o?{}:i.Symbol||{});"_"==e.charAt(0)||e in t||a(t,e,{value:s.f(e)})}},"3d00":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"container"},[r("el-form",{ref:"submitForm",staticClass:"submitForm",attrs:{"label-width":"7em",model:e.form,rules:e.rules}},[r("el-form-item",{attrs:{label:"机构名称",prop:"name"}},[r("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"联系人",prop:"contactName"}},[r("el-input",{model:{value:e.form.contactName,callback:function(t){e.$set(e.form,"contactName",t)},expression:"form.contactName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"联系电话",prop:"contactPhone"}},[r("el-input",{model:{value:e.form.contactPhone,callback:function(t){e.$set(e.form,"contactPhone",t)},expression:"form.contactPhone"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"请选择地址"}},[r("div",{staticClass:"address"},[r("el-select",{attrs:{placeholder:"请选择"},on:{change:function(t){return e.getSonList("province")}},model:{value:e.form.provinceName,callback:function(t){e.$set(e.form,"provinceName",t)},expression:"form.provinceName"}},e._l(e.cityList.province,(function(e){return r("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})})),1),e._v(" "),r("el-select",{attrs:{placeholder:"请选择"},on:{change:function(t){return e.getSonList("city")}},model:{value:e.form.cityName,callback:function(t){e.$set(e.form,"cityName",t)},expression:"form.cityName"}},e._l(e.cityList.city,(function(e){return r("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})})),1),e._v(" "),r("el-select",{attrs:{placeholder:"请选择"},on:{change:function(t){return e.getSonList("district")}},model:{value:e.form.districtName,callback:function(t){e.$set(e.form,"districtName",t)},expression:"form.districtName"}},e._l(e.cityList.district,(function(e){return r("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})})),1),e._v(" "),r("el-select",{attrs:{placeholder:"请选择"},on:{change:function(t){return e.getSonList("street")}},model:{value:e.form.streetName,callback:function(t){e.$set(e.form,"streetName",t)},expression:"form.streetName"}},e._l(e.cityList.street,(function(e){return r("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})})),1),e._v(" "),r("el-input",{staticClass:"input",model:{value:e.form.businessAddress,callback:function(t){e.$set(e.form,"businessAddress",t)},expression:"form.businessAddress"}})],1)]),e._v(" "),r("el-form-item",{attrs:{label:"店铺封面"}},[r("el-upload",{attrs:{action:e.uploadUrl,name:"multipartFile","list-type":"picture-card","file-list":e.CoverImgList,"on-preview":e.handlePicturePreview,"on-remove":e.handleCoversRemove,"on-success":e.handlePicctureCoversSuccess}},[r("i",{staticClass:"el-icon-plus"})])],1),e._v(" "),r("el-form-item",{attrs:{label:"店铺资质"}},[r("el-upload",{attrs:{action:e.uploadUrl,name:"multipartFile","list-type":"picture-card","file-list":e.imgList,"on-preview":e.handlePicturePreview,"on-remove":e.handleRemove,"on-success":e.handlePicctureSuccess}},[r("i",{staticClass:"el-icon-plus"})])],1),e._v(" "),r("el-form-item",{attrs:{label:"店铺视频"}},[r("el-upload",{attrs:{action:e.videoUrl,"before-upload":e.showMock,"on-success":e.handleVideoSuccess,"on-remove":e.handleVideoRemove,limit:1,name:"multipartFile","file-list":e.videoList}},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"学员数",prop:"studentAmount"}},[r("el-input",{model:{value:e.form.studentAmount,callback:function(t){e.$set(e.form,"studentAmount",t)},expression:"form.studentAmount"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"教员数",prop:"teacherAmount"}},[r("el-input",{model:{value:e.form.teacherAmount,callback:function(t){e.$set(e.form,"teacherAmount",t)},expression:"form.teacherAmount"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"营业时间",prop:"businessHours"}},[r("el-input",{model:{value:e.form.businessHours,callback:function(t){e.$set(e.form,"businessHours",t)},expression:"form.businessHours"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"课程数",prop:"curriculumAmount"}},[r("el-input",{model:{value:e.form.curriculumAmount,callback:function(t){e.$set(e.form,"curriculumAmount",t)},expression:"form.curriculumAmount"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"成立时间",prop:""}},[r("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",clearable:!1,"value-format":"yyyy-MM-dd"},model:{value:e.form.establishmentDate,callback:function(t){e.$set(e.form,"establishmentDate",t)},expression:"form.establishmentDate"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"简介",prop:"introduce"}},[r("el-input",{staticClass:"el-textarea",attrs:{type:"textarea",rows:4},model:{value:e.form.introduce,callback:function(t){e.$set(e.form,"introduce",t)},expression:"form.introduce"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"自我描述",prop:"selfDescription"}},[r("el-input",{staticClass:"el-textarea",attrs:{type:"textarea",rows:4},model:{value:e.form.selfDescription,callback:function(t){e.$set(e.form,"selfDescription",t)},expression:"form.selfDescription"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"课程类目选择"}},[r("el-transfer",{attrs:{data:e.categoriesValList,props:{key:"categoryId",label:"categoryName"},titles:["未选","已选"]},model:{value:e.form.categories,callback:function(t){e.$set(e.form,"categories",t)},expression:"form.categories"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",loading:e.videoLoading},on:{click:function(t){return e.onSubmit("submitForm")}}},[e._v("提交")]),e._v(" "),r("span",{directives:[{name:"show",rawName:"v-show",value:e.videoLoading,expression:"videoLoading"}],staticClass:"el-form-item__error"},[e._v("请等待视频上传完成！")])],1)],1),e._v(" "),r("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("img",{attrs:{width:"100%",src:e.previewImg,alt:""}})])],1)},n=[],o=(r("7f7f"),r("ac4d"),r("8a81"),r("ac6a"),r("39bb")),s=r("b775");function a(e){var t=e.province,r=e.city,i=e.district,n=1,o=n+"/";return t&&(n=2,o=n+"/"+t+"/"),t&&r&&(n=3,o=n+"/"+r+"/"),t&&r&&i&&(n=4,o=n+"/"+i),s["a"].get("web/ChinaCity/"+o)}var c=r("e06a"),u=r("66da"),l={name:"SubbranchDetail",data:function(){return{form:{name:"",businessAddress:"",businessAddressSystem:"",businessHours:"",contactName:"",contactPhone:"",covers:[],curriculumAmount:"",establishmentDate:"",introduce:"",qualifications:[],selfDescription:"",studentAmount:"",teacherAmount:"",categories:[],provinceCode:"",provinceName:"",cityCode:"",cityName:"",districtCode:"",districtName:"",streetCode:"",streetName:"",videoInfo:{videoCoverUrl:"",videoUrl:""}},videoLoading:!1,categoriesValList:[],rules:{name:[{required:!0,message:"请填写店铺名称",trigger:"blur"}],businessHours:[{required:!0,message:"请选择营业时间",trigger:"blur"}],curriculumAmount:[{required:!0,message:"请输入课程数",trigger:"blur"}],establishmentDate:[{required:!0,message:"请输入成立时间",trigger:"blur"}],introduce:[{required:!0,message:"请输入简介",trigger:"blur"}],selfDescription:[{required:!0,message:"请输入自我描述",trigger:"blur"}],studentAmount:[{required:!0,message:"请输入学员数",trigger:"blur"}],teacherAmount:[{required:!0,message:"请输入教员数",trigger:"blur"}],provinceCode:[{required:!0,message:"请选择区域",trigger:"blur"}],cityCode:[{required:!0,message:"请选择区域",trigger:"blur"}],districtCode:[{required:!0,message:"请选择区域",trigger:"blur"}],businessAddress:[{required:!0,message:"请填写地址",trigger:"blur"}]},CoverImgList:[],imgList:[],videoList:[],uploadUrl:o["c"],videoUrl:o["d"],catelogArr:[],courseSeverArr:[],previewImg:"",dialogVisible:!1,chinaCity:{province:"",city:"",district:""},cityList:{province:[],city:[],district:[],street:[]},isAdd:!0}},created:function(){var e=this.$route.query.id;e&&(this.getView(e),this.isAdd=!1),this.getCityList(),this.getCategoriesValList()},methods:{getView:function(e){var t=this,r={id:e};Object(c["f"])(r).then((function(e){if(e.code)return e.message&&t.$warn(e.message);if(e.data){for(var r in t.form=JSON.parse(JSON.stringify(e.data)),t.form.categories=[],e.data.categories.forEach((function(e){t.form.categories.push(e.categoryId)})),e.data.covers.forEach((function(e){t.CoverImgList.push({url:e})})),e.data.qualifications.forEach((function(e){t.imgList.push({url:e})})),t.form.districtCode=e.data.areaCode,t.getCityList(),t.chinaCity)t.chinaCity[r]=t.form[r+"Code"],t.getCityList();t.form.videoInfo.videoUrl&&t.videoList.push({name:"店铺视频",url:t.form.videoInfo.videoUrl})}}))},getCategoriesValList:function(){var e=this;Object(u["c"])().then((function(t){if(t.code)return t.message&&e.$warn(t.message);t.data&&(e.categoriesValList=t.data)}))},getCityList:function(){var e=this;a(this.chinaCity).then((function(t){if(t.code)return t.message&&e.$warn(t.message);if(t.data){var r=t.data,i=r[0].level;if(e.cityList[i]=r,e.form[i+"Code"]){var n=!0,o=!1,s=void 0;try{for(var a,c=r[Symbol.iterator]();!(n=(a=c.next()).done);n=!0){var u=a.value;if(e.form[i+"Code"]===u.adcode){if("street"===i)return;return void(e.form[i+"Name"]=u.name)}}}catch(l){o=!0,s=l}finally{try{n||null==c.return||c.return()}finally{if(o)throw s}}}}})).catch((function(e){console.log(e)}))},getSonList:function(e){switch(e){case"province":this.form.cityCode="",this.form.cityName="",this.chinaCity.province="",this.chinaCity.city="",this.cityList.city=[];case"city":this.form.districtCode="",this.form.districtName="",this.chinaCity.district="",this.cityList.district=[];case"district":this.form.streetCode="",this.form.streetName="",this.cityList.street=[];break;default:break}var t=this.form[e+"Name"],r=!0,i=!1,n=void 0;try{for(var o,s=this.cityList[e][Symbol.iterator]();!(r=(o=s.next()).done);r=!0){var a=o.value;if(a.name===t){this.form[e+"Code"]=a.adcode,this.chinaCity[e]=a.adcode;break}}}catch(c){i=!0,n=c}finally{try{r||null==s.return||s.return()}finally{if(i)throw n}}"street"!==e&&this.getCityList()},handleRemove:function(e,t){if("success"!==e.status)return this.$warn("删除失败");if(e.url){var r=this.form.qualifications.indexOf(e.url);this.form.qualifications.splice(r,1)}},handleCoversRemove:function(e,t){if("success"!==e.status)return this.$warn("删除失败");if(e.url){var r=this.form.covers.indexOf(e.url);this.form.covers.splice(r,1)}},handlePicturePreview:function(e){this.previewImg=e.url,this.dialogVisible=!0},handlePicctureSuccess:function(e,t){if(e.code)return e.message&&this.$warn(e.message);e.data&&this.form.qualifications.push(e.data)},handlePicctureCoversSuccess:function(e,t){if(e.code)return e.message&&this.$warn(e.message);e.data&&this.form.covers.push(e.data)},handleVideoSuccess:function(e,t){if(this.videoLoading=!1,e.code)return e.message&&this.$warn(e.message);this.$success("视频上传成功！！！"),this.form.videoInfo.videoCoverUrl=e.data.videoBase.coverURL,this.form.videoInfo.videoUrl=e.data.playInfoList[0].playURL},handleVideoRemove:function(){this.videoLoading=!1,this.form.videoInfo.videoCoverUrl="",this.form.videoInfo.videoUrl=""},showMock:function(){this.videoLoading=!0},onSubmit:function(e){var t=this,r=this.isAdd?c["a"]:c["c"];this.$refs[e].validate((function(e){if(e){var i=t.form;if(i.businessAddressSystem=i.provinceName+i.cityName+i.districtName+i.streetName+i.businessAddress,i.areaCode=i.districtCode,!t.form.covers.length&&!t.form.videoInfo.videoUrl)return t.$warn("店铺视频或店铺封面必须上传其中之一！！！");t.isAdd||(i.storeId=t.$route.query.id),r(i).then((function(e){if(e.code)return e.message&&t.$warn(e.message);t.$success(e.message),t.$router.push({name:"Subbranch"})}))}}))}}},f=l,m=(r("a09b"),r("2877")),d=Object(m["a"])(f,i,n,!1,null,"62c85e58",null);t["default"]=d.exports},"5bdc":function(e,t,r){},"66da":function(e,t,r){"use strict";r.d(t,"f",(function(){return n})),r.d(t,"c",(function(){return u})),r.d(t,"d",(function(){return o})),r.d(t,"e",(function(){return s})),r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return c}));var i=r("b775");function n(){return i["a"].get("boss/business/category")}function o(){return i["a"].get("boss/business/boss/levelOne")}function s(e){var t=e.id;return i["a"].get("boss/business/boss/levelTwo/"+t)}function a(e){var t=e.id;return i["a"].post("boss/business/category/"+t)}function c(e){var t=e.id;return i["a"].delete("boss/business/category/"+t)}function u(){return i["a"].get("boss/business/boss/category4Business")}},"67ab":function(e,t,r){var i=r("ca5a")("meta"),n=r("d3f4"),o=r("69a8"),s=r("86cc").f,a=0,c=Object.isExtensible||function(){return!0},u=!r("79e5")((function(){return c(Object.preventExtensions({}))})),l=function(e){s(e,i,{value:{i:"O"+ ++a,w:{}}})},f=function(e,t){if(!n(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!o(e,i)){if(!c(e))return"F";if(!t)return"E";l(e)}return e[i].i},m=function(e,t){if(!o(e,i)){if(!c(e))return!0;if(!t)return!1;l(e)}return e[i].w},d=function(e){return u&&v.NEED&&c(e)&&!o(e,i)&&l(e),e},v=e.exports={KEY:i,NEED:!1,fastKey:f,getWeak:m,onFreeze:d}},"7bbc":function(e,t,r){var i=r("6821"),n=r("9093").f,o={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(e){try{return n(e)}catch(t){return s.slice()}};e.exports.f=function(e){return s&&"[object Window]"==o.call(e)?a(e):n(i(e))}},"8a81":function(e,t,r){"use strict";var i=r("7726"),n=r("69a8"),o=r("9e1e"),s=r("5ca1"),a=r("2aba"),c=r("67ab").KEY,u=r("79e5"),l=r("5537"),f=r("7f20"),m=r("ca5a"),d=r("2b4c"),v=r("37c8"),b=r("3a72"),p=r("d4c0"),h=r("1169"),g=r("cb7c"),y=r("d3f4"),w=r("4bf8"),C=r("6821"),S=r("6a99"),N=r("4630"),L=r("2aeb"),A=r("7bbc"),_=r("11e9"),k=r("2621"),x=r("86cc"),O=r("0d58"),$=_.f,P=x.f,I=A.f,q=i.Symbol,E=i.JSON,j=E&&E.stringify,D="prototype",U=d("_hidden"),V=d("toPrimitive"),F={}.propertyIsEnumerable,J=l("symbol-registry"),R=l("symbols"),H=l("op-symbols"),M=Object[D],T="function"==typeof q&&!!k.f,z=i.QObject,K=!z||!z[D]||!z[D].findChild,W=o&&u((function(){return 7!=L(P({},"a",{get:function(){return P(this,"a",{value:7}).a}})).a}))?function(e,t,r){var i=$(M,t);i&&delete M[t],P(e,t,r),i&&e!==M&&P(M,t,i)}:P,B=function(e){var t=R[e]=L(q[D]);return t._k=e,t},Y=T&&"symbol"==typeof q.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof q},G=function(e,t,r){return e===M&&G(H,t,r),g(e),t=S(t,!0),g(r),n(R,t)?(r.enumerable?(n(e,U)&&e[U][t]&&(e[U][t]=!1),r=L(r,{enumerable:N(0,!1)})):(n(e,U)||P(e,U,N(1,{})),e[U][t]=!0),W(e,t,r)):P(e,t,r)},Q=function(e,t){g(e);var r,i=p(t=C(t)),n=0,o=i.length;while(o>n)G(e,r=i[n++],t[r]);return e},X=function(e,t){return void 0===t?L(e):Q(L(e),t)},Z=function(e){var t=F.call(this,e=S(e,!0));return!(this===M&&n(R,e)&&!n(H,e))&&(!(t||!n(this,e)||!n(R,e)||n(this,U)&&this[U][e])||t)},ee=function(e,t){if(e=C(e),t=S(t,!0),e!==M||!n(R,t)||n(H,t)){var r=$(e,t);return!r||!n(R,t)||n(e,U)&&e[U][t]||(r.enumerable=!0),r}},te=function(e){var t,r=I(C(e)),i=[],o=0;while(r.length>o)n(R,t=r[o++])||t==U||t==c||i.push(t);return i},re=function(e){var t,r=e===M,i=I(r?H:C(e)),o=[],s=0;while(i.length>s)!n(R,t=i[s++])||r&&!n(M,t)||o.push(R[t]);return o};T||(q=function(){if(this instanceof q)throw TypeError("Symbol is not a constructor!");var e=m(arguments.length>0?arguments[0]:void 0),t=function(r){this===M&&t.call(H,r),n(this,U)&&n(this[U],e)&&(this[U][e]=!1),W(this,e,N(1,r))};return o&&K&&W(M,e,{configurable:!0,set:t}),B(e)},a(q[D],"toString",(function(){return this._k})),_.f=ee,x.f=G,r("9093").f=A.f=te,r("52a7").f=Z,k.f=re,o&&!r("2d00")&&a(M,"propertyIsEnumerable",Z,!0),v.f=function(e){return B(d(e))}),s(s.G+s.W+s.F*!T,{Symbol:q});for(var ie="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ne=0;ie.length>ne;)d(ie[ne++]);for(var oe=O(d.store),se=0;oe.length>se;)b(oe[se++]);s(s.S+s.F*!T,"Symbol",{for:function(e){return n(J,e+="")?J[e]:J[e]=q(e)},keyFor:function(e){if(!Y(e))throw TypeError(e+" is not a symbol!");for(var t in J)if(J[t]===e)return t},useSetter:function(){K=!0},useSimple:function(){K=!1}}),s(s.S+s.F*!T,"Object",{create:X,defineProperty:G,defineProperties:Q,getOwnPropertyDescriptor:ee,getOwnPropertyNames:te,getOwnPropertySymbols:re});var ae=u((function(){k.f(1)}));s(s.S+s.F*ae,"Object",{getOwnPropertySymbols:function(e){return k.f(w(e))}}),E&&s(s.S+s.F*(!T||u((function(){var e=q();return"[null]"!=j([e])||"{}"!=j({a:e})||"{}"!=j(Object(e))}))),"JSON",{stringify:function(e){var t,r,i=[e],n=1;while(arguments.length>n)i.push(arguments[n++]);if(r=t=i[1],(y(t)||void 0!==e)&&!Y(e))return h(t)||(t=function(e,t){if("function"==typeof r&&(t=r.call(this,e,t)),!Y(t))return t}),i[1]=t,j.apply(E,i)}}),q[D][V]||r("32e9")(q[D],V,q[D].valueOf),f(q,"Symbol"),f(Math,"Math",!0),f(i.JSON,"JSON",!0)},9093:function(e,t,r){var i=r("ce10"),n=r("e11e").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return i(e,n)}},a09b:function(e,t,r){"use strict";var i=r("5bdc"),n=r.n(i);n.a},ac4d:function(e,t,r){r("3a72")("asyncIterator")},d4c0:function(e,t,r){var i=r("0d58"),n=r("2621"),o=r("52a7");e.exports=function(e){var t=i(e),r=n.f;if(r){var s,a=r(e),c=o.f,u=0;while(a.length>u)c.call(e,s=a[u++])&&t.push(s)}return t}},e06a:function(e,t,r){"use strict";r.d(t,"e",(function(){return n})),r.d(t,"a",(function(){return o})),r.d(t,"g",(function(){return c})),r.d(t,"f",(function(){return s})),r.d(t,"c",(function(){return a})),r.d(t,"b",(function(){return u})),r.d(t,"d",(function(){return l}));var i=r("b775");function n(e){return i["a"].get("boss/business/home",e)}function o(e){return i["a"].post("boss/business/store",e)}function s(e){var t=e.id;return i["a"].get("boss/business/store/"+t)}function a(e){return i["a"].patch("boss/business/store",e)}function c(e){var t=e.pageNum,r=e.pageSize,n=e.status,o=void 0===n?0:n;return i["a"].get("boss/business/store/"+t+"/"+r+"/"+o)}function u(e){return i["a"].post("boss/business/storeAdmin",e)}function l(e){var t=e.id,r=e.status;return i["a"].patch("boss/business/store/"+t+"/"+r)}}}]);