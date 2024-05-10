module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  // parserOptions: {
  //   parser: '@babel/eslint-parser',
  //   // parser: 'babel-eslint',
  //   requireConfigFile: false,
  //   ecmaVersion: 5, // ES的版本，默认为5
  //   sourceType: 'module', // 指定源代码存在的位置，script | module，默认为script。
  // },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.json'],
      },
    },
  },
  globals: {
    defineEmits: 'readonly',
    defineProps: 'readonly',
    defineExpose: 'readonly',
  },
  rules: {
    // 生产环境不允许存在 console、debugger，开发环境进行警告
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    // 只存在一个export的时候，可以不用export default
    'import/prefer-default-export': 'off',
    'consistent-return': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'linebreak-style': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'max-len': 'off',
    // 'max-len': ['error', { code: 150 }],
    // 生产环境用到的包才需要安装到 dependencies 位置
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        'test/**', // tape, common npm pattern
        'tests/**', // also common npm pattern
        'spec/**', // mocha, rspec-like pattern
        '**/__tests__/**', // jest pattern
        '**/__mocks__/**', // jest pattern
        'test.{js,jsx}', // repos with a single test file
        'test-*.{js,jsx}', // repos with multiple top-level test files
        '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
        '**/jest.config.js', // jest config
        '**/jest.setup.js', // jest setup
        '**/vue.config.js', // vue-cli config
        '**/webpack.config.js', // webpack config
        '**/webpack.config.*.js', // webpack config
        '**/rollup.config.js', // rollup config
        '**/rollup.config.*.js', // rollup config
        '**/gulpfile.js', // gulp config
        '**/gulpfile.*.js', // gulp config
        '**/Gruntfile{,.js}', // grunt config
        '**/.eslintrc.js', // eslint config
        '**/vite.config.js', // vite conig
      ],
      optionalDependencies: false,
    }],

    // Vue 组件格式相关配置
    // 单行每行最多两个属性，多行每行最多一个属性
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: 1,
    }],
    // 组件 name 值可以不是组合单词，但是命名一定要注意语义，并且不能是 HTML 标签
    'vue/multi-word-component-names': 'off',
  },
};
