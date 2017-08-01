import React from 'react';
import { shallow } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { UserDocumentsList } from
'../../../components/dashboard/UserDocumentList';
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
        createdAt: '2017-07-13T00',
        User: { id: 3, username: 'audax' }
      },
      { id: 2,
        title: 'random title',
        body: 'great random body',
        createdAt: '2017-07-13T00',
        User: { id: 2, username: 'SiliconValley' }
      }
    ],
    pagination: {},
  };
  it('should populate all documents onto the dashboard when component loads',
  () => {
    const component = shallow(
      <UserDocumentsList
          {...spyProps}
        />
      );

    expect(spyProps.fetchUserDocuments.calledOnce).toEqual(true);
    expect(spyProps.fetchUserDocuments.callCount).toEqual(1);
  });
  it('should update state when it is changed from the interface', () => {
    const component = shallow(
      <UserDocumentsList {...spyProps} />
);

    component.instance().onChange({
      target: { value: 'vooks', name: 'searchText' } });

    expect(component.state('searchText')).toEqual('vooks');
  });
  it('should fetch more documents when user clicks on pagination controls',
  () => {
    const event = {
      target: {
        id: 'id'
      }
    };
    const component = shallow(
      <UserDocumentsList
        {...spyProps} />);
    const handleClick = component.instance();
    const handleClickSpy = sinon.stub(handleClick, 'onChange');
    handleClick.forceUpdate();
    const button = component.find('.pagination-component');
    button.simulate('change', event);


    expect(handleClickSpy.calledOnce).toEqual(false);
  });
  describe('<DocumentCard /> presentation component', () => {
    it('should render with valid props', () => {
      const props = {
        document: { id: 1,
          title: 'my title',
          body: 'great article',
          createdAt: '2017-07-13T00',
          authorId: 3,
          User: { id: 3, username: 'Peppersoup' }
        },
        user: { id: 3, username: 'Peppersoup' }
      };
      const component = shallow(
        <DocumentCard {...props} />
      );
      expect(component.length).toBe(1);
    });
  });
});
