(()=>{const e={data:{extensionActive:!1,urlConcatList:[],requestHeaders:[],mockList:[],originXHR:window.XMLHttpRequest,privateXHR:window.XMLHttpRequest},methods:{setPrivateXHR(){e.data.privateXHR=function(){const t=new e.data.originXHR;for(let a in t)"open"===a&&e.methods.overwriteOpen(t),"send"===a&&e.methods.overwriteSend(t),"onload"!==a?"onreadystatechange"!==a?"function"!=typeof t[a]?["response","responseText","status"].includes(a)?Object.defineProperty(this,a,{get:()=>t[`_${a}`]||t[a],set(e){t[`_${a}`]=e},enumerable:!0}):Object.defineProperty(this,a,{get:()=>t[a],set(e){t[a]=e},enumerable:!0}):this[a]=t[a].bind(t):t.onreadystatechange=(...e)=>{this.onreadystatechange&&this.onreadystatechange.call(this,...e)}:t.onload=(...a)=>{e.data.extensionActive&&e.methods.proxyMockList.call(this,t),this.onload&&this.onload.call(this,...a)}}},overwriteOpen(t){t.open=function(...t){if(e.data.extensionActive){let a=t[1];const o=new URLSearchParams;e.data.urlConcatList.forEach((e=>{e.checked&&e.key&&e.value&&o.append(e.key,e.value)}));const n=o.toString();t[1]=a+(n?(a.indexOf("?")>-1?"&":"?")+n:"")}e.data.originXHR.prototype.open.call(this,...t)}},overwriteSend(t){t.send=function(...t){e.data.extensionActive&&e.data.requestHeaders.forEach((e=>{e.checked&&e.key&&e.value&&this.setRequestHeader(e.key,e.value)})),e.data.originXHR.prototype.send.call(this,...t)}},proxyMockList(t){e.data.mockList.forEach((e=>{e.checked&&e.key&&e.value&&t.responseURL.indexOf(e.key)>-1&&(this.status=200,this.response=e.value,this.responseText=e.value,console.log("<--------------------"),console.log("代理接口：",t.responseURL),console.log("mock数据：",e.value),console.log("--------------------\x3e"))}))}},mounted(){e.methods.setPrivateXHR()}};e.mounted(),window.addEventListener("injectedScript",(t=>{Object.keys(e.data).find((e=>e===t.detail?.dataName))&&(e.data[t.detail.dataName]=t.detail?.data,e.data.extensionActive?window.XMLHttpRequest=e.data.privateXHR:window.XMLHttpRequest=e.data.originXHR)}))})();