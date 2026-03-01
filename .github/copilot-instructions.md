# AquaPi – Copilot Coding Agent Instructions

## Project Overview

**AquaPi** is an open-source ESPHome-based aquarium controller and monitor for ESP32 devices. It integrates with Home Assistant and supports Atlas Scientific EZO sensor circuits (pH, EC/salinity, ORP, dissolved oxygen, CO2, RTD, HUM) and EZO peristaltic pumps via I2C, plus Dallas DS18B20 temperature probes, water level sensors, and binary/leak sensors.

The repository does **not** contain Python, JavaScript, or traditional application code. All firmware is expressed in **ESPHome YAML configuration files**. There are no source code files to compile manually — ESPHome compiles the YAML into C++ firmware.

---

## Repository Layout

```
aquapi_config.yaml          # Main firmware config — the entry point compiled by CI
aquapi_config.factory.yaml  # Factory variant (includes aquapi_config.yaml as a package)
common/                     # Modular YAML packages, each included from the main config
  device_base.yaml          # ESP32 board, ESPHome core, WiFi, OTA, web server, I2C bus
  aquapi.yaml               # Project identity, dashboard import URL, app version
  substitutions.yaml        # All default substitution values (pins, addresses, intervals)
  ezo_ph.yaml               # EZO pH sensor platform + buttons + calibration actions
  ezo_ec.yaml               # EZO EC (salinity/conductivity) sensor
  ezo_orp.yaml              # EZO ORP sensor
  ezo_do.yaml               # EZO dissolved oxygen sensor
  ezo_co2.yaml              # EZO CO2 sensor
  ezo_hum.yaml              # EZO humidity sensor
  ezo_rtd.yaml              # EZO RTD temperature sensor
  ezo_pmp.yaml              # EZO peristaltic pump (white, address 103)
  ezo_pmp_duo.yaml          # Two-pump config (waste/clean)
  ezo_pmp_blue/orange/yellow.yaml  # Individual colour-coded pump variants
  i2c_detection.yaml        # Binary sensors + counter + scan button for I2C bus health
  temperature_dallas.yaml   # Dallas DS18B20 temperature sensor
  temperature_dallas_index.yaml    # Multi-probe Dallas temperature (index-based)
  water_level.yaml          # Optical water-level sensors
  binary.yaml               # Binary/leak sensors
  debug.yaml                # Heap, loop-time, I2C health score diagnostics (optional)
  ota_https.yaml            # HTTPS OTA update support
  ...
blueprints/                 # Home Assistant automation/script blueprints (YAML)
static/                     # Jekyll site source (GitHub Pages / web installer)
assets/                     # Images, logos
archive/                    # Archived / legacy config variants
.github/workflows/
  ci.yml                    # ESPHome build validation (stable, beta, dev)
  publish-firmware.yml      # Builds and uploads firmware on GitHub release
  publish-pages.yml         # Publishes the GitHub Pages installer site
```

---

## How the Configuration System Works

### Packages and Substitutions

`aquapi_config.yaml` is a **pure package manifest** — it just lists `!include` entries under the `packages:` key. Each `common/*.yaml` file is a self-contained ESPHome package that:

1. Declares its own `substitutions:` defaults.
2. Contributes sensor, button, select, text_sensor, api, or other ESPHome components.
3. Shares the I2C bus instance `bus_a` defined in `device_base.yaml`.

To enable or disable an optional module, comment or uncomment its `!include` line in `aquapi_config.yaml`.

### Customising Without Editing Package Files

Override substitutions **at the top level** of your device config — they take precedence over package defaults. Example:

```yaml
# my_device.yaml
substitutions:
  name: "tank-controller"
  update_ph: "30s"
  update_ec: "never"   # Disable EC sensor updates (sensor not installed)
packages:
  device_base: !include common/device_base.yaml
  aquapi: !include common/aquapi.yaml
  ezo_ph: !include common/ezo_ph.yaml
```

### Disabling Sensors That Are Not Installed

If an EZO sensor package is included but the hardware is not connected, ESPHome will emit `[E][ezo.sensor:088]: read error` every update interval. Fix this by setting the relevant update substitution to `"never"`:

```yaml
substitutions:
  update_ph: "never"       # Disables automatic reads; buttons with detection still work
  update_pmp_green: "never"
```

---

## I2C Bus and EZO Address Reference

The I2C bus is defined in `common/device_base.yaml`:
- **SDA:** GPIO21 (`${sdaPin}`)
- **SCL:** GPIO22 (`${sclPin}`)
- **Bus ID:** `bus_a`

