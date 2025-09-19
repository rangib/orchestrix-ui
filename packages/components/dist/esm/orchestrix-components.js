import { p as promiseResolve, b as bootstrapLazy } from './index-B1qHem3j.js';
export { s as setNonce } from './index-B1qHem3j.js';
import { g as globalScripts } from './app-globals-DQuL1Twl.js';

/*
 Stencil Client Patch Browser v4.37.0 | MIT Licensed | https://stenciljs.com
 */

var patchBrowser = () => {
  const importMeta = import.meta.url;
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await globalScripts();
  return bootstrapLazy([["ux-button",[[257,"ux-button",{"variant":[1],"size":[1],"disabled":[4],"loading":[4]}]]],["ux-card",[[257,"ux-card",{"variant":[1],"padding":[1]}]]],["ux-icon",[[257,"ux-icon",{"name":[1],"size":[1],"color":[1]}]]],["ux-input",[[257,"ux-input",{"placeholder":[1],"value":[1],"type":[1],"disabled":[4],"required":[4],"label":[1]}]]]], options);
});
//# sourceMappingURL=orchestrix-components.js.map
