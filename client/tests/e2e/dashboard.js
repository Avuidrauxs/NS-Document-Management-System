const config = require('./config/config');
const faker = require('faker');

module.exports = {
  'Public documents should be listed': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('.signin-button')
      .waitForElementVisible('.main-container', 3000)
      .assert.urlEquals(`${config.url}dashboard`);
  }
};
