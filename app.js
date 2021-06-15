const path = require('path');

class App {
  constructor(app) {
    this.app = app;
  }

  async didReady() {
    const { app } = this;
    this.initRepository();

    app.loader.loadToApp(path.join(app.config.baseDir, 'app/lib'), 'lib');
  }

  initRepository() {
    const { app } = this;
    const ctx = app.createAnonymousContext();
    const repositoryPath = path.join(app.config.baseDir, 'app/repository');

    app.loader.loadToContext(repositoryPath, 'repos', {
      call: true,
      fieldClass: 'repos',
      initializer(Repository) {
        return new Repository(app, ctx);
      },
    });
  }
}

module.exports = App;
