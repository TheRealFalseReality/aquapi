# AquaPi for ESPHome - Development Instructions

**ALWAYS follow these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Overview
AquaPi is an ESPHome-based ESP32 aquarium controller and monitoring system that integrates with Home Assistant. It supports advanced water parameter monitoring using Atlas Scientific EZO sensors (pH, salinity, dissolved oxygen, ORP, CO2) and includes peristaltic dosing pumps for automated supplementation.

## Working Effectively

### Bootstrap and Configuration Validation
- **Install ESPHome**: `pip3 install esphome` (REQUIRED for all development work)
- **Validate main configuration**: `esphome config aquapi_config.yaml` (ALWAYS run this first - takes 10-15 seconds)
- **Validate factory configuration**: `esphome config aquapi_config.factory.yaml`
- Both configurations MUST validate successfully before making any changes

### Build Process
- **IMPORTANT**: Full compilation requires internet connectivity for PlatformIO dependencies
- **Compile command**: `esphome compile aquapi_config.yaml`
- **NEVER CANCEL**: Compilation can take 15-45 minutes on first run due to ESP32 toolchain downloads. Set timeout to 60+ minutes.
- **Expected failures in sandboxed environments**: Network connectivity issues prevent PlatformIO package downloads
- **Working validation alternative**: Use `esphome config` for syntax checking (works offline)

### Static Website Development
- **Technology**: Jekyll static site generator in `static/` directory
- **Install dependencies**: 
  ```bash
  sudo apt-get install ruby-dev build-essential
  gem install --user bundler jekyll jekyll-feed jekyll-seo-tag minima
  export PATH="$PATH:$HOME/.local/share/gem/ruby/3.2.0/bin"
  ```
- **Build site**: `jekyll build` in `static/` directory (takes 1-2 seconds)
- **Serve locally**: `jekyll serve` (uses port 4000)
- **Output directory**: `static/_site/`

### Testing and Validation
- **Configuration validation**: `esphome config <config-file>.yaml` - ALWAYS run before committing
- **ESPHome version check**: `esphome --version` (currently using 2025.9.0+)
- **Jekyll build validation**: `cd static && jekyll build`
- **CRITICAL**: Always validate both main and factory configurations

## Project Structure

### Core Configuration Files
- `aquapi_config.yaml` - Main ESPHome configuration (includes all packages)
- `aquapi_config.factory.yaml` - Factory/release configuration (minimal differences)
- `common/` - Modular ESPHome component packages:
  - `device_base.yaml` - ESP32 base configuration, WiFi, OTA, web server
  - `aquapi.yaml` - AquaPi branding and version info
  - `ezo_*.yaml` - Atlas Scientific EZO sensor configurations
  - `temperature_dallas.yaml` - DS18B20 temperature sensors
  - `water_level.yaml` - Optical water level sensors
  - `ezo_pmp*.yaml` - Peristaltic pump configurations

### Documentation and Website
- `static/` - Jekyll website source
  - `index.md` - Main documentation page
  - `aquapiai.html` - AI assistant interface (48KB standalone HTML)
  - `setup.md`, `blueprints.md`, `about.md` - Additional pages
  - `_config.yml` - Jekyll configuration

### Build and CI
- `.github/workflows/ci.yml` - ESPHome configuration validation
- `.github/workflows/publish-firmware.yml` - Firmware compilation and release
- `.github/workflows/publish-pages.yml` - Jekyll site deployment

## Validation Scenarios

### After Making Configuration Changes
1. **ALWAYS validate configuration**: `esphome config aquapi_config.yaml`
2. **Validate factory config**: `esphome config aquapi_config.factory.yaml`
3. **Check for syntax errors**: Both commands must show "Configuration is valid!"
4. **Test compilation** (if network available): `esphome compile aquapi_config.yaml`

### After Making Website Changes
1. **Build Jekyll site**: `cd static && jekyll build`
2. **Check for build warnings**: Note missing layouts (expected for some pages)
3. **Verify HTML generation**: Check `_site/` directory contains expected files
4. **Test AI assistant**: Verify `aquapiai.html` is copied correctly

### Manual Functionality Testing
**CRITICAL**: This system controls physical hardware. After changes that affect sensor configurations or pump controls:
1. **Review sensor mappings**: Verify I2C addresses in configuration match hardware
2. **Check pin assignments**: Ensure GPIO pins match physical connections
3. **Validate pump safety**: Review dosing pump configurations for safe operation
4. **Test web interface**: Verify web server configuration allows device access

## Common Tasks

### Configuration Modification
- **Edit sensors**: Modify files in `common/` directory for specific sensors
- **Update addresses**: I2C addresses are defined in each EZO component file
- **Pin changes**: GPIO pins defined in `device_base.yaml` substitutions
- **Version updates**: Update `app_version` in `aquapi_config.yaml`

### Adding New Sensors
- **Create new package**: Add new `.yaml` file in `common/` directory
- **Include in main config**: Add `!include common/new_sensor.yaml` to packages
- **Follow existing patterns**: Use existing EZO sensor files as templates
- **Update sorting groups**: Add web server sorting group for organization

