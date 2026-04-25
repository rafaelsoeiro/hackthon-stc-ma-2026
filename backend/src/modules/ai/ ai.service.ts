import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildSystemPrompt } from './prompts/system.prompt';


export class AIService {
  private genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY as string
  );
  async responderCidadao(pergunta: string, dadosContexto: any) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: buildSystemPrompt() }] },
        { role: "model", parts: [{ text: "Entendido. Aplicarei o Tesauro e responderei em JSON." }] }
      ],
    });

    const mensagem = `Dados do Portal: ${JSON.stringify(dadosContexto)}. Pergunta: ${pergunta}`;
    const result = await chat.sendMessage(mensagem);

    return JSON.parse(result.response.text());
  }
}