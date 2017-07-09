import React from 'react';
import { shallow, mount, render } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { DashboardDrawer } from '../../../components/dashboard/DashboardDrawer';
import { DashboardAppBar } from '../../../components/dashboard/DashboardAppBar';
import { EditProfileModal } from '../../../components/modals/EditProfileModal';

injectTapEventPlugin();

describe('Dashboard App Bar', () => {
  describe('presentational component <DashboardAppBar />', () => {
    let component;
    beforeEach(() => {
      component = shallow(
        <DashboardAppBar />
    );
    });

    it('should render once', () => {
      expect(component.length).toBe(1);
    });
  });
  describe('Actual <DashboardAppBar />', () => {
    it('should render once with props', () => {
      const component = shallow(<DashboardAppBar />);
      expect(component.length).toEqual(1);
    });
    // it('Should call logout when called', () => {
    //   const logoutSpy = sinon.spy(() => new Promise(() => {}));
    //   const component = mount(<DashboardAppBar logout={logoutSpy} />);
    //
    //   const button = component.find('button[type="click"]');
    //   button.simulate('click');
    //
    //   expect(logoutSpy.calledOnce).toEqual(true);
    //   expect(typeof logoutSpy.args[0]).toEqual('object');
    // });
  });
  describe('<DashboardDrawer /> presentation component', () => {
    it('should render with valid props', () => {
      const props = {
        open: true,
        user: { username: 'admin', roleId: 1, id: 1 },
        closeDrawer: sinon.spy(() => new Promise(() => {})),
      };
      const component = shallow(
        <DashboardDrawer {...props} />
      );
      expect(component.length).toBe(1);
    });
  });

  describe('<EditProfileModal /> presentation component', () => {
    it('should render with valid props', () => {
      const props = {
        getUserDetails: sinon.spy(() => new Promise(() => {})),
        updateUser: sinon.spy(() => new Promise(() => {})),
        userProfile: {},
        openEdit: true,
        user: { username: 'admin', roleId: 1, id: 1 },
        onCloseOpenEdit: sinon.spy(() => new Promise(() => {})),
      };
      const component = shallow(
        <EditProfileModal {...props} />
      );
      expect(component.length).toBe(1);
    });
  });
});
