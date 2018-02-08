import React from 'react';
import { shallow } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dashboard from '../../../components/dashboard/Dashboard';


injectTapEventPlugin();

describe('Dashboard page', () => {
  describe('presentational component <Dashboard />', () => {
    let component;
    beforeEach(() => {
      component = shallow(
        <Dashboard />
    );
    });

    it('should render once', () => {
      expect(component.length).toBe(1);
    });
  });
});
