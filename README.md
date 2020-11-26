# homebridge-raspberrypi-temperature
[![npm version](https://badge.fury.io/js/homebridge-raspberrypi-temperature.svg)](https://badge.fury.io/js/homebridge-raspberrypi-temperature)

a homebridge plugin that get RaspberryPi CPU temperature.

![](https://raw.githubusercontent.com/YinHangCode/homebridge-raspberrypi-temperature/master/images/RaspberryPi3B.jpg)

## simple configuration
```
"accessories": [{
    "accessory": "RaspberryPiTemperature",
    "name": "RaspberryPi CPU Temperature"
}]
```
set temperature measurement to celsius
```
"accessories": [{
    "accessory": "RaspberryPiTemperature",
    "name": "RaspberryPi CPU Temperature",
    "temperatureMeasurement": "celsius"
}]
```
if you want temperature value timing update, you can set 'updateInterval' attribute(unit: milliseconds).   
```
"accessories": [{
    "accessory": "RaspberryPiTemperature",
    "name": "RaspberryPi CPU Temperature",
    "temperatureMeasurement": "celsius",
    "updateInterval": 1000
}]
```
for Orange PI
```
"accessories": [{
    "accessory": "RaspberryPiTemperature",
    "name": "OrangePi CPU Temperature",
    "file": "/sys/devices/virtual/thermal/thermal_zone0/temp",
    "temperatureMeasurement": "celsius",
    "multiplier": 1
}]
```

## Version Logs
### 0.0.8 (2020-11-25)
1. (simplenotezy) Add support for celsius config parameter
### 0.0.7 (2018-08-04)
1. (banzalik) Add support OrangePI.   
### 0.0.6 (2018-02-10)
1. (hang.yin) update 'package.json'.   
### 0.0.5 (2018-02-10)
1. (hang.yin) add timing update value features.   
### 0.0.4 (2018-02-09)
1. (hang.yin) optimized code.   
### 0.0.3 (2017-08-20)
1. (hang.yin) fixed bug.   
### 0.0.2 (2017-08-14)
1. (hang.yin) publish to [www.npmjs.com](https://www.npmjs.com).   
### 0.0.1 (2017-05-24)
1. (hang.yin) get RaspberryPi CPU temperature.   
