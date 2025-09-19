export default {
  title: 'Components/UX Input',
  parameters: {
    actions: {
      handles: ['inputChange', 'inputFocus', 'inputBlur'],
    },
  },
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
    <ux-input 
      type="${args.type}" 
      placeholder="${args.placeholder}"
      value="${args.value}"
      label="${args.label}"
      ${args.disabled ? 'disabled' : ''}
      ${args.required ? 'required' : ''}
    ></ux-input>
  `;
};

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  placeholder: 'Enter text...',
  value: '',
  label: '',
  disabled: false,
  required: false,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  type: 'text',
  placeholder: 'Enter your name',
  value: '',
  label: 'Full Name',
  disabled: false,
  required: false,
};

export const Required = Template.bind({});
Required.args = {
  type: 'email',
  placeholder: 'user@example.com',
  value: '',
  label: 'Email Address',
  disabled: false,
  required: true,
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  placeholder: 'Enter password',
  value: '',
  label: 'Password',
  disabled: false,
  required: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  type: 'text',
  placeholder: 'Disabled input',
  value: 'Cannot edit this',
  label: 'Disabled Field',
  disabled: true,
  required: false,
};

export const Number = Template.bind({});
Number.args = {
  type: 'number',
  placeholder: '0',
  value: '',
  label: 'Age',
  disabled: false,
  required: false,
};