// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"fxr48":[function(require,module,exports) {
var m = typeof globalThis.process < "u" ? globalThis.process.argv : [], T = typeof globalThis.process < "u" ? globalThis.process.env : {}, x = new Set(m), g = (s)=>x.has(s), D = m.filter((s)=>s.startsWith("--") && s.includes("=")).map((s)=>s.split("=")).reduce((s, [e, t])=>(s[e] = t, s), {});
var R = g("--dry-run"), C = g("--verbose") || T.VERBOSE === "true";
var E = (s = "", ...e)=>console.log(s.padEnd(9), "|", ...e);
var y = (...s)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...s), f = (...s)=>E("\uD83D\uDD35 INFO", ...s), _ = (...s)=>E("\uD83D\uDFE0 WARN", ...s);
var h = class {
    target;
    type;
    constructor(e, t){
        this.target = t, this.type = e;
    }
}, p = class extends h {
    message;
    error;
    constructor(e, t){
        super("error", t), this.message = e.message, this.error = e;
    }
}, u = class extends h {
    code;
    reason;
    wasClean = !0;
    constructor(e = 1e3, t = "", n){
        super("close", n), this.code = e, this.reason = t;
    }
};
var S = ()=>{
    if (typeof globalThis.WebSocket < "u") return globalThis.WebSocket;
}, O = (s)=>typeof s < "u" && !!s && s.CLOSING === 2, a = {
    maxReconnectionDelay: 1e4,
    minReconnectionDelay: 1e3 + Math.random() * 4e3,
    minUptime: 5e3,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 4e3,
    maxRetries: 1 / 0,
    maxEnqueuedMessages: 1 / 0,
    startClosed: !1,
    debug: !1
}, o = class {
    _ws;
    _listeners = {
        error: [],
        message: [],
        open: [],
        close: []
    };
    _retryCount = -1;
    _uptimeTimeout;
    _connectTimeout;
    _shouldReconnect = !0;
    _connectLock = !1;
    _binaryType = "blob";
    _closeCalled = !1;
    _messageQueue = [];
    _url;
    _protocols;
    _options;
    constructor(e, t, n = {}){
        this._url = e, this._protocols = t, this._options = n, this._options.startClosed && (this._shouldReconnect = !1), this._connect();
    }
    static get CONNECTING() {
        return 0;
    }
    static get OPEN() {
        return 1;
    }
    static get CLOSING() {
        return 2;
    }
    static get CLOSED() {
        return 3;
    }
    get CONNECTING() {
        return o.CONNECTING;
    }
    get OPEN() {
        return o.OPEN;
    }
    get CLOSING() {
        return o.CLOSING;
    }
    get CLOSED() {
        return o.CLOSED;
    }
    get binaryType() {
        return this._ws ? this._ws.binaryType : this._binaryType;
    }
    set binaryType(e) {
        this._binaryType = e, this._ws && (this._ws.binaryType = e);
    }
    get retryCount() {
        return Math.max(this._retryCount, 0);
    }
    get bufferedAmount() {
        return this._messageQueue.reduce((t, n)=>(typeof n == "string" ? t += n.length : n instanceof Blob ? t += n.size : t += n.byteLength, t), 0) + (this._ws ? this._ws.bufferedAmount : 0);
    }
    get extensions() {
        return this._ws ? this._ws.extensions : "";
    }
    get protocol() {
        return this._ws ? this._ws.protocol : "";
    }
    get readyState() {
        return this._ws ? this._ws.readyState : this._options.startClosed ? o.CLOSED : o.CONNECTING;
    }
    get url() {
        return this._ws ? this._ws.url : "";
    }
    onclose;
    onerror;
    onmessage;
    onopen;
    close(e = 1e3, t) {
        if (this._closeCalled = !0, this._shouldReconnect = !1, this._clearTimeouts(), !this._ws) {
            this._debug("close enqueued: no ws instance");
            return;
        }
        if (this._ws.readyState === this.CLOSED) {
            this._debug("close: already closed");
            return;
        }
        this._ws.close(e, t);
    }
    reconnect(e, t) {
        this._shouldReconnect = !0, this._closeCalled = !1, this._retryCount = -1, !this._ws || this._ws.readyState === this.CLOSED ? this._connect() : (this._disconnect(e, t), this._connect());
    }
    send(e) {
        if (this._ws && this._ws.readyState === this.OPEN) this._debug("send", e), this._ws.send(e);
        else {
            let { maxEnqueuedMessages: t = a.maxEnqueuedMessages  } = this._options;
            this._messageQueue.length < t && (this._debug("enqueue", e), this._messageQueue.push(e));
        }
    }
    addEventListener(e, t) {
        this._listeners[e] && this._listeners[e].push(t);
    }
    dispatchEvent(e) {
        let t = this._listeners[e.type];
        if (t) for (let n of t)this._callEventListener(e, n);
        return !0;
    }
    removeEventListener(e, t) {
        this._listeners[e] && (this._listeners[e] = this._listeners[e].filter((n)=>n !== t));
    }
    _debug(...e) {
        this._options.debug && console.log.apply(console, [
            "RWS>",
            ...e
        ]);
    }
    _getNextDelay() {
        let { reconnectionDelayGrowFactor: e = a.reconnectionDelayGrowFactor , minReconnectionDelay: t = a.minReconnectionDelay , maxReconnectionDelay: n = a.maxReconnectionDelay  } = this._options, r = 0;
        return this._retryCount > 0 && (r = t * Math.pow(e, this._retryCount - 1), r > n && (r = n)), this._debug("next delay", r), r;
    }
    _wait() {
        return new Promise((e)=>{
            setTimeout(e, this._getNextDelay());
        });
    }
    _getNextUrl(e) {
        if (typeof e == "string") return Promise.resolve(e);
        if (typeof e == "function") {
            let t = e();
            if (typeof t == "string") return Promise.resolve(t);
            if (t.then) return t;
        }
        throw Error("Invalid URL");
    }
    _connect() {
        if (this._connectLock || !this._shouldReconnect) return;
        this._connectLock = !0;
        let { maxRetries: e = a.maxRetries , connectionTimeout: t = a.connectionTimeout , WebSocket: n = S()  } = this._options;
        if (this._retryCount >= e) {
            this._debug("max retries reached", this._retryCount, ">=", e);
            return;
        }
        if (this._retryCount++, this._debug("connect", this._retryCount), this._removeListeners(), !O(n)) throw Error("No valid WebSocket class provided");
        this._wait().then(()=>this._getNextUrl(this._url)).then(async (r)=>{
            this._closeCalled || (this._debug("connect", {
                url: r,
                protocols: this._protocols
            }), this._ws = this._protocols ? new n(r, this._protocols) : new n(r), this._ws.binaryType = this._binaryType, this._connectLock = !1, this._addListeners(), this._connectTimeout = setTimeout(()=>this._handleTimeout(), t));
        });
    }
    _handleTimeout() {
        this._debug("timeout event"), this._handleError(new p(Error("TIMEOUT"), this));
    }
    _disconnect(e = 1e3, t) {
        if (this._clearTimeouts(), !!this._ws) {
            this._removeListeners();
            try {
                this._ws.close(e, t), this._handleClose(new u(e, t, this));
            } catch  {}
        }
    }
    _acceptOpen() {
        this._debug("accept open"), this._retryCount = 0;
    }
    _callEventListener(e, t) {
        "handleEvent" in t ? t.handleEvent(e) : t(e);
    }
    _handleOpen = (e)=>{
        this._debug("open event");
        let { minUptime: t = a.minUptime  } = this._options;
        clearTimeout(this._connectTimeout), this._uptimeTimeout = setTimeout(()=>this._acceptOpen(), t), this._ws.binaryType = this._binaryType, this._messageQueue.forEach((n)=>{
            var r;
            return (r = this._ws) == null ? void 0 : r.send(n);
        }), this._messageQueue = [], this.onopen && this.onopen(e), this._listeners.open.forEach((n)=>this._callEventListener(e, n));
    };
    _handleMessage = (e)=>{
        this._debug("message event"), this.onmessage && this.onmessage(e), this._listeners.message.forEach((t)=>this._callEventListener(e, t));
    };
    _handleError = (e)=>{
        this._debug("error event", e.message), this._disconnect(void 0, e.message === "TIMEOUT" ? "timeout" : void 0), this.onerror && this.onerror(e), this._debug("exec error listeners"), this._listeners.error.forEach((t)=>this._callEventListener(e, t)), this._connect();
    };
    _handleClose = (e)=>{
        this._debug("close event"), this._clearTimeouts(), this._shouldReconnect && this._connect(), this.onclose && this.onclose(e), this._listeners.close.forEach((t)=>this._callEventListener(e, t));
    };
    _removeListeners() {
        !this._ws || (this._debug("removeListeners"), this._ws.removeEventListener("open", this._handleOpen), this._ws.removeEventListener("close", this._handleClose), this._ws.removeEventListener("message", this._handleMessage), this._ws.removeEventListener("error", this._handleError));
    }
    _addListeners() {
        !this._ws || (this._debug("addListeners"), this._ws.addEventListener("open", this._handleOpen), this._ws.addEventListener("close", this._handleClose), this._ws.addEventListener("message", this._handleMessage), this._ws.addEventListener("error", this._handleError));
    }
    _clearTimeouts() {
        clearTimeout(this._connectTimeout), clearTimeout(this._uptimeTimeout);
    }
};
var d = JSON.parse('{"host":"localhost","port":50639,"secure":false,"bundleId":"62a22cc83d033bf0","serverPort":50638}');
function N() {
    return d.host || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function k() {
    return d.port || location.port;
}
var b = module.bundle.parent, w;
if ((!b || !b.isParcelRequire) && typeof WebSocket < "u") {
    let s = {
        reconnecting: !0
    }, e = N(), t = k(), n = d.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(e) ? "wss" : "ws";
    (w = chrome == null ? void 0 : chrome.runtime) != null && w.lastError && location.reload();
    let r = new o(`${n}://${e}:${t}/`);
    r.onmessage = async function(c) {
        var v;
        if (!chrome.runtime.id) return;
        let l = JSON.parse(c.data);
        if (l.type === "update" && (l.assets.filter((i)=>i.type === "json").length > 0 ? typeof ((v = chrome == null ? void 0 : chrome.runtime) == null ? void 0 : v.reload) == "function" ? chrome.runtime.reload() : (chrome.runtime.sendMessage({
            __parcel_hmr_reload__: !0
        }), location.reload()) : typeof (location == null ? void 0 : location.reload) == "function" ? location.reload() : chrome.runtime.reload()), l.type === "error") for (let i of l.diagnostics.ansi){
            let L = i.codeframe ? i.codeframe : i.stack;
            _("[plasmo/parcel-runtime]: " + i.message + `
` + L + `

` + i.hints.join(`
`));
        }
    }, r.onerror = function(c) {
        typeof c.message == "string" && !s.reconnecting && y("[plasmo/parcel-runtime]: " + c.message);
    }, r.onopen = function() {
        s.reconnecting = !1, f("[plasmo/parcel-runtime]: Connected to HMR server");
    }, r.onclose = function() {
        s.reconnecting || (s.reconnecting = !0, _("[plasmo/parcel-runtime]: Connection to the HMR server was lost, trying to reconnect..."));
    };
}

},{}],"fAF1v":[function(require,module,exports) {
const pageInstance = {
    data: {
        extensionActive: false,
        urlConcatList: [],
        requestHeaders: [],
        mockList: [],
        originXHR: window.XMLHttpRequest,
        privateXHR: window.XMLHttpRequest
    },
    methods: {
        setPrivateXHR () {
            function PrivateXHR() {
                const xhr = new pageInstance.data.originXHR();
                for(let attr in xhr){
                    if (attr === "open") // 覆盖open
                    pageInstance.methods.overwriteOpen(xhr);
                    if (attr === "send") // 覆盖send
                    pageInstance.methods.overwriteSend(xhr);
                    if (attr === "onload") {
                        // 定义onload
                        xhr.onload = (...args)=>{
                            if (pageInstance.data.extensionActive) // 代理接口
                            pageInstance.methods.proxyMockList.call(this, xhr);
                            this.onload && this.onload.call(this, ...args);
                        };
                        continue;
                    }
                    if (attr === "onreadystatechange") {
                        xhr.onreadystatechange = (...args)=>{
                            this.onreadystatechange && this.onreadystatechange.call(this, ...args);
                        };
                        continue;
                    }
                    if (typeof xhr[attr] === "function") {
                        // 重要，确保 new PrivateXHR 之后，方法执行的this是指向 xhr 的
                        this[attr] = xhr[attr].bind(xhr);
                        continue;
                    }
                    if ([
                        "response",
                        "responseText",
                        "status"
                    ].includes(attr)) Object.defineProperty(this, attr, {
                        get () {
                            return xhr[`_${attr}`] || xhr[attr];
                        },
                        set (value) {
                            xhr[`_${attr}`] = value;
                        },
                        enumerable: true
                    });
                    else Object.defineProperty(this, attr, {
                        get () {
                            return xhr[attr];
                        },
                        set (value) {
                            xhr[attr] = value;
                        },
                        enumerable: true
                    });
                }
            }
            pageInstance.data.privateXHR = PrivateXHR;
        },
        // 覆盖open方法
        overwriteOpen (xhr) {
            xhr.open = function(...args) {
                if (pageInstance.data.extensionActive) {
                    let path = args[1];
                    const urlSearchParams = new URLSearchParams();
                    pageInstance.data.urlConcatList.forEach((item)=>{
                        if (item.checked && item.key && item.value) urlSearchParams.append(item.key, item.value);
                    });
                    const paramsStr = urlSearchParams.toString();
                    args[1] = path + (paramsStr ? (path.indexOf("?") > -1 ? "&" : "?") + paramsStr : "");
                }
                pageInstance.data.originXHR.prototype.open.call(this, ...args);
            };
        },
        // 覆盖send方法
        overwriteSend (xhr) {
            xhr.send = function(...args) {
                // 根据配置增加 request Header 参数
                if (pageInstance.data.extensionActive) pageInstance.data.requestHeaders.forEach((item)=>{
                    if (item.checked && item.key && item.value) this.setRequestHeader(item.key, item.value);
                });
                pageInstance.data.originXHR.prototype.send.call(this, ...args);
            };
        },
        // 根据mockList 代理接口
        proxyMockList (xhr) {
            pageInstance.data.mockList.forEach((item)=>{
                if (item.checked && item.key && item.value) {
                    if (xhr.responseURL.indexOf(item.key) > -1) {
                        this.status = 200;
                        this.response = item.value;
                        this.responseText = item.value;
                        console.log("<--------------------");
                        console.log("代理接口：", xhr.responseURL);
                        console.log("mock数据：", item.value);
                        console.log("-------------------->");
                    }
                }
            });
        }
    },
    mounted () {
        pageInstance.methods.setPrivateXHR();
    }
};
// 初始化
pageInstance.mounted();
window.addEventListener("injectedScript", (e)=>{
    if (Object.keys(pageInstance.data).find((item)=>item === e.detail?.dataName)) {
        pageInstance.data[e.detail.dataName] = e.detail?.data;
        if (pageInstance.data.extensionActive) // 替换 XHR
        window.XMLHttpRequest = pageInstance.data.privateXHR;
        else window.XMLHttpRequest = pageInstance.data.originXHR;
    }
// console.log("injectedScript 接受数据:", e.detail)
});

},{}]},["fxr48","fAF1v"], "fAF1v", "parcelRequire2015")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQUEsUUFBUSxDQUFDO0lBQUEsWUFBWSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7UUFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsVUFBVSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBRyxDQUFBLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtLQUFDO0lBQUEsV0FBVyxVQUFVLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQTtLQUFDO0lBQUEsV0FBVyxJQUFJLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQTtLQUFDO0lBQUEsV0FBVyxPQUFPLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQTtLQUFDO0lBQUEsV0FBVyxNQUFNLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQTtLQUFDO0lBQUEsSUFBSSxVQUFVLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUE7S0FBQztJQUFBLElBQUksSUFBSSxHQUFFO1FBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFBO0tBQUM7SUFBQSxJQUFJLE9BQU8sR0FBRTtRQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQTtLQUFDO0lBQUEsSUFBSSxNQUFNLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUE7S0FBQztJQUFBLElBQUksVUFBVSxHQUFFO1FBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUE7S0FBQztJQUFBLElBQUksVUFBVSxDQUFDLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLElBQUcsQ0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUEsQUFBQztLQUFDO0lBQUEsSUFBSSxVQUFVLEdBQUU7UUFBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxDQUFDLENBQUMsQ0FBQTtLQUFDO0lBQUEsSUFBSSxjQUFjLEdBQUU7UUFBQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBSSxDQUFBLE9BQU8sQ0FBQyxJQUFFLFFBQVEsR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLFlBQVksSUFBSSxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQSxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFDLENBQUMsQ0FBQSxBQUFDLENBQUE7S0FBQztJQUFBLElBQUksVUFBVSxHQUFFO1FBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFDLEVBQUUsQ0FBQTtLQUFDO0lBQUEsSUFBSSxRQUFRLEdBQUU7UUFBQyxPQUFPLElBQUksQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUMsRUFBRSxDQUFBO0tBQUM7SUFBQSxJQUFJLFVBQVUsR0FBRTtRQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxVQUFVLENBQUE7S0FBQztJQUFBLElBQUksR0FBRyxHQUFFO1FBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQTtLQUFDO0lBQUEsT0FBTyxDQUFDO0lBQUEsT0FBTyxDQUFDO0lBQUEsU0FBUyxDQUFDO0lBQUEsTUFBTSxDQUFDO0lBQUEsS0FBSyxDQUFDLENBQUMsR0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDO1FBQUMsSUFBRyxJQUFJLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDO1lBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQUEsT0FBTTtTQUFDO1FBQUEsSUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBRyxJQUFJLENBQUMsTUFBTSxFQUFDO1lBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQUEsT0FBTTtTQUFDO1FBQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztLQUFDO0lBQUEsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7UUFBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFlBQVksR0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxHQUFDLEVBQUUsRUFBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUUsQ0FBQSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUEsQUFBQztLQUFDO0lBQUEsSUFBSSxDQUFDLENBQUMsRUFBQztRQUFDLElBQUcsSUFBSSxDQUFDLEdBQUcsSUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBRyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQUk7WUFBQyxJQUFHLEVBQUMsbUJBQW1CLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQSxFQUFDLEdBQUMsSUFBSSxDQUFDLFFBQVEsQUFBQztZQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFDLENBQUMsSUFBRyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUM7U0FBQztLQUFDO0lBQUEsZ0JBQWdCLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQUM7SUFBQSxhQUFhLENBQUMsQ0FBQyxFQUFDO1FBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEFBQUM7UUFBQSxJQUFHLENBQUMsRUFBQyxLQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUEsT0FBTSxDQUFDLENBQUMsQ0FBQTtLQUFDO0lBQUEsbUJBQW1CLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQyxHQUFFLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQSxBQUFDO0tBQUM7SUFBQSxNQUFN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SUFBSSxDQUFDLFlBQVksSUFBRyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFDO2dCQUFDLEdBQUcsRUFBQyxDQUFDO2dCQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsVUFBVTthQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFDLElBQUksQ0FBQyxlQUFlLEdBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUM7U0FBQyxDQUFDO0tBQUM7SUFBQSxjQUFjLEdBQUU7UUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0tBQUM7SUFBQSxXQUFXLENBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUM7UUFBQyxJQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQztZQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQUEsSUFBRztnQkFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO2FBQUMsQ0FBQSxPQUFLLEVBQUU7U0FBQztLQUFDO0lBQUEsV0FBVyxHQUFFO1FBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxHQUFDLENBQUM7S0FBQztJQUFBLGtCQUFrQixDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7UUFBQyxhQUFhLElBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUFDO0lBQUEsV0FBVyxHQUFDLENBQUEsQ0FBQyxHQUFFO1FBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUFBLElBQUcsRUFBQyxTQUFTLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxTQUFTLENBQUEsRUFBQyxHQUFDLElBQUksQ0FBQyxRQUFRLEFBQUM7UUFBQSxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFDLElBQUksQ0FBQyxjQUFjLEdBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDLEdBQUU7WUFBQyxJQUFJLENBQUMsQUFBQztZQUFBLE9BQU0sQUFBQyxDQUFBLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFBLElBQUcsSUFBSSxHQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLGFBQWEsR0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLE1BQU0sSUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsR0FBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUMsQ0FBQztJQUFBLGNBQWMsR0FBQyxDQUFBLENBQUMsR0FBRTtRQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUMsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsR0FBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUMsQ0FBQztJQUFBLFlBQVksR0FBQyxDQUFBLENBQUMsR0FBRTtRQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUcsU0FBUyxHQUFDLFNBQVMsR0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxPQUFPLElBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQyxHQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFO0tBQUMsQ0FBQztJQUFBLFlBQVksR0FBQyxDQUFBLENBQUMsR0FBRTtRQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsSUFBSSxDQUFDLE9BQU8sSUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsR0FBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUMsQ0FBQztJQUFBLGdCQUFnQixHQUFFO1FBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFHLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQSxBQUFDO0tBQUM7SUFBQSxhQUFhLEdBQUU7UUFBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUcsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQSxBQUFDO0tBQUM7SUFBQSxjQUFjLEdBQUU7UUFBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO0tBQUM7Q0FBQyxBQUFDO0FBQUEsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxtR0FBbUcsQ0FBQyxBQUFDO0FBQUEsU0FBUyxDQUFDLEdBQUU7SUFBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUcsQ0FBQSxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBRyxDQUFDLEdBQUMsUUFBUSxDQUFDLFFBQVEsR0FBQyxXQUFXLENBQUEsQUFBQyxDQUFBO0NBQUM7QUFBQSxTQUFTLENBQUMsR0FBRTtJQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBRSxRQUFRLENBQUMsSUFBSSxDQUFBO0NBQUM7QUFBQSxJQUFJLENBQUMsR0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDLEFBQUM7QUFBQSxJQUFHLEFBQUMsQ0FBQSxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUEsSUFBRyxPQUFPLFNBQVMsR0FBQyxHQUFHLEVBQUM7SUFBQyxJQUFJLENBQUMsR0FBQztRQUFDLFlBQVksRUFBQyxDQUFDLENBQUM7S0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLElBQUUsUUFBUSxDQUFDLFFBQVEsS0FBRyxRQUFRLElBQUUsQ0FBQyw4QkFBOEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUssR0FBQyxJQUFJLEFBQUM7SUFBQyxDQUFBLENBQUMsR0FBQyxNQUFNLElBQUUsSUFBSSxHQUFDLEtBQUssQ0FBQyxHQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUEsSUFBRyxJQUFJLElBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFBQSxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDO0lBQUEsQ0FBQyxDQUFDLFNBQVMsR0FBQyxlQUFlLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQyxBQUFDO1FBQUEsSUFBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFDLE9BQU87UUFBQSxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQUFBQztRQUFBLElBQUcsQ0FBQyxDQUFDLElBQUksS0FBRyxRQUFRLElBQUcsQ0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsR0FBRSxDQUFDLENBQUMsSUFBSSxLQUFHLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsT0FBTyxDQUFBLEFBQUMsQ0FBQSxDQUFDLEdBQUMsTUFBTSxJQUFFLElBQUksR0FBQyxLQUFLLENBQUMsR0FBQyxNQUFNLENBQUMsT0FBTyxDQUFBLElBQUcsSUFBSSxHQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUEsQUFBQyxJQUFFLFVBQVUsR0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFFLENBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFBQyxxQkFBcUIsRUFBQyxDQUFDLENBQUM7U0FBQyxDQUFDLEVBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFBLEFBQUMsR0FBQyxPQUFPLENBQUEsUUFBUSxJQUFFLElBQUksR0FBQyxLQUFLLENBQUMsR0FBQyxRQUFRLENBQUMsTUFBTSxDQUFBLEFBQUMsSUFBRSxVQUFVLEdBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUEsQUFBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUcsT0FBTyxFQUFDLEtBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMs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QUksWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQ25DLFNBQVM7UUFDVCxNQUFNLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVTthQUVwRCxNQUFNLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUztLQUV0RDtBQUNELGdEQUFnRDtDQUNqRCxDQUFDIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvQHBsYXNtb2hxL3BhcmNlbC1ydW50aW1lL2Rpc3QvcnVudGltZS0xM2ZlY2RlZTQyODBiY2JmLmpzIiwic3JjL2NvbnRlbnRzL2luamVjdGVkU2NyaXB0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBtPXR5cGVvZiBnbG9iYWxUaGlzLnByb2Nlc3M8XCJ1XCI/Z2xvYmFsVGhpcy5wcm9jZXNzLmFyZ3Y6W10sVD10eXBlb2YgZ2xvYmFsVGhpcy5wcm9jZXNzPFwidVwiP2dsb2JhbFRoaXMucHJvY2Vzcy5lbnY6e30seD1uZXcgU2V0KG0pLGc9cz0+eC5oYXMocyksRD1tLmZpbHRlcihzPT5zLnN0YXJ0c1dpdGgoXCItLVwiKSYmcy5pbmNsdWRlcyhcIj1cIikpLm1hcChzPT5zLnNwbGl0KFwiPVwiKSkucmVkdWNlKChzLFtlLHRdKT0+KHNbZV09dCxzKSx7fSk7dmFyIFI9ZyhcIi0tZHJ5LXJ1blwiKSxDPWcoXCItLXZlcmJvc2VcIil8fFQuVkVSQk9TRT09PVwidHJ1ZVwiO3ZhciBFPShzPVwiXCIsLi4uZSk9PmNvbnNvbGUubG9nKHMucGFkRW5kKDkpLFwifFwiLC4uLmUpO3ZhciB5PSguLi5zKT0+Y29uc29sZS5lcnJvcihcIlxcdXsxRjUzNH0gRVJST1JcIi5wYWRFbmQoOSksXCJ8XCIsLi4ucyksZj0oLi4ucyk9PkUoXCJcXHV7MUY1MzV9IElORk9cIiwuLi5zKSxfPSguLi5zKT0+RShcIlxcdXsxRjdFMH0gV0FSTlwiLC4uLnMpO3ZhciBoPWNsYXNze3RhcmdldDt0eXBlO2NvbnN0cnVjdG9yKGUsdCl7dGhpcy50YXJnZXQ9dCx0aGlzLnR5cGU9ZX19LHA9Y2xhc3MgZXh0ZW5kcyBoe21lc3NhZ2U7ZXJyb3I7Y29uc3RydWN0b3IoZSx0KXtzdXBlcihcImVycm9yXCIsdCksdGhpcy5tZXNzYWdlPWUubWVzc2FnZSx0aGlzLmVycm9yPWV9fSx1PWNsYXNzIGV4dGVuZHMgaHtjb2RlO3JlYXNvbjt3YXNDbGVhbj0hMDtjb25zdHJ1Y3RvcihlPTFlMyx0PVwiXCIsbil7c3VwZXIoXCJjbG9zZVwiLG4pLHRoaXMuY29kZT1lLHRoaXMucmVhc29uPXR9fTt2YXIgUz0oKT0+e2lmKHR5cGVvZiBnbG9iYWxUaGlzLldlYlNvY2tldDxcInVcIilyZXR1cm4gZ2xvYmFsVGhpcy5XZWJTb2NrZXR9LE89cz0+dHlwZW9mIHM8XCJ1XCImJiEhcyYmcy5DTE9TSU5HPT09MixhPXttYXhSZWNvbm5lY3Rpb25EZWxheToxZTQsbWluUmVjb25uZWN0aW9uRGVsYXk6MWUzK01hdGgucmFuZG9tKCkqNGUzLG1pblVwdGltZTo1ZTMscmVjb25uZWN0aW9uRGVsYXlHcm93RmFjdG9yOjEuMyxjb25uZWN0aW9uVGltZW91dDo0ZTMsbWF4UmV0cmllczoxLzAsbWF4RW5xdWV1ZWRNZXNzYWdlczoxLzAsc3RhcnRDbG9zZWQ6ITEsZGVidWc6ITF9LG89Y2xhc3N7X3dzO19saXN0ZW5lcnM9e2Vycm9yOltdLG1lc3NhZ2U6W10sb3BlbjpbXSxjbG9zZTpbXX07X3JldHJ5Q291bnQ9LTE7X3VwdGltZVRpbWVvdXQ7X2Nvbm5lY3RUaW1lb3V0O19zaG91bGRSZWNvbm5lY3Q9ITA7X2Nvbm5lY3RMb2NrPSExO19iaW5hcnlUeXBlPVwiYmxvYlwiO19jbG9zZUNhbGxlZD0hMTtfbWVzc2FnZVF1ZXVlPVtdO191cmw7X3Byb3RvY29scztfb3B0aW9ucztjb25zdHJ1Y3RvcihlLHQsbj17fSl7dGhpcy5fdXJsPWUsdGhpcy5fcHJvdG9jb2xzPXQsdGhpcy5fb3B0aW9ucz1uLHRoaXMuX29wdGlvbnMuc3RhcnRDbG9zZWQmJih0aGlzLl9zaG91bGRSZWNvbm5lY3Q9ITEpLHRoaXMuX2Nvbm5lY3QoKX1zdGF0aWMgZ2V0IENPTk5FQ1RJTkcoKXtyZXR1cm4gMH1zdGF0aWMgZ2V0IE9QRU4oKXtyZXR1cm4gMX1zdGF0aWMgZ2V0IENMT1NJTkcoKXtyZXR1cm4gMn1zdGF0aWMgZ2V0IENMT1NFRCgpe3JldHVybiAzfWdldCBDT05ORUNUSU5HKCl7cmV0dXJuIG8uQ09OTkVDVElOR31nZXQgT1BFTigpe3JldHVybiBvLk9QRU59Z2V0IENMT1NJTkcoKXtyZXR1cm4gby5DTE9TSU5HfWdldCBDTE9TRUQoKXtyZXR1cm4gby5DTE9TRUR9Z2V0IGJpbmFyeVR5cGUoKXtyZXR1cm4gdGhpcy5fd3M/dGhpcy5fd3MuYmluYXJ5VHlwZTp0aGlzLl9iaW5hcnlUeXBlfXNldCBiaW5hcnlUeXBlKGUpe3RoaXMuX2JpbmFyeVR5cGU9ZSx0aGlzLl93cyYmKHRoaXMuX3dzLmJpbmFyeVR5cGU9ZSl9Z2V0IHJldHJ5Q291bnQoKXtyZXR1cm4gTWF0aC5tYXgodGhpcy5fcmV0cnlDb3VudCwwKX1nZXQgYnVmZmVyZWRBbW91bnQoKXtyZXR1cm4gdGhpcy5fbWVzc2FnZVF1ZXVlLnJlZHVjZSgodCxuKT0+KHR5cGVvZiBuPT1cInN0cmluZ1wiP3QrPW4ubGVuZ3RoOm4gaW5zdGFuY2VvZiBCbG9iP3QrPW4uc2l6ZTp0Kz1uLmJ5dGVMZW5ndGgsdCksMCkrKHRoaXMuX3dzP3RoaXMuX3dzLmJ1ZmZlcmVkQW1vdW50OjApfWdldCBleHRlbnNpb25zKCl7cmV0dXJuIHRoaXMuX3dzP3RoaXMuX3dzLmV4dGVuc2lvbnM6XCJcIn1nZXQgcHJvdG9jb2woKXtyZXR1cm4gdGhpcy5fd3M/dGhpcy5fd3MucHJvdG9jb2w6XCJcIn1nZXQgcmVhZHlTdGF0ZSgpe3JldHVybiB0aGlzLl93cz90aGlzLl93cy5yZWFkeVN0YXRlOnRoaXMuX29wdGlvbnMuc3RhcnRDbG9zZWQ/by5DTE9TRUQ6by5DT05ORUNUSU5HfWdldCB1cmwoKXtyZXR1cm4gdGhpcy5fd3M/dGhpcy5fd3MudXJsOlwiXCJ9b25jbG9zZTtvbmVycm9yO29ubWVzc2FnZTtvbm9wZW47Y2xvc2UoZT0xZTMsdCl7aWYodGhpcy5fY2xvc2VDYWxsZWQ9ITAsdGhpcy5fc2hvdWxkUmVjb25uZWN0PSExLHRoaXMuX2NsZWFyVGltZW91dHMoKSwhdGhpcy5fd3Mpe3RoaXMuX2RlYnVnKFwiY2xvc2UgZW5xdWV1ZWQ6IG5vIHdzIGluc3RhbmNlXCIpO3JldHVybn1pZih0aGlzLl93cy5yZWFkeVN0YXRlPT09dGhpcy5DTE9TRUQpe3RoaXMuX2RlYnVnKFwiY2xvc2U6IGFscmVhZHkgY2xvc2VkXCIpO3JldHVybn10aGlzLl93cy5jbG9zZShlLHQpfXJlY29ubmVjdChlLHQpe3RoaXMuX3Nob3VsZFJlY29ubmVjdD0hMCx0aGlzLl9jbG9zZUNhbGxlZD0hMSx0aGlzLl9yZXRyeUNvdW50PS0xLCF0aGlzLl93c3x8dGhpcy5fd3MucmVhZHlTdGF0ZT09PXRoaXMuQ0xPU0VEP3RoaXMuX2Nvbm5lY3QoKToodGhpcy5fZGlzY29ubmVjdChlLHQpLHRoaXMuX2Nvbm5lY3QoKSl9c2VuZChlKXtpZih0aGlzLl93cyYmdGhpcy5fd3MucmVhZHlTdGF0ZT09PXRoaXMuT1BFTil0aGlzLl9kZWJ1ZyhcInNlbmRcIixlKSx0aGlzLl93cy5zZW5kKGUpO2Vsc2V7bGV0e21heEVucXVldWVkTWVzc2FnZXM6dD1hLm1heEVucXVldWVkTWVzc2FnZXN9PXRoaXMuX29wdGlvbnM7dGhpcy5fbWVzc2FnZVF1ZXVlLmxlbmd0aDx0JiYodGhpcy5fZGVidWcoXCJlbnF1ZXVlXCIsZSksdGhpcy5fbWVzc2FnZVF1ZXVlLnB1c2goZSkpfX1hZGRFdmVudExpc3RlbmVyKGUsdCl7dGhpcy5fbGlzdGVuZXJzW2VdJiZ0aGlzLl9saXN0ZW5lcnNbZV0ucHVzaCh0KX1kaXNwYXRjaEV2ZW50KGUpe2xldCB0PXRoaXMuX2xpc3RlbmVyc1tlLnR5cGVdO2lmKHQpZm9yKGxldCBuIG9mIHQpdGhpcy5fY2FsbEV2ZW50TGlzdGVuZXIoZSxuKTtyZXR1cm4hMH1yZW1vdmVFdmVudExpc3RlbmVyKGUsdCl7dGhpcy5fbGlzdGVuZXJzW2VdJiYodGhpcy5fbGlzdGVuZXJzW2VdPXRoaXMuX2xpc3RlbmVyc1tlXS5maWx0ZXIobj0+biE9PXQpKX1fZGVidWcoLi4uZSl7dGhpcy5fb3B0aW9ucy5kZWJ1ZyYmY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSxbXCJSV1M+XCIsLi4uZV0pfV9nZXROZXh0RGVsYXkoKXtsZXR7cmVjb25uZWN0aW9uRGVsYXlHcm93RmFjdG9yOmU9YS5yZWNvbm5lY3Rpb25EZWxheUdyb3dGYWN0b3IsbWluUmVjb25uZWN0aW9uRGVsYXk6dD1hLm1pblJlY29ubmVjdGlvbkRlbGF5LG1heFJlY29ubmVjdGlvbkRlbGF5Om49YS5tYXhSZWNvbm5lY3Rpb25EZWxheX09dGhpcy5fb3B0aW9ucyxyPTA7cmV0dXJuIHRoaXMuX3JldHJ5Q291bnQ+MCYmKHI9dCpNYXRoLnBvdyhlLHRoaXMuX3JldHJ5Q291bnQtMSkscj5uJiYocj1uKSksdGhpcy5fZGVidWcoXCJuZXh0IGRlbGF5XCIscikscn1fd2FpdCgpe3JldHVybiBuZXcgUHJvbWlzZShlPT57c2V0VGltZW91dChlLHRoaXMuX2dldE5leHREZWxheSgpKX0pfV9nZXROZXh0VXJsKGUpe2lmKHR5cGVvZiBlPT1cInN0cmluZ1wiKXJldHVybiBQcm9taXNlLnJlc29sdmUoZSk7aWYodHlwZW9mIGU9PVwiZnVuY3Rpb25cIil7bGV0IHQ9ZSgpO2lmKHR5cGVvZiB0PT1cInN0cmluZ1wiKXJldHVybiBQcm9taXNlLnJlc29sdmUodCk7aWYodC50aGVuKXJldHVybiB0fXRocm93IEVycm9yKFwiSW52YWxpZCBVUkxcIil9X2Nvbm5lY3QoKXtpZih0aGlzLl9jb25uZWN0TG9ja3x8IXRoaXMuX3Nob3VsZFJlY29ubmVjdClyZXR1cm47dGhpcy5fY29ubmVjdExvY2s9ITA7bGV0e21heFJldHJpZXM6ZT1hLm1heFJldHJpZXMsY29ubmVjdGlvblRpbWVvdXQ6dD1hLmNvbm5lY3Rpb25UaW1lb3V0LFdlYlNvY2tldDpuPVMoKX09dGhpcy5fb3B0aW9ucztpZih0aGlzLl9yZXRyeUNvdW50Pj1lKXt0aGlzLl9kZWJ1ZyhcIm1heCByZXRyaWVzIHJlYWNoZWRcIix0aGlzLl9yZXRyeUNvdW50LFwiPj1cIixlKTtyZXR1cm59aWYodGhpcy5fcmV0cnlDb3VudCsrLHRoaXMuX2RlYnVnKFwiY29ubmVjdFwiLHRoaXMuX3JldHJ5Q291bnQpLHRoaXMuX3JlbW92ZUxpc3RlbmVycygpLCFPKG4pKXRocm93IEVycm9yKFwiTm8gdmFsaWQgV2ViU29ja2V0IGNsYXNzIHByb3ZpZGVkXCIpO3RoaXMuX3dhaXQoKS50aGVuKCgpPT50aGlzLl9nZXROZXh0VXJsKHRoaXMuX3VybCkpLnRoZW4oYXN5bmMgcj0+e3RoaXMuX2Nsb3NlQ2FsbGVkfHwodGhpcy5fZGVidWcoXCJjb25uZWN0XCIse3VybDpyLHByb3RvY29sczp0aGlzLl9wcm90b2NvbHN9KSx0aGlzLl93cz10aGlzLl9wcm90b2NvbHM/bmV3IG4ocix0aGlzLl9wcm90b2NvbHMpOm5ldyBuKHIpLHRoaXMuX3dzLmJpbmFyeVR5cGU9dGhpcy5fYmluYXJ5VHlwZSx0aGlzLl9jb25uZWN0TG9jaz0hMSx0aGlzLl9hZGRMaXN0ZW5lcnMoKSx0aGlzLl9jb25uZWN0VGltZW91dD1zZXRUaW1lb3V0KCgpPT50aGlzLl9oYW5kbGVUaW1lb3V0KCksdCkpfSl9X2hhbmRsZVRpbWVvdXQoKXt0aGlzLl9kZWJ1ZyhcInRpbWVvdXQgZXZlbnRcIiksdGhpcy5faGFuZGxlRXJyb3IobmV3IHAoRXJyb3IoXCJUSU1FT1VUXCIpLHRoaXMpKX1fZGlzY29ubmVjdChlPTFlMyx0KXtpZih0aGlzLl9jbGVhclRpbWVvdXRzKCksISF0aGlzLl93cyl7dGhpcy5fcmVtb3ZlTGlzdGVuZXJzKCk7dHJ5e3RoaXMuX3dzLmNsb3NlKGUsdCksdGhpcy5faGFuZGxlQ2xvc2UobmV3IHUoZSx0LHRoaXMpKX1jYXRjaHt9fX1fYWNjZXB0T3Blbigpe3RoaXMuX2RlYnVnKFwiYWNjZXB0IG9wZW5cIiksdGhpcy5fcmV0cnlDb3VudD0wfV9jYWxsRXZlbnRMaXN0ZW5lcihlLHQpe1wiaGFuZGxlRXZlbnRcImluIHQ/dC5oYW5kbGVFdmVudChlKTp0KGUpfV9oYW5kbGVPcGVuPWU9Pnt0aGlzLl9kZWJ1ZyhcIm9wZW4gZXZlbnRcIik7bGV0e21pblVwdGltZTp0PWEubWluVXB0aW1lfT10aGlzLl9vcHRpb25zO2NsZWFyVGltZW91dCh0aGlzLl9jb25uZWN0VGltZW91dCksdGhpcy5fdXB0aW1lVGltZW91dD1zZXRUaW1lb3V0KCgpPT50aGlzLl9hY2NlcHRPcGVuKCksdCksdGhpcy5fd3MuYmluYXJ5VHlwZT10aGlzLl9iaW5hcnlUeXBlLHRoaXMuX21lc3NhZ2VRdWV1ZS5mb3JFYWNoKG49Pnt2YXIgcjtyZXR1cm4ocj10aGlzLl93cyk9PW51bGw/dm9pZCAwOnIuc2VuZChuKX0pLHRoaXMuX21lc3NhZ2VRdWV1ZT1bXSx0aGlzLm9ub3BlbiYmdGhpcy5vbm9wZW4oZSksdGhpcy5fbGlzdGVuZXJzLm9wZW4uZm9yRWFjaChuPT50aGlzLl9jYWxsRXZlbnRMaXN0ZW5lcihlLG4pKX07X2hhbmRsZU1lc3NhZ2U9ZT0+e3RoaXMuX2RlYnVnKFwibWVzc2FnZSBldmVudFwiKSx0aGlzLm9ubWVzc2FnZSYmdGhpcy5vbm1lc3NhZ2UoZSksdGhpcy5fbGlzdGVuZXJzLm1lc3NhZ2UuZm9yRWFjaCh0PT50aGlzLl9jYWxsRXZlbnRMaXN0ZW5lcihlLHQpKX07X2hhbmRsZUVycm9yPWU9Pnt0aGlzLl9kZWJ1ZyhcImVycm9yIGV2ZW50XCIsZS5tZXNzYWdlKSx0aGlzLl9kaXNjb25uZWN0KHZvaWQgMCxlLm1lc3NhZ2U9PT1cIlRJTUVPVVRcIj9cInRpbWVvdXRcIjp2b2lkIDApLHRoaXMub25lcnJvciYmdGhpcy5vbmVycm9yKGUpLHRoaXMuX2RlYnVnKFwiZXhlYyBlcnJvciBsaXN0ZW5lcnNcIiksdGhpcy5fbGlzdGVuZXJzLmVycm9yLmZvckVhY2godD0+dGhpcy5fY2FsbEV2ZW50TGlzdGVuZXIoZSx0KSksdGhpcy5fY29ubmVjdCgpfTtfaGFuZGxlQ2xvc2U9ZT0+e3RoaXMuX2RlYnVnKFwiY2xvc2UgZXZlbnRcIiksdGhpcy5fY2xlYXJUaW1lb3V0cygpLHRoaXMuX3Nob3VsZFJlY29ubmVjdCYmdGhpcy5fY29ubmVjdCgpLHRoaXMub25jbG9zZSYmdGhpcy5vbmNsb3NlKGUpLHRoaXMuX2xpc3RlbmVycy5jbG9zZS5mb3JFYWNoKHQ9PnRoaXMuX2NhbGxFdmVudExpc3RlbmVyKGUsdCkpfTtfcmVtb3ZlTGlzdGVuZXJzKCl7IXRoaXMuX3dzfHwodGhpcy5fZGVidWcoXCJyZW1vdmVMaXN0ZW5lcnNcIiksdGhpcy5fd3MucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9wZW5cIix0aGlzLl9oYW5kbGVPcGVuKSx0aGlzLl93cy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xvc2VcIix0aGlzLl9oYW5kbGVDbG9zZSksdGhpcy5fd3MucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIix0aGlzLl9oYW5kbGVNZXNzYWdlKSx0aGlzLl93cy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIix0aGlzLl9oYW5kbGVFcnJvcikpfV9hZGRMaXN0ZW5lcnMoKXshdGhpcy5fd3N8fCh0aGlzLl9kZWJ1ZyhcImFkZExpc3RlbmVyc1wiKSx0aGlzLl93cy5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLHRoaXMuX2hhbmRsZU9wZW4pLHRoaXMuX3dzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLHRoaXMuX2hhbmRsZUNsb3NlKSx0aGlzLl93cy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLHRoaXMuX2hhbmRsZU1lc3NhZ2UpLHRoaXMuX3dzLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLHRoaXMuX2hhbmRsZUVycm9yKSl9X2NsZWFyVGltZW91dHMoKXtjbGVhclRpbWVvdXQodGhpcy5fY29ubmVjdFRpbWVvdXQpLGNsZWFyVGltZW91dCh0aGlzLl91cHRpbWVUaW1lb3V0KX19O3ZhciBkPUpTT04ucGFyc2UoJ3tcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicG9ydFwiOjUwNjM5LFwic2VjdXJlXCI6ZmFsc2UsXCJidW5kbGVJZFwiOlwiNjJhMjJjYzgzZDAzM2JmMFwiLFwic2VydmVyUG9ydFwiOjUwNjM4fScpO2Z1bmN0aW9uIE4oKXtyZXR1cm4gZC5ob3N0fHwobG9jYXRpb24ucHJvdG9jb2wuaW5kZXhPZihcImh0dHBcIik9PT0wP2xvY2F0aW9uLmhvc3RuYW1lOlwibG9jYWxob3N0XCIpfWZ1bmN0aW9uIGsoKXtyZXR1cm4gZC5wb3J0fHxsb2NhdGlvbi5wb3J0fXZhciBiPW1vZHVsZS5idW5kbGUucGFyZW50LHc7aWYoKCFifHwhYi5pc1BhcmNlbFJlcXVpcmUpJiZ0eXBlb2YgV2ViU29ja2V0PFwidVwiKXtsZXQgcz17cmVjb25uZWN0aW5nOiEwfSxlPU4oKSx0PWsoKSxuPWQuc2VjdXJlfHxsb2NhdGlvbi5wcm90b2NvbD09PVwiaHR0cHM6XCImJiEvbG9jYWxob3N0fDEyNy4wLjAuMXwwLjAuMC4wLy50ZXN0KGUpP1wid3NzXCI6XCJ3c1wiOyh3PWNocm9tZT09bnVsbD92b2lkIDA6Y2hyb21lLnJ1bnRpbWUpIT1udWxsJiZ3Lmxhc3RFcnJvciYmbG9jYXRpb24ucmVsb2FkKCk7bGV0IHI9bmV3IG8oYCR7bn06Ly8ke2V9OiR7dH0vYCk7ci5vbm1lc3NhZ2U9YXN5bmMgZnVuY3Rpb24oYyl7dmFyIHY7aWYoIWNocm9tZS5ydW50aW1lLmlkKXJldHVybjtsZXQgbD1KU09OLnBhcnNlKGMuZGF0YSk7aWYobC50eXBlPT09XCJ1cGRhdGVcIiYmKGwuYXNzZXRzLmZpbHRlcihpPT5pLnR5cGU9PT1cImpzb25cIikubGVuZ3RoPjA/dHlwZW9mKCh2PWNocm9tZT09bnVsbD92b2lkIDA6Y2hyb21lLnJ1bnRpbWUpPT1udWxsP3ZvaWQgMDp2LnJlbG9hZCk9PVwiZnVuY3Rpb25cIj9jaHJvbWUucnVudGltZS5yZWxvYWQoKTooY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe19fcGFyY2VsX2htcl9yZWxvYWRfXzohMH0pLGxvY2F0aW9uLnJlbG9hZCgpKTp0eXBlb2YobG9jYXRpb249PW51bGw/dm9pZCAwOmxvY2F0aW9uLnJlbG9hZCk9PVwiZnVuY3Rpb25cIj9sb2NhdGlvbi5yZWxvYWQoKTpjaHJvbWUucnVudGltZS5yZWxvYWQoKSksbC50eXBlPT09XCJlcnJvclwiKWZvcihsZXQgaSBvZiBsLmRpYWdub3N0aWNzLmFuc2kpe2xldCBMPWkuY29kZWZyYW1lP2kuY29kZWZyYW1lOmkuc3RhY2s7XyhcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIitpLm1lc3NhZ2UrYFxuYCtMK2BcblxuYCtpLmhpbnRzLmpvaW4oYFxuYCkpfX0sci5vbmVycm9yPWZ1bmN0aW9uKGMpe3R5cGVvZiBjLm1lc3NhZ2U9PVwic3RyaW5nXCImJiFzLnJlY29ubmVjdGluZyYmeShcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIitjLm1lc3NhZ2UpfSxyLm9ub3Blbj1mdW5jdGlvbigpe3MucmVjb25uZWN0aW5nPSExLGYoXCJbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGVkIHRvIEhNUiBzZXJ2ZXJcIil9LHIub25jbG9zZT1mdW5jdGlvbigpe3MucmVjb25uZWN0aW5nfHwocy5yZWNvbm5lY3Rpbmc9ITAsXyhcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBDb25uZWN0aW9uIHRvIHRoZSBITVIgc2VydmVyIHdhcyBsb3N0LCB0cnlpbmcgdG8gcmVjb25uZWN0Li4uXCIpKX19XG4iLCJjb25zdCBwYWdlSW5zdGFuY2UgPSB7XG4gIGRhdGE6IHtcbiAgICBleHRlbnNpb25BY3RpdmU6IGZhbHNlLCAvLyDnu4Tku7bmmK/lkKbmv4DmtLtcbiAgICB1cmxDb25jYXRMaXN0OiBbXSxcbiAgICByZXF1ZXN0SGVhZGVyczogW10sXG4gICAgbW9ja0xpc3Q6IFtdLFxuICAgIG9yaWdpblhIUjogd2luZG93LlhNTEh0dHBSZXF1ZXN0LFxuICAgIHByaXZhdGVYSFI6IHdpbmRvdy5YTUxIdHRwUmVxdWVzdFxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc2V0UHJpdmF0ZVhIUigpIHtcbiAgICAgIGZ1bmN0aW9uIFByaXZhdGVYSFIoKSB7XG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBwYWdlSW5zdGFuY2UuZGF0YS5vcmlnaW5YSFIoKVxuICAgICAgICBmb3IgKGxldCBhdHRyIGluIHhocikge1xuICAgICAgICAgIGlmIChhdHRyID09PSBcIm9wZW5cIikge1xuICAgICAgICAgICAgLy8g6KaG55uWb3BlblxuICAgICAgICAgICAgcGFnZUluc3RhbmNlLm1ldGhvZHMub3ZlcndyaXRlT3Blbih4aHIpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhdHRyID09PSBcInNlbmRcIikge1xuICAgICAgICAgICAgLy8g6KaG55uWc2VuZFxuICAgICAgICAgICAgcGFnZUluc3RhbmNlLm1ldGhvZHMub3ZlcndyaXRlU2VuZCh4aHIpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhdHRyID09PSBcIm9ubG9hZFwiKSB7XG4gICAgICAgICAgICAvLyDlrprkuYlvbmxvYWRcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICBpZiAocGFnZUluc3RhbmNlLmRhdGEuZXh0ZW5zaW9uQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgLy8g5Luj55CG5o6l5Y+jXG4gICAgICAgICAgICAgICAgcGFnZUluc3RhbmNlLm1ldGhvZHMucHJveHlNb2NrTGlzdC5jYWxsKHRoaXMsIHhocilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLm9ubG9hZCAmJiB0aGlzLm9ubG9hZC5jYWxsKHRoaXMsIC4uLmFyZ3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXR0ciA9PT0gXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIikge1xuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25yZWFkeXN0YXRlY2hhbmdlICYmXG4gICAgICAgICAgICAgICAgdGhpcy5vbnJlYWR5c3RhdGVjaGFuZ2UuY2FsbCh0aGlzLCAuLi5hcmdzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiB4aHJbYXR0cl0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgLy8g6YeN6KaB77yM56Gu5L+dIG5ldyBQcml2YXRlWEhSIOS5i+WQju+8jOaWueazleaJp+ihjOeahHRoaXPmmK/mjIflkJEgeGhyIOeahFxuICAgICAgICAgICAgdGhpc1thdHRyXSA9IHhoclthdHRyXS5iaW5kKHhocilcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChbXCJyZXNwb25zZVwiLCBcInJlc3BvbnNlVGV4dFwiLCBcInN0YXR1c1wiXS5pbmNsdWRlcyhhdHRyKSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGF0dHIsIHtcbiAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4aHJbYF8ke2F0dHJ9YF0gfHwgeGhyW2F0dHJdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHhocltgXyR7YXR0cn1gXSA9IHZhbHVlXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBhdHRyLCB7XG4gICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geGhyW2F0dHJdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHhoclthdHRyXSA9IHZhbHVlXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwYWdlSW5zdGFuY2UuZGF0YS5wcml2YXRlWEhSID0gUHJpdmF0ZVhIUlxuICAgIH0sXG4gICAgLy8g6KaG55uWb3BlbuaWueazlVxuICAgIG92ZXJ3cml0ZU9wZW4oeGhyOiBYTUxIdHRwUmVxdWVzdCkge1xuICAgICAgeGhyLm9wZW4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICBpZiAocGFnZUluc3RhbmNlLmRhdGEuZXh0ZW5zaW9uQWN0aXZlKSB7XG4gICAgICAgICAgbGV0IHBhdGggPSBhcmdzWzFdXG4gICAgICAgICAgY29uc3QgdXJsU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpXG4gICAgICAgICAgcGFnZUluc3RhbmNlLmRhdGEudXJsQ29uY2F0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5jaGVja2VkICYmIGl0ZW0ua2V5ICYmIGl0ZW0udmFsdWUpIHtcbiAgICAgICAgICAgICAgdXJsU2VhcmNoUGFyYW1zLmFwcGVuZChpdGVtLmtleSwgaXRlbS52YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnN0IHBhcmFtc1N0ciA9IHVybFNlYXJjaFBhcmFtcy50b1N0cmluZygpXG4gICAgICAgICAgYXJnc1sxXSA9XG4gICAgICAgICAgICBwYXRoICtcbiAgICAgICAgICAgIChwYXJhbXNTdHIgPyAocGF0aC5pbmRleE9mKFwiP1wiKSA+IC0xID8gXCImXCIgOiBcIj9cIikgKyBwYXJhbXNTdHIgOiBcIlwiKVxuICAgICAgICB9XG4gICAgICAgIHBhZ2VJbnN0YW5jZS5kYXRhLm9yaWdpblhIUi5wcm90b3R5cGUub3Blbi5jYWxsKHRoaXMsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDopobnm5ZzZW5k5pa55rOVXG4gICAgb3ZlcndyaXRlU2VuZCh4aHI6IFhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgICB4aHIuc2VuZCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIC8vIOagueaNrumFjee9ruWinuWKoCByZXF1ZXN0IEhlYWRlciDlj4LmlbBcbiAgICAgICAgaWYgKHBhZ2VJbnN0YW5jZS5kYXRhLmV4dGVuc2lvbkFjdGl2ZSkge1xuICAgICAgICAgIHBhZ2VJbnN0YW5jZS5kYXRhLnJlcXVlc3RIZWFkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLmNoZWNrZWQgJiYgaXRlbS5rZXkgJiYgaXRlbS52YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLnNldFJlcXVlc3RIZWFkZXIoaXRlbS5rZXksIGl0ZW0udmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBwYWdlSW5zdGFuY2UuZGF0YS5vcmlnaW5YSFIucHJvdG90eXBlLnNlbmQuY2FsbCh0aGlzLCAuLi5hcmdzKVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5qC55o2ubW9ja0xpc3Qg5Luj55CG5o6l5Y+jXG4gICAgcHJveHlNb2NrTGlzdCh4aHI6IFhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgICBwYWdlSW5zdGFuY2UuZGF0YS5tb2NrTGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmNoZWNrZWQgJiYgaXRlbS5rZXkgJiYgaXRlbS52YWx1ZSkge1xuICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VVUkwuaW5kZXhPZihpdGVtLmtleSkgPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAyMDBcbiAgICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSBpdGVtLnZhbHVlXG4gICAgICAgICAgICB0aGlzLnJlc3BvbnNlVGV4dCA9IGl0ZW0udmFsdWVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPC0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS7o+eQhuaOpeWPo++8mlwiLCB4aHIucmVzcG9uc2VVUkwpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1vY2vmlbDmja7vvJpcIiwgaXRlbS52YWx1ZSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0+XCIpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICBwYWdlSW5zdGFuY2UubWV0aG9kcy5zZXRQcml2YXRlWEhSKClcbiAgfVxufVxuLy8g5Yid5aeL5YyWXG5wYWdlSW5zdGFuY2UubW91bnRlZCgpXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaW5qZWN0ZWRTY3JpcHRcIiwgKGUpID0+IHtcbiAgaWYgKFxuICAgIE9iamVjdC5rZXlzKHBhZ2VJbnN0YW5jZS5kYXRhKS5maW5kKChpdGVtKSA9PiBpdGVtID09PSBlLmRldGFpbD8uZGF0YU5hbWUpXG4gICkge1xuICAgIHBhZ2VJbnN0YW5jZS5kYXRhW2UuZGV0YWlsLmRhdGFOYW1lXSA9IGUuZGV0YWlsPy5kYXRhXG4gICAgaWYgKHBhZ2VJbnN0YW5jZS5kYXRhLmV4dGVuc2lvbkFjdGl2ZSkge1xuICAgICAgLy8g5pu/5o2iIFhIUlxuICAgICAgd2luZG93LlhNTEh0dHBSZXF1ZXN0ID0gcGFnZUluc3RhbmNlLmRhdGEucHJpdmF0ZVhIUlxuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPSBwYWdlSW5zdGFuY2UuZGF0YS5vcmlnaW5YSFJcbiAgICB9XG4gIH1cbiAgLy8gY29uc29sZS5sb2coXCJpbmplY3RlZFNjcmlwdCDmjqXlj5fmlbDmja46XCIsIGUuZGV0YWlsKVxufSlcbiJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJpbmplY3RlZFNjcmlwdC4zZDAzM2JmMC5qcy5tYXAifQ==
