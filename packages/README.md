# Packages

This folder contains scaffolds for the Stencil component library and Storybook.

How to try locally (from repo root):

1. Install dependencies for a package (example: components):

```pwsh
cd packages/components
npm install
npm run start
```

2. Storybook (simple HTML-based example):

```pwsh
cd packages/storybook
npm install
npm run storybook
```

3. React wrapper usage (example)

```pwsh
cd packages/react-wrappers
npm install
```

Then within a React app (Next.js), register the custom elements once (for example in `_app.tsx`):

```tsx
import { useEffect } from 'react';
import '@orchestrix/components'; // after building components, exposes custom elements

export default function App({ Component, pageProps }) {
	useEffect(() => {
		// any polyfills or loader registration can go here
	}, []);

	return <Component {...pageProps} />;
}
```

And use the wrapper:

```tsx
import { UxButton } from '@orchestrix/react-wrappers';

export default function Demo() {
	return <UxButton variant="primary">Click me</UxButton>;
}
```