| EZO Sensor | Default I2C Address (dec) | Hex   | Substitution Variable |
|-----------|--------------------------|-------|-----------------------|
| EZO DO    | 97                       | 0x61  | `addDO`               |
| EZO ORP   | 98                       | 0x62  | `addORP`              |
| EZO pH    | 99                       | 0x63  | `addPH`               |
| EZO EC    | 100                      | 0x64  | `addEC`               |
| EZO RTD   | 102                      | 0x66  | `addRTD`              |
| EZO PMP (White)  | 103               | 0x67  | `addPMP_white`        |
| EZO PMP (Yellow) | 104               | 0x68  | `addPMP_yellow`       |
| EZO CO2   | 105                      | 0x69  | `addCO2`              |
| EZO PMP (Blue)   | 106               | 0x6A  | `addPMP_blue`         |
| EZO PMP (Red)    | 108               | 0x6C  | `addPMP_red`          |
| EZO PMP (Green)  | 109               | 0x6D  | `addPMP_green`        |
| EZO PMP (Orange) | 110               | 0x6E  | `addPMP_orange`       |
| EZO HUM   | 111                      | 0x6F  | `addHUM`              |

### Probing an I2C Device in Lambda

Always use **ESPHome's native I2C API** — never the Arduino Wire library (they conflict):

```cpp
esphome::i2c::ErrorCode err = id(bus_a)->write(0x63, nullptr, 0);
if (err == esphome::i2c::ERROR_OK) {
  // device present
}
```

---

## CI / Build System

| Workflow | Trigger | What it does |
|----------|---------|--------------|
| `ci.yml` | Push, PR (any `*.yaml` change), manual | Compiles `aquapi_config.yaml` and `aquapi_config.factory.yaml` with ESPHome stable, beta, and dev |
| `publish-firmware.yml` | GitHub release published | Builds firmware and uploads to the release |
| `publish-pages.yml` | Push to `main` (`static/**`), after publish-firmware, manual | Builds and deploys the Jekyll installer site to GitHub Pages |

**CI validates YAML syntax and ESPHome compilation.** It does not run unit tests (none exist). If CI fails:
1. Read the ESPHome build log — it will show the exact YAML key or lambda that failed.
2. The most common causes are: invalid substitution references, missing `id:` fields, incompatible ESPHome component versions, or syntax errors in lambda C++ blocks.
3. Build failures in `dev` or `beta` ESPHome versions are expected occasionally due to breaking changes upstream; `stable` failures must always be fixed.

---

## Adding a New Sensor Module

1. Create `common/ezo_<name>.yaml` following the pattern of an existing module (e.g., `ezo_ph.yaml`):
   - Declare substitution defaults (`address`, `update_interval`, `sorting_group_weight`).
   - Add a `web_server: sorting_groups:` entry.
   - Add `api: actions:` for any HA service calls.
   - Add the ESPHome sensor platform, result text_sensor, read button, command select, and on_boot button press.
   - Use the I2C detection pattern (probe address before sending commands) in button `on_press` lambdas.

2. Add the package include to `aquapi_config.yaml` (commented out if optional by default).

3. Add default substitution values to `common/substitutions.yaml`.

4. Verify the build locally or via CI.

---

## Logging Standards

Use ESPHome log levels consistently:

| Level | Macro | When |
|-------|-------|------|
| DEBUG | `ESP_LOGD` | Detailed trace, values |
| INFO  | `ESP_LOGI` | State changes, success |
| WARN  | `ESP_LOGW` | Expected missing sensors, recoverable issues |
| ERROR | `ESP_LOGE` | I2C bus failures, unrecoverable errors |

Use descriptive tags: `"ezo_ph"`, `"ezo_ec"`, `"i2c_detection"`, etc. — not generic tags like `"sensor"`.

---

## Known Issues and Workarounds

### `[E][ezo.sensor:088]: read error` in logs
**Cause:** A sensor package is included but the hardware is not on the I2C bus.  
**Fix:** Set `update_<sensor>: "never"` in your substitutions. The detection-aware read buttons (`id: read_ph`, etc.) will still work correctly and log a friendly warning instead.

### ESPHome `dev` / `beta` CI failures
**Cause:** Upstream ESPHome breaking changes between versions.  
**Fix:** These are acceptable for dev/beta. Only `stable` failures block merging.

### Do not use Arduino Wire library
**Cause:** ESPHome's I2C component and Arduino Wire library conflict for hardware control.  
**Fix:** Always use `id(bus_a)->write(address, nullptr, 0)` for I2C probing.

---

## Development Guidelines

- **Never edit `common/device_base.yaml` or `common/substitutions.yaml` defaults** without checking that all existing packages and the main config still compile.
- When adding or changing a sensor package, always test that `aquapi_config.yaml` (which includes all packages simultaneously) still compiles — component IDs must remain unique across all packages.
- Substitutions are the primary configuration mechanism. Avoid hardcoding pin numbers, I2C addresses, or update intervals directly in package YAML.
- All sensor update intervals default to `"60s"`. Buttons have a separate `update_button_<sensor>` substitution used for timed button presses.
- The web server uses sorting groups (integer weights) to order entities in the ESPHome web UI. Lower weight = higher in the list. Weights are defined as substitutions (e.g., `sorting_group_ph: '30'`).
- Do not remove or rename existing substitution keys — third-party users may reference them in their own device configs via `dashboard_import`.
