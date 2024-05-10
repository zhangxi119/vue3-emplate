module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-html/vue',
    'stylelint-config-html/html',
  ],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global'],
      },
    ],
  },
  ignoreFiles: [
    'node_modules/**/*',
    'public/**/*',
    'dist/**/*',
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
  ],
};
