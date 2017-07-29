import React from 'react';
import { shallow } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { DocumentsList } from '../../../components/dashboard/DocumentList';
import { DocumentCard } from '../../../components/document-editor/DocumentCard';

injectTapEventPlugin();

describe('DocumentsList Component', () => {
  const spyProps = {

    fetchDocuments: sinon.spy(() => new Promise(() => {})),
    searchDocuments: sinon.spy(() => new Promise(() => {})),
    user: { username: 'admin', roleId: 1, id: 1 },
    documents: [
      { id: 1,
        title: 'my title',
        body: 'great article',
        createdAt: '2017-07-13T00',
        User: { id: 3, username: 'ajudensi' }
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
  it('should call `fetchDocuments` on component render', () => {
    const component = shallow(
      <DocumentsList
          {...spyProps}
        />
      );

    expect(spyProps.fetchDocuments.calledOnce).toEqual(true);
    expect(spyProps.fetchDocuments.callCount).toEqual(1);
  });
  it('should update state via onChange method', () => {
    const component = shallow(
      <DocumentsList {...spyProps} />
);

    component.instance().onChange({
      target: { value: 'vooks', name: 'searchText' } });

    expect(component.state('searchText')).toEqual('vooks');
  });
  it('should call getMoreDocuments when called', () => {
    const getMoreDocumentsSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <DocumentsList
        getMoreDocuments={getMoreDocumentsSpy}
        {...spyProps} />);

    const button = component.find('.pagination-component');
    button.simulate('change', getMoreDocumentsSpy());

    expect(getMoreDocumentsSpy.calledOnce).toEqual(true);
    expect(typeof getMoreDocumentsSpy.args[0]).toEqual('object');
  });
  it('should call onClickSearch when called', () => {
    const onClickSearchSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <DocumentsList
        onClickSearch={onClickSearchSpy}
        {...spyProps} />);

    const button = component.find('.search-field');

    button.simulate('keyUp', onClickSearchSpy());

    expect(onClickSearchSpy.calledOnce).toEqual(true);
    expect(typeof onClickSearchSpy.args[0]).toEqual('object');
  });
  describe('<DocumentCard /> presentation component', () => {
    it('should render with valid props', () => {
      const props = {
        document: { id: 1,
          title: 'my title',
          body: 'great article',
          createdAt: '2017-07-13T00',
          authorId: 3,
          User: { id: 3, username: 'ajudensi' }
        },
        user: { id: 3, username: 'ajudensi' }
      };
      const component = shallow(
        <DocumentCard {...props} />
      );
      expect(component.length).toBe(1);
    });
  });
});
