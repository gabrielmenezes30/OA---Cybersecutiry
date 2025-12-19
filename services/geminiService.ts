import { GoogleGenAI } from "@google/genai";
import { Question, QuestionType } from "../types";

const apiKey = process.env.API_KEY || '';
console.log('🔑 API Key carregada:', apiKey ? `Sim (${apiKey.substring(0, 10)}...)` : 'NÃO ENCONTRADA');
const ai = new GoogleGenAI({ apiKey });

// Helper to determine model based on complexity, though 2.5-flash is usually sufficient and fast
const MODEL_NAME = 'gemini-2.5-flash';

export const evaluateAnswer = async (
  question: Question,
  userAnswer: string
): Promise<{ score: number; feedback: string }> => {
  if (!apiKey) {
    return { 
      score: 0, 
      feedback: "Chave de API ausente. Não é possível avaliar. Verifique a configuração." 
    };
  }

  const prompt = `
    Você é um especialista em segurança cibernética e educador auxiliando um professor de Ciência da Computação.
    
    Tarefa: Avaliar a resposta do professor a uma pergunta do módulo de aprendizado.
    
    Pergunta: "${question.prompt}"
    Tipo da Pergunta: ${question.type}
    ${question.context ? `Código de Contexto/Cenário: ${question.context}` : ''}
    ${question.correctAnswerCriteria ? `Critérios para Correção: ${question.correctAnswerCriteria}` : ''}
    
    Resposta do Usuário: "${userAnswer}"
    
    Formato de Saída: Apenas JSON.
    {
      "score": <número entre 0 e 100>,
      "feedback": "<string com feedback construtivo EM PORTUGUÊS, máximo de 3 frases. Seja encorajador, mas tecnicamente preciso.>"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    const result = JSON.parse(text);
    return {
      score: result.score || 0,
      feedback: result.feedback || "Não foi possível processar a avaliação."
    };
  } catch (error) {
    console.error("Gemini evaluation error:", error);
    return {
      score: 0,
      feedback: "Erro ao conectar ao serviço de avaliação de IA. Por favor, tente novamente."
    };
  }
};

export const getChatResponse = async (
  history: { role: 'user' | 'model'; text: string }[],
  currentMessage: string
): Promise<string> => {
  console.log('💬 getChatResponse chamado. API Key presente?', !!apiKey);
  
  if (!apiKey) {
    console.error('❌ API Key ausente no getChatResponse');
    return "Chave de API ausente. Configure GEMINI_API_KEY no arquivo .env.local";
  }

  try {
    // Convert generic history to Gemini format if needed, 
    // but simplified generateContent can take a string for single turn 
    // or we can use the chat API. Let's use Chat API for context.
    
    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: "Você é o 'CyberMentor', um CISO (Chief Information Security Officer) especialista e amigável, ajudando um professor de CS a entender conceitos de segurança. Mantenha as respostas concisas, educacionais e relevantes para um ambiente de sala de aula. Responda sempre em Português."
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: currentMessage });
    return result.text || "Estou com problemas para processar esse pedido.";
  } catch (error) {
    console.error("Gemini chat error:", error);
    return "Desculpe, estou offline no momento.";
  }
};