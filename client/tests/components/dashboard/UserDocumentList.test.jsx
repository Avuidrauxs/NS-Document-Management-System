import React from 'react';
import { shallow, mount, render } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { UserDocumentsList } from '../../../components/dashboard/UserDocumentList';
import { DocumentCard } from '../../../components/document-editor/DocumentCard';

injectTapEventPlugin();

describe('UserDocumentsList Component', () => {
  const spyProps = {

    fetchUserDocuments: sinon.spy(() => new Promise(() => {})),
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
  it('should call `fetchUserDocuments` on component render', () => {
    const component = shallow(
      <UserDocumentsList
          {...spyProps}
        />
      );

    expect(spyProps.fetchUserDocuments.calledOnce).toEqual(true);
    expect(spyProps.fetchUserDocuments.callCount).toEqual(1);
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
