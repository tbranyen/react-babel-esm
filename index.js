import './env.js';
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [ count, setCount ] = React.useState(0);

  return <>
    <div>Hello world, button clicked {count} times.</div>
    <button onClick={() => setCount(count + 1)} children="Click" />
  </>;
}

ReactDOM.render(<App />, document.body);
