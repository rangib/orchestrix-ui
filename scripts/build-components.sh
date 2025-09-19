#!/bin/bash

echo "🔨 Building Stencil components..."

# Build Stencil components
cd ../packages/components
npm run build

# Copy built components to Next.js public directory
echo "📦 Copying Stencil components to public directory..."
cp -r www/build/* ../../src/public/orchestrix-components/

echo "✅ Stencil components built and copied successfully!"