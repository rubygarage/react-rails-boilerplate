import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvatarUploaderComponent from 'components/AvatarUploader';

class AvatarUploader extends Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
      ]),
      onChange: PropTypes.func,
    }),
  };

  fileDropHandler = (accepted) => {
    if (accepted && accepted.length) { this.props.input.onChange(accepted); }
  };

  handleRemoveSelectedFile = () => {
    this.props.input.onChange('');
  };

  render() {
    const props = {
      ...this.props,
      handleRemoveSelectedFile: this.handleRemoveSelectedFile,
      fileDropHandler: this.fileDropHandler,
    };

    return <AvatarUploaderComponent {...props} />;
  }
}

export default AvatarUploader;
