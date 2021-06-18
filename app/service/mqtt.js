const Service = require('egg').Service;
const mqtt = require('mqtt');

module.exports = class MqttService extends Service {
  constructor(...args) {
    super(...args);

    const client = mqtt.connect('mqtt://test.mosquitto.org');
    client.on('connect', function() {
      client.subscribe('jerry-demo:presence', function(err) {
        if (!err) {
          client.publish('jerry-demo:presence', 'Hello mqtt');
        }
      });
    });

    client.on('message', function(topic, message) {
      // message is Buffer
      console.log(message.toString());
      client.end();
    });
  }

  async init() {

  }
};
