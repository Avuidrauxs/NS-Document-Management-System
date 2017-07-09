import React from 'react';
import { shallow, mount, render } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { DocumentEditor } from '../../../components/document-editor/DocumentEditor';

injectTapEventPlugin();

describe('Document Editor', () => {
  it('should render with props', () => {
    expect(
      shallow(
        <DocumentEditor />
      ).length
    ).toBe(1);
  });
  it('should not call `saveDocument` on component render', () => {
    const spyProps = {
      saveDocument: sinon.spy(() => new Promise(() => {})),
    };
    const component = shallow(
      <DocumentEditor
          {...spyProps}
        />
      );

    expect(spyProps.saveDocument.calledOnce).toEqual(false);
    expect(spyProps.saveDocument.callCount).toEqual(0);
  });
});
