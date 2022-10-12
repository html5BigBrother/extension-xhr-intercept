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
})({"bmiTW":[function(require,module,exports) {
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
var d = JSON.parse('{"host":"localhost","port":1815,"secure":false,"bundleId":"9f49c38c61466ce0","serverPort":49916}');
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

},{}],"dyvIB":[function(require,module,exports) {
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
                            if (pageInstance.data.extensionActive) // 如果 readyState = 4，则代理接口
                            xhr.readyState === this.DONE && pageInstance.methods.proxyMockList.call(this, xhr);
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
                        if (!this.hasMocked) {
                            // 避免重复打印console
                            this.hasMocked = true;
                            console.log("<--------------------");
                            console.log("代理接口：", xhr.responseURL);
                            console.log("mock数据：", item.value);
                            console.log("-------------------->");
                        }
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

},{}]},["bmiTW","dyvIB"], "dyvIB", "parcelRequire2015")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQUEsUUFBUSxDQUFDO0lBQUEsWUFBWSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7UUFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsVUFBVSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBRyxDQUFBLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtLQUFDO0lBQUEsV0FBVyxVQUFVLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQTtLQUFDO0lBQUEsV0FBVyxJQUFJLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQTtLQUFDO0lBQUEsV0FBVyxPQUFPLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQTtLQUFDO0lBQUEsV0FBVyxNQUFNLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQTtLQUFDO0lBQUEsSUFBSSxVQUFVLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUE7S0FBQztJQUFBLElBQUksSUFBSSxHQUFFO1FBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFBO0tBQUM7SUFBQSxJQUFJLE9BQU8sR0FBRTtRQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQTtLQUFDO0lBQUEsSUFBSSxNQUFNLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUE7S0FBQztJQUFBLElBQUksVUFBVSxHQUFFO1FBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUE7S0FBQztJQUFBLElBQUksVUFBVSxDQUFDLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLElBQUcsQ0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUEsQUFBQztLQUFDO0lBQUEsSUFBSSxVQUFVLEdBQUU7UUFBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxDQUFDLENBQUMsQ0FBQTtLQUFDO0lBQUEsSUFBSSxjQUFjLEdBQUU7UUFBQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBSSxDQUFBLE9BQU8sQ0FBQyxJQUFFLFFBQVEsR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLFlBQVksSUFBSSxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQSxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFDLENBQUMsQ0FBQSxBQUFDLENBQUE7S0FBQztJQUFBLElBQUksVUFBVSxHQUFFO1FBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFDLEVBQUUsQ0FBQTtLQUFDO0lBQUEsSUFBSSxRQUFRLEdBQUU7UUFBQyxPQUFPLElBQUksQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUMsRUFBRSxDQUFBO0tBQUM7SUFBQSxJQUFJLFVBQVUsR0FBRTtRQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxVQUFVLENBQUE7S0FBQztJQUFBLElBQUksR0FBRyxHQUFFO1FBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQTtLQUFDO0lBQUEsT0FBTyxDQUFDO0lBQUEsT0FBTyxDQUFDO0lBQUEsU0FBUyxDQUFDO0lBQUEsTUFBTSxDQUFDO0lBQUEsS0FBSyxDQUFDLENBQUMsR0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDO1FBQUMsSUFBRyxJQUFJLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDO1lBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQUEsT0FBTTtTQUFDO1FBQUEsSUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBRyxJQUFJLENBQUMsTUFBTSxFQUFDO1lBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQUEsT0FBTTtTQUFDO1FBQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztLQUFDO0lBQUEsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7UUFBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFlBQVksR0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxHQUFDLEVBQUUsRUFBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUUsQ0FBQSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUEsQUFBQztLQUFDO0lBQUEsSUFBSSxDQUFDLENBQUMsRUFBQztRQUFDLElBQUcsSUFBSSxDQUFDLEdBQUcsSUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBRyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQUk7WUFBQyxJQUFHLEVBQUMsbUJBQW1CLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQSxFQUFDLEdBQUMsSUFBSSxDQUFDLFFBQVEsQUFBQztZQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFDLENBQUMsSUFBRyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUM7U0FBQztLQUFDO0lBQUEsZ0JBQWdCLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQUM7SUFBQSxhQUFhLENBQUMsQ0FBQyxFQUFDO1FBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEFBQUM7UUFBQSxJQUFHLENBQUMsRUFBQyxLQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUEsT0FBTSxDQUFDLENBQUMsQ0FBQTtLQUFDO0lBQUEsbUJBQW1CLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQyxHQUFFLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQSxBQUFDO0tBQUM7SUFBQSxNQUFN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SUFBSSxDQUFDLFlBQVksSUFBRyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFDO2dCQUFDLEdBQUcsRUFBQyxDQUFDO2dCQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsVUFBVTthQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFDLElBQUksQ0FBQyxlQUFlLEdBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUM7U0FBQyxDQUFDO0tBQUM7SUFBQSxjQUFjLEdBQUU7UUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0tBQUM7SUFBQSxXQUFXLENBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUM7UUFBQyxJQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQztZQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQUEsSUFBRztnQkFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO2FBQUMsQ0FBQSxPQUFLLEVBQUU7U0FBQztLQUFDO0lBQUEsV0FBVyxHQUFFO1FBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxHQUFDLENBQUM7S0FBQztJQUFBLGtCQUFrQixDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7UUFBQyxhQUFhLElBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUFDO0lBQUEsV0FBVyxHQUFDLENBQUEsQ0FBQyxHQUFFO1FBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUFBLElBQUcsRUFBQyxTQUFTLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxTQUFTLENBQUEsRUFBQyxHQUFDLElBQUksQ0FBQyxRQUFRLEFBQUM7UUFBQSxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFDLElBQUksQ0FBQyxjQUFjLEdBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDLEdBQUU7WUFBQyxJQUFJLENBQUMsQUFBQztZQUFBLE9BQU0sQUFBQyxDQUFBLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFBLElBQUcsSUFBSSxHQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLGFBQWEsR0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLE1BQU0sSUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsR0FBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUMsQ0FBQztJQUFBLGNBQWMsR0FBQyxDQUFBLENBQUMsR0FBRTtRQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUMsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsR0FBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUMsQ0FBQztJQUFBLFlBQVksR0FBQyxDQUFBLENBQUMsR0FBRTtRQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUcsU0FBUyxHQUFDLFNBQVMsR0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxPQUFPLElBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQyxHQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFO0tBQUMsQ0FBQztJQUFBLFlBQVksR0FBQyxDQUFBLENBQUMsR0FBRTtRQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsSUFBSSxDQUFDLE9BQU8sSUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsR0FBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUMsQ0FBQztJQUFBLGdCQUFnQixHQUFFO1FBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFHLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQSxBQUFDO0tBQUM7SUFBQSxhQUFhLEdBQUU7UUFBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUcsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQSxBQUFDO0tBQUM7SUFBQSxjQUFjLEdBQUU7UUFBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO0tBQUM7Q0FBQyxBQUFDO0FBQUEsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrR0FBa0csQ0FBQyxBQUFDO0FBQUEsU0FBUyxDQUFDLEdBQUU7SUFBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUcsQ0FBQSxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBRyxDQUFDLEdBQUMsUUFBUSxDQUFDLFFBQVEsR0FBQyxXQUFXLENBQUEsQUFBQyxDQUFBO0NBQUM7QUFBQSxTQUFTLENBQUMsR0FBRTtJQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBRSxRQUFRLENBQUMsSUFBSSxDQUFBO0NBQUM7QUFBQSxJQUFJLENBQUMsR0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDLEFBQUM7QUFBQSxJQUFHLEFBQUMsQ0FBQSxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUEsSUFBRyxPQUFPLFNBQVMsR0FBQyxHQUFHLEVBQUM7SUFBQyxJQUFJLENBQUMsR0FBQztRQUFDLFlBQVksRUFBQyxDQUFDLENBQUM7S0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLElBQUUsUUFBUSxDQUFDLFFBQVEsS0FBRyxRQUFRLElBQUUsQ0FBQyw4QkFBOEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUssR0FBQyxJQUFJLEFBQUM7SUFBQyxDQUFBLENBQUMsR0FBQyxNQUFNLElBQUUsSUFBSSxHQUFDLEtBQUssQ0FBQyxHQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUEsSUFBRyxJQUFJLElBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFBQSxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDO0lBQUEsQ0FBQyxDQUFDLFNBQVMsR0FBQyxlQUFlLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQyxBQUFDO1FBQUEsSUFBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFDLE9BQU87UUFBQSxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQUFBQztRQUFBLElBQUcsQ0FBQyxDQUFDLElBQUksS0FBRyxRQUFRLElBQUcsQ0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsR0FBRSxDQUFDLENBQUMsSUFBSSxLQUFHLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsT0FBTyxDQUFBLEFBQUMsQ0FBQSxDQUFDLEdBQUMsTUFBTSxJQUFFLElBQUksR0FBQyxLQUFLLENBQUMsR0FBQyxNQUFNLENBQUMsT0FBTyxDQUFBLElBQUcsSUFBSSxHQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUEsQUFBQyxJQUFFLFVBQVUsR0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFFLENBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFBQyxxQkFBcUIsRUFBQyxDQUFDLENBQUM7U0FBQyxDQUFDLEVBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFBLEFBQUMsR0FBQyxPQUFPLENBQUEsUUFBUSxJQUFFLElBQUksR0FBQyxLQUFLLENBQUMsR0FBQyxRQUFRLENBQUMsTUFBTSxDQUFBLEFBQUMsSUFBRSxVQUFVLEdBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUEsQUFBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUcsT0FBTyxFQUFDLEtBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMs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QyxDQUFDO3lCQUN0QztxQkFDRjtpQkFBQSxBQUNGO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtJQUNELE9BQU8sSUFBRztRQUNSLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDdEM7Q0FDRixBQUFDO0FBQ0YsTUFBTTtBQUNOLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUV2QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLEdBQUs7SUFDL0MsSUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEVBQzFFO1FBQ0EsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO1FBQ3RELElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQ25DLFNBQVM7UUFDVCxNQUFNLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBRXJELE1BQU0sQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7S0FFdkQ7QUFDRCxnREFBZ0Q7Q0FDakQsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvQHBsYXNtb2hxL3BhcmNlbC1ydW50aW1lL2Rpc3QvcnVudGltZS0zYTU0NmRlY2IxMWM2YTkzLmpzIiwic3JjL2NvbnRlbnRzL2luamVjdGVkU2NyaXB0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBtPXR5cGVvZiBnbG9iYWxUaGlzLnByb2Nlc3M8XCJ1XCI/Z2xvYmFsVGhpcy5wcm9jZXNzLmFyZ3Y6W10sVD10eXBlb2YgZ2xvYmFsVGhpcy5wcm9jZXNzPFwidVwiP2dsb2JhbFRoaXMucHJvY2Vzcy5lbnY6e30seD1uZXcgU2V0KG0pLGc9cz0+eC5oYXMocyksRD1tLmZpbHRlcihzPT5zLnN0YXJ0c1dpdGgoXCItLVwiKSYmcy5pbmNsdWRlcyhcIj1cIikpLm1hcChzPT5zLnNwbGl0KFwiPVwiKSkucmVkdWNlKChzLFtlLHRdKT0+KHNbZV09dCxzKSx7fSk7dmFyIFI9ZyhcIi0tZHJ5LXJ1blwiKSxDPWcoXCItLXZlcmJvc2VcIil8fFQuVkVSQk9TRT09PVwidHJ1ZVwiO3ZhciBFPShzPVwiXCIsLi4uZSk9PmNvbnNvbGUubG9nKHMucGFkRW5kKDkpLFwifFwiLC4uLmUpO3ZhciB5PSguLi5zKT0+Y29uc29sZS5lcnJvcihcIlxcdXsxRjUzNH0gRVJST1JcIi5wYWRFbmQoOSksXCJ8XCIsLi4ucyksZj0oLi4ucyk9PkUoXCJcXHV7MUY1MzV9IElORk9cIiwuLi5zKSxfPSguLi5zKT0+RShcIlxcdXsxRjdFMH0gV0FSTlwiLC4uLnMpO3ZhciBoPWNsYXNze3RhcmdldDt0eXBlO2NvbnN0cnVjdG9yKGUsdCl7dGhpcy50YXJnZXQ9dCx0aGlzLnR5cGU9ZX19LHA9Y2xhc3MgZXh0ZW5kcyBoe21lc3NhZ2U7ZXJyb3I7Y29uc3RydWN0b3IoZSx0KXtzdXBlcihcImVycm9yXCIsdCksdGhpcy5tZXNzYWdlPWUubWVzc2FnZSx0aGlzLmVycm9yPWV9fSx1PWNsYXNzIGV4dGVuZHMgaHtjb2RlO3JlYXNvbjt3YXNDbGVhbj0hMDtjb25zdHJ1Y3RvcihlPTFlMyx0PVwiXCIsbil7c3VwZXIoXCJjbG9zZVwiLG4pLHRoaXMuY29kZT1lLHRoaXMucmVhc29uPXR9fTt2YXIgUz0oKT0+e2lmKHR5cGVvZiBnbG9iYWxUaGlzLldlYlNvY2tldDxcInVcIilyZXR1cm4gZ2xvYmFsVGhpcy5XZWJTb2NrZXR9LE89cz0+dHlwZW9mIHM8XCJ1XCImJiEhcyYmcy5DTE9TSU5HPT09MixhPXttYXhSZWNvbm5lY3Rpb25EZWxheToxZTQsbWluUmVjb25uZWN0aW9uRGVsYXk6MWUzK01hdGgucmFuZG9tKCkqNGUzLG1pblVwdGltZTo1ZTMscmVjb25uZWN0aW9uRGVsYXlHcm93RmFjdG9yOjEuMyxjb25uZWN0aW9uVGltZW91dDo0ZTMsbWF4UmV0cmllczoxLzAsbWF4RW5xdWV1ZWRNZXNzYWdlczoxLzAsc3RhcnRDbG9zZWQ6ITEsZGVidWc6ITF9LG89Y2xhc3N7X3dzO19saXN0ZW5lcnM9e2Vycm9yOltdLG1lc3NhZ2U6W10sb3BlbjpbXSxjbG9zZTpbXX07X3JldHJ5Q291bnQ9LTE7X3VwdGltZVRpbWVvdXQ7X2Nvbm5lY3RUaW1lb3V0O19zaG91bGRSZWNvbm5lY3Q9ITA7X2Nvbm5lY3RMb2NrPSExO19iaW5hcnlUeXBlPVwiYmxvYlwiO19jbG9zZUNhbGxlZD0hMTtfbWVzc2FnZVF1ZXVlPVtdO191cmw7X3Byb3RvY29scztfb3B0aW9ucztjb25zdHJ1Y3RvcihlLHQsbj17fSl7dGhpcy5fdXJsPWUsdGhpcy5fcHJvdG9jb2xzPXQsdGhpcy5fb3B0aW9ucz1uLHRoaXMuX29wdGlvbnMuc3RhcnRDbG9zZWQmJih0aGlzLl9zaG91bGRSZWNvbm5lY3Q9ITEpLHRoaXMuX2Nvbm5lY3QoKX1zdGF0aWMgZ2V0IENPTk5FQ1RJTkcoKXtyZXR1cm4gMH1zdGF0aWMgZ2V0IE9QRU4oKXtyZXR1cm4gMX1zdGF0aWMgZ2V0IENMT1NJTkcoKXtyZXR1cm4gMn1zdGF0aWMgZ2V0IENMT1NFRCgpe3JldHVybiAzfWdldCBDT05ORUNUSU5HKCl7cmV0dXJuIG8uQ09OTkVDVElOR31nZXQgT1BFTigpe3JldHVybiBvLk9QRU59Z2V0IENMT1NJTkcoKXtyZXR1cm4gby5DTE9TSU5HfWdldCBDTE9TRUQoKXtyZXR1cm4gby5DTE9TRUR9Z2V0IGJpbmFyeVR5cGUoKXtyZXR1cm4gdGhpcy5fd3M/dGhpcy5fd3MuYmluYXJ5VHlwZTp0aGlzLl9iaW5hcnlUeXBlfXNldCBiaW5hcnlUeXBlKGUpe3RoaXMuX2JpbmFyeVR5cGU9ZSx0aGlzLl93cyYmKHRoaXMuX3dzLmJpbmFyeVR5cGU9ZSl9Z2V0IHJldHJ5Q291bnQoKXtyZXR1cm4gTWF0aC5tYXgodGhpcy5fcmV0cnlDb3VudCwwKX1nZXQgYnVmZmVyZWRBbW91bnQoKXtyZXR1cm4gdGhpcy5fbWVzc2FnZVF1ZXVlLnJlZHVjZSgodCxuKT0+KHR5cGVvZiBuPT1cInN0cmluZ1wiP3QrPW4ubGVuZ3RoOm4gaW5zdGFuY2VvZiBCbG9iP3QrPW4uc2l6ZTp0Kz1uLmJ5dGVMZW5ndGgsdCksMCkrKHRoaXMuX3dzP3RoaXMuX3dzLmJ1ZmZlcmVkQW1vdW50OjApfWdldCBleHRlbnNpb25zKCl7cmV0dXJuIHRoaXMuX3dzP3RoaXMuX3dzLmV4dGVuc2lvbnM6XCJcIn1nZXQgcHJvdG9jb2woKXtyZXR1cm4gdGhpcy5fd3M/dGhpcy5fd3MucHJvdG9jb2w6XCJcIn1nZXQgcmVhZHlTdGF0ZSgpe3JldHVybiB0aGlzLl93cz90aGlzLl93cy5yZWFkeVN0YXRlOnRoaXMuX29wdGlvbnMuc3RhcnRDbG9zZWQ/by5DTE9TRUQ6by5DT05ORUNUSU5HfWdldCB1cmwoKXtyZXR1cm4gdGhpcy5fd3M/dGhpcy5fd3MudXJsOlwiXCJ9b25jbG9zZTtvbmVycm9yO29ubWVzc2FnZTtvbm9wZW47Y2xvc2UoZT0xZTMsdCl7aWYodGhpcy5fY2xvc2VDYWxsZWQ9ITAsdGhpcy5fc2hvdWxkUmVjb25uZWN0PSExLHRoaXMuX2NsZWFyVGltZW91dHMoKSwhdGhpcy5fd3Mpe3RoaXMuX2RlYnVnKFwiY2xvc2UgZW5xdWV1ZWQ6IG5vIHdzIGluc3RhbmNlXCIpO3JldHVybn1pZih0aGlzLl93cy5yZWFkeVN0YXRlPT09dGhpcy5DTE9TRUQpe3RoaXMuX2RlYnVnKFwiY2xvc2U6IGFscmVhZHkgY2xvc2VkXCIpO3JldHVybn10aGlzLl93cy5jbG9zZShlLHQpfXJlY29ubmVjdChlLHQpe3RoaXMuX3Nob3VsZFJlY29ubmVjdD0hMCx0aGlzLl9jbG9zZUNhbGxlZD0hMSx0aGlzLl9yZXRyeUNvdW50PS0xLCF0aGlzLl93c3x8dGhpcy5fd3MucmVhZHlTdGF0ZT09PXRoaXMuQ0xPU0VEP3RoaXMuX2Nvbm5lY3QoKToodGhpcy5fZGlzY29ubmVjdChlLHQpLHRoaXMuX2Nvbm5lY3QoKSl9c2VuZChlKXtpZih0aGlzLl93cyYmdGhpcy5fd3MucmVhZHlTdGF0ZT09PXRoaXMuT1BFTil0aGlzLl9kZWJ1ZyhcInNlbmRcIixlKSx0aGlzLl93cy5zZW5kKGUpO2Vsc2V7bGV0e21heEVucXVldWVkTWVzc2FnZXM6dD1hLm1heEVucXVldWVkTWVzc2FnZXN9PXRoaXMuX29wdGlvbnM7dGhpcy5fbWVzc2FnZVF1ZXVlLmxlbmd0aDx0JiYodGhpcy5fZGVidWcoXCJlbnF1ZXVlXCIsZSksdGhpcy5fbWVzc2FnZVF1ZXVlLnB1c2goZSkpfX1hZGRFdmVudExpc3RlbmVyKGUsdCl7dGhpcy5fbGlzdGVuZXJzW2VdJiZ0aGlzLl9saXN0ZW5lcnNbZV0ucHVzaCh0KX1kaXNwYXRjaEV2ZW50KGUpe2xldCB0PXRoaXMuX2xpc3RlbmVyc1tlLnR5cGVdO2lmKHQpZm9yKGxldCBuIG9mIHQpdGhpcy5fY2FsbEV2ZW50TGlzdGVuZXIoZSxuKTtyZXR1cm4hMH1yZW1vdmVFdmVudExpc3RlbmVyKGUsdCl7dGhpcy5fbGlzdGVuZXJzW2VdJiYodGhpcy5fbGlzdGVuZXJzW2VdPXRoaXMuX2xpc3RlbmVyc1tlXS5maWx0ZXIobj0+biE9PXQpKX1fZGVidWcoLi4uZSl7dGhpcy5fb3B0aW9ucy5kZWJ1ZyYmY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSxbXCJSV1M+XCIsLi4uZV0pfV9nZXROZXh0RGVsYXkoKXtsZXR7cmVjb25uZWN0aW9uRGVsYXlHcm93RmFjdG9yOmU9YS5yZWNvbm5lY3Rpb25EZWxheUdyb3dGYWN0b3IsbWluUmVjb25uZWN0aW9uRGVsYXk6dD1hLm1pblJlY29ubmVjdGlvbkRlbGF5LG1heFJlY29ubmVjdGlvbkRlbGF5Om49YS5tYXhSZWNvbm5lY3Rpb25EZWxheX09dGhpcy5fb3B0aW9ucyxyPTA7cmV0dXJuIHRoaXMuX3JldHJ5Q291bnQ+MCYmKHI9dCpNYXRoLnBvdyhlLHRoaXMuX3JldHJ5Q291bnQtMSkscj5uJiYocj1uKSksdGhpcy5fZGVidWcoXCJuZXh0IGRlbGF5XCIscikscn1fd2FpdCgpe3JldHVybiBuZXcgUHJvbWlzZShlPT57c2V0VGltZW91dChlLHRoaXMuX2dldE5leHREZWxheSgpKX0pfV9nZXROZXh0VXJsKGUpe2lmKHR5cGVvZiBlPT1cInN0cmluZ1wiKXJldHVybiBQcm9taXNlLnJlc29sdmUoZSk7aWYodHlwZW9mIGU9PVwiZnVuY3Rpb25cIil7bGV0IHQ9ZSgpO2lmKHR5cGVvZiB0PT1cInN0cmluZ1wiKXJldHVybiBQcm9taXNlLnJlc29sdmUodCk7aWYodC50aGVuKXJldHVybiB0fXRocm93IEVycm9yKFwiSW52YWxpZCBVUkxcIil9X2Nvbm5lY3QoKXtpZih0aGlzLl9jb25uZWN0TG9ja3x8IXRoaXMuX3Nob3VsZFJlY29ubmVjdClyZXR1cm47dGhpcy5fY29ubmVjdExvY2s9ITA7bGV0e21heFJldHJpZXM6ZT1hLm1heFJldHJpZXMsY29ubmVjdGlvblRpbWVvdXQ6dD1hLmNvbm5lY3Rpb25UaW1lb3V0LFdlYlNvY2tldDpuPVMoKX09dGhpcy5fb3B0aW9ucztpZih0aGlzLl9yZXRyeUNvdW50Pj1lKXt0aGlzLl9kZWJ1ZyhcIm1heCByZXRyaWVzIHJlYWNoZWRcIix0aGlzLl9yZXRyeUNvdW50LFwiPj1cIixlKTtyZXR1cm59aWYodGhpcy5fcmV0cnlDb3VudCsrLHRoaXMuX2RlYnVnKFwiY29ubmVjdFwiLHRoaXMuX3JldHJ5Q291bnQpLHRoaXMuX3JlbW92ZUxpc3RlbmVycygpLCFPKG4pKXRocm93IEVycm9yKFwiTm8gdmFsaWQgV2ViU29ja2V0IGNsYXNzIHByb3ZpZGVkXCIpO3RoaXMuX3dhaXQoKS50aGVuKCgpPT50aGlzLl9nZXROZXh0VXJsKHRoaXMuX3VybCkpLnRoZW4oYXN5bmMgcj0+e3RoaXMuX2Nsb3NlQ2FsbGVkfHwodGhpcy5fZGVidWcoXCJjb25uZWN0XCIse3VybDpyLHByb3RvY29sczp0aGlzLl9wcm90b2NvbHN9KSx0aGlzLl93cz10aGlzLl9wcm90b2NvbHM/bmV3IG4ocix0aGlzLl9wcm90b2NvbHMpOm5ldyBuKHIpLHRoaXMuX3dzLmJpbmFyeVR5cGU9dGhpcy5fYmluYXJ5VHlwZSx0aGlzLl9jb25uZWN0TG9jaz0hMSx0aGlzLl9hZGRMaXN0ZW5lcnMoKSx0aGlzLl9jb25uZWN0VGltZW91dD1zZXRUaW1lb3V0KCgpPT50aGlzLl9oYW5kbGVUaW1lb3V0KCksdCkpfSl9X2hhbmRsZVRpbWVvdXQoKXt0aGlzLl9kZWJ1ZyhcInRpbWVvdXQgZXZlbnRcIiksdGhpcy5faGFuZGxlRXJyb3IobmV3IHAoRXJyb3IoXCJUSU1FT1VUXCIpLHRoaXMpKX1fZGlzY29ubmVjdChlPTFlMyx0KXtpZih0aGlzLl9jbGVhclRpbWVvdXRzKCksISF0aGlzLl93cyl7dGhpcy5fcmVtb3ZlTGlzdGVuZXJzKCk7dHJ5e3RoaXMuX3dzLmNsb3NlKGUsdCksdGhpcy5faGFuZGxlQ2xvc2UobmV3IHUoZSx0LHRoaXMpKX1jYXRjaHt9fX1fYWNjZXB0T3Blbigpe3RoaXMuX2RlYnVnKFwiYWNjZXB0IG9wZW5cIiksdGhpcy5fcmV0cnlDb3VudD0wfV9jYWxsRXZlbnRMaXN0ZW5lcihlLHQpe1wiaGFuZGxlRXZlbnRcImluIHQ/dC5oYW5kbGVFdmVudChlKTp0KGUpfV9oYW5kbGVPcGVuPWU9Pnt0aGlzLl9kZWJ1ZyhcIm9wZW4gZXZlbnRcIik7bGV0e21pblVwdGltZTp0PWEubWluVXB0aW1lfT10aGlzLl9vcHRpb25zO2NsZWFyVGltZW91dCh0aGlzLl9jb25uZWN0VGltZW91dCksdGhpcy5fdXB0aW1lVGltZW91dD1zZXRUaW1lb3V0KCgpPT50aGlzLl9hY2NlcHRPcGVuKCksdCksdGhpcy5fd3MuYmluYXJ5VHlwZT10aGlzLl9iaW5hcnlUeXBlLHRoaXMuX21lc3NhZ2VRdWV1ZS5mb3JFYWNoKG49Pnt2YXIgcjtyZXR1cm4ocj10aGlzLl93cyk9PW51bGw/dm9pZCAwOnIuc2VuZChuKX0pLHRoaXMuX21lc3NhZ2VRdWV1ZT1bXSx0aGlzLm9ub3BlbiYmdGhpcy5vbm9wZW4oZSksdGhpcy5fbGlzdGVuZXJzLm9wZW4uZm9yRWFjaChuPT50aGlzLl9jYWxsRXZlbnRMaXN0ZW5lcihlLG4pKX07X2hhbmRsZU1lc3NhZ2U9ZT0+e3RoaXMuX2RlYnVnKFwibWVzc2FnZSBldmVudFwiKSx0aGlzLm9ubWVzc2FnZSYmdGhpcy5vbm1lc3NhZ2UoZSksdGhpcy5fbGlzdGVuZXJzLm1lc3NhZ2UuZm9yRWFjaCh0PT50aGlzLl9jYWxsRXZlbnRMaXN0ZW5lcihlLHQpKX07X2hhbmRsZUVycm9yPWU9Pnt0aGlzLl9kZWJ1ZyhcImVycm9yIGV2ZW50XCIsZS5tZXNzYWdlKSx0aGlzLl9kaXNjb25uZWN0KHZvaWQgMCxlLm1lc3NhZ2U9PT1cIlRJTUVPVVRcIj9cInRpbWVvdXRcIjp2b2lkIDApLHRoaXMub25lcnJvciYmdGhpcy5vbmVycm9yKGUpLHRoaXMuX2RlYnVnKFwiZXhlYyBlcnJvciBsaXN0ZW5lcnNcIiksdGhpcy5fbGlzdGVuZXJzLmVycm9yLmZvckVhY2godD0+dGhpcy5fY2FsbEV2ZW50TGlzdGVuZXIoZSx0KSksdGhpcy5fY29ubmVjdCgpfTtfaGFuZGxlQ2xvc2U9ZT0+e3RoaXMuX2RlYnVnKFwiY2xvc2UgZXZlbnRcIiksdGhpcy5fY2xlYXJUaW1lb3V0cygpLHRoaXMuX3Nob3VsZFJlY29ubmVjdCYmdGhpcy5fY29ubmVjdCgpLHRoaXMub25jbG9zZSYmdGhpcy5vbmNsb3NlKGUpLHRoaXMuX2xpc3RlbmVycy5jbG9zZS5mb3JFYWNoKHQ9PnRoaXMuX2NhbGxFdmVudExpc3RlbmVyKGUsdCkpfTtfcmVtb3ZlTGlzdGVuZXJzKCl7IXRoaXMuX3dzfHwodGhpcy5fZGVidWcoXCJyZW1vdmVMaXN0ZW5lcnNcIiksdGhpcy5fd3MucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9wZW5cIix0aGlzLl9oYW5kbGVPcGVuKSx0aGlzLl93cy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xvc2VcIix0aGlzLl9oYW5kbGVDbG9zZSksdGhpcy5fd3MucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIix0aGlzLl9oYW5kbGVNZXNzYWdlKSx0aGlzLl93cy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIix0aGlzLl9oYW5kbGVFcnJvcikpfV9hZGRMaXN0ZW5lcnMoKXshdGhpcy5fd3N8fCh0aGlzLl9kZWJ1ZyhcImFkZExpc3RlbmVyc1wiKSx0aGlzLl93cy5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLHRoaXMuX2hhbmRsZU9wZW4pLHRoaXMuX3dzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLHRoaXMuX2hhbmRsZUNsb3NlKSx0aGlzLl93cy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLHRoaXMuX2hhbmRsZU1lc3NhZ2UpLHRoaXMuX3dzLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLHRoaXMuX2hhbmRsZUVycm9yKSl9X2NsZWFyVGltZW91dHMoKXtjbGVhclRpbWVvdXQodGhpcy5fY29ubmVjdFRpbWVvdXQpLGNsZWFyVGltZW91dCh0aGlzLl91cHRpbWVUaW1lb3V0KX19O3ZhciBkPUpTT04ucGFyc2UoJ3tcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicG9ydFwiOjE4MTUsXCJzZWN1cmVcIjpmYWxzZSxcImJ1bmRsZUlkXCI6XCI5ZjQ5YzM4YzYxNDY2Y2UwXCIsXCJzZXJ2ZXJQb3J0XCI6NDk5MTZ9Jyk7ZnVuY3Rpb24gTigpe3JldHVybiBkLmhvc3R8fChsb2NhdGlvbi5wcm90b2NvbC5pbmRleE9mKFwiaHR0cFwiKT09PTA/bG9jYXRpb24uaG9zdG5hbWU6XCJsb2NhbGhvc3RcIil9ZnVuY3Rpb24gaygpe3JldHVybiBkLnBvcnR8fGxvY2F0aW9uLnBvcnR9dmFyIGI9bW9kdWxlLmJ1bmRsZS5wYXJlbnQsdztpZigoIWJ8fCFiLmlzUGFyY2VsUmVxdWlyZSkmJnR5cGVvZiBXZWJTb2NrZXQ8XCJ1XCIpe2xldCBzPXtyZWNvbm5lY3Rpbmc6ITB9LGU9TigpLHQ9aygpLG49ZC5zZWN1cmV8fGxvY2F0aW9uLnByb3RvY29sPT09XCJodHRwczpcIiYmIS9sb2NhbGhvc3R8MTI3LjAuMC4xfDAuMC4wLjAvLnRlc3QoZSk/XCJ3c3NcIjpcIndzXCI7KHc9Y2hyb21lPT1udWxsP3ZvaWQgMDpjaHJvbWUucnVudGltZSkhPW51bGwmJncubGFzdEVycm9yJiZsb2NhdGlvbi5yZWxvYWQoKTtsZXQgcj1uZXcgbyhgJHtufTovLyR7ZX06JHt0fS9gKTtyLm9ubWVzc2FnZT1hc3luYyBmdW5jdGlvbihjKXt2YXIgdjtpZighY2hyb21lLnJ1bnRpbWUuaWQpcmV0dXJuO2xldCBsPUpTT04ucGFyc2UoYy5kYXRhKTtpZihsLnR5cGU9PT1cInVwZGF0ZVwiJiYobC5hc3NldHMuZmlsdGVyKGk9PmkudHlwZT09PVwianNvblwiKS5sZW5ndGg+MD90eXBlb2YoKHY9Y2hyb21lPT1udWxsP3ZvaWQgMDpjaHJvbWUucnVudGltZSk9PW51bGw/dm9pZCAwOnYucmVsb2FkKT09XCJmdW5jdGlvblwiP2Nocm9tZS5ydW50aW1lLnJlbG9hZCgpOihjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7X19wYXJjZWxfaG1yX3JlbG9hZF9fOiEwfSksbG9jYXRpb24ucmVsb2FkKCkpOnR5cGVvZihsb2NhdGlvbj09bnVsbD92b2lkIDA6bG9jYXRpb24ucmVsb2FkKT09XCJmdW5jdGlvblwiP2xvY2F0aW9uLnJlbG9hZCgpOmNocm9tZS5ydW50aW1lLnJlbG9hZCgpKSxsLnR5cGU9PT1cImVycm9yXCIpZm9yKGxldCBpIG9mIGwuZGlhZ25vc3RpY3MuYW5zaSl7bGV0IEw9aS5jb2RlZnJhbWU/aS5jb2RlZnJhbWU6aS5zdGFjaztfKFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IFwiK2kubWVzc2FnZStgXG5gK0wrYFxuXG5gK2kuaGludHMuam9pbihgXG5gKSl9fSxyLm9uZXJyb3I9ZnVuY3Rpb24oYyl7dHlwZW9mIGMubWVzc2FnZT09XCJzdHJpbmdcIiYmIXMucmVjb25uZWN0aW5nJiZ5KFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IFwiK2MubWVzc2FnZSl9LHIub25vcGVuPWZ1bmN0aW9uKCl7cy5yZWNvbm5lY3Rpbmc9ITEsZihcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBDb25uZWN0ZWQgdG8gSE1SIHNlcnZlclwiKX0sci5vbmNsb3NlPWZ1bmN0aW9uKCl7cy5yZWNvbm5lY3Rpbmd8fChzLnJlY29ubmVjdGluZz0hMCxfKFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3Rpb24gdG8gdGhlIEhNUiBzZXJ2ZXIgd2FzIGxvc3QsIHRyeWluZyB0byByZWNvbm5lY3QuLi5cIikpfX1cbiIsImNvbnN0IHBhZ2VJbnN0YW5jZSA9IHtcbiAgZGF0YToge1xuICAgIGV4dGVuc2lvbkFjdGl2ZTogZmFsc2UsIC8vIOe7hOS7tuaYr+WQpua/gOa0u1xuICAgIHVybENvbmNhdExpc3Q6IFtdLFxuICAgIHJlcXVlc3RIZWFkZXJzOiBbXSxcbiAgICBtb2NrTGlzdDogW10sXG4gICAgb3JpZ2luWEhSOiB3aW5kb3cuWE1MSHR0cFJlcXVlc3QsXG4gICAgcHJpdmF0ZVhIUjogd2luZG93LlhNTEh0dHBSZXF1ZXN0LFxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc2V0UHJpdmF0ZVhIUigpIHtcbiAgICAgIGZ1bmN0aW9uIFByaXZhdGVYSFIoKSB7XG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBwYWdlSW5zdGFuY2UuZGF0YS5vcmlnaW5YSFIoKTtcbiAgICAgICAgZm9yIChsZXQgYXR0ciBpbiB4aHIpIHtcbiAgICAgICAgICBpZiAoYXR0ciA9PT0gXCJvcGVuXCIpIHtcbiAgICAgICAgICAgIC8vIOimhueblm9wZW5cbiAgICAgICAgICAgIHBhZ2VJbnN0YW5jZS5tZXRob2RzLm92ZXJ3cml0ZU9wZW4oeGhyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGF0dHIgPT09IFwic2VuZFwiKSB7XG4gICAgICAgICAgICAvLyDopobnm5ZzZW5kXG4gICAgICAgICAgICBwYWdlSW5zdGFuY2UubWV0aG9kcy5vdmVyd3JpdGVTZW5kKHhocik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhdHRyID09PSBcIm9ubG9hZFwiKSB7XG4gICAgICAgICAgICAvLyDlrprkuYlvbmxvYWRcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICBpZiAocGFnZUluc3RhbmNlLmRhdGEuZXh0ZW5zaW9uQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgLy8g5Luj55CG5o6l5Y+jXG4gICAgICAgICAgICAgICAgcGFnZUluc3RhbmNlLm1ldGhvZHMucHJveHlNb2NrTGlzdC5jYWxsKHRoaXMsIHhocik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5vbmxvYWQgJiYgdGhpcy5vbmxvYWQuY2FsbCh0aGlzLCAuLi5hcmdzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGF0dHIgPT09IFwib25yZWFkeXN0YXRlY2hhbmdlXCIpIHtcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICBpZiAocGFnZUluc3RhbmNlLmRhdGEuZXh0ZW5zaW9uQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgLy8g5aaC5p6cIHJlYWR5U3RhdGUgPSA077yM5YiZ5Luj55CG5o6l5Y+jXG4gICAgICAgICAgICAgICAgeGhyLnJlYWR5U3RhdGUgPT09IHRoaXMuRE9ORSAmJlxuICAgICAgICAgICAgICAgICAgcGFnZUluc3RhbmNlLm1ldGhvZHMucHJveHlNb2NrTGlzdC5jYWxsKHRoaXMsIHhocik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5vbnJlYWR5c3RhdGVjaGFuZ2UgJiZcbiAgICAgICAgICAgICAgICB0aGlzLm9ucmVhZHlzdGF0ZWNoYW5nZS5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIHhoclthdHRyXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAvLyDph43opoHvvIznoa7kv50gbmV3IFByaXZhdGVYSFIg5LmL5ZCO77yM5pa55rOV5omn6KGM55qEdGhpc+aYr+aMh+WQkSB4aHIg55qEXG4gICAgICAgICAgICB0aGlzW2F0dHJdID0geGhyW2F0dHJdLmJpbmQoeGhyKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoW1wicmVzcG9uc2VcIiwgXCJyZXNwb25zZVRleHRcIiwgXCJzdGF0dXNcIl0uaW5jbHVkZXMoYXR0cikpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBhdHRyLCB7XG4gICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geGhyW2BfJHthdHRyfWBdIHx8IHhoclthdHRyXTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgeGhyW2BfJHthdHRyfWBdID0gdmFsdWU7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGF0dHIsIHtcbiAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4aHJbYXR0cl07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHhoclthdHRyXSA9IHZhbHVlO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwYWdlSW5zdGFuY2UuZGF0YS5wcml2YXRlWEhSID0gUHJpdmF0ZVhIUjtcbiAgICB9LFxuICAgIC8vIOimhueblm9wZW7mlrnms5VcbiAgICBvdmVyd3JpdGVPcGVuKHhocjogWE1MSHR0cFJlcXVlc3QpIHtcbiAgICAgIHhoci5vcGVuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKHBhZ2VJbnN0YW5jZS5kYXRhLmV4dGVuc2lvbkFjdGl2ZSkge1xuICAgICAgICAgIGxldCBwYXRoID0gYXJnc1sxXTtcbiAgICAgICAgICBjb25zdCB1cmxTZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgICAgICAgcGFnZUluc3RhbmNlLmRhdGEudXJsQ29uY2F0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5jaGVja2VkICYmIGl0ZW0ua2V5ICYmIGl0ZW0udmFsdWUpIHtcbiAgICAgICAgICAgICAgdXJsU2VhcmNoUGFyYW1zLmFwcGVuZChpdGVtLmtleSwgaXRlbS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uc3QgcGFyYW1zU3RyID0gdXJsU2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgICAgICAgYXJnc1sxXSA9XG4gICAgICAgICAgICBwYXRoICtcbiAgICAgICAgICAgIChwYXJhbXNTdHIgPyAocGF0aC5pbmRleE9mKFwiP1wiKSA+IC0xID8gXCImXCIgOiBcIj9cIikgKyBwYXJhbXNTdHIgOiBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBwYWdlSW5zdGFuY2UuZGF0YS5vcmlnaW5YSFIucHJvdG90eXBlLm9wZW4uY2FsbCh0aGlzLCAuLi5hcmdzKTtcbiAgICAgIH07XG4gICAgfSxcbiAgICAvLyDopobnm5ZzZW5k5pa55rOVXG4gICAgb3ZlcndyaXRlU2VuZCh4aHI6IFhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgICB4aHIuc2VuZCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIC8vIOagueaNrumFjee9ruWinuWKoCByZXF1ZXN0IEhlYWRlciDlj4LmlbBcbiAgICAgICAgaWYgKHBhZ2VJbnN0YW5jZS5kYXRhLmV4dGVuc2lvbkFjdGl2ZSkge1xuICAgICAgICAgIHBhZ2VJbnN0YW5jZS5kYXRhLnJlcXVlc3RIZWFkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLmNoZWNrZWQgJiYgaXRlbS5rZXkgJiYgaXRlbS52YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLnNldFJlcXVlc3RIZWFkZXIoaXRlbS5rZXksIGl0ZW0udmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHBhZ2VJbnN0YW5jZS5kYXRhLm9yaWdpblhIUi5wcm90b3R5cGUuc2VuZC5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIC8vIOagueaNrm1vY2tMaXN0IOS7o+eQhuaOpeWPo1xuICAgIHByb3h5TW9ja0xpc3QoeGhyOiBYTUxIdHRwUmVxdWVzdCkge1xuICAgICAgcGFnZUluc3RhbmNlLmRhdGEubW9ja0xpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbS5jaGVja2VkICYmIGl0ZW0ua2V5ICYmIGl0ZW0udmFsdWUpIHtcbiAgICAgICAgICBpZiAoeGhyLnJlc3BvbnNlVVJMLmluZGV4T2YoaXRlbS5rZXkpID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gMjAwO1xuICAgICAgICAgICAgdGhpcy5yZXNwb25zZSA9IGl0ZW0udmFsdWU7XG4gICAgICAgICAgICB0aGlzLnJlc3BvbnNlVGV4dCA9IGl0ZW0udmFsdWU7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzTW9ja2VkKSB7XG4gICAgICAgICAgICAgIC8vIOmBv+WFjemHjeWkjeaJk+WNsGNvbnNvbGVcbiAgICAgICAgICAgICAgdGhpcy5oYXNNb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIjwtLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLku6PnkIbmjqXlj6PvvJpcIiwgeGhyLnJlc3BvbnNlVVJMKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtb2Nr5pWw5o2u77yaXCIsIGl0ZW0udmFsdWUpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tPlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgcGFnZUluc3RhbmNlLm1ldGhvZHMuc2V0UHJpdmF0ZVhIUigpO1xuICB9LFxufTtcbi8vIOWIneWni+WMllxucGFnZUluc3RhbmNlLm1vdW50ZWQoKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJpbmplY3RlZFNjcmlwdFwiLCAoZSkgPT4ge1xuICBpZiAoXG4gICAgT2JqZWN0LmtleXMocGFnZUluc3RhbmNlLmRhdGEpLmZpbmQoKGl0ZW0pID0+IGl0ZW0gPT09IGUuZGV0YWlsPy5kYXRhTmFtZSlcbiAgKSB7XG4gICAgcGFnZUluc3RhbmNlLmRhdGFbZS5kZXRhaWwuZGF0YU5hbWVdID0gZS5kZXRhaWw/LmRhdGE7XG4gICAgaWYgKHBhZ2VJbnN0YW5jZS5kYXRhLmV4dGVuc2lvbkFjdGl2ZSkge1xuICAgICAgLy8g5pu/5o2iIFhIUlxuICAgICAgd2luZG93LlhNTEh0dHBSZXF1ZXN0ID0gcGFnZUluc3RhbmNlLmRhdGEucHJpdmF0ZVhIUjtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LlhNTEh0dHBSZXF1ZXN0ID0gcGFnZUluc3RhbmNlLmRhdGEub3JpZ2luWEhSO1xuICAgIH1cbiAgfVxuICAvLyBjb25zb2xlLmxvZyhcImluamVjdGVkU2NyaXB0IOaOpeWPl+aVsOaNrjpcIiwgZS5kZXRhaWwpXG59KTtcbiJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJpbmplY3RlZFNjcmlwdC42MTQ2NmNlMC5qcy5tYXAifQ==
