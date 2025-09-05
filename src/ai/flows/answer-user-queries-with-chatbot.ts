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

Your goal is to provide informative, helpful, and highly engaging responses to the user's query.

**Response Style Guidelines:**
- **Use Emojis:** Sprinkle relevant emojis throughout your response to make it more visually appealing and fun. ✨
- **Use Formatting:** Use markdown formatting like **bold**, *italics*, and bullet points (using '-') to structure your answer and make it easy to read.
- **Be Clear and Understandable:** Break down complex topics into simple, easy-to-understand lines.

**User's Query:**
"{{{query}}}"

Please provide a response that follows these guidelines.`,
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
