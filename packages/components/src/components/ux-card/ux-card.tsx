import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ux-card',
  styleUrl: 'ux-card.css',
  shadow: true,
})
export class UxCard {
  @Prop() variant: 'default' | 'elevated' | 'outlined' = 'default';
  @Prop() padding: 'sm' | 'md' | 'lg' = 'md';

  render() {
    const classes = `card ${this.variant} ${this.padding}`;
    
    return (
      <div class={classes}>
        <div class="card-header">
          <slot name="header" />
        </div>
        <div class="card-body">
          <slot />
        </div>
        <div class="card-footer">
          <slot name="footer" />
        </div>
      </div>
    );
  }
}