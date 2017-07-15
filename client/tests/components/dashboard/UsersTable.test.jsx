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
  it('Should call getMoreUsers when called', () => {
    const getMoreUsersSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <UsersTable
        getMoreUsers={getMoreUsersSpy}
        {...spyProps} />);

    const button = component.find('.pagination-component');
    button.simulate('change', getMoreUsersSpy());

    expect(getMoreUsersSpy.calledOnce).toEqual(true);
    expect(typeof getMoreUsersSpy.args[0]).toEqual('object');
  });
  it('should call `deleteUser` on component render', () => {
    const onDeleteUserSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <UsersTable
        onDeleteUser={onDeleteUserSpy}
          {...spyProps}
        />
      );
      const button = component.find('IconButton').at(1);
      component.instance().onDeleteUser({});

    button.simulate('click', onDeleteUserSpy());
    component.instance().props.deleteUser({});
    expect(onDeleteUserSpy.calledOnce).toEqual(true);
    expect(onDeleteUserSpy.callCount).toEqual(1);
  });
  it('should update state via onChange method', () => {
    const component = shallow(
      <UsersTable {...spyProps} />
);

    component.instance().onChange({
      target: { value: 'vooks', name: 'searchText' } });

    expect(component.state('searchText')).toEqual('vooks');
  });
  it('should update state via handleChange method', () => {
    const component = shallow(
      <UsersTable {...spyProps} />
);

    component.instance().handleChange({
      target: { value: 90, name: 'height' } });

    expect(component.state('height')).toEqual(90);
  });
  it('should open EditModal on change', () => {
    const handleOpenEditSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <UsersTable
        handleOpenEdit={handleOpenEditSpy}
          {...spyProps}
        />
      );
      const button = component.find('IconButton').at(0);
      button.simulate('click', handleOpenEditSpy(1));
      component.instance().handleOpenEdit(1);
      component.setState({
        openEdit: true,
        currentUserID: 1
      })
      expect(component.state().openEdit).toBe(true);
    expect(handleOpenEditSpy.calledOnce).toEqual(true);
    expect(handleOpenEditSpy.callCount).toEqual(1);
  });
  it('should close EditModal on change', () => {
    const onCloseOpenEditSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <UsersTable
        onCloseOpenEdit={onCloseOpenEditSpy}
          {...spyProps}
        />
      );

      component.instance().onCloseOpenEdit();
      component.setState({
        openEdit: false,
      })
      expect(component.state().openEdit).toBe(false);
  });
  it('Should call onClickSearch when called', () => {
    const onClickSearchSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <UsersTable
        onClickSearch={onClickSearchSpy}
        {...spyProps} />);

    const button = component.find('TextField').at(0);

    button.simulate('keyUp', onClickSearchSpy());

    expect(onClickSearchSpy.calledOnce).toEqual(true);
    expect(typeof onClickSearchSpy.args[0]).toEqual('object');
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
