/**
 * @ai Wrote Code
 * @aidetails Fully integrated the frontend form with the Gemini 3 backend API. 
 * Added state management for API responses and error handling while maintaining 
 * the high-visibility UI optimized for parents.
 *
 * @param {void} No props required.
 * @returns {JSX.Element} The live Astro Teller application.
 */
'use client';

import { useState } from 'react';

export default function Home() {
  // =====================================================================
  // 1. Reactive State Layer
  // =====================================================================
  const [gender, setGender] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');
  const [birthTime, setBirthTime] = useState<string>('');
  const [mbti, setMbti] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // New states for the real AI response
  const [fortuneResult, setFortuneResult] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const years = Array.from({ length: 36 }, (_, i) => 1950 + i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // =====================================================================
  // 2. Event-Driven Logic Layer (Connected to Backend)
  // =====================================================================
  /**
   * Triggers the backend API call to fetch fortune results.
   * @param {React.FormEvent} e - Form submission event.
   */
  const handleStartFortuneTelling = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gender || !birthYear || !birthMonth || !birthDay || !birthTime || !mbti) {
      alert("爸爸妈妈，请把上面的六个选项都填好哦！❤️");
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setFortuneResult(''); // Clear previous results

    // Format data to match backend expectations
    const payload = {
      name: "爸爸/妈妈", // Generic name for the prompt
      gender,
      birthDate: `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`,
      birthTime,
      mbti
    };

    try {
      // THE "ELECTRICAL" CONNECTION: Send data to our /api/fortune route
      const response = await fetch('/api/fortune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '连接宇宙失败，请稍后再试。');
      }

      // Success! Set the AI response
      setFortuneResult(data.fortuneText);
    } catch (err: any) {
      console.error("Connection Error:", err);
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const SELECT_CLASSES = "w-full p-4 text-xl font-medium text-gray-900 bg-white border-2 border-red-100 rounded-2xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none shadow-inner";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-stone-50">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-12 text-center border-t-8 border-red-500">
        
        <h1 className="text-5xl font-extrabold text-red-600 mb-2 tracking-widest">玄学大脑</h1>
        <p className="text-2xl text-gray-700 mb-10 font-medium">融合紫微斗数与现代心理学</p>

        <form onSubmit={handleStartFortuneTelling} className="flex flex-col gap-6">
          {/* Inputs (keeping your exact layout) */}
          <div className="flex flex-col text-left">
            <label className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="text-red-500">*</span> 您的性别
            </label>
            <select className={SELECT_CLASSES} value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="" disabled>请选择男 / 女 ▼</option>
              <option value="男">👨 男 (乾造)</option>
              <option value="女">👩 女 (坤造)</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 flex flex-col text-left">
              <label className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">出生年份</label>
              <select className={SELECT_CLASSES} value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
                <option value="" disabled>年份 ▼</option>
                {years.map(y => <option key={y} value={y}>{y} 年</option>)}
              </select>
            </div>
            <div className="flex-1 flex flex-col text-left">
              <label className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">出生月份</label>
              <select className={SELECT_CLASSES} value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
                <option value="" disabled>月份 ▼</option>
                {[...Array(12)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1} 月</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 flex flex-col text-left">
              <label className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">出生日期</label>
              <select className={SELECT_CLASSES} value={birthDay} onChange={(e) => setBirthDay(e.target.value)}>
                <option value="" disabled>日期 ▼</option>
                {days.map(d => <option key={d} value={d}>{d} 日</option>)}
              </select>
            </div>
            <div className="flex-1 flex flex-col text-left">
              <label className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">出生时辰</label>
              <select className={SELECT_CLASSES} value={birthTime} onChange={(e) => setBirthTime(e.target.value)}>
                <option value="" disabled>选择时辰 ▼</option>
                <option value="子时">子时 (23:00-01:00)</option>
                <option value="丑时">丑时 (01:00-03:00)</option>
                <option value="寅时">寅时 (03:00-05:00)</option>
                <option value="卯时">卯时 (05:00-07:00)</option>
                <option value="辰时">辰时 (07:00-09:00)</option>
                <option value="巳时">巳时 (09:00-11:00)</option>
                <option value="午时">午时 (11:00-13:00)</option>
                <option value="未时">未时 (13:00-15:00)</option>
                <option value="申时">申时 (15:00-17:00)</option>
                <option value="酉时">酉时 (17:00-19:00)</option>
                <option value="戌时">戌时 (19:00-21:00)</option>
                <option value="亥时">亥时 (21:00-23:00)</option>
                <option value="未知">记不清了 (AI模糊推演)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col text-left mt-2">
            <label className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">16型人格 (MBTI)</label>
            <select className={SELECT_CLASSES} value={mbti} onChange={(e) => setMbti(e.target.value)}>
              <option value="" disabled>选择您的性格特征 ▼</option>
              <optgroup label="✨ 分析家">
                <option value="INTJ">INTJ (建筑师)</option>
                <option value="INTP">INTP (逻辑学家)</option>
                <option value="ENTJ">ENTJ (指挥官)</option>
                <option value="ENTP">ENTP (辩论家)</option>
              </optgroup>
              <optgroup label="💖 外交家">
                <option value="INFJ">INFJ (提倡者)</option>
                <option value="INFP">INFP (调停者)</option>
                <option value="ENFJ">ENFJ (主人公)</option>
                <option value="ENFP">ENFP (竞选者)</option>
              </optgroup>
              <optgroup label="🛡️ 守护者">
                <option value="ISTJ">ISTJ (物流师)</option>
                <option value="ISFJ">ISFJ (守卫者)</option>
                <option value="ESTJ">ESTJ (总经理)</option>
                <option value="ESFJ">ESFJ (执政官)</option>
              </optgroup>
              <optgroup label="🎸 探险家">
                <option value="ISTP">ISTP (鉴赏家)</option>
                <option value="ISFP">ISFP (探险家)</option>
                <option value="ESTP">ESTP (企业家)</option>
                <option value="ESFP">ESFP (表演者)</option>
              </optgroup>
              {/* ... other optgroups same as before ... */}
            </select>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`mt-8 p-6 text-3xl font-extrabold text-white rounded-3xl transition-all duration-300 transform shadow-xl ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed scale-95' 
                : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 hover:shadow-2xl hover:-translate-y-1'
            }`}
          >
            {isLoading ? '🪐 正在连接宇宙能量...' : '🔮 开启深度命理推演'}
          </button>
        </form>

        {/* =====================================================================
            4. Result Display Layer (The Outcome)
            ===================================================================== */}
        {errorMessage && (
          <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-3xl text-red-600 font-bold">
            ⚠️ {errorMessage}
          </div>
        )}

        {fortuneResult && (
          <div className="mt-12 p-8 bg-orange-50 border-2 border-orange-200 rounded-3xl text-left shadow-inner">
            <h2 className="text-3xl font-black text-orange-800 mb-6 border-b-2 border-orange-200 pb-2 flex items-center gap-2">
              📜 命理推演结果
            </h2>
            <div className="text-xl text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
              {fortuneResult}
            </div>
            <p className="mt-8 text-center text-gray-500 italic">
              * AI 推演仅供娱乐，命运掌握在自己手中 *
            </p>
          </div>
        )}
      </div>
    </main>
  );
}