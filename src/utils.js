
import whitelist from 'validator/lib/whitelist'

let sanitizeSymbolInput = (formInput) => {
    return whitelist(formInput, 'a-zA-Z ,');
};

export { sanitizeSymbolInput };
