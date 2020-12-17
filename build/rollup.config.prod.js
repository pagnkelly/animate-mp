import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import pkg from '../package.json';
const externalDeps = Object.keys(Object.assign({}, pkg.dependencies, pkg.peerDependencies));
const extensions = ['.ts']
const nodeDeps = ['path'];
const babelRuntimeVersion = pkg.dependencies['@babel/runtime'].replace(
  /^[^0-9]*/,
  ''
)

export default [
  // commonjs
  {
    input: 'src/main.ts',
    external: externalDeps.concat(nodeDeps),
    output: [
      { file: pkg.main, format: 'cjs', exports: 'auto' },
    ],
    plugins: [
      nodeResolve({ extensions }),
      typescript({ useTsconfigDeclarationDir: true }),
      babel({
        extensions,
        plugins: [
          ['@babel/plugin-transform-runtime', { version: babelRuntimeVersion }]
        ],
        runtimeHelpers: true
      }),
      filesize()
    ]
  },
  // ES
  {
    input: 'src/main.ts',
    external: externalDeps.concat(nodeDeps),
    output: [
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      nodeResolve({ extensions }),
      typescript({ useTsconfigDeclarationDir: true }),
      babel({
        extensions,
        plugins: [
          ['@babel/plugin-transform-runtime', { version: babelRuntimeVersion, useESModules: true }]
        ],
        runtimeHelpers: true
      }),
      filesize()
    ]
  },
  // ES for Browsers
  {
    input: 'src/main.ts',
    external: externalDeps.concat(nodeDeps),
    output: [
      { file: pkg.module.replace('js', 'mjs'), format: 'es' },
    ],
    plugins: [
      nodeResolve({ extensions }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      typescript({ useTsconfigDeclarationDir: true }),
      babel({
        extensions,
        exclude: 'node_modules/**',
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          arrows: false,
          warnings: false,
        }
      }),
      filesize()
    ]
  },
  // UMD no ugly
  {
    input: 'src/main.ts',
    external: externalDeps.concat(nodeDeps),
    output: [
      { file: pkg.unpkg, format: 'umd', name: 'animate-mp' }
    ],
    plugins: [
      nodeResolve({ extensions }),
      typescript({ useTsconfigDeclarationDir: true }),
      babel({
        extensions,
        exclude: 'node_modules/**',
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      filesize()
    ]
  },
  // UMD
  {
    input: 'src/main.ts',
    external: externalDeps.concat(nodeDeps),
    output: [
      { file: pkg.unpkg.replace('js', 'min.js'), format: 'umd', name: 'animate-mp' }
    ],
    plugins: [
      nodeResolve({ extensions }),
      typescript({ useTsconfigDeclarationDir: true }),
      babel({
        extensions,
        exclude: 'node_modules/**',
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          arrows: false,
          warnings: false,
        }
      }),
      filesize()
    ]
  }
]
