import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as cheerio from 'cheerio';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const maxDuration = 60; // Allow longer timeout for detailed analysis

export async function POST(req: Request) {
  try {
    const { url, type } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    // Fetch URL content
    let html = '';
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch URL');
      html = await response.text();
    } catch (fetchError) {
      console.error('Error fetching URL:', fetchError);
      return NextResponse.json({ error: 'Failed to access the provided URL' }, { status: 400 });
    }

    const $ = cheerio.load(html);

    // Clean up script and style tags to reduce noise
    $('script').remove();
    $('style').remove();
    $('noscript').remove();
    $('iframe').remove();

    // Extract relevant text
    const title = $('title').text().trim();
    const description = $('meta[name="description"]').attr('content') || '';
    const h1 = $('h1').map((_, el) => $(el).text().trim()).get().join(' | ');
    const h2 = $('h2').map((_, el) => $(el).text().trim()).get().join(' | ');
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 8000); // Limit context to avoid token limits

    const contentSummary = `
      URL: ${url}
      Title: ${title}
      Description: ${description}
      Main Headings (H1): ${h1}
      Sub Headings (H2): ${h2}
      
      Main Content Snippet: 
      "${bodyText}"
    `;

    let systemPrompt = '';
    let userPrompt = '';
    let model = 'gpt-4o-mini'; // Default to faster/cheaper model

    if (type === 'free') {
      model = 'gpt-4o-mini';
      systemPrompt = `You are an expert Landing Page Auditor. Your goal is to provide a "Light AI Audit" for a free user.
      Focus on identifying 3 MAJOR critical issues that are hurting conversions instantly.
      Be direct, professional, yet urgent ("Detects and Hurts" style).`;
      
      userPrompt = `Analyze this landing page content and identify exactly 3 critical friction points or missing elements that are likely killing conversions.
      For each point:
      1. What is the problem?
      2. Why does it hurt sales?
      
      Keep the total response under 250 words.
      
      Page Data:
      ${contentSummary}`;
    } else {
      // Full Tier - Complete Analysis
      model = 'gpt-4o'; // Use more capable model for deep analysis
      systemPrompt = `You are a world-class CRO (Conversion Rate Optimization) Strategist and Senior Copywriter. 
      You are providing a premium "Deep Dive" audit. Your goal is not just to find problems, but to explain the consumer psychology behind them and provide specific rewrite solutions ("Explains and Solves").
      
      You must cover:
      1. Buyer Persona Analysis (Who is this for? What are their fears/desires?)
      2. Comprehensive Copywriting Audit (Rewrite headlines, improve clarity)
      3. UX/UI Friction Points (What stops the click?)
      4. Trust & Authority Check`;

      userPrompt = `Perform a comprehensive, premium analysis of this landing page.
      
      Structure your response exactly as follows:

      ## 1. 🎯 Buyer Persona Analysis
      Based on the content, reverse-engineer the target audience.
      - **Who they are:** (Infer demographics/role)
      - **Main Pain Point:** (What keeps them up at night?)
      - **Desired Outcome:** (What is the dream result?)

      ## 2. ✍️ Copywriting Rewrites
      Identify 3 weak headlines or text blocks and rewrite them to be more persuasive.
      - *Original:* "[Quote weak text]"
      - *Rewrite:* "[Better version]"
      - *Why:* Explain the psychological trigger used.

      ## 3. 🚧 Friction Points & UX Killers
      Identify 3 distinct things making it hard to buy or contact.
      
      ## 4. 💡 The "One Big Thing"
      If they could only change ONE thing to double conversions, what should it be?

      Page Data:
      ${contentSummary}`;
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      model: model,
      temperature: 0.7,
    });

    const analysis = completion.choices[0].message.content;

    return NextResponse.json({ 
      success: true, 
      analysis: analysis,
      tier: type,
      model_used: model
    });

  } catch (error) {
    console.error('Analysis failed:', error);
    return NextResponse.json({ error: 'Analysis failed due to server error' }, { status: 500 });
  }
}
