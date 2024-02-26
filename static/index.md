# AquaPi for ESPHome

The Aquarium meets the Smart Home!  

Monitor your Aquarium's Temperature and Water Level. With EZO Circuit Boards and Probe upgrades, you can also monitor your pH, Salinity, Dissolved Oxygen and other EZO circuits and probes.  
Powered by an **[esp32](https://esphome.io/)** and Controlled by **[HomeAssistant](https://www.home-assistant.io/installation/)**. You can set alerts for anything, make automations for auto-top-off (see Blueprints), and make beautiful graphs of your aquarium's data (see screenshot).  

Use the 'View on GitHub' link above for more information and make suggestions.  

### **[Buy Now!](https://www.capitalcityaquatics.com/store/p/aquapi)**
![PXL_20230529_200205979](https://github.com/TheRealFalseReality/aquapi/assets/106857076/1ebcddb2-d481-48f0-9136-ca698cbe1889)

## Installation
**You can typically skip this as AquaPi comes pre-installed!**  
Use the button below to install the pre-built firmware directly to your device via USB from the browser.  

<esp-web-install-button manifest="./manifest.json"></esp-web-install-button>  

<script type="module" src="https://unpkg.com/esp-web-tools@9.1.0/dist/web/install-button.js?module"></script>  

## Setup AquaPi
Follow link below for guide:  
<a href="https://github.com/TheRealFalseReality/aquapi/wiki/Setup-AquaPi" target="_blank"><b>Setup Guide</b></a>

## Home Assistant & AquaPi
UI
![Screenshot 2024-02-22 000808](https://github.com/TheRealFalseReality/aquapi/assets/106857076/e985df09-6e08-474d-aa9c-b4e803a5c20c)

### [Blueprints](https://github.com/TheRealFalseReality/aquapi/wiki/Blueprints)
There are scripts and automations I created to control other devices within Home Assistant. Click the link above to view them all!

### [Blueprints](https://github.com/TheRealFalseReality/aquapi/wiki/Blueprints)
There are scripts and automations I created to control other devices within Home Assistant. Click the link above to view them all!

### Home Assistand Dashboard & Card Examples
If you want to try some of the Dashboard or Cards I use, follow the link below. You may need addtional integrations or custom cards for some of them!  
<a href="https://github.com/TheRealFalseReality/aquapi/tree/main/Example%20HomeAssistant%20Cards%20%26%20Templates" target="_blank"><b>Example HomeAssistant Cards & Templates</b></a>

## Hardware Used
**ESP32 devkit**   
**HomeAssistant** using a Raspberry Pi 3 or above. The more RAM, the better.  

**Probes**:  
***Temperature*** 
  - DS18B20 Waterproof Thermistor  
  
***Water Level*** 
  - Food Grade Optical Infrared Water Liquid Level Sensor  

**pH:** *Atlas Scientific pH: [EZO-pH](https://files.atlas-scientific.com/pH_EZO_Datasheet.pdf) & [Lab Grade pH Probe](https://files.atlas-scientific.com/pH_probe.pdf)*  
  - EZO™ pH Circuit, ISO 10523 Compliant  
  - Double junction silver / silver chloride Lab Grade pH Probe with Vanadium III, Gen 3
  - Electrically Isolated EZO™ Carrier Board
  - Range: 0 - 14
  - Time Before Recalibration: 1 Year
  - Life Expectancy: ~2.5+ Years

**Salinity:** *Atlas Scientific Conductivity: [EZO-EC](https://files.atlas-scientific.com/EC_EZO_Datasheet.pdf) & [Conductivity Probe K 1.0](https://files.atlas-scientific.com/EC_K_1.0_probe.pdf)*  
  - EZO™ EC Circuit, ISO 7888 Compliant  
  - Conductivity Probe K 1.0, Graphite, Gen 3
  - Electrically Isolated EZO™ Carrier Board
  - Range: 0.07 − 500,000+ μS/cm
  - Time Before Recalibration: ~10 Years
  - Life Expectancy: ~10 Years

**Pump:** *Atlas Scientific Pump: [EZO-PMP](https://files.atlas-scientific.com/EZO_PMP_Datasheet.pdf)*  
  - EZO™ Pump Embedded Circuit  
  - Flow Rate: 0.5ml to 105ml/mins
  - Tube Size: 5mm
  - Head Height: 8.1m(26.5')

**Pump:** *Atlas Scientific Pump [EZO-PMP](https://files.atlas-scientific.com/EZO_PMP_Datasheet.pdf)*  
  - EZO™ Pump Embedded Circuit  
  - Flow Rate: 0.5ml to 105ml/mins

**Carbon Dioxide Gaseous:** *Atlas Scientific CO2: [EZO-CO2](https://files.atlas-scientific.com/EZO_CO2_Datasheet.pdf)*  
  - EZO™ CO2 Embedded Circuit, Gaseous  
  - Range: 0 − 10,000 ppm
  - Life Expectancy: ~5.5 Years

**Other EZO probes that should work but not yet tested:**  
[Dissolved Oxygen](https://files.atlas-scientific.com/LG_DO_probe.pdf), 
[Humidity](https://files.atlas-scientific.com/EZO-HUM-Datasheet.pdf), 
[ORP](https://files.atlas-scientific.com/orp_probe.pdf),
[Temperture](https://files.atlas-scientific.com/EZO_RTD_Datasheet.pdf)

**Prerequisite!!** A Raspberry Pi (or something similar) running HomeAssistant to communicate and interact with the ESP32 via `homeassistant.local:8123`.
Get [Raspberry Pi Imager](https://www.raspberrypi.com/software/)

## Software Used  
[**Home Assistant**](https://www.home-assistant.io/): Open source home automation that puts local control and privacy first.   
[**ESPHome**](https://esphome.io/): A system to control your ESP8266/ESP32 and RP2040 by simple yet powerful configuration files and control them remotely through Home Automation systems.

![made-for-esphome-white-on-black](https://github.com/TheRealFalseReality/aquapi/assets/106857076/c68b7da3-17c9-43bf-b8c7-f44acf63eb28)

## Useful Links:

[**HomeAssistant**](https://www.home-assistant.io/installation/)  
[**ESPHome**](https://esphome.io/)  
[**AtlasIoT Installation Guide**](https://files.atlas-scientific.com/How-to-install-Atlas-iot-software.pdf)  
[**EZO Raspberry Pi Sample Code**](https://files.atlas-scientific.com/pi_sample_code.pdf)   
[**EZO pH Circuit Datasheet**](https://files.atlas-scientific.com/pH_EZO_Datasheet.pdf)  
[**EZO EC Circuit Datasheet**](https://files.atlas-scientific.com/EC_EZO_Datasheet.pdf)  
