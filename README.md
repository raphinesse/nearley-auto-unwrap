# nearley-auto-unwrap
Makes rules with one symbol return that symbol's value, instead of an array containing it.

Implementation of kach/nearley#505 as a package.

## Install

```
$ npm install nearley-auto-unwrap
```

## Usage

```js
const {Parser, Grammar} = require('nearley');
const addAutoUnwrap = require('nearley-auto-unwrap');

const grammar = require('./grammar.js');
const autoUnwrapGrammar = addAutoUnwrap(grammar);

const parser = new Parser(Grammar.fromCompiled(autoUnwrapGrammar));
```

In contrast to the proposed feature at kach/nearley#505, `addAutoUnwrap` transforms a compiled grammar and thyu does not support the `@autoUnwrap` option. Instead, you can exclude rules from processing by providing an exclude function as an additional option:

```js
const autoUnwrapGrammar = addAutoUnwrap(grammar, {
    exclude: rule => rule.name.startsWith('foo_')
});
```