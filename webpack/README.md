# How to run the project

## Install NVM

To install or update nvm, you can use the install script using cURL:

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```

More detail in [NVM Readme](https://github.com/creationix/nvm#install-script)

Then install Node:

```bash
$ nvm install v7.4
$ nvm use v7.4
```

If you want to automatically change Node version when you go to the project directory, follow [this instruction](https://github.com/creationix/nvm#zsh)

## Install Node modules

First, you need to install `yarn`. For more details visit [official guide](https://yarnpkg.com/en/docs/install).

Then go to the project directory and run the following commands:

```bash
$ yarn global add webpack@2.2.0 webpack-dev-server@2.2.0 stylelint stylefmt doiuse
$ yarn install
$ yarn start
```

Visit `http://localhost:4000`

## Run tests

Execute the following command in project directory:

```bash
$ yarn test
```

You should test the following things:
- Action Creators
- Reducers
- Middlewares
- Components and Containers (including snapshot-tests)

## Start project in dev environment

```bash
$ yarn dev
```

## Start project in dev environment with assets built in a production-mode

```bash
$ yarn build-dev
$ yarn start
```

## Docs

- [ES6 Features](https://github.com/lukehoban/es6features)
- [React](https://facebook.github.io/react)
- [React Style Guide](https://github.com/airbnb/javascript/tree/master/react)

### HTML/CSS

- [doiuse](https://github.com/anandthakker/doiuse)
- [postcss](https://github.com/postcss/postcss)
- [postcss-cssnext](http://cssnext.io)
- [postcss-flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes)
- [postcss-assets](https://github.com/assetsjs/postcss-assets#url-resolution)
- [precss](https://github.com/jonathantneal/precss)
- [react-css-modules](https://github.com/gajus/react-css-modules)

### Programming

- [Redux](http://redux.js.org/)
- [Redux Saga](https://github.com/redux-saga/redux-saga)
- [React Router](https://github.com/ReactTraining/react-router/tree/master/docs)
- [Redux Form](http://redux-form.com)
- [Ract Intl](https://github.com/yahoo/react-intl)

### Testing

- [Jest API](https://facebook.github.io/jest/docs/api.html#content)
- [Enzyme API](http://airbnb.io/enzyme/docs/api/index.html)
- [redux-mock-store](http://arnaudbenard.com/redux-mock-store)

### Tools

- [Webpack 2](https://webpack.js.org/configuration)
- [Redux Devtools (browser extension)](https://github.com/zalmoxisus/redux-devtools-extension)
- [React Devtools (browser extension)](https://github.com/facebook/react-devtools)

## TODO

Set up these linters:
- [react/sort-prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md)
- [react/jsx-sort-props](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md)
