const CATEGORY_LANGUAGE = %CATEGORY_LANGUAGE%;
const CATEGORY_SIZE = %CATEGORY_SIZE%;
const RESOURCE_SIZE = %RESOURCE_SIZE%;
const CATEGORY_MASK = ((1 << CATEGORY_SIZE) - 1) << RESOURCE_SIZE;
const RESOURCE_MASK = (1 << RESOURCE_SIZE) - 1;

%LANGUAGES%

%KEYS%

let data = [];
%DATA%

export function getLanguageCode(locale) {
    let range, result;

    result = languages[locale];

    // Lookup
    if(result === undefined && locale.indexOf('-') !== -1) {
        range = locale.split('-');
        range.pop();
        return getLanguageCode(range.join('-'));
    }

    return result;
}

export function getResource(resourceId) {
    const category = (resourceId & CATEGORY_MASK) >> RESOURCE_SIZE;
    const resource = (resourceId & RESOURCE_MASK);

    return data[category][resource];
}

export function getText(resourceId, locale) {
    let translated;
    const resource = (resourceId & RESOURCE_MASK);
    const code = getLanguageCode(locale);

    if(code !== undefined) {
        translated = (code << (RESOURCE_SIZE + CATEGORY_SIZE)) + resource;
        return data[CATEGORY_LANGUAGE][translated];
    }
}
