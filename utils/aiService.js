const { GoogleGenerativeAI } = require('@google/generative-ai');

async function getAIAnswer(question) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Answer the following question in SINGLE WORD. Do not provide any explanation, punctuation, or additional text. Just one single word.\n\nQuestion: ${question}\n\nOne-word answer:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const singleWord = text.trim().split(/\s+/)[0].replace(/[.,!?;:]/g, '');

    return singleWord;
  } catch (error) {
    throw new Error('AI service unavailable');
  }
}

module.exports = {
  getAIAnswer
};
