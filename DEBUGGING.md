# AquaPi Debugging Standards

This document establishes debugging standards and best practices for the AquaPi project.

## Table of Contents
- [Logging Standards](#logging-standards)
- [I2C Sensor Detection](#i2c-sensor-detection)
- [Error Handling](#error-handling)
- [Debug Components](#debug-components)
- [Troubleshooting Guide](#troubleshooting-guide)

## Logging Standards

### Log Levels

Use appropriate log levels for different types of messages:

| Level | Macro | When to Use | Example |
|-------|-------|-------------|---------|
| **DEBUG** | `ESP_LOGD()` | General debugging information, detailed trace | `ESP_LOGD("ezo_ph", "Reading pH value: %.2f", value);` |
| **INFO** | `ESP_LOGI()` | Important state changes, confirmations | `ESP_LOGI("ezo_ph", "pH sensor initialized successfully");` |
| **WARNING** | `ESP_LOGW()` | Issues that don't stop execution | `ESP_LOGW("ezo_ph", "pH sensor not detected at address 99");` |
| **ERROR** | `ESP_LOGE()` | Errors affecting functionality | `ESP_LOGE("i2c", "I2C bus communication failed");` |
| **VERBOSE** | `ESP_LOGV()` | Extremely detailed trace (enable in config) | `ESP_LOGV("ezo_ph", "Sending command: %s", cmd);` |

### Log Message Format

Always follow this format for consistency:

```cpp
ESP_LOG[LEVEL]("component_name", "Message with context and data");
```

**Best Practices:**
- Use descriptive component names (e.g., "ezo_ph", "i2c_detection", "debug")
- Include relevant data: addresses, values, states
- Make messages actionable (help users understand what to do)
- Use format specifiers correctly: `%d` (int), `%f` (float), `%s` (string), `0x%02X` (hex)

**Examples:**

```cpp
// Good - includes context and data
ESP_LOGD("ezo_ph", "pH reading: %.2f at address 0x%02X", value, address);
ESP_LOGI("i2c_detection", "Found %d I2C devices on bus", count);
ESP_LOGW("ezo_ec", "EC sensor not responding at address 100");

// Bad - lacks context
ESP_LOGD("sensor", "Got value");
ESP_LOGW("main", "Error");
```

## I2C Sensor Detection

### Using ESPHome's Built-in Detection

**Always use `is_connected()` instead of the Wire library:**

```cpp
// Correct - uses ESPHome's robust method
if (id(bus_a).is_connected(0x63)) {  // 99 decimal = 0x63 hex
  // Sensor is present
  ESP_LOGI("ezo_ph", "pH sensor detected");
  id(ph_ezo).send_custom("R");
} else {
  ESP_LOGW("ezo_ph", "pH sensor not detected at address 99 (0x63)");
}
```

```cpp
// Incorrect - Wire library can be unreliable
// DO NOT USE THIS:
Wire.beginTransmission(address);
byte error = Wire.endTransmission();
if (error == 0) { ... }
```

### I2C Address Reference

| Sensor | Decimal Address | Hex Address | Default Variable |
|--------|----------------|-------------|------------------|
| EZO DO | 97 | 0x61 | `addDO` |
| EZO ORP | 98 | 0x62 | `addORP` |
| EZO pH | 99 | 0x63 | `addPH` |
| EZO EC | 100 | 0x64 | `addEC` |
| EZO RTD | 102 | 0x66 | `addRTD` |
| EZO PMP (White) | 103 | 0x67 | `addPMP_white` |
| EZO PMP (Yellow) | 104 | 0x68 | `addPMP_yellow` |
| EZO CO2 | 105 | 0x69 | `addCO2` |
| EZO PMP (Blue) | 106 | 0x6A | `addPMP_blue` |
| EZO PMP (Red) | 108 | 0x6C | `addPMP_red` |
| EZO PMP (Green) | 109 | 0x6D | `addPMP_green` |
| EZO PMP (Orange) | 110 | 0x6E | `addPMP_orange` |
| EZO HUM | 111 | 0x6F | `addHUM` |

### Detection Components

The project now includes dedicated I2C detection components in `common/i2c_detection.yaml`:

1. **Individual Sensor Detection** - Binary sensors for each EZO device
2. **I2C Device Counter** - Total number of connected devices
3. **I2C Bus Status** - Overall bus health
4. **Address List** - All detected addresses
5. **Manual Scan Button** - Force a bus scan

## Error Handling

### Check Before Processing

Always validate data before use:

```cpp
// Check if sensor is connected
if (!id(bus_a).is_connected(0x63)) {
  ESP_LOGW("ezo_ph", "pH sensor not detected, skipping read");
  return NAN;  // Return NAN for numeric sensors
}

// Check for null/invalid values
std::string str = id(raw_value_ec).state;
if (str.empty()) {
  ESP_LOGW("ezo_ec", "No data from EC sensor");
  return NAN;
}

// Validate parsed data
std::vector<std::string> v = parse_csv(str);
if (v.size() != 4) {
  ESP_LOGW("ezo_ec", "Unexpected data format: expected 4 values, got %d", v.size());
  return NAN;
}
```

### Graceful Degradation

The system should continue operating even when sensors are missing:

```cpp
lambda: |-
  // Attempt to read sensor
  if (id(bus_a).is_connected(0x63)) {
    id(ph_ezo).send_custom("R");
    return true;  // Success
  } else {
    // Sensor missing, log but don't crash
    ESP_LOGW("ezo_ph", "pH sensor not available");
    return false;  // Failure, but system continues
  }
```

## Debug Components

### Available Debug Tools

1. **Debug Module** (`common/debug.yaml`):
   - Heap memory monitoring
   - Loop time tracking
   - Memory usage percentage
   - I2C health score
   - System health status
   - ESPHome version
   - Reset reason tracking

2. **I2C Detection Module** (`common/i2c_detection.yaml`):
   - Individual sensor detection binary sensors
   - Total device counter
   - I2C bus status
   - List of detected addresses
   - Manual scan button

3. **Debug Buttons**:
   - **Memory Report** - Detailed memory statistics
   - **I2C Report** - Complete I2C bus scan with device identification

### Using Debug Components

#### Monitor Memory Usage

Watch for memory leaks or high usage:

```yaml
# In automation or script
- if:
    condition:
      lambda: 'return id(memory_usage_percent).state > 80.0;'
    then:
      - logger.log:
          level: WARN
          message: "High memory usage detected!"
```

#### Check I2C Health

Monitor I2C bus reliability:

```yaml
# Check I2C health before critical operations
- if:
    condition:
      lambda: 'return id(i2c_health_score).state < 50.0;'
    then:
      - logger.log:
          level: ERROR
          message: "I2C bus degraded - check connections"
```

#### Manual Diagnostics

Use the debug buttons in Home Assistant or the web interface:
1. Press "Debug - I2C Report" to see all connected devices
2. Press "Debug - Memory Report" to check system resources
3. Press "I2C Scan Now" to refresh sensor detection

## Troubleshooting Guide

### Issue: No I2C Devices Detected

**Symptoms:**
- "I2C Devices Connected" shows 0
- All EZO sensor detection shows "off"

**Solutions:**
1. Check physical connections (SDA=GPIO21, SCL=GPIO22)
2. Verify EZO circuits are powered (green LED)
3. Run "I2C Scan Now" button
4. Check logs for I2C errors: `ESP_LOGE("i2c", ...)`
5. Verify I2C pullup resistors (usually built-in on EZO circuits)

### Issue: Specific Sensor Not Detected

**Symptoms:**
- Other sensors work, but one doesn't appear
- Sensor binary sensor shows "off"

**Solutions:**
1. Verify the sensor's I2C address (might have been changed)
2. Check if sensor LED is on (power issue)
3. Try the sensor alone on the bus (address conflict?)
4. Use "Debug - I2C Report" to see actual addresses
5. Check for loose wiring on that specific sensor

### Issue: High Memory Usage

**Symptoms:**
- "Memory Usage Percent" > 80%
- System becomes unstable or crashes
- "System Health Status" shows "WARNING" or "CRITICAL"

**Solutions:**
1. Press "Debug - Memory Report" to see details
2. Reduce update intervals in sensor configs
3. Disable unused sensors or components
4. Check for memory leaks in custom lambda code
5. Consider reducing log verbosity

### Issue: I2C Communication Errors

**Symptoms:**
- Sensors intermittently stop responding
- "I2C Health Score" is low (<50%)
- Seeing "NACK" or timeout errors in logs

**Solutions:**
1. Check wire quality and length (keep under 1 meter for high reliability)
2. Add external pullup resistors (2.2kΩ-4.7kΩ) to SDA and SCL if bus is long
3. Reduce update frequency to give devices more time
4. Check for ground loops or power supply noise
5. Try reducing I2C bus speed (add to device_base.yaml):
   ```yaml
   i2c:
     sda: ${sdaPin}
     scl: ${sclPin}
     scan: true
     id: bus_a
     frequency: 50kHz  # Default is 100kHz
   ```

### Issue: Sensor Shows "Unknown" or NAN

**Symptoms:**
- Sensor detection shows "on" but no readings
- Values show as "Unknown" or "NAN"

**Solutions:**
1. Check sensor calibration
2. Verify sensor is in appropriate medium (water for aquatic sensors)
3. Check command syntax in logs
4. Try manual read using sensor's read button
5. Send "Status" command to check sensor state
6. Review sensor-specific troubleshooting in Atlas Scientific documentation

## Best Practices Summary

✅ **DO:**
- Use `id(bus_a).is_connected(address)` for sensor detection
- Log with appropriate levels (DEBUG, INFO, WARN, ERROR)
- Include context in all log messages
- Check for null/NAN before processing data
- Monitor memory and I2C health regularly
- Test with sensors disconnected
- Provide graceful fallbacks for missing sensors

❌ **DON'T:**
- Use Wire.beginTransmission() directly
- Log at ERROR level for expected conditions (like missing optional sensors)
- Assume sensors are always present
- Ignore NAN or null values
- Skip validation of parsed data
- Remove error checking to "simplify" code

## Additional Resources

- ESPHome I2C Bus Documentation: https://esphome.io/components/i2c.html
- Atlas Scientific EZO Documentation: `Atlas EZO docs/` directory in repository root
- ESPHome Logging: https://esphome.io/components/logger.html
- ESPHome Debug Component: https://esphome.io/components/debug.html

## Support

For issues or questions:
1. Check the logs first (enable VERBOSE if needed)
2. Run diagnostic buttons (Memory Report, I2C Report)
3. Check this debugging guide
4. Review GitHub issues: https://github.com/TheRealFalseReality/aquapi/issues
5. Consult Atlas Scientific support for sensor-specific issues
