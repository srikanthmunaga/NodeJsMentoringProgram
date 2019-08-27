"use strict";

var SwaggerExpress = require("swagger-express-mw");
var app = require("express")();
var mongodb = require("./../express-server/database/mongodb");
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;

  mongodb.mongodb.on("open", function() {
    app.listen(port);
  });

  if (swaggerExpress.runner.swagger.paths["/hello"]) {
    console.log("Swagger Server Started");
  }
});
