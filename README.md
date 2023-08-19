# AquaPi for ESPHome

The Aquarium meets the Smart Home!  

Monitor your Aquarium's Temperature and Water Level. With EZO Circuit Boards and Probe upgrades, you can also monitor your pH, Salinity, Dissolved Oxygen and other EZO circuits and probes.  
Powered by an [esp32](https://esphome.io/) and Controlled by [HomeAssistant](https://www.home-assistant.io/installation/). You can set alerts for anything, make automations for auto-top-off (see Blueprints), and make beautiful graphs of your aquarium's data (see screenshot).  

[Buy Now!](https://www.capitalcityaquatics.com/store/p/aquapi)

Basic UI
![Basic UI](https://user-images.githubusercontent.com/106857076/236688799-8565d281-13e9-4a98-83ca-60933a509a5e.png)

<details>
<summary>Advanced UI</summary>

| ![Example UI1](https://user-images.githubusercontent.com/106857076/236688777-846e7a3d-2fd2-4e98-8f9c-48cfeec7d34c.png)  | ![Example UI2](https://user-images.githubusercontent.com/106857076/236688759-711f32b8-b182-4808-9adf-8385ac39ba29.png) |
| ------------- | ------------- |

</details>  

### Home Assistand Dashboard & Card Examples
If you want to try some of the Dashboard or Cards I use, follow the link below. You may need addtional integrations or custom cards for some of them!  
**[Example HomeAssistant Cards & Templates](https://github.com/TheRealFalseReality/aquapi/tree/main/Example%20HomeAssistant%20Cards%20%26%20Templates)**  

## Hardware Used
**ESP32 devkit**  
**HomeAssistant** using a Raspberry Pi 3 or above. The more RAM, the better.  
**Prerequisite!!** A Raspberry Pi (or something similar) running HomeAssistant to communicate and interact with the ESP32 via `homeassistant.local:8123`.
Get [Raspberry Pi Imager](https://www.raspberrypi.com/software/)

### Probes
***Temperature*** 
  - DS18B20 Waterproof Thermistor  
  
***Water Level*** 
  - Food Grade Optical Infrared Water Liquid Level Sensor  
  
***pH:*** Atlas Scientific pH Kit  
  - EZO™ pH Circuit  
  - Double junction silver / silver chloride Lab Grade pH Probe
  - Electrically Isolated EZO™ Carrier Board

***Salinity:*** Atlas Scientific Conductivity Kit  
  - EZO™ EC Circuit  
  - Conductivity Probe: 5 µS/cm to 200,000 µS/cm
  - Electrically Isolated EZO™ Carrier Board

**Other EZO probes that should work but not yet tested:**   
*Dissolved Oxygen, Pump, Humidity, Carbon Dioxide, Temperture*

### Circuit Diagram

![circuit (1)](https://github.com/TheRealFalseReality/aquapi/assets/106857076/f22f0edb-5a8c-468e-9845-12475a6760d6)

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

## Setup AquaPi
### Home Assistant
1. Install and power on the Home Assistant device. Connect it via an ethernet cable.  

2. Navigate to the following URL, via your favorite browser:  
```
homeassistant.local:8123
```

3. Go through the [Home Assistant Onboarding](https://www.home-assistant.io/getting-started/onboarding/).  
*Follow the link above to see more detail on Onboarding Home Assistant*

| ![username](https://github.com/TheRealFalseReality/aquapi/assets/106857076/c42062c5-d0c5-4e4d-89ad-f71d497d9d68) | ![onboarding_devices](https://github.com/TheRealFalseReality/aquapi/assets/106857076/920ac524-c631-43a3-abe0-94bcece49be9) |
| ------------- | ------------- |

4. Power on the AquaPi and connect to Wifi:   
On your Phone, connect to the Wifi Network `aquapi-xxxxxx`  
*Note the name of the wifi, it macthes your devices name*  
Select your Wifi ID, and enter your Wifi password  

 |  ![Screenshot_20230812-234153EDIT](https://github.com/TheRealFalseReality/aquapi/assets/106857076/05102f18-1a1d-4adf-a315-25eeca75935e) | ![Screenshot_20230812-234744EDIT](https://github.com/TheRealFalseReality/aquapi/assets/106857076/4d34a64f-33a5-4af8-8d4a-6eee95dd91c6) |
 | ------------- | ------------- |

5. Back in Home Assistant, you should see a notification saying a **New Devices Discovered**. (Settings -> Devices & Services)  
You can click the buttom below to go there automatically:  
[![Open your Home Assistant instance and show your integrations.](https://my.home-assistant.io/badges/integrations.svg)](https://my.home-assistant.io/redirect/integrations/)

![Screenshot_20230813-141349](https://github.com/TheRealFalseReality/aquapi/assets/106857076/c604c261-1f69-417d-af91-be212a6ead35) 

6. Choose `Configure` under the device named `AquaPi XXXXXX` and follow to promts to add it your Home Assistant frontend.   
*Notice the name matches the Wifi name you connected to earlier*  
The Blue LED on the AquaPi should stop flashing when connected to Home Assistant.

| ![Screenshot_20230813-141640](https://github.com/TheRealFalseReality/aquapi/assets/106857076/338765f1-fed4-41fb-848b-873081df067d) | ![AScreenshot_20230813SD144346](https://github.com/TheRealFalseReality/aquapi/assets/106857076/46bb5ef7-a34f-4778-9715-efb512ed3b04)|
 | ------------- | ------------- |

7. To get updates, install the Home Assistant Add-On named ESPHome. Once installed, launch the add-on and navigate to the User-Interface by using `OPEN WEB UI`.  
Add On Store:  
[![Open your Home Assistant instance and show the Supervisor add-on store.](https://my.home-assistant.io/badges/supervisor_store.svg)](https://my.home-assistant.io/redirect/supervisor_store/)

| ![Screenshot_20230813-144240](https://github.com/TheRealFalseReality/aquapi/assets/106857076/98edbcdc-5f8b-4e2a-bc43-115e3e3e6953) | ![Screenshot_20230813-144513](https://github.com/TheRealFalseReality/aquapi/assets/106857076/02758ba1-5b5d-4ca1-975b-d4870c63788f) |
 | ------------- | ------------- |

8. In ESPHome, you should see the name of you AquaPi with a green button named `Adopt`.  
Click on it, follow the promts and enter your Wifi credentials, and click `Install` and choose `Wirelessly` to install the most current AquaPi firmware.

| ![Screenshot_20230813-144723](https://github.com/TheRealFalseReality/aquapi/assets/106857076/28256b8a-faba-4a17-b9ff-9a5dd1e0b00d) | ![Screenshot_20230813-153752](https://github.com/TheRealFalseReality/aquapi/assets/106857076/e5e198d8-a33e-4942-9cae-be37ee645611) |
 | ------------- | ------------- |
 
9. Update AquaPi Firmware by Using ESPHome, clicking on the 3-dots under your device, and choosing `Install`. It will pull the latest code from the GitHub respository.

| ![Screenshot_20230813-153815](https://github.com/TheRealFalseReality/aquapi/assets/106857076/283b61cc-f258-4176-a053-40e5f810265f) | ![Screenshot_20230813-153825](https://github.com/TheRealFalseReality/aquapi/assets/106857076/7bbd24eb-9d98-49c4-bcac-8dca8e74e37e) |
 | ------------- | ------------- |

### Web Server
Alternatively, after connecting to Wifi, you can access the AquaPi web server without Home Assistant by navigating to: 
```
<hostname>.local/
```
This is the ESP32's web server.  
*Hostname is the name of the device.* (In this example: `aquapi-6734b0.local/`)

## Blueprints
These are scripts and automations I created to control other devices within Home Assistant.

### [Feeding Script](https://community.home-assistant.io/t/turn-off-switches-to-feed-your-fish-for-a-certain-amount-of-time-then-turn-back-on-aquarium-script/600544)
This script is intended to act as a feeding routine for your aquarium fish. You can choose multiple switches to turn off, such as return pumps, wave makers, skimmers, etc., and set the amount of time for feeding, typically 10 mins. The script will turn off the switch(es) for the set time, then turn the them back on automatically.

[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgist.github.com%2FTheRealFalseReality%2F06d34488d84e81916768129b0398de25)

### [2 Part Doser Script](https://community.home-assistant.io/t/turn-on-a-switch-to-activate-doser-equipment-for-a-certain-amount-of-time-aquarium-script/600546)

This script is intended to dose your aquarium for a certain amount of time. Choose an entity to turn on, typically a 2 part Doser @ 1.1 mL/min, then set the amount of time to dose for. The script will turn on the target switch for the set time, then the switch will turn off.

[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgist.github.com%2FTheRealFalseReality%2F9fd8f929b5f6cc32f6e8a67cd8104941)

### [ATO (Automated-Top-Off) Automation](https://community.home-assistant.io/t/create-ato-automation-control-switches-based-off-binary-sensor-aquarium-automation/600941)

This automation is intended to create an ATO (Automated-Top-Off) automation for your aquarium, or anything else that needs to be refilled. You would use the AquaPi Water Level sensor to determine the presence of water and control a water pump via switch when necessary. The automation will turn the selected switch on when the Water Level is Low, and off then when the Water Level is Normal or High. By default, the switch will automatically turn off after 5 mins of being on to prevent overfill.  

[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgist.github.com%2FTheRealFalseReality%2Feab1edda7c678b8763ecdcddb45f2f1a)

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
