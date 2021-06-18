module.exports = app => {

  const { router, controller } = app;

  // router.prefix('/api');

  router.get('/', controller.home.index);

  router.post('/list', controller.home.list);
  router.post('/execute', controller.home.execute);
};
