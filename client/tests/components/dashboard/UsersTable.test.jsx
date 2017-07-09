import React from 'react';
import { shallow, mount, render } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { UsersTable } from '../../../components/dashboard/UsersTable';
import { EditUserModal } from '../../../components/modals/EditUserModal';


injectTapEventPlugin();

describe('UsersTable Component', () => {
  const spyProps = {

    fetchAllUsers: sinon.spy(() => new Promise(() => {})),
    deleteUser: sinon.spy(() => new Promise(() => {})),
    updateUser: sinon.spy(() => new Promise(() => {})),
    searchUsers: sinon.spy(() => new Promise(() => {})),
    user: { username: 'admin', roleId: 1, id: 1 },
    users: [
      {
        id: 2,
        username: 'PepperSoup',
        fullName: 'Pepper Soup',
        email: 'p.soup@nsdms.org',
        roleId: 1
      },
      {
        id: 1,
        username: 'admin',
        fullName: 'Admin Igwe',
        email: 'admin@nsdms.org',
        roleId: 1
      }
    ],
    pagination: {},
  };
  it('should call `fetchAllUsers` on component render', () => {
    const component = shallow(
      <UsersTable
          {...spyProps}
        />
      );

    expect(spyProps.fetchAllUsers.calledOnce).toEqual(true);
    expect(spyProps.fetchAllUsers.callCount).toEqual(1);
  });
  it('should not call `deleteUser` on component render', () => {
    const component = shallow(
      <UsersTable
          {...spyProps}
        />
      );

    expect(spyProps.deleteUser.calledOnce).toEqual(false);
    expect(spyProps.deleteUser.callCount).toEqual(0);
  });
  it('should not call `updateUser` on component render', () => {
    const component = shallow(
      <UsersTable
          {...spyProps}
        />
      );

    expect(spyProps.updateUser.calledOnce).toEqual(false);
    expect(spyProps.updateUser.callCount).toEqual(0);
  });
  it('should not call `searchUsers` on component render', () => {
    const component = shallow(
      <UsersTable
          {...spyProps}
        />
      );

    expect(spyProps.searchUsers.calledOnce).toEqual(false);
    expect(spyProps.searchUsers.callCount).toEqual(0);
  });
  describe('<EditUserModal /> presentation component', () => {
    it('should render with valid props', () => {
      const props = {
        id: 1,
        openEdit: true,
        onCloseOpenEdit: sinon.spy(() => new Promise(() => {}))
      };
      const component = shallow(
        <EditUserModal {...props} />
      );
      expect(component.length).toBe(1);
    });
  });
});
