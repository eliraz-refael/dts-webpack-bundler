const dts = require('dts-bundle');
const path = require('path');
const rimraf = require('rimraf');

module.exports = class DtsBundlePlugin {
	constructor({ libName, typingsDir, outputDir, deleteSource = true }) {
		this.typingsDir = typingsDir;
		this.outputDir = outputDir;
		this.libName = libName;
		this.deleteSource = deleteSource;
	}

	apply(compiler) {
		console.log(this.libName);
		compiler.plugin('emit', (compilation, callback) => {
			compilation.chunks.forEach((chunk) => {
				chunk.forEachModule((module) => {
					if (module.resource) {
						const file = path.parse(module.resource);
						if (file.ext === '.ts' || file.ext === '.tsx') {
							dts.bundle({
								name: this.libName,
								main: `${this.typingsDir}/${file.name}.d.ts`,
								out: `${this.outputDir}/${chunk.name}.d.ts`,
								removeSource: false,
								outputAsModuleFolder: true
							});
						}
					}
				});
			});
			if (this.deleteSource) {
				rimraf(this.typingsDir, callback);
			} else {
				callback();
			}
		});
	}
};