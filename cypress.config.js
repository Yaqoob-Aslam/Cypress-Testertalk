const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter', // Add this line

  e2e: {
    setupNodeEvents(on, config) {
      // Add this line to load the reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
