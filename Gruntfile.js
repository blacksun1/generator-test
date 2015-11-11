"use strict";

export default grunt => {
  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);

  // Change the colour output of mocha so that it can be read on a solarized
  // dark themed terminal.
  const colors = require("mocha/lib/reporters/base").colors;
  for (const colorIdx in colors) {
    if (colors[colorIdx] === 90) {
      colors[colorIdx] = 0;
    }
  }

  grunt.initConfig({
    "pkg": grunt.file.readJSON("package.json"),

    "babel": {
      "options": {
        "blacklist": "regenerator",
        "plugins": ["extends-error"],
        "sourceMap": true,
        "stage": "0",
      },
      "dist": {
        "files": [{
          "cwd": "src",
          "dest": "dist",
          "expand": true,
          "ext": ".js",
          "src": ["**/*.es6"],
        }],
      },
    },

    "clean": {
      "dist": ["dist"],
    },

    "eslint": {
      "options": {
        formatter: "compact",
      },
      "src": [
        "Gruntfile.js",
        "src/**/*.es6",
      ],
    },

    "mochaTest": {
      "test": {
        "options": {
          "quiet": false,
          "reporter": "spec",
          "require": ["babel/register"],
          "source-maps": true,
          "timeout": 4000,
        },
        "src": ["src/test/**/*.es6"],
      },
    },

    "watch": {
      "files": [
        "Gruntfile.js",
        "src/**/.eslintrc",
        "src/**/*",
      ],
      "tasks": "default",
    },
  });

  grunt.registerTask("build", ["clean", "eslint", "babel"]);
  grunt.registerTask("test", ["mochaTest"]);
  grunt.registerTask("default", ["build", "test"]);
};
