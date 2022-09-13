import React, { useState } from 'react';
import { render } from 'react-dom';
import { GraphQLEditor, PassedSchema } from 'graphql-editor';

const schemas = {
  pizza: `
type Query{
	pizzas: [Pizza!]
}
`,
  pizzaLibrary: `
type Pizza{
  name:String;
}
`,
};

export const App = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.pizza,
    libraries: schemas.pizzaLibrary,
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

//         onSchemaChange={(props: React.SetStateAction<PassedSchema>) => { setMySchema(props); }}

render(<App />, document.getElementById('root'));

export default App
