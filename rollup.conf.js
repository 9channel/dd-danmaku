const path = require('path');
const { getRollupPlugins } = require('@gera2ld/plaid');
const userscript = require('rollup-plugin-userscript');
const pkg = require('./package.json');

const DIST = 'dist';
const FILENAME = 'ede';

const bundleOptions = {
    extend: true,
    esModule: false,
};

const postcssOptions = {
    ...require('@gera2ld/plaid/config/postcssrc'),
    inject: true,
    minimize: true,
};
const replaceOptions = {
    _VERSION: pkg.version,
    _AUTHOR: pkg.author,
    _CONTACT: pkg.contact,
    _LICENSE: pkg.license,
    _NAME: pkg.name,
    _DESCRIPTION: pkg.description,
};
const replaceAll = function (input, tarMap) {
    let _t = input;
    for (let k in replaceOptions) {
        _t = _t.replaceAll(k, tarMap[k]);
    }
    return _t;
};
const rollupConfig = [
    {
        input: {
            input: 'src/main.js',
            plugins: [
                ...getRollupPlugins({
                    esm: true,
                    minimize: false,
                    postcss: postcssOptions,
                }),
                userscript(path.resolve('src/meta.js'), (meta) => replaceAll(meta, replaceOptions)),
            ],
        },
        output: {
            format: 'iife',
            file: `${DIST}/${FILENAME}.user.js`,
            ...bundleOptions,
        },
    },
];

rollupConfig.forEach((item) => {
    item.output = {
        indent: false,
        // If set to false, circular dependencies and live bindings for external imports won't work
        externalLiveBindings: true,
        ...item.output,
    };
});

module.exports = rollupConfig.map(({ input, output }) => ({
    ...input,
    output,
}));
