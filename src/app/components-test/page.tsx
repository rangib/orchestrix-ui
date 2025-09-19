"use client";
import { useState } from "react";
import { Button } from "@/features/ui/button";
import { Input } from "@/features/ui/input";
import { isFeatureEnabled } from "@/lib/feature-flags";

export default function ComponentsTestPage() {
  const [inputValue, setInputValue] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  
  const isStencilEnabled = isFeatureEnabled('USE_STENCIL_COMPONENTS');

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Component Implementation Test</h1>
          <div className={`inline-flex px-4 py-2 rounded-lg text-sm font-medium ${
            isStencilEnabled 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            Currently using: {isStencilEnabled ? 'Stencil Components' : 'React Components'}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Button Components</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="default" onClick={() => setButtonClicked(!buttonClicked)}>
                Primary Button
              </Button>
              <Button variant="secondary">
                Secondary Button
              </Button>
              <Button variant="outline">
                Outline Button
              </Button>
              <Button variant="ghost">
                Ghost Button
              </Button>
            </div>
            
            {buttonClicked && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                ✅ Button click event working! (Component type: {isStencilEnabled ? 'Stencil' : 'React'})
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Input Components</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Text Input:</label>
                <Input
                  type="text"
                  placeholder="Enter some text..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email Input:</label>
                <Input
                  type="email"
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password Input:</label>
                <Input
                  type="password"
                  placeholder="Enter password..."
                />
              </div>
            </div>

            {inputValue && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                📝 Input value: &ldquo;{inputValue}&rdquo; (Component type: {isStencilEnabled ? 'Stencil' : 'React'})
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-2">Implementation Details:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Feature flag <code>USE_STENCIL_COMPONENTS</code>: {isStencilEnabled ? 'enabled' : 'disabled'}</li>
              <li>• Components are using {isStencilEnabled ? 'Stencil web components with React wrappers' : 'native React components'}</li>
              <li>• Both implementations share the same API for seamless migration</li>
              <li>• Stencil components provide Shadow DOM isolation and framework-agnostic reusability</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Toggle the <code>USE_STENCIL_COMPONENTS</code> environment variable to switch between implementations
          </p>
        </div>
      </div>
    </div>
  );
}