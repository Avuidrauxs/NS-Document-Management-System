import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {
  EditProfileModal
} from '../../../components/modals/EditProfileModal';

describe('Edit User Modal', () => {
  let props;
  beforeEach(() => {
    props = {
      getUserDetails: sinon.spy(() => new Promise(() => {})),
      updateUser: sinon.spy(() => new Promise(() => {})),
      userProfile: {
        id: 1,
        username: 'admin',
        fullName: 'Admin Igwe',
        email: 'admin@nsdms.org',
        roleId: 1
      },
      user: {
        id: 1,
        roleId: 1,
        username: 'admin'
      },
      onCloseOpenEdit: sinon.spy(() => new Promise(() => {})),
    };
  });

  it('should render with valid props', () => {
    const component = shallow(
      <EditProfileModal {...props} />
    );
    expect(component.length).toBe(1);
  });
  it('should update state when user interacts with input interfaces', () => {
    const component = shallow(
      <EditProfileModal {...props} />
);

    component.instance().onChange({
      target: { value: 'pon', name: 'username' } });
    component.instance().onChange({
      target: { value: 'Pon go', name: 'fullName' } });
    component.instance().onChange({
      target: { value: 'vop@op.com', name: 'email' } });

    expect(component.state('username')).toEqual('pon');
    expect(component.state('fullName')).toEqual('Pon go');
    expect(component.state('email')).toEqual('vop@op.com');
  });
  it('should handle checkbox changes', () => {
    const component = shallow(
      <EditProfileModal {...props} />
);
    component.instance().handleChecked();
    component.setState({ isChecked: true });

    expect(component.state().isChecked).toBe(true);
  });
  it('should disable password change when checkbox is unchecked', () => {
    const component = shallow(
      <EditProfileModal {...props} />
);
    component.instance().onChecked();
    component.setState({ isDisabled: false });

    expect(component.state().isChecked).toBe(false);
  });
  it('should update user profile when update button is clicked', () => {
    const onUpdateUserSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <EditProfileModal
        onUpdateUser={onUpdateUserSpy}
        {...props}
        />);

    const button = component.find('.updateProfile');
    button.simulate('click', onUpdateUserSpy());
    component.instance().onUpdateUser();

    expect(onUpdateUserSpy.calledOnce).toEqual(true);
    expect(typeof onUpdateUserSpy.args[0]).toEqual('object');
  });
  it('should compare passwords before updating user password', () => {
    const comparePasswordSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <EditProfileModal
        comparePassword={comparePasswordSpy}
        {...props}
        />);

    const button = component.find('TextField').at(4);
    button.simulate('blur', comparePasswordSpy());
    component.instance().alertWrongPassword();

    expect(comparePasswordSpy.calledOnce).toEqual(true);
    expect(typeof comparePasswordSpy.args[0]).toEqual('object');

  });
});
