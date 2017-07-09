import React from 'react';
import { shallow, mount, render } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { DocumentCard } from '../../../components/document-editor/DocumentCard';
import { EditDocumentModal } from '../../../components/modals/EditDocumentModal';
import { OpenDocumentModal } from '../../../components/modals/OpenDocumentModal';

injectTapEventPlugin();

describe('Document Card', () => {
  it('should render with props', () => {
    const props = {
      document: { id: 1,
        title: 'my title',
        body: 'great article',
        User: { id: 3, username: 'ajudensi' }
      },
      ReadOnly: true
    };
    expect(
      shallow(
        <DocumentCard {...props} />
      ).length
    ).toBe(1);
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
