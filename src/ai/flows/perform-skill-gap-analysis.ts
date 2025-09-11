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
    .describe('A comma-separated list of the user\'s current skills.'),
  desiredCareerPath: z.string().describe('The user\'s desired career path.'),
  jobDescription: z
    .string()
    .optional()
    .describe(
      'An optional job description for the desired career path. This will give more specific context for the skill gap analysis.'
    ),
});
export type PerformSkillGapAnalysisInput = z.infer<
  typeof PerformSkillGapAnalysisInputSchema
>;

const SkillSchema = z.object({
  name: z.string().describe('The name of the skill.'),
  level: z.number().min(0).max(100).describe('The user\'s proficiency level (0-100) in this skill. For required skills, this is the target proficiency.'),
});

const SkillGapSchema = z.object({
  name: z.string().describe('The name of the missing skill.'),
  importance: z.number().min(1).max(5).describe('The importance of the skill for the desired career (1-5).'),
});

const LearningResourceSchema = z.object({
  category: z.enum(['Online Course', 'Book', 'Project', 'Article', 'Other']).describe('The category of the learning resource.'),
  title: z.string().describe('The title of the resource.'),
  url: z.string().url().describe('The URL to access the resource.'),
});

const PerformSkillGapAnalysisOutputSchema = z.object({
  currentSkills: z.array(SkillSchema).describe("A list of the user's current skills and their proficiency levels."),
  requiredSkills: z.array(SkillSchema).describe('A list of skills required for the desired career path and their target proficiency levels.'),
  skillGaps: z.array(SkillGapSchema).describe('A detailed list of identified skill gaps, including their importance.'),
  suggestedLearningResources: z.array(LearningResourceSchema).describe('A categorized list of suggested learning resources to bridge the gaps.'),
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
  prompt: `You are an expert career and skills analyst. Your task is to perform a detailed skill gap analysis for a user based on their profile.

**User Input:**
- Current Skills: {{{currentSkills}}}
- Desired Career Path: {{{desiredCareerPath}}}
{{#if jobDescription}}
- Job Description Context:
  {{{jobDescription}}}
{{/if}}

**Your Analysis Must Adhere to the 'PerformSkillGapAnalysisOutputSchema' and include:**

1.  **currentSkills**:
    - Analyze the user's provided skills: \`{{{currentSkills}}}\`.
    - Create an array of objects, each with a \`name\` and a \`level\`.
    - Assign a proficiency \`level\` (0-100) based on the skill. For a list of skills, assume an intermediate proficiency (e.g., 60-70) unless specified otherwise.

2.  **requiredSkills**:
    - Based on the \`desiredCareerPath\` and \`jobDescription\` (if provided), identify the top 5-7 most critical skills.
    - For each required skill, create an object with its \`name\` and the target \`level\` ( proficiency of 80-90 is standard for a competent professional).
    - Ensure the skills in \`requiredSkills\` and \`currentSkills\` have some overlap for comparison.

3.  **skillGaps**:
    - Compare \`currentSkills\` against \`requiredSkills\`.
    - Identify skills that are present in \`requiredSkills\` but missing or at a lower level in \`currentSkills\`.
    - For each gap, create an object with the skill \`name\` and its \`importance\` (1-5, where 5 is most important).

4.  **suggestedLearningResources**:
    - For the identified \`skillGaps\`, provide a list of 3-5 concrete learning resources.
    - Each resource must be an object with \`category\` (e.g., 'Online Course', 'Book', 'Project'), \`title\`, and a valid \`url\`.
    - Provide a diverse mix of resource categories.

**Example Logic:**
- If user has 'JavaScript' and desired is 'Senior Frontend Developer', a required skill could be 'React'. This is a skill gap.
- Your output for this would be a skill gap object like \`{ name: 'React', importance: 5 }\`.
- You would then suggest a resource like \`{ category: 'Online Course', title: 'Full Modern React Tutorial', url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/' }\`.

Provide a thorough and actionable analysis. Do not invent skills; base your analysis on the provided information and general knowledge of the career path.
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
