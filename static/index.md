# AquaPi for ESPHome

The Aquarium meets the Smart Home!  

Monitor your Aquarium's Temperature and Water Level. With EZO Circuit Boards and Probe upgrades, you can also monitor your pH, Salinity, Dissolved Oxygen and other EZO circuits and probes.  
Powered by an [esp32](https://esphome.io/) and Controlled by [HomeAssistant](https://www.home-assistant.io/installation/). You can set alerts for anything, make automations for auto-top-off (see Blueprints), and make beautiful graphs of your aquarium's data (see screenshot).  

Use the 'View on GitHub' link above for more information and make suggestions.  

**[Buy Now!](https://www.capitalcityaquatics.com/store/p/aquapi)**
| ![PXL_20230529_200205979](https://github.com/TheRealFalseReality/aquapi/assets/106857076/1ebcddb2-d481-48f0-9136-ca698cbe1889) | ![PXL_20240224_022516268~2](https://github.com/TheRealFalseReality/aquapi/assets/106857076/db50c972-2bbd-4c9f-9f62-fa6e62f41cf3) |
| ------------- | ------------- |

## Installation
**You can typically skip this as AquaPi comes pre-installed!**  
Use the button below to install the pre-built firmware directly to your device via USB from the browser.

<esp-web-install-button manifest="./manifest.json"></esp-web-install-button>

<script type="module" src="https://unpkg.com/esp-web-tools@9.1.0/dist/web/install-button.js?module"></script>

## Setup AquaPi
Follow link below for guide:  
<a href="https://github.com/TheRealFalseReality/aquapi/wiki/Setup-AquaPi" target="_blank"><b>Setup Guide</b></a>

## Home Assistant & AquaPi
Basic UI
| ![Screenshot 2024-02-22 000808](https://github.com/TheRealFalseReality/aquapi/assets/106857076/e985df09-6e08-474d-aa9c-b4e803a5c20c) | ![Screenshot 2024-02-22 001408](https://github.com/TheRealFalseReality/aquapi/assets/106857076/a430aabc-2c28-43e7-9779-3c5c04c4b7db)  |
| ------------- | ------------- |

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
  
***pH:*** [Atlas Scientific pH Kit](https://atlas-scientific.com/kits/ph-kit/)  
  - EZO™ pH Circuit  
  - Double junction silver / silver chloride Lab Grade pH Probe
  - Electrically Isolated EZO™ Carrier Board

***Salinity:*** [Atlas Scientific Conductivity K 1.0 Kit](https://atlas-scientific.com/kits/conductivity-k-1-0-kit/)  
  - EZO™ EC Circuit  
  - Conductivity Probe: 5 µS/cm to 200,000 µS/cm
  - Electrically Isolated EZO™ Carrier Board

***Pump:*** [Atlas Scientific Pump Basic Kit](https://atlas-scientific.com/kits/ezo-pmp-kit/)  
  - EZO™ Pump Embedded Circuit  
  - Flow Rate: 0.5ml to 105ml/mins

**Other EZO probes that should work but not yet tested:**  
[Dissolved Oxygen](https://atlas-scientific.com/kits/dissolved-oxygen-kit/), [Humidity](https://atlas-scientific.com/probes/humidity-probe/), 
[Carbon Dioxide](https://atlas-scientific.com/probes/co2-sensor/), 
[ORP](https://atlas-scientific.com/kits/orp-kit/),
[Temperture](https://atlas-scientific.com/kits/inline-temperature-kit/)

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
