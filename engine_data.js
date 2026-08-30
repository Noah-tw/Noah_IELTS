(function () {
  "use strict";

  const G = (window.NoahIELTS = window.NoahIELTS || {});
  const rawSpeaking = String(window.CAMBRIDGE_SPEAKING_SOURCE || "");
  const speakingHints = window.SPEAKING_HINTS && typeof window.SPEAKING_HINTS === "object"
    ? window.SPEAKING_HINTS
    : {};
  const speakingHintExpansionMeta = window.SPEAKING_HINT_EXPANSION_META
    && typeof window.SPEAKING_HINT_EXPANSION_META === "object"
    ? window.SPEAKING_HINT_EXPANSION_META
    : { files: [], added: 0, questionsExpanded: {}, issues: ["Speaking expansion data was not loaded."] };
  const speakingHintQualityMeta = window.SPEAKING_HINT_QUALITY_META
    && typeof window.SPEAKING_HINT_QUALITY_META === "object"
    ? window.SPEAKING_HINT_QUALITY_META
    : { replacements: 0, questions: 0, issues: ["Speaking quality data was not loaded."] };
  const speakingHintEditorialMeta = window.SPEAKING_HINT_EDITORIAL_META
    && typeof window.SPEAKING_HINT_EDITORIAL_META === "object"
    ? window.SPEAKING_HINT_EDITORIAL_META
    : { replacements: 0, questions: 0, reviewedRiskPairs: 0, issues: ["Speaking editorial data was not loaded."] };
  const speakingHintC10V26Meta = window.SPEAKING_HINT_C10_V26_META
    && typeof window.SPEAKING_HINT_C10_V26_META === "object"
    ? window.SPEAKING_HINT_C10_V26_META
    : { reviewedQuestions: 0, replacements: 0, additions: 0, changedQuestions: 0, issues: ["C10 V26 editorial data was not loaded."] };
  const speakingHintC11V27Meta = window.SPEAKING_HINT_C11_V27_META
    && typeof window.SPEAKING_HINT_C11_V27_META === "object"
    ? window.SPEAKING_HINT_C11_V27_META
    : { reviewedQuestions: 0, replacements: 0, additions: 0, changedQuestions: 0, issues: ["C11 V27 editorial data was not loaded."] };
  const speakingHintC12V28Meta = window.SPEAKING_HINT_C12_V28_META
    && typeof window.SPEAKING_HINT_C12_V28_META === "object"
    ? window.SPEAKING_HINT_C12_V28_META
    : { reviewedQuestions: 0, replacements: 0, additions: 0, changedQuestions: 0, issues: ["C12 V28 editorial data was not loaded."] };
  const speakingHealthRepairV29Meta = window.SPEAKING_HEALTH_REPAIR_V29_META
    && typeof window.SPEAKING_HEALTH_REPAIR_V29_META === "object"
    ? window.SPEAKING_HEALTH_REPAIR_V29_META
    : { reviewedQuestions: 0, replacements: 0, changedQuestions: 0, issues: ["V29 Speaking health-repair data was not loaded."] };
  const speakingC13EditorialV30Meta = window.SPEAKING_C13_EDITORIAL_V30_META
    && typeof window.SPEAKING_C13_EDITORIAL_V30_META === "object"
    ? window.SPEAKING_C13_EDITORIAL_V30_META
    : { reviewedQuestions: 0, replacements: 0, additions: 0, changedQuestions: 0, issues: ["V30 Cambridge 13 Speaking editorial data was not loaded."] };
  const speakingHealthRepairV42Metas = [
    window.SPEAKING_HEALTH_REPAIR_C10_C13_V42_META,
    window.SPEAKING_HEALTH_REPAIR_C14_V42_META,
    window.SPEAKING_HEALTH_REPAIR_C15_V42_META,
    window.SPEAKING_HEALTH_REPAIR_C16_V42_META,
    window.SPEAKING_HEALTH_REPAIR_C17_V42_META,
    window.SPEAKING_HEALTH_REPAIR_C18_V42_META,
    window.SPEAKING_HEALTH_REPAIR_C19_V42_META,
    window.SPEAKING_HEALTH_REPAIR_C20_V42_META,
  ].map((meta, index) => (meta && typeof meta === "object"
    ? meta
    : { reviewedQuestions: 0, replacements: 0, changedQuestions: 0, issues: [`V42 Speaking repair layer ${index + 1} was not loaded.`] }));
  const rawWritingQuestions = Array.isArray(window.WRITING_SOURCE_QUESTIONS)
    ? window.WRITING_SOURCE_QUESTIONS.slice()
    : [];
  const specialWritingSets = Array.isArray(window.WRITING_PARAPHRASE_DATA)
    ? window.WRITING_PARAPHRASE_DATA.slice()
    : [];
  const writingKeywordPacks = window.WRITING_KEYWORD_PACKS && typeof window.WRITING_KEYWORD_PACKS === "object"
    ? window.WRITING_KEYWORD_PACKS
    : {};
  const writingExactKeywordGlossary = window.WRITING_EXACT_KEYWORD_GLOSSARY && typeof window.WRITING_EXACT_KEYWORD_GLOSSARY === "object"
    ? window.WRITING_EXACT_KEYWORD_GLOSSARY
    : {};
  const writingExactQuestionKeywords = window.WRITING_EXACT_QUESTION_KEYWORDS && typeof window.WRITING_EXACT_QUESTION_KEYWORDS === "object"
    ? window.WRITING_EXACT_QUESTION_KEYWORDS
    : {};
  const writingProcessKeywordAuditV26 = window.WRITING_PROCESS_KEYWORD_AUDIT_V26
    && typeof window.WRITING_PROCESS_KEYWORD_AUDIT_V26 === "object"
    ? window.WRITING_PROCESS_KEYWORD_AUDIT_V26
    : { reviewedQuestions: [], authoredCards: 0, distinctCardCounts: [], issues: ["V26 process-keyword audit data was not loaded."] };
  const writingKeywordNotes = window.WRITING_KEYWORD_NOTES && typeof window.WRITING_KEYWORD_NOTES === "object"
    ? window.WRITING_KEYWORD_NOTES
    : {};
  const writingKeywordThirdExamples = window.WRITING_KEYWORD_THIRD_EXAMPLES && typeof window.WRITING_KEYWORD_THIRD_EXAMPLES === "object"
    ? window.WRITING_KEYWORD_THIRD_EXAMPLES
    : {};
  const writingQuestionParaphrases = window.WRITING_QUESTION_PARAPHRASES && typeof window.WRITING_QUESTION_PARAPHRASES === "object"
    ? window.WRITING_QUESTION_PARAPHRASES
    : {};
  const writingC11EditorialAuditV27 = window.WRITING_C11_EDITORIAL_AUDIT_V27
    && typeof window.WRITING_C11_EDITORIAL_AUDIT_V27 === "object"
    ? window.WRITING_C11_EDITORIAL_AUDIT_V27
    : { reviewedQuestions: [], keywordCards: 0, keywordAdditions: 0, keywordReplacements: 0, distinctKeywordCounts: [], paraphrasePoints: 0, paraphraseVariants: 0, paraphraseRepairs: 0, issues: ["C11 V27 Writing audit data was not loaded."] };
  const writingC12EditorialAuditV28 = window.WRITING_C12_EDITORIAL_AUDIT_V28
    && typeof window.WRITING_C12_EDITORIAL_AUDIT_V28 === "object"
    ? window.WRITING_C12_EDITORIAL_AUDIT_V28
    : { reviewedQuestions: [], keywordCards: 0, keywordAdditions: 0, keywordReplacements: 0, distinctKeywordCounts: [], paraphrasePoints: 0, paraphraseVariants: 0, paraphraseRepairs: 0, issues: ["C12 V28 Writing audit data was not loaded."] };
  const writingHealthRepairV29Meta = window.WRITING_HEALTH_REPAIR_V29_META
    && typeof window.WRITING_HEALTH_REPAIR_V29_META === "object"
    ? window.WRITING_HEALTH_REPAIR_V29_META
    : { reviewedQuestions: [], keywordCards: 0, scopedKeywordCards: 0, distinctKeywordCounts: [], paraphrasePoints: 0, paraphraseVariants: 0, paraphraseRepairs: 0, issues: ["V29 Writing health-repair data was not loaded."] };
  const writingC11C12RecalibrationV30Meta = window.WRITING_C11_C12_RECALIBRATION_V30_META
    && typeof window.WRITING_C11_C12_RECALIBRATION_V30_META === "object"
    ? window.WRITING_C11_C12_RECALIBRATION_V30_META
    : { reviewedQuestions: [], keywordCards: 0, scopedKeywordCards: 0, distinctKeywordCounts: [], maxCardTermWords: 0, issues: ["V30 Cambridge 11–12 recalibration data was not loaded."] };
  const writingC13EditorialV30Meta = window.WRITING_C13_EDITORIAL_V30_META
    && typeof window.WRITING_C13_EDITORIAL_V30_META === "object"
    ? window.WRITING_C13_EDITORIAL_V30_META
    : { reviewedQuestions: [], keywordCards: 0, scopedKeywordCards: 0, distinctKeywordCounts: [], paraphrasePoints: 0, paraphraseVariants: 0, paraphraseRepairs: 0, maxCardTermWords: 0, issues: ["V30 Cambridge 13 Writing editorial data was not loaded."] };
  const writingExactEssayLexicalUpgradeV31Meta = window.WRITING_C11_C13_EXACT_ESSAY_LEXICAL_UPGRADE_V31_META
    && typeof window.WRITING_C11_C13_EXACT_ESSAY_LEXICAL_UPGRADE_V31_META === "object"
    ? window.WRITING_C11_C13_EXACT_ESSAY_LEXICAL_UPGRADE_V31_META
    : { reviewedQuestions: [], questionCardCounts: {}, cardCount: 0, scopedCardCount: 0, upgradeEvidenceCards: 0, issues: ["V31 exact-essay lexical-upgrade data was not loaded."] };
  const writingC14ExactEssayV32Meta = window.WRITING_C14_EXACT_ESSAY_LEXICAL_UPGRADE_V32_META
    && typeof window.WRITING_C14_EXACT_ESSAY_LEXICAL_UPGRADE_V32_META === "object"
    ? window.WRITING_C14_EXACT_ESSAY_LEXICAL_UPGRADE_V32_META
    : { reviewedQuestions: [], questionCardCounts: {}, cardCount: 0, scopedCardCount: 0, upgradeEvidenceCards: 0, issues: ["V32 Cambridge 14 exact-essay lexical-upgrade data was not loaded."] };
  const writingC15ExactEssayV33Meta = window.WRITING_C15_EXACT_ESSAY_LEXICAL_UPGRADE_V33_META
    && typeof window.WRITING_C15_EXACT_ESSAY_LEXICAL_UPGRADE_V33_META === "object"
    ? window.WRITING_C15_EXACT_ESSAY_LEXICAL_UPGRADE_V33_META
    : { reviewedQuestions: [], questionCardCounts: {}, cardCount: 0, scopedCardCount: 0, upgradeEvidenceCards: 0, issues: ["V33 Cambridge 15 exact-essay lexical-upgrade data was not loaded."] };
  const writingFiveQuestionKeywordFixV35Meta = window.WRITING_FIVE_QUESTION_KEYWORD_FIX_V35_META
    && typeof window.WRITING_FIVE_QUESTION_KEYWORD_FIX_V35_META === "object"
    ? window.WRITING_FIVE_QUESTION_KEYWORD_FIX_V35_META
    : { reviewedQuestions: [], questionCardCounts: {}, cardCount: 0, scopedCardCount: 0, evidenceCardCount: 0, issues: ["V35 five-question keyword-fix data was not loaded."] };
  const writingTwentyFiveQuestionUpdateV36Meta = window.WRITING_TWENTY_FIVE_QUESTION_UPDATE_V36_META
    && typeof window.WRITING_TWENTY_FIVE_QUESTION_UPDATE_V36_META === "object"
    ? window.WRITING_TWENTY_FIVE_QUESTION_UPDATE_V36_META
    : null;
  const writingFifteenQuestionUpdateV37Meta = window.WRITING_FIFTEEN_QUESTION_UPDATE_V37_META
    && typeof window.WRITING_FIFTEEN_QUESTION_UPDATE_V37_META === "object"
    ? window.WRITING_FIFTEEN_QUESTION_UPDATE_V37_META
    : null;
  const writingTwentyFiveQuestionUpdateV38Meta = window.WRITING_TWENTY_FIVE_QUESTION_UPDATE_V38_META
    && typeof window.WRITING_TWENTY_FIVE_QUESTION_UPDATE_V38_META === "object"
    ? window.WRITING_TWENTY_FIVE_QUESTION_UPDATE_V38_META
    : null;
  const writingTenQuestionUpdateV39Meta = window.WRITING_TEN_QUESTION_UPDATE_V39_META
    && typeof window.WRITING_TEN_QUESTION_UPDATE_V39_META === "object"
    ? window.WRITING_TEN_QUESTION_UPDATE_V39_META
    : null;
  const writingFirstTwentySemanticReauditV39Meta = window.WRITING_FIRST_TWENTY_SEMANTIC_REAUDIT_V39_META
    && typeof window.WRITING_FIRST_TWENTY_SEMANTIC_REAUDIT_V39_META === "object"
    ? window.WRITING_FIRST_TWENTY_SEMANTIC_REAUDIT_V39_META
    : null;
  const writingQuestions4160ExampleReauditV39Meta = window.WRITING_QUESTIONS_41_60_EXAMPLE_REAUDIT_V39_META
    && typeof window.WRITING_QUESTIONS_41_60_EXAMPLE_REAUDIT_V39_META === "object"
    ? window.WRITING_QUESTIONS_41_60_EXAMPLE_REAUDIT_V39_META
    : null;
  const writingQuestions6180ExampleReauditV39Meta = window.WRITING_QUESTIONS_61_80_EXAMPLE_REAUDIT_V39_META
    && typeof window.WRITING_QUESTIONS_61_80_EXAMPLE_REAUDIT_V39_META === "object"
    ? window.WRITING_QUESTIONS_61_80_EXAMPLE_REAUDIT_V39_META
    : null;
  const writingComprehensive180ReauditV39Meta = window.WRITING_COMPREHENSIVE_1_80_REAUDIT_V39_META
    && typeof window.WRITING_COMPREHENSIVE_1_80_REAUDIT_V39_META === "object"
    ? window.WRITING_COMPREHENSIVE_1_80_REAUDIT_V39_META
    : null;
  const writingParaphraseRepairV40Meta = window.WRITING_PARAPHRASE_V40_META
    && typeof window.WRITING_PARAPHRASE_V40_META === "object"
    ? window.WRITING_PARAPHRASE_V40_META
    : null;
  const writingParaphraseConfigurationIssues = [];

  function ensureTest(map, book, test) {
    const id = `C${book}-T${test}`;
    if (!map.has(id)) {
      map.set(id, {
        id,
        book,
        test,
        part1: { topic: "", questions: [] },
        part2: { prompt: "", bullets: [], closing: "" },
        part3: { sections: [] },
      });
    }
    return map.get(id);
  }

  function parseSpeakingSource(source) {
    const tests = new Map();
    const lines = source.replace(/^\uFEFF/, "").split(/\r?\n/);
    let part = 0;
    let current = null;
    let currentSection = null;
    let part3Break = false;

    lines.forEach((rawLine) => {
      const line = rawLine.trim();
      const partMatch = line.match(/^\[PART\s+([123])\]$/i);
      if (partMatch) {
        part = Number(partMatch[1]);
        current = null;
        currentSection = null;
        part3Break = false;
        return;
      }

      const testMatch = line.match(/^C(\d+)-Task(\d+)$/);
      if (testMatch) {
        current = ensureTest(tests, Number(testMatch[1]), Number(testMatch[2]));
        currentSection = null;
        part3Break = false;
        return;
      }

      if (!line) {
        if (part === 3 && currentSection && currentSection.questions.length) part3Break = true;
        return;
      }
      if (!current || /^=+$/.test(line)) return;

      if (part === 1) {
        if (line.startsWith("Topic:")) current.part1.topic = line.slice(6).trim();
        else if (line.startsWith("- ")) current.part1.questions.push(line.slice(2));
        return;
      }

      if (part === 2) {
        if (line === "You should say:") return;
        if (line.startsWith("- ")) current.part2.bullets.push(line.slice(2));
        else if (!current.part2.prompt) current.part2.prompt = line;
        else if (/^and\s/i.test(line)) current.part2.closing = line;
        return;
      }

      if (part === 3) {
        if (line.startsWith("Discussion topic:")) {
          currentSection = { topic: line.slice("Discussion topic:".length).trim(), questions: [] };
          current.part3.sections.push(currentSection);
          part3Break = false;
          return;
        }
        if (line.startsWith("- ")) {
          if (!currentSection || (part3Break && currentSection.questions.length >= 3)) {
            currentSection = { topic: "", questions: [] };
            current.part3.sections.push(currentSection);
          }
          currentSection.questions.push(line.slice(2));
          part3Break = false;
        }
      }
    });

    return Array.from(tests.values()).sort((a, b) => a.book - b.book || a.test - b.test);
  }

  const speakingTests = parseSpeakingSource(rawSpeaking);
  const readingWords = Array.isArray(window.VOCAB_DATA && window.VOCAB_DATA.english_ielts)
    ? window.VOCAB_DATA.english_ielts.slice()
    : [];
  function writingCategory(question) {
    const text = String(question.prompt || "");
    if (question.task === 1) {
      if (/\b(map|maps|plan|plans|layout|site|road access|floor plan|harbour)\b/i.test(text)) return "Maps & Plans";
      if (/\b(diagram|process|manufactur|produced|produce electricity|generated|recycling)\b/i.test(text)) return "Processes";
      const visualTypes = ["chart", "graph", "table"].filter((type) => new RegExp(`\\b${type}s?\\b`, "i").test(text));
      return visualTypes.length > 1 ? "Mixed Data" : "Charts & Graphs";
    }
    if (/Discuss both (?:these )?views/i.test(text)) return "Discussion";
    if (/advantages?(?:[^.?!]{0,90})disadvantages?|disadvantages?(?:[^.?!]{0,90})advantages?/i.test(text)) return "Advantages & Disadvantages";
    if (/positive or (?:a )?negative/i.test(text)) return "Positive / Negative";
    if (/agree or disagree|extent do you (?:agree|think)/i.test(text)) return "Opinion";
    if (/\bWhy\b|What are the reasons|What can be done|What problems|What solutions|How can/i.test(text)) return "Two-part Question";
    return "Two-part Question";
  }

  // V13: WRITING_QUESTION_KEYWORDS - hand-picked Additional Keywords per
  // question, added because the old design drew randomly from one small
  // pool SHARED by every question in a category (e.g. all 24 Task 1
  // "Charts & Graphs"/"Mixed Data" questions drew from the same 17-word
  // task1Data pool, regardless of whether a given chart was even the right
  // shape for a word like "plateau" or "overtake"). Every id here is an
  // EXISTING id already defined somewhere in WRITING_KEYWORD_PACKS - no new
  // dictionary content was authored this round, this only changes WHICH
  // existing words a specific question draws, picked by actually reading
  // that question's prompt and its chart type (time-series vs snapshot
  // comparison vs ranking vs table) rather than by category alone.
  // V14: extended the same table to the 9 Task 1 "Maps & Plans" and 7
  // "Processes" questions, closing out Task 1 (40/40 now curated). Same
  // method as V13: read each question's actual prompt (map/plan topic, or
  // process/diagram subject) and picked the 6 best-fitting existing ids
  // from task1Map/task1Process plus a small number of genuinely relevant
  // cross-pack words (e.g. transport words for a road-access question,
  // renewable-energy/sustainability/recycle from the environment pack for
  // energy or recycling diagrams) - no new dictionary entries authored.
  // task1Map only has 13 words and task1Process only has 13, so with 6
  // picked per question some reuse across these 16 is unavoidable (same
  // honest caveat as V13's Data questions) - "construct"/"redevelopment"/
  // "land-use" and "subsequently"/"undergo" recur because they are
  // genuinely the most broadly useful words in their pack, not because no
  // effort was made to differentiate; each question still gets at least a
  // couple of words picked specifically for what that map/diagram shows.
  // V15: started Task 2 (argumentative essay questions). Task 2's lookup
  // is NOT limited to one formatPack - keywordsForQuestion() looks up
  // every id across ALL packs (see allPacksLookup below), so a Task 2
  // question can freely draw from transport/economy/environment/
  // education/health/technology/society/work/culture/generic, whichever
  // genuinely fits its actual argument - not just the one topicPack its
  // prompt happens to regex-match into. Closed out 3 full topic
  // categories this round (grouped by topicPackName(), not by test
  // number): Education (10/10), Work (5/5), Society (5/5) = 20/40 Task 2
  // questions now curated, each picked by actually reading that essay's
  // two-sided argument (e.g. C13-W2-T1 "living where you must speak a
  // foreign language causes social problems" -> isolation/assimilation/
  // multiculturalism, not just generic "education" words). No new
  // dictionary entries authored - every id below already existed in
  // WRITING_KEYWORD_PACKS before this round.
  // V16: finished Task 2 - closed out the remaining 6 topicPackName()
  // categories: Transport (5), Environment (4), Economy (2), Culture (4),
  // Health (3), Technology (2) = 20/20 remaining questions, so Task 2 is
  // now 40/40 curated (same as Task 1's 40/40 from V14) - both tasks are
  // fully hand-picked now, 80/80 total. Same method as V13-V15: read each
  // essay's actual two-sided argument and picked 6 fitting ids, freely
  // crossing packs (e.g. C17-W2-T3 "should trained professionals be
  // required to work where they trained" is classified "transport" by
  // topicPackName() only because its text contains the word "training" -
  // a false-positive regex match, not an actual transport topic - so its
  // 6 picked words are skill-shortage/workforce/career-progression/
  // public-health/inequality/globalisation from the work/health/society/
  // culture packs instead, since the override lookup is pack-agnostic and
  // topicPackName() was formerly used by the random fallback. V21 no longer
  // uses that fallback; the note is retained only as history for why some
  // older category labels look surprising.
  // V21 correction: C12-W2-T7 still uses its hand-authored special
  // paraphrase points, but its Additional Keywords now come through this
  // same exact-question table instead of a separate hidden array. This
  // prevents the special case from silently ignoring future additions here.
  // No new dictionary entries authored in this table - every id below
  // already existed in WRITING_KEYWORD_PACKS before this round.
  // Populated so far: all 40 Task 1 questions (V13+V14) + all 40 Task 2
  // questions (V15: Education/Work/Society, V16: Transport/Environment/
  // Economy/Culture/Health/Technology) = 80/80. WRITING_QUESTION_KEYWORDS
  // now covers every writing question in the app. V21 removes the old
  // pool-random fallback entirely: a new question without its own curated
  // list fails the data audit instead of receiving generalized filler.
  const WRITING_QUESTION_KEYWORDS = {
    "C11-W1-T1": ["proportion", "negligible", "minority", "disparity", "sustainability", "widespread"],
    "C11-W1-T2": ["proportion", "majority", "minority", "double", "marginal", "literacy"],
    "C11-W1-T3": ["peak", "decline", "fluctuation", "disparity", "per-capita", "carbon-emissions"],
    "C11-W1-T4": ["surge", "proportion", "majority", "minority", "disparity", "heritage-site"],
    "C12-W1-T5": ["proportion", "majority", "minority", "marginal", "disparity", "sedentary-lifestyle"],
    "C12-W1-T7": ["surge", "peak", "decline", "fluctuation", "plateau", "obesity"],
    "C13-W1-T2": ["overtake", "decline", "majority", "minority", "marginal", "urbanisation"],
    "C13-W1-T3": ["outnumber", "disparity", "overtake", "per-capita", "majority", "economic-growth"],
    "C14-W1-T1": ["proportion", "majority", "minority", "marginal", "nutrient", "malnutrition"],
    "C14-W1-T2": ["surge", "decline", "marginal", "disparity", "proportion", "revenue"],
    "C15-W1-T1": ["majority", "minority", "proportion", "disparity", "negligible", "community"],
    "C15-W1-T2": ["surge", "peak", "decline", "fluctuation", "plateau", "commercialisation"],
    "C15-W1-T4": ["majority", "minority", "proportion", "disparity", "career-progression", "wage"],
    "C16-W1-T1": ["surge", "decline", "overtake", "plateau", "proportion", "quality-of-life"],
    "C17-W1-T2": ["proportion", "majority", "minority", "marginal", "disparity", "public-expenditure"],
    "C17-W1-T3": ["proportion", "majority", "minority", "double", "marginal", "disposable-income"],
    "C17-W1-T4": ["surge", "decline", "overtake", "fluctuation", "disparity", "recession"],
    "C18-W1-T1": ["surge", "projection", "disparity", "proportion", "urbanisation", "majority"],
    "C18-W1-T2": ["majority", "minority", "proportion", "marginal", "disparity", "wage"],
    "C18-W1-T4": ["surge", "fluctuation", "peak", "decline", "plateau", "inflation"],
    "C19-W1-T1": ["surge", "decline", "peak", "overtake", "fluctuation", "community"],
    "C19-W1-T4": ["proportion", "majority", "minority", "marginal", "disparity", "subculture"],
    "C20-W1-T1": ["surge", "decline", "peak", "overtake", "disparity", "demographic-change"],
    "C20-W1-T3": ["proportion", "majority", "minority", "marginal", "disparity", "prevalent"],
    // V14 — Maps & Plans (9)
    "C12-W1-T6": ["redevelopment", "pedestrianisation", "residential", "commercial", "land-use", "green-space"],
    "C13-W1-T1": ["accessibility", "congestion", "bottleneck", "infrastructure", "construct", "connectivity"],
    "C13-W1-T4": ["redevelopment", "expand", "relocate", "renovate", "layout", "demolish"],
    "C14-W1-T4": ["green-space", "demolish", "expand", "layout", "land-use", "renovate"],
    "C16-W1-T3": ["redevelopment", "expand", "construct", "relocate", "accessibility", "infrastructure"],
    "C17-W1-T1": ["land-use", "residential", "commercial", "demolish", "redevelopment", "construct"],
    "C18-W1-T3": ["layout", "expand", "renovate", "relocate", "accessibility", "construct"],
    "C19-W1-T2": ["redevelopment", "commercial", "residential", "renovate", "land-use", "construct"],
    "C20-W1-T2": ["land-use", "expand", "demolish", "relocate", "renovate", "layout"],
    // V14 — Processes (7)
    "C12-W1-T8": ["extract", "heat", "convert", "stage", "undergo", "renewable-energy"],
    "C14-W1-T3": ["stage", "convert", "convey", "undergo", "renewable-energy", "sustainability"],
    "C15-W1-T3": ["stage", "heat", "cool", "package", "raw-material", "subsequently"],
    "C16-W1-T2": ["raw-material", "extract", "filter", "heat", "by-product", "subsequently"],
    "C16-W1-T4": ["sort", "filter", "convert", "stage", "undergo", "recycle"],
    "C19-W1-T3": ["raw-material", "extract", "convert", "by-product", "subsequently", "renewable-energy"],
    "C20-W1-T4": ["raw-material", "extract", "convert", "stage", "subsequently", "sort"],
    // V15 — Task 2, Education (10)
    "C11-W2-T3": ["critical-thinking", "cultural-identity", "multiculturalism", "globalisation", "lifelong-learning", "literacy"],
    "C12-W2-T5": ["data-privacy", "monopoly", "investment", "technological-innovation", "critical-thinking", "revenue"],
    "C12-W2-T8": ["social-cohesion", "civic-engagement", "well-being", "beneficial", "detrimental", "controversial"],
    "C13-W2-T1": ["isolation", "assimilation", "multiculturalism", "cultural-identity", "social-cohesion", "civic-engagement"],
    "C13-W2-T3": ["curriculum", "critical-thinking", "cultural-heritage", "cultural-identity", "technological-innovation", "academic-attainment"],
    "C15-W2-T4": ["beneficial", "detrimental", "counterproductive", "inequality", "well-being", "academic-attainment"],
    "C17-W2-T2": ["screen-time", "social-media", "digital-literacy", "mental-health", "well-being", "sedentary-lifestyle"],
    "C18-W2-T2": ["extracurricular", "curriculum", "academic-attainment", "lifelong-learning", "critical-thinking", "tuition-fees"],
    "C19-W2-T1": ["academic-attainment", "career-progression", "social-cohesion", "productivity", "civic-engagement", "workforce"],
    "C20-W2-T2": ["academic-attainment", "extracurricular", "inequality", "work-life-balance", "curriculum", "well-being"],
    // V15 — Task 2, Work (5)
    "C14-W2-T1": ["job-security", "burnout", "career-progression", "cost-of-living", "well-being", "minimum-wage"],
    "C14-W2-T4": ["entrepreneurship", "work-life-balance", "job-security", "flexible-hours", "remote-work", "burnout"],
    "C16-W2-T2": ["consumer-behaviour", "commercialisation", "mass-media", "economic-growth", "sustainability", "detrimental"],
    "C17-W2-T1": ["entrepreneurship", "career-progression", "job-security", "beneficial", "detrimental", "controversial"],
    "C19-W2-T2": ["work-life-balance", "flexible-hours", "burnout", "overtime", "productivity", "well-being"],
    // V15 — Task 2, Society (5)
    "C12-W2-T6": ["demographic-change", "ageing-population", "workforce", "economic-growth", "welfare-state", "social-mobility"],
    "C13-W2-T2": ["unprecedented", "counterproductive", "consumer-behaviour", "well-being", "beneficial", "detrimental"],
    "C15-W2-T1": ["investment", "disposable-income", "quality-of-life", "social-mobility", "inequality", "cost-of-living"],
    "C18-W2-T3": ["urbanisation", "demographic-change", "community", "quality-of-life", "economic-growth", "workforce"],
    "C18-W2-T4": ["ageing-population", "welfare-state", "life-expectancy", "workforce", "chronic-disease", "quality-of-life"],
    // V16 — Task 2, Culture (4)
    "C14-W2-T3": ["social-cohesion", "cultural-identity", "multiculturalism", "globalisation", "mass-media", "tradition"],
    "C15-W2-T3": ["consumer-behaviour", "mass-media", "commercialisation", "widespread", "prevalent", "social-norms"],
    "C16-W2-T1": ["cultural-heritage", "heritage-site", "tradition", "authenticity", "community", "cultural-identity"],
    "C20-W2-T4": ["globalisation", "social-norms", "consumer-behaviour", "mass-media", "cultural-identity", "authenticity"],
    // V16 — Task 2, Economy (2)
    "C11-W2-T4": ["economic-growth", "quality-of-life", "well-being", "sustainability", "inequality", "resource-allocation"],
    "C19-W2-T3": ["disposable-income", "cost-of-living", "wage", "inflation", "investment", "job-security"],
    // V16 — Task 2, Environment (4)
    "C11-W2-T2": ["recycle", "sustainability", "conservation", "pollution", "carbon-footprint", "feasible"],
    "C13-W2-T4": ["malnutrition", "inequality", "equitable-access", "resource-allocation", "sustainability", "welfare-state"],
    "C14-W2-T2": ["biodiversity", "conservation", "ecosystem", "climate-change", "pollution", "greenhouse-gas"],
    "C20-W2-T1": ["equitable-access", "sanitation", "public-expenditure", "subsidise", "inequality", "welfare-state"],
    // V16 — Task 2, Health (3)
    "C16-W2-T3": ["obesity", "chronic-disease", "public-health", "taxation", "consumer-behaviour", "nutrient"],
    "C17-W2-T4": ["public-health", "chronic-disease", "well-being", "prevalent", "controversial", "preventive-care"],
    "C19-W2-T4": ["globalisation", "consumer-behaviour", "carbon-footprint", "sustainability", "economic-growth", "quality-of-life"],
    // V16 — Task 2, Technology (2)
    "C15-W2-T2": ["mass-media", "digital-literacy", "digital-divide", "revenue", "misinformation", "tradition"],
    "C18-W2-T1": ["technological-innovation", "quality-of-life", "public-health", "sustainability", "artificial-intelligence", "well-being"],
    // V16 — Task 2, Transport (5). V21 routes the special C12-W2-T7 question
    // through this table too, so this row is live rather than shadowed.
    "C11-W2-T1": ["infrastructure", "congestion", "carbon-emissions", "connectivity", "public-expenditure", "subsidy"],
    "C12-W2-T7": ["infrastructure", "congestion", "connectivity", "cost-effective", "high-speed-rail", "public-expenditure", "bottleneck"],
    "C16-W2-T4": ["automation", "artificial-intelligence", "job-security", "redundancy", "congestion", "cybersecurity"],
    "C17-W2-T3": ["skill-shortage", "workforce", "career-progression", "public-health", "inequality", "globalisation"],
    "C20-W2-T3": ["carbon-emissions", "climate-change", "carbon-footprint", "economic-growth", "revenue", "sustainability"],
  };

  function cloneKeyword(question, keyword) {
    const examples = Array.isArray(keyword.examples) ? keyword.examples.slice() : [];
    const examplesZh = Array.isArray(keyword.examplesZh) ? keyword.examplesZh.slice() : [];
    const third = writingKeywordThirdExamples[keyword.id];
    if (third && examples.length < 3) {
      examples.push(third.en);
      examplesZh.push(third.zh);
    }
    return Object.assign({}, keyword, {
      id: `${question.id}-${keyword.id}`,
      note: writingKeywordNotes[keyword.id] || keyword.note || "",
      examples,
      examplesZh,
    });
  }

  // V21: every current Writing question has an exact, hand-curated keyword
  // list in WRITING_QUESTION_KEYWORDS. Do not randomly draw a fixed-size
  // subset from broad category packs: that both hid newly authored entries
  // behind a cap and could surface generic words that were not chosen for the
  // actual prompt. Return every unique curated entry for the exact question.
  // The list may contain any number of ids; the renderer and progress counter
  // already derive their lengths dynamically.
  const writingKeywordConfigurationIssues = [];

  function keywordsForQuestion(question) {
    // V23 exact-question files supersede the legacy six-item table whenever
    // they are present.  The legacy table remains only as a backwards-safe
    // fallback for an incomplete deployment; a healthy V23 audit requires all
    // 80 exact entries below.
    const override = writingExactQuestionKeywords[question.id] || WRITING_QUESTION_KEYWORDS[question.id];
    if (!Array.isArray(override) || !override.length) {
      writingKeywordConfigurationIssues.push(`${question.id}: missing curated keyword list`);
      return [];
    }

    const allPacksLookup = {};
    Object.keys(writingKeywordPacks).forEach((packName) => {
      (writingKeywordPacks[packName] || []).forEach((entry) => {
        if (!(entry.id in allPacksLookup)) allPacksLookup[entry.id] = entry;
      });
    });
    Object.keys(writingExactKeywordGlossary).forEach((id) => {
      const entry = writingExactKeywordGlossary[id];
      if (entry && typeof entry === "object") allPacksLookup[id] = entry;
    });

    const chosen = [];
    override.forEach((id) => {
      const keyword = allPacksLookup[id];
      if (!keyword) {
        writingKeywordConfigurationIssues.push(`${question.id}: unknown keyword id ${id}`);
        return;
      }
      if (!chosen.some((item) => item.id === id)) chosen.push(keyword);
    });
    return chosen.map((keyword) => cloneKeyword(question, keyword));
  }

  function makePoint(field, match, focus, lead, reveals, id) {
    const source = match[0];
    const focusText = typeof focus === "function" ? focus(match) : focus;
    const focusIndex = source.toLowerCase().indexOf(String(focusText).toLowerCase());
    if (focusIndex < 0) return null;
    return {
      id,
      field,
      source,
      sourceSegments: [
        ...(focusIndex ? [{ text: source.slice(0, focusIndex) }] : []),
        { text: source.slice(focusIndex, focusIndex + focusText.length), highlight: true },
        ...(focusIndex + focusText.length < source.length ? [{ text: source.slice(focusIndex + focusText.length) }] : []),
      ],
      branches: reveals.map((reveal) => ({ lead: typeof lead === "function" ? lead(match) : lead, reveal: typeof reveal === "function" ? reveal(match) : reveal })),
      _focusStart: match.index + focusIndex,
      _focusLength: focusText.length,
    };
  }

  function collectWritingPoints(question) {
    const points = [];
    // Only the real question prompt is eligible for paraphrase practice.
    // Timing, word-count and repeated IELTS answer instructions are context,
    // not language the learner needs to rewrite.
    const used = { prompt: [] };
    const tones = ["green", "blue", "purple", "orange", "water", "amber"];

    function add(field, regex, focus, lead, reveals, id) {
      // No length cap: every non-overlapping rule that genuinely matches this
      // exact prompt becomes practice content. Content authors can therefore
      // add question-specific points without an engine constant silently
      // discarding them later.
      const text = question.prompt;
      const match = regex.exec(text);
      if (!match) return;
      const point = makePoint(field, match, focus, lead, reveals, `${question.id}-${id}`);
      if (!point) return;
      const start = point._focusStart;
      const end = start + point._focusLength;
      if (used[field].some((range) => start < range.end && end > range.start)) return;
      used[field].push({ start, end });
      points.push(point);
    }

    if (question.task === 1) {
      // --- Tier 0: question-specific phrases (checked first, so each ---
      // --- question's own unique wording - e.g. "the police budget", ---
      // --- "the floor plan", "a public library" - wins any overlap   ---
      // --- against a generic connector below).                      ---
      // --- Mirrors the Task 2 Tier 0-3 structure below; Task 1 has   ---
      // --- no equivalent to Task 2's "opinion-verb" middle tier, so  ---
      // --- this is a 2-tier split (specific first, generic last)    ---
      // --- rather than 4. Reordered V11->V12 - verified empirically ---
      // --- against all 40 real Task 1 prompts to change zero        ---
      // --- candidate pools; see the V12 handover for the full       ---
      // --- per-question comparison.                                 ---
add("prompt", /plans for (?:its|the site's|the site’s) development/i, (match) => match[0], "", ["proposals for its redevelopment", "planned changes to the area", "redevelopment plans for the site"], "development");add("prompt", /after redevelopment/i, "after redevelopment", "", ["following redevelopment", "once it has been redeveloped", "subsequent to redevelopment", "upon completion of redevelopment"], "redevelopment");add("prompt", /is manufactured from/i, "is manufactured from", "", ["is produced from", "is made using", "is created from"], "manufactured");add("prompt", /is used to produce/i, "is used to produce", "", ["is employed to generate", "is utilised in the production of", "serves to create"], "produce");add("prompt", /road access to/i, "road access to", "", ["routes leading to", "ways of reaching", "transport links to"], "road-access");add("prompt", /production and consumption of/i, "production and consumption of", "", ["generation and use of", "output and usage of", "production levels and demand for"], "production-consumption");add("prompt", /how electricity is generated/i, "how electricity is generated", "", ["the way electricity is produced", "the process used to generate electricity", "how electrical power is created"], "electricity-generated");add("prompt", /when it first opened/i, "when it first opened", "", ["at the time of its opening", "when it initially opened", "at its original opening"], "first-opened");add("prompt", /the results of a survey/i, "the results of a survey", "", ["the findings of a survey", "survey results", "the outcomes of a questionnaire"], "survey-results");add("prompt", /are manufactured/i, "are manufactured", "", ["are produced", "are made", "are created"], "manufactured-plural");add("prompt", /after finishing/i, "after finishing", "", ["following completion of", "after completing", "once they had finished"], "after-finishing");add("prompt", /the salaries of/i, "the salaries of", "", ["the earnings of", "the income levels of", "the pay received by"], "salaries");add("prompt", /the manufacturing process/i, "the manufacturing process", "", ["the production process", "the process of manufacture", "the sequence used in production"], "manufacturing-process");add("prompt", /the process for (making|recycling)/i, (match) => match[0], "", [
        (match) => `the method used for ${match[1].toLowerCase()}`,
        (match) => `the stages involved in ${match[1].toLowerCase()}`,
        (match) => `the procedure for ${match[1].toLowerCase()}`,
      ], "process-for");add("prompt", /planned future development/i, "planned future development", "", ["proposed redevelopment", "future development plans", "intended changes to the area"], "future-development");add("prompt", /the police budget/i, "the police budget", "", ["funding for the police", "the policing budget", "money allocated to the police"], "police-budget");add("prompt", /spent their weekly income/i, "spent their weekly income", "", ["allocated their weekly earnings", "used their weekly income", "distributed their weekly budget"], "weekly-income");add("prompt", /the floor plan/i, "the floor plan", "", ["the interior layout", "the building plan", "the internal arrangement"], "floor-plan");add("prompt", /how it looks (?:now|today)/i, (match) => match[0], "", ["its present appearance", "what it is like at present", "its current layout", "its current state"], "looks-now");add("prompt", /the location and types of/i, "the location and types of", "", ["the venues and kinds of", "the places and forms of", "where different kinds of"], "location-types");add("prompt", /the total population of/i, "the total population of", "", ["the overall number of residents in", "the entire population of", "the total number of people living in"], "total-population");add("prompt", /the same site today/i, "the same site today", "", ["the site in its current form", "the present-day site", "what the site looks like now"], "site-today");add("prompt", /a public library/i, "a public library", "", ["a municipal library", "a local public library", "a community library", "a lending library"], "public-library");
      // --- V18 addition: 53 new Task 1 candidate phrases across 35 ---
      // --- questions, closing out the 35/40 Task 1 prompts that     ---
      // --- matched fewer than 4 candidates (same "problem B" tracked ---
      // --- since V13, Task 2 half closed out in V17). Some short      ---
      // --- process-diagram prompts genuinely could not reach 4 - see  ---
      // --- the V18 handover for the honest per-question list.         ---
      add("prompt", /in six areas of the world/i, (match) => match[0], "", ["across six regions of the world", "in six different parts of the world", "across six areas worldwide"], "six-areas-world");
      add("prompt", /water used for/i, (match) => match[0], "", ["water consumed for", "water allocated to", "water utilised for"], "water-used-for");
      add("prompt", /British students at one university in England/i, (match) => match[0], "", ["British students studying at one university in England", "students from Britain enrolled at one English university", "British undergraduates at a university in England"], "british-students-one-university");
      add("prompt", /speak other languages in addition to English/i, (match) => match[0], "", ["speak languages other than English", "speak a foreign language besides English", "communicate in languages other than English"], "speak-other-languages");
      add("prompt", /in 2000 and 2010/i, (match) => match[0], "", ["in the years 2000 and 2010", "during 2000 and 2010", "in both 2000 and 2010"], "in-2000-2010");
      add("prompt", /average carbon dioxide \(CO₂\) emissions/i, (match) => match[0], "", ["the average level of CO₂ emissions", "mean carbon dioxide output", "average CO₂ emission levels"], "co2-emissions");
      add("prompt", /the year before and the year after/i, (match) => match[0], "", ["the year prior to and the year following", "the years immediately before and after", "the twelve months before and after"], "year-before-after");
      add("prompt", /the result of surveys asking visitors how satisfied they were with their visit/i, (match) => match[0], "", ["the findings of visitor-satisfaction surveys", "survey results on how satisfied visitors were", "the outcomes of surveys into visitor satisfaction"], "survey-visitor-satisfaction");
      add("prompt", /did regular physical activity/i, (match) => match[0], "", ["took part in regular exercise", "engaged in regular physical activity", "exercised on a regular basis"], "regular-physical-activity");
      add("prompt", /Australian men and women/i, (match) => match[0], "", ["men and women in Australia", "Australian adults, both men and women", "adult Australians of both sexes"], "australian-men-women");
      add("prompt", /the centre of a small town called Islip as it is now/i, (match) => match[0], "", ["Islip town centre in its current form", "how Islip town centre currently looks", "the present-day layout of Islip town centre"], "islip-town-centre-now");
      add("prompt", /ate in fast food restaurants/i, (match) => match[0], "", ["ate at fast-food outlets", "dined in fast-food restaurants", "had meals at fast-food restaurants"], "ate-fast-food");
      add("prompt", /people in the USA/i, (match) => match[0], "", ["people in the United States", "Americans", "people living in the USA"], "people-in-usa");
      add("prompt", /geothermal energy/i, (match) => match[0], "", ["heat energy from the earth", "energy derived from the earth's heat", "geothermal power"], "geothermal-energy");
      add("prompt", /in 2007 and in 2010/i, (match) => match[0], "", ["in both 2007 and 2010", "during 2007 and 2010", "in the years 2007 and 2010"], "in-2007-2010");
      add("prompt", /a city hospital/i, (match) => match[0], "", ["a hospital in the city", "an urban hospital", "a city-based hospital"], "city-hospital");
      add("prompt", /households in owned and rented accommodation/i, (match) => match[0], "", ["households living in owned or rented housing", "homes that are either owned or rented", "households occupying owned versus rented accommodation"], "owned-rented-accommodation");
      add("prompt", /in England and Wales/i, (match) => match[0], "", ["across England and Wales", "in England and Wales combined", "throughout England and Wales"], "england-wales");
      add("prompt", /electricity in 2014/i, (match) => match[0], "", ["electricity during 2014", "electrical power in 2014", "electricity throughout 2014"], "electricity-2014");
      add("prompt", /the layout of a university.s sports centre/i, (match) => match[0], "", ["how a university sports centre is laid out", "the internal layout of a university sports centre", "the design of a university sports centre"], "university-sports-centre-layout");
      add("prompt", /may be unhealthy if eaten too much/i, (match) => match[0], "", ["can be harmful if consumed in excess", "may be bad for health when eaten in large amounts", "could be unhealthy if consumed excessively"], "unhealthy-eaten-too-much");
      add("prompt", /in typical meals/i, (match) => match[0], "", ["in a typical meal", "in an average meal", "within standard meals"], "in-typical-meals");
      add("prompt", /the value of one country.s exports in various categories/i, (match) => match[0], "", ["the value of a country's exports across different categories", "how much a country's exports were worth in various categories", "the value of exports by category for one country"], "value-exports-categories");
      add("prompt", /each category of exports/i, (match) => match[0], "", ["every export category", "each type of export", "individual export categories"], "each-category-exports");
      add("prompt", /in a hydroelectric power station/i, (match) => match[0], "", ["at a hydroelectric power plant", "inside a hydroelectric power station", "within a hydroelectric plant"], "hydroelectric-power-station");
      add("prompt", /the same park today/i, (match) => match[0], "", ["the same park in its current form", "how the park looks today", "the park as it appears now"], "same-park-today");
      add("prompt", /a public park/i, (match) => match[0], "", ["a public green space", "a municipal park", "a local public park"], "public-park");
      add("prompt", /people.s coffee and tea buying and drinking/i, (match) => match[0], "", ["people's habits of buying and drinking coffee and tea", "how people buy and drink coffee and tea", "people's coffee- and tea-consumption patterns"], "coffee-tea-buying-drinking");
      add("prompt", /in five Australian cities/i, (match) => match[0], "", ["across five cities in Australia", "in five cities within Australia", "across five Australian urban centres"], "five-australian-cities");
      add("prompt", /tourists visiting a particular Caribbean island/i, (match) => match[0], "", ["tourists who visited a particular Caribbean island", "visitors to a specific island in the Caribbean", "people travelling to a particular Caribbean island"], "tourists-caribbean-island");
      add("prompt", /instant noodles/i, (match) => match[0], "", ["packaged instant noodles", "pre-cooked instant noodles", "instant noodle products"], "instant-noodles");
      add("prompt", /Anthropology graduates from one university/i, (match) => match[0], "", ["graduates in Anthropology from a single university", "students who graduated in Anthropology from one university", "one university's Anthropology graduates"], "anthropology-graduates");
      add("prompt", /the anthropologists in work after five years/i, (match) => match[0], "", ["anthropologists who were employed five years later", "those working as anthropologists five years on", "anthropology graduates in employment five years afterwards"], "anthropologists-work-five-years");
      add("prompt", /for making sugar from sugar cane/i, (match) => match[0], "", ["used to produce sugar from sugar cane", "by which sugar is made from sugar cane", "for producing sugar out of sugar cane"], "making-sugar-from-cane");
      add("prompt", /the site of an airport/i, (match) => match[0], "", ["an airport site", "the location of an airport", "an airport's site"], "site-of-airport");
      add("prompt", /plastic bottles/i, (match) => match[0], "", ["plastic bottle waste", "used plastic bottles", "discarded plastic bottles"], "plastic-bottles");
      add("prompt", /an industrial area in the town of Norbiton/i, (match) => match[0], "", ["an industrial zone in Norbiton", "a manufacturing area within the town of Norbiton", "an industrial district in Norbiton"], "industrial-area-norbiton");
      add("prompt", /in one area of Britain/i, (match) => match[0], "", ["in a single region of Britain", "within one part of Britain", "in one particular part of Britain"], "one-area-of-britain");
      add("prompt", /where the money came from/i, (match) => match[0], "", ["the sources of the funding", "where the funds originated", "the money's sources"], "where-money-came-from");
      add("prompt", /families in one country/i, (match) => match[0], "", ["households in a single country", "families within one nation", "families in a particular country"], "families-in-one-country");
      add("prompt", /in 1968 and in 2018/i, (match) => match[0], "", ["in both 1968 and 2018", "during 1968 and 2018", "in the years 1968 and 2018"], "in-1968-2018");
      add("prompt", /the population in four Asian countries living in cities/i, (match) => match[0], "", ["city-dwellers as a share of the population in four Asian countries", "people living in urban areas across four Asian countries", "the urban population in four Asian countries"], "population-asian-countries-cities");
      add("prompt", /from 1970 to 2020/i, (match) => match[0], "", ["between 1970 and 2020", "over the 1970–2020 period", "during the years 1970 to 2020"], "from-1970-2020");
      add("prompt", /households in the US/i, (match) => match[0], "", ["households in the United States", "US households", "households across the United States"], "households-in-us");
      add("prompt", /in 2007, 2011 and 2015/i, (match) => match[0], "", ["in the years 2007, 2011 and 2015", "across 2007, 2011 and 2015", "during 2007, 2011 and 2015"], "in-2007-2011-2015");
      add("prompt", /three metals during 2014/i, (match) => match[0], "", ["three types of metal in 2014", "three different metals over the course of 2014", "three metals throughout 2014"], "three-metals-2014");
      add("prompt", /a harbour in 2000/i, (match) => match[0], "", ["a harbour as it was in 2000", "a harbour back in 2000", "a harbour during the year 2000"], "harbour-in-2000");
      add("prompt", /a biofuel called ethanol/i, (match) => match[0], "", ["the biofuel ethanol", "a biofuel known as ethanol", "ethanol, a type of biofuel"], "biofuel-ethanol");
      add("prompt", /young people in a town in Australia/i, (match) => match[0], "", ["young people living in an Australian town", "young residents of a town in Australia", "young people in an Australian town"], "young-people-town-australia");
      add("prompt", /dance classes/i, (match) => match[0], "", ["dance lessons", "dance courses", "classes in dance"], "dance-classes");
      add("prompt", /the site of a farm in 1950/i, (match) => match[0], "", ["a farm site as it was in 1950", "the location of a farm back in 1950", "a farm's site in the year 1950"], "site-farm-1950");
      add("prompt", /in a town called Little Chalfont/i, (match) => match[0], "", ["in the town of Little Chalfont", "located in Little Chalfont", "in Little Chalfont, a town"], "town-little-chalfont");
      add("prompt", /\bbamboo\b/i, (match) => match[0], "", ["bamboo plants", "the bamboo plant", "raw bamboo"], "bamboo-term");
      // --- Tier 1: generic / near-universal patterns (e.g. "changes", ---
      // --- "the number", the "shows"->"illustrates" opener). These    ---
      // --- recur across most Task 1 prompts, so they are checked last ---
      // --- - a last-resort fallback once every more specific phrase   ---
      // --- above has already had first claim on any overlapping text. ---
add("prompt", /The (?:(?:first|second|third|two|three) )?(?:bar )?(?:charts?|graphs?|diagrams?|maps?|plans?|tables?) below (?:shows|show|gives|give)/i,
        (match) => /(?:shows|show|gives|give)$/i.exec(match[0])[0],
        (match) => match[0].replace(/(?:shows|show|gives|give)$/i, ""),
        [
          (match) => /(?:shows|gives)$/i.test(match[0]) ? "illustrates" : "illustrate",
          (match) => /(?:shows|gives)$/i.test(match[0]) ? "presents" : "present",
          (match) => /(?:shows|gives)$/i.test(match[0]) ? "depicts" : "depict",
          (match) => /(?:shows|gives)$/i.test(match[0]) ? "reveals" : "reveal",
        ], "visual-verb");add("prompt", /(?:give|gives) information (?:about|on)/i, (match) => match[0], "", [
        (match) => /^gives/i.test(match[0]) ? "provides data on" : "provide data on",
        (match) => /^gives/i.test(match[0]) ? "presents information about" : "present information about",
        (match) => /^gives/i.test(match[0]) ? "offers details on" : "offer details on",
      ], "information");add("prompt", /the percentage/i, "percentage", "the ", ["proportion", "share", "percentage figure", "fraction"], "percentage");add("prompt", /the proportions/i, "proportions", "the ", ["percentages", "shares", "relative figures"], "proportions");add("prompt", /the number(?!s)/i, "number", "the ", ["figure", "total number", "numerical figure", "count"], "number");add("prompt", /the numbers/i, "numbers", "the ", ["figures", "totals", "numerical values", "quantities"], "numbers");add("prompt", /changes/i, "changes", "", ["variations", "shifts", "alterations", "fluctuations"], "changes");add("prompt", /different (?:purposes|age groups|activities|categories|types|areas|countries|metals)/i, (match) => match[0], "", [
        (match) => `various ${match[0].replace(/^different /i, "")}`,
        (match) => `a range of ${match[0].replace(/^different /i, "")}`,
        (match) => `several ${match[0].replace(/^different /i, "")}`,
        (match) => `a variety of ${match[0].replace(/^different /i, "")}`,
      ], "different");add("prompt", /between (\d{4}) and (\d{4})/i, (match) => match[0], "", [
        (match) => `from ${match[1]} to ${match[2]}`,
        (match) => `over the ${match[1]}–${match[2]} period`,
        (match) => `during the period spanning ${match[1]} to ${match[2]}`,
        (match) => `across the ${match[1]}–${match[2]} timeframe`,
      ], "period");add("prompt", /the amount of/i, "amount", "the ", ["quantity", "volume", "level"], "amount");add("prompt", /\bcompares?\b/i, (match) => match[0], "", [
        (match) => /^compares$/i.test(match[0]) ? "contrasts" : "contrast",
        (match) => /^compares$/i.test(match[0]) ? "presents a comparison of" : "present a comparison of",
        (match) => /^compares$/i.test(match[0]) ? "sets out differences between" : "set out differences between",
      ], "compare");add("prompt", /compared with/i, "compared with", "", ["in comparison with", "relative to", "when contrasted with"], "compared-with");add("prompt", /the average (percentages?|monthly change)/i, (match) => match[0], "", [
        (match) => /percentage/i.test(match[1]) ? "the mean percentage figures" : "the mean monthly variation",
        (match) => /percentage/i.test(match[1]) ? "the typical percentage shares" : "the typical month-to-month change",
        (match) => /percentage/i.test(match[1]) ? "the overall percentage proportions" : "the average monthly movement",
        (match) => /percentage/i.test(match[1]) ? "the average percentage levels" : "the average monthly fluctuation",
      ], "average");add("prompt", /different (?:stages|locations|forms|sources|modes|means)/i, (match) => match[0], "", [
        (match) => `various ${match[0].replace(/^different /i, "")}`,
        (match) => `a range of ${match[0].replace(/^different /i, "")}`,
        (match) => `several ${match[0].replace(/^different /i, "")}`,
      ], "different-extra");add("prompt", /is produced/i, "is produced", "", ["is made", "is created", "is manufactured"], "produced");
      // --- V8 addition: 16 new Task 1 candidate phrases. Picked by loading ---
      // --- the full engine and measuring how many candidates each of the  ---
      // --- 40 real Task 1 prompts had before this change - 39/40 had fewer ---
      // --- than the 4-slot cap (mostly only 2), so every phrase below is a ---
      // --- real, previously-uncovered substring from an actual prompt,    ---
      // --- chosen to raise that prompt's candidate count. See the V8      ---
      // --- handover for the full before/after numbers.                   ---
      add("prompt", /per person/i, "per person", "", ["per capita", "per head of population", "for each individual"], "per-person");
      add("prompt", /refurbished/i, "refurbished", "", ["renovated", "modernised", "upgraded"], "refurbished");
      add("prompt", /how frequently/i, "how frequently", "", ["how often", "at what frequency", "how regularly"], "how-frequently");
      add("prompt", /habits/i, "habits", "", ["patterns", "tendencies", "practices"], "habits");
      add("prompt", /amount of time spent/i, "amount of time spent", "", ["the length of time spent", "how much time was spent", "the time devoted to"], "time-spent");
      add("prompt", /how it was distributed/i, "how it was distributed", "", ["how it was allocated", "how it was shared out", "how it was divided up"], "distributed");
      add("prompt", /shops that closed/i, "shops that closed", "", ["shops that shut down", "shops that ceased trading", "shops that went out of business"], "shops-closed");
      add("prompt", /new shops that opened/i, "new shops that opened", "", ["new shops that launched", "new shops that started trading", "new shops that were established"], "shops-opened");
      add("prompt", /predictions/i, "predictions", "", ["projections", "forecasts", "estimates"], "predictions");
      add("prompt", /annual income/i, "annual income", "", ["yearly income", "yearly earnings", "income per year"], "annual-income");
      add("prompt", /the prices of/i, "the prices of", "", ["the costs of", "the price levels of", "the pricing of"], "prices-of");
      add("prompt", /for the period (\d{4}) to (\d{4})/i, (match) => match[0], "", [
        (match) => `over the ${match[1]}–${match[2]} period`,
        (match) => `throughout the ${match[1]}–${match[2]} period`,
        (match) => `spanning the years ${match[1]} to ${match[2]}`,
      ], "for-the-period");
      add("prompt", /currently/i, "currently", "", ["at present", "presently", "at the moment"], "currently");
      add("prompt", /the population of/i, "the population of", "", ["the number of residents in", "the number of people living in", "the inhabitants of"], "population-of");
      add("prompt", /the top ten countries/i, "the top ten countries", "", ["the ten leading countries", "the ten most prominent countries", "the ten highest-ranking countries"], "top-ten-countries");
      add("prompt", /three types of/i, "three types of", "", ["three kinds of", "three categories of", "three sorts of"], "three-types-of");
    } else {
      // --- Tier 0: question-specific phrases (checked first, so each ---
      // --- question's own unique wording fills the 4 slots before any ---
      // --- generic connector is ever reached).                         ---
      add("prompt", /a legal requirement/i, "a legal requirement", "", ["legally compulsory", "mandatory under the law", "required by law"], "legal-requirement");
      add("prompt", /the only way to/i, "the only way to", "", ["the sole method of", "the only means of", "the single most effective way to"], "only-way");
      add("prompt", /the only reason for/i, "the only reason for", "", ["the sole reason for", "the single reason why", "the only motive for"], "only-reason");
      add("prompt", /in order to/i, "in order to", "", ["so as to", "with the aim of", "for the purpose of"], "in-order-to");
      add("prompt", /Some people claim that/i, "claim that", "Some people ", ["assert that", "contend that", "maintain that"], "claim-that");
      add("prompt", /equally important/i, "equally important", "", ["just as important", "of equal importance", "no less important"], "equally-important");
      add("prompt", /economic progress/i, "economic progress", "", ["economic development", "progress in economic terms", "growth in the economy"], "economic-progress");
      add("prompt", /share as much information as possible/i, "share as much information as possible", "", ["disseminate information as widely as possible", "make information as widely available as possible", "circulate information as freely as possible"], "share-information");
      add("prompt", /make their own choices/i, "make their own choices", "", ["exercise their own judgement", "make independent decisions", "decide matters for themselves"], "own-choices");
      add("prompt", /matters that affect them/i, "matters that affect them", "", ["issues that concern them", "matters relevant to their own lives", "decisions that have a direct impact on them"], "affect-them");
      add("prompt", /have to speak a foreign language/i, "have to speak a foreign language", "", ["are required to speak a foreign language", "must communicate in a foreign language", "need to use a foreign language on a daily basis"], "have-to-speak");
      add("prompt", /too many choices/i, "too many choices", "", ["an excessive number of choices", "an overwhelming range of options", "far too many options"], "too-many-choices");
      add("prompt", /in today.s world/i, (match) => match[0], "", ["in the present day", "in contemporary society", "in the current era"], "todays-world");
      add("prompt", /the advances made in agriculture/i, "the advances made in agriculture", "", ["progress in agricultural methods", "advancements in farming techniques", "improvements in agricultural technology"], "agricultural-advances");
      add("prompt", /go hungry/i, "go hungry", "", ["suffer from hunger", "lack sufficient food", "experience food shortages"], "go-hungry");
      add("prompt", /accept a bad situation/i, "accept a bad situation", "", ["tolerate an unfavourable situation", "come to terms with a difficult circumstance", "put up with an unsatisfactory situation"], "accept-bad-situation");
      add("prompt", /the loss of particular species of plants and animals/i, (match) => match[0], "", ["the extinction of certain plant and animal species", "the disappearance of specific species", "declining numbers of particular plants and animals"], "loss-of-species");
      add("prompt", /bringing people of different cultures and ages together/i, (match) => match[0], "", ["uniting people from different cultural and age groups", "connecting individuals across cultures and generations", "drawing together people of diverse backgrounds and ages"], "bringing-people-together");
      add("prompt", /to be self-employed/i, "to be self-employed", "", ["to work for themselves", "to run their own business", "to become their own employer"], "self-employed");
      add("prompt", /owning a home/i, "owning a home", "", ["owning one's own property", "being a homeowner", "having home ownership"], "owning-a-home");
      add("prompt", /read everything they want online without paying/i, (match) => match[0], "", ["access all the content they want online free of charge", "read whatever they wish on the internet at no cost", "obtain all their reading material online without any payment"], "read-online-without-paying");
      add("prompt", /persuading us to buy things/i, "persuading us to buy things", "", ["convincing consumers to make purchases", "influencing people to buy products", "encouraging consumers to spend money"], "persuading-us-to-buy");
      add("prompt", /no longer pay attention to it/i, "no longer pay attention to it", "", ["no longer take any notice of it", "have stopped paying it much attention", "tend to overlook it"], "no-longer-pay-attention");
      add("prompt", /achieve anything if they try hard enough/i, (match) => match[0], "", ["accomplish anything through sufficient effort", "reach any goal provided they work hard enough", "succeed at anything as long as they try their best"], "achieve-anything");
      add("prompt", /finding out about the history of the house or building they live in/i, (match) => match[0], "", ["discovering the history of their own home", "learning about the past of the property they live in", "researching the background of their house or building"], "finding-out-about-history");
      add("prompt", /emphasise that their products are new in some way/i, (match) => match[0], "", ["stress the novelty of their products", "highlight that their products offer something new", "underline the innovative features of their products"], "emphasise-new");
      add("prompt", /contain high levels of sugar/i, "contain high levels of sugar", "", ["have a high sugar content", "are heavily sweetened", "contain excessive amounts of sugar"], "high-levels-of-sugar");
      add("prompt", /take risks/i, "take risks", "", ["take chances", "embrace risk", "accept an element of risk"], "take-risks");
      add("prompt", /alternative medicines and treatments/i, "alternative medicines and treatments", "", ["non-conventional medicines and remedies", "complementary treatments", "unconventional forms of treatment"], "alternative-medicines");
      add("prompt", /work in the country where they did their training/i, (match) => match[0], "", ["remain in the country in which they trained", "practise in their country of training", "stay and work where they originally trained"], "work-in-training-country");
      add("prompt", /improve people.s lives/i, (match) => match[0], "", ["improve the quality of people's lives", "enhance human wellbeing", "make people's lives better"], "improve-peoples-lives");
      add("prompt", /give all their time and attention to studying for a qualification/i, (match) => match[0], "", ["devote all their time to gaining a qualification", "focus exclusively on their qualification studies", "commit their full attention to a single course of study"], "give-time-to-qualification");
      add("prompt", /moving to cities/i, "moving to cities", "", ["relocating to urban areas", "migrating to cities", "shifting to city life"], "moving-to-cities");
      add("prompt", /living longer than ever before/i, "living longer than ever before", "", ["enjoying greater longevity than in the past", "surviving to a greater age than previous generations", "living to an older age than ever before"], "living-longer");
      add("prompt", /cooperate more/i, "cooperate more", "", ["collaborate to a greater extent", "work together more closely", "place greater emphasis on cooperation"], "cooperate-more");
      add("prompt", /save money for their future/i, "save money for their future", "", ["set money aside for the future", "put aside savings for later life", "build up financial savings for the future"], "save-money-for-future");
      add("prompt", /food produced all over the world/i, "food produced all over the world", "", ["food sourced from every corner of the globe", "produce grown in countries across the world", "food imported from around the globe"], "food-produced-all-over-world");
      add("prompt", /global fashion trends/i, "global fashion trends", "", ["international fashion movements", "worldwide fashion influences", "fashion trends from around the world"], "global-fashion-trends");
      add("prompt", /spend hours every day on their smartphones/i, (match) => match[0], "", ["spend several hours a day using their smartphones", "devote a significant portion of each day to their smartphones", "spend a considerable amount of time on their smartphones daily"], "spend-hours-smartphones");
      // --- Tier 1: existing question-specific phrases ---
      add("prompt", /it is necessary to/i, "necessary to", "it is ", ["essential to", "vital to", "crucial to"], "necessary");
      add("prompt", /should spend money on/i, "spend money on", "should ", ["allocate funds to", "invest in", "direct funding towards"], "spending");
      add("prompt", /should be required to/i, "required to", "should be ", ["obliged to", "expected to", "mandated to"], "required");
      add("prompt", /more and more people/i, "more and more people", "", ["a growing number of people", "an increasing proportion of people", "an ever-larger number of individuals"], "more-people");
      add("prompt", /a growing number of people/i, "a growing number of people", "", ["an increasing number of individuals", "more and more people", "an expanding share of the population"], "growing-number");
      add("prompt", /rather than/i, "rather than", "", ["instead of", "as opposed to", "in preference to", "as an alternative to"], "rather-than");
      add("prompt", /a relatively large number of young adults/i, "a relatively large number of young adults", "", ["a comparatively high proportion of young adults", "a sizeable young-adult population", "a relatively high share of young adults"], "young-adults");
      add("prompt", /the advantages? of ([^.?!]+?) outweigh the disadvantages?/i, (match) => match[0], "", [
        (match) => `the benefits of ${match[1]} exceed the drawbacks`,
        (match) => `the positive effects of ${match[1]} are greater than the negative ones`,
        (match) => `the merits of ${match[1]} are more significant than its limitations`,
        (match) => `the case in favour of ${match[1]} is stronger than the case against it`,
      ], "outweigh");
      add("prompt", /cause serious social problems/i, "cause serious social problems", "", ["lead to major social difficulties", "create significant societal problems", "result in severe social challenges"], "social-problems");
      add("prompt", /practical problems/i, "practical problems", "", ["day-to-day difficulties", "practical challenges", "problems in everyday life"], "practical-problems");
      add("prompt", /In the future/i, "In the future", "", ["In the years ahead", "Looking ahead", "In the coming decades", "Going forward"], "future");
      add("prompt", /driverless vehicles/i, "driverless vehicles", "", ["autonomous vehicles", "self-driving transport", "fully automated vehicles"], "driverless");
      add("prompt", /should be shorter/i, "should be shorter", "", ["ought to be reduced", "should involve fewer working days", "needs to be shortened"], "shorter");
      add("prompt", /a longer weekend/i, "a longer weekend", "", ["an extended weekend", "more days off at the weekend", "a lengthier weekend break"], "longer-weekend");
      add("prompt", /a basic human right/i, "a basic human right", "", ["a fundamental human entitlement", "an essential right for everyone", "a core human right"], "human-right");
      add("prompt", /free of charge/i, "free of charge", "", ["at no cost", "without payment", "provided for free"], "free");
      add("prompt", /long school holidays/i, "long school holidays", "", ["extended school breaks", "lengthy school vacations", "long periods away from school"], "school-holidays");
      add("prompt", /environmental benefits/i, "environmental benefits", "", ["advantages for the environment", "ecological gains", "positive environmental effects"], "environmental-benefits");
      add("prompt", /stop flying altogether/i, "stop flying altogether", "", ["avoid air travel completely", "give up flying entirely", "cease travelling by plane"], "stop-flying");
      // --- Tier 2: opinion-verb openers (useful register variation, ---
      // --- but recur across several questions, so lower priority).   ---
      add("prompt", /Some people think/i, "think", "Some people ", ["argue that", "believe", "take the view that"], "some-think");
      add("prompt", /Some people believe/i, "believe", "Some people ", ["argue that", "take the view that", "maintain that", "hold that"], "some-believe");
      add("prompt", /Others believe/i, "believe", "Others ", ["argue that", "maintain that", "hold the view that", "contend that"], "others-believe");
      add("prompt", /Other people think/i, "think", "Other people ", ["believe", "take the view that", "maintain that", "hold the opinion that"], "other-think");
      add("prompt", /Some people say/i, "say", "Some people ", ["argue that", "maintain that", "contend that", "assert that"], "some-say");
      add("prompt", /Many governments think/i, "think", "Many governments ", ["believe", "take the view that", "maintain that"], "governments-think");
      // --- Tier 3: generic single/double-word connectors. These appear ---
      // --- in dozens of prompts, so they are only used as a last-resort ---
      // --- filler once every more specific pattern above has been tried. ---
      add("prompt", /is very important/i, "very important", "is ", ["of great importance", "highly significant", "crucial"], "very-important");
      add("prompt", /is important/i, "important", "is ", ["essential", "of considerable importance", "significant", "vital"], "important");
      add("prompt", /the most important/i, "most important", (match) => match[0].slice(0, 4), ["primary", "most significant", "foremost", "principal"], "most-important");
      add("prompt", /In many countries/i, "In many countries", "", ["Across numerous countries", "In a wide range of nations", "In countries around the world", "In a large number of countries"], "many-countries");
      add("prompt", /In some countries/i, "In some countries", "", ["In certain countries", "Within a number of nations", "In several parts of the world", "In a number of countries"], "some-countries");
      add("prompt", /Nowadays/i, (match) => match[0], "", [
        (match) => /^[A-Z]/.test(match[0]) ? "At present" : "at present",
        (match) => /^[A-Z]/.test(match[0]) ? "In contemporary society" : "in contemporary society",
        (match) => /^[A-Z]/.test(match[0]) ? "In the modern era" : "in the modern era",
        (match) => /^[A-Z]/.test(match[0]) ? "These days" : "these days",
      ], "nowadays");
      add("prompt", /governments/i, (match) => match[0], "", [
        (match) => /^[A-Z]/.test(match[0]) ? "Authorities" : "authorities",
        (match) => /^[A-Z]/.test(match[0]) ? "National administrations" : "national administrations",
        (match) => /^[A-Z]/.test(match[0]) ? "Public authorities" : "public authorities",
        (match) => /^[A-Z]/.test(match[0]) ? "Policymakers" : "policymakers",
      ], "governments");
      add("prompt", /children/i, "children", "", ["young people", "younger members of society", "the younger generation", "youngsters"], "children");
      add("prompt", /people/i, "people", "", ["individuals", "members of the public", "members of society", "citizens"], "people");
      // --- V8 addition: 16 new Task 2 candidate phrases, same rationale as ---
      // --- the Task 1 block above - 25/40 Task 2 prompts had fewer than 4 ---
      // --- candidates. Four of these (in-addition-to, very-fast-trains,   ---
      // --- so-common, usually) are the specific phrases the V6 handover   ---
      // --- had already earmarked but never wrote in; the rest are new.   ---
      add("prompt", /in addition to/i, "in addition to", "", ["as well as", "on top of", "besides"], "in-addition-to");
      add("prompt", /very fast trains/i, "very fast trains", "", ["high-speed trains", "high-velocity trains", "high-speed rail links"], "very-fast-trains");
      add("prompt", /so common/i, "so common", "", ["so widespread", "so prevalent", "so pervasive"], "so-common");
      add("prompt", /usually/i, "usually", "", ["typically", "generally", "commonly"], "usually");
      add("prompt", /printed newspapers or books/i, "printed newspapers or books", "", ["hard-copy newspapers or books", "physical newspapers or books", "paper-based newspapers or books"], "printed-newspapers");
      add("prompt", /In some cultures/i, "In some cultures", "", ["In certain cultures", "In particular cultures", "Within certain societies"], "some-cultures");
      add("prompt", /should be made more expensive/i, "should be made more expensive", "", ["should be priced higher", "should carry a higher price", "should cost more"], "more-expensive");
      add("prompt", /\baim of\b/i, "aim of", "", ["goal of", "purpose of", "objective of"], "aim-of");
      add("prompt", /\bworkers\b/i, "workers", "", ["employees", "members of staff", "the workforce"], "workers");
      add("prompt", /Access to clean water/i, "Access to clean water", "", ["Having access to clean water", "The availability of clean water", "Clean-water access"], "access-to-water");
      add("prompt", /close for two months or more/i, "close for two months or more", "", ["shut for two months or longer", "remain closed for two months or more", "are closed for at least two months"], "close-two-months");
      add("prompt", /such a strong influence/i, "such a strong influence", "", ["such a powerful influence", "such a major influence", "such a considerable influence"], "strong-influence");
      add("prompt", /as well as/i, "as well as", "", ["along with", "in addition to", "together with"], "as-well-as");
      add("prompt", /In spite of/i, "In spite of", "", ["Despite", "Notwithstanding", "Even with"], "in-spite-of");
      add("prompt", /instead of visiting their usual doctor/i, "instead of visiting their usual doctor", "", ["rather than seeing their usual doctor", "in place of consulting their usual doctor", "rather than consulting their regular doctor"], "instead-of-doctor");
      add("prompt", /\bconsumers\b/i, "consumers", "", ["shoppers", "buyers", "customers"], "consumers");
      // --- V17 addition: 32 new Task 2 candidate phrases across 19 ---
      // --- questions, closing out most of the 21/39 Task 2 prompts   ---
      // --- that matched fewer than 4 candidates. Two questions       ---
      // --- (C17-W2-T2, C19-W2-T3) genuinely could not be extended -  ---
      // --- see the V17 handover for why. Task 1's 35 low-coverage    ---
      // --- prompts are still untouched - next round's target.        ---
      add("prompt", /\brailways\b/i, "railways", "", ["rail networks", "the railway system", "train services"], "railways-noun");
      add("prompt", /\broads\b/i, "roads", "", ["the road network", "road infrastructure", "the road system"], "roads-noun");
      add("prompt", /At the present time/i, "At the present time", "", ["At present", "Currently", "Nowadays"], "present-time");
      add("prompt", /the population of some countries/i, "the population of some countries", "", ["some countries' populations", "the populations of certain nations", "the number of people living in some countries"], "population-of-some-countries");
      add("prompt", /Others argue that/i, "argue", "Others ", ["contend", "maintain", "assert"], "others-argue");
      add("prompt", /an unsatisfactory job or shortage of money/i, "an unsatisfactory job or shortage of money", "", ["a job they are dissatisfied with or a lack of money", "an unfulfilling job or financial hardship", "a disappointing career or a shortage of funds"], "unsatisfactory-job-shortage-money");
      add("prompt", /the main environmental problem of our time/i, "the main environmental problem of our time", "", ["today's foremost environmental issue", "the most pressing environmental problem we currently face", "the leading environmental concern of the present day"], "main-environmental-problem");
      add("prompt", /Others say that/i, "say", "Others ", ["argue that", "contend that", "maintain that"], "others-say");
      add("prompt", /music is a good way of/i, "music is a good way of", "", ["music functions as an effective way to", "music offers an effective means of", "music acts as a valuable way of"], "music-good-way");
      add("prompt", /nobody will buy/i, "nobody will buy", "", ["no one will purchase", "people will stop buying", "no one will choose to buy"], "nobody-will-buy");
      add("prompt", /because they will be able to/i, "will be able to", "because they ", ["since they will have the ability to", "as they will be capable of", "given that they can"], "will-be-able-to");
      add("prompt", /are often told that/i, "are often told that", "", ["are frequently taught that", "are regularly informed that", "often hear that"], "often-told-that");
      add("prompt", /giving children this message/i, "giving children this message", "", ["conveying this message to children", "passing this message on to children", "teaching children this idea"], "giving-children-message");
      add("prompt", /How can people research this/i, "How can people research this", "", ["What methods can people use to look into this", "How might people go about researching this", "In what ways can individuals investigate this"], "how-can-people-research");
      add("prompt", /In their advertising, businesses/i, "In their advertising, businesses", "", ["When advertising their products, companies", "In their marketing, businesses", "In promotional campaigns, companies"], "in-their-advertising");
      add("prompt", /which causes many health problems/i, "which causes many health problems", "", ["which leads to numerous health issues", "which is responsible for a range of health problems", "which contributes to serious health issues"], "causes-health-problems");
      add("prompt", /Many manufactured food and drink products/i, "Many manufactured food and drink products", "", ["A large number of processed food and drink items", "Many processed foods and beverages", "A wide range of manufactured food and drink products"], "manufactured-food-drink");
      add("prompt", /all cars, buses and trucks will be driverless/i, "all cars, buses and trucks will be driverless", "", ["every car, bus and truck will operate without a driver", "cars, buses and trucks will all be self-driving", "all road vehicles will operate without any driver"], "cars-buses-trucks-driverless");
      add("prompt", /travelling inside these vehicles/i, "travelling inside these vehicles", "", ["riding inside these vehicles", "on board these vehicles", "inside these self-driving vehicles"], "travelling-inside-vehicles");
      add("prompt", /\bscience\b/i, "science", "", ["scientific research", "scientific study", "scientific work"], "science-noun");
      add("prompt", /Some university students want to learn about other subjects/i, "Some university students want to learn about other subjects", "", ["Some students at university wish to study subjects beyond their main course", "Some undergraduates want to explore subjects outside their main field", "Some university students are keen to learn about additional subjects"], "university-students-other-subjects");
      add("prompt", /it is more important to/i, "more important", "it is ", ["of greater importance to", "more valuable to", "more essential to"], "more-important-to");
      add("prompt", /around the world/i, "around the world", "", ["across the globe", "globally", "in various parts of the world"], "around-the-world");
      add("prompt", /the population in the countryside is decreasing/i, "the population in the countryside is decreasing", "", ["rural populations are declining", "the number of people living in the countryside is falling", "fewer people are living in rural areas"], "population-countryside-decreasing");
      add("prompt", /The working week/i, "The working week", "", ["The number of working days each week", "The standard working week", "The length of the working week"], "working-week");
      add("prompt", /every home should have a water supply/i, "every home should have a water supply", "", ["all households should be supplied with water", "every household should receive a water supply", "all homes should have access to a water supply"], "every-home-water-supply");
      add("prompt", /primary and secondary schools/i, "primary and secondary schools", "", ["schools at both primary and secondary level", "primary and secondary-level schools", "schools at primary and secondary stages"], "primary-secondary-schools");
      add("prompt", /shorter school holidays/i, "shorter school holidays", "", ["reduced school holidays", "briefer school breaks", "shorter breaks from school"], "shorter-school-holidays");
      add("prompt", /reduce the number of times they fly every year/i, "reduce the number of times they fly every year", "", ["cut down on how often they fly each year", "fly less frequently each year", "lower the frequency of their annual flights"], "reduce-times-fly-every-year");
      add("prompt", /outweigh the disadvantages for individuals and businesses/i, "outweigh the disadvantages for individuals and businesses", "", ["are greater than the drawbacks for individuals and businesses", "outweigh the negative effects on individuals and companies", "exceed the downsides for people and businesses"], "outweigh-disadvantages-individuals-businesses");
      add("prompt", /How has global fashion become/i, "How has global fashion become", "", ["What has made global fashion become", "In what way has global fashion turned into", "How has international fashion grown to become"], "how-has-global-fashion-become");
      add("prompt", /on people.s lives/i, (match) => match[0], "", ["on the way people live", "on individuals' day-to-day lives", "on how people live their lives"], "on-peoples-lives");
      // Note: generic IELTS task-type navigation phrases are intentionally
      // NEVER turned into paraphrase points, even though they sit inside
      // question.prompt for some question types — e.g. "To what extent do
      // you agree or disagree", "Do you agree or disagree", "Discuss both
      // these views", "give your own opinion", "positive or negative
      // development/situation", "advantages and disadvantages" (as a bare
      // task-type label), "What are the reasons for this", "What can be
      // done about this problem". These are the same handful of Cambridge
      // task-type templates repeated near-verbatim across dozens of
      // questions, so they carry no question-specific paraphrase value —
      // the same category as the timing/word-count boilerplate that was
      // already excluded.
    }

    // Keep every matched point and present them in prompt order. Six colours
    // are reused cyclically if a question has more than six valid points;
    // colour count must never become a content-count limit again.
    points.sort((a, b) => a._focusStart - b._focusStart);
    points.forEach((point, index) => { point.tone = tones[index % tones.length]; });
    return points;
  }

  function collectExactQuestionWritingPoints(question) {
    const specs = writingQuestionParaphrases[question.id];
    if (!Array.isArray(specs)) {
      writingParaphraseConfigurationIssues.push(`${question.id}:missing exact-question paraphrase list`);
      return collectWritingPoints(question);
    }

    const prompt = String(question.prompt || "");
    const used = [];
    const tones = ["green", "blue", "purple", "orange", "water", "amber"];
    const points = [];

    specs.forEach((spec, index) => {
      const source = String(spec && spec.source || "");
      const variants = Array.isArray(spec && spec.variants)
        ? Array.from(new Set(spec.variants.map((variant) => String(variant || "").trim()).filter(Boolean)))
        : [];
      let start = -1;
      let searchFrom = 0;
      const occurrence = Math.max(0, Number(spec && spec.occurrence) || 0);
      for (let matchIndex = 0; matchIndex <= occurrence; matchIndex += 1) {
        start = prompt.indexOf(source, searchFrom);
        if (start < 0) break;
        searchFrom = start + source.length;
      }
      if (!source || start < 0) {
        writingParaphraseConfigurationIssues.push(`${question.id}:source not found:${source || "<empty>"}`);
        return;
      }
      if (!variants.length) {
        writingParaphraseConfigurationIssues.push(`${question.id}:${source}:needs at least one useful variant`);
        return;
      }
      const end = start + source.length;
      if (used.some((range) => start < range.end && end > range.start)) {
        writingParaphraseConfigurationIssues.push(`${question.id}:overlapping source:${source}`);
        return;
      }
      used.push({ start, end });
      points.push({
        id: `${question.id}-exact-${index + 1}`,
        field: "prompt",
        source,
        sourceSegments: [{ text: source, highlight: true }],
        branches: variants.map((variant) => ({ lead: "", reveal: variant })),
        _focusStart: start,
        _focusLength: source.length,
      });
    });

    points.sort((left, right) => left._focusStart - right._focusStart);
    points.forEach((point, index) => { point.tone = tones[index % tones.length]; });
    return points;
  }

  function segmentsFor(text, points, field) {
    const ranges = points.filter((point) => point.field === field).map((point) => ({
      start: point._focusStart,
      end: point._focusStart + point._focusLength,
      tone: point.tone,
    })).sort((a, b) => a.start - b.start);
    if (!ranges.length) return [{ text }];
    const segments = [];
    let cursor = 0;
    ranges.forEach((range) => {
      if (range.start > cursor) segments.push({ text: text.slice(cursor, range.start) });
      segments.push({ text: text.slice(range.start, range.end), tone: range.tone });
      cursor = range.end;
    });
    if (cursor < text.length) segments.push({ text: text.slice(cursor) });
    return segments;
  }

  function buildWritingSet(question) {
    const category = writingCategory(question);
    const special = specialWritingSets.find((set) => String(question.prompt || "").trim().startsWith(String(set.sourceQuestion || "").trim()));
    if (special) {
      const sourceQuestion = String(special.sourceQuestion || "").trim();
      const directive = String(question.prompt || "").trim().slice(sourceQuestion.length).trim();
      const taskInstruction = [directive, question.taskInstruction].filter(Boolean).join(" ");
      const exactPoints = Array.isArray(writingQuestionParaphrases[question.id])
        ? collectExactQuestionWritingPoints(question)
        : null;
      return Object.assign({}, special, question, {
        id: question.id,
        category,
        sourceQuestion,
        sourceLabel: question.sourceLabel,
        taskInstruction,
        // Use the same exact-question curated list as every other question.
        // This removes the old hidden bypass where C12-W2-T7 ignored
        // WRITING_QUESTION_KEYWORDS and stayed stuck at the special object's
        // original keyword count.
        keywords: keywordsForQuestion(question),
        points: exactPoints
          ? exactPoints
          : (special.points || []).map((point, index) => Object.assign({}, point, { id: `${question.id}-special-${index + 1}` })),
        questionSegments: exactPoints
          ? segmentsFor(question.prompt, exactPoints, "prompt")
          : special.questionSegments,
        instructionSegments: [{ text: taskInstruction }],
      });
    }
    const points = collectExactQuestionWritingPoints(question);
    return Object.assign({}, question, {
      category,
      sourceQuestion: question.prompt,
      questionSegments: segmentsFor(question.prompt, points, "prompt"),
      instructionSegments: [{ text: question.taskInstruction }],
      keywords: keywordsForQuestion(question),
      points,
    });
  }

  const writingSets = rawWritingQuestions.map(buildWritingSet);
  const writingKeywords = writingSets.flatMap((set) => (
    Array.isArray(set.keywords)
      ? set.keywords.map((keyword) => Object.assign({}, keyword, { setId: set.id }))
      : []
  ));
  const writingPoints = writingSets.flatMap((set) => (
    Array.isArray(set.points)
      ? set.points.map((point) => Object.assign({}, point, {
          setId: set.id,
          sourceLabel: set.sourceLabel,
          sourceQuestion: set.sourceQuestion,
        }))
      : []
  ));

  const audit = {
    tests: speakingTests.length,
    part1Sets: speakingTests.filter((item) => item.part1.questions.length).length,
    part2Sets: speakingTests.filter((item) => item.part2.prompt).length,
    part3Sets: speakingTests.filter((item) => item.part3.sections.some((section) => section.questions.length)).length,
    part1Questions: speakingTests.reduce((sum, item) => sum + item.part1.questions.length, 0),
    part2Cards: speakingTests.filter((item) => item.part2.prompt).length,
    part3Questions: speakingTests.reduce(
      (sum, item) => sum + item.part3.sections.reduce((inner, section) => inner + section.questions.length, 0),
      0,
    ),
    readingWords: readingWords.length,
    writingSets: writingSets.length,
    writingKeywords: writingKeywords.length,
    writingPoints: writingPoints.length,
  };
  audit.totalSpeakingCards = audit.part1Questions + audit.part2Cards + audit.part3Questions;
  audit.writingTask1 = writingSets.filter((item) => item.task === 1).length;
  audit.writingTask2 = writingSets.filter((item) => item.task === 2).length;
  audit.writingKeywordNoteTemplates = Object.keys(writingKeywordNotes).length;
  audit.writingKeywordExactEntries = Object.keys(writingExactQuestionKeywords).length;
  audit.writingKeywordExactGlossaryEntries = Object.keys(writingExactKeywordGlossary).length;
  audit.writingKeywordConfigurationIssues = writingKeywordConfigurationIssues.slice();
  audit.writingKeywordConfigurationValid = audit.writingKeywordExactEntries === rawWritingQuestions.length
    && writingKeywordConfigurationIssues.length === 0;
  audit.writingProcessV26ReviewedQuestions = writingProcessKeywordAuditV26.reviewedQuestions.length;
  audit.writingProcessV26AuthoredCards = writingProcessKeywordAuditV26.authoredCards;
  audit.writingProcessV26DistinctCardCounts = writingProcessKeywordAuditV26.distinctCardCounts.slice();
  audit.writingProcessV26Issues = writingProcessKeywordAuditV26.issues.slice();
  audit.writingProcessV26Valid = audit.writingProcessV26ReviewedQuestions === 7
    && audit.writingProcessV26AuthoredCards >= 65
    && audit.writingProcessV26DistinctCardCounts.length >= 4
    && audit.writingProcessV26Issues.length === 0;
  audit.writingC11V27ReviewedQuestions = writingC11EditorialAuditV27.reviewedQuestions.length;
  audit.writingC11V27KeywordCards = Number(writingC11EditorialAuditV27.keywordCards || 0);
  audit.writingC11V27KeywordAdditions = Number(writingC11EditorialAuditV27.keywordAdditions || 0);
  audit.writingC11V27KeywordReplacements = Number(writingC11EditorialAuditV27.keywordReplacements || 0);
  audit.writingC11V27DistinctKeywordCounts = writingC11EditorialAuditV27.distinctKeywordCounts.slice();
  audit.writingC11V27ParaphrasePoints = Number(writingC11EditorialAuditV27.paraphrasePoints || 0);
  audit.writingC11V27ParaphraseVariants = Number(writingC11EditorialAuditV27.paraphraseVariants || 0);
  audit.writingC11V27ParaphraseRepairs = Number(writingC11EditorialAuditV27.paraphraseRepairs || 0);
  audit.writingC11V27Issues = writingC11EditorialAuditV27.issues.slice();
  audit.writingC11V27Valid = audit.writingC11V27ReviewedQuestions === 8
    && audit.writingC11V27KeywordAdditions > 0
    && audit.writingC11V27KeywordReplacements > 0
    && audit.writingC11V27DistinctKeywordCounts.length >= 3
    && audit.writingC11V27ParaphrasePoints > 0
    && audit.writingC11V27ParaphraseVariants > audit.writingC11V27ParaphrasePoints
    && audit.writingC11V27ParaphraseRepairs > 0
    && audit.writingC11V27Issues.length === 0;
  audit.writingC12V28ReviewedQuestions = writingC12EditorialAuditV28.reviewedQuestions.length;
  audit.writingC12V28KeywordCards = Number(writingC12EditorialAuditV28.keywordCards || 0);
  audit.writingC12V28KeywordAdditions = Number(writingC12EditorialAuditV28.keywordAdditions || 0);
  audit.writingC12V28KeywordReplacements = Number(writingC12EditorialAuditV28.keywordReplacements || 0);
  audit.writingC12V28DistinctKeywordCounts = writingC12EditorialAuditV28.distinctKeywordCounts.slice();
  audit.writingC12V28ParaphrasePoints = Number(writingC12EditorialAuditV28.paraphrasePoints || 0);
  audit.writingC12V28ParaphraseVariants = Number(writingC12EditorialAuditV28.paraphraseVariants || 0);
  audit.writingC12V28ParaphraseRepairs = Number(writingC12EditorialAuditV28.paraphraseRepairs || 0);
  audit.writingC12V28Issues = writingC12EditorialAuditV28.issues.slice();
  audit.writingC12V28Valid = audit.writingC12V28ReviewedQuestions === 8
    && audit.writingC12V28KeywordCards === 110
    && audit.writingC12V28KeywordAdditions === 47
    && audit.writingC12V28KeywordReplacements === 4
    && audit.writingC12V28DistinctKeywordCounts.length >= 5
    && audit.writingC12V28ParaphrasePoints === 31
    && audit.writingC12V28ParaphraseVariants === 160
    && audit.writingC12V28ParaphraseRepairs === 6
    && audit.writingC12V28Issues.length === 0;
  audit.writingHealthRepairV29ReviewedQuestions = writingHealthRepairV29Meta.reviewedQuestions.length;
  audit.writingHealthRepairV29KeywordCards = Number(writingHealthRepairV29Meta.keywordCards || 0);
  audit.writingHealthRepairV29ScopedKeywordCards = Number(writingHealthRepairV29Meta.scopedKeywordCards || 0);
  audit.writingHealthRepairV29DistinctKeywordCounts = Array.isArray(writingHealthRepairV29Meta.distinctKeywordCounts)
    ? writingHealthRepairV29Meta.distinctKeywordCounts.slice()
    : [];
  audit.writingHealthRepairV29ParaphrasePoints = Number(writingHealthRepairV29Meta.paraphrasePoints || 0);
  audit.writingHealthRepairV29ParaphraseVariants = Number(writingHealthRepairV29Meta.paraphraseVariants || 0);
  audit.writingHealthRepairV29ParaphraseRepairs = Number(writingHealthRepairV29Meta.paraphraseRepairs || 0);
  audit.writingHealthRepairV29Issues = Array.isArray(writingHealthRepairV29Meta.issues)
    ? writingHealthRepairV29Meta.issues.slice()
    : ["V29 Writing health-repair issues were not recorded."];
  audit.writingHealthRepairV29Valid = audit.writingHealthRepairV29ReviewedQuestions === 16
    && audit.writingHealthRepairV29KeywordCards > 0
    && audit.writingHealthRepairV29ScopedKeywordCards === audit.writingHealthRepairV29KeywordCards
    && audit.writingHealthRepairV29DistinctKeywordCounts.length >= 5
    && audit.writingHealthRepairV29ParaphrasePoints > 0
    && audit.writingHealthRepairV29ParaphraseVariants > audit.writingHealthRepairV29ParaphrasePoints
    && audit.writingHealthRepairV29ParaphraseRepairs >= 10
    && audit.writingHealthRepairV29Issues.length === 0;
  audit.writingC11C12RecalibrationV30ReviewedQuestions = writingC11C12RecalibrationV30Meta.reviewedQuestions.length;
  audit.writingC11C12RecalibrationV30KeywordCards = Number(writingC11C12RecalibrationV30Meta.keywordCards || 0);
  audit.writingC11C12RecalibrationV30ScopedKeywordCards = Number(writingC11C12RecalibrationV30Meta.scopedKeywordCards || 0);
  audit.writingC11C12RecalibrationV30DistinctKeywordCounts = Array.isArray(writingC11C12RecalibrationV30Meta.distinctKeywordCounts)
    ? writingC11C12RecalibrationV30Meta.distinctKeywordCounts.slice()
    : [];
  audit.writingC11C12RecalibrationV30MaxCardTermWords = Number(writingC11C12RecalibrationV30Meta.maxCardTermWords || 0);
  audit.writingC11C12RecalibrationV30Issues = Array.isArray(writingC11C12RecalibrationV30Meta.issues)
    ? writingC11C12RecalibrationV30Meta.issues.slice()
    : ["V30 Cambridge 11–12 recalibration issues were not recorded."];
  audit.writingC11C12RecalibrationV30Valid = audit.writingC11C12RecalibrationV30ReviewedQuestions === 16
    && audit.writingC11C12RecalibrationV30KeywordCards === 126
    && audit.writingC11C12RecalibrationV30ScopedKeywordCards === audit.writingC11C12RecalibrationV30KeywordCards
    && audit.writingC11C12RecalibrationV30Issues.length === 0;
  audit.writingC13V30ReviewedQuestions = writingC13EditorialV30Meta.reviewedQuestions.length;
  audit.writingC13V30KeywordCards = Number(writingC13EditorialV30Meta.keywordCards || 0);
  audit.writingC13V30ScopedKeywordCards = Number(writingC13EditorialV30Meta.scopedKeywordCards || 0);
  audit.writingC13V30DistinctKeywordCounts = Array.isArray(writingC13EditorialV30Meta.distinctKeywordCounts)
    ? writingC13EditorialV30Meta.distinctKeywordCounts.slice()
    : [];
  audit.writingC13V30ParaphrasePoints = Number(writingC13EditorialV30Meta.paraphrasePoints || 0);
  audit.writingC13V30ParaphraseVariants = Number(writingC13EditorialV30Meta.paraphraseVariants || 0);
  audit.writingC13V30ParaphraseRepairs = Number(writingC13EditorialV30Meta.paraphraseRepairs || 0);
  audit.writingC13V30MaxCardTermWords = Number(writingC13EditorialV30Meta.maxCardTermWords || 0);
  audit.writingC13V30Issues = Array.isArray(writingC13EditorialV30Meta.issues)
    ? writingC13EditorialV30Meta.issues.slice()
    : ["V30 Cambridge 13 Writing editorial issues were not recorded."];
  audit.writingC13V30Valid = audit.writingC13V30ReviewedQuestions === 8
    && audit.writingC13V30KeywordCards === 57
    && audit.writingC13V30ScopedKeywordCards === audit.writingC13V30KeywordCards
    && audit.writingC13V30ParaphrasePoints === 27
    && audit.writingC13V30ParaphraseVariants === 142
    && audit.writingC13V30ParaphraseRepairs === audit.writingC13V30ParaphrasePoints
    && audit.writingC13V30Issues.length === 0;
  audit.writingExactEssayV31ReviewedQuestions = writingExactEssayLexicalUpgradeV31Meta.reviewedQuestions.length;
  audit.writingExactEssayV31QuestionCardCounts = Object.assign({}, writingExactEssayLexicalUpgradeV31Meta.questionCardCounts || {});
  audit.writingExactEssayV31CardCount = Number(writingExactEssayLexicalUpgradeV31Meta.cardCount || 0);
  audit.writingExactEssayV31ScopedCardCount = Number(writingExactEssayLexicalUpgradeV31Meta.scopedCardCount || 0);
  audit.writingExactEssayV31UpgradeEvidenceCards = Number(writingExactEssayLexicalUpgradeV31Meta.upgradeEvidenceCards || 0);
  audit.writingExactEssayV31Issues = Array.isArray(writingExactEssayLexicalUpgradeV31Meta.issues)
    ? writingExactEssayLexicalUpgradeV31Meta.issues.slice()
    : ["V31 exact-essay lexical-upgrade issues were not recorded."];
  audit.writingExactEssayV31Valid = audit.writingExactEssayV31ReviewedQuestions === 24
    && audit.writingExactEssayV31CardCount > 0
    && audit.writingExactEssayV31ScopedCardCount === audit.writingExactEssayV31CardCount
    && audit.writingExactEssayV31UpgradeEvidenceCards === audit.writingExactEssayV31CardCount
    && Object.keys(audit.writingExactEssayV31QuestionCardCounts).length === 24
    && Object.values(audit.writingExactEssayV31QuestionCardCounts).every((count) => Number(count) > 0)
    && audit.writingExactEssayV31Issues.length === 0;
  audit.writingC14ExactEssayV32ReviewedQuestions = writingC14ExactEssayV32Meta.reviewedQuestions.length;
  audit.writingC14ExactEssayV32QuestionCardCounts = Object.assign({}, writingC14ExactEssayV32Meta.questionCardCounts || {});
  audit.writingC14ExactEssayV32CardCount = Number(writingC14ExactEssayV32Meta.cardCount || 0);
  audit.writingC14ExactEssayV32ScopedCardCount = Number(writingC14ExactEssayV32Meta.scopedCardCount || 0);
  audit.writingC14ExactEssayV32UpgradeEvidenceCards = Number(writingC14ExactEssayV32Meta.upgradeEvidenceCards || 0);
  audit.writingC14ExactEssayV32Issues = Array.isArray(writingC14ExactEssayV32Meta.issues)
    ? writingC14ExactEssayV32Meta.issues.slice()
    : ["V32 Cambridge 14 exact-essay lexical-upgrade issues were not recorded."];
  audit.writingC14ExactEssayV32Valid = audit.writingC14ExactEssayV32ReviewedQuestions === 8
    && audit.writingC14ExactEssayV32CardCount > 0
    && audit.writingC14ExactEssayV32ScopedCardCount === audit.writingC14ExactEssayV32CardCount
    && audit.writingC14ExactEssayV32UpgradeEvidenceCards === audit.writingC14ExactEssayV32CardCount
    && Object.keys(audit.writingC14ExactEssayV32QuestionCardCounts).length === 8
    && Object.values(audit.writingC14ExactEssayV32QuestionCardCounts).every((count) => Number(count) > 0)
    && audit.writingC14ExactEssayV32Issues.length === 0;
  audit.writingC15ExactEssayV33ReviewedQuestions = writingC15ExactEssayV33Meta.reviewedQuestions.length;
  audit.writingC15ExactEssayV33QuestionCardCounts = Object.assign({}, writingC15ExactEssayV33Meta.questionCardCounts || {});
  audit.writingC15ExactEssayV33CardCount = Number(writingC15ExactEssayV33Meta.cardCount || 0);
  audit.writingC15ExactEssayV33ScopedCardCount = Number(writingC15ExactEssayV33Meta.scopedCardCount || 0);
  audit.writingC15ExactEssayV33UpgradeEvidenceCards = Number(writingC15ExactEssayV33Meta.upgradeEvidenceCards || 0);
  audit.writingC15ExactEssayV33Issues = Array.isArray(writingC15ExactEssayV33Meta.issues)
    ? writingC15ExactEssayV33Meta.issues.slice()
    : ["V33 Cambridge 15 exact-essay lexical-upgrade issues were not recorded."];
  audit.writingC15ExactEssayV33Valid = audit.writingC15ExactEssayV33ReviewedQuestions === 8
    && audit.writingC15ExactEssayV33CardCount > 0
    && audit.writingC15ExactEssayV33ScopedCardCount === audit.writingC15ExactEssayV33CardCount
    && audit.writingC15ExactEssayV33UpgradeEvidenceCards === audit.writingC15ExactEssayV33CardCount
    && Object.keys(audit.writingC15ExactEssayV33QuestionCardCounts).length === 8
    && Object.values(audit.writingC15ExactEssayV33QuestionCardCounts).every((count) => Number(count) > 0)
    && audit.writingC15ExactEssayV33Issues.length === 0;
  audit.writingFiveQuestionKeywordFixV35ReviewedQuestions = writingFiveQuestionKeywordFixV35Meta.reviewedQuestions.length;
  audit.writingFiveQuestionKeywordFixV35QuestionCardCounts = Object.assign({}, writingFiveQuestionKeywordFixV35Meta.questionCardCounts || {});
  audit.writingFiveQuestionKeywordFixV35CardCount = Number(writingFiveQuestionKeywordFixV35Meta.cardCount || 0);
  audit.writingFiveQuestionKeywordFixV35ScopedCardCount = Number(writingFiveQuestionKeywordFixV35Meta.scopedCardCount || 0);
  audit.writingFiveQuestionKeywordFixV35EvidenceCardCount = Number(writingFiveQuestionKeywordFixV35Meta.evidenceCardCount || 0);
  audit.writingFiveQuestionKeywordFixV35Issues = Array.isArray(writingFiveQuestionKeywordFixV35Meta.issues)
    ? writingFiveQuestionKeywordFixV35Meta.issues.slice()
    : ["V35 five-question keyword-fix issues were not recorded."];
  audit.writingFiveQuestionKeywordFixV35Valid = audit.writingFiveQuestionKeywordFixV35ReviewedQuestions === 5
    && audit.writingFiveQuestionKeywordFixV35CardCount > 0
    && audit.writingFiveQuestionKeywordFixV35ScopedCardCount === audit.writingFiveQuestionKeywordFixV35CardCount
    && audit.writingFiveQuestionKeywordFixV35EvidenceCardCount === audit.writingFiveQuestionKeywordFixV35CardCount
    && Object.keys(audit.writingFiveQuestionKeywordFixV35QuestionCardCounts).length === 5
    && Object.values(audit.writingFiveQuestionKeywordFixV35QuestionCardCounts).every((count) => Number(count) > 0)
    && audit.writingFiveQuestionKeywordFixV35Issues.length === 0;
  audit.writingTwentyFiveQuestionUpdateV36Loaded = Boolean(writingTwentyFiveQuestionUpdateV36Meta);
  audit.writingTwentyFiveQuestionUpdateV36ReviewedQuestions = writingTwentyFiveQuestionUpdateV36Meta
    ? writingTwentyFiveQuestionUpdateV36Meta.reviewedQuestions.length : 0;
  audit.writingTwentyFiveQuestionUpdateV36QuestionCardCounts = writingTwentyFiveQuestionUpdateV36Meta
    ? Object.assign({}, writingTwentyFiveQuestionUpdateV36Meta.questionCardCounts || {}) : {};
  audit.writingTwentyFiveQuestionUpdateV36CardCount = writingTwentyFiveQuestionUpdateV36Meta
    ? Number(writingTwentyFiveQuestionUpdateV36Meta.cardCount || 0) : 0;
  audit.writingTwentyFiveQuestionUpdateV36ScopedCardCount = writingTwentyFiveQuestionUpdateV36Meta
    ? Number(writingTwentyFiveQuestionUpdateV36Meta.scopedCardCount || 0) : 0;
  audit.writingTwentyFiveQuestionUpdateV36EvidenceCardCount = writingTwentyFiveQuestionUpdateV36Meta
    ? Number(writingTwentyFiveQuestionUpdateV36Meta.evidenceCardCount || 0) : 0;
  audit.writingTwentyFiveQuestionUpdateV36BilingualExampleCardCount = writingTwentyFiveQuestionUpdateV36Meta
    ? Number(writingTwentyFiveQuestionUpdateV36Meta.bilingualExampleCardCount || 0) : 0;
  audit.writingTwentyFiveQuestionUpdateV36Issues = writingTwentyFiveQuestionUpdateV36Meta
    && Array.isArray(writingTwentyFiveQuestionUpdateV36Meta.issues)
    ? writingTwentyFiveQuestionUpdateV36Meta.issues.slice() : [];
  // Historical layer tests deliberately boot without V36. When V36 is loaded,
  // the current app audit validates every one of its 25 sets and 150 cards.
  audit.writingTwentyFiveQuestionUpdateV36Valid = !writingTwentyFiveQuestionUpdateV36Meta
    || (audit.writingTwentyFiveQuestionUpdateV36ReviewedQuestions === 25
      && audit.writingTwentyFiveQuestionUpdateV36CardCount === 150
      && audit.writingTwentyFiveQuestionUpdateV36ScopedCardCount === audit.writingTwentyFiveQuestionUpdateV36CardCount
      && audit.writingTwentyFiveQuestionUpdateV36EvidenceCardCount === audit.writingTwentyFiveQuestionUpdateV36CardCount
      && audit.writingTwentyFiveQuestionUpdateV36BilingualExampleCardCount === audit.writingTwentyFiveQuestionUpdateV36CardCount
      && Object.keys(audit.writingTwentyFiveQuestionUpdateV36QuestionCardCounts).length === 25
      && Object.values(audit.writingTwentyFiveQuestionUpdateV36QuestionCardCounts).every((count) => Number(count) > 0)
      && new Set(Object.values(audit.writingTwentyFiveQuestionUpdateV36QuestionCardCounts)).size > 1
      && audit.writingTwentyFiveQuestionUpdateV36Issues.length === 0);
  audit.writingFifteenQuestionUpdateV37Loaded = Boolean(writingFifteenQuestionUpdateV37Meta);
  audit.writingFifteenQuestionUpdateV37ReviewedQuestions = writingFifteenQuestionUpdateV37Meta
    ? writingFifteenQuestionUpdateV37Meta.reviewedQuestions.length : 0;
  audit.writingFifteenQuestionUpdateV37QuestionCardCounts = writingFifteenQuestionUpdateV37Meta
    ? Object.assign({}, writingFifteenQuestionUpdateV37Meta.questionCardCounts || {}) : {};
  audit.writingFifteenQuestionUpdateV37CardCount = writingFifteenQuestionUpdateV37Meta
    ? Number(writingFifteenQuestionUpdateV37Meta.cardCount || 0) : 0;
  audit.writingFifteenQuestionUpdateV37ScopedCardCount = writingFifteenQuestionUpdateV37Meta
    ? Number(writingFifteenQuestionUpdateV37Meta.scopedCardCount || 0) : 0;
  audit.writingFifteenQuestionUpdateV37EvidenceCardCount = writingFifteenQuestionUpdateV37Meta
    ? Number(writingFifteenQuestionUpdateV37Meta.evidenceCardCount || 0) : 0;
  audit.writingFifteenQuestionUpdateV37BilingualExampleCardCount = writingFifteenQuestionUpdateV37Meta
    ? Number(writingFifteenQuestionUpdateV37Meta.bilingualExampleCardCount || 0) : 0;
  audit.writingFifteenQuestionUpdateV37Issues = writingFifteenQuestionUpdateV37Meta
    && Array.isArray(writingFifteenQuestionUpdateV37Meta.issues)
    ? writingFifteenQuestionUpdateV37Meta.issues.slice() : [];
  // Historical layer tests deliberately boot without V37. When V37 is loaded,
  // every one of the three approved five-question batches must be complete.
  audit.writingFifteenQuestionUpdateV37Valid = !writingFifteenQuestionUpdateV37Meta
    || (audit.writingFifteenQuestionUpdateV37ReviewedQuestions === 15
      && audit.writingFifteenQuestionUpdateV37CardCount === 88
      && audit.writingFifteenQuestionUpdateV37ScopedCardCount === audit.writingFifteenQuestionUpdateV37CardCount
      && audit.writingFifteenQuestionUpdateV37EvidenceCardCount === audit.writingFifteenQuestionUpdateV37CardCount
      && audit.writingFifteenQuestionUpdateV37BilingualExampleCardCount === audit.writingFifteenQuestionUpdateV37CardCount
      && Object.keys(audit.writingFifteenQuestionUpdateV37QuestionCardCounts).length === 15
      && Object.values(audit.writingFifteenQuestionUpdateV37QuestionCardCounts).every((count) => Number(count) > 0)
      && new Set(Object.values(audit.writingFifteenQuestionUpdateV37QuestionCardCounts)).size > 1
      && audit.writingFifteenQuestionUpdateV37Issues.length === 0);
  audit.writingTwentyFiveQuestionUpdateV38Loaded = Boolean(writingTwentyFiveQuestionUpdateV38Meta);
  audit.writingTwentyFiveQuestionUpdateV38ReviewedQuestions = writingTwentyFiveQuestionUpdateV38Meta
    ? writingTwentyFiveQuestionUpdateV38Meta.reviewedQuestions.length : 0;
  audit.writingTwentyFiveQuestionUpdateV38QuestionCardCounts = writingTwentyFiveQuestionUpdateV38Meta
    ? Object.assign({}, writingTwentyFiveQuestionUpdateV38Meta.questionCardCounts || {}) : {};
  audit.writingTwentyFiveQuestionUpdateV38CardCount = writingTwentyFiveQuestionUpdateV38Meta
    ? Number(writingTwentyFiveQuestionUpdateV38Meta.cardCount || 0) : 0;
  audit.writingTwentyFiveQuestionUpdateV38ScopedCardCount = writingTwentyFiveQuestionUpdateV38Meta
    ? Number(writingTwentyFiveQuestionUpdateV38Meta.scopedCardCount || 0) : 0;
  audit.writingTwentyFiveQuestionUpdateV38EvidenceCardCount = writingTwentyFiveQuestionUpdateV38Meta
    ? Number(writingTwentyFiveQuestionUpdateV38Meta.evidenceCardCount || 0) : 0;
  audit.writingTwentyFiveQuestionUpdateV38BilingualExampleCardCount = writingTwentyFiveQuestionUpdateV38Meta
    ? Number(writingTwentyFiveQuestionUpdateV38Meta.bilingualExampleCardCount || 0) : 0;
  audit.writingTwentyFiveQuestionUpdateV38Issues = writingTwentyFiveQuestionUpdateV38Meta
    && Array.isArray(writingTwentyFiveQuestionUpdateV38Meta.issues)
    ? writingTwentyFiveQuestionUpdateV38Meta.issues.slice() : [];
  // Historical layer tests deliberately boot without V38. When it is loaded,
  // every approved question completed after the V37 save point must be present.
  audit.writingTwentyFiveQuestionUpdateV38Valid = !writingTwentyFiveQuestionUpdateV38Meta
    || (audit.writingTwentyFiveQuestionUpdateV38ReviewedQuestions === 25
      && audit.writingTwentyFiveQuestionUpdateV38CardCount === 156
      && audit.writingTwentyFiveQuestionUpdateV38ScopedCardCount === audit.writingTwentyFiveQuestionUpdateV38CardCount
      && audit.writingTwentyFiveQuestionUpdateV38EvidenceCardCount === audit.writingTwentyFiveQuestionUpdateV38CardCount
      && audit.writingTwentyFiveQuestionUpdateV38BilingualExampleCardCount === audit.writingTwentyFiveQuestionUpdateV38CardCount
      && Object.keys(audit.writingTwentyFiveQuestionUpdateV38QuestionCardCounts).length === 25
      && Object.values(audit.writingTwentyFiveQuestionUpdateV38QuestionCardCounts).every((count) => Number(count) > 0)
      && new Set(Object.values(audit.writingTwentyFiveQuestionUpdateV38QuestionCardCounts)).size > 1
      && audit.writingTwentyFiveQuestionUpdateV38Issues.length === 0);
  audit.writingTenQuestionUpdateV39Loaded = Boolean(writingTenQuestionUpdateV39Meta);
  audit.writingTenQuestionUpdateV39ReviewedQuestions = writingTenQuestionUpdateV39Meta
    ? writingTenQuestionUpdateV39Meta.reviewedQuestions.length : 0;
  audit.writingTenQuestionUpdateV39QuestionCardCounts = writingTenQuestionUpdateV39Meta
    ? Object.assign({}, writingTenQuestionUpdateV39Meta.questionCardCounts || {}) : {};
  audit.writingTenQuestionUpdateV39CardCount = writingTenQuestionUpdateV39Meta
    ? Number(writingTenQuestionUpdateV39Meta.cardCount || 0) : 0;
  audit.writingTenQuestionUpdateV39ScopedCardCount = writingTenQuestionUpdateV39Meta
    ? Number(writingTenQuestionUpdateV39Meta.scopedCardCount || 0) : 0;
  audit.writingTenQuestionUpdateV39EvidenceCardCount = writingTenQuestionUpdateV39Meta
    ? Number(writingTenQuestionUpdateV39Meta.evidenceCardCount || 0) : 0;
  audit.writingTenQuestionUpdateV39BilingualExampleCardCount = writingTenQuestionUpdateV39Meta
    ? Number(writingTenQuestionUpdateV39Meta.bilingualExampleCardCount || 0) : 0;
  audit.writingTenQuestionUpdateV39Issues = writingTenQuestionUpdateV39Meta
    && Array.isArray(writingTenQuestionUpdateV39Meta.issues)
    ? writingTenQuestionUpdateV39Meta.issues.slice() : [];
  audit.writingTenQuestionUpdateV39Valid = !writingTenQuestionUpdateV39Meta
    || (audit.writingTenQuestionUpdateV39ReviewedQuestions === 10
      && audit.writingTenQuestionUpdateV39CardCount === (writingComprehensive180ReauditV39Meta ? 70 : 71)
      && audit.writingTenQuestionUpdateV39ScopedCardCount === audit.writingTenQuestionUpdateV39CardCount
      && audit.writingTenQuestionUpdateV39EvidenceCardCount === audit.writingTenQuestionUpdateV39CardCount
      && audit.writingTenQuestionUpdateV39BilingualExampleCardCount === audit.writingTenQuestionUpdateV39CardCount
      && Object.keys(audit.writingTenQuestionUpdateV39QuestionCardCounts).length === 10
      && new Set(Object.values(audit.writingTenQuestionUpdateV39QuestionCardCounts)).size > 1
      && audit.writingTenQuestionUpdateV39Issues.length === 0);
  audit.writingFirstTwentySemanticReauditV39Loaded = Boolean(writingFirstTwentySemanticReauditV39Meta);
  audit.writingFirstTwentySemanticReauditV39Valid = !writingFirstTwentySemanticReauditV39Meta
    || (Number(writingFirstTwentySemanticReauditV39Meta.reviewedQuestions) === 20
      && Number(writingFirstTwentySemanticReauditV39Meta.repairedCards) === 15
      && Number(writingFirstTwentySemanticReauditV39Meta.repairedEnglishExamples) === 17
      && Number(writingFirstTwentySemanticReauditV39Meta.repairedChineseExamples) === 17
      && Array.isArray(writingFirstTwentySemanticReauditV39Meta.issues)
      && writingFirstTwentySemanticReauditV39Meta.issues.length === 0);
  audit.writingQuestions4160ExampleReauditV39Loaded = Boolean(writingQuestions4160ExampleReauditV39Meta);
  audit.writingQuestions4160ExampleReauditV39Valid = !writingQuestions4160ExampleReauditV39Meta
    || (Number(writingQuestions4160ExampleReauditV39Meta.reviewedQuestions) === 20
      && Number(writingQuestions4160ExampleReauditV39Meta.repairedQuestions) === 13
      && Number(writingQuestions4160ExampleReauditV39Meta.repairedCards) === 19
      && Number(writingQuestions4160ExampleReauditV39Meta.repairedEnglishExamples) === 19
      && Number(writingQuestions4160ExampleReauditV39Meta.repairedChineseExamples) === 19
      && Array.isArray(writingQuestions4160ExampleReauditV39Meta.issues)
      && writingQuestions4160ExampleReauditV39Meta.issues.length === 0);
  audit.writingQuestions6180ExampleReauditV39Loaded = Boolean(writingQuestions6180ExampleReauditV39Meta);
  audit.writingQuestions6180ExampleReauditV39Valid = !writingQuestions6180ExampleReauditV39Meta
    || (Number(writingQuestions6180ExampleReauditV39Meta.reviewedQuestions) === 20
      && Number(writingQuestions6180ExampleReauditV39Meta.repairedQuestions) === 17
      && Number(writingQuestions6180ExampleReauditV39Meta.repairedCards) === 27
      && Number(writingQuestions6180ExampleReauditV39Meta.repairedEnglishExamples) === 30
      && Number(writingQuestions6180ExampleReauditV39Meta.repairedChineseExamples) === 30
      && Array.isArray(writingQuestions6180ExampleReauditV39Meta.issues)
      && writingQuestions6180ExampleReauditV39Meta.issues.length === 0);
  audit.writingComprehensive180ReauditV39Loaded = Boolean(writingComprehensive180ReauditV39Meta);
  audit.writingComprehensive180ReauditV39ReviewedQuestions = writingComprehensive180ReauditV39Meta
    ? Number(writingComprehensive180ReauditV39Meta.reviewedQuestions || 0) : 0;
  audit.writingComprehensive180ReauditV39ActiveCardCount = writingComprehensive180ReauditV39Meta
    ? Number(writingComprehensive180ReauditV39Meta.activeCardCount || 0) : 0;
  audit.writingComprehensive180ReauditV39BilingualExamplePairs = writingComprehensive180ReauditV39Meta
    ? Number(writingComprehensive180ReauditV39Meta.bilingualExamplePairs || 0) : 0;
  audit.writingComprehensive180ReauditV39Issues = writingComprehensive180ReauditV39Meta
    && Array.isArray(writingComprehensive180ReauditV39Meta.issues)
    ? writingComprehensive180ReauditV39Meta.issues.slice() : [];
  audit.writingComprehensive180ReauditV39Valid = !writingComprehensive180ReauditV39Meta
    || (audit.writingComprehensive180ReauditV39ReviewedQuestions === 80
      && audit.writingComprehensive180ReauditV39ActiveCardCount === 494
      && audit.writingComprehensive180ReauditV39BilingualExamplePairs === 1482
      && Number(writingComprehensive180ReauditV39Meta.uniqueTerms) === 307
      && Number(writingComprehensive180ReauditV39Meta.minimumCardsPerQuestion) === 3
      && Number(writingComprehensive180ReauditV39Meta.maximumCardsPerQuestion) === 9
      && Array.isArray(writingComprehensive180ReauditV39Meta.removedCards)
      && writingComprehensive180ReauditV39Meta.removedCards.length === 1
      && audit.writingComprehensive180ReauditV39Issues.length === 0);
  const calibratedQuestionIds = new Set([
    ...(writingFiveQuestionKeywordFixV35Meta.reviewedQuestions || []),
    ...((writingTwentyFiveQuestionUpdateV36Meta && writingTwentyFiveQuestionUpdateV36Meta.reviewedQuestions) || []),
    ...((writingFifteenQuestionUpdateV37Meta && writingFifteenQuestionUpdateV37Meta.reviewedQuestions) || []),
    ...((writingTwentyFiveQuestionUpdateV38Meta && writingTwentyFiveQuestionUpdateV38Meta.reviewedQuestions) || []),
    ...((writingTenQuestionUpdateV39Meta && writingTenQuestionUpdateV39Meta.reviewedQuestions) || []),
  ]);
  audit.writingCalibratedQuestionCount = calibratedQuestionIds.size;
  audit.writingAllEightyQuestionCoverageValid = !writingTenQuestionUpdateV39Meta
    || (calibratedQuestionIds.size === 80
      && rawWritingQuestions.every((question) => calibratedQuestionIds.has(question.id)));
  audit.writingParaphraseExactEntries = Object.keys(writingQuestionParaphrases).length;
  audit.writingParaphraseConfigurationIssues = writingParaphraseConfigurationIssues.slice();
  audit.writingParaphraseConfigurationValid = audit.writingParaphraseExactEntries === rawWritingQuestions.length
    && writingParaphraseConfigurationIssues.length === 0;
  audit.writingKeywordNotesValid = writingKeywords.every((item) => /[\u3400-\u9FFF]/.test(String(item.note || "")));
  audit.writingKeywordExamplesValid = writingKeywords.every((item) => Array.isArray(item.examples)
    && Array.isArray(item.examplesZh)
    && item.examples.length === 3
    && item.examplesZh.length === 3);
  audit.writingParaphraseRepairV40Issues = writingParaphraseRepairV40Meta
    ? writingParaphraseRepairV40Meta.issues.slice()
    : ["V40 paraphrase repair data was not loaded."];
  audit.writingParaphraseRepairV40ReviewedQuestions = writingParaphraseRepairV40Meta
    ? writingParaphraseRepairV40Meta.reviewedQuestions.length
    : 0;
  // Historical layer tests deliberately boot without V40. When the V40 layer
  // is loaded by the live index, validate its full 80-question repair record.
  audit.writingParaphraseRepairV40Valid = !writingParaphraseRepairV40Meta
    || (writingParaphraseRepairV40Meta.reviewedQuestions.length === rawWritingQuestions.length
      && writingParaphraseRepairV40Meta.questionCount === rawWritingQuestions.length
      && writingParaphraseRepairV40Meta.issues.length === 0);
  audit.writingParaphraseVariantsValid = writingPoints.every((item) => Array.isArray(item.branches) && item.branches.length >= 1);
  audit.writingPromptOnly = writingPoints.every((item) => item.field !== "instruction");
  audit.valid = audit.tests === 44
    && audit.part1Sets === 44
    && audit.part2Sets === 44
    && audit.part3Sets === 44
    && audit.writingTask1 === 40
    && audit.writingTask2 === 40
    // Do not hard-code the template count. Content expansion may legitimately
    // add new exact-question keywords; per-card Chinese-note validation below
    // is the real integrity requirement.
    && audit.writingKeywordNoteTemplates > 0
    && audit.writingKeywordConfigurationValid
    && audit.writingProcessV26Valid
    && audit.writingC11V27Valid
    && audit.writingC12V28Valid
    && audit.writingHealthRepairV29Valid
    && audit.writingC11C12RecalibrationV30Valid
    && audit.writingC13V30Valid
    && audit.writingExactEssayV31Valid
    && audit.writingC14ExactEssayV32Valid
    && audit.writingC15ExactEssayV33Valid
    && audit.writingFiveQuestionKeywordFixV35Valid
    && audit.writingTwentyFiveQuestionUpdateV36Valid
    && audit.writingFifteenQuestionUpdateV37Valid
    && audit.writingTwentyFiveQuestionUpdateV38Valid
    && audit.writingTenQuestionUpdateV39Valid
    && audit.writingFirstTwentySemanticReauditV39Valid
    && audit.writingQuestions4160ExampleReauditV39Valid
    && audit.writingQuestions6180ExampleReauditV39Valid
    && audit.writingComprehensive180ReauditV39Valid
    && audit.writingParaphraseRepairV40Valid
    && audit.writingAllEightyQuestionCoverageValid
    && audit.writingParaphraseConfigurationValid
    && audit.writingKeywordNotesValid
    && audit.writingKeywordExamplesValid
    && audit.writingParaphraseVariantsValid
    && audit.writingPromptOnly
    && writingSets.every((item) => item.points.length >= 1 && item.keywords.length >= 1);

  function shuffle(items) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function speakingSpeechText(item) {
    if (!item) return "";
    const prompt = String(item.text || "").trim();
    if (Number(item.part) !== 2) return prompt;
    return [
      prompt,
      "You should say",
      ...(Array.isArray(item.bullets) ? item.bullets : []),
      String(item.closing || "").trim(),
    ].filter(Boolean).join(". ");
  }

  function hintVersions(id) {
    const versions = speakingHints[id];
    if (!Array.isArray(versions)) return [];
    return versions
      .filter((lines) => Array.isArray(lines) && lines.length)
      .map((lines) => lines.map((line) => String(line)));
  }

  function withHints(card) {
    return Object.assign(card, { hints: hintVersions(card.id) });
  }

  const speakingCards = speakingTests.flatMap((test) => {
    const source = { book: test.book, test: test.test, sourceId: test.id };
    const p1 = test.part1.questions.map((text, index) => withHints(Object.assign({
      id: `${test.id}-P1-Q${index + 1}`,
      part: 1,
      setId: `${test.id}-P1`,
      topic: test.part1.topic,
      text,
    }, source)));
    const p2 = test.part2.prompt
      ? [withHints(Object.assign({
          id: `${test.id}-P2`,
          part: 2,
          setId: `${test.id}-P2`,
          topic: "Long turn",
          text: test.part2.prompt,
          bullets: test.part2.bullets.slice(),
          closing: test.part2.closing,
        }, source))]
      : [];
    const p3 = test.part3.sections.flatMap((section, sectionIndex) => (
      section.questions.map((text, index) => withHints(Object.assign({
        id: `${test.id}-P3-S${sectionIndex + 1}-Q${index + 1}`,
        part: 3,
        setId: `${test.id}-P3-S${sectionIndex + 1}`,
        topic: section.topic || `Discussion ${sectionIndex + 1}`,
        text,
      }, source)))
    ));
    return p1.concat(p2, p3);
  });

  function hintWordCount(line) {
    return String(line || "").trim().split(/\s+/).filter(Boolean).length;
  }

  audit.speakingHintEntries = Object.keys(speakingHints).length;
  audit.speakingHintDirections = speakingCards.reduce((sum, card) => sum + card.hints.length, 0);
  audit.speakingHintAddedDirections = Number(speakingHintExpansionMeta.added || 0);
  audit.speakingHintExpandedQuestions = Object.keys(speakingHintExpansionMeta.questionsExpanded || {}).length;
  audit.speakingHintExpansionFiles = Array.isArray(speakingHintExpansionMeta.files)
    ? speakingHintExpansionMeta.files.map((item) => Object.assign({}, item))
    : [];
  audit.speakingHintExpansionIssues = Array.isArray(speakingHintExpansionMeta.issues)
    ? speakingHintExpansionMeta.issues.slice()
    : ["Speaking expansion issues were not recorded."];
  audit.speakingHintQualityReplacements = Number(speakingHintQualityMeta.replacements || 0);
  audit.speakingHintQualityQuestions = Number(speakingHintQualityMeta.questions || 0);
  audit.speakingHintQualityIssues = Array.isArray(speakingHintQualityMeta.issues)
    ? speakingHintQualityMeta.issues.slice()
    : ["Speaking quality issues were not recorded."];
  audit.speakingHintQualityValid = audit.speakingHintQualityReplacements > 0
    && audit.speakingHintQualityQuestions > 0
    && audit.speakingHintQualityIssues.length === 0;
  audit.speakingHintEditorialReplacements = Number(speakingHintEditorialMeta.replacements || 0);
  audit.speakingHintEditorialQuestions = Number(speakingHintEditorialMeta.questions || 0);
  audit.speakingHintEditorialReviewedRiskPairs = Number(speakingHintEditorialMeta.reviewedRiskPairs || 0);
  audit.speakingHintEditorialAcceptedDistinctPairs = Array.isArray(speakingHintEditorialMeta.acceptedDistinctPairs)
    ? speakingHintEditorialMeta.acceptedDistinctPairs.map((item) => Object.assign({}, item))
    : [];
  audit.speakingHintEditorialIssues = Array.isArray(speakingHintEditorialMeta.issues)
    ? speakingHintEditorialMeta.issues.slice()
    : ["Speaking editorial issues were not recorded."];
  audit.speakingHintEditorialValid = audit.speakingHintEditorialReplacements > 0
    && audit.speakingHintEditorialQuestions > 0
    && audit.speakingHintEditorialReviewedRiskPairs > 0
    && audit.speakingHintEditorialIssues.length === 0;
  audit.speakingHintC10V26ReviewedQuestions = Number(speakingHintC10V26Meta.reviewedQuestions || 0);
  audit.speakingHintC10V26Replacements = Number(speakingHintC10V26Meta.replacements || 0);
  audit.speakingHintC10V26Additions = Number(speakingHintC10V26Meta.additions || 0);
  audit.speakingHintC10V26ChangedQuestions = Number(speakingHintC10V26Meta.changedQuestions || 0);
  audit.speakingHintC10V26Issues = Array.isArray(speakingHintC10V26Meta.issues)
    ? speakingHintC10V26Meta.issues.slice()
    : ["C10 V26 editorial issues were not recorded."];
  audit.speakingHintC10V26Valid = audit.speakingHintC10V26ReviewedQuestions === 44
    && audit.speakingHintC10V26Replacements > 0
    && audit.speakingHintC10V26Additions > 0
    && audit.speakingHintC10V26ChangedQuestions > 0
    && audit.speakingHintC10V26Issues.length === 0;
  audit.speakingHintC11V27ReviewedQuestions = Number(speakingHintC11V27Meta.reviewedQuestions || 0);
  audit.speakingHintC11V27Replacements = Number(speakingHintC11V27Meta.replacements || 0);
  audit.speakingHintC11V27Additions = Number(speakingHintC11V27Meta.additions || 0);
  audit.speakingHintC11V27ChangedQuestions = Number(speakingHintC11V27Meta.changedQuestions || 0);
  audit.speakingHintC11V27Issues = Array.isArray(speakingHintC11V27Meta.issues)
    ? speakingHintC11V27Meta.issues.slice()
    : ["C11 V27 editorial issues were not recorded."];
  audit.speakingHintC11V27Valid = audit.speakingHintC11V27ReviewedQuestions === 44
    && audit.speakingHintC11V27Replacements > 0
    && audit.speakingHintC11V27Additions > 0
    && audit.speakingHintC11V27ChangedQuestions > 0
    && audit.speakingHintC11V27Issues.length === 0;
  audit.speakingHintC12V28ReviewedQuestions = Number(speakingHintC12V28Meta.reviewedQuestions || 0);
  audit.speakingHintC12V28Replacements = Number(speakingHintC12V28Meta.replacements || 0);
  audit.speakingHintC12V28Additions = Number(speakingHintC12V28Meta.additions || 0);
  audit.speakingHintC12V28ChangedQuestions = Number(speakingHintC12V28Meta.changedQuestions || 0);
  audit.speakingHintC12V28Issues = Array.isArray(speakingHintC12V28Meta.issues)
    ? speakingHintC12V28Meta.issues.slice()
    : ["C12 V28 editorial issues were not recorded."];
  audit.speakingHintC12V28Valid = audit.speakingHintC12V28ReviewedQuestions === 44
    && audit.speakingHintC12V28Replacements === 82
    && audit.speakingHintC12V28Additions === 52
    && audit.speakingHintC12V28ChangedQuestions === 39
    && audit.speakingHintC12V28Issues.length === 0;
  audit.speakingHealthRepairV29ReviewedQuestions = Number(speakingHealthRepairV29Meta.reviewedQuestions || 0);
  audit.speakingHealthRepairV29Replacements = Number(speakingHealthRepairV29Meta.replacements || 0);
  audit.speakingHealthRepairV29ChangedQuestions = Number(speakingHealthRepairV29Meta.changedQuestions || 0);
  audit.speakingHealthRepairV29Issues = Array.isArray(speakingHealthRepairV29Meta.issues)
    ? speakingHealthRepairV29Meta.issues.slice()
    : ["V29 Speaking health-repair issues were not recorded."];
  audit.speakingHealthRepairV29Valid = audit.speakingHealthRepairV29ReviewedQuestions === 132
    && audit.speakingHealthRepairV29Replacements > 0
    && audit.speakingHealthRepairV29ChangedQuestions > 0
    && audit.speakingHealthRepairV29Issues.length === 0;
  audit.speakingC13V30ReviewedQuestions = Number(speakingC13EditorialV30Meta.reviewedQuestions || 0);
  audit.speakingC13V30Replacements = Number(speakingC13EditorialV30Meta.replacements || 0);
  audit.speakingC13V30Additions = Number(speakingC13EditorialV30Meta.additions || 0);
  audit.speakingC13V30ChangedQuestions = Number(speakingC13EditorialV30Meta.changedQuestions || 0);
  audit.speakingC13V30Issues = Array.isArray(speakingC13EditorialV30Meta.issues)
    ? speakingC13EditorialV30Meta.issues.slice()
    : ["V30 Cambridge 13 Speaking editorial issues were not recorded."];
  audit.speakingC13V30Valid = audit.speakingC13V30ReviewedQuestions === 44
    && audit.speakingC13V30Replacements === 69
    && audit.speakingC13V30Additions === 32
    && audit.speakingC13V30ChangedQuestions === 38
    && audit.speakingC13V30Issues.length === 0;
  audit.speakingHealthRepairV42ReviewedQuestions = speakingHealthRepairV42Metas
    .reduce((sum, meta) => sum + Number(meta.reviewedQuestions || 0), 0);
  audit.speakingHealthRepairV42ChangedQuestions = speakingHealthRepairV42Metas
    .reduce((sum, meta) => sum + Number(meta.changedQuestions || 0), 0);
  audit.speakingHealthRepairV42Replacements = speakingHealthRepairV42Metas
    .reduce((sum, meta) => sum + Number(meta.replacements || 0), 0);
  audit.speakingHealthRepairV42Issues = speakingHealthRepairV42Metas
    .flatMap((meta) => (Array.isArray(meta.issues) ? meta.issues : ["V42 Speaking repair issues were not recorded."]));
  audit.speakingHealthRepairV42BookCounts = speakingHealthRepairV42Metas
    .map((meta) => Number(meta.changedQuestions || 0));
  audit.speakingHealthRepairV42Valid = audit.speakingHealthRepairV42ReviewedQuestions === 484
    && audit.speakingHealthRepairV42ChangedQuestions === 233
    && audit.speakingHealthRepairV42Replacements === 527
    && audit.speakingHealthRepairV42Issues.length === 0;
  audit.speakingHintCountByQuestion = speakingCards.reduce((counts, card) => {
    counts[card.hints.length] = (counts[card.hints.length] || 0) + 1;
    return counts;
  }, {});
  audit.speakingHintExpansionValid = audit.speakingHintExpandedQuestions === speakingCards.length
    && audit.speakingHintAddedDirections > speakingCards.length
    && audit.speakingHintExpansionIssues.length === 0
    && Object.keys(audit.speakingHintCountByQuestion).length >= 3;
  audit.speakingHintsValid = audit.speakingHintEntries === speakingCards.length
    && audit.speakingHintExpansionValid
    && audit.speakingHintQualityValid
    && audit.speakingHintEditorialValid
    && audit.speakingHintC10V26Valid
    && audit.speakingHintC11V27Valid
    && audit.speakingHintC12V28Valid
    && audit.speakingHealthRepairV29Valid
    && audit.speakingC13V30Valid
    && audit.speakingHealthRepairV42Valid
    && speakingCards.every((card) => Array.isArray(card.hints)
      && card.hints.length >= 2
      && card.hints.every((version) => Array.isArray(version)
        && version.length >= 1
        && version.length <= (card.part === 1 ? 2 : 3)
        && version.every((line) => hintWordCount(line) <= 4)
        && version.reduce((sum, line) => sum + hintWordCount(line), 0) <= (card.part === 1 ? 8 : 12)));
  audit.valid = audit.valid && audit.speakingHintsValid;

  function speakingPool(category, poolName) {
    const part = Number(category);
    const categoryCards = [1, 2, 3].includes(part)
      ? speakingCards.filter((card) => card.part === part)
      : speakingCards;
    if (poolName === "all") return categoryCards.slice();
    return categoryCards.filter((card) => G.progress.speakingStatus(card.id) === poolName);
  }

  function freshFirst(cards, lastIds) {
    const last = new Set(Array.isArray(lastIds) ? lastIds : []);
    const mixed = shuffle(cards);
    return mixed.filter((card) => !last.has(card.id)).concat(mixed.filter((card) => last.has(card.id)));
  }

  function selectInSourceOrder(cards, count, lastIds) {
    const ordered = freshFirst(cards, lastIds).slice(0, count);
    const ids = new Set(ordered.map((card) => card.id));
    return cards.filter((card) => ids.has(card.id));
  }

  function selectSet(cards, count, lastIds) {
    const groups = new Map();
    cards.forEach((card) => {
      if (!groups.has(card.setId)) groups.set(card.setId, []);
      groups.get(card.setId).push(card);
    });
    const complete = Array.from(groups.values()).filter((group) => group.length >= count);
    if (!complete.length) return selectInSourceOrder(cards, count, lastIds);

    const last = new Set(Array.isArray(lastIds) ? lastIds : []);
    const freshGroups = complete.filter((group) => group.every((card) => !last.has(card.id)));
    const candidates = freshGroups.length ? freshGroups : complete;
    return selectInSourceOrder(shuffle(candidates)[0], count, lastIds);
  }

  function speakingQueue(category, poolName, lastIds) {
    const pool = speakingPool(category, poolName);
    let selected;
    if (category === "1") selected = selectSet(pool, 3, lastIds);
    else if (category === "2") selected = selectInSourceOrder(pool, 1, lastIds);
    else if (category === "3") selected = selectSet(pool, 3, lastIds);
    else {
      selected = [1, 2, 3].flatMap((part) => {
        const partPool = pool.filter((card) => card.part === part);
        return selectInSourceOrder(partPool, 1, lastIds);
      });
    }
    return selected.map((card) => Object.assign({}, card, { _skipCount: 0 }));
  }

  function speakingConfiguredQueue(mode, partPools, lastIds) {
    const value = String(mode);
    const pools = partPools && typeof partPools === "object" ? partPools : {};
    const validPools = new Set(["all", "new", "unfamiliar", "mastered"]);

    if (["1", "2", "3"].includes(value)) {
      const poolName = pools[value];
      return validPools.has(poolName) ? speakingQueue(value, poolName, lastIds) : [];
    }

    if (value !== "full") return [];
    const selected = [];
    for (const part of ["1", "2", "3"]) {
      const poolName = pools[part];
      if (!validPools.has(poolName)) return [];
      const pool = speakingPool(part, poolName);
      const card = selectInSourceOrder(pool, 1, lastIds)[0];
      if (!card) return [];
      selected.push(card);
    }
    return selected.map((card) => Object.assign({}, card, { _skipCount: 0 }));
  }

  function writingTypeForTask(task, selectedTypes) {
    const taskKey = String(task);
    if (selectedTypes && typeof selectedTypes === "object" && !Array.isArray(selectedTypes)) {
      return String(selectedTypes[taskKey] || "all");
    }

    // Backward compatibility for an in-memory state from the earlier single
    // value design (for example "1:Maps & Plans"). A legacy value only
    // applies to the Task named in that value; the other Task stays on All.
    const legacy = String(selectedTypes || "all");
    if (legacy === "all") return "all";
    const separator = legacy.indexOf(":");
    if (separator < 0 || legacy.slice(0, separator) !== taskKey) return "all";
    return legacy.slice(separator + 1) || "all";
  }

  function writingCategoryMatches(set, selectedTypes) {
    const category = writingTypeForTask(set.task, selectedTypes);
    return category === "all" || set.category === category;
  }

  function writingPool(task, poolName, selectedTypes) {
    const taskNumber = Number(task);
    const taskSets = writingSets.filter((set) => set.task === taskNumber && writingCategoryMatches(set, selectedTypes));
    if (poolName === "all") return taskSets.slice();
    return taskSets.filter((set) => G.progress.writingStatus(set.id) === poolName);
  }

  function chooseWritingSet(sets, lastIds, smartOrder) {
    if (!sets.length) return null;
    const recent = new Set(Array.isArray(lastIds) ? lastIds : []);
    const fresh = sets.filter((set) => !recent.has(set.id));
    const candidates = fresh.length ? fresh : sets;

    // Writing practice asks only one question per selected Task. The previous
    // status sort put the just-finished (now "unfamiliar") question back at
    // the front on every new round, overriding the shuffle and recent guard.
    // Pick from the shuffled non-recent candidates instead, so All is truly
    // random while New / Mastered pools still respect their chosen filter.
    return shuffle(candidates)[0] || null;
  }

  function writingConfiguredQueue(mode, taskPools, selectedTypes, lastIds) {
    const value = String(mode || "full");
    const pools = taskPools && typeof taskPools === "object" ? taskPools : {};
    const validPools = new Set(["all", "new", "unfamiliar", "mastered"]);
    if (["1", "2"].includes(value)) {
      const poolName = pools[value];
      if (!validPools.has(poolName)) return [];
      const selected = chooseWritingSet(writingPool(value, poolName, selectedTypes), lastIds, poolName === "all");
      return selected ? [selected] : [];
    }
    if (value !== "full") return [];
    const selected = [];
    for (const task of ["1", "2"]) {
      const poolName = pools[task];
      if (!validPools.has(poolName)) return [];
      const set = chooseWritingSet(writingPool(task, poolName, selectedTypes), lastIds, poolName === "all");
      if (!set) return [];
      selected.push(set);
    }
    return selected;
  }

  const PROGRESS_KEY = "noah_ielts_practice_v1";
  const defaultProgress = () => ({ speaking: {}, speakingLast: [], reading: {}, writing: {}, writingLast: [] });
  let progress = defaultProgress();

  function loadProgress() {
    try {
      const value = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
      progress = {
        speaking: value && typeof value.speaking === "object" && !Array.isArray(value.speaking) ? value.speaking : {},
        speakingLast: value && Array.isArray(value.speakingLast) ? value.speakingLast.filter((id) => typeof id === "string") : [],
        reading: value && typeof value.reading === "object" && !Array.isArray(value.reading) ? value.reading : {},
        writing: value && typeof value.writing === "object" && !Array.isArray(value.writing) ? value.writing : {},
        writingLast: value && Array.isArray(value.writingLast) ? value.writingLast.filter((id) => typeof id === "string") : [],
      };
    } catch {
      progress = defaultProgress();
    }
    return progress;
  }

  function saveProgress() {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch {
      // Progress is helpful but must never block practice.
    }
  }

  function speakingStatus(id) {
    const record = progress.speaking[id];
    if (!record) return "new";
    if (["new", "unfamiliar", "mastered"].includes(record.status)) return record.status;
    return record.seen > 0 ? "unfamiliar" : "new";
  }

  function readingStatus(id) {
    const record = progress.reading[id];
    if (!record) return "new";
    // Earlier IELTS drafts stored this state as "practice". The original
    // workARK model calls it "unfamiliar", so migrate it when it is read.
    if (record.status === "practice") return "unfamiliar";
    if (["new", "unfamiliar", "mastered"].includes(record.status)) return record.status;
    return (record.seen || record.correct || record.wrong) ? "unfamiliar" : "new";
  }

  function writingStatus(id) {
    const record = progress.writing[id];
    if (!record) return "new";
    if (["new", "unfamiliar", "mastered"].includes(record.status)) return record.status;
    return record.seen > 0 ? "unfamiliar" : "new";
  }

  function statusFor(module, id) {
    if (module === "reading") return readingStatus(id);
    if (module === "writing") return writingStatus(id);
    return speakingStatus(id);
  }

  function isFavorite(module, id) {
    const records = module === "reading"
      ? progress.reading
      : module === "writing" ? progress.writing : progress.speaking;
    return Boolean(records[id] && records[id].fav);
  }

  function toggleFavorite(module, id) {
    if (!["speaking", "reading", "writing"].includes(module)) return false;
    const records = module === "reading"
      ? progress.reading
      : module === "writing" ? progress.writing : progress.speaking;
    const record = records[id] || { seen: 0, correct: 0, wrong: 0, status: "new" };
    record.fav = !record.fav;
    records[id] = record;
    saveProgress();
    return record.fav;
  }

  function markSpeaking(id, completed) {
    const previous = speakingStatus(id);
    const record = progress.speaking[id] || { seen: 0, correct: 0, wrong: 0, status: "new" };
    record.seen += 1;
    if (completed) record.correct = (record.correct || 0) + 1;
    else record.wrong = (record.wrong || 0) + 1;
    const net = Math.max(-2, (record.correct || 0) - (record.wrong || 0));
    if (net >= 3) record.status = "mastered";
    else if (previous === "mastered") record.status = net >= 1 ? "mastered" : "unfamiliar";
    else record.status = "unfamiliar";
    record.last = Date.now();
    progress.speaking[id] = record;
    saveProgress();
    return record;
  }

  function getSpeakingLast() {
    return progress.speakingLast.slice();
  }

  function saveSpeakingLast(ids) {
    const currentIds = new Set(speakingCards.map((card) => card.id));
    const incoming = Array.isArray(ids)
      ? ids.filter((id) => typeof id === "string" && currentIds.has(id))
      : [];
    const incomingSet = new Set(incoming);
    const older = progress.speakingLast.filter((id) => currentIds.has(id) && !incomingSet.has(id));
    progress.speakingLast = incoming.concat(older).slice(0, 24);
    saveProgress();
  }

  function markReading(id, correct) {
    const previous = readingStatus(id);
    const record = progress.reading[id] || { seen: 0, correct: 0, wrong: 0, status: "new" };
    record.seen = (record.seen || 0) + 1;
    if (correct) record.correct = (record.correct || 0) + 1;
    else record.wrong = (record.wrong || 0) + 1;
    const net = Math.max(-2, (record.correct || 0) - (record.wrong || 0));
    if (net >= 3) record.status = "mastered";
    else if (previous === "mastered") record.status = net >= 1 ? "mastered" : "unfamiliar";
    else record.status = "unfamiliar";
    record.last = Date.now();
    progress.reading[id] = record;
    saveProgress();
    return record;
  }

  function markWriting(id, completed) {
    const previous = writingStatus(id);
    const record = progress.writing[id] || { seen: 0, correct: 0, wrong: 0, status: "new" };
    record.seen = (record.seen || 0) + 1;
    if (completed) record.correct = (record.correct || 0) + 1;
    else record.wrong = (record.wrong || 0) + 1;
    const net = Math.max(-2, (record.correct || 0) - (record.wrong || 0));
    if (net >= 3) record.status = "mastered";
    else if (previous === "mastered") record.status = net >= 1 ? "mastered" : "unfamiliar";
    else record.status = "unfamiliar";
    record.last = Date.now();
    progress.writing[id] = record;
    saveProgress();
    return record;
  }

  function getWritingLast() {
    return progress.writingLast.slice();
  }

  function saveWritingLast(ids) {
    const currentIds = new Set(writingSets.map((set) => set.id));
    const incoming = Array.isArray(ids)
      ? ids.filter((id) => typeof id === "string" && currentIds.has(id))
      : [];
    const incomingSet = new Set(incoming);
    const older = progress.writingLast.filter((id) => currentIds.has(id) && !incomingSet.has(id));
    // Keep several completed rounds, not just the immediately previous one.
    // A small category can still fall back to its whole pool once every
    // available question is in this recent list.
    progress.writingLast = incoming.concat(older).slice(0, 12);
    saveProgress();
  }

  function progressStats() {
    const speakingIds = speakingCards.map((card) => card.id);
    const speakingSeen = speakingIds.filter((id) => progress.speaking[id] && progress.speaking[id].seen > 0).length;
    const speakingNew = speakingIds.filter((id) => speakingStatus(id) === "new").length;
    const speakingPractice = speakingIds.filter((id) => speakingStatus(id) === "unfamiliar").length;
    const speakingMastered = speakingIds.filter((id) => speakingStatus(id) === "mastered").length;
    const readingIds = readingWords.map((word) => word.id);
    const readingMastered = readingIds.filter((id) => readingStatus(id) === "mastered").length;
    const readingSeen = readingIds.filter((id) => {
      const record = progress.reading[id];
      return record && (record.seen > 0 || record.correct > 0 || record.wrong > 0);
    }).length;
    const writingIds = writingSets.map((set) => set.id);
    const writingSeen = writingIds.filter((id) => progress.writing[id] && progress.writing[id].seen > 0).length;
    const writingNew = writingIds.filter((id) => writingStatus(id) === "new").length;
    const writingPractice = writingIds.filter((id) => writingStatus(id) === "unfamiliar").length;
    const writingMastered = writingIds.filter((id) => writingStatus(id) === "mastered").length;
    return { speakingSeen, speakingNew, speakingPractice, speakingMastered, readingMastered, readingSeen, writingSeen, writingNew, writingPractice, writingMastered };
  }

  function exportProgress() {
    try {
      const bytes = new TextEncoder().encode(JSON.stringify(progress));
      let binary = "";
      bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
      return btoa(binary);
    } catch {
      return "";
    }
  }

  function importProgress(code) {
    try {
      const binary = atob(String(code || "").trim());
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      const value = JSON.parse(new TextDecoder().decode(bytes));
      if (!value || typeof value !== "object" || Array.isArray(value)) return false;
      progress = {
        speaking: value.speaking && typeof value.speaking === "object" && !Array.isArray(value.speaking) ? value.speaking : {},
        speakingLast: Array.isArray(value.speakingLast) ? value.speakingLast.filter((id) => typeof id === "string") : [],
        reading: value.reading && typeof value.reading === "object" && !Array.isArray(value.reading) ? value.reading : {},
        writing: value.writing && typeof value.writing === "object" && !Array.isArray(value.writing) ? value.writing : {},
        writingLast: Array.isArray(value.writingLast) ? value.writingLast.filter((id) => typeof id === "string") : [],
      };
      saveProgress();
      return true;
    } catch {
      return false;
    }
  }

  function resetProgress() {
    progress = defaultProgress();
    saveProgress();
  }

  G.VERSION = "4.12.4-v43-wordark-button-sound";
  G.DATA = { speakingTests, speakingCards, speakingHints, readingWords, writingSets, writingKeywords, writingPoints, audit };
  G.utils = { shuffle, escapeHtml, speakingSpeechText, speakingPool, speakingQueue, speakingConfiguredQueue, writingPool, writingConfiguredQueue };
  G.progress = {
    load: loadProgress,
    speakingStatus,
    readingStatus,
    writingStatus,
    statusFor,
    isFavorite,
    toggleFavorite,
    markSpeaking,
    getSpeakingLast,
    saveSpeakingLast,
    markReading,
    markWriting,
    getWritingLast,
    saveWritingLast,
    stats: progressStats,
    export: exportProgress,
    import: importProgress,
    reset: resetProgress,
    get records() { return progress; },
  };
})();
