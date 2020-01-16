(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-901b6238"],{"7cd3":function(t,s,e){"use strict";var o=e("8a7b"),i=e.n(o);i.a},"8a7b":function(t,s,e){},"9ed6":function(t,s,e){"use strict";e.r(s);var o=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"login-container"},[t.isRegist?t._e():e("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,"auto-complete":"on","label-position":"left"}},[e("div",{staticClass:"title-container"},[e("h3",{staticClass:"title"},[t._v("登录")])]),t._v(" "),e("el-form-item",{attrs:{prop:"username"}},[e("el-input",{attrs:{placeholder:"请输入用户名",type:"text",tabindex:"1","auto-complete":"on"},on:{input:t.hideError},model:{value:t.loginForm.username,callback:function(s){t.$set(t.loginForm,"username",s)},expression:"loginForm.username"}})],1),t._v(" "),e("el-form-item",{attrs:{prop:"password"}},[e("el-input",{attrs:{placeholder:"请输入密码",type:"password",tabindex:"2","auto-complete":"on"},on:{input:t.hideError},model:{value:t.loginForm.password,callback:function(s){t.$set(t.loginForm,"password",s)},expression:"loginForm.password"}})],1),t._v(" "),e("el-alert",{directives:[{name:"show",rawName:"v-show",value:t.isError,expression:"isError"}],attrs:{type:"error","show-icon":"",closable:!1,title:t.errorText}}),t._v(" "),e("el-button",{staticClass:"btn",attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(s){return s.preventDefault(),t.onCode(s)}}},[t._v("登录")]),t._v(" "),e("div",{staticClass:"tips"},[e("p",{},[t._v("\n        没有账号\n        "),e("span",{on:{click:t.switchForm}},[t._v("立即注册")])])])],1),t._v(" "),t.isRegist?e("el-form",{ref:"registForm",staticClass:"login-form",attrs:{model:t.registForm}},[e("div",{staticClass:"title-container"},[e("h3",{staticClass:"title"},[t._v("注册")])]),t._v(" "),e("el-form-item",[e("el-input",{attrs:{placeholder:"输入用户名"},on:{input:t.hideError},model:{value:t.registForm.username,callback:function(s){t.$set(t.registForm,"username",s)},expression:"registForm.username"}})],1),t._v(" "),e("el-form-item",[e("el-input",{attrs:{placeholder:"输入密码",type:"password"},on:{input:t.hideError},model:{value:t.registForm.password,callback:function(s){t.$set(t.registForm,"password",s)},expression:"registForm.password"}})],1),t._v(" "),e("el-form-item",[e("el-input",{attrs:{placeholder:"重复密码",type:"password"},on:{input:t.hideError},model:{value:t.registForm.password2,callback:function(s){t.$set(t.registForm,"password2",s)},expression:"registForm.password2"}})],1),t._v(" "),e("el-alert",{directives:[{name:"show",rawName:"v-show",value:t.isError,expression:"isError"}],attrs:{type:"error","show-icon":"",closable:!1,title:t.errorText}}),t._v(" "),e("el-button",{staticClass:"btn",attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(s){return s.preventDefault(),t.onCode(s)}}},[t._v("立即注册")]),t._v(" "),e("div",{staticClass:"tips"},[e("p",{},[t._v("\n        已有账号\n        "),e("span",{on:{click:t.switchForm}},[t._v("立即登录")])])])],1):t._e(),t._v(" "),t._m(0),t._v(" "),e("el-dialog",{staticClass:"validcode-dialog",attrs:{visible:t.isShowDialog,width:"392px",top:"334px","custom-class":"validcode-custom"},on:{"update:visible":function(s){t.isShowDialog=s},closed:t.closedCode}},[e("div",{attrs:{slot:"title"},slot:"title"},[e("h5",{staticClass:"validcode-title"},[t._v("请在下方输入图片验证码")])]),t._v(" "),e("div",{staticClass:"validcode"},[e("el-form",{staticClass:"validcode-input"},[e("el-form-item",[e("el-input",{model:{value:t.validCodeForm.code,callback:function(s){t.$set(t.validCodeForm,"code",s)},expression:"validCodeForm.code"}})],1)],1),t._v(" "),e("img",{staticClass:"validcode-img",attrs:{src:t.validCodeForm.img,alt:""},on:{click:t.getValidCodeImg}})],1),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:t.codeClick}},[t._v("确 定")])],1)])],1)},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"logo-wraper"},[e("div",{staticClass:"logo"},[e("img",{staticClass:"logo-img",attrs:{src:"",alt:""}})]),t._v(" "),e("div",{staticClass:"logo-text"},[t._v("蓝青教育商户端")])])}],r=(e("a481"),e("c24f")),a={name:"Login",data:function(){return{loginForm:{code:"",username:"",password:""},loading:!1,isRegist:!1,registForm:{code:"",username:"",password:"",password2:""},validCodeForm:{code:"",img:""},isShowDialog:!1,isError:!1,errorText:""}},methods:{switchForm:function(){this.isRegist=!this.isRegist},onCode:function(){var t=this.isRegist?this.registForm:this.loginForm;return t.username?t.password2&&t.password!==t.password2?this.showError("两遍密码不一致"):(this.isShowDialog=!0,void this.getValidCodeImg()):this.showError("请输入用户名")},codeClick:function(){this.validCodeForm.code?(this.isRegist?this.registForm.code=this.validCodeForm.code:this.loginForm.code=this.validCodeForm.code,this.isShowDialog=!1,this.isRegist?this.registerPost():this.onLogin()):this.$warn("请输入验证码！！！")},closedCode:function(){this.validCodeForm.code=""},registerPost:function(){var t=this,s=this.registForm,e={code:s.code,password:s.password,userName:s.username};Object(r["e"])(e).then((function(s){if(s.code)return s.message&&t.$warn(s.message);t.$success(s.message)}))},getValidCodeImg:function(){var t=this,s=this.isRegist?this.registForm:this.loginForm,e=s.username;e&&Object(r["b"])(e).then((function(s){if(s.code)return t.validCodeForm.code="",s.message&&t.$warn(s.message);t.validCodeForm.img=s.data}))},onLogin:function(){var t=this,s=this.loginForm;if(!this.validCodeForm.code)return this.isShowDialog=!0,this.getValidCodeImg();this.loading=!0,this.$store.dispatch("user/login",s).then((function(s){t.loading=!1,t.$success(s.message),s.data&&"store"!==s.data?t.$router.replace({path:"/business"}):t.$router.replace({path:"/shop"})})).catch((function(){t.loading=!1}))},showError:function(t){this.errorText=t,this.isError=!0},hideError:function(){this.errorText="",this.isError=!1}}},l=a,n=(e("7cd3"),e("2877")),c=Object(n["a"])(l,o,i,!1,null,"7ce82c98",null);s["default"]=c.exports}}]);