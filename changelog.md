# Changelog  
All notable changes to this project will be documented in this file.

---

---

## 🎨 v1.0.2 — 2026-02-22
**User-Customisable Colors, Editor Polish & Extended Language Support**

### ✨ New Features

#### Configurable Card Colors 🎨
- All key card colors are now fully configurable via the GUI editor
- New **Colors** section added to the Conf. tab with fields for:
  - `boxBg` — device box background color
  - `dashboardBg` — overall card background color
  - `boxShadow` — box border glow / shadow color
  - `anchor` — anchor connector dot color
  - `line` — power flow line color
- Colors stored in config under `colors.*` and applied at render time
- Both dark and light themes independently support custom colors
- Theme defaults are preserved as fallbacks when no custom color is set

#### Reset to Defaults Button 🔄
- One-click **Reset to defaults** button clears all custom colors and restores theme defaults
- Available directly inside the Colors section of the editor

#### Theme-Aware Color Placeholders
- Each color field placeholder now shows the actual default for the active theme
  (e.g. `#1f2a3c` in dark mode, `#ffffff` in light mode) instead of a generic hint

#### Color Input Sanitisation
- Color fields now auto-normalise input on save:
  ▸ strips extra `#` characters (`##1F2A3C` → `#1f2a3c`)
  ▸ lowercases hex values
  ▸ accepts input with or without leading `#`

#### Helper Text on Color Fields
- Each color field shows a subtitle explaining exactly what it controls
  (e.g. *"Border glow and shadow around each box"*)

#### Version Badge in Editor
- Card version number (`v0.1.2`) now displayed in the top-right of the Conf. tab
- Users can always confirm which version is installed without leaving the editor

### 🌍 Internationalization

#### New Languages Added 🗣️
- **Spanish** (`lang-es.js`) — full translation of all keys
- **Portuguese** (`lang-pt.js`) — full translation of all keys
- **Italian** (`lang-it.js`) — full translation of all keys
- Total supported languages: **7** (EN, DE, FR, NL, ES, PT, IT)

#### New Translation Keys (all 7 languages)
- `colors` — Colors section label
- `color_box_bg` / `color_box_bg_help`
- `color_dashboard_bg` / `color_dashboard_bg_help`
- `color_box_shadow` / `color_box_shadow_help`
- `color_anchor` / `color_anchor_help`
- `color_line` / `color_line_help`
- `colors_reset` — Reset to defaults button

### 🔧 Improvements

#### Editor UX
- Colors section wrapped in a `contMenu` bordered container with `headerMenu` label — visually consistent with the rest of the editor layout
- Color fields render two per row to reduce scrolling
- `helper-text` attribute added to color fields using the same pattern as existing animation threshold field

#### CSS Architecture
- `css-dark.js` and `css-light.js` functions now accept a `colors` object parameter
- Internal CSS variables (`--box-background-color`, `--box-shadow-color`, `--anchor-color`, `--line-color`) remain unchanged — full backward compatibility
- Color values injected directly into CSS template at render time

### 🔄 Backward Compatibility

- All existing configurations continue to work without modification
- If no custom colors are configured, theme defaults are used exactly as before
- `cssDataDark()` and `cssDataLight()` can still be called without arguments

---

## 🎯 v1.0.1 — 2025-12-11
Smart Power Flow & Enhanced Display Control
✨ New Features

### Configurable Animation Threshold ⚡

- Animated balls now intelligently appear/disappear based on power flow
- Default threshold: 5W (configurable via GUI)
- Works with both positive and negative power values
- Smooth fade transition when power crosses threshold
- Perfect for hiding animation during standby/idle periods

### Footer Decimal Control 📊

New footerDecimals parameter (0-3 decimal places)
Configure precision per your needs:

- 0 = integers only (default, backward compatible)
- 1 = one decimal place (e.g., 230.5 V)
- 2 = two decimal places (e.g., 12.34 A)
- 3 = three decimal places (e.g., 50.123 Hz)

- Main sensor values remain rounded for clarity
Adjustable directly in the GUI editor


### 🐛 Bug Fixes

- Fixed typo in English translation: "3th" → "3rd" footer entity
- Corrected sensor2 style application (was referencing wrong style path)
- Improved null/undefined handling in formatValue() function
- Better error handling for edge cases in power calculations

### 🔧 Improvements

- Enhanced formatValue() function with decimal parameter support
- Optimized ball animation visibility control
- Cleaner event handler management in editor
- Removed duplicate console.log statements

### 🌍 Internationalization

Updated all language files (EN, FR, DE, NL) with new translations:

- animation_threshold: Animation threshold setting
- animation_threshold_help: Helper text explaining functionality
- footer_decimals: Decimal places setting
- footer_decimals_help: Helper text for decimal configuration

### 📚 Documentation

Comprehensive README update with new features
Added configuration examples for new parameters
New troubleshooting sections:

"Balls not appearing" guide
"Footer decimal configuration" guide


Enhanced MQTT sensor examples showing decimal usage
Complete rounding & formatting behavior documentation

### 🔄 Backward Compatibility

- All changes are fully backward compatible
- Existing configurations work without modification
- Default values match previous behavior
- New features are opt-in via GUI settings

---

## 🚀 v1.0.0 — 2025-12-06  
**First official release**

### ✨ New Features
- VRM-style multi-ball power flow animation  
  ▸ evenly spaced dots along links  
  ▸ adjustable speed and spacing (`speedFactor`, `spacingPx`, `ballRadius`)  
- Dutch (`lang-nl.js`) and German (`lang-de.js`) language support added  
- Added complete example configuration (`example.yaml`) including:
  ▸ Grid, Solar, Inverter/Charger, AC Loads, Essential Loads, Battery

### 🧩 UX & Behavior Improvements
- Consistent numeric rounding / formatting applied to:
  ▸ header values  
  ▸ secondary entity values  
  ▸ footer values  
- Improved device footer alignment and spacing
- Better path validation and error handling  
  ▸ prevents `NaN` animation issues

### 📚 Documentation Upgrades
- Major README overhaul:
  ▸ YAML configuration reference  
  ▸ MQTT sensor examples for Victron Cerbo GX  
  ▸ Troubleshooting guide  
  ▸ Animation tuning instructions  
  ▸ Full VRM-style usage example

### 🛠 Code & Developer Experience
- Logs and console messages translated to English for clarity
- UI/editor improvements in:
  ▸ `lib-editor.js`  
  ▸ `css-editor.js`  
  ▸ `editor.js`  
- Cleanup and consistency fixes in `lib-venus.js`

---

## Notes
This version brings essential functionality and documentation to a production-ready state and significantly improves end-user onboarding and VRM design accuracy.

Further enhancements (HACS metadata, auto layout, versioning, smart behavior) are planned for future releases.

---

## Contributors
- @KoenHHH — Enhancements, translations, animation upgrades
- Original base by @skydarc  
