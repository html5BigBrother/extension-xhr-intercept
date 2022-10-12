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
})({"86ZVp":[function(require,module,exports) {
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
var d = JSON.parse('{"host":"localhost","port":1815,"secure":false,"bundleId":"6f70d25bfcbf6ac7","serverPort":49916}');
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

},{}],"aiupF":[function(require,module,exports) {
const extContext = typeof chrome === "undefined" ? browser : chrome;
addEventListener("beforeunload", function() {
    try {
        extContext.runtime.sendMessage({
            __parcel_hmr_reload__: true
        });
    } catch  {}
});

},{}]},["86ZVp","aiupF"], "aiupF", "parcelRequire2015")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQUEsUUFBUSxDQUFDO0lBQUEsWUFBWSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7UUFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsVUFBVSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBRyxDQUFBLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtLQUFDO0lBQUEsV0FBVyxVQUFVLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQTtLQUFDO0lBQUEsV0FBVyxJQUFJLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQTtLQUFDO0lBQUEsV0FBVyxPQUFPLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQTtLQUFDO0lBQUEsV0FBVyxNQUFNLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQTtLQUFDO0lBQUEsSUFBSSxVQUFVLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUE7S0FBQztJQUFBLElBQUksSUFBSSxHQUFFO1FBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFBO0tBQUM7SUFBQSxJQUFJLE9BQU8sR0FBRTtRQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQTtLQUFDO0lBQUEsSUFBSSxNQUFNLEdBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUE7S0FBQztJQUFBLElBQUksVUFBVSxHQUFFO1FBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUE7S0FBQztJQUFBLElBQUksVUFBVSxDQUFDLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLElBQUcsQ0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUEsQUFBQztLQUFDO0lBQUEsSUFBSSxVQUFVLEdBQUU7UUFBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxDQUFDLENBQUMsQ0FBQTtLQUFDO0lBQUEsSUFBSSxjQUFjLEdBQUU7UUFBQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBSSxDQUFBLE9BQU8sQ0FBQyxJQUFFLFFBQVEsR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLFlBQVksSUFBSSxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQSxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFDLENBQUMsQ0FBQSxBQUFDLENBQUE7S0FBQztJQUFBLElBQUksVUFBVSxHQUFFO1FBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFDLEVBQUUsQ0FBQTtLQUFDO0lBQUEsSUFBSSxRQUFRLEdBQUU7UUFBQyxPQUFPLElBQUksQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUMsRUFBRSxDQUFBO0tBQUM7SUFBQSxJQUFJLFVBQVUsR0FBRTtRQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxVQUFVLENBQUE7S0FBQztJQUFBLElBQUksR0FBRyxHQUFFO1FBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQTtLQUFDO0lBQUEsT0FBTyxDQUFDO0lBQUEsT0FBTyxDQUFDO0lBQUEsU0FBUyxDQUFDO0lBQUEsTUFBTSxDQUFDO0lBQUEsS0FBSyxDQUFDLENBQUMsR0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDO1FBQUMsSUFBRyxJQUFJLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDO1lBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQUEsT0FBTTtTQUFDO1FBQUEsSUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBRyxJQUFJLENBQUMsTUFBTSxFQUFDO1lBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQUEsT0FBTTtTQUFDO1FBQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztLQUFDO0lBQUEsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7UUFBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFlBQVksR0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxHQUFDLEVBQUUsRUFBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUUsQ0FBQSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUEsQUFBQztLQUFDO0lBQUEsSUFBSSxDQUFDLENBQUMsRUFBQztRQUFDLElBQUcsSUFBSSxDQUFDLEdBQUcsSUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBRyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQUk7WUFBQyxJQUFHLEVBQUMsbUJBQW1CLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQSxFQUFDLEdBQUMsSUFBSSxDQUFDLFFBQVEsQUFBQztZQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFDLENBQUMsSUFBRyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUM7U0FBQztLQUFDO0lBQUEsZ0JBQWdCLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQUM7SUFBQSxhQUFhLENBQUMsQ0FBQyxFQUFDO1FBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEFBQUM7UUFBQSxJQUFHLENBQUMsRUFBQyxLQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUEsT0FBTSxDQUFDLENBQUMsQ0FBQTtLQUFDO0lBQUEsbUJBQW1CLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQyxHQUFFLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQSxBQUFDO0tBQUM7SUFBQSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUM7UUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUM7WUFBQyxNQUFNO2VBQUksQ0FBQztTQUFDLENBQUM7S0FBQztJQUFBLGFBQWEsR0FBRTtRQUFDLElBQUcsRUFBQywyQkFBMkIsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLDJCQUEyQixDQUFBLEVBQUMsb0JBQW9CLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQSxFQUFDLG9CQUFvQixFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUEsRUFBQyxHQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxHQUFDLENBQUMsQUFBQztRQUFBLE9BQU8sSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLElBQUcsQ0FBQSxDQUFDLEdBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRyxDQUFBLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxDQUFBLEFBQUMsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7S0FBQztJQUFBLEtBQUssR0FBRTtRQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQSxDQUFDLEdBQUU7WUFBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUFDLENBQUMsQ0FBQTtLQUFDO0lBQUEsV0FBVyxDQUFDLENBQUMsRUFBQztRQUFDLElBQUcsT0FBTyxDQUFDLElBQUUsUUFBUSxFQUFDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFBLElBQUcsT0FBTyxDQUFDLElBQUUsVUFBVSxFQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLEFBQUM7WUFBQSxJQUFHLE9BQU8sQ0FBQyxJQUFFLFFBQVEsRUFBQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQSxJQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUMsT0FBTyxDQUFDLENBQUE7U0FBQztRQUFBLE1BQU0sS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0tBQUM7SUFBQSxRQUFRLEdBQUU7UUFBQyxJQUFHLElBQUksQ0FBQyxZQUFZLElBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUMsT0FBTztRQUFBLElBQUksQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQSxJQUFHLEVBQUMsVUFBVSxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsVUFBVSxDQUFBLEVBQUMsaUJBQWlCLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQSxFQUFDLFNBQVMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUEsRUFBQyxHQUFDLElBQUksQ0FBQyxRQUFRLEFBQUM7UUFBQSxJQUFHLElBQUksQ0FBQyxXQUFXLElBQUUsQ0FBQyxFQUFDO1lBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztZQUFBLE9BQU07U0FBQztRQUFBLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxNQUFNLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQUEsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU0sQ0FBQyxHQUFFO1lBQUMsSUFBSSxDQUFDLFlBQVksSUFBRyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFDO2dCQUFDLEdBQUcsRUFBQyxDQUFDO2dCQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsVUFBVTthQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFDLElBQUksQ0FBQyxlQUFlLEdBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUM7U0FBQyxDQUFDO0tBQUM7SUFBQSxjQUFjLEdBQUU7UUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0tBQUM7SUFBQSxXQUFXLENBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUM7UUFBQyxJQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQztZQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQUEsSUFBRztnQkFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO2FBQUMsQ0FBQSxPQUFLLEVBQUU7U0FBQztLQUFDO0lBQUEsV0FBVyxHQUFFO1FBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxHQUFDLENBQUM7S0FBQztJQUFBLGtCQUFrQixDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7UUFBQyxhQUFhLElBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUFDO0lBQUEsV0FBVyxHQUFDLENBQUEsQ0FBQyxHQUFFO1FBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUFBLElBQUcsRUFBQyxTQUFTLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxTQUFTLENBQUEsRUFBQyxHQUFDLElBQUksQ0FBQyxRQUFRLEFBQUM7UUFBQSxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFDLElBQUksQ0FBQyxjQUFjLEdBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDLEdBQUU7WUFBQyxJQUFJLENBQUMsQUFBQztZQUFBLE9BQU0sQUFBQyxDQUFBLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFBLElBQUcsSUFBSSxHQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLGFBQWEsR0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLE1BQU0sSUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsR0FBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUMsQ0FBQztJQUFBLGNBQWMsR0FBQyxDQUFBLENBQUMsR0FBRTtRQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUMsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsR0FBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUMsQ0FBQztJQUFBLFlBQVksR0FBQyxDQUFBLENBQUMsR0FBRTtRQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUcsU0FBUyxHQUFDLFNBQVMsR0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxPQUFPLElBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQyxHQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFO0tBQUMsQ0FBQztJQUFBLFlBQVksR0FBQyxDQUFBLENBQUMsR0FBRTtRQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsSUFBSSxDQUFDLE9BQU8sSUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsR0FBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUMsQ0FBQztJQUFBLGdCQUFnQixHQUFFO1FBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFHLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQSxBQUFDO0tBQUM7SUFBQSxhQUFhLEdBQUU7UUFBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUcsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQSxBQUFDO0tBQUM7SUFBQSxjQUFjLEdBQUU7UUFBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO0tBQUM7Q0FBQyxBQUFDO0FBQUEsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrR0FBa0csQ0FBQyxBQUFDO0FBQUEsU0FBUyxDQUFDLEdBQUU7SUFBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUcsQ0FBQSxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBRyxDQUFDLEdBQUMsUUFBUSxDQUFDLFFBQVEsR0FBQyxXQUFXLENBQUEsQUFBQyxDQUFBO0NBQUM7QUFBQSxTQUFTLENBQUMsR0FBRTtJQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBRSxRQUFRLENBQUMsSUFBSSxDQUFBO0NBQUM7QUFBQSxJQUFJLENBQUMsR0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDLEFBQUM7QUFBQSxJQUFHLEFBQUMsQ0FBQSxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUEsSUFBRyxPQUFPLFNBQVMsR0FBQyxHQUFHLEVBQUM7SUFBQyxJQUFJLENBQUMsR0FBQztRQUFDLFlBQVksRUFBQyxDQUFDLENBQUM7S0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLElBQUUsUUFBUSxDQUFDLFFBQVEsS0FBRyxRQUFRLElBQUUsQ0FBQyw4QkFBOEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUssR0FBQyxJQUFJLEFBQUM7SUFBQyxDQUFBLENBQUMsR0FBQyxNQUFNLElBQUUsSUFBSSxHQUFDLEtBQUssQ0FBQyxHQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUEsSUFBRyxJQUFJLElBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFBQSxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDO0lBQUEsQ0FBQyxDQUFDLFNBQVMsR0FBQyxlQUFlLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQyxBQUFDO1FBQUEsSUFBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFDLE9BQU87UUFBQSxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQUFBQztRQUFBLElBQUcsQ0FBQyxDQUFDLElBQUksS0FBRyxRQUFRLElBQUcsQ0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsR0FBRSxDQUFDLENBQUMsSUFBSSxLQUFHLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsT0FBTyxDQUFBLEFBQUMsQ0FBQSxDQUFDLEdBQUMsTUFBTSxJQUFFLElBQUksR0FBQyxLQUFLLENBQUMsR0FBQyxNQUFNLENBQUMsT0FBTyxDQUFBLElBQUcsSUFBSSxHQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUEsQUFBQyxJQUFFLFVBQVUsR0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFFLENBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFBQyxxQkFBcUIsRUFBQyxDQUFDLENBQUM7U0FBQyxDQUFDLEVBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFBLEFBQUMsR0FBQyxPQUFPLENBQUEsUUFBUSxJQUFFLElBQUksR0FBQyxLQUFLLENBQUMsR0FBQyxRQUFRLENBQUMsTUFBTSxDQUFBLEFBQUMsSUFBRSxVQUFVLEdBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUEsQUFBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUcsT0FBTyxFQUFDLEtBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDLEtBQUssQUFBQztZQUFBLENBQUMsQ0FBQywyQkFBMkIsR0FBQyxDQUFDLENBQUMsT0FBTyxHQUFDLENBQUM7QUFDNXNQLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQzs7QUFFTCxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQixDQUFDLENBQUMsQ0FBQztTQUFDO0tBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLFNBQVMsQ0FBQyxFQUFDO1FBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxJQUFFLFFBQVEsSUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLElBQUUsQ0FBQyxDQUFDLDJCQUEyQixHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7S0FBQyxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsV0FBVTtRQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLGtEQUFrRCxDQUFDO0tBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLFdBQVU7UUFBQyxDQUFDLENBQUMsWUFBWSxJQUFHLENBQUEsQ0FBQyxDQUFDLFlBQVksR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsd0ZBQXdGLENBQUMsQ0FBQSxBQUFDO0tBQUM7Q0FBQzs7O0FDSnRXLE1BQU0sVUFBVSxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsR0FBRyxPQUFPLEdBQUcsTUFBTTtBQUNuRSxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsV0FBWTtJQUMzQyxJQUFJO1FBQ0YsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDN0IscUJBQXFCLEVBQUUsSUFBSTtTQUM1QixDQUFDO0tBQ0gsQ0FBQyxPQUFNLEVBQUU7Q0FDWCxDQUFDIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvQHBsYXNtb2hxL3BhcmNlbC1ydW50aW1lL2Rpc3QvcnVudGltZS1iY2FkNzE5NGY1NTY1NDFlLmpzIiwibm9kZV9tb2R1bGVzL0BwbGFzbW9ocS9wYXJjZWwtdHJhbnNmb3JtZXItbWFuaWZlc3QvcnVudGltZS9hdXRvLXJlbG9hZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbT10eXBlb2YgZ2xvYmFsVGhpcy5wcm9jZXNzPFwidVwiP2dsb2JhbFRoaXMucHJvY2Vzcy5hcmd2OltdLFQ9dHlwZW9mIGdsb2JhbFRoaXMucHJvY2VzczxcInVcIj9nbG9iYWxUaGlzLnByb2Nlc3MuZW52Ont9LHg9bmV3IFNldChtKSxnPXM9PnguaGFzKHMpLEQ9bS5maWx0ZXIocz0+cy5zdGFydHNXaXRoKFwiLS1cIikmJnMuaW5jbHVkZXMoXCI9XCIpKS5tYXAocz0+cy5zcGxpdChcIj1cIikpLnJlZHVjZSgocyxbZSx0XSk9PihzW2VdPXQscykse30pO3ZhciBSPWcoXCItLWRyeS1ydW5cIiksQz1nKFwiLS12ZXJib3NlXCIpfHxULlZFUkJPU0U9PT1cInRydWVcIjt2YXIgRT0ocz1cIlwiLC4uLmUpPT5jb25zb2xlLmxvZyhzLnBhZEVuZCg5KSxcInxcIiwuLi5lKTt2YXIgeT0oLi4ucyk9PmNvbnNvbGUuZXJyb3IoXCJcXHV7MUY1MzR9IEVSUk9SXCIucGFkRW5kKDkpLFwifFwiLC4uLnMpLGY9KC4uLnMpPT5FKFwiXFx1ezFGNTM1fSBJTkZPXCIsLi4ucyksXz0oLi4ucyk9PkUoXCJcXHV7MUY3RTB9IFdBUk5cIiwuLi5zKTt2YXIgaD1jbGFzc3t0YXJnZXQ7dHlwZTtjb25zdHJ1Y3RvcihlLHQpe3RoaXMudGFyZ2V0PXQsdGhpcy50eXBlPWV9fSxwPWNsYXNzIGV4dGVuZHMgaHttZXNzYWdlO2Vycm9yO2NvbnN0cnVjdG9yKGUsdCl7c3VwZXIoXCJlcnJvclwiLHQpLHRoaXMubWVzc2FnZT1lLm1lc3NhZ2UsdGhpcy5lcnJvcj1lfX0sdT1jbGFzcyBleHRlbmRzIGh7Y29kZTtyZWFzb247d2FzQ2xlYW49ITA7Y29uc3RydWN0b3IoZT0xZTMsdD1cIlwiLG4pe3N1cGVyKFwiY2xvc2VcIixuKSx0aGlzLmNvZGU9ZSx0aGlzLnJlYXNvbj10fX07dmFyIFM9KCk9PntpZih0eXBlb2YgZ2xvYmFsVGhpcy5XZWJTb2NrZXQ8XCJ1XCIpcmV0dXJuIGdsb2JhbFRoaXMuV2ViU29ja2V0fSxPPXM9PnR5cGVvZiBzPFwidVwiJiYhIXMmJnMuQ0xPU0lORz09PTIsYT17bWF4UmVjb25uZWN0aW9uRGVsYXk6MWU0LG1pblJlY29ubmVjdGlvbkRlbGF5OjFlMytNYXRoLnJhbmRvbSgpKjRlMyxtaW5VcHRpbWU6NWUzLHJlY29ubmVjdGlvbkRlbGF5R3Jvd0ZhY3RvcjoxLjMsY29ubmVjdGlvblRpbWVvdXQ6NGUzLG1heFJldHJpZXM6MS8wLG1heEVucXVldWVkTWVzc2FnZXM6MS8wLHN0YXJ0Q2xvc2VkOiExLGRlYnVnOiExfSxvPWNsYXNze193cztfbGlzdGVuZXJzPXtlcnJvcjpbXSxtZXNzYWdlOltdLG9wZW46W10sY2xvc2U6W119O19yZXRyeUNvdW50PS0xO191cHRpbWVUaW1lb3V0O19jb25uZWN0VGltZW91dDtfc2hvdWxkUmVjb25uZWN0PSEwO19jb25uZWN0TG9jaz0hMTtfYmluYXJ5VHlwZT1cImJsb2JcIjtfY2xvc2VDYWxsZWQ9ITE7X21lc3NhZ2VRdWV1ZT1bXTtfdXJsO19wcm90b2NvbHM7X29wdGlvbnM7Y29uc3RydWN0b3IoZSx0LG49e30pe3RoaXMuX3VybD1lLHRoaXMuX3Byb3RvY29scz10LHRoaXMuX29wdGlvbnM9bix0aGlzLl9vcHRpb25zLnN0YXJ0Q2xvc2VkJiYodGhpcy5fc2hvdWxkUmVjb25uZWN0PSExKSx0aGlzLl9jb25uZWN0KCl9c3RhdGljIGdldCBDT05ORUNUSU5HKCl7cmV0dXJuIDB9c3RhdGljIGdldCBPUEVOKCl7cmV0dXJuIDF9c3RhdGljIGdldCBDTE9TSU5HKCl7cmV0dXJuIDJ9c3RhdGljIGdldCBDTE9TRUQoKXtyZXR1cm4gM31nZXQgQ09OTkVDVElORygpe3JldHVybiBvLkNPTk5FQ1RJTkd9Z2V0IE9QRU4oKXtyZXR1cm4gby5PUEVOfWdldCBDTE9TSU5HKCl7cmV0dXJuIG8uQ0xPU0lOR31nZXQgQ0xPU0VEKCl7cmV0dXJuIG8uQ0xPU0VEfWdldCBiaW5hcnlUeXBlKCl7cmV0dXJuIHRoaXMuX3dzP3RoaXMuX3dzLmJpbmFyeVR5cGU6dGhpcy5fYmluYXJ5VHlwZX1zZXQgYmluYXJ5VHlwZShlKXt0aGlzLl9iaW5hcnlUeXBlPWUsdGhpcy5fd3MmJih0aGlzLl93cy5iaW5hcnlUeXBlPWUpfWdldCByZXRyeUNvdW50KCl7cmV0dXJuIE1hdGgubWF4KHRoaXMuX3JldHJ5Q291bnQsMCl9Z2V0IGJ1ZmZlcmVkQW1vdW50KCl7cmV0dXJuIHRoaXMuX21lc3NhZ2VRdWV1ZS5yZWR1Y2UoKHQsbik9Pih0eXBlb2Ygbj09XCJzdHJpbmdcIj90Kz1uLmxlbmd0aDpuIGluc3RhbmNlb2YgQmxvYj90Kz1uLnNpemU6dCs9bi5ieXRlTGVuZ3RoLHQpLDApKyh0aGlzLl93cz90aGlzLl93cy5idWZmZXJlZEFtb3VudDowKX1nZXQgZXh0ZW5zaW9ucygpe3JldHVybiB0aGlzLl93cz90aGlzLl93cy5leHRlbnNpb25zOlwiXCJ9Z2V0IHByb3RvY29sKCl7cmV0dXJuIHRoaXMuX3dzP3RoaXMuX3dzLnByb3RvY29sOlwiXCJ9Z2V0IHJlYWR5U3RhdGUoKXtyZXR1cm4gdGhpcy5fd3M/dGhpcy5fd3MucmVhZHlTdGF0ZTp0aGlzLl9vcHRpb25zLnN0YXJ0Q2xvc2VkP28uQ0xPU0VEOm8uQ09OTkVDVElOR31nZXQgdXJsKCl7cmV0dXJuIHRoaXMuX3dzP3RoaXMuX3dzLnVybDpcIlwifW9uY2xvc2U7b25lcnJvcjtvbm1lc3NhZ2U7b25vcGVuO2Nsb3NlKGU9MWUzLHQpe2lmKHRoaXMuX2Nsb3NlQ2FsbGVkPSEwLHRoaXMuX3Nob3VsZFJlY29ubmVjdD0hMSx0aGlzLl9jbGVhclRpbWVvdXRzKCksIXRoaXMuX3dzKXt0aGlzLl9kZWJ1ZyhcImNsb3NlIGVucXVldWVkOiBubyB3cyBpbnN0YW5jZVwiKTtyZXR1cm59aWYodGhpcy5fd3MucmVhZHlTdGF0ZT09PXRoaXMuQ0xPU0VEKXt0aGlzLl9kZWJ1ZyhcImNsb3NlOiBhbHJlYWR5IGNsb3NlZFwiKTtyZXR1cm59dGhpcy5fd3MuY2xvc2UoZSx0KX1yZWNvbm5lY3QoZSx0KXt0aGlzLl9zaG91bGRSZWNvbm5lY3Q9ITAsdGhpcy5fY2xvc2VDYWxsZWQ9ITEsdGhpcy5fcmV0cnlDb3VudD0tMSwhdGhpcy5fd3N8fHRoaXMuX3dzLnJlYWR5U3RhdGU9PT10aGlzLkNMT1NFRD90aGlzLl9jb25uZWN0KCk6KHRoaXMuX2Rpc2Nvbm5lY3QoZSx0KSx0aGlzLl9jb25uZWN0KCkpfXNlbmQoZSl7aWYodGhpcy5fd3MmJnRoaXMuX3dzLnJlYWR5U3RhdGU9PT10aGlzLk9QRU4pdGhpcy5fZGVidWcoXCJzZW5kXCIsZSksdGhpcy5fd3Muc2VuZChlKTtlbHNle2xldHttYXhFbnF1ZXVlZE1lc3NhZ2VzOnQ9YS5tYXhFbnF1ZXVlZE1lc3NhZ2VzfT10aGlzLl9vcHRpb25zO3RoaXMuX21lc3NhZ2VRdWV1ZS5sZW5ndGg8dCYmKHRoaXMuX2RlYnVnKFwiZW5xdWV1ZVwiLGUpLHRoaXMuX21lc3NhZ2VRdWV1ZS5wdXNoKGUpKX19YWRkRXZlbnRMaXN0ZW5lcihlLHQpe3RoaXMuX2xpc3RlbmVyc1tlXSYmdGhpcy5fbGlzdGVuZXJzW2VdLnB1c2godCl9ZGlzcGF0Y2hFdmVudChlKXtsZXQgdD10aGlzLl9saXN0ZW5lcnNbZS50eXBlXTtpZih0KWZvcihsZXQgbiBvZiB0KXRoaXMuX2NhbGxFdmVudExpc3RlbmVyKGUsbik7cmV0dXJuITB9cmVtb3ZlRXZlbnRMaXN0ZW5lcihlLHQpe3RoaXMuX2xpc3RlbmVyc1tlXSYmKHRoaXMuX2xpc3RlbmVyc1tlXT10aGlzLl9saXN0ZW5lcnNbZV0uZmlsdGVyKG49Pm4hPT10KSl9X2RlYnVnKC4uLmUpe3RoaXMuX29wdGlvbnMuZGVidWcmJmNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsW1wiUldTPlwiLC4uLmVdKX1fZ2V0TmV4dERlbGF5KCl7bGV0e3JlY29ubmVjdGlvbkRlbGF5R3Jvd0ZhY3RvcjplPWEucmVjb25uZWN0aW9uRGVsYXlHcm93RmFjdG9yLG1pblJlY29ubmVjdGlvbkRlbGF5OnQ9YS5taW5SZWNvbm5lY3Rpb25EZWxheSxtYXhSZWNvbm5lY3Rpb25EZWxheTpuPWEubWF4UmVjb25uZWN0aW9uRGVsYXl9PXRoaXMuX29wdGlvbnMscj0wO3JldHVybiB0aGlzLl9yZXRyeUNvdW50PjAmJihyPXQqTWF0aC5wb3coZSx0aGlzLl9yZXRyeUNvdW50LTEpLHI+biYmKHI9bikpLHRoaXMuX2RlYnVnKFwibmV4dCBkZWxheVwiLHIpLHJ9X3dhaXQoKXtyZXR1cm4gbmV3IFByb21pc2UoZT0+e3NldFRpbWVvdXQoZSx0aGlzLl9nZXROZXh0RGVsYXkoKSl9KX1fZ2V0TmV4dFVybChlKXtpZih0eXBlb2YgZT09XCJzdHJpbmdcIilyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGUpO2lmKHR5cGVvZiBlPT1cImZ1bmN0aW9uXCIpe2xldCB0PWUoKTtpZih0eXBlb2YgdD09XCJzdHJpbmdcIilyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHQpO2lmKHQudGhlbilyZXR1cm4gdH10aHJvdyBFcnJvcihcIkludmFsaWQgVVJMXCIpfV9jb25uZWN0KCl7aWYodGhpcy5fY29ubmVjdExvY2t8fCF0aGlzLl9zaG91bGRSZWNvbm5lY3QpcmV0dXJuO3RoaXMuX2Nvbm5lY3RMb2NrPSEwO2xldHttYXhSZXRyaWVzOmU9YS5tYXhSZXRyaWVzLGNvbm5lY3Rpb25UaW1lb3V0OnQ9YS5jb25uZWN0aW9uVGltZW91dCxXZWJTb2NrZXQ6bj1TKCl9PXRoaXMuX29wdGlvbnM7aWYodGhpcy5fcmV0cnlDb3VudD49ZSl7dGhpcy5fZGVidWcoXCJtYXggcmV0cmllcyByZWFjaGVkXCIsdGhpcy5fcmV0cnlDb3VudCxcIj49XCIsZSk7cmV0dXJufWlmKHRoaXMuX3JldHJ5Q291bnQrKyx0aGlzLl9kZWJ1ZyhcImNvbm5lY3RcIix0aGlzLl9yZXRyeUNvdW50KSx0aGlzLl9yZW1vdmVMaXN0ZW5lcnMoKSwhTyhuKSl0aHJvdyBFcnJvcihcIk5vIHZhbGlkIFdlYlNvY2tldCBjbGFzcyBwcm92aWRlZFwiKTt0aGlzLl93YWl0KCkudGhlbigoKT0+dGhpcy5fZ2V0TmV4dFVybCh0aGlzLl91cmwpKS50aGVuKGFzeW5jIHI9Pnt0aGlzLl9jbG9zZUNhbGxlZHx8KHRoaXMuX2RlYnVnKFwiY29ubmVjdFwiLHt1cmw6cixwcm90b2NvbHM6dGhpcy5fcHJvdG9jb2xzfSksdGhpcy5fd3M9dGhpcy5fcHJvdG9jb2xzP25ldyBuKHIsdGhpcy5fcHJvdG9jb2xzKTpuZXcgbihyKSx0aGlzLl93cy5iaW5hcnlUeXBlPXRoaXMuX2JpbmFyeVR5cGUsdGhpcy5fY29ubmVjdExvY2s9ITEsdGhpcy5fYWRkTGlzdGVuZXJzKCksdGhpcy5fY29ubmVjdFRpbWVvdXQ9c2V0VGltZW91dCgoKT0+dGhpcy5faGFuZGxlVGltZW91dCgpLHQpKX0pfV9oYW5kbGVUaW1lb3V0KCl7dGhpcy5fZGVidWcoXCJ0aW1lb3V0IGV2ZW50XCIpLHRoaXMuX2hhbmRsZUVycm9yKG5ldyBwKEVycm9yKFwiVElNRU9VVFwiKSx0aGlzKSl9X2Rpc2Nvbm5lY3QoZT0xZTMsdCl7aWYodGhpcy5fY2xlYXJUaW1lb3V0cygpLCEhdGhpcy5fd3Mpe3RoaXMuX3JlbW92ZUxpc3RlbmVycygpO3RyeXt0aGlzLl93cy5jbG9zZShlLHQpLHRoaXMuX2hhbmRsZUNsb3NlKG5ldyB1KGUsdCx0aGlzKSl9Y2F0Y2h7fX19X2FjY2VwdE9wZW4oKXt0aGlzLl9kZWJ1ZyhcImFjY2VwdCBvcGVuXCIpLHRoaXMuX3JldHJ5Q291bnQ9MH1fY2FsbEV2ZW50TGlzdGVuZXIoZSx0KXtcImhhbmRsZUV2ZW50XCJpbiB0P3QuaGFuZGxlRXZlbnQoZSk6dChlKX1faGFuZGxlT3Blbj1lPT57dGhpcy5fZGVidWcoXCJvcGVuIGV2ZW50XCIpO2xldHttaW5VcHRpbWU6dD1hLm1pblVwdGltZX09dGhpcy5fb3B0aW9ucztjbGVhclRpbWVvdXQodGhpcy5fY29ubmVjdFRpbWVvdXQpLHRoaXMuX3VwdGltZVRpbWVvdXQ9c2V0VGltZW91dCgoKT0+dGhpcy5fYWNjZXB0T3BlbigpLHQpLHRoaXMuX3dzLmJpbmFyeVR5cGU9dGhpcy5fYmluYXJ5VHlwZSx0aGlzLl9tZXNzYWdlUXVldWUuZm9yRWFjaChuPT57dmFyIHI7cmV0dXJuKHI9dGhpcy5fd3MpPT1udWxsP3ZvaWQgMDpyLnNlbmQobil9KSx0aGlzLl9tZXNzYWdlUXVldWU9W10sdGhpcy5vbm9wZW4mJnRoaXMub25vcGVuKGUpLHRoaXMuX2xpc3RlbmVycy5vcGVuLmZvckVhY2gobj0+dGhpcy5fY2FsbEV2ZW50TGlzdGVuZXIoZSxuKSl9O19oYW5kbGVNZXNzYWdlPWU9Pnt0aGlzLl9kZWJ1ZyhcIm1lc3NhZ2UgZXZlbnRcIiksdGhpcy5vbm1lc3NhZ2UmJnRoaXMub25tZXNzYWdlKGUpLHRoaXMuX2xpc3RlbmVycy5tZXNzYWdlLmZvckVhY2godD0+dGhpcy5fY2FsbEV2ZW50TGlzdGVuZXIoZSx0KSl9O19oYW5kbGVFcnJvcj1lPT57dGhpcy5fZGVidWcoXCJlcnJvciBldmVudFwiLGUubWVzc2FnZSksdGhpcy5fZGlzY29ubmVjdCh2b2lkIDAsZS5tZXNzYWdlPT09XCJUSU1FT1VUXCI/XCJ0aW1lb3V0XCI6dm9pZCAwKSx0aGlzLm9uZXJyb3ImJnRoaXMub25lcnJvcihlKSx0aGlzLl9kZWJ1ZyhcImV4ZWMgZXJyb3IgbGlzdGVuZXJzXCIpLHRoaXMuX2xpc3RlbmVycy5lcnJvci5mb3JFYWNoKHQ9PnRoaXMuX2NhbGxFdmVudExpc3RlbmVyKGUsdCkpLHRoaXMuX2Nvbm5lY3QoKX07X2hhbmRsZUNsb3NlPWU9Pnt0aGlzLl9kZWJ1ZyhcImNsb3NlIGV2ZW50XCIpLHRoaXMuX2NsZWFyVGltZW91dHMoKSx0aGlzLl9zaG91bGRSZWNvbm5lY3QmJnRoaXMuX2Nvbm5lY3QoKSx0aGlzLm9uY2xvc2UmJnRoaXMub25jbG9zZShlKSx0aGlzLl9saXN0ZW5lcnMuY2xvc2UuZm9yRWFjaCh0PT50aGlzLl9jYWxsRXZlbnRMaXN0ZW5lcihlLHQpKX07X3JlbW92ZUxpc3RlbmVycygpeyF0aGlzLl93c3x8KHRoaXMuX2RlYnVnKFwicmVtb3ZlTGlzdGVuZXJzXCIpLHRoaXMuX3dzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsdGhpcy5faGFuZGxlT3BlbiksdGhpcy5fd3MucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsdGhpcy5faGFuZGxlQ2xvc2UpLHRoaXMuX3dzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsdGhpcy5faGFuZGxlTWVzc2FnZSksdGhpcy5fd3MucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsdGhpcy5faGFuZGxlRXJyb3IpKX1fYWRkTGlzdGVuZXJzKCl7IXRoaXMuX3dzfHwodGhpcy5fZGVidWcoXCJhZGRMaXN0ZW5lcnNcIiksdGhpcy5fd3MuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIix0aGlzLl9oYW5kbGVPcGVuKSx0aGlzLl93cy5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIix0aGlzLl9oYW5kbGVDbG9zZSksdGhpcy5fd3MuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIix0aGlzLl9oYW5kbGVNZXNzYWdlKSx0aGlzLl93cy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIix0aGlzLl9oYW5kbGVFcnJvcikpfV9jbGVhclRpbWVvdXRzKCl7Y2xlYXJUaW1lb3V0KHRoaXMuX2Nvbm5lY3RUaW1lb3V0KSxjbGVhclRpbWVvdXQodGhpcy5fdXB0aW1lVGltZW91dCl9fTt2YXIgZD1KU09OLnBhcnNlKCd7XCJob3N0XCI6XCJsb2NhbGhvc3RcIixcInBvcnRcIjoxODE1LFwic2VjdXJlXCI6ZmFsc2UsXCJidW5kbGVJZFwiOlwiNmY3MGQyNWJmY2JmNmFjN1wiLFwic2VydmVyUG9ydFwiOjQ5OTE2fScpO2Z1bmN0aW9uIE4oKXtyZXR1cm4gZC5ob3N0fHwobG9jYXRpb24ucHJvdG9jb2wuaW5kZXhPZihcImh0dHBcIik9PT0wP2xvY2F0aW9uLmhvc3RuYW1lOlwibG9jYWxob3N0XCIpfWZ1bmN0aW9uIGsoKXtyZXR1cm4gZC5wb3J0fHxsb2NhdGlvbi5wb3J0fXZhciBiPW1vZHVsZS5idW5kbGUucGFyZW50LHc7aWYoKCFifHwhYi5pc1BhcmNlbFJlcXVpcmUpJiZ0eXBlb2YgV2ViU29ja2V0PFwidVwiKXtsZXQgcz17cmVjb25uZWN0aW5nOiEwfSxlPU4oKSx0PWsoKSxuPWQuc2VjdXJlfHxsb2NhdGlvbi5wcm90b2NvbD09PVwiaHR0cHM6XCImJiEvbG9jYWxob3N0fDEyNy4wLjAuMXwwLjAuMC4wLy50ZXN0KGUpP1wid3NzXCI6XCJ3c1wiOyh3PWNocm9tZT09bnVsbD92b2lkIDA6Y2hyb21lLnJ1bnRpbWUpIT1udWxsJiZ3Lmxhc3RFcnJvciYmbG9jYXRpb24ucmVsb2FkKCk7bGV0IHI9bmV3IG8oYCR7bn06Ly8ke2V9OiR7dH0vYCk7ci5vbm1lc3NhZ2U9YXN5bmMgZnVuY3Rpb24oYyl7dmFyIHY7aWYoIWNocm9tZS5ydW50aW1lLmlkKXJldHVybjtsZXQgbD1KU09OLnBhcnNlKGMuZGF0YSk7aWYobC50eXBlPT09XCJ1cGRhdGVcIiYmKGwuYXNzZXRzLmZpbHRlcihpPT5pLnR5cGU9PT1cImpzb25cIikubGVuZ3RoPjA/dHlwZW9mKCh2PWNocm9tZT09bnVsbD92b2lkIDA6Y2hyb21lLnJ1bnRpbWUpPT1udWxsP3ZvaWQgMDp2LnJlbG9hZCk9PVwiZnVuY3Rpb25cIj9jaHJvbWUucnVudGltZS5yZWxvYWQoKTooY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe19fcGFyY2VsX2htcl9yZWxvYWRfXzohMH0pLGxvY2F0aW9uLnJlbG9hZCgpKTp0eXBlb2YobG9jYXRpb249PW51bGw/dm9pZCAwOmxvY2F0aW9uLnJlbG9hZCk9PVwiZnVuY3Rpb25cIj9sb2NhdGlvbi5yZWxvYWQoKTpjaHJvbWUucnVudGltZS5yZWxvYWQoKSksbC50eXBlPT09XCJlcnJvclwiKWZvcihsZXQgaSBvZiBsLmRpYWdub3N0aWNzLmFuc2kpe2xldCBMPWkuY29kZWZyYW1lP2kuY29kZWZyYW1lOmkuc3RhY2s7XyhcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIitpLm1lc3NhZ2UrYFxuYCtMK2BcblxuYCtpLmhpbnRzLmpvaW4oYFxuYCkpfX0sci5vbmVycm9yPWZ1bmN0aW9uKGMpe3R5cGVvZiBjLm1lc3NhZ2U9PVwic3RyaW5nXCImJiFzLnJlY29ubmVjdGluZyYmeShcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIitjLm1lc3NhZ2UpfSxyLm9ub3Blbj1mdW5jdGlvbigpe3MucmVjb25uZWN0aW5nPSExLGYoXCJbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGVkIHRvIEhNUiBzZXJ2ZXJcIil9LHIub25jbG9zZT1mdW5jdGlvbigpe3MucmVjb25uZWN0aW5nfHwocy5yZWNvbm5lY3Rpbmc9ITAsXyhcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBDb25uZWN0aW9uIHRvIHRoZSBITVIgc2VydmVyIHdhcyBsb3N0LCB0cnlpbmcgdG8gcmVjb25uZWN0Li4uXCIpKX19XG4iLCJjb25zdCBleHRDb250ZXh0ID0gdHlwZW9mIGNocm9tZSA9PT0gXCJ1bmRlZmluZWRcIiA/IGJyb3dzZXIgOiBjaHJvbWVcclxuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGV4dENvbnRleHQucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbiAgICAgIF9fcGFyY2VsX2htcl9yZWxvYWRfXzogdHJ1ZVxyXG4gICAgfSlcclxuICB9IGNhdGNoIHt9XHJcbn0pXHJcbiJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJhdXRvLXJlbG9hZC5mY2JmNmFjNy5qcy5tYXAifQ==
