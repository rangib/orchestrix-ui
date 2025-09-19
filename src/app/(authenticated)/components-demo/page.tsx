'use client';

import { isFeatureEnabled } from '@/lib/feature-flags';

export default function ComponentsDemo() {
  if (!isFeatureEnabled('USE_STENCIL_COMPONENTS')) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Stencil Components Demo</h1>
        <p className="text-gray-600">
          Stencil components are disabled. Set USE_STENCIL_COMPONENTS=true to enable them.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Stencil Components Demo</h1>
      
      {/* Button Examples */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ux-button variant="primary" size="md">Primary</ux-button>
          <ux-button variant="secondary" size="md">Secondary</ux-button>
          <ux-button variant="outline" size="md">Outline</ux-button>
          <ux-button variant="ghost" size="md">Ghost</ux-button>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <ux-button variant="primary" size="sm">Small</ux-button>
          <ux-button variant="primary" size="md">Medium</ux-button>
          <ux-button variant="primary" size="lg">Large</ux-button>
        </div>
        <div className="flex gap-4 mt-4">
          <ux-button variant="primary" disabled>Disabled</ux-button>
          <ux-button variant="primary" loading>Loading</ux-button>
        </div>
      </section>

      {/* Input Examples */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ux-input
            label="Full Name"
            placeholder="Enter your name"
            required
          ></ux-input>
          <ux-input
            type="email"
            label="Email Address"
            placeholder="user@example.com"
            required
          ></ux-input>
          <ux-input
            type="password"
            label="Password"
            placeholder="Enter password"
          ></ux-input>
          <ux-input
            type="number"
            label="Age"
            placeholder="0"
          ></ux-input>
        </div>
        <div className="mt-4">
          <ux-input
            label="Disabled Field"
            value="This field is disabled"
            disabled
          ></ux-input>
        </div>
      </section>

      {/* Icon Examples */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Icons</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 items-center">
          <div className="text-center">
            <ux-icon name="search" size="lg"></ux-icon>
            <p className="text-sm mt-1">Search</p>
          </div>
          <div className="text-center">
            <ux-icon name="user" size="lg"></ux-icon>
            <p className="text-sm mt-1">User</p>
          </div>
          <div className="text-center">
            <ux-icon name="home" size="lg"></ux-icon>
            <p className="text-sm mt-1">Home</p>
          </div>
          <div className="text-center">
            <ux-icon name="settings" size="lg"></ux-icon>
            <p className="text-sm mt-1">Settings</p>
          </div>
          <div className="text-center">
            <ux-icon name="plus" size="lg" color="#22c55e"></ux-icon>
            <p className="text-sm mt-1">Plus</p>
          </div>
          <div className="text-center">
            <ux-icon name="chevron-right" size="lg"></ux-icon>
            <p className="text-sm mt-1">Chevron</p>
          </div>
          <div className="text-center">
            <ux-icon name="x" size="lg" color="#ef4444"></ux-icon>
            <p className="text-sm mt-1">Close</p>
          </div>
          <div className="text-center">
            <ux-icon name="unknown" size="lg"></ux-icon>
            <p className="text-sm mt-1">Unknown</p>
          </div>
        </div>
      </section>

      {/* Card Examples */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ux-card variant="default" padding="md">
            <h3 slot="header" className="text-lg font-semibold">Default Card</h3>
            <p>This is a basic card with default styling and border.</p>
            <div slot="footer" className="text-sm text-gray-500">Footer content</div>
          </ux-card>
          
          <ux-card variant="elevated" padding="md">
            <h3 slot="header" className="text-lg font-semibold">Elevated Card</h3>
            <p>This card has a subtle shadow to appear elevated above the background.</p>
          </ux-card>
          
          <ux-card variant="outlined" padding="lg">
            <h3 slot="header" className="text-lg font-semibold">Outlined Card</h3>
            <p>This card has a thicker border and large padding for extra emphasis.</p>
            <div slot="footer">
              <ux-button variant="primary" size="sm">Action</ux-button>
            </div>
          </ux-card>
        </div>
      </section>

      {/* Combined Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Combined Example</h2>
        <ux-card variant="elevated" padding="lg">
          <div slot="header" className="flex items-center gap-2">
            <ux-icon name="user" size="md"></ux-icon>
            <h3 className="text-xl font-semibold">User Profile</h3>
          </div>
          
          <div className="space-y-4">
            <ux-input
              label="Display Name"
              placeholder="Enter your display name"
              value="John Doe"
            ></ux-input>
            
            <ux-input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value="john@example.com"
              required
            ></ux-input>
            
            <div className="flex items-center gap-2">
              <ux-icon name="settings" size="sm"></ux-icon>
              <span className="text-sm">Profile settings</span>
            </div>
          </div>
          
          <div slot="footer" className="flex gap-2 justify-end">
            <ux-button variant="ghost" size="md">Cancel</ux-button>
            <ux-button variant="primary" size="md">Save Changes</ux-button>
          </div>
        </ux-card>
      </section>
    </div>
  );
}