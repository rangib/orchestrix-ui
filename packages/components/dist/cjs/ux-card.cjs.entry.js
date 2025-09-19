'use strict';

var index = require('./index-CPtwo_fA.js');

const uxCardCss = ":host{display:block}.card{border-radius:0.5rem;background:white;overflow:hidden}.card.default{border:1px solid #e5e7eb}.card.elevated{box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)}.card.outlined{border:2px solid #e5e7eb}.card.sm{padding:0.75rem}.card.md{padding:1.5rem}.card.lg{padding:2rem}.card-header{margin-bottom:1rem}.card-header:empty{display:none;margin:0}.card-body{flex:1}.card-footer{margin-top:1rem}.card-footer:empty{display:none;margin:0}";

const UxCard = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.variant = 'default';
        this.padding = 'md';
    }
    render() {
        const classes = `card ${this.variant} ${this.padding}`;
        return (index.h("div", { key: '058c07b988435135f61b727c4255732071a87b91', class: classes }, index.h("div", { key: '3519d47d0b804a95f571d331c8c2691f4edccf41', class: "card-header" }, index.h("slot", { key: 'e4d266a7e2921234971f1a0903e4620b6a8f2715', name: "header" })), index.h("div", { key: 'ec477c533b4d17e24d56dfe80bab37b7719954a0', class: "card-body" }, index.h("slot", { key: '7bcba9fefd435c5b013aa7471d5b126b26326293' })), index.h("div", { key: 'ec14d65278f3f1ea45fa7b28c6f71e746071285e', class: "card-footer" }, index.h("slot", { key: '612c94e71f6f69ddf1251868df3b179956ad05f5', name: "footer" }))));
    }
};
UxCard.style = uxCardCss;

exports.ux_card = UxCard;
//# sourceMappingURL=ux-card.entry.cjs.js.map
