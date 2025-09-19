import { r as registerInstance, h } from './index-B1qHem3j.js';

const uxIconCss = ":host{display:inline-block}.ux-icon{display:block;stroke-width:2}.icon-sm{width:1rem;height:1rem}.icon-md{width:1.5rem;height:1.5rem}.icon-lg{width:2rem;height:2rem}.icon-xl{width:3rem;height:3rem}.icon-placeholder{display:flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;background:#f3f4f6;color:#9ca3af;border-radius:0.25rem;font-size:0.75rem;font-weight:600}";

const UxIcon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.name = '';
        this.size = 'md';
        this.color = 'currentColor';
    }
    getIconPath(name) {
        const icons = {
            'chevron-right': 'M9 5l7 7-7 7',
            'search': 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
            'user': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
            'settings': 'M12 15a3 3 0 100-6 3 3 0 000 6z',
            'home': 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z',
            'plus': 'M12 5v14m-7-7h14',
            'x': 'M18 6L6 18M6 6l12 12'
        };
        return icons[name] || '';
    }
    getSizeClass() {
        const sizes = {
            sm: 'icon-sm',
            md: 'icon-md',
            lg: 'icon-lg',
            xl: 'icon-xl'
        };
        return sizes[this.size];
    }
    render() {
        if (!this.name) {
            return h("div", { class: "icon-placeholder" }, "?");
        }
        const path = this.getIconPath(this.name);
        const sizeClass = this.getSizeClass();
        return (h("svg", { class: `ux-icon ${sizeClass}`, fill: "none", stroke: this.color, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: path })));
    }
};
UxIcon.style = uxIconCss;

export { UxIcon as ux_icon };
//# sourceMappingURL=ux-icon.entry.js.map
