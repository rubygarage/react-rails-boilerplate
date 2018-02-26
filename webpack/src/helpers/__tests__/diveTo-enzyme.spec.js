import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import configureStore from 'redux-mock-store';
import shallowWithIntl from 'helpers/intl-enzyme';
import diveTo from '../diveTo-enzyme';

class MockComponent extends React.Component {
  mockMethod = jest.fn();
  render() {
    return <div>MockComponent</div>;
  }
}

class OtherComponent extends React.Component { // eslint-disable-line
  mockMethod = jest.fn();
  render() {
    return <div>OtherComponent</div>;
  }
}

const WrappedComponent = connect()(injectIntl(MockComponent));

describe('diveTo helper', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();
  const component = shallowWithIntl(<WrappedComponent store={store} />);

  describe('as standalone function', () => {
    const targetWrapper = diveTo(component, MockComponent);
    const targetInstance = targetWrapper.instance();

    it('dives to target component', () => {
      expect(targetInstance).toBeInstanceOf(MockComponent);
    });

    it('throws error if target component is not present', () => {
      expect(() => { diveTo(component, OtherComponent); }).toThrow(Error);
    });

    it('throws error if reached functional component', () => {
      expect(() => { diveTo(component, () => (<div>FunctionalComponent</div>)); }).toThrow(Error);
    });
  });
});
