import NewResourcePage from './pages/NewResourcePage';
import ResourcePage from './pages/ResourcePage';

const newResourcePage = new NewResourcePage();

fixture`Add New Resource`
  .page(NewResourcePage.url());

test('Add new resource, basic', async t => {
  // TODO: Currently, all that is required is a name and an address
  // what should the minimum data be for a new resource?
  const data = {
    name: 'New Resource Name',
    address: {
      address1: '123 Fake St.',
      city: 'San Francisco',
      stateOrProvince: 'CA',
      country: 'United States',
      postalCode: '94110',
    },
    phone: {
      number: '1234567890',
      type: 'LandLine',
    },
    website: 'https://theBestResource.best',
    email: 'theBestResource1337@aol.com',
    description: 'A description of this resource',
    notes: 'A new note about this resource',
  };

  // Add name
  await t.typeText(newResourcePage.name, data.name, { replace: true });

  // Add address
  await Object.keys(data.address).reduce(
    (_t, prop) => _t.typeText(
      newResourcePage.address[prop],
      data.address[prop],
      { replace: true },
    ),
    t,
  );

  // Add website
  await t.typeText(newResourcePage.website, data.website, { replace: true });

  // Add email
  // For some reason, testCafe puts the email in backwards
  const reversedEmail = data.email.split('').reverse().join('');
  await t.typeText(newResourcePage.email, reversedEmail, { replace: true });

  // Add description
  await t.typeText(newResourcePage.description, data.description, { replace: true });

  function dialogHandler(type, text) {
    if (!text.includes('Resource successfuly created')) {
      throw new Error(`Got unexpected dialog: ${text}`);
    }
  }
  await t.setNativeDialogHandler(dialogHandler)
    .click(newResourcePage.saveButton)
    .setNativeDialogHandler(null);
  const dialogHistory = await t.getNativeDialogHistory();
  await t.expect(dialogHistory.length).eql(1);

  // Get resource page
  const resourcePage = new ResourcePage();

  // Ensure resource name is correct
  await t.expect(resourcePage.resourceName.textContent).eql(data.name);

  // Ensure resource address is correct
  await t.expect(resourcePage.address.textContent).contains(data.address.address1);
  await t.expect(resourcePage.address.textContent).contains(data.address.city);
  await t.expect(resourcePage.address.textContent).contains(data.address.stateOrProvince);
  await t.expect(resourcePage.address.textContent).contains(data.address.postalCode);

  // Ensure resource website is correct
  await t.expect(resourcePage.website.textContent).eql(data.website);

  // Ensure resource email is correct
  await t.expect(resourcePage.email.textContent).eql(data.email);

  // Ensure resource description is correct
  await t.expect(resourcePage.description.textContent).eql(data.description);
});
