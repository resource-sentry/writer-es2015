const Categories    = require('@resource-sentry/utils/lib/categories'),
      CategoryNames = require('@resource-sentry/utils/lib/category-names'),
      Constants     = require('./model/constants');

class CodeGenerator {
    constructor(categories) {
        let categoriesData = categories.slice();
        // Remove Languages from the categories list for flat keys/value structure
        categoriesData.splice(Categories.LANGUAGE, 1);
        this.languages = categories[Categories.LANGUAGE] || [];
        this.categories = categoriesData.map((values, category) => this.getKeyCodes(values, category));
    }

    convertVariableName(name) {
        return name
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/-/g, '_')
            .toUpperCase();
    }

    convertVariableValue(data, category) {
        switch (category) {
            case Categories.VALUE:
            case Categories.DIMENSION:
                return parseFloat(data);
            case Categories.COLOR:
                return parseInt(data, 16);
            default:
                return data;
        }
    }

    getCategories() {
        return this.categories;
    }

    getData() {
        let properties;
        let output = [];

        this.getCategories().forEach((category, code) => {
            properties = category.map(({id, value}) => `'${id}':${JSON.stringify(value)}`);
            output.push(`// ${CategoryNames[code]}`);
            output.push(`data[${code}] = {${properties}};`);
        });

        return output.join('\n');
    }

    getKeyCodes(values, category) {
        let name, fullId, id, value, valueDescription;
        let i = 0, len = values.length;
        let result = [];

        for (i; i < len; ++i) {
            valueDescription = values[i];
            fullId = (category << Constants.RESOURCE_SIZE) + i;
            id = i;
            name = this.convertVariableName(valueDescription.name);
            value = this.convertVariableValue(valueDescription.value, category);
            result.push({name, fullId, id, value});
        }

        // Sort key-code pairs by name
        result.sort((left, right) => {
            return left.name.localeCompare(right.name);
        });

        return result;
    }

    getKeys() {
        let properties;
        let output = [];

        this.getCategories().forEach((category, code) => {
            properties = category.map(({name, fullId}) => `${name}:${fullId}`);
            output.push(`export let ${CategoryNames[code]} = {${properties}};`);
        });

        return output.join('\n');
    }

    getLanguages() {
        return this.languages;
    }

    getLanguageTagVocabulary() {
        let vocabulary = {};
        let cursor = 0;

        this.getLanguages().forEach(({name}) => {
            vocabulary[name] = cursor++;
        });

        return `let languages = ${JSON.stringify(vocabulary)};`;
    }
}

module.exports = CodeGenerator;
