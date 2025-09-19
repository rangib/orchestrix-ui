'use strict';

var index = require('./index-CPtwo_fA.js');
var appGlobals = require('./app-globals-V2Kpy_OQ.js');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
/*
 Stencil Client Patch Browser v4.37.0 | MIT Licensed | https://stenciljs.com
 */

var patchBrowser = () => {
  const importMeta = (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('orchestrix-components.cjs.js', document.baseURI).href));
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return index.promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["ux-button.cjs",[[257,"ux-button",{"variant":[1],"size":[1],"disabled":[4],"loading":[4]}]]],["ux-card.cjs",[[257,"ux-card",{"variant":[1],"padding":[1]}]]],["ux-icon.cjs",[[257,"ux-icon",{"name":[1],"size":[1],"color":[1]}]]],["ux-input.cjs",[[257,"ux-input",{"placeholder":[1],"value":[1],"type":[1],"disabled":[4],"required":[4],"label":[1]}]]]], options);
});

exports.setNonce = index.setNonce;
//# sourceMappingURL=orchestrix-components.cjs.js.map
