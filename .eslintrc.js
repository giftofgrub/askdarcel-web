module.exports = {
  extends: [
    'airbnb',
  ],
  parser: 'babel-eslint',
  plugins: [
    'react',
    'jsx-a11y',
    'import',
  ],
  env: {
    browser: true,
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': 'webpack',
  },
  rules: {
    'arrow-parens': ['warn', 'as-needed'],
    'camelcase': 'off',
    'import/no-extraneous-dependencies': 'error',
    'import/no-unused-modules': ['error', {
      missingExports: true,
      unusedExports: true,
    }],
    'import/prefer-default-export': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
    'jsx-a11y/label-has-for': ['error', { required: { some: ['nesting', 'id'] } }],
    'no-console': 'warn',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'react/forbid-prop-types': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
  },
  overrides: [
    // Node.js scripts
    {
      files: [
        'webpack.config.js',
      ],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        // The tools and webpack.config.js are entrypoints and don't require
        // exports.
        'import/no-unused-modules': 'off',
        'no-console': 'warn',
      },
      settings: {
        'import/resolver': 'node',
      },
    },
    // .eslintrc.js
    {
      files: [
        '.eslintrc.js',
      ],
      rules: {
        // import/no-unused-modules only detects ES6 exports, so ignore
        // CJS-style imports.
        // https://github.com/benmosher/eslint-plugin-import/issues/1469
        'import/no-unused-modules': 'off',
        // Most ESLint rules names have characters which must be quoted, such as
        // '-' or '/', so it's easier to read if all things under "rules" are
        // consistently quoted.
        'quote-props': ['error', 'consistent-as-needed'],
      },
    },
  ],
};
