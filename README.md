# NixixJS
Nixix JS is JavaScript UI library used for creating beautiful user interfaces.

To get started, type the following in your terminal:
```
npm install nixix
```


## Version 1.0.2:
1. Changed the library name to nixix.

## Version 1.0.3
1. NixixJS now has support for JSX. JSX will be it's primary templating language.
2. NixixJS now has a new rendering function to render dom nodes. To use this, add this in the src/index.js:
``` javascript
  import App from './App.js';
  import render from '../node_modules/nixix/js-lib/render.js';

  render(<App />, document.querySelector('div#root'));
```