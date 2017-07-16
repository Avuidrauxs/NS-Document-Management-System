const config = require('./config/config');

module.exports = {
  'All documents should be listed': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[name=username]', 'admin')
      .pause(1000)
      .setValue('input[name=password]', 'admin')
      .pause(1000)
      .click('.signin-button')
      .waitForElementVisible('.main-container', config.waitFor)
      .url(`${config.url}dashboard/admin-documents`)
      .waitForElementVisible('.main-container', config.waitFor)
      .setValue('input[name=searchText]', 'P')
      .pause(1000)
      .clearValue('input[name=searchText]')
      .assert.urlEquals(`${config.url}dashboard/admin-documents`);
  },
  'Admin can edit user roles': (browser) => {
    browser
      .url(`${config.url}dashboard/dash-users`)
      .waitForElementVisible('body', config.waitFor)
      .click('.editRole')
      .pause(1000)
      .waitForElementVisible('.updateRole', config.waitFor)
      .assert.elementPresent('.updateRole')
      .pause(1000)
      .click('.updateUserRole')
      .waitForElementVisible('.swal2-modal', config.waitFor)
      .assert.elementPresent('.swal2-modal')
      .pause(1000)
      .assert.containsText('.swal2-title', 'Success!')
      .pause(1000)
      .click('.swal2-confirm')
      .pause(1000)
      .assert.urlEquals(`${config.url}dashboard/dash-users`);
  },
  'Admin can delete user roles': (browser) => {
    browser
      .url(`${config.url}dashboard/dash-users`)
      .waitForElementVisible('body', config.waitFor)
      .waitForElementVisible('.deleteUser', config.waitFor)
      .click('.deleteUser')
      .pause(1000)
      .waitForElementVisible('.swal2-modal', config.waitFor)
      .assert.elementPresent('.swal2-modal')
      .pause(1000)
      .assert.containsText('.swal2-title', 'Are you sure?')
      .pause(1000)
      .click('.swal2-confirm')
      .waitForElementVisible('.swal2-modal', config.waitFor)
      .assert.elementPresent('.swal2-modal')
      .pause(1000)
      .assert.containsText('.swal2-title', 'Deleted!')
      .pause(1000)
      .click('.swal2-confirm')
      .pause(1000)
      .assert.urlEquals(`${config.url}dashboard/dash-users`)
      .end();
  }
};
