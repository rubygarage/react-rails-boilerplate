import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import styles from './styles.css';

function AvatarUploader({
  input, name, multiple, handleRemoveSelectedFile, fileDropHandler,
}) {
  const files = input.value;
  return (
    <div>
      <Dropzone
        multiple={multiple}
        name={name}
        accept="image/jpeg, image/png"
        onDrop={fileDropHandler}
      >
        { files && Array.isArray(files)
          ?
            files.map(file => (
              <div className={styles['avatar-preview-wrap']} key={file.name}>
                <img src={file.preview} alt="Uploaded avatar" className={styles['avatar-uploader-thumb']} />
                <button
                  type="button"
                  className={styles['remove-avatar-preview-button']}
                  onClick={handleRemoveSelectedFile}
                >
                  x
                </button>
              </div>
            ))
          :
            <div>Try dropping some files here, or click to select files to upload.</div>
        }
      </Dropzone>
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
