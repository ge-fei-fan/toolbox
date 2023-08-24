"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});var d=require("electron"),U=require("path"),Ir=require("child_process"),Rr=require("fs"),Tr=require("os");function ke(a){return a&&typeof a=="object"&&"default"in a?a:{default:a}}var Ie=ke(U),Sr=ke(Tr),ye={exports:{}};(function(a,n){n=a.exports=p;var u;typeof process=="object"&&process.env&&{}.NODE_DEBUG&&/\bsemver\b/i.test({}.NODE_DEBUG)?u=function(){var e=Array.prototype.slice.call(arguments,0);e.unshift("SEMVER"),console.log.apply(console,e)}:u=function(){},n.SEMVER_SPEC_VERSION="2.0.0";var f=256,y=Number.MAX_SAFE_INTEGER||9007199254740991,I=16,E=n.re=[],i=n.src=[],h=0,j=h++;i[j]="0|[1-9]\\d*";var L=h++;i[L]="[0-9]+";var te=h++;i[te]="\\d*[a-zA-Z-][a-zA-Z0-9-]*";var Re=h++;i[Re]="("+i[j]+")\\.("+i[j]+")\\.("+i[j]+")";var Te=h++;i[Te]="("+i[L]+")\\.("+i[L]+")\\.("+i[L]+")";var ne=h++;i[ne]="(?:"+i[j]+"|"+i[te]+")";var ie=h++;i[ie]="(?:"+i[L]+"|"+i[te]+")";var se=h++;i[se]="(?:-("+i[ne]+"(?:\\."+i[ne]+")*))";var ae=h++;i[ae]="(?:-?("+i[ie]+"(?:\\."+i[ie]+")*))";var oe=h++;i[oe]="[0-9A-Za-z-]+";var x=h++;i[x]="(?:\\+("+i[oe]+"(?:\\."+i[oe]+")*))";var ue=h++,Se="v?"+i[Re]+i[se]+"?"+i[x]+"?";i[ue]="^"+Se+"$";var le="[v=\\s]*"+i[Te]+i[ae]+"?"+i[x]+"?",ce=h++;i[ce]="^"+le+"$";var _=h++;i[_]="((?:<|>)?=?)";var H=h++;i[H]=i[L]+"|x|X|\\*";var M=h++;i[M]=i[j]+"|x|X|\\*";var D=h++;i[D]="[v=\\s]*("+i[M]+")(?:\\.("+i[M]+")(?:\\.("+i[M]+")(?:"+i[se]+")?"+i[x]+"?)?)?";var k=h++;i[k]="[v=\\s]*("+i[H]+")(?:\\.("+i[H]+")(?:\\.("+i[H]+")(?:"+i[ae]+")?"+i[x]+"?)?)?";var Ae=h++;i[Ae]="^"+i[_]+"\\s*"+i[D]+"$";var Ce=h++;i[Ce]="^"+i[_]+"\\s*"+i[k]+"$";var Fe=h++;i[Fe]="(?:^|[^\\d])(\\d{1,"+I+"})(?:\\.(\\d{1,"+I+"}))?(?:\\.(\\d{1,"+I+"}))?(?:$|[^\\d])";var Y=h++;i[Y]="(?:~>?)";var Z=h++;i[Z]="(\\s*)"+i[Y]+"\\s+",E[Z]=new RegExp(i[Z],"g");var Ue="$1~",$e=h++;i[$e]="^"+i[Y]+i[D]+"$";var be=h++;i[be]="^"+i[Y]+i[k]+"$";var J=h++;i[J]="(?:\\^)";var K=h++;i[K]="(\\s*)"+i[J]+"\\s+",E[K]=new RegExp(i[K],"g");var xe="$1^",Oe=h++;i[Oe]="^"+i[J]+i[D]+"$";var De=h++;i[De]="^"+i[J]+i[k]+"$";var fe=h++;i[fe]="^"+i[_]+"\\s*("+le+")$|^$";var he=h++;i[he]="^"+i[_]+"\\s*("+Se+")$|^$";var X=h++;i[X]="(\\s*)"+i[_]+"\\s*("+le+"|"+i[D]+")",E[X]=new RegExp(i[X],"g");var Xe="$1$2$3",Ne=h++;i[Ne]="^\\s*("+i[D]+")\\s+-\\s+("+i[D]+")\\s*$";var Be=h++;i[Be]="^\\s*("+i[k]+")\\s+-\\s+("+i[k]+")\\s*$";var Pe=h++;i[Pe]="(<|>)?=?\\s*\\*";for(var N=0;N<h;N++)u(N,i[N]),E[N]||(E[N]=new RegExp(i[N]));n.parse=B;function B(e,r){if((!r||typeof r!="object")&&(r={loose:!!r,includePrerelease:!1}),e instanceof p)return e;if(typeof e!="string"||e.length>f)return null;var t=r.loose?E[ce]:E[ue];if(!t.test(e))return null;try{return new p(e,r)}catch{return null}}n.valid=Ge;function Ge(e,r){var t=B(e,r);return t?t.version:null}n.clean=ze;function ze(e,r){var t=B(e.trim().replace(/^[=v]+/,""),r);return t?t.version:null}n.SemVer=p;function p(e,r){if((!r||typeof r!="object")&&(r={loose:!!r,includePrerelease:!1}),e instanceof p){if(e.loose===r.loose)return e;e=e.version}else if(typeof e!="string")throw new TypeError("Invalid Version: "+e);if(e.length>f)throw new TypeError("version is longer than "+f+" characters");if(!(this instanceof p))return new p(e,r);u("SemVer",e,r),this.options=r,this.loose=!!r.loose;var t=e.trim().match(r.loose?E[ce]:E[ue]);if(!t)throw new TypeError("Invalid Version: "+e);if(this.raw=e,this.major=+t[1],this.minor=+t[2],this.patch=+t[3],this.major>y||this.major<0)throw new TypeError("Invalid major version");if(this.minor>y||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>y||this.patch<0)throw new TypeError("Invalid patch version");t[4]?this.prerelease=t[4].split(".").map(function(s){if(/^[0-9]+$/.test(s)){var o=+s;if(o>=0&&o<y)return o}return s}):this.prerelease=[],this.build=t[5]?t[5].split("."):[],this.format()}p.prototype.format=function(){return this.version=this.major+"."+this.minor+"."+this.patch,this.prerelease.length&&(this.version+="-"+this.prerelease.join(".")),this.version},p.prototype.toString=function(){return this.version},p.prototype.compare=function(e){return u("SemVer.compare",this.version,this.options,e),e instanceof p||(e=new p(e,this.options)),this.compareMain(e)||this.comparePre(e)},p.prototype.compareMain=function(e){return e instanceof p||(e=new p(e,this.options)),V(this.major,e.major)||V(this.minor,e.minor)||V(this.patch,e.patch)},p.prototype.comparePre=function(e){if(e instanceof p||(e=new p(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;var r=0;do{var t=this.prerelease[r],s=e.prerelease[r];if(u("prerelease compare",r,t,s),t===void 0&&s===void 0)return 0;if(s===void 0)return 1;if(t===void 0)return-1;if(t===s)continue;return V(t,s)}while(++r)},p.prototype.inc=function(e,r){switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",r);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",r);break;case"prepatch":this.prerelease.length=0,this.inc("patch",r),this.inc("pre",r);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",r),this.inc("pre",r);break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":if(this.prerelease.length===0)this.prerelease=[0];else{for(var t=this.prerelease.length;--t>=0;)typeof this.prerelease[t]=="number"&&(this.prerelease[t]++,t=-2);t===-1&&this.prerelease.push(0)}r&&(this.prerelease[0]===r?isNaN(this.prerelease[1])&&(this.prerelease=[r,0]):this.prerelease=[r,0]);break;default:throw new Error("invalid increment argument: "+e)}return this.format(),this.raw=this.version,this},n.inc=He;function He(e,r,t,s){typeof t=="string"&&(s=t,t=void 0);try{return new p(e,t).inc(r,s).version}catch{return null}}n.diff=Me;function Me(e,r){if(pe(e,r))return null;var t=B(e),s=B(r),o="";if(t.prerelease.length||s.prerelease.length){o="pre";var l="prerelease"}for(var c in t)if((c==="major"||c==="minor"||c==="patch")&&t[c]!==s[c])return o+c;return l}n.compareIdentifiers=V;var je=/^[0-9]+$/;function V(e,r){var t=je.test(e),s=je.test(r);return t&&s&&(e=+e,r=+r),e===r?0:t&&!s?-1:s&&!t?1:e<r?-1:1}n.rcompareIdentifiers=Ye;function Ye(e,r){return V(r,e)}n.major=Ze;function Ze(e,r){return new p(e,r).major}n.minor=Je;function Je(e,r){return new p(e,r).minor}n.patch=Ke;function Ke(e,r){return new p(e,r).patch}n.compare=b;function b(e,r,t){return new p(e,t).compare(new p(r,t))}n.compareLoose=Qe;function Qe(e,r){return b(e,r,!0)}n.rcompare=We;function We(e,r,t){return b(r,e,t)}n.sort=qe;function qe(e,r){return e.sort(function(t,s){return n.compare(t,s,r)})}n.rsort=er;function er(e,r){return e.sort(function(t,s){return n.rcompare(t,s,r)})}n.gt=G;function G(e,r,t){return b(e,r,t)>0}n.lt=Q;function Q(e,r,t){return b(e,r,t)<0}n.eq=pe;function pe(e,r,t){return b(e,r,t)===0}n.neq=Le;function Le(e,r,t){return b(e,r,t)!==0}n.gte=we;function we(e,r,t){return b(e,r,t)>=0}n.lte=ve;function ve(e,r,t){return b(e,r,t)<=0}n.cmp=W;function W(e,r,t,s){switch(r){case"===":return typeof e=="object"&&(e=e.version),typeof t=="object"&&(t=t.version),e===t;case"!==":return typeof e=="object"&&(e=e.version),typeof t=="object"&&(t=t.version),e!==t;case"":case"=":case"==":return pe(e,t,s);case"!=":return Le(e,t,s);case">":return G(e,t,s);case">=":return we(e,t,s);case"<":return Q(e,t,s);case"<=":return ve(e,t,s);default:throw new TypeError("Invalid operator: "+r)}}n.Comparator=S;function S(e,r){if((!r||typeof r!="object")&&(r={loose:!!r,includePrerelease:!1}),e instanceof S){if(e.loose===!!r.loose)return e;e=e.value}if(!(this instanceof S))return new S(e,r);u("comparator",e,r),this.options=r,this.loose=!!r.loose,this.parse(e),this.semver===z?this.value="":this.value=this.operator+this.semver.version,u("comp",this)}var z={};S.prototype.parse=function(e){var r=this.options.loose?E[fe]:E[he],t=e.match(r);if(!t)throw new TypeError("Invalid comparator: "+e);this.operator=t[1],this.operator==="="&&(this.operator=""),t[2]?this.semver=new p(t[2],this.options.loose):this.semver=z},S.prototype.toString=function(){return this.value},S.prototype.test=function(e){return u("Comparator.test",e,this.options.loose),this.semver===z?!0:(typeof e=="string"&&(e=new p(e,this.options)),W(e,this.operator,this.semver,this.options))},S.prototype.intersects=function(e,r){if(!(e instanceof S))throw new TypeError("a Comparator is required");(!r||typeof r!="object")&&(r={loose:!!r,includePrerelease:!1});var t;if(this.operator==="")return t=new g(e.value,r),q(this.value,t,r);if(e.operator==="")return t=new g(this.value,r),q(e.semver,t,r);var s=(this.operator===">="||this.operator===">")&&(e.operator===">="||e.operator===">"),o=(this.operator==="<="||this.operator==="<")&&(e.operator==="<="||e.operator==="<"),l=this.semver.version===e.semver.version,c=(this.operator===">="||this.operator==="<=")&&(e.operator===">="||e.operator==="<="),v=W(this.semver,"<",e.semver,r)&&(this.operator===">="||this.operator===">")&&(e.operator==="<="||e.operator==="<"),w=W(this.semver,">",e.semver,r)&&(this.operator==="<="||this.operator==="<")&&(e.operator===">="||e.operator===">");return s||o||l&&c||v||w},n.Range=g;function g(e,r){if((!r||typeof r!="object")&&(r={loose:!!r,includePrerelease:!1}),e instanceof g)return e.loose===!!r.loose&&e.includePrerelease===!!r.includePrerelease?e:new g(e.raw,r);if(e instanceof S)return new g(e.value,r);if(!(this instanceof g))return new g(e,r);if(this.options=r,this.loose=!!r.loose,this.includePrerelease=!!r.includePrerelease,this.raw=e,this.set=e.split(/\s*\|\|\s*/).map(function(t){return this.parseRange(t.trim())},this).filter(function(t){return t.length}),!this.set.length)throw new TypeError("Invalid SemVer Range: "+e);this.format()}g.prototype.format=function(){return this.range=this.set.map(function(e){return e.join(" ").trim()}).join("||").trim(),this.range},g.prototype.toString=function(){return this.range},g.prototype.parseRange=function(e){var r=this.options.loose;e=e.trim();var t=r?E[Be]:E[Ne];e=e.replace(t,cr),u("hyphen replace",e),e=e.replace(E[X],Xe),u("comparator trim",e,E[X]),e=e.replace(E[Z],Ue),e=e.replace(E[K],xe),e=e.split(/\s+/).join(" ");var s=r?E[fe]:E[he],o=e.split(" ").map(function(l){return tr(l,this.options)},this).join(" ").split(/\s+/);return this.options.loose&&(o=o.filter(function(l){return!!l.match(s)})),o=o.map(function(l){return new S(l,this.options)},this),o},g.prototype.intersects=function(e,r){if(!(e instanceof g))throw new TypeError("a Range is required");return this.set.some(function(t){return t.every(function(s){return e.set.some(function(o){return o.every(function(l){return s.intersects(l,r)})})})})},n.toComparators=rr;function rr(e,r){return new g(e,r).set.map(function(t){return t.map(function(s){return s.value}).join(" ").trim().split(" ")})}function tr(e,r){return u("comp",e,r),e=sr(e,r),u("caret",e),e=nr(e,r),u("tildes",e),e=or(e,r),u("xrange",e),e=lr(e,r),u("stars",e),e}function R(e){return!e||e.toLowerCase()==="x"||e==="*"}function nr(e,r){return e.trim().split(/\s+/).map(function(t){return ir(t,r)}).join(" ")}function ir(e,r){var t=r.loose?E[be]:E[$e];return e.replace(t,function(s,o,l,c,v){u("tilde",e,s,o,l,c,v);var w;return R(o)?w="":R(l)?w=">="+o+".0.0 <"+(+o+1)+".0.0":R(c)?w=">="+o+"."+l+".0 <"+o+"."+(+l+1)+".0":v?(u("replaceTilde pr",v),w=">="+o+"."+l+"."+c+"-"+v+" <"+o+"."+(+l+1)+".0"):w=">="+o+"."+l+"."+c+" <"+o+"."+(+l+1)+".0",u("tilde return",w),w})}function sr(e,r){return e.trim().split(/\s+/).map(function(t){return ar(t,r)}).join(" ")}function ar(e,r){u("caret",e,r);var t=r.loose?E[De]:E[Oe];return e.replace(t,function(s,o,l,c,v){u("caret",e,s,o,l,c,v);var w;return R(o)?w="":R(l)?w=">="+o+".0.0 <"+(+o+1)+".0.0":R(c)?o==="0"?w=">="+o+"."+l+".0 <"+o+"."+(+l+1)+".0":w=">="+o+"."+l+".0 <"+(+o+1)+".0.0":v?(u("replaceCaret pr",v),o==="0"?l==="0"?w=">="+o+"."+l+"."+c+"-"+v+" <"+o+"."+l+"."+(+c+1):w=">="+o+"."+l+"."+c+"-"+v+" <"+o+"."+(+l+1)+".0":w=">="+o+"."+l+"."+c+"-"+v+" <"+(+o+1)+".0.0"):(u("no pr"),o==="0"?l==="0"?w=">="+o+"."+l+"."+c+" <"+o+"."+l+"."+(+c+1):w=">="+o+"."+l+"."+c+" <"+o+"."+(+l+1)+".0":w=">="+o+"."+l+"."+c+" <"+(+o+1)+".0.0"),u("caret return",w),w})}function or(e,r){return u("replaceXRanges",e,r),e.split(/\s+/).map(function(t){return ur(t,r)}).join(" ")}function ur(e,r){e=e.trim();var t=r.loose?E[Ce]:E[Ae];return e.replace(t,function(s,o,l,c,v,w){u("xRange",e,s,o,l,c,v,w);var F=R(l),$=F||R(c),A=$||R(v),T=A;return o==="="&&T&&(o=""),F?o===">"||o==="<"?s="<0.0.0":s="*":o&&T?($&&(c=0),v=0,o===">"?(o=">=",$?(l=+l+1,c=0,v=0):(c=+c+1,v=0)):o==="<="&&(o="<",$?l=+l+1:c=+c+1),s=o+l+"."+c+"."+v):$?s=">="+l+".0.0 <"+(+l+1)+".0.0":A&&(s=">="+l+"."+c+".0 <"+l+"."+(+c+1)+".0"),u("xRange return",s),s})}function lr(e,r){return u("replaceStars",e,r),e.trim().replace(E[Pe],"")}function cr(e,r,t,s,o,l,c,v,w,F,$,A,T){return R(t)?r="":R(s)?r=">="+t+".0.0":R(o)?r=">="+t+"."+s+".0":r=">="+r,R(w)?v="":R(F)?v="<"+(+w+1)+".0.0":R($)?v="<"+w+"."+(+F+1)+".0":A?v="<="+w+"."+F+"."+$+"-"+A:v="<="+v,(r+" "+v).trim()}g.prototype.test=function(e){if(!e)return!1;typeof e=="string"&&(e=new p(e,this.options));for(var r=0;r<this.set.length;r++)if(fr(this.set[r],e,this.options))return!0;return!1};function fr(e,r,t){for(var s=0;s<e.length;s++)if(!e[s].test(r))return!1;if(r.prerelease.length&&!t.includePrerelease){for(s=0;s<e.length;s++)if(u(e[s].semver),e[s].semver!==z&&e[s].semver.prerelease.length>0){var o=e[s].semver;if(o.major===r.major&&o.minor===r.minor&&o.patch===r.patch)return!0}return!1}return!0}n.satisfies=q;function q(e,r,t){try{r=new g(r,t)}catch{return!1}return r.test(e)}n.maxSatisfying=hr;function hr(e,r,t){var s=null,o=null;try{var l=new g(r,t)}catch{return null}return e.forEach(function(c){l.test(c)&&(!s||o.compare(c)===-1)&&(s=c,o=new p(s,t))}),s}n.minSatisfying=pr;function pr(e,r,t){var s=null,o=null;try{var l=new g(r,t)}catch{return null}return e.forEach(function(c){l.test(c)&&(!s||o.compare(c)===1)&&(s=c,o=new p(s,t))}),s}n.minVersion=wr;function wr(e,r){e=new g(e,r);var t=new p("0.0.0");if(e.test(t)||(t=new p("0.0.0-0"),e.test(t)))return t;t=null;for(var s=0;s<e.set.length;++s){var o=e.set[s];o.forEach(function(l){var c=new p(l.semver.version);switch(l.operator){case">":c.prerelease.length===0?c.patch++:c.prerelease.push(0),c.raw=c.format();case"":case">=":(!t||G(t,c))&&(t=c);break;case"<":case"<=":break;default:throw new Error("Unexpected operation: "+l.operator)}})}return t&&e.test(t)?t:null}n.validRange=vr;function vr(e,r){try{return new g(e,r).range||"*"}catch{return null}}n.ltr=dr;function dr(e,r,t){return de(e,r,"<",t)}n.gtr=Er;function Er(e,r,t){return de(e,r,">",t)}n.outside=de;function de(e,r,t,s){e=new p(e,s),r=new g(r,s);var o,l,c,v,w;switch(t){case">":o=G,l=ve,c=Q,v=">",w=">=";break;case"<":o=Q,l=we,c=G,v="<",w="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(q(e,r,s))return!1;for(var F=0;F<r.set.length;++F){var $=r.set[F],A=null,T=null;if($.forEach(function(O){O.semver===z&&(O=new S(">=0.0.0")),A=A||O,T=T||O,o(O.semver,A.semver,s)?A=O:c(O.semver,T.semver,s)&&(T=O)}),A.operator===v||A.operator===w||(!T.operator||T.operator===v)&&l(e,T.semver))return!1;if(T.operator===w&&c(e,T.semver))return!1}return!0}n.prerelease=mr;function mr(e,r){var t=B(e,r);return t&&t.prerelease.length?t.prerelease:null}n.intersects=gr;function gr(e,r,t){return e=new g(e,t),r=new g(r,t),e.intersects(r)}n.coerce=yr;function yr(e){if(e instanceof p)return e;if(typeof e!="string")return null;var r=e.match(E[Fe]);return r==null?null:B(r[1]+"."+(r[2]||"0")+"."+(r[3]||"0"))}})(ye,ye.exports);const Ar=parseInt({}.ELECTRON_IS_DEV,10)===1,Cr="ELECTRON_IS_DEV"in process.env;var Fr=Cr?Ar:process.defaultApp||/node_modules[\\/]electron[\\/]/.test(process.execPath);const Ve=ye.exports,Ee=Ve.gt,me=Ve.lt,re=Sr.default.release,_e=Fr;var P={renderer:function(){return process.type==="renderer"},main:function(){return process.type==="browser"},osx:function(){return process.platform==="darwin"},macOS:function(){return this.osx()},windows:function(){return process.platform==="win32"},linux:function(){return process.platform==="linux"},x86:function(){return process.arch==="ia32"},x64:function(){return process.arch==="x64"},production:function(){return!_e},dev:function(){return _e},sandbox:function(){return"APP_SANDBOX_CONTAINER_ID"in process.env},mas:function(){return process.mas===!0},windowsStore:function(){return process.windowsStore===!0},all:function(){const a=new Array(arguments.length);for(var n=0;n<a.length;n++)a[n]=arguments[n];if(!!a.length){for(n=0;n<a.length;n++)if(!a[n]())return!1;return!0}},none:function(){const a=new Array(arguments.length);for(var n=0;n<a.length;n++)a[n]=arguments[n];if(!!a.length){for(n=0;n<a.length;n++)if(a[n]())return!1;return!0}},one:function(){const a=new Array(arguments.length);for(var n=0;n<a.length;n++)a[n]=arguments[n];if(!!a.length){for(n=0;n<a.length;n++)if(a[n]())return!0;return!1}},release:function(a){if(this.osx())return a===ge();if(this.windows()){a=a.split(".");const n=re().split(".");return a.length===2?`${n[0]}.${n[1]}`==`${a[0]}.${a[1]}`:`${n[0]}.${n[1]}.${n[2]}`==`${a[0]}.${a[1]}.${a[2]}`}else return null},gtRelease:function(a){if(this.osx())return Ee(a,ge());if(this.windows()){a=a.split(".");const n=re().split(".");return a.length===2?Ee(`${a[0]}.${a[1]}.0`,`${n[0]}.${n[1]}.0`):Ee(`${a[0]}.${a[1]}.${a[2]}`,`${n[0]}.${n[1]}.${n[2]}`)}else return null},ltRelease:function(a){if(this.osx())return me(a,ge());if(this.windows()){a=a.split(".");const n=re().split(".");return a.length===2?me(`${a[0]}.${a[1]}.0`,`${n[0]}.${n[1]}.0`):me(`${a[0]}.${a[1]}.${a[2]}`,`${n[0]}.${n[1]}.${n[2]}`)}else return null}};function ge(){const a=re().split(".");return`10.${a[0]-4}.${a[1]}`}function $r(){var u,f;const a=P.dev()?U.join(d.app.getAppPath(),"/engine/toolbox-server.exe"):U.join(d.app.getAppPath(),"..","/toolbox-server.exe");if(!Rr.existsSync(a))throw new Error(a);if(!P.dev()){const y=Ir.spawn(a,{windowsHide:!1,stdio:P.dev()?"pipe":"ignore"});P.dev()&&((u=y.stdout)==null||u.on("data",function(I){console.log("engine stdout===>",I.toString())}),(f=y.stderr)==null||f.on("data",function(I){console.log("engine stderr===>",I.toString())}))}}let m;function br(){m=new d.BrowserWindow({width:320,height:80,frame:!1,useContentSize:!0,alwaysOnTop:!0,resizable:!1,show:!1,webPreferences:{contextIsolation:!1,nodeIntegration:!0,webviewTag:!0,nodeIntegrationInWorker:!0}}),require("@electron/remote/main").enable(m.webContents),P.dev()?(m.loadURL("http://localhost:3002/#/mini/clockmini"),m.webContents.openDevTools()):m.loadFile(Ie.default.join(__dirname,"../dist/index.html")),m.setSkipTaskbar(!0);const{width:a,height:n}=d.screen.getPrimaryDisplay().workAreaSize,u=a-m.getSize()[0]-20,f=20;m.setPosition(u,f)}function Or(){d.ipcMain.on("video-MessageBox",(a,n)=>{var u;(u=exports.win)==null||u.focus(),exports.win&&d.dialog.showMessageBox(exports.win,{type:"info",title:"\u4E0B\u8F7D",noLink:!0,message:"\u68C0\u6D4B\u5230\u94FE\u63A5,\u662F\u5426\u4E0B\u8F7D",buttons:["\u53D6\u6D88","\u786E\u5B9A"]}).then(f=>{f.response===1?console.log("You click ok."):console.log("You click cancel")})}),d.ipcMain.on("setwindowsTop",(a,n)=>{var u,f;(u=exports.win)!=null&&u.isAlwaysOnTop()||(f=exports.win)==null||f.setAlwaysOnTop(!0)}),d.ipcMain.on("cancelwindowsTop",(a,n)=>{var u,f;(u=exports.win)!=null&&u.isAlwaysOnTop()&&((f=exports.win)==null||f.setAlwaysOnTop(!1))}),d.ipcMain.on("windowsShow",(a,n)=>{var u,f;(u=exports.win)!=null&&u.isVisible()?exports.win.focus():(f=exports.win)==null||f.show()}),d.ipcMain.on("window-min",(a,n)=>{var u;(u=exports.win)==null||u.minimize()}),d.ipcMain.on("window-close",(a,n)=>{var u;(u=exports.win)==null||u.close()}),d.ipcMain.on("miniwindow-open",(a,n)=>{var u;(u=exports.win)==null||u.hide(),m==null||m.show()}),d.ipcMain.on("fullWin",(a,n)=>{var u;(u=exports.win)==null||u.show(),m==null||m.hide()}),d.ipcMain.on("hideMiniWin",(a,n)=>{m==null||m.hide()}),d.ipcMain.on("exit",(a,n)=>{var u,f;(u=exports.win)==null||u.webContents.send("shutdownServer","closeServer"),m==null||m.destroy(),(f=exports.win)==null||f.destroy()}),d.ipcMain.on("win-start",a=>{const n=m.getPosition(),u=d.screen.getCursorScreenPoint();let f=u.x-n[0],y=u.y-n[1];a.returnValue=JSON.stringify({x:f,y})}),d.ipcMain.on("win-move",(a,n)=>{m==null||m.setContentSize(320,80);const u=JSON.parse(n);m.setPosition(u.x,u.y,!0)})}const{autoUpdater:C}=require("electron-updater"),ee={error:"\u68C0\u67E5\u66F4\u65B0\u51FA\u9519",checking:"\u6B63\u5728\u68C0\u67E5\u66F4\u65B0\u2026\u2026",updateAva:"\u68C0\u6D4B\u5230\u65B0\u7248\u672C\uFF0C\u6B63\u5728\u4E0B\u8F7D\u2026\u2026",updateNotAva:"\u73B0\u5728\u4F7F\u7528\u7684\u5C31\u662F\u6700\u65B0\u7248\u672C\uFF0C\u4E0D\u7528\u66F4\u65B0"};P.dev()&&(C.updateConfigPath=Ie.default.join(__dirname,"dev-app-update.yml"));function Dr(){C.disableWebInstaller=!0;const a=n=>{var u;(u=exports.win)==null||u.webContents.send("message",n)};C.autoDownload=!1,C.on("error",n=>{a(`${ee.error}:${n}`)}),C.on("checking-for-update",()=>{a(ee.checking)}),C.on("update-available",()=>{var n;(n=exports.win)==null||n.webContents.send("getVersion","\u83B7\u53D6\u5230\u66F4\u65B0"),d.dialog.showMessageBox({type:"info",title:"\u5E94\u7528\u6709\u65B0\u7684\u66F4\u65B0",message:"\u53D1\u73B0\u65B0\u7248\u672C\uFF0C\u662F\u5426\u73B0\u5728\u66F4\u65B0\uFF1F",noLink:!0,buttons:["\u662F","\u5426"]}).then(({response:u})=>{var f;u===0&&((f=exports.win)==null||f.webContents.send("checkUpdate","\u786E\u8BA4\u4E0B\u8F7D"),a(ee.updateAva),C.downloadUpdate())})}),C.on("update-not-available",()=>{a(ee.updateNotAva),d.dialog.showMessageBox({title:"\u68C0\u67E5\u66F4\u65B0",message:"\u5F53\u524D\u7248\u672C\u5DF2\u662F\u6700\u65B0\u7248\u672C,\u65E0\u9700\u66F4\u65B0"})}),C.on("download-progress",n=>{var u;(u=exports.win)==null||u.webContents.send("downloadProgress",n)}),C.on("update-downloaded",()=>{var n;(n=exports.win)==null||n.webContents.send("updateDownloaded","\u66F4\u65B0\u5DF2\u4E0B\u8F7D"),d.dialog.showMessageBox({title:"\u5B89\u88C5\u66F4\u65B0",message:"\u66F4\u65B0\u4E0B\u8F7D\u5B8C\u6BD5\uFF0C\u5E94\u7528\u5C06\u91CD\u542F\u5E76\u8FDB\u884C\u5B89\u88C5"}).then(()=>{setImmediate(()=>C.quitAndInstall())})}),d.ipcMain.on("checkForUpdate",()=>{console.log(222),C.checkForUpdates()}),d.ipcMain.on("checkAppVersion",()=>{var n;(n=exports.win)==null||n.webContents.send("version",d.app.getVersion())})}exports.win=void 0;U.join(__dirname,"../preload/index.js");const Nr=()=>{exports.win=new d.BrowserWindow({width:1024,height:768,frame:!1,useContentSize:!0,resizable:!1,webPreferences:{contextIsolation:!1,nodeIntegration:!0,webviewTag:!0,nodeIntegrationInWorker:!0}}),require("@electron/remote/main").initialize(),require("@electron/remote/main").enable(exports.win.webContents),d.app.isPackaged?exports.win.loadFile(Ie.default.join(__dirname,"../dist/index.html")):(exports.win.loadURL("http://localhost:3002/"),exports.win.webContents.openDevTools()),exports.win.setMenu(null),exports.win.on("close",f=>{var y,I;f.preventDefault(),(y=exports.win)==null||y.hide(),(I=exports.win)==null||I.setSkipTaskbar(!0)});const a=P.dev()?U.join(__dirname,"../public/icon.ico"):U.join(d.app.getAppPath(),"..","icon.ico");let n=new d.Tray(a);n.setToolTip("toolbox");const u=d.Menu.buildFromTemplate([{label:"\u663E\u793A",click:()=>{var f;(f=exports.win)==null||f.show()}},{label:"\u9000\u51FA",click:()=>{var f,y;(f=exports.win)==null||f.webContents.send("shutdownServer","closeServer"),m==null||m.destroy(),(y=exports.win)==null||y.destroy()}}]);n.setContextMenu(u),n.on("click",()=>{var f,y,I,E;(f=exports.win)!=null&&f.isVisible()?exports.win.hide():(y=exports.win)==null||y.show(),(I=exports.win)!=null&&I.isVisible()?exports.win.setSkipTaskbar(!1):(E=exports.win)==null||E.setSkipTaskbar(!0)}),exports.win.hookWindowMessage(278,function(f){var y;return(y=exports.win)==null||y.setEnabled(!1),setTimeout(()=>{var I;(I=exports.win)==null||I.setEnabled(!0)},100),!0}),Or(),Dr(),br(),Object.defineProperty(d.app,"isPackaged",{get(){return!0}})};d.app.whenReady().then(Nr);d.app.setAppUserModelId("ToolBox");$r();
