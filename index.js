var Accessory, Service, Characteristic, UUIDGen;

const fs = require('fs');
const packageFile = require("./package.json");

module.exports = function(homebridge) {
    if(!isConfig(homebridge.user.configPath(), "accessories", "RaspberryPiTemperature")) {
        return;
    }
    
    Accessory = homebridge.platformAccessory;
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    UUIDGen = homebridge.hap.uuid;

    homebridge.registerAccessory('homebridge-raspberrypi-temperature', 'RaspberryPiTemperature', RaspberryPiTemperature);
}

function isConfig(configFile, type, name) {
    var config = JSON.parse(fs.readFileSync(configFile));
    if("accessories" === type) {
        var accessories = config.accessories;
        for(var i in accessories) {
            if(accessories[i]['accessory'] === name) {
                return true;
            }
        }
    } else if("platforms" === type) {
        var platforms = config.platforms;
        for(var i in platforms) {
            if(platforms[i]['platform'] === name) {
                return true;
            }
        }
    } else {
    }
    
    return false;
}

function RaspberryPiTemperature(log, config) {
    if(null == config) {
        return;
    }

    this.log = log;
    this.name = config["name"];
    if(config["file"]) {
        this.readFile = config["file"];
    } else {
        this.readFile = "/sys/class/thermal/thermal_zone0/temp";
    }
  
}

RaspberryPiTemperature.prototype = {
    getServices: function() {
        var that = this;
        
        var infoService = new Service.AccessoryInformation();
        infoService
            .setCharacteristic(Characteristic.Manufacturer, "RaspberryPi")
            .setCharacteristic(Characteristic.Model, "3B")
            .setCharacteristic(Characteristic.SerialNumber, "Undefined")
            .setCharacteristic(Characteristic.FirmwareRevision, packageFile.version);
        
        var raspberrypiService = new Service.TemperatureSensor(that.name);
        var currentTemperatureCharacteristic = raspberrypiService.getCharacteristic(Characteristic.CurrentTemperature);
        function updateCurrentTemperatureCharacteristic() {
            var data = fs.readFileSync(that.readFile, "utf-8");
            var temperatureVal = parseFloat(data) / 1000;
            that.log.debug("update currentTemperatureCharacteristic value: " + temperatureVal);
            currentTemperatureCharacteristic.updateValue(temperatureVal);
        }
        updateCurrentTemperatureCharacteristic();
        setInterval(updateCurrentTemperatureCharacteristic, 60 * 1000);
        
        return [infoService, raspberrypiService];
    }
}

