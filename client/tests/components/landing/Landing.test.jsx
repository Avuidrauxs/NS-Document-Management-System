import React from 'react';
import { shallow } from 'enzyme';
import Landing from '../../../components/landing/Landing';

describe('Landing page', () => {
  describe('presentational component <Landing />', () => {
    let component;
    beforeEach(() => {
      component = shallow(
        <Landing />
    );
    });

    it('should render once', () => {
      expect(component.length).toBe(1);
    });
  });
});
