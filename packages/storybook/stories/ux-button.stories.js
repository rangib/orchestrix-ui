import '../..'; // no-op placeholder to keep relative paths clear

export default {
  title: 'Primitives/ux-button',
};

export const Primary = () => {
  const el = document.createElement('ux-button');
  el.innerText = 'Primary Button';
  el.setAttribute('variant', 'primary');
  return el;
};
