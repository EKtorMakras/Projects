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
})({"jQVXF":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "0bcb44a518dbc454";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"1SICI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _currentLocation = require("./CurrentLocation");
var _currentLocationDefault = parcelHelpers.interopDefault(_currentLocation);
var _domFunctions = require("./domFunctions");
var _dataFunctions = require("./dataFunctions");
const currentLoc = new (0, _currentLocationDefault.default)();
const initApp = ()=>{
    // Add Listeners
    const geoBtn = document.querySelector("#nav__link--location");
    geoBtn.addEventListener("click", getGeoWeather);
    const homeBtn = document.querySelector("#nav__link--home");
    homeBtn.addEventListener("click", loadWeather);
    const saveBtn = document.querySelector("#nav__link--save-location");
    saveBtn.addEventListener("click", saveLocation);
    const unitBtn = document.querySelector("#nav__link--unit");
    unitBtn.addEventListener("click", setUnitPref);
    const refreshBtn = document.querySelector("#nav__link--refresh");
    refreshBtn.addEventListener("click", refreshWeather);
    const locationEntry = document.querySelector("#searchBar__form");
    locationEntry.addEventListener("submit", submitNewLocation);
    // Set up
    (0, _domFunctions.setPlaceholderText)();
    // Load Weather
    loadWeather();
};
document.addEventListener("DOMContentLoaded", initApp);
const updateDataAndDisplay = async (locationObj)=>{
    const weatherJson = await (0, _dataFunctions.getWeatherFromCoords)(locationObj);
    if (weatherJson) (0, _domFunctions.updateDisplay)(weatherJson, locationObj);
};
const getGeoWeather = (e)=>{
    if (e) {
        if (e.type === "click") {
            // add spinner
            const mapIcon = document.querySelector(".fa-map-marker-alt");
            (0, _domFunctions.addSpinner)(mapIcon);
        }
    }
    if (!navigator.geolocation) return GeolocationPositionError();
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
const geoSuccess = (position)=>{
    const myCoordsObj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        name: `Lat: ${position.coords.latitude}  Long: ${position.coords.longitude}`
    };
    // set location Obj
    (0, _dataFunctions.setLocationObj)(currentLoc, myCoordsObj);
    // update data and display 
    updateDataAndDisplay(currentLoc);
};
const geoError = (errObj)=>{
    const errMsg = errObj ? errObj.Msg : "Geolocation not supported";
    (0, _domFunctions.displayErr)(errMsg, errMsg);
};
const loadWeather = (event)=>{
    const savedLocation = (0, _dataFunctions.getHomeLocation)();
    if (!savedLocation && !event) return getGeoWeather();
    if (!savedLocation && event.type === "click") (0, _domFunctions.displayErr)("No home Location Saved", "Sorry,Please save your home location first ");
    else if (savedLocation && !event) displayHomeLocationWeather(savedLocation);
    else if (savedLocation && event) {
        const homeIcon = document.querySelector(".fa-home");
        (0, _domFunctions.addSpinner)(homeIcon);
        displayHomeLocationWeather(savedLocation);
    }
};
const displayHomeLocationWeather = (homeLocation)=>{
    if (typeof homeLocation === "string") {
        const locationJson = JSON.parse(homeLocation);
        const myCoordsObj = {
            lat: locationJson.lat,
            lon: locationJson.lon,
            name: locationJson.name,
            unit: locationJson.unit
        };
        (0, _dataFunctions.setLocationObj)(currentLoc, myCoordsObj);
        updateDataAndDisplay(currentLoc);
    }
};
const saveLocation = ()=>{
    if (currentLoc.getLat() && currentLoc.getLon()) {
        const saveIcon = document.querySelector(".fa-save");
        (0, _domFunctions.addSpinner)(saveIcon);
        const locationObj = {
            name: currentLoc.getName(),
            lat: currentLoc.getLat(),
            lon: currentLoc.getLon(),
            unit: currentLoc.getUnit()
        };
        localStorage.setItem("defaultWeatherLocation", JSON.stringify(locationObj));
        (0, _domFunctions.updateScreenReaderConfirmation)(`Saved ${currentLoc.getName()} as home location.`);
    }
};
const setUnitPref = ()=>{
    const unitIcon = document.querySelector(".fa-chart-bar");
    (0, _domFunctions.addSpinner)(unitIcon);
    currentLoc.toggleUnit();
    updateDataAndDisplay(currentLoc);
};
const refreshWeather = ()=>{
    const refreshIcon = document.querySelector(".fa-sync-alt");
    (0, _domFunctions.addSpinner)(refreshIcon);
    updateDataAndDisplay(currentLoc);
};
const submitNewLocation = async (event)=>{
    event.preventDefault();
    const text = document.querySelector("#searchBar__input").value;
    const entryText = (0, _dataFunctions.cleanText)(text);
    if (!entryText) return;
    const locationIcon = document.querySelector(".fa-magnifying-glass");
    (0, _domFunctions.addSpinner)(locationIcon);
    const coordsData = await (0, _dataFunctions.getCoordsFromApi)(entryText, currentLoc.getUnit());
    console.log(currentLoc);
    if (coordsData) {
        if (coordsData.cod === 200) {
            // work with api data
            // success
            const myCoordsObj = {
                lat: coordsData.coord.lat,
                lon: coordsData.coord.lon,
                name: coordsData.sys.country ? `${coordsData.name},${coordsData.sys.country}` : coordsData.name
            };
            (0, _dataFunctions.setLocationObj)(currentLoc, myCoordsObj);
            updateDataAndDisplay(currentLoc);
        } else (0, _domFunctions.displayApiErr)(coordsData);
    } else (0, _domFunctions.displayErr)("Connection Error", "Connection Error");
};

},{"./CurrentLocation":"3jWii","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./domFunctions":"5mfTB","./dataFunctions":"6RUjN"}],"3jWii":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class CurrentLocation {
    constructor(){
        this._name = "Current Location";
        this._lat = null;
        this._lon = null;
        this._unit = "metric";
    }
    getName() {
        return this._name;
    }
    setName(name) {
        this._name = name;
    }
    getLat() {
        return this._lat;
    }
    setLat(lat) {
        this._lat = lat;
    }
    getLon() {
        return this._lon;
    }
    setLon(lon) {
        this._lon = lon;
    }
    getUnit() {
        return this._unit;
    }
    setUnit(unit) {
        this._unit = unit;
    }
    toggleUnit() {
        this._unit = this._unit === "metric" ? "imperial" : "metric";
    }
}
exports.default = CurrentLocation;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"5mfTB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setPlaceholderText", ()=>setPlaceholderText);
parcelHelpers.export(exports, "addSpinner", ()=>addSpinner);
parcelHelpers.export(exports, "displayErr", ()=>displayErr);
parcelHelpers.export(exports, "displayApiErr", ()=>displayApiErr);
parcelHelpers.export(exports, "toProperCase", ()=>toProperCase);
parcelHelpers.export(exports, "updateWeatherLocationHeader", ()=>updateWeatherLocationHeader);
parcelHelpers.export(exports, "updateScreenReaderConfirmation", ()=>updateScreenReaderConfirmation);
parcelHelpers.export(exports, "updateDisplay", ()=>updateDisplay);
const setPlaceholderText = ()=>{
    const input = document.querySelector("#searchBar__input");
    window.innerWidth < 450 ? input.placeholder = "City,State,Country" : input.placeholder = "City,State,Country or Zip Code";
};
const addSpinner = (icon)=>{
    animateBtn(icon);
    setTimeout(animateBtn, 1000, icon);
};
const animateBtn = (element)=>{
    element.classList.toggle("none");
    element.nextElementSibling.classList.toggle("block");
    element.nextElementSibling.classList.toggle("none");
};
const displayErr = (headerMsg, srMsg)=>{
    updateWeatherLocationHeader(headerMsg);
    updateScreenReaderConfirmation(srMsg);
};
const displayApiErr = (statusCode)=>{
    const properMsg = toProperCase(statusCode.message);
    updateWeatherLocationHeader(properMsg);
    updateScreenReaderConfirmation(properMsg);
};
const toProperCase = (text)=>{
    const words = text.split(" ");
    const properWords = words.map((word)=>{
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return properWords.join(" ");
};
const updateWeatherLocationHeader = (msg)=>{
    const heading = document.querySelector(".currentForecast__title");
    heading.textContent = msg;
};
const updateScreenReaderConfirmation = (msg)=>{
    const confirmation = document.querySelector("#confirmation");
    confirmation.textContent = msg;
};
const updateDisplay = (weatherJson, locationObj)=>{
    fadeDisplay();
    clearDisplay();
    const weatherClass = getWeatherClass(weatherJson.current.weather[0].icon);
    setBgImg(weatherClass);
    const screenReaderWeather = buildScreenReaderWeather(weatherJson, locationObj);
    updateScreenReaderConfirmation(screenReaderWeather);
    updateWeatherLocationHeader(locationObj.getName());
    // Current Conditions
    // Six Day Forecast
    // Set Focus on Search
    setFocusOnSearch();
    fadeDisplay();
};
const fadeDisplay = ()=>{
    const cc = document.querySelector("#currentForecast");
    cc.classList.toggle("zero-vis");
    cc.classList.toggle("fade-in");
    const sixDay = document.querySelector("#dailyForecast");
    cc.classList.toggle("zero-vis");
    cc.classList.toggle("fade-in");
};
const clearDisplay = ()=>{
    const cc = document.querySelector("#currentForecast__content");
    deleteContents(cc);
    const sixDay = document.querySelector("#dailyForecast__content");
    deleteContents(sixDay);
};
const deleteContents = (parentElement)=>{
    let child = parentElement.lastElementChild;
    while(child){
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};
const getWeatherClass = (icon)=>{
    const firstTwoChars = icon.slice(0, 2);
    const lastChar = icon.slice(2);
    const weatherLookup = {
        "09": "snow",
        "10": "rain",
        "11": "rain",
        "13": "snow",
        "50": "fog"
    };
    let weatherClass;
    if (weatherLookup[firstTwoChars]) weatherClass = weatherLookup[firstTwoChars];
    else if (lastChar === "d") weatherClass = "clouds";
    else weatherClass = "night";
    return weatherClass;
};
const setBgImg = (weatherClass)=>{
    document.body.classList.add(weatherClass);
    document.body.classList.forEach((img)=>{
        console.log(img);
        if (img !== weatherClass) document.body.classList.remove(img);
    });
};
const buildScreenReaderWeather = (weatherJson, locationObj)=>{
    const location = locationObj.getName();
    const unit = locationObj.getUnit();
    const tempUnit = unit === "imperial" ? "F" : "C";
    return `${weatherJson.current.weather[0].desc} and 
    ${Math.round(Number(weatherJson.current.temp))}°${tempUnit} in ${location}.`;
};
const setFocusOnSearch = ()=>{
    document.querySelector("#searchBar__input").focus();
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6RUjN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setLocationObj", ()=>setLocationObj);
parcelHelpers.export(exports, "getWeatherFromCoords", ()=>getWeatherFromCoords);
parcelHelpers.export(exports, "getHomeLocation", ()=>getHomeLocation);
parcelHelpers.export(exports, "getCoordsFromApi", ()=>getCoordsFromApi);
parcelHelpers.export(exports, "cleanText", ()=>cleanText);
const WEATHER_API_KEY = "15b3a66ffbdd6de6691b83f0e1fd1747";
const setLocationObj = (locationObj, coordsObj)=>{
    const { lat , lon , name , unit  } = coordsObj;
    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);
    if (unit) locationObj.setUnit(unit);
};
const getWeatherFromCoords = async (locationObj)=>{
    const lat = locationObj.getLat();
    const lon = locationObj.getLon();
    const units = locationObj.getUnit();
    const url1 = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minetuly,hourly,alert&units=${units}&appid=${WEATHER_API_KEY}`;
    try {
        const weatherStream = await fetch(url1);
        const weatherJson = await weatherStream.json();
        return weatherJson;
    } catch (err) {
        console.log(err);
    }
};
const getHomeLocation = ()=>{
    return localStorage.getItem("defaultWeatherLocation");
};
const getCoordsFromApi = async (entryText, units)=>{
    const regex = /^\d+$/g;
    const flag = regex.test(entryText) ? "zip" : "q";
    // const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${WEATHER_API_KEY}`;
    const encodeUrl = encodeURI(url);
    try {
        const dataStream = await fetch(encodeUrl);
        const jsonData = await dataStream.json();
        console.log(dataStream, jsonData);
        return jsonData;
    } catch (err) {
        console.log(err.stack);
    }
};
const cleanText = (text)=>{
    const regex = / {2,}/g;
    const entryText = text.replaceAll(regex, "").trim();
    return entryText;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["jQVXF","1SICI"], "1SICI", "parcelRequire9014")

//# sourceMappingURL=index.18dbc454.js.map
