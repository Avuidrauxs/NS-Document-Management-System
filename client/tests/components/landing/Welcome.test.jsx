import React from 'react';
import { shallow } from 'enzyme';
import Welcome from '../../../components/landing/Welcome';

describe('Landing page', () => {
  describe('presentational component <Landing />', () => {
    let component;
    beforeEach(() => {
      component = shallow(
        <Welcome />
    );
    });

    it('should render once', () => {
      expect(component.length).toBe(1);
    });
  });
});
