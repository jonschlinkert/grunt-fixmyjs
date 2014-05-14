# grunt-fixmyjs

> Automatically fix silly lint errors.

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-fixmyjs --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-fixmyjs');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## The "fixmyjs" task

### Overview
In your project's Gruntfile, add a section named `fixmyjs` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  fixmyjs: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  };
});
```

### Options

#### config
Type: `Object`
Default value: `.jshintrc`

Load your own config file.

#### diff
Type: `Boolean`
Default value: `False`

Similar to dry-run

#### legacy
Type: `Boolean`
Default value: `False`

Use legacy fixmyjs

#### indentpref
Type: `String`
Default value: `spaces`
Options: `tabs|spaces`

Your indentation preference

#### patch
Type: `Boolean`
Default value: `False`

Output a patch file to stdout

#### dry
Type: `Boolean`
Default value: `False`

Performs a dry-run and shows you a diff

#### silent
Type: `Boolean`
Default value: `False`

A useless option.

## Currently supports

* `asi` Missing semicolons.
* `camelcase|snakecase` Enforces camelCase and snake_case convention.
* `curly` Adds curly braces to statements.
* `debugger` Removes debugger statements
* `plusplus` Converts plusplus and minusminus.
* `quotmark` Enforces single and double quote style.
* Adds parenthesis when invoking a constructor
* Adds the radix parameter to parseInt
* Convert to use array literal and object literal
* Dot notation conversion
* Extra trailing commas
* Leading and trailing zeroes on decimals.
* Missing whitespaces.
* Mixed spaces/tabs
* Proper indentation
* Removes deletion of variables
* Removes `undefined` when assigning to variables
* Removes unnecessary semicolons
* Uses isNaN function rather than comparing to NaN

### Usage Examples

```js
grunt.initConfig({
  fixmyjs: {
    options: {
      jshintrc: '.jshintrc',
      indentpref: 'spaces'
    },
    test: {
      files: [
        {expand: true, cwd: 'test/fixtures', src: ['**/*.js'], dest: 'test/actual/', ext: '.js'}
      ]
    }
  }
});
```

## Related projects

* [grunt-prettify](https://github.com/jonschlinkert/grunt-prettify)
* [grunt-refactor](https://github.com/jonschlinkert/grunt-refactor)
* [grunt-js2coffee](https://github.com/jonschlinkert/grunt-js2coffee)


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][].


## Author

* [Jon Schlinkert](https://github.com/jonschlinkert)


## Release History

 * 2013-08-17   v0.1.0   First commit.
