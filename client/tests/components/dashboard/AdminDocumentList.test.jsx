import React from 'react';
import { shallow, mount, render } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { AdminDocumentsList } from '../../../components/dashboard/AdminDocumentList';
import { DocumentCard } from '../../../components/document-editor/DocumentCard';

injectTapEventPlugin();

describe('AdminDocumentsList Component', () => {
  const spyProps = {

    fetchDocuments: sinon.spy(() => new Promise(() => {})),
    searchDocuments: sinon.spy(() => new Promise(() => {})),
    user: { username: 'admin', roleId: 1, id: 1 },
    documents: [
      { id: 1,
        title: 'my title',
        body: 'great article',
        User: { id: 3, username: 'ajudensi' }
      },
      { id: 2,
        title: 'random title',
        body: 'great random body',
        User: { id: 2, username: 'SiliconValley' }
      }
    ],
    pagination: {},
  };
  it('should not call `fetchDocuments` on component render', () => {
    const component = shallow(
      <AdminDocumentsList
          {...spyProps}
        />
      );

    expect(spyProps.fetchDocuments.calledOnce).toEqual(false);
    expect(spyProps.fetchDocuments.callCount).toEqual(0);
  });
  describe('<DocumentCard /> presentation component', () => {
    it('should render with valid props', () => {
      const props = {
        document: { id: 1,
          title: 'my title',
          body: 'great article',
          User: { id: 3, username: 'ajudensi' }
        },
        ReadOnly: true
      };
      const component = shallow(
        <DocumentCard {...props} />
      );
      expect(component.length).toBe(1);
    });
  });
});
