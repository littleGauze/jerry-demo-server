module.exports = app => {
  const joi = app.joi;

  class HomeController extends app.BaseController {
    get mqttServie() {
      return this.ctx.service.mqtt;
    }

    async index() {
      const { ctx } = this;
      // await this.validate('index');
      await this.mqttServie.test();
      ctx.body = 'hi egg';
    }

    async list() {
      const { ctx } = this;
      console.log('设备列表');
      console.log(JSON.stringify(ctx.request.body));
      console.log('------');
      const devices = [];

      // 我们创建 1 个灯泡
      devices.push({
        name: 'ESP32',
        deviceId: 'ESP32-LIGHT-001',
        deviceInfo: { id: '001' },
        type: 'light',
        actions: {
          switch: [ 'on', 'off' ],
        },
        state: {
          swith: 'off',
        },
      });

      return {
        status: 0,
        data: devices,
      };
    }

    async execute() {
      const { ctx } = this;
      console.log('执行控制');
      console.log(JSON.stringify(ctx.request.body));
      console.log('------');
      let state = 'off';

      // switch the light
      state = 'on';

      return {
        status: 0,
        data: {
          switch: state,
        },
      };
    }
  }

  HomeController.RULES = {
    index: {
      query: joi.object({
        page: joi.number().required(),
      }),
    },
  };

  return HomeController;
};
