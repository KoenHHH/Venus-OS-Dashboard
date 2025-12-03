console.info(
  "%c 🗲 %c - %cVenus OS BD%c - %c 🗲 \n%c version 0.1.18 ",
  "color: white; font-weight: bold; background: black",
  "color: orange; font-weight: bold; background: blue; font-weight: bold;",
  "color: white; font-weight: bold; background: blue; text-decoration: underline; text-decoration-color: orange; text-decoration-thickness: 5px; text-underline-offset: 2px;",
  "color: orange; font-weight: bold; background: blue; font-weight: bold;",
  "color: white; font-weight: bold; background: black",
  "color: white; font-weight: bold; background: grey"
);

import './editor.js';
import * as libVenus from './lib-venus.js';

import { cssDataDark } from './css-dark.js?v=0.1';
import { cssDataLight } from './css-light.js?v=0.1';

class venusOsDashboardCard extends HTMLElement {

  static isDark = true;

  static periodicTaskStarted = false;

  static cycle = 0;

  constructor() {
    super();

    document.addEventListener('config-changed', (event) => {
      libVenus.razDashboardOldWidth();
    });

  }

  setConfig(config) {

    this.config = config;

    if (!this.content) {
      this._createCardStructure();
    }
  }

  _createCardStructure() {

    if (!this.content) {

      const cardElem = document.createElement('ha-card');
      this.appendChild(cardElem);

      const contElem = document.createElement('div');
      contElem.setAttribute('id', 'db-container');
      contElem.setAttribute('class', 'db-container');
      cardElem.appendChild(contElem);

      this.content = this.querySelector("div");

      window.contElem = this.content;

    }

    const param = this.config.param || [];

    libVenus.baseRender(this.config, this.content);

    const boxCol1 = param.boxCol1 ? Math.min(Math.max(param.boxCol1, 1), 4) : 1;
    const boxCol2 = param.boxCol2 ? Math.min(Math.max(param.boxCol2, 1), 2) : 1;
    const boxCol3 = param.boxCol3 ? Math.min(Math.max(param.boxCol3, 1), 4) : 1;

    if (this.config.demo !== true) libVenus.addBox(boxCol1, boxCol2, boxCol3, this.content);

    if (this.config.demo !== true) libVenus.addAnchors(this.config, this.content);

  }

  set hass(hass) {

    this._hass = hass;

    if (this._hass) {

      const isDarkTheme = this._hass.themes.darkMode;

      let style = this.querySelector('style');
      if (!style) {
        style = document.createElement('style');
        this.querySelector('ha-card').appendChild(style);
      }

      if ((isDarkTheme && this.config.theme === 'auto') || this.config.theme === 'dark') {
        style.textContent = cssDataDark();
        venusOsDashboardCard.isDark = true;
      } else {
        style.textContent = cssDataLight();
        venusOsDashboardCard.isDark = false;
      }
    }

    if (this.config.demo === true) return;

    if (venusOsDashboardCard.cycle >= 10) return;

    const devices = this.config.devices || [];
    const styles = this.config.styles || "";
    
    libVenus.fillBox(this.config, styles, venusOsDashboardCard.isDark, hass, this.content);

    libVenus.checkReSize(devices, venusOsDashboardCard.isDark, this.content);

    libVenus.checkForReverse(devices, hass);

    if (!this.periodicTaskStarted) {
      const taskStarted = libVenus.startPeriodicTask(this.config, hass);

      if (taskStarted) {
        this.periodicTaskStarted = true; 
      } else {
        this.periodicTaskStarted = false;
      }
    }
  }

  static getConfigElement(hass) {
    const editor = document.createElement('venus-os-editor');
    editor.hass = hass;
    return editor;
  }

  static getStubConfig(hass) {
    return libVenus.getDefaultConfig(hass);
  }

  getCardSize() {
    return 1;
  }

  disconnectedCallback() {
    libVenus.clearAllIntervals();
  }

}
customElements.define('venus-os-dashboard', venusOsDashboardCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'venus-os-dashboard',
  name: 'Venus OS Dashboard V2',
  preview: true,
  description: 'A dashboard that looks like Venus OS gui-v2 from Victron.',
});


