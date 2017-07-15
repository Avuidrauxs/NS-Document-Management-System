import React from 'react';
import { shallow, mount, render } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { DocumentCard } from '../../../components/document-editor/DocumentCard';
import { EditDocumentModal } from '../../../components/modals/EditDocumentModal';
import { OpenDocumentModal } from '../../../components/modals/OpenDocumentModal';

injectTapEventPlugin();

describe('Document Card', () => {
  const props = {
    document: { id: 1,
      title: 'my title',
      body: 'great article',
      createdAt: '2017-07-13T00',
      User: { id: 3, username: 'ajudensi' }
    },
    ReadOnly: false,
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
  it('should handle openDocument state change', () => {
    const component = shallow(
      <DocumentCard {...props} />
);

    component.instance().onCloseDocument();

    expect(component.state('openDocument')).toEqual(false);
  });
  it('should handle openEdit state change', () => {
    const component = shallow(
      <DocumentCard {...props} />
);

    component.instance().handleOpenEdit();

    expect(component.state('openEdit')).toEqual(true);
  });
  it('should handle openEdit state change', () => {
    const component = shallow(
      <DocumentCard {...props} />
);

    component.instance().onCloseEdit();

    expect(component.state('openEdit')).toEqual(false);
  });
  it('Should call onDocumentDelete when called', () => {
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
          User: { id: 3, username: 'ajudensi' }
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
      const props = {
        openDocument: true,
        closeDocument: sinon.spy(() => new Promise(() => {})),
        doc: { id: 1,
          title: 'my title',
          body: 'great article',
          User: { id: 3, username: 'ajudensi' }
        },
      };
      const component = shallow(
        <OpenDocumentModal {...props} />
      );
      expect(component.length).toBe(1);
    });
  });
});
