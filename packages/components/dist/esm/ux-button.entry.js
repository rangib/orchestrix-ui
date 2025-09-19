import { r as registerInstance, c as createEvent, h } from './index-B1qHem3j.js';

const uxButtonCss = ":host{display:inline-block}.btn{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;border-radius:0.375rem;border:none;cursor:pointer;font-weight:600;transition:all 0.2s;text-decoration:none;white-space:nowrap}.btn:disabled{cursor:not-allowed;opacity:0.5}.btn.loading{cursor:not-allowed}.btn.sm{padding:0.5rem 0.75rem;font-size:0.875rem}.btn.md{padding:0.75rem 1rem;font-size:1rem}.btn.lg{padding:1rem 1.5rem;font-size:1.125rem}.btn.primary{background:#2563eb;color:white}.btn.primary:hover:not(:disabled):not(.loading){background:#1d4ed8}.btn.secondary{background:#e5e7eb;color:#111827}.btn.secondary:hover:not(:disabled):not(.loading){background:#d1d5db}.btn.outline{background:transparent;color:#2563eb;border:1px solid #2563eb}.btn.outline:hover:not(:disabled):not(.loading){background:#2563eb;color:white}.btn.ghost{background:transparent;color:#374151}.btn.ghost:hover:not(:disabled):not(.loading){background:#f3f4f6}.spinner{width:1rem;height:1rem;border:2px solid transparent;border-top:2px solid currentColor;border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.button-content{display:flex;align-items:center;gap:0.25rem}";

const UxButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.buttonClick = createEvent(this, "buttonClick");
        this.variant = 'primary';
        this.size = 'md';
        this.disabled = false;
        this.loading = false;
        this.handleClick = (event) => {
            if (!this.disabled && !this.loading) {
                this.buttonClick.emit();
            }
            event.preventDefault();
        };
    }
    render() {
        const classes = `btn ${this.variant} ${this.size} ${this.loading ? 'loading' : ''}`;
        return (h("button", { key: 'd1b71a014f25295502781635a8fc2107889fe47a', class: classes, disabled: this.disabled || this.loading, onClick: this.handleClick }, this.loading && h("span", { key: 'e4ea6511e2df5b6f7349d1acb0bde3d19d2c179b', class: "spinner" }), h("span", { key: '11a6287560a1a9c2918b8e7681cd5adf7f45eea4', class: "button-content" }, h("slot", { key: '272db15e7085d1f60e475cdbed61f32bab30eb7c' }))));
    }
};
UxButton.style = uxButtonCss;

export { UxButton as ux_button };
//# sourceMappingURL=ux-button.entry.js.map
