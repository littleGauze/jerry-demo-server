const Service = require('egg').Service;

const type = {
  LIGHT_CTRL: 'LIGHT_CTRL',
  TEMP_HUMI: 'TEMP_HUMI',
};

module.exports = class WebSocketService extends Service {
  get mqttService() {
    return this.ctx.service.mqtt;
  }

  get ws() {
    return this.app.lib.websocket;
  }

  parseMessage(msg) {
    console.log('parse message ', msg);
  }

  async init() {
    this.sendNumber();
    this.mqttService.init();
  }

  async sendNumber() {
    const client = await this.ws;
    const number = Math.round(Math.random() * 100);
    client.sendUTF(JSON.stringify({
      type: type.TEMP_HUMI,
      payload: {
        temp: number,
        humi: number,
      },
    }));
    setTimeout(this.sendNumber.bind(this), 1000);
  }
};
