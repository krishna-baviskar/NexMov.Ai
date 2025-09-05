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

const RoadmapStepSchema = z.object({
  title: z.string().describe('The title of the roadmap step.'),
  description: z.string().describe('A detailed description of the roadmap step.'),
  duration: z.string().describe('The estimated duration for this step (e.g., "3-6 months").'),
  skills: z.array(z.string()).describe('A list of key skills to acquire during this step.'),
});

const GenerateCareerRoadmapOutputSchema = z.object({
  roadmap: z.array(RoadmapStepSchema).describe('A detailed, step-by-step career roadmap.'),
  skillDistribution: z.array(z.object({ 
    name: z.string().describe('The name of the skill or technology.'), 
    value: z.number().describe('The importance or weight of this skill in the roadmap.') 
  })).describe('A distribution of recommended skills and their importance for a pie chart.'),
  timeline: z.array(z.object({ 
    name: z.string().describe('The name of the roadmap step or milestone.'), 
    duration: z.number().describe('The estimated duration in months for the bar chart.') 
  })).describe('An array of roadmap steps and their estimated duration in months for a timeline bar chart.'),
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

Your response must be a JSON object that adheres to the GenerateCareerRoadmapOutputSchema.

1.  **roadmap**: Create a structured array of roadmap steps. Each step should include:
    *   \`title\`: A clear, concise title for the step (e.g., "Master Frontend Fundamentals").
    *   \`description\`: A paragraph explaining the importance of this step and what to focus on.
    *   \`duration\`: An estimated timeframe, like "3-6 months".
    *   \`skills\`: A list of 3-5 key skills to learn in this step.

2.  **skillDistribution**: Based on the entire roadmap, create an array of objects for a pie chart. Each object should have:
    *   \`name\`: The skill category (e.g., "Frontend", "Backend", "Soft Skills").
    *   \`value\`: A number representing the percentage or importance of this skill category in the overall plan. The values should sum to 100.

3.  **timeline**: Create an array of objects for a bar chart. For each step in the roadmap, create an object with:
    *   \`name\`: The title of the roadmap step.
    *   \`duration\`: The *average* estimated duration in months (e.g., for "3-6 months", use 4.5).

Provide a comprehensive and actionable roadmap.`,
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
