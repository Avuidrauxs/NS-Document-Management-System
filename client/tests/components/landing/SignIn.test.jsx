import React from 'react';
import { shallow, mount } from 'enzyme';
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
    const props = {
      postLogin: sinon.spy(() => new Promise(() => {})),
      postSignUp: sinon.spy(() => new Promise(() => {})),
    };
    it('should render once with props', () => {
      const component = shallow(<SignIn />);
      expect(component.length).toEqual(1);
    });
    it('should update state via onChange method', () => {

      const component = mount(
        <SignIn {...props} />
  );

      component.instance().onChange({
        target: { value: 'Pastor', name: 'username' } });
      component.instance().onChange({
        target: { value: 'louis', name: 'password' } });

      expect(component.state('username')).toEqual('Pastor');
      expect(component.state('password')).toEqual('louis');
    });
    it('should open Sign Up modal when user clicks on register', () => {
      const handleOpenSpy = sinon.spy(() => new Promise(() => {}));
      const component = shallow(
        <SignIn
          handleOpen={handleOpenSpy}
            {...props}
          />
        );
        const button = component.find('p');
        button.simulate('click', handleOpenSpy(1));
        component.instance().handleOpen();
        component.setState({
          open: true,
        })
        expect(component.state().open).toBe(true);
      expect(handleOpenSpy.calledOnce).toEqual(true);
      expect(handleOpenSpy.callCount).toEqual(1);
    });
    it('should close Sign Up modal when users clicks on close', () => {
      const component = shallow(
        <SignIn
            {...props}
          />
        );
        component.instance().handleClose();
        component.setState({
          open: false,
        })
        expect(component.state().open).toBe(false);

    });
    it('should compare passwords before submitting the user sign uo form',
    () => {
      const comparePasswordSpy = sinon.spy(() => new Promise(() => {}));
      const component = shallow(
        <SignIn
          comparePassword={comparePasswordSpy}
          {...props}
          />);

      // const button = component.find('input[type="text"]');
      //
      // button.simulate('change', comparePasswordSpy());
      component.instance().comparePassword();
      component.instance().alertWrongPassword();

      expect(comparePasswordSpy.calledOnce).toEqual(false);
      // expect(typeof comparePasswordSpy.args[0]).toEqual('object');

    });
    it('should sign the user in when user enters correct credentials', () => {
      const onSignInSubmitSpy = sinon.spy(() => new Promise(() => {}));
      const component = mount(<SignIn
        onSignInSubmit={onSignInSubmitSpy}
        {...props}
        />);

      const button = component.find('.signInForm');
      component.instance().onSignInSubmit({ preventDefault: () => {} });
      button.simulate('submit', onSignInSubmitSpy());


      expect(onSignInSubmitSpy.calledOnce).toEqual(true);
      expect(typeof onSignInSubmitSpy.args[0]).toEqual('object');
    });
    it('should submit user information from sign up form', () => {
      const onSignUpSubmitSpy = sinon.spy(() => new Promise(() => {}));
      const component = mount(<SignIn
        onSignUpSubmit={onSignUpSubmitSpy}
        {...props}
        />);

      const button = component.find('button[type="submit"]');
      component.instance().onSignUpSubmit({ preventDefault: () => {} });
      button.simulate('submit', onSignUpSubmitSpy());


      expect(onSignUpSubmitSpy.calledOnce).toEqual(true);
      expect(typeof onSignUpSubmitSpy.args[0]).toEqual('object');
    });
    it('should sign in user when user clicks log in button', () => {
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
    });
  });
});
