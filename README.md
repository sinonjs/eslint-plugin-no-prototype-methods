# eslint-plugin-no-prototype-methods

Disallow direct use of prototype methods of builtins

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-no-prototype-methods`:

```
$ npm install eslint-plugin-no-prototype-methods --save-dev
```


## Usage

Add `no-prototype-methods` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "no-prototype-methods"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "no-prototype-methods/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





