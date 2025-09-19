export default {
  title: 'Components/UX Card',
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
    <ux-card 
      variant="${args.variant}" 
      padding="${args.padding}"
    >
      ${args.header ? `<div slot="header">${args.header}</div>` : ''}
      ${args.content}
      ${args.footer ? `<div slot="footer">${args.footer}</div>` : ''}
    </ux-card>
  `;
};

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  padding: 'md',
  header: '',
  content: '<p>This is a basic card with default styling. It has a simple border and clean appearance.</p>',
  footer: '',
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  variant: 'default',
  padding: 'md',
  header: '<h3>Card Title</h3>',
  content: '<p>This card has a header section that can contain titles or other important information.</p>',
  footer: '',
};

export const WithFooter = Template.bind({});
WithFooter.args = {
  variant: 'default',
  padding: 'md',
  header: '',
  content: '<p>This card has a footer section that can contain actions, timestamps, or additional info.</p>',
  footer: '<small>Last updated: 2 hours ago</small>',
};

export const Complete = Template.bind({});
Complete.args = {
  variant: 'default',
  padding: 'md',
  header: '<h3>Complete Card</h3>',
  content: '<p>This card demonstrates all sections: header, body, and footer. Perfect for complex content layouts.</p>',
  footer: '<button>Action Button</button>',
};

export const Elevated = Template.bind({});
Elevated.args = {
  variant: 'elevated',
  padding: 'md',
  header: '<h3>Elevated Card</h3>',
  content: '<p>This card has a shadow to appear elevated above the background. Great for highlighting important content.</p>',
  footer: '',
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  padding: 'md',
  header: '<h3>Outlined Card</h3>',
  content: '<p>This card has a thicker border for more definition. Useful when you need stronger visual separation.</p>',
  footer: '',
};

export const SmallPadding = Template.bind({});
SmallPadding.args = {
  variant: 'default',
  padding: 'sm',
  header: '',
  content: '<p>Small padding for compact layouts.</p>',
  footer: '',
};

export const LargePadding = Template.bind({});
LargePadding.args = {
  variant: 'elevated',
  padding: 'lg',
  header: '<h2>Spacious Card</h2>',
  content: '<p>Large padding creates more breathing room and makes the content feel more spacious and comfortable to read.</p>',
  footer: '<button>Large Action</button>',
};