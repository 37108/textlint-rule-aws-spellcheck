# textlint-rule-aws-spellcheck
[![npm version](https://badge.fury.io/js/textlint-rule-aws-spellcheck.svg)](https://badge.fury.io/js/textlint-rule-aws-spellcheck)


## Install

Install with [npm](https://www.npmjs.com/):

```
$ npm install textlint-rule-aws-spellcheck
```

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "aws-spellcheck": true
    }
}
```

Via CLI

```
$ textlint --rule aws-spellcheck README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

```
$ npm run build
```

### Tests
Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester "textlint-tester").

```
$ npm test
```

## Contribution
Fork this repo and make Pull Request.  

If you want to change or add new rules, check [aws-word-rules](https://github.com/37108/aws-word-rules) repo !!

## License
MIT
