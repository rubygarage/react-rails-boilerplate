import React from 'react';
import AvatarUploaderContainer from 'containers/AvatarUploader';
import { shallow } from 'enzyme';

describe('UserEdit container', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    input: {
      onChange: mockOnChange,
    },
  };

  const container = shallow(<AvatarUploaderContainer {...defaultProps} />);

  it('renders AvatarUploader component', () => {
    expect(container).toMatchSnapshot();
  });

  it('passes acepted file to input.onChange on drop', () => {
    const accepted = ['acceptedFile'];
    container.props().fileDropHandler(accepted);
    expect(mockOnChange.mock.calls[0][0]).toEqual(accepted);
  });

  it('passes empty string to input.onChange on drop', () => {
    container.props().handleRemoveSelectedFile();
    expect(mockOnChange.mock.calls[1][0]).toEqual('');
  });
});
