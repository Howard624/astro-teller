/**
 * @ai Wrote Code
 * @aidetails Re-engineered the prompt to use a tri-system analysis (Zi Wei, MBTI, Zodiac). 
 * Forced a structured, step-by-step output format for professional-grade reports.
 */
import { NextResponse } from 'next/server';
import { geminiModel } from '@/lib/gemini';

/**
 * Handles deep-dive fortune telling requests.
 * @param {Request} req - The request object containing gender, birthDate, birthTime, and mbti.
 * @returns {Promise<NextResponse>} A structured, multi-dimensional destiny report.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { gender, birthDate, birthTime, mbti } = body;

    if (!birthDate) {
      return NextResponse.json({ error: '请选择出生日期' }, { status: 400 });
    }

    // This prompt forces the AI to think through 3 distinct lenses
    const prompt = `
      你是一位当代玄学宗师，精通紫微斗数、西方占星与 MBTI 人格分析。
      请为这位有缘人（性别：${gender}，生日：${birthDate}，时辰：${birthTime}，MBTI：${mbti}）
      撰写一份【分步式】深度推演报告。
      
      请严格按照以下步骤和分类进行详细分析：

      ---
      ### 🪐 第一步：【紫微斗数 · 命盘大运】
      1. **命宫格局**：基于时辰分析其先天命格（如：极向离明、石中隐玉等）。
      2. **官禄与财帛**：分析其事业的巅峰期和财库的虚实，给出具体的行业建议。
      3. **六亲缘分**：简述其与父母、家人的先天缘分。

      ---
      ### 🧠 第二步：【MBTI · 心理认知机能】
      1. **性格底色**：分析该人格在压力下的行为模式（The Grip）。
      2. **天赋地图**：该人格最适合的社会角色，以及如何避免职场内耗。
      3. **社交兼容**：在人际交往中，最需要警惕的沟通盲点。

      ---
      ### ♈ 第三步：【西方星象 · 能量循环】
      1. **元素平衡**：分析其火土风水四元素的分布（如：土象过重、缺乏水象等）。
      2. **流年转机**：预测未来 6-12 个月内，最重要的星象变动对 TA 的影响。

      ---
      ### 📜 第四步：【大师终极锦囊】
      1. **开运建议**：给出一个具体的日常开运小动作（如：摆放植物、更换颜色）。
      2. **玄妙偈语**：一句直击灵魂的修行点拨。

      要求：言辞专业、神秘且温暖。排版请使用清晰的 Markdown 标题和列表。回复语言为中文（简体）。
    `;

    // Trigger the AI engine
    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ fortuneText: responseText });

  } catch (error) {
    console.error('STARS_MISALIGNED:', error);
    return NextResponse.json({ error: '天机暂时被蒙蔽，请稍后再试。' }, { status: 500 });
  }
}