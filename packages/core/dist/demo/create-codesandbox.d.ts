export declare const createChartSandbox: (chartTemplate: any) => string;
export declare const createVanillaChartApp: (demo: any) => {
    'index.html': string;
    'src/index.js': string;
    'package.json': {
        scripts: {
            start: string;
            build: string;
        };
        dependencies: {
            '@carbon/charts': any;
            'carbon-components': any;
            d3: string;
        };
        devDependencies: {
            'parcel-bundler': string;
        };
    };
};
export declare const createReactChartApp: (demo: any) => {
    'src/index.html': string;
    'src/index.js': string;
    'src/ibm-plex-font.css': string;
    'package.json': {
        dependencies: {
            '@carbon/charts': any;
            '@carbon/charts-react': any;
            d3: string;
            react: string;
            'react-dom': string;
            'react-scripts': string;
            'carbon-components': any;
        };
    };
};
export declare const createAngularChartApp: (demo: any) => {
    'src/index.html': string;
    'src/main.ts': string;
    'src/app/app.component.html': string;
    'src/app/app.component.ts': string;
    'src/app/ibm-plex-font.css': string;
    'src/app/app.module.ts': string;
    '.angular-cli.json': string;
    'package.json': string;
};
export declare const createVueChartApp: (demo: any) => {
    'src/components/chart.vue': string;
    'src/ibm-plex-font.css': string;
    'src/App.vue': string;
    'src/main.js': string;
    'package.json': string;
};
export declare const createSvelteChartApp: (demo: any) => {
    'App.svelte': string;
    'index.js': string;
    'package.json': {
        scripts: {
            build: string;
            autobuild: string;
            dev: string;
            start: string;
            'start:dev': string;
        };
        devDependencies: {
            'npm-run-all': string;
            rollup: string;
            'rollup-plugin-commonjs': string;
            'rollup-plugin-node-resolve': string;
            'rollup-plugin-svelte': string;
            'rollup-plugin-terser': string;
            'sirv-cli': string;
        };
        dependencies: {
            '@carbon/charts': any;
            '@carbon/charts-svelte': any;
            'carbon-components': any;
            d3: string;
            svelte: string;
        };
    };
    'rollup.config.js': string;
};
