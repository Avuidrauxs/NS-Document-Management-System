import React from 'react';
import { shallow } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { DashboardDrawer } from '../../../components/dashboard/DashboardDrawer';


injectTapEventPlugin();

describe('Dashboard Drawer page', () => {
  let defaultProps;
  let spyProps;
  beforeEach(() => {
    defaultProps = {
      dispatch: () => {},
      open: false,
      closeDrawer: () => {},
      user: { username: 'admin', roleId: 1, id: 1 },
    };
    spyProps = {
      dispatch: () => {},
      open: false,
      closeDrawer: () => {},
      user: { username: 'admin', roleId: 1, id: 1 },
    };
  });
  describe('render method', () => {
    it('should render once ', () => {
      expect(
        shallow(<DashboardDrawer {...defaultProps} />).length
      ).toEqual(1);
    });
    it('should render with 4 props', () => {
      const component = shallow(<DashboardDrawer {...defaultProps} />);
      expect(Object.keys(component.instance().props).length).toEqual(4);
    });
  });
});
