import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'ux-button',
  styleUrl: 'ux-button.css',
  shadow: true,
})
export class UxButton {
  @Prop() variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';
  @Prop() disabled: boolean = false;
  @Prop() loading: boolean = false;

  @Event() buttonClick: EventEmitter<void>;

  private handleClick = (event: MouseEvent) => {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit();
    }
    event.preventDefault();
  };

  render() {
    const classes = `btn ${this.variant} ${this.size} ${this.loading ? 'loading' : ''}`;
    
    return (
      <button 
        class={classes} 
        disabled={this.disabled || this.loading}
        onClick={this.handleClick}
      >
        {this.loading && <span class="spinner"></span>}
        <span class="button-content">
          <slot />
        </span>
      </button>
    );
  }
}
