import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Button from 'components/ui/Button';

function AvatarUploader({
  input, name, multiple, handleRemoveSelectedFile, fileDropHandler,
}) {
  const files = input.value;
  // TODO: put preview inside dropzone
  return (
    <div>
      <Dropzone
        multiple={multiple}
        name={name}
        accept="image/jpeg, image/png"
        onDrop={fileDropHandler}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      <ul>
        { files && Array.isArray(files) &&
          files.map(file => (
            <li key={file.name}>
              {file.name}
              <img src={file.preview} alt="Uploaded avatar" className="avatarUploaderThumb" />
              <Button
                type="button"
                className="btn btn-primary mb-3"
                onClick={() => { handleRemoveSelectedFile(file); }}
              >
                Remove file
              </Button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

AvatarUploader.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    onChange: PropTypes.func,
  }),
  handleRemoveSelectedFile: PropTypes.func.isRequired,
  fileDropHandler: PropTypes.func,
  multiple: PropTypes.bool,
  name: PropTypes.string,
};

export default AvatarUploader;
