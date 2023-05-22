const { registerTransforms } = require('@tokens-studio/sd-transforms');
const StyleDictionary = require('style-dictionary')
const baseConfig = require('./config.json')


registerTransforms(StyleDictionary);

StyleDictionary.registerTransform({
  type: "value",
  name: "myCustomTransform",
  matcher: (token) => {},
  transformer: (token) => {
    return token; // <-- transform as needed
  }
})


// format helpers from style-dictionary
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

// example css format
StyleDictionary.registerFormat({
  name: 'myCustomFormat',
  "opening_character": "\\{\\{",
      "closing_character": "\\}\\}",
  formatter: function({dictionary, file, options}) {
    const { outputReferences } = options;
    return `${fileHeader({file})}:root {
${formattedVariables({format: 'css', dictionary, outputReferences})}
}`;
  }
});


const StyleDictionaryExtended = StyleDictionary.extend(baseConfig)

StyleDictionaryExtended.buildAllPlatforms()