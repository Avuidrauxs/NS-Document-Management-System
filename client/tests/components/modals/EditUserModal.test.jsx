import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {
  EditUserModal
} from '../../../components/modals/EditUserModal';

describe('Edit User Modal', () => {
  let props;
  beforeEach(() => {
    props = {
      id: 1,
      updateUser: sinon.spy(() => new Promise(() => {})),
      openEdit: true,
      onCloseOpenEdit: sinon.spy(() => new Promise(() => {})),
    };
  });

  it('should render with valid props', () => {
    const component = shallow(
      <EditUserModal {...props} />
    );
    expect(component.length).toBe(1);
  });
  it('should update state via onChange method', () => {
    const component = shallow(
      <EditUserModal {...props} />
);

    component.instance().onChange({
      target: { value: '1', name: 'roleId' } });

    expect(component.state('roleId')).toEqual('1');
  });
  it('Should call onUpdateUser when called', () => {
    const onUpdateUserSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <EditUserModal
        onUpdateUser={onUpdateUserSpy}
        {...props}
        />);

    const button = component.find('.updateRole');
    button.simulate('click', onUpdateUserSpy());
    component.instance().onUpdateUser();

    expect(props.updateUser.calledOnce).toEqual(true);
    expect(typeof props.updateUser.args[0]).toEqual('object');

  });
});
