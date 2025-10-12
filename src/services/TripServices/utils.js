
export function formatTravelTipsData(apiResponse) {
   console.log("travel tips Api response:",apiResponse)
   if (!apiResponse || !apiResponse.tips_content) {
        console.error("Invalid or missing 'tips_content' in API response.");
        return {
            safetyTips: [],
            localCulture: [],
            language: []
        };
    }

    const content = apiResponse.tips_content;
    
    // --- 1. Safety Tips (Array of strings) ---
    // Extracts practical_safety (array) and practical_currency/tipping/transportation (strings)
    const safetyTips = [];
    
    // Add specific safety tips (already an array)
    if (Array.isArray(content.practical_safety)) {
        safetyTips.push(...content.practical_safety);
    }

    // Add general practical tips (currency, tipping, transportation)
    if (content.practical_currency) {
        safetyTips.push(`Currency: ${content.practical_currency}`);
    }
    if (content.practical_tipping) {
        safetyTips.push(`Tipping: ${content.practical_tipping}`);
    }
    if (content.practical_transportation) {
        safetyTips.push(`Transportation: ${content.practical_transportation}`);
    }


    // --- 2. Local Culture (Array of strings) ---
    // Extracts all culture-related items and merges them into a single list
    const localCulture = [];

    // Add customs (array)
    if (Array.isArray(content.culture_customs)) {
        localCulture.push(...content.culture_customs);
    }
    
    // Add etiquette (array)
    if (Array.isArray(content.culture_etiquette)) {
        localCulture.push(...content.culture_etiquette);
    }

    // Add dress code (string)
    if (content.culture_dress_code) {
        localCulture.push(`Dress Code: ${content.culture_dress_code}`);
    }


    // --- 3. Language (Array of Dictionaries/Objects) ---
    // Extracts the language_basic_phrases array, which contains strings like "hello: hello",
    // and transforms them into an array of {localWord: '...', englishTranslation: '...'}
    const language = [];

    if (Array.isArray(content.language_basic_phrases)) {
        content.language_basic_phrases.forEach(phrase => {
            // Split the string at the first occurrence of ":"
            const parts = phrase.split(/:(.*)/s).map(p => p.trim());
            
            // Expected format: [localWord, englishTranslation, ""]
            if (parts.length >= 2) {
                language.push({
                    // The 'local word' is the word the tourist needs to learn
                    localWord: parts[0], 
                    // The 'translation' is the English equivalent
                    englishTranslation: parts[1] 
                });
            }
        });
    }
    
    // Include the general language tip as a separate item if needed (optional)
    if (content.language_tips) {
        // You might want to handle this separately in the UI, 
        // but for completeness, we'll add it as a structured tip.
        language.push({
            tip: content.language_tips
        });
    }

    return {
        safetyTips: safetyTips,
        localCulture: localCulture,
        language: language
    };
}
