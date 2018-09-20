/*
Following rules at https://dev.twitch.tv/docs/extensions/guidelines-and-policies/
 */

var OFF = 0, WARN = 1, ERROR = 2;
const ENV = process.env.NODE_ENV;

module.exports = exports = {
    env: {
        'browser': true,    // for the browser
    },
    extends: [
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "sourceType": "module",
    },
    "rules": {
        // Possible Errors (overrides from recommended set)
        // We allow console log for testing or local dev, but not on production
        "no-console": ENV ==='production' ? ERROR : WARN,

        // Best Practices
        "no-eval": ERROR,
        "no-implied-eval": ERROR,

        // Variables

        // Node.js and CommonJS

        // ECMAScript 6 support

        // Stylistic - everything here is a warning because of style.
    }
};