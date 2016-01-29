# react-webpack-boilerplate

## Prerequisites
You must have node and npm installed, then install the webpack development server:

```bash
$ npm install webpack-dev-server -g
```

## Dev build + livereload webserver
```bash
$ npm start
```

## Dev build
```bash
$ npm run build
```

## Prod build
```bash
$ npm run build-prod
```

## Run tests
```bash
$ npm test
```

## Project name/importing from app src root

Importing from your `src/` directory root instead of using a relative path can be done using a fully-qualified path that starts with the same name as the name field in your `package.json`, which is `react-webpack-boilerplate` by default but you should probably change this.

```js
import someFile from 'react-webpack-boilerplate/path/to/file';
// will import from 'src/path/to/file'
```

## Linting

By default, all stage 0 features of JavaScript that are available in Babel are included and linted with a very opinionated profile. If you'd prefer to change the linting settings, you can do so in `.eslintrc`.
