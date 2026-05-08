const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini25FlashLite() {
    try {
        const apiKey = "AIzaSyB32980n3h2RmPwxtDJUECjeIGBk77d_LI";
        console.log('Testing Gemini 2.5 Flash Lite with API key:', apiKey.substring(0, 10) + '...');
        
        const genAI = new GoogleGenerativeAI(apiKey);
        
        // Use Gemini 2.5 Flash Lite model
        const model = genAI.getGenerativeModel({ 
            model: 'gemini-2.5-flash-lite',
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
            }
        });
        
        console.log('Gemini 2.5 Flash Lite model created successfully');
        
        const prompt = 'Hello, can you respond with just "Gemini 2.5 Flash Lite API working"?';
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log('Response:', text);
        console.log('Gemini 2.5 Flash Lite API test successful!');
        
    } catch (error) {
        console.error('Gemini 2.5 Flash Lite API test failed:', error.message);
        console.error('Full error:', error);
    }
}

testGemini25FlashLite();
