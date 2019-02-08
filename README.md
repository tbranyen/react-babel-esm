# Using React with ESM

> Loads React with native browser ESM resolution and Babel.

This repository shows the minimum configuration necessary to load React and
React DOM directly into the browser without using a bundler. This also loads
the React preset to support JSX.

### Install the dependencies

```
npm install
```

### Start the server

```
npm t
```

```
> react-babel-esm@1.0.0 test /home/tbranyen/git/react-babel-esm
> bserve

Listening at http://127.0.0.1:8000
```

[Visit http://127.0.0.1:8000](http://127.0.0.1:8000)

## Source code

_babel.config.js_

[bserve](https://npmjs.org/bserve) is a Babel http server, which behaves like
[@babel/cli](https://babeljs.io/docs/en/babel-cli), and automatically reads the
_.babelrc_ and _babel.config.js_ files. You would most likely use the latter
since it opts you into _node&lowbar;modules_ parsing, which is used here.

The [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react) preset
is used to handle the defaults required by React applications and supports JSX.

The two required plugins are:

- **babel-plugin-transform-commonjs** Converts CommonJS to ESM.
- **babel-plugin-bare-import-rewrite** Forked to make compatible with the
  CommonJS plugin. Converts bare specifiers to node path resolution.

```js
module.exports = {
  presets: ['@babel/preset-react'],
  plugins: [
    'babel-plugin-transform-commonjs',
    '@tbranyen/babel-plugin-bare-import-rewrite',
  ]
};
```

_index.js_

Unfortunately, React does not export named identifiers, so we are limited to
default imports for React and ReactDOM. Importing _env.js_ allows setting the
`process` global ahead-of-time.

```jsx
import './env.js';
import React from 'react';
import ReactDOM from 'react-dom';

const { main } = window;

function App() {
  const [ count, setCount ] = React.useState(0);

  return <>
    <div>Hello world, button clicked {count} times.</div>
    <button onClick={() => setCount(count + 1)} children="Click" />
  </>;
}

ReactDOM.render(<App />, main);
```

_env.js_

Allows opting into a specific environment.

```js
const env = {
  NODE_ENV: 'development',
};

window.process = { env };
```
