const Categories = require('@resource-sentry/utils/lib/categories');

const categoriesSource = require('./data/categories-source'),
      CodeGenerator    = require('../src/code-generator');

describe('Code Generator', () => {

    let generator;

    beforeEach(() => {
        generator = new CodeGenerator(categoriesSource);
    });

    it('sorts values by name', () => {
        expect(generator.getCategories()[Categories.VALUE]).toMatchObject([
            {name: 'CAR_HEROIC_COLOR_SIMPLE'},
            {name: 'CUSTOMER_IDENTIFIER'},
            {name: 'PAYMENT_IDENTIFIER'},
            {name: 'PI'},
            {name: 'PLATFORM_IDENTIFIER'},
            {name: 'VIDEO_OF_UNIVERSE'}
        ]);
    });

    it('converts values to the numbers', () => {
        expect(generator.getCategories()[Categories.VALUE]).toMatchObject([
            {value: 0},
            {value: 1023840},
            {value: 13902183},
            {value: 3.1415926535},
            {value: 2134},
            {value: 8}
        ]);
    });

    it('sorts texts by name', () => {
        expect(generator.getCategories()[Categories.TEXT]).toMatchObject([
            {name: 'APPLICATION_NAME'},
            {name: 'CAR_NAME'},
            {name: 'ERROR_EPIC'},
            {name: 'ERROR_FATAL'},
            {name: 'TEXT_ACTUAL_ACTIVE'},
            {name: 'TEXT_ACTUAL_HELP'},
            {name: 'TEXT_ACTUAL_VISIT_EXTRA'},
            {name: 'TEXT_ACTUAL_VISIT_NOW'}
        ]);
    });

    it('sorts dimensions by name', () => {
        expect(generator.getCategories()[Categories.DIMENSION]).toMatchObject([
            {name: 'ELEMENT_SPECIAL_WIDTH'},
            {name: 'PROTECTION_AREA_ANGLE'},
            {name: 'SECTION_HEADER_HEIGHT'},
            {name: 'SECTION_SHAPE_SIZE'}
        ]);
    });

    it('sorts colors by name', () => {
        expect(generator.getCategories()[Categories.COLOR]).toMatchObject([
            {name: 'ACCENT_ORANGE'},
            {name: 'LIST_ITEM_BLACK'},
            {name: 'LIST_ITEM_WHITE'},
            {name: 'SAD_YELLOW'}
        ]);
    });

    it('parses hex colors', () => {
        expect(generator.getCategories()[Categories.COLOR]).toMatchObject([
            {value: 16753920},
            {value: 0},
            {value: 16777215},
            {value: 16776960}
        ]);
    });

    it('sorts graphics by name', () => {
        expect(generator.getCategories()[Categories.GRAPHIC]).toMatchObject([
            {name: 'ICON_LOGIN'},
            {name: 'ICON_LOGIN_WHITE'},
            {name: 'ICON_SIGN_OUT'},
            {name: 'SHADOW_BAR'}
        ]);
    });

    it('creates language vocabulary', () => {
        expect(generator.getLanguageTagVocabulary()).toMatchObject({
            de: 0, en: 1, es: 2
        })
    });

});
