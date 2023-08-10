# AquaPi for ESPHome

The Aquarium meets the Smart Home! Monitor your Aquarium's Temperature and Water Level. With EZO Circuit Boards and Probe upgrades, you can also monitor your pH, salinity, disscolved oxygen and more while being compatible with all other EZO boards and probes.
Powered by an esp32 and Controlled by HomeAssistant.  
Use the 'View on GitHub' link above for more information and make suggestions.

# Installation

You can use the button below to install the pre-built firmware directly to your device via USB from the browser.

<esp-web-install-button manifest="./manifest.json"></esp-web-install-button>

<script type="module" src="https://unpkg.com/esp-web-tools@9.1.0/dist/web/install-button.js?module"></script>

[Buy Now!](https://www.capitalcityaquatics.com/store/p/aquapi)

Basic UI
![Basic UI](https://user-images.githubusercontent.com/106857076/236688799-8565d281-13e9-4a98-83ca-60933a509a5e.png)

<details>
<summary>Advanced UI</summary>

| ![Example UI1](https://user-images.githubusercontent.com/106857076/236688777-846e7a3d-2fd2-4e98-8f9c-48cfeec7d34c.png)  | ![Example UI2](https://user-images.githubusercontent.com/106857076/236688759-711f32b8-b182-4808-9adf-8385ac39ba29.png) |
| ------------- | ------------- |

</details>  

yaml examples located in: [`example HomeAssistant configs and templates`](https://github.com/TheRealFalseReality/aquapi/tree/main/example%20HomeAssistant%20configs%20and%20templates)  
[Download HomeAssistant Backup](https://github.com/TheRealFalseReality/aquapi/blob/d9ae345013caffa58344b626c5c5f0d49301c17f/example%20HomeAssistant%20configs%20and%20templates/Backup.tar) if you want to start with a pre-configured HomeAssistant Instance.

## Hardware Used
**Control Board:**  
**ESP32 devkit**  
**HomeAssistant** using a Raspberry Pi 3 or above. The more RAM, the better.  

### Probes:
**Temperature** 
  - DS18B20 Waterproof Thermistor  
  
**Water Level** 
  - Food Grade Optical Infrared Water Liquid Level Sensor  
  
**pH:** Atlas Scientific pH Kit  
  - EZO™ pH Circuit  
  - Double junction silver / silver chloride Lab Grade pH Probe
  - Electrically Isolated EZO™ Carrier Board

**Salinity:** Atlas Scientific Conductivity Kit  
  - EZO™ EC Circuit  
  - Conductivity Probe: 5 µS/cm to 200,000 µS/cm
  - Electrically Isolated EZO™ Carrier Board

**Other EZO probes that should work but not yet tested:**  
Dissolved Oxygen, Pump, Humidity, Carbon Dioxide, Temperture

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

# Improv Bluetooth LE

adding the following HTML snippet:

<script
  type="module"
  src="https://www.improv-wifi.com/sdk-js/launch-button.js"
></script>

<improv-wifi-launch-button></improv-wifi-launch-button>
