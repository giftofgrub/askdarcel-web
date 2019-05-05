import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import DetailedHours from '../DetailedHours';
import { ListingDebugPage, simpleScheduleLookup } from '../../../pages/debug/ListingDemoPage';

describe('<DetailedHours />', () => {
  const getNamedSchedule = name => ListingDebugPage
    .createScheduleFromShorthand([simpleScheduleLookup[name]])[0];

  it('should render a Detailed Hours component with schedule data', () => {
    const schedule = getNamedSchedule('twenty_four_seven');
    const comp = shallow(<DetailedHours schedule={schedule.schedule_days} />);
    expect(comp.find('.weekly-hours-list')).to.have.lengthOf(1);
  });

  it('should not render a Detailed Hours component without schedule data', () => {
    const emptySchedule = [];
    const comp = shallow(<DetailedHours schedule={emptySchedule} />);
    expect(comp.find('.weekly-hours-list')).to.have.lengthOf(0);
  });
});
