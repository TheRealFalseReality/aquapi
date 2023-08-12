# AquaPi for ESPHome

The Aquarium meets the Smart Home!  

Monitor your Aquarium's Temperature and Water Level. With EZO Circuit Boards and Probe upgrades, you can also monitor your pH, Salinity, Dissolved Oxygen and other EZO circuits and probes.  
Powered by an [esp32](https://esphome.io/) and Controlled by [HomeAssistant](https://www.home-assistant.io/installation/). You can set alerts for anything, make automations for auto-top-off (see Blueprints), and make beautiful graphs of your aquarium's data (see screenshot).  

Use the 'View on GitHub' link above for more information and make suggestions.  

[Buy Now!](https://www.capitalcityaquatics.com/store/p/aquapi)

# Installation
**You can typically skip this as AquaPi comes pre-installed.**  
Use the button below to install the pre-built firmware directly to your device via USB from the browser.

<esp-web-install-button manifest="./manifest.json"></esp-web-install-button>

<script type="module" src="https://unpkg.com/esp-web-tools@9.1.0/dist/web/install-button.js?module"></script>

# Setup AquaPi
1. Install Home Assistant and go through the Onboarding process (link in step 2). Connect it via an ethernet cable.  

3. Navigate to:  
[homeassistant.local:8123/](homeassistant.local:8123/)  
*NOTE: if link doesn't work, copy & paste it into your browser*

2. Then, power on the AquaPi. And Connect to Wifi:  
On your Phone, connect to the Wifi Network `AquaPi-XXXXX`  
Then, enter your Wifi credentials  
*You should see a notification saying a New Device Discovered in Home Assistant. (Settings -> Devices & Services)*   

4. Add that device and see the activated sensors.

*Alternatively, you can access the AquaPi web server without Home Assistant by navigating to `<hostname>.local/`. Hostname is found by the attached label.*

SCREENSHOTS TO BE ADDED

## More Information
Basic UI
![Basic UI](https://user-images.githubusercontent.com/106857076/236688799-8565d281-13e9-4a98-83ca-60933a509a5e.png)

yaml examples located in: [`Example HomeAssistant Cards & Templates`](https://github.com/TheRealFalseReality/aquapi/tree/main/Example%20HomeAssistant%20Cards%20%26%20Templates)  
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

## Blueprints
These are scripts and automations I created to control other devices within Home Assistant.

### [Feeding Automation](https://community.home-assistant.io/t/turn-off-switches-to-feed-your-fish-for-a-certain-amount-of-time-then-turn-back-on-aquarium-script/600544)
This script is intended to act as a feeding routine for your aquarium fish. You can choose multiple switches to turn off, such as return pumps, wave makers, skimmers, etc., and set the amount of time for feeding, typically 10 mins. The script will turn off the switch(es) for the set time, then turn the them back on automatically.

[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgist.github.com%2FTheRealFalseReality%2F06d34488d84e81916768129b0398de25)

### [2 Part Doser Automation](https://community.home-assistant.io/t/turn-on-a-switch-to-activate-doser-equipment-for-a-certain-amount-of-time-aquarium-script/600546)

This script is intended to dose your aquarium for a certain amount of time. Choose an entity to turn on, typically a 2 part Doser @ 1.1 mL/min, then set the amount of time to dose for. The script will turn on the target switch for the set time, then the switch will turn off.

[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgist.github.com%2FTheRealFalseReality%2F9fd8f929b5f6cc32f6e8a67cd8104941)

### [ATO (Automated-Top-Off) Automation](https://community.home-assistant.io/t/create-ato-automation-control-switches-based-off-binary-sensor-aquarium-automation/600941)

This automation is intended to create an ATO (Automated-Top-Off) automation for your aquarium, or anything else that needs to be refilled. You would use the AquaPi Water Level sensor to determine the presence of water and control a water pump via switch when necessary. The automation will turn the selected switch on when the sensor turns off, and off then when the sensor turns back on. By default, the switch will automatically turn off after 5 mins of being on to prevent overfill.  

*NOTE: The above link for this automation takes you to the Binary Sensor verion of this Blueprint. If you have an AquaPi with 2 Optical sensors, use Import Blueprint below for a better automation.*

[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgist.github.com%2FTheRealFalseReality%2Feab1edda7c678b8763ecdcddb45f2f1a)

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
