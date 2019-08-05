import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-cpy';
import flow from 'rollup-plugin-flow';
import path from 'path';

// eslint-disable-next-line import/no-dynamic-require
const { makeConfig } = require(path.resolve(__dirname, '../../.babelrc'));

const plugins = ({ targets, distName }) => ([
  flow(),
  babel({
    exclude: 'node_modules/**',
    comments: false,
    ...(makeConfig({ targets })),
  }),
  copy({
    files: ['src/*.flow'],
    dest: distName,
  }),
]);

const external = [];

export default ({
  name = 'unknownPackage',
  input = 'src/index.js',
  exportName = 'index',
  distName = 'dist',
}) => [{
  input,
  output: {
    name,
    file: `${distName}/${exportName}.esm.js`,
    format: 'esm',
    sourcemap: true,
  },
  external,
  plugins: plugins({ targets: { node: '8' }, distName }),
}, {
  input,
  output: {
    name,
    file: `${distName}/${exportName}.js`,
    format: 'cjs',
    sourcemap: true,
  },
  external,
  plugins: plugins({ targets: { node: '6' }, distName }),
}];
