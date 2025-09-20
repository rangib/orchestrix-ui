<#
Quick CI helper for Windows developers. Run from repo root.
Usage: .\scripts\ci-checks.ps1
#>
Set-StrictMode -Version Latest
Write-Host "Running lint, type-check and unit tests..."
Push-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Definition)
Push-Location -Path "..\src"
npm ci
npm run lint
npx tsc --noEmit
npm run test:unit
Pop-Location
Pop-Location
