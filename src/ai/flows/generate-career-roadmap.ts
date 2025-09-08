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
  currentStatus: z.string().describe("The user's current professional status (e.g., 'Working Professional', 'Student')."),
  educationLevel: z.string().describe("The user's highest level of education."),
  fieldOfStudy: z.string().describe("The user's primary field of study or expertise."),
  experience: z.string().describe("The user's years of professional experience."),
  skills: z.string().describe('A comma-separated list of the user\'s skills.'),
  careerGoals: z.array(z.string()).describe("A list of the user's primary career goals."),
  interests: z.array(z.string()).describe("A list of the user's professional interests."),
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

const SalaryProgressionSchema = z.object({
    milestone: z.string().describe('The career milestone or year (e.g., "Year 1", "Mid-Level").'),
    estimatedSalary: z.number().describe('The estimated annual salary in USD for this milestone.'),
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
  salaryProgression: z.array(SalaryProgressionSchema).describe('An array of salary progression estimates for a line chart.'),
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
  prompt: `You are a career and salary expert. Generate a personalized career roadmap and salary progression for the user based on their detailed profile.

**User Profile:**
- Current Status: {{{currentStatus}}}
- Education Level: {{{educationLevel}}}
- Field of Study: {{{fieldOfStudy}}}
- Experience Level: {{{experience}}}
- Current Skills: {{{skills}}}
- Career Goals:
{{#each careerGoals}}
  - {{{this}}}
{{/each}}
- Interests:
{{#each interests}}
  - {{{this}}}
{{/each}}

Your response must be a JSON object that adheres to the GenerateCareerRoadmapOutputSchema.

1.  **roadmap**: Create a structured array of roadmap steps. Each step should include:
    *   \`title\`: A clear, concise title for the step (e.g., "Master Frontend Fundamentals").
    *   \`description\`: A paragraph explaining the importance of this step and what to focus on.
    *   \`duration\`: An estimated timeframe, like "3-6 months".
    *   \`skills\`: A list of 3-5 key skills to learn in this step.

2.  **skillDistribution**: Based on the entire roadmap, create an array of objects for a pie chart. Each object should have:
    *   \`name\`: The skill category (e.g., "Frontend", "Backend", "Soft Skills").
    *   \`value\`: A number representing the percentage or importance of this skill category. The values should sum to 100.

3.  **timeline**: Create an array of objects for a bar chart. For each step in the roadmap, create an object with:
    *   \`name\`: The title of the roadmap step.
    *   \`duration\`: The *average* estimated duration in months (e.g., for "3-6 months", use 4.5).

4.  **salaryProgression**: Based on the generated roadmap, create an array of objects for a line chart. Each object should have:
    *   \`milestone\`: The name of the career stage (e.g., "Entry-Level", "Mid-Level", "Senior", "Lead").
    *   \`estimatedSalary\`: A realistic estimated annual salary in USD for that stage. Start with the current role if possible.

Provide a comprehensive, actionable, and financially insightful roadmap. The roadmap should be highly tailored to the user's detailed profile.`,
});

const generateCareerRoadmapFlow = ai.defineFlow(
  {
    name: 'generateCareerRoadmapFlow',
    inputSchema: GenerateCareerRoadmapInputSchema,
    outputSchema: GenerateCareerRoadmapOutputSchema,
    retries: 3,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
