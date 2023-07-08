import {
    defineConfig,
    presetAttributify,
    presetUno,
    presetWebFonts,
    transformerVariantGroup,
} from 'unocss';
import transformerDirective from '@unocss/transformer-directives';


export default defineConfig({
    rules: [],
    shortcuts: {},
    theme: {
        colors: {
            primary: {
                100: '#7ea5bf',
                200: '#62869e',
                400: '#5f8299',
                500: '#476578',
                600: '#384f5e',
                700: '#283e4d',
            },
        },
        fontSize: {
            '80px': ['80px', '100px'],
            '56px': ['56px', '70px'],
            '45px': ['45px', '58px'],
            '40px': ['40px', '50px'],
            '36px': ['36px', '50px'],
            '32px': ['32px', '41px'],
            '30px': ['30px', '37px'],
            '28px': ['28px', '36px'],
            '26px': ['26px', '30px'],
            '25px': ['25px', '32px'],
            '24px': ['24px', '30px'],
            '22px': ['22px', '27px'],
            '20px': ['20px', '28px'],
            '16px': ['16px', '20px'],
            '14px': ['14px', '17px'],
            '13px': ['13px', '16px'],
            '12px': ['12px', '15px'],
            '10px': ['10px', '12px'],
            '8px': ['8px', '10px'],
        },
        fontFamily: {
            body: ['Quicksand', 'ui-sans-serif', 'system-ui'],
        },
        // Add more theme customizations
    },
    transformers: [transformerDirective(), transformerVariantGroup()],
    presets: [
        presetAttributify(),
        presetUno(),
        presetWebFonts({
            provider: 'google', // default provider
            fonts: {
                // these will extend the default theme
                inter: 'Inter',
            },
        }),
    ],
})