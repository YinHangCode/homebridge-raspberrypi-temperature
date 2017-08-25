var fs = require('fs');
var Accessory, Service, Characteristic, UUIDGen;

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
  
}

RaspberryPiTemperature.prototype = {
  identify: function(callback) {
    callback();
  },

  getServices: function() {
    var services = [];

    var infoService = new Service.AccessoryInformation();
    infoService
      .setCharacteristic(Characteristic.Manufacturer, "RaspberryPi")
      .setCharacteristic(Characteristic.Model, "3B")
      .setCharacteristic(Characteristic.SerialNumber, "Undefined");
    services.push(infoService);

    var raspberrypiService = new Service.TemperatureSensor(this.name);
    raspberrypiService
      .getCharacteristic(Characteristic.CurrentTemperature)
      .on('get', this.getTemperature.bind(this));
    services.push(raspberrypiService);
    
    return services;
  },
  
  getTemperature: function(callback) {
    var data = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp","utf-8");
    var temperature = parseFloat(data)/1000;
    this.log.debug("temperature: " + temperature);
    
    callback(null, temperature);
  }

}

