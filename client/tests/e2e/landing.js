const config = require('./config/config');
const faker = require('faker');

const username = faker.internet.userName();
const password = faker.internet.password();
const fullName = faker.name.findName();
const email = faker.internet.email();
const wrongPassword = faker.internet.password();

module.exports = {
  'User sign in with wrong credentials': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[name=username]', 'fffggf')
      .setValue('input[name=password]', 'fgdfgfdgfd')
      .click('.signin-button')
      .waitForElementVisible('.toast-message', 3000)
      .assert.containsText('.toast-message', 'Invalid username or password')
      .assert.urlEquals(config.url);
  },
  'Admin sign in with correct credentials': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('.signin-button')
      .waitForElementVisible('.main-heading', 3000)
      .assert.urlEquals(`${config.url}dashboard`);
  },
  'User sign in with correct credentials': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[name=username]', 'PepperSoup')
      .setValue('input[name=password]', 'soup')
      .click('.signin-button')
      .waitForElementVisible('.main-heading', 3000)
      .assert.urlEquals(`${config.url}dashboard`);
  },
  'New user cant register if passwords mismatch': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('#signup')
      .setValue('input[name=fullName]', fullName)
      .setValue('input[name=signUpUsername]', username)
      .setValue('input[name=signUpPassword]', password)
      .setValue('input[name=confirmPassword]', wrongPassword)
      .setValue('input[name=email]', email)
      .click('.signup-button')
      .waitForElementVisible('.toast-message', 3000)
      .assert.containsText('.toast-message', 'Password mismatch')
      .assert.containsText('input[name=signUpPassword]', '')
      .assert.containsText('input[name=confirmPassword]', '');
  },
  'New can register with correct information': (browser) => {
    browser
    .url(config.url)
    .waitForElementVisible('body', config.waitFor)
    .click('#signup')
    .setValue('input[name=fullName]', fullName)
    .setValue('input[name=signUpUsername]', username)
    .setValue('input[name=signUpPassword]', password)
    .setValue('input[name=confirmPassword]', password)
    .setValue('input[name=email]', email)
    .click('.signup-button')
    .waitForElementVisible('.main-heading', 3000)
    .assert.urlEquals(`${config.url}dashboard`);
  }
};
