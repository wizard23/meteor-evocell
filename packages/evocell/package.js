Package.describe({
  summary: "EvoCell Engine",
  version: "0.0.1-alpha"
});

Package.on_use(function (api) {
  api.use('underscore', ['client', 'server']);

  api.export('Reactor');
  api.export('Dish');

  api.add_files('gl/GLHelper.js', 'client');
  api.add_files('gl/Dish.js', 'client');
  api.add_files('gl/Rule.js', 'client');
  api.add_files('gl/ParticleSystem.js', 'client');
  api.add_files('gl/Palette.js', 'client');
  api.add_files('gl/Reactor.js', 'client');
});

Package.on_test(function (api) {
  /*api.use('accounts-base');
   api.use('tinytest');
   api.use('random');
   api.use('test-helpers');
   api.use('oauth-encryption');
   api.add_files('accounts_tests.js', 'server');
   api.add_files("accounts_url_tests.js", "client");
   */
});