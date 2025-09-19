import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ux-icon',
  styleUrl: 'ux-icon.css',
  shadow: true,
})
export class UxIcon {
  @Prop() name: string = '';
  @Prop() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Prop() color: string = 'currentColor';

  private getIconPath(name: string): string {
    const icons: { [key: string]: string } = {
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

  private getSizeClass(): string {
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
      return <div class="icon-placeholder">?</div>;
    }

    const path = this.getIconPath(this.name);
    const sizeClass = this.getSizeClass();

    return (
      <svg 
        class={`ux-icon ${sizeClass}`}
        fill="none" 
        stroke={this.color} 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={path}></path>
      </svg>
    );
  }
}