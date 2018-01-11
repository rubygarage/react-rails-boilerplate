import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
// import fileUpload from 'actions/fileUpload'

class FileUpload extends Component {
  constructor() {
    super()
    this.state = { files: [] }
  }

  onDrop(files) {
    // eslint-disable-next-line no-console
    console.log('files',files)
    this.setState({
      files
    });



    let formData = new FormData();
    formData.append('file', files[0]);

    fetch('http://localhost/api/upload', {
      method: 'POST',
      body: formData
    })
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}

export default FileUpload
