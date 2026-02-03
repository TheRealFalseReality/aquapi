# Dallas Temperature Sensor - Index-Based Configuration

## Overview
The `temperature_dallas_index.yaml` configuration file provides a **plug-and-play** solution for using multiple Dallas DS18B20 temperature sensors without needing to specify individual sensor addresses.

## Problem Solved
Previously, when using multiple Dallas temperature sensors:
- A single sensor worked without specifying an address
- Multiple sensors required hardcoding the address at firmware compile time
- This made it difficult to swap sensors or add new ones without recompiling

## Solution
This configuration uses the `index` parameter instead of `address`:
- **index: 0** - First sensor detected on the 1-Wire bus
- **index: 1** - Second sensor detected on the 1-Wire bus
- And so on...

## Usage

### To use this configuration in your project:

1. **Edit your main configuration file** (e.g., `aquapi_config.yaml`)
2. **Replace the dallas temperature include line:**

   ```yaml
   packages:
     # OLD - Single sensor or address-based
     dallas: !include common/temperature_dallas.yaml
     
     # NEW - Index-based for plug-and-play multiple sensors
     dallas: !include common/temperature_dallas_index.yaml
   ```

3. **Connect your Dallas DS18B20 sensors** to GPIO pin 16 (default) or change the `dallasPin` substitution

### Features

This configuration includes:
- **Temperature Sensor 1** (index: 0) - Primary temperature probe
- **Temperature Sensor 2** (index: 1) - Secondary temperature probe
- Temperature conversion to Fahrenheit
- Temperature range monitoring (Cool/OK/Warm)
- Calibration support for both sensors
- Web server integration with sorting groups

### Configuration Variables

You can customize these substitutions:
```yaml
dallasPin: "16"              # GPIO pin for 1-Wire bus
update_temp: "60s"            # Update interval
cal_0: "0.0"                  # Calibration at 0°C for sensor 1
cal_100: "100.0"              # Calibration at 100°C for sensor 1
range_cool: "74"              # Cool threshold (°F) for sensor 1
range_warm: "82"              # Warm threshold (°F) for sensor 1
cal_0_temp_2: "0.0"           # Calibration at 0°C for sensor 2
cal_100_temp_2: "100.0"       # Calibration at 100°C for sensor 2
range_cool_2: "74"            # Cool threshold (°F) for sensor 2
range_warm_2: "82"            # Warm threshold (°F) for sensor 2
```

## Benefits

✅ **Plug-and-Play** - No need to find and hardcode sensor addresses  
✅ **Easy Replacement** - Swap sensors without recompiling firmware  
✅ **Multiple Sensors** - Support for 2 temperature probes (can be extended)  
✅ **Consistent Ordering** - Sensors are indexed in the order they're discovered  

## Note on Sensor Ordering

The index order is determined by the 1-Wire bus discovery process. If you need consistent sensor ordering across reboots:
- Keep sensors in the same physical location
- Or use the address-based configuration (`temperature_dallas_2.yaml`) if you need guaranteed sensor identity

## Example Configuration Files

### Single Sensor (Original)
- `temperature_dallas.yaml` - For one sensor without address

### Multiple Sensors (Address-based)
- `temperature_dallas_2.yaml` - Requires hardcoded address

### Multiple Sensors (Index-based) - **NEW**
- `temperature_dallas_index.yaml` - Plug-and-play with index

## Related Documentation

- [ESPHome Dallas Temperature Sensor](https://esphome.io/components/sensor/dallas.html)
- [DS18B20 Datasheet](https://datasheets.maximintegrated.com/en/ds/DS18B20.pdf)
