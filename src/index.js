const Promise    = require('bluebird'),
      fsNative   = require('fs'),
      path       = require('path'),
      prettier   = require('prettier'),
      BaseWriter = require('@resource-sentry/utils/lib/base-writer'),
      Logger     = require('@resource-sentry/utils/lib/logger');

const CodeGenerator = require('./code-generator'),
      Constants     = require('./model/constants');

const fs = Promise.promisifyAll(fsNative);

class Es2015Writer extends BaseWriter {
    constructor(config) {
        super();
        this.logger = Logger(this.constructor.name);
        this.config = config;
        this.outputPath = null;
        this.writing = false;
        this.template = null;
    }

    getTemplate() {
        if (this.template === null) {
            return fs
                .readFileAsync(path.resolve(__dirname, '../output.tpl'), 'utf8')
                .then(data => {
                    this.logger.verbose('Resource template is loaded.');
                    this.template = data;
                });
        }
    }

    init() {
        return Promise
            .resolve()
            .then(() => {
                this.outputPath = path.resolve(process.cwd(), this.config.path, 'rs.js');
                return this.getTemplate();
            });
    }

    isWriting() {
        return this.writing;
    }

    write(content) {
        return Promise
            .resolve()
            .then(() => {
                this.writing = true;
                return this.template;
            })
            .then(template => {
                return template
                    .replace('%CATEGORY_SIZE%', Constants.CATEGORY_SIZE)
                    .replace('%RESOURCE_SIZE%', Constants.RESOURCE_SIZE);
            })
            .then(template => {
                let generator = new CodeGenerator(content);
                return template
                    .replace('%KEYS%', generator.getKeys())
                    .replace('%DATA%', generator.getData());
            })
            .then(template => {
                return prettier.format(template, {
                    bracketSpacing: false,
                    singleQuote   : true
                });
            })
            .then(data => fs.writeFileAsync(this.outputPath, data, {encoding: 'utf8'}))
            .then(() => {
                this.writing = false;
            });
    }
}

module.exports = Es2015Writer;
