'use server';
/**
 * @fileOverview Skill gap analysis AI agent.
 *
 * - performSkillGapAnalysis - A function that handles the skill gap analysis process.
 * - PerformSkillGapAnalysisInput - The input type for the performSkillGapAnalysis function.
 * - PerformSkillGapAnalysisOutput - The return type for the performSkillGapAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PerformSkillGapAnalysisInputSchema = z.object({
  currentSkills: z
    .string()
    .describe('A comma separated list of the user\'s current skills.'),
  desiredCareerPath: z.string().describe('The user\'s desired career path.'),
  jobDescription: z
    .string()
    .optional()
    .describe(
      'An optional job description for the desired career path.  This will give more specific context for the skill gap analysis.'
    ),
});
export type PerformSkillGapAnalysisInput = z.infer<
  typeof PerformSkillGapAnalysisInputSchema
>;

const PerformSkillGapAnalysisOutputSchema = z.object({
  skillGaps: z
    .string()
    .describe(
      'A comma separated list of the skills that the user is missing to move into the desired career path.'
    ),
  suggestedLearningPaths: z
    .string()
    .describe(
      'A list of suggested learning paths and resources to bridge the identified skill gaps.'
    ),
});
export type PerformSkillGapAnalysisOutput = z.infer<
  typeof PerformSkillGapAnalysisOutputSchema
>;

export async function performSkillGapAnalysis(
  input: PerformSkillGapAnalysisInput
): Promise<PerformSkillGapAnalysisOutput> {
  return performSkillGapAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'performSkillGapAnalysisPrompt',
  input: {schema: PerformSkillGapAnalysisInputSchema},
  output: {schema: PerformSkillGapAnalysisOutputSchema},
  prompt: `You are a career counselor who specializes in identifying skill gaps for people trying to move into new career paths.

You will take a user's current skills, and their desired career path and provide a list of skills that they are missing, and a list of suggested learning paths to learn those skills.

Skills that the user currently has:
{{currentSkills}}

Desired career path:
{{desiredCareerPath}}

Job description (optional):
{{#if jobDescription}}
{{jobDescription}}
{{else}}
There is no job description provided.
{{/if}}

Based on this information, what skills are they missing, and what suggested learning paths can you recommend?
`,
});

const performSkillGapAnalysisFlow = ai.defineFlow(
  {
    name: 'performSkillGapAnalysisFlow',
    inputSchema: PerformSkillGapAnalysisInputSchema,
    outputSchema: PerformSkillGapAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
