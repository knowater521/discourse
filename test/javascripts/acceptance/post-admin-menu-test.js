import { acceptance, updateCurrentUser } from "helpers/qunit-helpers";

acceptance("Post - Admin Menu Anonymous Users", { loggedIn: false });

QUnit.test("Enter as a regular user", async assert => {
  await visit("/t/internationalization-localization/280");
  await click(".show-more-actions");

  assert.ok(exists("#topic"), "The topic was rendered");
  assert.ok(!exists(".show-post-admin-menu"), "The wrench button was not rendered");
});


acceptance("Post - Admin Menu", { loggedIn: true });

QUnit.test("Enter as a user with group moderator permissions", async assert => {
  updateCurrentUser({ moderator: false, admin: false, trust_level: 1 });

  await visit("/t/topic-for-group-moderators/2480");
  await click(".show-more-actions");
  await click(".show-post-admin-menu");

  assert.ok(exists(".add-notice"), "The add nottice button was rendered");
});

QUnit.test("Enter as a user with moderator and admin permissions", async assert => {
  updateCurrentUser({ moderator: true, admin: true, trust_level: 4 });

  await visit("/t/internationalization-localization/280");
  await click(".show-more-actions");
  await click(".show-post-admin-menu");

  assert.ok(exists(".add-notice"), "The add nottice button was rendered");
});
