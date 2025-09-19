import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ux-input',
  styleUrl: 'ux-input.css',
  shadow: true,
})
export class UxInput {
  @Prop() placeholder: string = '';
  @Prop() value: string = '';

  render() {
    return <input class="ux-input" placeholder={this.placeholder} value={this.value} />;
  }
}
