import EnglishCanada from './translation_en_CA.js';
import FrenchCanada from './translation_fr_CA.js';

const LANGS = {
    en_ca: EnglishCanada,
    fr_ca: FrenchCanada
}

const tr = (lang, key) => {
    lang = lang.toLowerCase();
    if (!LANGS[lang]) {
        lang = 'en_ca';
    }
    return LANGS[lang][key] || LANGS['en_ca'][key];
}

export default tr;