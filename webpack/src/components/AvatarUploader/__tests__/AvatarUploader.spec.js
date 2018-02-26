import React from 'react';
import { shallow } from 'enzyme';
import AvatarUploader from 'components/AvatarUploader';

describe('Show user', () => {
  let props = {
    input: {
      value: '',
      onChange: jest.fn(),
    },
    handleRemoveSelectedFile: jest.fn(),
    fileDropHandler: jest.fn(),
    multiple: false,
    name: 'avatar',
  };

  it('renders no preview when no file is selected', () => {
    const component = shallow(<AvatarUploader {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('renders preview when file is selected', () => {
    props = {
      ...props,
      input: {
        value: [
          {
            name: 'filename',
            preview: 'filepreview.jpg',
          },
        ],
      },
    };
    const component = shallow(<AvatarUploader {...props} />);

    expect(component).toMatchSnapshot();
  });
});
