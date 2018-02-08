const config = require('./config/config');
const faker = require('faker');

const title = faker.lorem.word();
const body = faker.lorem.paragraph();
const email = faker.internet.email();

module.exports = {
  'Public documents should be listed': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[name=username]', 'PepperSoup')
      .pause(1000)
      .setValue('input[name=password]', 'soup')
      .pause(1000)
      .click('.signin-button')
      .waitForElementVisible('.main-container', config.waitFor)
      .assert.urlEquals(`${config.url}dashboard`);
  },
  'Search documents should be real time': (browser) => {
    browser
    .url(config.url)
    .waitForElementVisible('body', config.waitFor)
    .setValue('input[name=username]', 'PepperSoup')
    .pause(1000)
    .setValue('input[name=password]', 'soup')
    .click('.signin-button')
    .waitForElementVisible('.main-container', config.waitFor)
    .setValue('input[name=searchText]', 'Taken')
    .pause(1000)
    .clearValue('input[name=searchText]')
    .pause(1000)
    .clearValue('input[name=searchText]')
    .setValue('input[name=searchText]', 'P')
    .pause(1000)
    .clearValue('input[name=searchText]')
    .setValue('input[name=searchText]', 'fsdafsdfen')
    .waitForElementVisible('.no-doc', config.waitFor)
    .pause(1000)
    .assert.containsText('.no-doc', 'NO DOCUMENTS AVAILABLE')
    .assert.urlEquals(`${config.url}dashboard`);
  },
  'User can open a document': (browser) => {
    browser
    .url(`${config.url}dashboard/user-documents`)
    .waitForElementVisible('body', config.waitFor)
    .waitForElementVisible('.main-container', config.waitFor)
    .click('.openCard')
    .waitForElementVisible('.openModal', config.waitFor)
    .assert.elementPresent('.openModal')
    .pause(2000)
    .click('.openDoc')
    .pause(1000)
    .assert.urlEquals(`${config.url}dashboard/user-documents`);
  },
  'User can edit document': (browser) => {
    browser
    .url(`${config.url}dashboard/user-documents`)
    .waitForElementVisible('body', config.waitFor)
    .waitForElementVisible('.main-container', config.waitFor)
    .click('.editCard')
    .waitForElementVisible('.editModal', config.waitFor)
    .assert.elementPresent('.editModal')
    .pause(1000)
    .setValue('input[name=title]', title)
    .pause(1000)
    .click('.saveEdit')
    .waitForElementVisible('.swal2-modal', config.waitFor)
    .assert.elementPresent('.swal2-modal')
    .pause(1000)
    .assert.containsText('.swal2-title', 'Success!!')
    .pause(1000)
    .click('.swal2-confirm')
    .pause(1000)
    .assert.urlEquals(`${config.url}dashboard/user-documents`);
  },
  'Creating new Document with all inputs not filled': (browser) => {
    browser
    .url(`${config.url}dashboard/create-document`)
    .waitForElementVisible('body', config.waitFor)
    .setValue('input[name=title]', title)
    .pause(1000)
    .waitForElementVisible('.ql-editor', config.waitFor)
    .execute((doc) => {
      $('.ql-editor > p').html(doc);
    }, [body])
    .pause(2000)
    .click('.save-doc')
    .pause(1000)
    .waitForElementVisible('.toast-message', config.waitFor)
    .assert.containsText('.toast-message', 'Please fill out all fields')
    .assert.urlEquals(`${config.url}dashboard/create-document`);
  },
  'Delete an already existing document': (browser) => {
    browser
    .url(`${config.url}dashboard/user-documents`)
    .waitForElementVisible('body', config.waitFor)
    .waitForElementVisible('.main-container', config.waitFor)
    .click('.deleteCard')
    .waitForElementVisible('.swal2-modal', config.waitFor)
    .assert.elementPresent('.swal2-modal')
    .pause(1000)
    .assert.containsText('.swal2-title', 'Are you sure?')
    .pause(1000)
    .click('.swal2-confirm')
    .waitForElementVisible('.swal2-modal', config.waitFor)
    .assert.elementPresent('.swal2-modal')
    .assert.containsText('.swal2-title', 'Deleted!')
    .pause(1000)
    .click('.swal2-confirm')
    .pause(1000);
  },
  'User can edit profile': (browser) => {
    browser
    .url(`${config.url}dashboard`)
    .waitForElementVisible('body', config.waitFor)
    .click('.avatarHere')
    .pause(1000)
    .waitForElementVisible('.popMenu', config.waitFor)
    .click('.userModal')
    .waitForElementVisible('.updateProfile', config.waitFor)
    .assert.elementPresent('.updateProfile')
    .pause(1000)
    .clearValue('input[name=email]')
    .pause(1000)
    .setValue('input[name=email]', email)
    .pause(1000)
    .click('.profileEdit')
    .waitForElementVisible('.swal2-modal', config.waitFor)
    .assert.elementPresent('.swal2-modal')
    .assert.containsText('.swal2-title', 'Success!!')
    .pause(1000)
    .click('.swal2-confirm')
    .pause(1000);
  },
  'User can signout': (browser) => {
    browser
    .url(`${config.url}dashboard`)
    .waitForElementVisible('body', config.waitFor)
    .click('.avatarHere')
    .pause(1000)
    .waitForElementVisible('.popMenu', config.waitFor)
    .click('.sign-out-btn')
    .waitForElementVisible('.swal2-modal', config.waitFor)
    .assert.elementPresent('.swal2-modal')
    .assert.containsText('.swal2-title', 'You wanna leave?')
    .pause(1000)
    .click('.swal2-title')
    .pause(1000)
    .click('.swal2-confirm')
    .pause(1000)
    .assert.urlEquals(config.url)
    .end();
  }
};
