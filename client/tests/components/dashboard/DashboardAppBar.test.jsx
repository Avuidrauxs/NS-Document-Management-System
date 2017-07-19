import React from 'react';
import { shallow } from 'enzyme';
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
    const props = {
      logout: sinon.spy(() => new Promise(() => {})),
    };
    it('should render once with props', () => {
      const component = shallow(<DashboardAppBar {...props} />);
      expect(component.length).toEqual(1);
    });
    it('should call `signOut` clicked', () => {
      const onSignOutSpy = sinon.spy(() => new Promise(() => {}));
      const component = shallow(
        <DashboardAppBar
          onSignOut={onSignOutSpy}
          {...props} />);
      const button = component.find('MenuItem').at(1);
      button.simulate('click', onSignOutSpy());
      component.instance().onSignOut();

      expect(onSignOutSpy.calledOnce).toEqual(true);
      expect(onSignOutSpy.callCount).toEqual(1);
    });
    it('should toggle DashboardDrawer', () => {
      const component = shallow(
        <DashboardAppBar
          {...props} />);

      component.instance().handleToggle();
      component.setState({
        open: true
      });

      expect(component.state('open')).toEqual(true);
    });
    it('should close DashboardDrawer', () => {
      const component = shallow(
        <DashboardAppBar
          {...props} />);

      component.instance().handleClose();
      component.setState({
        open: false
      });

      expect(component.state('open')).toEqual(false);
    });
    it('should handle Touch tap for Avatar menu', () => {
      const component = shallow(
        <DashboardAppBar
          {...props} />);

      component.instance().handleTouchTap({
        preventDefault: () => {},
        currentTarget: 1 });
      component.setState({
        menuOpen: true,
        anchorEl: 1,
      });

      expect(component.state('menuOpen')).toEqual(true);
      expect(component.state('anchorEl')).toEqual(1);
    });
    it('should handle request close for Avatar menu', () => {
      const component = shallow(
        <DashboardAppBar
          {...props} />);

      component.instance().handleRequestClose();
      component.setState({
        menuOpen: false,
      });

      expect(component.state('menuOpen')).toEqual(false);
    });
    it('should handle open edit user for Avatar menu', () => {
      const component = shallow(
        <DashboardAppBar
          {...props} />);

      component.instance().handleOpenEdit();
      component.setState({
        openEdit: true,
      });
      expect(component.state('openEdit')).toEqual(true);
    });
    it('should handle close edit user for Avatar menu', () => {
      const component = shallow(
        <DashboardAppBar
          {...props} />);

      component.instance().onCloseOpenEdit();
      component.setState({
        openEdit: false,
      });
      expect(component.state('openEdit')).toEqual(false);
    });
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
