export default {
  title: 'Components/UX Icon',
};

const Template = (args) => {
  // Import the Stencil components loader
  const script = document.createElement('script');
  script.src = '../../components/dist/orchestrix-components/orchestrix-components.js';
  script.type = 'module';
  if (!document.head.querySelector('script[src*="orchestrix-components"]')) {
    document.head.appendChild(script);
  }
  
  return `
    <ux-icon 
      name="${args.name}" 
      size="${args.size}"
      color="${args.color}"
    ></ux-icon>
  `;
};

export const Search = Template.bind({});
Search.args = {
  name: 'search',
  size: 'md',
  color: 'currentColor',
};

export const User = Template.bind({});
User.args = {
  name: 'user',
  size: 'md',
  color: 'currentColor',
};

export const Home = Template.bind({});
Home.args = {
  name: 'home',
  size: 'md',
  color: 'currentColor',
};

export const Settings = Template.bind({});
Settings.args = {
  name: 'settings',
  size: 'md',
  color: 'currentColor',
};

export const Plus = Template.bind({});
Plus.args = {
  name: 'plus',
  size: 'md',
  color: 'currentColor',
};

export const ChevronRight = Template.bind({});
ChevronRight.args = {
  name: 'chevron-right',
  size: 'md',
  color: 'currentColor',
};

export const Close = Template.bind({});
Close.args = {
  name: 'x',
  size: 'md',
  color: 'currentColor',
};

export const Small = Template.bind({});
Small.args = {
  name: 'search',
  size: 'sm',
  color: 'currentColor',
};

export const Large = Template.bind({});
Large.args = {
  name: 'search',
  size: 'lg',
  color: 'currentColor',
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  name: 'search',
  size: 'xl',
  color: 'currentColor',
};

export const Colored = Template.bind({});
Colored.args = {
  name: 'home',
  size: 'lg',
  color: '#2563eb',
};