# Venus OS Dashboard

![Home Assistant](https://img.shields.io/badge/home%20assistant-%2341BDF5.svg?style=for-the-badge&logo=home-assistant&logoColor=white)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)
![GitHub Release](https://img.shields.io/github/v/release/KoenHHH/Venus-OS-Dashboard?style=for-the-badge&logo=github)
![GitHub Pre-Release](https://img.shields.io/github/v/release/KoenHHH/Venus-OS-Dashboard?include_prereleases&style=for-the-badge&logo=github&label=PRERELEASE)
![GitHub Tag](https://img.shields.io/github/v/tag/KoenHHH/Venus-OS-Dashboard?style=for-the-badge&color=yellow)
![GitHub branch status](https://img.shields.io/github/checks-status/KoenHHH/Venus-OS-Dashboard/main?style=for-the-badge)
![stars](https://img.shields.io/github/stars/KoenHHH/Venus-OS-Dashboard.svg?style=for-the-badge)
![home](https://img.shields.io/github/last-commit/KoenHHH/Venus-OS-Dashboard.svg?style=for-the-badge)
![commits](https://img.shields.io/github/commit-activity/y/KoenHHH/Venus-OS-Dashboard?style=for-the-badge)
![license](https://img.shields.io/github/license/KoenHHH/Venus-OS-Dashboard?style=for-the-badge&logo=opensourceinitiative&logoColor=white&color=0080ff)

![victron](https://github.com/user-attachments/assets/cf84bf5c-2b7a-4634-9634-8b4ec642473f)

## **What is Venus OS Dashboard ?**

Venus OS Dashboard is a card that replicates the look and feel of the Venus OS GUI v2 from Victron VRM.
First card is the official VRM APP, the second one is this card.

---

### Features

-   🛠  Full editor for all options (no need to edit `yaml`)
-   😍 Icon picker
-   ⚓ Entity picker
-   🚀 Zero dependencies : no need to install additional cards.
-   🌈 Based on Material UI
-   🌓 Supports both light and dark themes
-   🌎 Internationalization

## Behavioral / Feature Differences

| Feature / Area | Original Repo | Fork (Your Version) |
|----------------|:-------------:|-------------------:|
| Power flow animation | Single moving ball | Multi-ball VRM-style dot train (`spacingPx`, `ballRadius`, `speedFactor`) |
| Numeric formatting / rounding | Only main sensor rounded | All values rounded: header, entity2, footer (`formatValue()`) |
| Localization | Mixed / partially French | English logs + added Dutch & German translations |
| Documentation / README | Minimal, no YAML config | Full configuration reference, MQTT guide, troubleshooting |
| Example layout | Not included | Added `example.yaml` (Grid, Solar, Inverter, Loads, Battery) |
| Editor / UX | Some untranslated UI | Improved editor UI, translated strings |
| Runtime validation | Less validation of anchors/paths | Added NaN safeguards & error handling |
| VRM visual match | Limited resemblance | Updated icons, animations, sizing — closer to VRM style |


---

## **Installation**

### HACS

[![HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=KoenHHH&repository=Venus-OS-Dashboard&category=plugin)

1. Make sure [HACS](https://hacs.xyz/) is installed in your Home Assistant instance
2. Add this repository as a custom repository in HACS:
   - Go to HACS
   - Click the three dots in the top right corner
   - Select "Custom repositories"
   - Add the URL of this repository
   - Select "dashboard" as the category
3. Click "Install" in HACS
4. Restart Home Assistant

And voilà! Venus OS Dashboard should now be available in the Lovelace card picker menu.

Enjoy! 🎉

---

## Usage

Venus OS Dashboard can be configured using Dashboard UI editor.

1. In Dashboard UI, click 3 dots in top right corner.
2. Click _Edit Dashboard_.
3. Click Plus button to add a new card.
4. Find the Venus OS Dashboard card in the list.

## Configuration reference

### Top-level keys

- type: custom:venus-os-dashboard — card type.
- param — layout parameters.
   - boxCol1, boxCol2, boxCol3 — number of boxes in each dashboard column. (Integers)
- theme — "dark", "light", or "auto".
- styles — sizing controls:
- header, sensor, footer — "auto" or a pixel value (e.g. 16). "auto" adapts based on box width.

### devices (required)

A map of device boxes keyed by "<column>-<box>" (for example 1-1, 2-1, 3-2). Each device entry supports:

- name — display title (string).

- icon — mdi or other icon string.

- entity — main entity shown large in the box (e.g., sensor.grid_total).

- headerEntity — optional small value shown in header (e.g., battery temperature).

- entity2 — optional second sensor shown near main sensor (smaller).

- footerEntity1 / footerEntity2 / footerEntity3 — optional values shown in the footer row (three cols).

- graph: true — show mini-history graph in that box (requires historical data).

- gauge: true — show vertical gauge fill (expects percentage % to work correctly).

- anchors — define anchor points on the box used to connect links. Format: comma-separated items T-2, B-1, L-1, R-1 where T/B/L/R = top/bottom/left/right and number = position index. Example: "L-1, B-2, R-1".

- link — map of link definitions (named, e.g. "1", "2"). Each link object:

   - start — anchor id on this box (e.g. R-1).

   - end — anchor id on the target box (e.g. 2-1_L-1 — this uses target box coordinate format).

   - entity — optional entity controlling direction/speed of animated balls along the link.

   - inv: "true" — optional flag to invert direction for that link (inv means the link's direction multiplier will be toggled).

### How anchors and links work

- When rendering boxes, the card creates anchor DOM elements at positions on box edges (left, right, top, bottom).

- creatAnchors() positions anchors evenly depending on the number specified (e.g., B-2 creates two anchors along the bottom).

- creatLine() draws an SVG path between anchor coordinates and creates animated "balls" following the path.

- If you see NaN warnings in console the anchor ID might not exist or layout not yet ready — check your anchors strings and box ids.

### Creating sensors (Victron Cerbo / MQTT)

- If you use Victron + Cerbo + MQTT you’ll often get power topics like:
  ```yaml
  cerbo/N/<id>/system/0/Ac/Consumption/L1/Power
  cerbo/N/<id>/system/0/Ac/ConsumptionOnInput/L1/Power
   ```
- Example MQTT sensor entries to add to sensor.yaml:
  ```yaml
   - platform: mqtt
     unique_id: cerbo_ac_consumption_l1_power
     name: "AC Consumption L1 Power"
     state_topic: "cerbo/N/c0619ab3c7c5/system/0/Ac/Consumption/L1/Power"
     device_class: power
     state_class: measurement
     unit_of_measurement: "W"
     value_template: "{{ value | float | round(0) }}"

   - platform: mqtt
     unique_id: cerbo_ac_consumption_on_input_l1_power
     name: "AC Consumption On Input L1 Power"
     state_topic: "cerbo/N/c0619ab3c7c5/system/0/Ac/ConsumptionOnInput/L1/Power"
     device_class: power
     state_class: measurement
     unit_of_measurement: "W"
     value_template: "{{ value | float | round(0) }}"
   ```
- If the MQTT messages are JSON with { "value": 123 } use value_json.value in the value_template.

### Rounding & numeric formatting

- The dashboard code previously rounded the main entity value but left headerEntity, entity2 and the footer values unrounded. If you want all displayed numbers rounded (or to show 1/2 decimals), add a small helper in fillBox():
  ```yaml
  function formatValue(raw) {
  if (raw === undefined || raw === null) return '';
  if (raw === 'N/C' || raw === 'unavailable' || raw === 'unknown') return raw;
  const n = parseFloat(raw);
  return isNaN(n) ? raw : Math.round(n); // change rounding here if you want decimals
   }
  ```
  Then call formatValue(...) for all state.state uses.

### Troubleshooting

- Empty graphs / no historic data — make sure recorder includes the entities and that HA's history is recording them.
   
- Anchor/NaN errors — verify anchors syntax and boxCol sizes; check in browser console the DOM to confirm anchors exist with expected IDs.
   
- Only one dot on path — path is likely very short. Check anchor positions; increase spacingPx or reduce it to force more dots. Also ensure path.getTotalLength() returns a value — certain SVG path commands/format may cause problems.
   
- External control / Inverter state not showing — subscribe to cerbo/N/<your-id>/# with an MQTT client (MQTT Explorer) to find which topic maps to the inverter state. Often settings/Settings/CGwacs/Hub4Mode or system/0/Ac/Inverter/State or vebus/<deviceid>/State contain the useful state.
   
- Widgets not responsive — ensure checkReSize() is called or use razDashboardOldWidth() after resizing; the card uses the bounding rect to recalc layout.
   
- Ball animation too fast / slow — tune speedFactor and spacingPx.
