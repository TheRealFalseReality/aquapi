---
layout: page
title: Blueprints
permalink: /blueprints/
---

# Blueprints
These are scripts and automations I created to control other devices within Home Assistant.  
### [Join the Community](https://community.home-assistant.io/u/therealfalsereality/activity/topics)

## [Feeding Script](https://community.home-assistant.io/t/turn-off-switches-to-feed-your-fish-for-a-certain-amount-of-time-then-turn-back-on-aquarium-script/600544)
This script is intended to act as a feeding routine for your aquarium fish. You can choose multiple switches to turn off, such as return pumps, wave makers, skimmers, etc., and set the amount of time for feeding, typically 10 mins. The script will turn off the switch(es) for the set time, then turn the them back on automatically.

[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgist.github.com%2FTheRealFalseReality%2F06d34488d84e81916768129b0398de25)

[Raw Code](https://gist.github.com/TheRealFalseReality/06d34488d84e81916768129b0398de25)

## [2 Part Doser Script](https://community.home-assistant.io/t/turn-on-a-switch-to-activate-doser-equipment-for-a-certain-amount-of-time-aquarium-script/600546)

This script is intended to dose your aquarium for a certain amount of time. Choose an entity to turn on, typically a 2 part Doser @ 1.1 mL/min, then set the amount of time to dose for. The script will turn on the target switch for the set time, then the switch will turn off.

[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgist.github.com%2FTheRealFalseReality%2F9fd8f929b5f6cc32f6e8a67cd8104941)

[Raw Code](https://gist.github.com/TheRealFalseReality/9fd8f929b5f6cc32f6e8a67cd8104941)

## [ATO (Automated-Top-Off) Automation](https://community.home-assistant.io/t/create-ato-automation-control-switches-based-off-binary-sensor-aquarium-automation/600941)

This automation is intended to create an ATO (Automated-Top-Off) automation for your aquarium, or anything else that needs to be refilled. You would use the AquaPi Water Level sensor to determine the presence of water and control a water pump via switch when necessary. The automation will turn the selected switch on when the Water Level is Low, and off then when the Water Level is Normal or High. By default, the switch will automatically turn off after 5 mins of being on to prevent overfill.  

[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgist.github.com%2FTheRealFalseReality%2Feab1edda7c678b8763ecdcddb45f2f1a)

[Raw Code](https://gist.github.com/TheRealFalseReality/eab1edda7c678b8763ecdcddb45f2f1a)

## Lights
Create a script to toggle all your Aquarium Lights all at once.

[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgist.github.com%2FTheRealFalseReality%2F046bbbbef7cee12740190945d5ed22b9)

[Raw Code](https://gist.github.com/TheRealFalseReality/046bbbbef7cee12740190945d5ed22b9)

## Water Level Control
Toggle multiple devices on/off based on water level.

[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgist.github.com%2FTheRealFalseReality%2F6a764c0904067d44ca45e8e59a3d8747)

[Raw Code](https://gist.github.com/TheRealFalseReality/6a764c0904067d44ca45e8e59a3d8747)
