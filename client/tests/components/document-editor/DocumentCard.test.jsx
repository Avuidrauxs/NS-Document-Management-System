import React from 'react';
import { shallow } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { DocumentCard } from
'../../../components/document-editor/DocumentCard';
import { EditDocumentModal } from
'../../../components/modals/EditDocumentModal';
import { OpenDocumentModal } from
'../../../components/modals/OpenDocumentModal';

injectTapEventPlugin();

describe('Document Card', () => {
  const props = {
    document: { id: 1,
      title: 'my title',
      body: 'great article',
      createdAt: '2017-07-13T00',
      User: { id: 3, username: 'Peppersoup' }
    },
    user: { id: 3, username: 'Peppersoup' },
    deleteDocument: sinon.spy(() => new Promise(() => {})),
  };
  it('should render with props', () => {
    expect(
      shallow(
        <DocumentCard {...props} />
      ).length
    ).toBe(1);
  });
  it('should handle openDocument state change', () => {
    const component = shallow(
      <DocumentCard {...props} />
);

    component.instance().handleOpen();

    expect(component.state('openDocument')).toEqual(true);
  });
  it('should open document card when user clicks on open icon button', () => {
    const component = shallow(
      <DocumentCard {...props} />
);

    component.instance().onCloseDocument();

    expect(component.state('openDocument')).toEqual(false);
  });
  it('should allow user to document when user clicks on edit icon button',
  () => {
    const component = shallow(
      <DocumentCard {...props} />
);

    component.instance().handleOpenEdit();

    expect(component.state('openEdit')).toEqual(true);
  });
  it('should close the the edit document modal on click of cancel button',
  () => {
    const component = shallow(
      <DocumentCard {...props} />
);

    component.instance().onCloseEdit();

    expect(component.state('openEdit')).toEqual(false);
  });
  it('should delete the document when user clicks on delete icon button', () => {
    const onDocumentDeleteSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <DocumentCard
        onDocumentDelete={onDocumentDeleteSpy}
        {...props}
        />);

    const button = component.find('IconButton').at(2);
    button.simulate('click', onDocumentDeleteSpy());
    component.instance().onDocumentDelete();

    expect(onDocumentDeleteSpy.calledOnce).toEqual(true);
    expect(typeof onDocumentDeleteSpy.args[0]).toEqual('object');
  });

  describe('<EditDocumentModal /> presentation component', () => {
    it('should render with valid props', () => {
      const props = {
        openEdit: true,
        closeEdit: sinon.spy(() => new Promise(() => {})),
        doc: { id: 1,
          title: 'my title',
          body: 'great article',
          User: { id: 3, username: 'Peppersoup' }
        },
      };
      const component = shallow(
        <EditDocumentModal {...props} />
      );
      expect(component.length).toBe(1);
    });
  });
  describe('<OpenDocumentModal /> presentation component', () => {
    it('should render with valid props', () => {
      const spyProps = {
        openDocument: true,
        closeDocument: sinon.spy(() => new Promise(() => {})),
        doc: { id: 1,
          title: 'my title',
          body: 'great article',
          User: { id: 3, username: 'Peppersoup' }
        },
      };
      const component = shallow(
        <OpenDocumentModal {...spyProps} />
      );
      expect(component.length).toBe(1);
    });
  });
});
