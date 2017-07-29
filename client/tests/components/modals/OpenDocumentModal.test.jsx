import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { OpenDocumentModal } from
'../../../components/modals/OpenDocumentModal';

const props = {
  openDocument: true,
  closeDocument: sinon.spy(() => new Promise(() => {})),
  doc: { id: 1,
    title: 'my title',
    body: 'great article',
    createdAt: '2017-07-13T00',
    User: { id: 3, username: 'ajudensi' }
  },
};

describe('The container component <OpenDocumentModal />', () => {
  it('should render with props', () => {
    expect(
      shallow(
        <OpenDocumentModal {...props} />
      ).length
    ).toBe(1);
  });
});
