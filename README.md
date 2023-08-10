# AquaPi for ESPHome

The Aquarium meets the Smart Home! Monitor your Aquarium's Temperature and Water Level. With EZO Circuit Boards and Probe upgrades, you can also monitor your pH, salinity, dissolved oxygen and more while being compatible with all other EZO boards and probes.
Powered by an [esp32](https://esphome.io/) and Controlled by [HomeAssistant](https://www.home-assistant.io/installation/).

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

## Install
### From Install Page
Use the [GitHub](https://therealfalsereality.github.io/aquapi/) pages to install software onto your AquaPi device via USB.  
### From Releases
Use [Releases](https://github.com/TheRealFalseReality/aquapi/releases) for a .bin and install via [ESPHome Web](https://web.esphome.io/).  
### From Source
1. Copy the contents of `aquapi_config.yaml` into ESPHome instance after adding an esp32 device named `AquaPi` (recommended). 
2. Remove the following lines:

If you do not want the last 5 digits of the MAC Address to be appended:
```
name_add_mac_suffix: true
```
To prevent it from importing the default config:
```
dashboard_import:
  package_import_url: github://TheRealFalseReality/Aquaponics-Kit/aquaponics-kit.yaml@main
```
Using source code, you can also customize anything and add your own sensors! Make it your own!

## Useful Links:
<details>
<summary>See Links</summary>

[**HomeAssistant**](https://www.home-assistant.io/installation/)  
[**ESPHome**](https://esphome.io/)  
[**AtlasIoT Installation Guide**](https://files.atlas-scientific.com/How-to-install-Atlas-iot-software.pdf)  
[**EZO Raspberry Pi Sample Code**](https://files.atlas-scientific.com/pi_sample_code.pdf)   
[**EZO pH Circuit Datasheet**](https://files.atlas-scientific.com/pH_EZO_Datasheet.pdf)  
[**EZO EC Circuit Datasheet**](https://files.atlas-scientific.com/EC_EZO_Datasheet.pdf)  


</details>
