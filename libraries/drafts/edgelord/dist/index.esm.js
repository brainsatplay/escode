var E="default";var f={start:"esConnected",stop:"esDisconnected",connected:"esReady",hierarchy:"esDOM",element:"esElement",webcomponents:"esComponents",attributes:"esAttributes",listeners:{value:"esListeners",branch:"esBranch",bind:"esBind",trigger:"esTrigger",format:"esFormat"},trigger:"esTrigger",compose:"esCompose",uri:"esURI",reference:"esReference",childPosition:"esChildPosition",attribute:"escomponent",parent:"esParent",component:"esComponent",source:"esSource",path:"__isESComponent",animate:"esAnimate",options:"__esOptions",states:"__esStates",promise:"__esComponentPromise",proxy:"__esProxy",editor:"esCode",flow:"__esManager",original:"esOriginal",resize:"esOnResize"};var j=Symbol("listenerObject"),K=Symbol("toSet"),z=d=>f.listeners.format in d||f.listeners.branch in d||f.listeners.trigger in d||f.listeners.bind in d,A="INITIALIZED",L="REGISTERED",D={},M={},V={},S=Symbol("subscriptionKey"),R=Symbol("configKey"),C=Symbol("toResolveWithKey"),k=class{constructor(e={},t,s){this.original={};this.active={};this.globals={};this.context={};this.rootPath="";this.status="";this.#e=[];this.#s=[];this.getManager=(e="from")=>{let t=e==="to"?this.globals.to:this.globals.from;return this.rootPath.split(this.context.options.keySeparator).forEach(s=>{t[s]||(t[s]={}),t=t[s]}),t[C]??this};this.onStart=e=>{let t=this.#o;t===this?this.status===A?e():this.#s.push(e):t.onStart(e)};this.runEachListener=(e,t)=>{if(!!t)for(let s in e){let i=e[s];if(!i){console.warn("Skipping empty listener:",s);continue}if(i&&typeof i=="object")for(let o in i)t(o,s,i[o]);else typeof s=="string"?t(i,s,s):console.error("Improperly Formatted Listener",s)}};this.register=(e=this.original)=>{this.runEachListener(e,this.add),this.status=L};this.#n=e=>{let t=this.context.monitor.get(e.path,"info");if(typeof t.value=="function"){let s=Array.isArray(e.args)?e.args:[e.args];t.value(...s)}else console.error("Cannot yet trigger values...",e)};this.initialize=e=>{this.status?this.status===L?(this.status=A,this.#e.forEach(this.#n),this.#s.forEach(t=>t()),this.#s=[],this.#e=[]):this.#n(e):this.#e.push(e)};this.start=()=>{this.register(),this.initialize()};this.#i=e=>!e||!this.rootPath||e.includes(this.rootPath)?e:[this.rootPath,e].join(this.context.monitor.options.keySeparator);this.#t=e=>{let t={absolute:{},relative:{}};e=this.#i(e);let s=this.rootPath?e.replace(`${this.rootPath}.`,""):e,i=e.split(this.context.options.keySeparator);return t.absolute.array=[this.context.id,...i],t.relative.array=s.split(this.context.options.keySeparator),this.context.monitor.get(t.relative.array,void 0,this.context.instance)?.hasOwnProperty(f.path)&&(t.absolute.array.push(E),t.relative.array.push(E)),t.absolute.value=t.absolute.array.slice(1).join(this.context.options.keySeparator),t.relative.value=t.relative.array.join(this.context.options.keySeparator),t};this.add=(e,t,s=!0,i)=>{let o=this.#t(e),n=this.#t(t),y=o.absolute.value;i||(i=this.globals.active[y]?.[S]),i||(i=this.context.monitor.on(o.absolute.array,(a,p,P)=>this.activate(a,P),{ref:this.context.instance,path:o.relative.array}));let u={value:s,[j]:!0};[this.active,this.globals.active].forEach(a=>{a[y]||(a[y]={});let p=a[y];p[S]||Object.defineProperty(p,S,{value:i,configurable:!0}),p[n.absolute.value]=u});let r=s[f.listeners.trigger];return r&&this.#o.initialize({path:o.absolute.array,args:r}),this.addToGlobalLog(y),u};this.addToGlobalLog=(e,t="from")=>{let s=this.#i(e),i=t==="to"?this.globals.to:this.globals.from;s.split(this.context.options.keySeparator).forEach(n=>{i[n]||(i[n]={}),i=i[n],i[C]||(i[C]=this)})};this.remove=(e,t)=>{let s=this.#t(e),i=this.#t(t),o=[s.absolute.value,i.absolute.value];[{ref:this.active,path:o},{ref:this.globals.active,path:o,unlisten:!0}].forEach(y=>{let{ref:u,path:b,unlisten:r}=y,a=u[b[0]];if(typeof a=="object"){if(delete a[b[1]],Object.keys(a).length===0){delete u[b[0]];let p=a[S];r&&p&&this.context.monitor.remove(p),delete a[S]}}else delete u[b[0]]})};this.clear=e=>{let t=this.#i(e);Object.keys(this.active).forEach(s=>{Object.keys(this.active[s]).forEach(i=>{(!t||s.slice(0,t.length)===t||i.slice(0,t.length)===t)&&this.remove(s,i)})})};this.has=(e,t=this.active)=>!!t[e];this.get=(e,t=this.active)=>t[e];this.activate=(e,t)=>{[{info:this.get(e,this.globals.active),name}].forEach(i=>{let o=i.info;if(o)if(o[j])this.pass(e,{value:o.value,parent:this.active,key:i.name,subscription:o.subscription,__value:!0},t);else if(typeof o=="object")for(let n in o)this.pass(e,{parent:o,key:n,subscription:o[n].subscription,value:o[n].value},t);else console.error("Improperly Formatted Listener",o)})};this.pass=(e,t,s)=>{let i=this.context.id,o,n,y,u=t?.__value;o=t.parent,n=t.key,y=t.subscription;let b=t.parent[n];t=b.value;let r=b?.[R],a=t,p=typeof t,P=(l,c)=>{let h=this.context.monitor.get(l,"info");if(h.exists){let v=h.value,m={value:typeof v!="function"&&!v?.default?K:v};return c&&(t=m.value,o[n]=m),m}else return{value:void 0}},I=l=>{let c=[i];return c.push(...n.split(this.context.options.keySeparator)),P(c,l)},O=l=>{let c=[i],h=[];return this.rootPath&&h.push(...this.rootPath.split(this.context.options.keySeparator)),h.push(...l.split(this.context.options.keySeparator)),c.push(...h),c};if(typeof t=="boolean")u?console.error(`Cannot use a boolean for ${f.listeners.value}...`):I(!0);else if(p==="string"){let l=O(a);P(l,!0),u&&(o[n]={[a]:o[n]},n=a)}else t&&p==="object"&&z(a)&&("value"in a?u?t=o[n]=a.value:t=o[n].value=a.value:I(!0),a&&a&&(r=a),Object.defineProperty(o[n],R,{value:r}));let _=!0;if(r){let l=f.listeners.value;if(l in r){let c=O(r[l].original??r[l]);if(typeof r[l]=="string"){let h=this.context.monitor.get(c);h?r[l]={value:h,original:r[l]}:t=`because ${c.slice(1).join(this.context.options.keySeparator)} does not point correctly to an existing component.`}else r[l].value.esParent||(t=`because ${r[l].original??i.toString()} has become unparented.`)}else{let c=f.listeners.branch,h=f.listeners.format;if(c in r&&(r[c].find(g=>{let x=[];"condition"in g&&x.push(g.condition(s)),"equals"in g&&x.push(g.equals===s);let m=x.length>0&&x.reduce(($,T)=>$&&T,!0);return m&&"value"in g&&(s=g.value),m})||(_=!1)),h in r)try{s=r[h](s),s===void 0&&(_=!1)}catch(v){console.error("Failed to format arguments",v)}}}if(_&&s!==void 0){let l=Array.isArray(s)?s:[s];if(t===K){let c=[i];c.push(...n.split(this.context.options.keySeparator));let h=c.pop(),v=this.context.monitor.get(c,"info");v.value[h]=s}else if(t?.default)t.default.call(t,...l);else if(typeof t=="function")o[n][j]?t.call(r?.[f.listeners.bind]?.value??this.context.instance,...l):t(...l);else{let c=n?`listener: ${e} \u2014> ${n}`:`listener from ${e}`;o?(console.warn(`Deleting ${c}`,t),delete o[n]):console.error(`Failed to add ${c}`,t)}}};this.context=s,this.rootPath=t,this.original=e,[{name:"active",ref:V},{name:"from",ref:D},{name:"to",ref:M}].forEach(o=>{o.ref[this.context.id]||(o.ref[this.context.id]={}),this.globals[o.name]=o.ref[this.context.id]}),this.#o=this.getManager(),this.runEachListener(e,this.addToGlobalLog)}#e;#s;#o;#n;#i;#t},w=k;export{w as default};
//# sourceMappingURL=index.esm.js.map