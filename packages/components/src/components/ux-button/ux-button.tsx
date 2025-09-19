import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ux-button',
  styleUrl: 'ux-button.css',
  shadow: true,
})
export class UxButton {
  @Prop() variant: 'primary' | 'secondary' = 'primary';
  @Prop() disabled: boolean = false;

  render() {
    const cls = `btn ${this.variant}`;
    return (
      <button class={cls} disabled={this.disabled}>
        <slot />
      </button>
    );
  }
}
