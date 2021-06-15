module.exports = app => {

  const { router, controller } = app;

  router.prefix('/api');

  router.get('/', controller.home.index);

  router.get('/list', controller.home.list);
  router.get('/execute', controller.home.execute);
};
