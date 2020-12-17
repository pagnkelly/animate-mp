import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import replace from '@rollup/plugin-replace';
import pkg from '../package.json';
const externalDeps = Object.keys(Object.assign({}, pkg.dependencies, pkg.peerDependencies));
const extensions = ['.ts']
const nodeDeps = ['path'];
const babelRuntimeVersion = pkg.dependencies['@babel/runtime'].replace(
  /^[^0-9]*/,
  ''
)

export default [
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
      })
    ]
  },
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
      })
    ]
  },
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
        'process.env.NODE_ENV': JSON.stringify('development'),
      })
    ]
  }
]
