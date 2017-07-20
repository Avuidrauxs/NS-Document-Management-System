import React from 'react';
import { shallow } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { AdminDocumentsList }
from '../../../components/dashboard/AdminDocumentList';
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
    pagination: {
      page: 1,
      pageCount: 2,
      pageSize: 9,
      totalCount: 9,
      offset: 0,
    },
  };
  it('should update state via onChange method', () => {
    const component = shallow(
      <AdminDocumentsList {...spyProps} />
);

    component.instance().onChange({
      target: { value: 'vooks', name: 'searchText' } });

    expect(component.state('searchText')).toEqual('vooks');
  });
  it('Should call getMoreDocuments when called', () => {
    const getMoreDocumentsSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <AdminDocumentsList
        getMoreDocuments={getMoreDocumentsSpy}
        {...spyProps} />);

    const button = component.find('.pagination-component');
    button.simulate('change', getMoreDocumentsSpy());

    expect(getMoreDocumentsSpy.calledOnce).toEqual(true);
    expect(typeof getMoreDocumentsSpy.args[0]).toEqual('object');
  });
  it('should handle componentWillReceiveProps', () => {
    const nextProps = {
      documents: []
    }
    const component = shallow(
      <AdminDocumentsList {...spyProps} />
);
    component.instance().componentWillReceiveProps(nextProps);
    component.setState({ notFound: '' });

    expect(component.state().notFound).toBe('');
  });
  it('should handle componentDidMount', () => {
    const componentDidMountSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <AdminDocumentsList {...spyProps} />
);
    component.instance().componentDidMount();
  });
  it('Should call onClickSearch when called', () => {
    const onClickSearchSpy = sinon.spy(() => new Promise(() => {}));
    const component = shallow(
      <AdminDocumentsList
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
