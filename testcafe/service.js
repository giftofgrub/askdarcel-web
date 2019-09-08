import ServicePage from './pages/ServicePage';
import EditResourcePage from './pages/EditResourcePage';

const servicePage = new ServicePage();
const editResourcePage = new EditResourcePage();

// Define service information to test
// Tests depend on service information
// TODO: Create a new service and add all this information in the future
//  to not rely on hardcoded data
const serviceData = {
  id: 5,
  name: 'Mental Health Services',
  description: 'Drop in MTuThF 8:30am-10:00am or W 1pm-2:30pm. Psychiatric medication management, counseling, clinical case management & support group. Filipino counseling\nteam. Citywide, but priority given to SOMA, Western Addition, & Tenderloin. ',
  note: '$0-full bill. English, Spanish, Tagalog.',
  phone: '(415) 836-1700 ',
  address: '760 Harrison',
};

fixture`Service Page`
  // TODO: Dynamically find a service to test against
  .page(servicePage.url(serviceData.id));

const modifySheduleTime = async (t, action = 'add') => {
  // Click edit service button
  await t
    .click(servicePage.editButton);

  // Get the correct service and it's schedule
  const service = EditResourcePage.getService(serviceData.id);
  const { schedule } = service;

  if (action === 'add') {
    await t
      .click(schedule.tuesday.addButton)
      .typeText(schedule.tuesday.lastStart, '17:00')
      .typeText(schedule.tuesday.lastEnd, '18:00');
  } else if (action === 'remove') {
    await t
      .click(schedule.tuesday.removeButton);
  }

  // Test that there is one more day added
  return t.click(editResourcePage.saveButton);
};

test('Confirm Page Loads with Information', async t => {
  await t
    // Wait for page to load
    .hover(servicePage.editButton)

    // Name element should exist
    .expect(servicePage.name.exists)
    .ok()

    // Description element should exist
    .expect(servicePage.description.exists)
    .ok()

    // Details element should exist
    .expect(servicePage.details.exists)
    .ok()

    // Edit button should exist
    .expect(servicePage.editButton.exists)
    .ok()

    // Print button should exist
    .expect(servicePage.printButton.exists)
    .ok()

    // Directions button should exist
    .expect(servicePage.directionsButton.exists)
    .ok();
});

test('Confirm Page Loads with Correct Name', async t => {
  await t.expect(servicePage.name.textContent).eql(serviceData.name);
});

test('Confirm Page Loads with Correct Description', async t => {
  await t.expect(servicePage.description.textContent).eql(serviceData.description);
});

test('Confirm Page Loads with Correct Phone Number', async t => {
  await t.expect(servicePage.phone.textContent).eql(serviceData.phone);
});

test('Confirm Page Loads with Correct Note', async t => {
  await t.expect(servicePage.note.textContent).eql(serviceData.note);
});

test('Confirm Page Loads with Correct Address', async t => {
  await t.expect(servicePage.address.textContent).eql(serviceData.address);
});

test('Confirm Service Schedule Day Can Be Added', async t => {
  // Wait for page to load before counting services by using hover action.
  await t.hover(servicePage.editButton);

  // Count the number of schedule days
  const originalScheduleDayCount = await servicePage.schedule.with({ boundTestRun: t }).count;

  await modifySheduleTime(t);

  await t
    .navigateTo(servicePage.url(serviceData.id))
    .hover(servicePage.editButton)
    .expect(servicePage.schedule.count)
    .eql(originalScheduleDayCount + 1);
});

// TODO: Uncomment with the completion of ISSUE #594
test.skip('Confirm Service Schedule Day Can Be Deleted', async t => {
  // Wait for page to load before counting services by using hover action.
  await t.hover(servicePage.editButton);

  // Count the number of schedule days
  const originalScheduleDayCount = await servicePage.schedule.with({ boundTestRun: t }).count;

  await modifySheduleTime(t);

  await t
    .navigateTo(servicePage.url(serviceData.id))
    .hover(servicePage.editButton);

  await modifySheduleTime(t, 'remove');

  await t
    .navigateTo(servicePage.url(serviceData.id))
    .hover(servicePage.editButton)
    .expect(servicePage.schedule.count)
    .eql(originalScheduleDayCount - 1);
});
