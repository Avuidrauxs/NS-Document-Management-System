import React from 'react';
import { shallow } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { DocumentEditor } from
'../../../components/document-editor/DocumentEditor';

injectTapEventPlugin();

describe('Document Editor', () => {
  const spyProps = {
    saveDocument: sinon.spy(() => new Promise(() => {})),
    error: { message: 'Error' },
  };
  it('should render with props', () => {
    expect(
      shallow(
        <DocumentEditor />
      ).length
    ).toBe(1);
  });
  it('should call `saveDocument` on component render', () => {
      const onDocumentSaveSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <DocumentEditor
        onDocumentSave={onDocumentSaveSpy}
          {...spyProps}
        />
      );
      const button = component.find('RaisedButton');
      button.simulate('click', onDocumentSaveSpy());
      component.instance().onDocumentSave()

    expect(onDocumentSaveSpy.calledOnce).toEqual(true);
    expect(onDocumentSaveSpy.callCount).toEqual(1);
  });
  it('should update state via onChange method', () => {
    const component = shallow(
      <DocumentEditor {...spyProps} />
);

    component.instance().onChange('<p>Vape</p>');

    expect(component.state('editorHtml')).toEqual('<p>Vape</p>');
  });
  it('should update state via handleChange method', () => {
    const component = shallow(
      <DocumentEditor {...spyProps} />
);

    component.instance().handleChange({
      target: { value: 'Poof', name: 'title' } });

    expect(component.state('title')).toEqual('Poof');
  });
  it('should handle checkbox change', () => {
    const component = shallow(
      <DocumentEditor {...spyProps} />
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
      <DocumentEditor {...spyProps} />
);
    component.instance().handleRoleChecked();
    component.setState({
      roleChecked: true,
      access: 'role' });

    expect(component.state().access).toBe('role');
    expect(component.state().roleChecked).toBe(true);
  });
  it('should handle Mouse In hover change', () => {
    const component = shallow(
      <DocumentEditor {...spyProps} />
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
      <DocumentEditor {...spyProps} />
);
    component.instance().handleMouseOut();
    component.setState({
      hoverText: '' });

    expect(component.state().hoverText).toBe('');
  });
});
