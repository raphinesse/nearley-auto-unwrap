const clone = require('clone');

// A copy of nearley's builtin function `id`
const id = x => x[0];

function autoUnwrap(fn) {
  return fn ? (d, l, r) => fn(id(d), l, r) : id;
}

function isEbnfRule(rule) {
  return /\$(ebnf|string)\$\d+$/.test(rule.name);
}

module.exports = function (grammar, {exclude = () => false} = {}) {
  const autoUnwrapGrammar = clone(grammar, { circular: false });

  autoUnwrapGrammar.ParserRules
    .filter(r => r.symbols.length === 1)
    .filter(r => !isEbnfRule(r))
    .filter(r => !exclude(r))
    .forEach(r => {
      r.postprocess = autoUnwrap(r.postprocess);
    });

  return autoUnwrapGrammar;
};