### Website Updates
- **Content changes**: Edit markdown files in `static/`
- **AI assistant updates**: Modify `static/aquapiai.html` (self-contained)
- **Navigation changes**: Update `_config.yml` header_pages
- **Theme customization**: Modify Jekyll minima theme settings

## Build Time Expectations

### ESPHome Operations
- **Configuration validation**: 10-15 seconds
- **Initial compilation**: 15-45 minutes (NEVER CANCEL - requires toolchain download)
- **Incremental compilation**: 3-10 minutes
- **CRITICAL**: Set timeouts to 60+ minutes for compilation commands

### Website Operations
- **Jekyll build**: 1-2 seconds
- **Dependency installation**: 2-5 minutes (first time)
- **Local serve startup**: 3-5 seconds

### CI Pipeline Times
- **ESPHome validation**: 2-5 minutes per configuration
- **Firmware build**: 10-30 minutes (in CI environment)
- **Pages deployment**: 2-5 minutes

## Hardware Context

### Supported Sensors
- **Temperature**: DS18B20 waterproof thermistor (GPIO 16)
- **Water Level**: Optical sensors (GPIO 33, 32)
- **Water Leak**: Detection sensor (GPIO 27)
- **Atlas Scientific EZO Circuits** (I2C addresses):
  - pH: 0x63 (address 99)
  - Conductivity/Salinity: 0x64 (address 100)
  - ORP: 0x62 (address 98)
  - Dissolved Oxygen: 0x61 (address 97)
  - CO2: 0x69 (address 105)
  - Pumps: 0x67 (103), 0x6D (109), 0x6C (108)

### ESP32 Configuration
- **Board**: ESP32 devkit
- **I2C**: SDA=21, SCL=22, 50kHz frequency
- **Framework**: Arduino 3.2.1
- **OTA**: Multiple update methods (ESPHome, web, HTTP)
- **Web Server**: Version 3 with custom sorting groups

## Common Issues and Solutions

### Configuration Validation Failures
- **Missing dependencies**: Ensure all `!include` files exist in `common/`
- **Syntax errors**: Check YAML indentation and structure
- **Pin conflicts**: Verify GPIO pins not used multiple times
- **I2C address conflicts**: Ensure unique addresses for all I2C devices

### Build Failures
- **Network connectivity**: PlatformIO requires internet for package downloads
- **Disk space**: ESP32 toolchain requires significant storage
- **Permission issues**: Ensure write access to build directories

### Website Build Issues
- **Missing gems**: Install jekyll-feed, jekyll-seo-tag, minima
- **Layout warnings**: Expected for pages using unavailable layouts
- **Path issues**: Ensure Jekyll binary in PATH after user installation

## Development Best Practices

### Configuration Changes
- **Start with validation**: Always run `esphome config` before and after changes
- **Test incrementally**: Make small changes and validate frequently
- **Backup working configs**: Keep known-good configurations safe
- **Document modifications**: Update comments in YAML files

### Hardware Safety
- **Review pump settings**: Dosing pumps can damage equipment if misconfigured
- **Validate sensor ranges**: Ensure sensors operate within specified parameters
- **Test in safe mode**: Use safe mode restart for critical changes
- **Monitor logs**: Check ESPHome logs for sensor communication issues

### Version Control
- **Always validate before commit**: Run full validation suite
- **Test both configurations**: Main and factory configs must work
- **Update version numbers**: Increment `app_version` for releases
- **Document breaking changes**: Note configuration incompatibilities

## Quick Reference Commands

```bash
# Configuration validation (ALWAYS run first)
esphome config aquapi_config.yaml

# Factory configuration validation
esphome config aquapi_config.factory.yaml

# Compilation (requires internet, 60+ minute timeout)
esphome compile aquapi_config.yaml

# Website build
cd static && jekyll build

# Website serve (local development)
cd static && jekyll serve

# ESPHome version check
esphome --version

# Check for build artifacts
ls -la .esphome/build/aquapi/
```

## Repository File Overview
```
├── aquapi_config.yaml              # Main ESPHome configuration
├── aquapi_config.factory.yaml      # Factory configuration
├── common/                         # ESPHome component packages
│   ├── device_base.yaml           # ESP32 base configuration
│   ├── aquapi.yaml                # AquaPi branding
│   ├── ezo_*.yaml                 # Atlas Scientific sensors
│   ├── temperature_dallas.yaml    # Temperature sensors
│   └── water_level.yaml           # Water level sensors
├── static/                        # Jekyll website
│   ├── _config.yml               # Jekyll configuration
│   ├── index.md                  # Main documentation
│   ├── aquapiai.html             # AI assistant (48KB)
│   └── *.md                      # Other documentation pages
├── .github/workflows/            # CI/CD pipelines
│   ├── ci.yml                   # Configuration validation
│   ├── publish-firmware.yml     # Firmware building
│   └── publish-pages.yml        # Website deployment
├── blueprints/                   # Home Assistant blueprints
├── assets/                       # Images and resources
└── README.md                     # Project documentation
```

**Remember**: This is a hardware control system. Always validate configurations thoroughly and understand the physical implications of any changes you make.