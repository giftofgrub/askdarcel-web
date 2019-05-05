import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Notes from '../Notes';

describe('<Notes />', () => {
  const mockNotes = () => [{
    id: 0,
    notes: 'test note',
  }];

  it('should render a notes component', () => {
    const comp = shallow(<Notes notes={mockNotes()} />);
    expect(comp.find('.service--section')).to.have.lengthOf(1);
  });

  it('should not render a notes component if notes are missing', () => {
    const comp = shallow(<Notes />);
    expect(comp.find('.service--section')).to.have.lengthOf(0);
  });
});
