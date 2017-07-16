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
      .pause(1000)
      .setValue('input[name=password]', 'fgdfgfdgfd')
      .pause(1000)
      .click('.signin-button')
      .waitForElementVisible('.toast-message', config.waitFor)
      .assert.containsText('.toast-message', 'Invalid username or password')
      .assert.urlEquals(config.url);
  },
  'Admin sign in with correct credentials': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[name=username]', 'admin')
      .pause(1000)
      .setValue('input[name=password]', 'admin')
      .pause(1000)
      .click('.signin-button')
      .waitForElementVisible('.main-heading', config.waitFor)
      .assert.urlEquals(`${config.url}dashboard`);
  },
  'User sign in with correct credentials': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[name=username]', 'PepperSoup')
      .pause(1000)
      .setValue('input[name=password]', 'soup')
      .pause(1000)
      .click('.signin-button')
      .waitForElementVisible('.main-heading', config.waitFor)
      .assert.urlEquals(`${config.url}dashboard`);
  },
  'New user cant register if passwords mismatch': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('#signup')
      .setValue('input[name=fullName]', fullName)
      .pause(1000)
      .setValue('input[name=signUpUsername]', username)
      .pause(1000)
      .setValue('input[name=signUpPassword]', password)
      .pause(1000)
      .setValue('input[name=confirmPassword]', wrongPassword)
      .pause(1000)
      .setValue('input[name=email]', email)
      .click('.signup-button')
      .waitForElementVisible('.toast-message', config.waitFor)
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
    .pause(1000)
    .setValue('input[name=signUpUsername]', username)
    .pause(1000)
    .setValue('input[name=signUpPassword]', password)
    .pause(1000)
    .setValue('input[name=confirmPassword]', password)
    .pause(1000)
    .setValue('input[name=email]', email)
    .pause(1000)
    .click('.signup-button')
    .waitForElementVisible('.main-heading', config.waitFor)
    .assert.urlEquals(`${config.url}dashboard`);
  },
  'New user cant register if Username or Email exists': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('#signup')
      .setValue('input[name=fullName]', fullName)
      .pause(1000)
      .setValue('input[name=signUpUsername]', username)
      .pause(1000)
      .setValue('input[name=signUpPassword]', password)
      .pause(1000)
      .setValue('input[name=confirmPassword]', password)
      .pause(1000)
      .setValue('input[name=email]', email)
      .pause(1000)
      .click('.signup-button')
      .waitForElementVisible('.toast-message', config.waitFor)
      .assert.containsText('.toast-message', 'Username or email is taken')
      .end();
  },
};
