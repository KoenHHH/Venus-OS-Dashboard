# Changelog  
All notable changes to this project will be documented in this file.

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
