'use server';

/**
 * @fileOverview Generates a personalized career roadmap based on user input.
 *
 * - generateCareerRoadmap - A function that generates the career roadmap.
 * - GenerateCareerRoadmapInput - The input type for the generateCareerRoadmap function.
 * - GenerateCareerRoadmapOutput - The return type for the generateCareerRoadmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCareerRoadmapInputSchema = z.object({
  currentProfile: z
    .string()
    .describe('The user\'s current professional profile or job description.'),
  skills: z.string().describe('A comma-separated list of the user\'s skills.'),
  careerInterests: z
    .string()
    .describe('A description of the user\'s career interests and goals.'),
});
export type GenerateCareerRoadmapInput = z.infer<
  typeof GenerateCareerRoadmapInputSchema
>;

const GenerateCareerRoadmapOutputSchema = z.object({
  roadmap: z
    .string()
    .describe(
      'A detailed career roadmap outlining potential career paths, required skills, and estimated timelines.'
    ),
});
export type GenerateCareerRoadmapOutput = z.infer<
  typeof GenerateCareerRoadmapOutputSchema
>;

export async function generateCareerRoadmap(
  input: GenerateCareerRoadmapInput
): Promise<GenerateCareerRoadmapOutput> {
  return generateCareerRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCareerRoadmapPrompt',
  input: {schema: GenerateCareerRoadmapInputSchema},
  output: {schema: GenerateCareerRoadmapOutputSchema},
  prompt: `You are a career advisor expert. Generate a personalized career roadmap for the user based on their current profile, skills, and career interests.

Current Profile: {{{currentProfile}}}
Skills: {{{skills}}}
Career Interests: {{{careerInterests}}}

Consider potential career paths, required skills for each path, and estimated timelines. Provide actionable advice.

Roadmap:`,
});

const generateCareerRoadmapFlow = ai.defineFlow(
  {
    name: 'generateCareerRoadmapFlow',
    inputSchema: GenerateCareerRoadmapInputSchema,
    outputSchema: GenerateCareerRoadmapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
