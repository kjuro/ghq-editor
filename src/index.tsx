import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GraphQLEditor, PassedSchema } from 'graphql-editor';
import {pizza, pizzaLibrary} from "./schema"

export const App = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: pizza,
    libraries: pizzaLibrary,
  });
  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'relative',
      }}
    >
      <GraphQLEditor
        schema={mySchema} 
        setSchema={function (props: PassedSchema, isInvalid?: boolean | undefined): void {
          setMySchema(props); 
        } }      
      />
    </div>
  );
};

const container = document.getElementById('root') as Element;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
