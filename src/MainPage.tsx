import React from "react";
import { GraphQLEditor, PassedSchema } from 'graphql-editor';

interface EditorState extends PassedSchema {
  fileHandle: FileSystemFileHandle | null
};

export class MainPage extends React.Component<{}, EditorState> {
  state: EditorState = {
    code: "",
    libraries: "",
    fileHandle: null
  };

  render() {
    return (
      <div id='page'>
      <div id='header'>
        GraphQL Editor
        <div className='float-right'>
          <button className='new' onClick={() => this.newFile()}> New </button>
          <button className='open' onClick={() => this.openFile()}> Open </button>
          { this.state.fileHandle && this.state.code.length > 0 &&
            <button className='save' onClick={() => this.saveFile()}> Save</button>
          }
          { this.state.code.length > 0 &&
            <button className='save-as' onClick={() => this.saveFileAs()}> Save as</button>
          }
        </div>
      </div>
      <div
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignSelf: 'stretch',
          display: 'flex',
          position: 'relative',
          overflow: 'auto'
        }}
      > 
        <GraphQLEditor
          schema={this.state} 
          setSchema={this.setSchema}
        />
      </div>
    </div>
    );
  }

  setSchema = (props: PassedSchema, isInvalid?: boolean | undefined) => {
    this.setState(() => (props));
  }

  newFile = async () => {   
    //setMySchema({code: "", libraries: ""});
    this.setState(() => ({
      fileHandle: null,
      code: ""
    }));
  }

  openFile = async () => {
    let fileHandle: FileSystemFileHandle
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const contents = await file.text();
    //console.log(contents)
    
    this.setState(() => ({
      fileHandle,
      code: contents
    }));
  }

  saveFile = async () => {
    console.log(this.state.fileHandle)
    if (this.state.fileHandle) {
      this.writeToFile(this.state.fileHandle, this.state.code)
    }
  }

  saveFileAs = async () => {
    const options = {
      suggestedName: 'schema.graphql',
      types: [
        {
          description: 'GraphQL Files',
          accept: {
            'text/plain': ['.graphql'],
          },
        },
      ],
    };
    const fileHandle = await window.showSaveFilePicker(options);
    if (fileHandle) {
      await this.setState(() => ({
        fileHandle,
      }));
      this.saveFile();
    }
  }

  writeToFile = async (fileHandle: FileSystemFileHandle, contents: string) => {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();
  }


}