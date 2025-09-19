import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'ux-input',
  styleUrl: 'ux-input.css',
  shadow: true,
})
export class UxInput {
  @Prop() placeholder: string = '';
  @Prop() value: string = '';
  @Prop() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() label: string = '';

  @Event() inputChange: EventEmitter<string>;
  @Event() inputBlur: EventEmitter<void>;
  @Event() inputFocus: EventEmitter<void>;

  private handleInput = (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    this.inputChange.emit(target.value);
  };

  private handleBlur = () => {
    this.inputBlur.emit();
  };

  private handleFocus = () => {
    this.inputFocus.emit();
  };

  render() {
    return (
      <div class="input-container">
        {this.label && (
          <label class="input-label">
            {this.label}
            {this.required && <span class="required">*</span>}
          </label>
        )}
        <input 
          class="ux-input" 
          type={this.type}
          placeholder={this.placeholder} 
          value={this.value}
          disabled={this.disabled}
          required={this.required}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
      </div>
    );
  }
}
