# Orchestrix UI Component Library

This directory contains the modular component library for the orchestrix-ui application, featuring Stencil web components, React wrappers, and comprehensive Storybook documentation.

## Architecture

```
packages/
├── components/          # Stencil web components
├── react-wrappers/      # React component wrappers
└── storybook/          # Component documentation and examples
```

## Quick Start

### Development Setup
```bash
# Install dependencies for all packages
npm install

# Start Stencil component development
cd packages/components
npm run start

# Run Storybook for component documentation
cd packages/storybook
npm run storybook

# Build all components for production
cd packages/components
npm run build
```

### Using Components in Next.js App
```bash
# Enable Stencil components
cd src
USE_STENCIL_COMPONENTS=true npm run dev

# Visit the demo page
# http://localhost:3000/components-demo
```

## Components

### UxButton
Professional button component with multiple variants and states.

**Variants**: `primary`, `secondary`, `outline`, `ghost`  
**Sizes**: `sm`, `md`, `lg`  
**States**: `disabled`, `loading`

```html
<!-- Web Component -->
<ux-button variant="primary" size="md">Click Me</ux-button>

<!-- React Wrapper -->
import { UxButton } from '@orchestrix/react-wrappers';
<UxButton variant="primary" onClick={handleClick}>Click Me</UxButton>
```

This component library is part of the orchestrix-ui project and follows the same licensing terms.

