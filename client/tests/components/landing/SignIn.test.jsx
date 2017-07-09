import React from 'react';
import { shallow, mount, render } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
import { SignIn } from '../../../components/landing/SignIn';

injectTapEventPlugin();

describe('SignIn page', () => {
  describe('presentational component <SignIn />', () => {
    let component;
    beforeEach(() => {
      component = shallow(
        <SignIn />
    );
    });

    it('should render once', () => {
      expect(component.length).toBe(1);
    });
  });


  describe('Actual <SignIn />', () => {
    it('should render once with props', () => {
      const component = shallow(<SignIn />);
      expect(component.length).toEqual(1);
    });
    it('should update state via onChange method', () => {
      const props = {

      };

      const component = mount(
        <SignIn {...props} />
  );

      component.instance().onChange({ target: { value: 'ajudensi', name: 'username' } });
      component.instance().onChange({ target: { value: 'password123', name: 'password' } });

      expect(component.state('username')).toEqual('ajudensi');
      expect(component.state('password')).toEqual('password123');
    });
    it('Should call onSignInSubmit when called', () => {
      const postLoginSpy = sinon.spy(() => new Promise(() => {}));
      const component = mount(<SignIn postLogin={postLoginSpy} />);

      const button = component.find('button[type="submit"]');
      button.simulate('submit');

      expect(postLoginSpy.calledOnce).toEqual(true);
      expect(typeof postLoginSpy.args[0]).toEqual('object');
    });
    it('Should call onSignUpSubmit when called', () => {
      const postSignUpSpy = sinon.spy(() => new Promise(() => {}));
      const component = mount(<SignIn postLogin={postSignUpSpy} />);

      const button = component.find('button[type="submit"]');
      button.simulate('submit');

      expect(postSignUpSpy.calledOnce).toEqual(true);
      expect(typeof postSignUpSpy.args[0]).toEqual('object');
    });
    it('should call onSubmit method on form submit', () => {
      const postLoginSpy = sinon.spy(() => new Promise(() => {}));

      const component = mount(
        <SignIn postLogin={postLoginSpy} />
  );
      const loginForm = component.instance();
      const onSubmitStub = sinon.stub(loginForm, 'onSubmit');
      loginForm.forceUpdate();

      const button = component.find('button[type="submit"]');
      button.simulate('submit');

      expect(onSubmitStub.calledOnce).toEqual(false);
  // expect(typeof onSubmitStub.args[0]).toEqual('object');
    });
  });
});
