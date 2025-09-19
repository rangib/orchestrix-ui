# Stencil Component Migration Guide

## Overview
This guide outlines the migration path from existing React components to the new Stencil web components in the orchestrix-ui application.

## Component Acceptance Criteria

Each Stencil component must meet the following criteria before being approved for production use:

### 1. Functional Requirements
- [ ] **API Compatibility**: All props and events match documented interface
- [ ] **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- [ ] **Responsive Design**: Works across mobile, tablet, and desktop viewports
- [ ] **Theme Integration**: Respects light/dark mode and brand colors
- [ ] **Performance**: No noticeable lag, efficient rendering, minimal bundle impact

### 2. Technical Requirements
- [ ] **TypeScript Support**: Full type definitions for props and events
- [ ] **React Integration**: React wrapper component with proper event handling
- [ ] **Storybook Documentation**: Comprehensive stories covering all variants
- [ ] **Test Coverage**: Unit tests with >80% coverage
- [ ] **Browser Compatibility**: Supports Chrome, Firefox, Safari, Edge (latest 2 versions)

### 3. Quality Gates
- [ ] **Visual Regression Tests**: Automated screenshot comparison
- [ ] **Accessibility Audit**: axe-core score of 90+ or documented exceptions
- [ ] **Bundle Size**: No more than 20KB gzipped per component
- [ ] **Code Review**: Approved by 2+ team members
- [ ] **Design Review**: Approved by design team

## Migration Process

### Phase 1: Preparation
1. **Audit Current Component**
   - Document all props, events, and behaviors
   - Identify usage patterns across the application
   - Create test scenarios for edge cases

2. **Design Validation**
   - Ensure Stencil component matches design system
   - Validate interaction patterns
   - Confirm responsive breakpoints

### Phase 2: Implementation
1. **Create Stencil Component**
   - Implement using `@Component` decorator
   - Add proper TypeScript interfaces
   - Include comprehensive JSDoc comments

2. **Build React Wrapper**
   - Create typed React component
   - Handle event mapping properly
   - Ensure ref forwarding works

3. **Write Tests**
   - Unit tests for component logic
   - Integration tests with React
   - Accessibility tests

### Phase 3: Integration
1. **Feature Flag Implementation**
   - Add component-specific feature flag
   - Implement conditional rendering
   - Create A/B testing framework

2. **Gradual Rollout**
   - Start with non-critical pages
   - Monitor error rates and performance
   - Collect user feedback

### Phase 4: Migration
1. **Replace Original Components**
   - Update imports to use Stencil version
   - Remove old React components
   - Update documentation

2. **Validation**
   - Run full regression test suite
   - Validate accessibility compliance
   - Performance benchmarking

## Component-Specific Migration Plans

### UxButton Migration

**Current State**: Using Tailwind-styled button components
**Target State**: Unified Stencil button with consistent behavior

**Migration Steps**:
1. ✅ **Completed**: Basic Stencil component with variants
2. ✅ **Completed**: React wrapper with event handling
3. ✅ **Completed**: Storybook stories for all variants
4. [ ] **Pending**: Visual regression tests setup
5. [ ] **Pending**: Accessibility audit and improvements
6. [ ] **Pending**: Integration tests with existing forms
7. [ ] **Pending**: Performance benchmarks vs current buttons

**Acceptance Criteria Checklist**:
- [x] Primary, secondary, outline, ghost variants implemented
- [x] Small, medium, large sizes supported
- [x] Loading and disabled states functional
- [x] TypeScript definitions complete
- [x] React wrapper with onClick event handling
- [ ] ARIA attributes for accessibility
- [ ] Focus management and keyboard navigation
- [ ] Visual regression tests passing
- [ ] Performance metrics within acceptable limits

### UxInput Migration

**Current State**: Various input implementations across features
**Target State**: Consistent input component with validation support

**Migration Steps**:
1. ✅ **Completed**: Basic input with label and validation states
2. ✅ **Completed**: React wrapper with change event handling
3. ✅ **Completed**: Storybook stories for all input types
4. [ ] **Pending**: Form integration testing
5. [ ] **Pending**: Validation error display
6. [ ] **Pending**: Auto-complete and accessibility features

**Acceptance Criteria Checklist**:
- [x] Text, email, password, number types supported
- [x] Label and placeholder functionality
- [x] Required field indicator
- [x] Disabled state handling
- [ ] Error state styling and messaging
- [ ] ARIA labels and descriptions
- [ ] Auto-complete attribute support
- [ ] Password visibility toggle (for password type)

### UxIcon Migration

