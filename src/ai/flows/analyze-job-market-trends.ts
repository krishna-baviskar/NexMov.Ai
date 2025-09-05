'use server';
/**
 * @fileOverview An AI agent for analyzing job market trends.
 *
 * - analyzeJobMarketTrends - A function that handles the job market analysis process.
 * - AnalyzeJobMarketTrendsInput - The input type for the analyzeJobMarketTrends function.
 * - AnalyzeJobMarketTrendsOutput - The return type for the analyzeJobMarketTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeJobMarketTrendsInputSchema = z.object({
  domain: z.string().describe('The specific job domain or industry to analyze, e.g., software engineering, marketing, data science.'),
  location: z.string().describe('The geographic location for the job market analysis, e.g., San Francisco, remote, United States.'),
});
export type AnalyzeJobMarketTrendsInput = z.infer<typeof AnalyzeJobMarketTrendsInputSchema>;

const TrendingRoleSchema = z.object({
    name: z.string().describe('The name of the trending job role.'),
    demand: z.number().describe('A score (out of 100) representing the current demand for this role.'),
});

const AnalyzeJobMarketTrendsOutputSchema = z.object({
  trendingRoles: z.array(TrendingRoleSchema).describe('A list of trending job roles in the specified domain and location, including their demand score.'),
  salaryRanges: z.string().describe('The typical salary ranges for different roles in the specified domain and location.'),
  emergingTechnologies: z.array(z.string()).describe('A list of emerging technologies relevant to the specified domain.'),
  demandPercentage: z.number().describe('The percentage of demand for jobs in the specified domain and location.'),
  locationBasedOpportunities: z.string().describe('Information on location-specific job opportunities and trends.'),
});
export type AnalyzeJobMarketTrendsOutput = z.infer<typeof AnalyzeJobMarketTrendsOutputSchema>;

export async function analyzeJobMarketTrends(input: AnalyzeJobMarketTrendsInput): Promise<AnalyzeJobMarketTrendsOutput> {
  return analyzeJobMarketTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeJobMarketTrendsPrompt',
  input: {schema: AnalyzeJobMarketTrendsInputSchema},
  output: {schema: AnalyzeJobMarketTrendsOutputSchema},
  prompt: `You are an expert career counselor specializing in job market analysis.

You will analyze the current job market for the specified domain and location and provide insights into trending roles, salary ranges, and emerging technologies.

Domain: {{{domain}}}
Location: {{{location}}}

Based on this information, provide the following:

*   A list of trending job roles, each with a 'name' and a 'demand' score (out of 100).
*   Typical salary ranges for different roles.
*   A list of emerging technologies.
*   The overall percentage of demand for jobs in this domain.
*   Information on location-specific job opportunities and trends.

Format your output as a JSON object that adheres to the AnalyzeJobMarketTrendsOutputSchema. Include detailed information to assist the user in tailoring their job search. Ensure that the information is up-to-date and relevant to the specified domain and location. Make decisions with reasoning as needed.
`,
});

const analyzeJobMarketTrendsFlow = ai.defineFlow(
  {
    name: 'analyzeJobMarketTrendsFlow',
    inputSchema: AnalyzeJobMarketTrendsInputSchema,
    outputSchema: AnalyzeJobMarketTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
