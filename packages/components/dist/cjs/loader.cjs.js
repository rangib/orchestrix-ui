'use strict';

var index = require('./index-CPtwo_fA.js');
var appGlobals = require('./app-globals-V2Kpy_OQ.js');

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["ux-button.cjs",[[257,"ux-button",{"variant":[1],"size":[1],"disabled":[4],"loading":[4]}]]],["ux-card.cjs",[[257,"ux-card",{"variant":[1],"padding":[1]}]]],["ux-icon.cjs",[[257,"ux-icon",{"name":[1],"size":[1],"color":[1]}]]],["ux-input.cjs",[[257,"ux-input",{"placeholder":[1],"value":[1],"type":[1],"disabled":[4],"required":[4],"label":[1]}]]]], options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;
//# sourceMappingURL=loader.cjs.js.map
