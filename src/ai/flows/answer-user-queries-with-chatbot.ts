'use server';
/**
 * @fileOverview A Genkit flow for answering user queries with a chatbot.
 *
 * - answerUserQuery - A function that takes a user query and returns an answer from the chatbot.
 * - AnswerUserQueryInput - The input type for the answerUserQuery function.
 * - AnswerUserQueryOutput - The return type for the answerUserQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerUserQueryInputSchema = z.object({
  query: z.string().describe('The user query to be answered by the chatbot.'),
});
export type AnswerUserQueryInput = z.infer<typeof AnswerUserQueryInputSchema>;

const AnswerUserQueryOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query from the chatbot.'),
});
export type AnswerUserQueryOutput = z.infer<typeof AnswerUserQueryOutputSchema>;

export async function answerUserQuery(input: AnswerUserQueryInput): Promise<AnswerUserQueryOutput> {
  return answerUserQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerUserQueryPrompt',
  input: {schema: AnswerUserQueryInputSchema},
  output: {schema: AnswerUserQueryOutputSchema},
  prompt: `You are a helpful and friendly AI assistant named NexAI. 🤖

Your goal is to provide **extremely** informative, helpful, and highly engaging responses to the user's query. Your personality is fun, vibrant, and you love using emojis!

**Mandatory Response Style Guidelines:**
- **Use Emojis... A LOT!** 🚀 Sprinkle at least 5-10 relevant emojis throughout your response to make it visually appealing and fun. Don't be shy! ✨
- **Masterful Formatting:** Use markdown formatting liberally. Use **bold** for emphasis, *italics* for nuance, and bullet points (using '-') to structure your answer and make it super easy to read. 📝
- **Crystal Clear Communication:** Break down complex topics into simple, easy-to-understand lines. Every sentence should be a joy to read. 💡

**User's Query:**
"{{{query}}}"

Please provide an amazing response that strictly follows these guidelines. Let's make it awesome! 🌟`,
});

const answerUserQueryFlow = ai.defineFlow(
  {
    name: 'answerUserQueryFlow',
    inputSchema: AnswerUserQueryInputSchema,
    outputSchema: AnswerUserQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
