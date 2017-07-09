import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import expects from 'expect';


import Main from '../../components/Main';

describe('Main', () => {
  it('should exist', () => {
    expects(Main).toExist();
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Main />, div);
  });
  it('should render a snapshot', () => {
    const tree = renderer.create(<Main />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
