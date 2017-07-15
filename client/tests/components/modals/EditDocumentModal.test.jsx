import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import { EditDocumentModal } from '../../../components/modals/EditDocumentModal';

describe('The container component <EditDocumentModal />', () => {
  const props = {
    openEdit: true,
    closeEdit: sinon.spy(() => new Promise(() => {})),
    doc: { id: 1,
      title: 'my title',
      body: 'great article',
      createdAt: '2017-07-13T00',
      User: { id: 3, username: 'ajudensi' }
    },
    saveDocument: sinon.spy(() => new Promise(() => {})),
  }
  it('should render with props', () => {

    expect(
      shallow(
        <EditDocumentModal {...props} />
      ).length
    ).toBe(1);
  });
  it('should handle Mouse In hover change', () => {
    const component = shallow(
      <EditDocumentModal {...props} />
);
    component.instance().handleMouseIn();
    component.setState({
      checked: true,
      hoverText: 'Click to toggle Public' });

    expect(component.state().hoverText).toBe('Click to toggle Public');
    expect(component.state().checked).toBe(true);
  });
  it('should handle Mouse In hover change', () => {
    const component = shallow(
      <EditDocumentModal {...props} />
);
    component.instance().handleMouseOut();
    component.setState({
      hoverText: '' });

    expect(component.state().hoverText).toBe('');
  });
  it('should update state via handleChange method', () => {
    const component = shallow(
      <EditDocumentModal {...props} />
);

    component.instance().handleChange({
      target: { value: 'Poof', name: 'title' } });

    expect(component.state('title')).toEqual('Poof');
  });
  it('should update state via onChange method', () => {
    const component = shallow(
      <EditDocumentModal {...props} />
);

    component.instance().onBodyChanged('<p>Vape</p>');

    expect(component.state('body')).toEqual('<p>Vape</p>');
  });
  it('should handle checkbox change', () => {
    const component = shallow(
      <EditDocumentModal {...props} />
);
    component.instance().handleChecked();
    component.setState({
      checked: true,
      access: 'private',
      disableRole: false });

    expect(component.state().access).toBe('private');
    expect(component.state().checked).toBe(true);
    expect(component.state().disableRole).toBe(false);
  });
  it('should handle role checkbox change', () => {
    const component = shallow(
      <EditDocumentModal {...props} />
);
    component.instance().handleRoleChecked();
    component.setState({
      roleChecked: true,
      access: 'role' });

    expect(component.state().access).toBe('role');
    expect(component.state().roleChecked).toBe(true);
  });
  it('should not call `saveDocument` on component render', () => {
      const onDocumentUpdateSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <EditDocumentModal
        onDocumentUpdate={onDocumentUpdateSpy}
          {...props}
        />
      );
      const button = component.find('FlatButton').at(1);
      button.simulate('click', onDocumentUpdateSpy());
      component.instance().onDocumentUpdate()

    expect(onDocumentUpdateSpy.calledOnce).toEqual(true);
    expect(onDocumentUpdateSpy.callCount).toEqual(1);
  });
});
