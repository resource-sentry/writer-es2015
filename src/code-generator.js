const Categories    = require('@resource-sentry/utils/lib/categories'),
      CategoryNames = require('@resource-sentry/utils/lib/category-names'),
      Constants     = require('./model/constants');

class CodeGenerator {
    constructor(categories) {
        this.categories = categories.map((values, category) => this.getKeyCodes(values, category));
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

    getData() {
        let properties;
        let output = [];

        this.categories.forEach((category, code) => {
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
        return result;
    }

    getKeys() {
        let properties;
        let output = [];

        this.categories.forEach((category, code) => {
            properties = category.map(({name, fullId}) => `${name}:${fullId}`);
            output.push(`export let ${CategoryNames[code]} = {${properties}};`);
        });

        return output.join('\n');
    }
}

module.exports = CodeGenerator;