**Current State**: Mixed icon implementations (Lucide, custom SVGs)
**Target State**: Unified icon component with consistent sizing

**Migration Steps**:
1. ✅ **Completed**: SVG-based icon component
2. ✅ **Completed**: Size variants and color customization
3. ✅ **Completed**: Storybook catalog of available icons
4. [ ] **Pending**: Icon optimization and lazy loading
5. [ ] **Pending**: Custom icon registration system
6. [ ] **Pending**: Animation support

**Acceptance Criteria Checklist**:
- [x] Core icon set implemented (home, user, settings, etc.)
- [x] Size variants (sm, md, lg, xl)
- [x] Color customization via CSS variables
- [ ] Optimized SVG output (< 1KB per icon)
- [ ] Graceful fallback for missing icons
- [ ] Animation support for interactive icons
- [ ] Icon search and discovery in Storybook

### UxCard Migration

**Current State**: Container components with various layouts
**Target State**: Flexible card component with slot-based content

**Migration Steps**:
1. ✅ **Completed**: Basic card with header/body/footer slots
2. ✅ **Completed**: Variant styles (default, elevated, outlined)
3. ✅ **Completed**: Padding size options
4. [ ] **Pending**: Advanced layout options
5. [ ] **Pending**: Interactive card states (hover, active)
6. [ ] **Pending**: Card composition patterns

**Acceptance Criteria Checklist**:
- [x] Header, body, footer slot support
- [x] Variant styles working correctly
- [x] Responsive behavior maintained
- [ ] Interactive states (hover effects, clickable cards)
- [ ] Nested card support
- [ ] Custom slot arrangements
- [ ] Animation transitions between states

## Development Workflow

### Local Development
```bash
# Start Stencil component development
cd packages/components
npm run start

# Run Storybook for testing
cd packages/storybook
npm run storybook

# Test integration with Next.js
cd src
USE_STENCIL_COMPONENTS=true npm run dev
```

### Testing Workflow
```bash
# Run component unit tests
cd packages/components
npm run test

# Run visual regression tests
npm run test:visual

# Accessibility testing
npm run test:a11y

# Integration testing
cd src
npm run test:integration
```

### Release Process
1. **Version Bump**: Update package.json versions
2. **Build Components**: `npm run build` in packages/components
3. **Generate Documentation**: Update Storybook build
4. **Integration Testing**: Full app testing with Stencil enabled
5. **Performance Validation**: Bundle size and runtime performance checks
6. **Deploy**: Update CDN with new component builds

## Troubleshooting

### Common Issues

**Components not loading in Next.js**
- ✅ Solution: Ensure Stencil components are copied to `public/orchestrix-components/`
- ✅ Solution: Verify `StencilLoader` is included in app layout
- ✅ Solution: Check feature flag `USE_STENCIL_COMPONENTS=true`

**TypeScript errors for web components**
- ✅ Solution: Ensure `src/types/stencil.d.ts` is included in tsconfig
- ✅ Solution: Add proper JSX.IntrinsicElements declarations

**Styling conflicts between Stencil and Tailwind**
- Solution: Use Stencil's Shadow DOM to isolate styles
- Solution: Use CSS custom properties for theme integration
- Solution: Prefix Tailwind classes when necessary

**Event handling in React wrappers**
- Solution: Use CustomEvent listeners in useEffect
- Solution: Properly clean up event listeners
- Solution: Type event payloads correctly

### Performance Monitoring

**Key Metrics to Track**:
- Bundle size impact (should be < 50KB total)
- First Contentful Paint (FCP) difference
- Largest Contentful Paint (LCP) impact
- Client-side rendering performance
- Memory usage during component lifecycle

**Monitoring Setup**:
```typescript
// Performance tracking
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.name.includes('ux-')) {
      console.log(`Component ${entry.name}: ${entry.duration}ms`);
    }
  });
});
observer.observe({ entryTypes: ['measure'] });
```

## Success Metrics

### Technical Metrics
- **Bundle Size**: Total Stencil components < 100KB gzipped
- **Performance**: No regression in Core Web Vitals
- **Test Coverage**: All components >80% coverage
- **Accessibility**: All components pass axe-core audit
- **Browser Support**: 99%+ compatibility in target browsers

### Business Metrics
- **Developer Velocity**: Faster component development
- **Design Consistency**: Reduced visual inconsistencies
- **Maintenance Overhead**: Fewer component-related bugs
- **Reusability**: Components used across multiple features

### User Experience Metrics
- **Page Load Time**: No increase in load times
- **Interaction Response**: Consistent response times
- **Accessibility**: Improved screen reader experience
- **Mobile Performance**: Maintained or improved mobile UX