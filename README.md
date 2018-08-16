# homebridge-raspberrypi-temperature
[![npm version](https://badge.fury.io/js/homebridge-raspberrypi-temperature.svg)](https://badge.fury.io/js/homebridge-raspberrypi-temperature)

a homebridge plugin that get RaspberryPi CPU temperature.

![](https://raw.githubusercontent.com/YinHangCode/homebridge-raspberrypi-temperature/master/images/RaspberryPi3B.jpg)

## Configuration
```
"accessories": [{
    "accessory": "RaspberryPiTemperature",
    "name": "RaspberryPi CPU Temperature"
}]
```
If you want temperature value timing update, you can set 'updateInterval' attribute(unit: milliseconds).   
```
"accessories": [{
    "accessory": "RaspberryPiTemperature",
    "name": "RaspberryPi CPU Temperature",
    "updateInterval": 1000
}]
```
For Orange PI
```
"accessories": [{
    "accessory": "RaspberryPiTemperature",
    "name": "OrangePi CPU Temperature",
    "file": "/sys/devices/virtual/thermal/thermal_zone0/temp",
    "multiplier": 1
}]
```

## Version Logs
### 0.0.7
1. Add support OrangePI.   
### 0.0.6
1. update 'package.json'.   
### 0.0.5
1. add timing update value features.   
### 0.0.4
1. optimized code.   
### 0.0.3
1. fixed bug.   
### 0.0.2
1. publish to [www.npmjs.com](https://www.npmjs.com).   
### 0.0.1
1. get RaspberryPi CPU temperature.   
