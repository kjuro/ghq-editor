import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GraphQLEditor, PassedSchema } from 'graphql-editor';
import {pizza, pizzaLibrary} from "./schema"
import './index.css';

export const App = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: pizza,
    libraries: pizzaLibrary,
  });

  let fileHandle: FileSystemFileHandle;

  const openFile = async () => {
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const contents = await file.text();
    //console.log(contents)
    mySchema.code =  contents;
    setMySchema(mySchema)
  }

  const saveFile = async () => {
    writeToFile(fileHandle, mySchema.code)
  };

  async function saveFileAs() {
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
    fileHandle = await window.showSaveFilePicker(options);
    if (fileHandle) {
      saveFile();
    }
  }

  async function writeToFile(fileHandle: FileSystemFileHandle, contents: string) {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function writeURLToFile(fileHandle: FileSystemFileHandle, url: string) {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Make an HTTP request for the contents.
    const response = await fetch(url);
    if (response && response.body) {
      // Stream the response into the file.
      await response.body.pipeTo(writable);
      // pipeTo() closes the destination pipe by default, no need to close it.
    }
  }

  return (
    <div id='page'>
      <div id='header'>
        GraphQL Editor
        <div className='float-right'>
          <button className='open' onClick={() => openFile()}> Open </button>
          <button className='save' onClick={() => saveFile()}> Save</button>
          <button className='save-as' onClick={() => saveFileAs()}> Save as</button>
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
          schema={mySchema} 
          setSchema={function (props: PassedSchema, isInvalid?: boolean | undefined): void {
            setMySchema(props); 
          } }      
        />
      </div>
    </div>
  );
};

const container = document.getElementById('root') as Element;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
