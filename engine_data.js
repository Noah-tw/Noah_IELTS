(function () {
  "use strict";

  const G = (window.NoahIELTS = window.NoahIELTS || {});
  const rawSpeaking = String(window.CAMBRIDGE_SPEAKING_SOURCE || "");
  const speakingHints = window.SPEAKING_HINTS && typeof window.SPEAKING_HINTS === "object"
    ? window.SPEAKING_HINTS
    : {};
  const rawWritingQuestions = Array.isArray(window.WRITING_SOURCE_QUESTIONS)
    ? window.WRITING_SOURCE_QUESTIONS.slice()
    : [];
  const specialWritingSets = Array.isArray(window.WRITING_PARAPHRASE_DATA)
    ? window.WRITING_PARAPHRASE_DATA.slice()
    : [];
  const writingKeywordPacks = window.WRITING_KEYWORD_PACKS && typeof window.WRITING_KEYWORD_PACKS === "object"
    ? window.WRITING_KEYWORD_PACKS
    : {};
  const writingKeywordNotes = window.WRITING_KEYWORD_NOTES && typeof window.WRITING_KEYWORD_NOTES === "object"
    ? window.WRITING_KEYWORD_NOTES
    : {};
  const writingKeywordThirdExamples = window.WRITING_KEYWORD_THIRD_EXAMPLES && typeof window.WRITING_KEYWORD_THIRD_EXAMPLES === "object"
    ? window.WRITING_KEYWORD_THIRD_EXAMPLES
    : {};

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

  function topicPackName(question) {
    const text = String(question.prompt || "").toLowerCase();
    if (/rail|road|transport|train|traffic|car\b|cars\b|bus\b|buses\b|truck|vehicle|fly\b|flying|airport/.test(text)) return "transport";
    if (/environment|recycl|waste|species|plant|animal|agricultur|water|carbon|emission|energy|biofuel|metal/.test(text)) return "environment";
    if (/school|student|university|education|subject|curriculum|language|children|academic|qualification/.test(text)) return "education";
    if (/health|doctor|medicine|treatment|sugar|food|exercise|physical activity|hospital/.test(text)) return "health";
    if (/technology|online|smartphone|driverless|automation|science|internet|digital/.test(text)) return "technology";
    if (/work|worker|job|employ|profession|business|company|organisation|entrepreneur/.test(text)) return "work";
    if (/economic|economy|income|money|salary|salaries|export|production|consum|budget|price|cost/.test(text)) return "economy";
    if (/music|advertis|fashion|culture|history|newspaper|book|touris|museum|dance/.test(text)) return "culture";
    if (/population|people|society|social|country|countries|city|cities|rural|home|house|elderly|young adults|community/.test(text)) return "society";
    return "generic";
  }

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

  // Small deterministic string hash (djb2), used only to seed a per-question
  // shuffle of a keyword pack — same question always gets the same shuffle,
  // but different questions in the same topic category no longer collapse
  // onto an identical set of words.
  function stableHash(text) {
    let hash = 5381;
    const str = String(text || "");
    for (let i = 0; i < str.length; i += 1) {
      hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
  }

  function seededShuffle(list, seed) {
    const items = list.slice();
    let state = seed || 1;
    for (let i = items.length - 1; i > 0; i -= 1) {
      state = (state * 1103515245 + 12345) & 0x7fffffff;
      const j = state % (i + 1);
      const tmp = items[i];
      items[i] = items[j];
      items[j] = tmp;
    }
    return items;
  }

  function keywordsForQuestion(question, category) {
    const formatPack = question.task === 1
      ? (category === "Maps & Plans" ? "task1Map" : category === "Processes" ? "task1Process" : "task1Data")
      : null;
    const topicPack = topicPackName(question);
    const seed = stableHash(question.id);
    let keywords = [];
    if (formatPack) {
      const shuffledFormat = seededShuffle(writingKeywordPacks[formatPack] || [], seed);
      keywords = shuffledFormat.slice(0, 3);
      const topicChoices = seededShuffle(writingKeywordPacks[topicPack] || writingKeywordPacks.generic || [], seed + 1);
      const topicKeyword = topicChoices[0];
      if (topicKeyword && !keywords.some((item) => item.id === topicKeyword.id)) keywords.push(topicKeyword);
    } else {
      const shuffledTopic = seededShuffle(writingKeywordPacks[topicPack] || writingKeywordPacks.generic || [], seed);
      keywords = shuffledTopic.slice(0, 4);
    }
    const genericFill = seededShuffle(writingKeywordPacks.generic || [], seed + 2);
    for (const keyword of genericFill) {
      if (keywords.length >= 4) break;
      if (!keywords.some((item) => item.id === keyword.id)) keywords.push(keyword);
    }
    return keywords.slice(0, 4).map((keyword) => cloneKeyword(question, keyword));
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
    const tones = ["green", "blue", "purple", "orange"];

    function add(field, regex, focus, lead, reveals, id) {
      if (points.length >= 4) return;
      const text = question.prompt;
      const match = regex.exec(text);
      if (!match) return;
      const point = makePoint(field, match, focus, lead, reveals, `${question.id}-${id}`);
      if (!point) return;
      const start = point._focusStart;
      const end = start + point._focusLength;
      if (used[field].some((range) => start < range.end && end > range.start)) return;
      used[field].push({ start, end });
      point.tone = tones[points.length % tones.length];
      points.push(point);
    }

    if (question.task === 1) {
      add("prompt", /The (?:(?:first|second|third|two|three) )?(?:bar )?(?:charts?|graphs?|diagrams?|maps?|plans?|tables?) below (?:shows|show|gives|give)/i,
        (match) => /(?:shows|show|gives|give)$/i.exec(match[0])[0],
        (match) => match[0].replace(/(?:shows|show|gives|give)$/i, ""),
        [
          (match) => /(?:shows|gives)$/i.test(match[0]) ? "illustrates" : "illustrate",
          (match) => /(?:shows|gives)$/i.test(match[0]) ? "presents" : "present",
          (match) => /(?:shows|gives)$/i.test(match[0]) ? "depicts" : "depict",
        ], "visual-verb");
      add("prompt", /(?:give|gives) information (?:about|on)/i, (match) => match[0], "", [
        (match) => /^gives/i.test(match[0]) ? "provides data on" : "provide data on",
        (match) => /^gives/i.test(match[0]) ? "presents information about" : "present information about",
        (match) => /^gives/i.test(match[0]) ? "offers details on" : "offer details on",
      ], "information");
      add("prompt", /the percentage/i, "percentage", "the ", ["proportion", "share", "percentage figure"], "percentage");
      add("prompt", /the proportions/i, "proportions", "the ", ["percentages", "shares", "relative figures"], "proportions");
      add("prompt", /the number(?!s)/i, "number", "the ", ["figure", "total number", "numerical figure"], "number");
      add("prompt", /the numbers/i, "numbers", "the ", ["figures", "totals", "numerical values"], "numbers");
      add("prompt", /changes/i, "changes", "", ["variations", "shifts", "alterations"], "changes");
      add("prompt", /different (?:purposes|age groups|activities|categories|types|areas|countries|metals)/i, (match) => match[0], "", [
        (match) => `various ${match[0].replace(/^different /i, "")}`,
        (match) => `a range of ${match[0].replace(/^different /i, "")}`,
        (match) => `several ${match[0].replace(/^different /i, "")}`,
      ], "different");
      add("prompt", /between (\d{4}) and (\d{4})/i, (match) => match[0], "", [
        (match) => `from ${match[1]} to ${match[2]}`,
        (match) => `over the ${match[1]}–${match[2]} period`,
        (match) => `during the period spanning ${match[1]} to ${match[2]}`,
      ], "period");
      add("prompt", /plans for (?:its|the site's|the site’s) development/i, (match) => match[0], "", ["proposals for its redevelopment", "planned changes to the area", "redevelopment plans for the site"], "development");
      add("prompt", /after redevelopment/i, "after redevelopment", "", ["following redevelopment", "once it has been redeveloped", "subsequent to redevelopment"], "redevelopment");
      add("prompt", /is manufactured from/i, "is manufactured from", "", ["is produced from", "is made using", "is created from"], "manufactured");
      add("prompt", /is used to produce/i, "is used to produce", "", ["is employed to generate", "is utilised in the production of", "serves to create"], "produce");
      add("prompt", /the amount of/i, "amount", "the ", ["quantity", "volume", "level"], "amount");
      add("prompt", /\bcompares?\b/i, (match) => match[0], "", [
        (match) => /^compares$/i.test(match[0]) ? "contrasts" : "contrast",
        (match) => /^compares$/i.test(match[0]) ? "presents a comparison of" : "present a comparison of",
        (match) => /^compares$/i.test(match[0]) ? "sets out differences between" : "set out differences between",
      ], "compare");
      add("prompt", /compared with/i, "compared with", "", ["in comparison with", "relative to", "when contrasted with"], "compared-with");
      add("prompt", /the average (percentages?|monthly change)/i, (match) => match[0], "", [
        (match) => /percentage/i.test(match[1]) ? "the mean percentage figures" : "the mean monthly variation",
        (match) => /percentage/i.test(match[1]) ? "the typical percentage shares" : "the typical month-to-month change",
        (match) => /percentage/i.test(match[1]) ? "the overall percentage proportions" : "the average monthly movement",
      ], "average");
      add("prompt", /different (?:stages|locations|forms|sources|modes|means)/i, (match) => match[0], "", [
        (match) => `various ${match[0].replace(/^different /i, "")}`,
        (match) => `a range of ${match[0].replace(/^different /i, "")}`,
        (match) => `several ${match[0].replace(/^different /i, "")}`,
      ], "different-extra");
      add("prompt", /road access to/i, "road access to", "", ["routes leading to", "ways of reaching", "transport links to"], "road-access");
      add("prompt", /production and consumption of/i, "production and consumption of", "", ["generation and use of", "output and usage of", "production levels and demand for"], "production-consumption");
      add("prompt", /how electricity is generated/i, "how electricity is generated", "", ["the way electricity is produced", "the process used to generate electricity", "how electrical power is created"], "electricity-generated");
      add("prompt", /when it first opened/i, "when it first opened", "", ["at the time of its opening", "when it initially opened", "at its original opening"], "first-opened");
      add("prompt", /the results of a survey/i, "the results of a survey", "", ["the findings of a survey", "survey results", "the outcomes of a questionnaire"], "survey-results");
      add("prompt", /are manufactured/i, "are manufactured", "", ["are produced", "are made", "are created"], "manufactured-plural");
      add("prompt", /after finishing/i, "after finishing", "", ["following completion of", "after completing", "once they had finished"], "after-finishing");
      add("prompt", /the salaries of/i, "the salaries of", "", ["the earnings of", "the income levels of", "the pay received by"], "salaries");
      add("prompt", /the manufacturing process/i, "the manufacturing process", "", ["the production process", "the process of manufacture", "the sequence used in production"], "manufacturing-process");
      add("prompt", /the process for (making|recycling)/i, (match) => match[0], "", [
        (match) => `the method used for ${match[1].toLowerCase()}`,
        (match) => `the stages involved in ${match[1].toLowerCase()}`,
        (match) => `the procedure for ${match[1].toLowerCase()}`,
      ], "process-for");
      add("prompt", /planned future development/i, "planned future development", "", ["proposed redevelopment", "future development plans", "intended changes to the area"], "future-development");
      add("prompt", /the police budget/i, "the police budget", "", ["funding for the police", "the policing budget", "money allocated to the police"], "police-budget");
      add("prompt", /spent their weekly income/i, "spent their weekly income", "", ["allocated their weekly earnings", "used their weekly income", "distributed their weekly budget"], "weekly-income");
      add("prompt", /the floor plan/i, "the floor plan", "", ["the interior layout", "the building plan", "the internal arrangement"], "floor-plan");
      add("prompt", /how it looks (?:now|today)/i, (match) => match[0], "", ["its present appearance", "what it is like at present", "its current layout"], "looks-now");
      add("prompt", /is produced/i, "is produced", "", ["is made", "is created", "is manufactured"], "produced");
      add("prompt", /the location and types of/i, "the location and types of", "", ["the venues and kinds of", "the places and forms of", "where different kinds of"], "location-types");
      add("prompt", /the total population of/i, "the total population of", "", ["the overall number of residents in", "the entire population of", "the total number of people living in"], "total-population");
      add("prompt", /the same site today/i, "the same site today", "", ["the site in its current form", "the present-day site", "what the site looks like now"], "site-today");
      add("prompt", /a public library/i, "a public library", "", ["a municipal library", "a local public library", "a community library"], "public-library");
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
      add("prompt", /rather than/i, "rather than", "", ["instead of", "as opposed to", "in preference to"], "rather-than");
      add("prompt", /a relatively large number of young adults/i, "a relatively large number of young adults", "", ["a comparatively high proportion of young adults", "a sizeable young-adult population", "a relatively high share of young adults"], "young-adults");
      add("prompt", /the advantages? of ([^.?!]+?) outweigh the disadvantages?/i, (match) => match[0], "", [
        (match) => `the benefits of ${match[1]} exceed the drawbacks`,
        (match) => `the positive effects of ${match[1]} are greater than the negative ones`,
        (match) => `the merits of ${match[1]} are more significant than its limitations`,
      ], "outweigh");
      add("prompt", /cause serious social problems/i, "cause serious social problems", "", ["lead to major social difficulties", "create significant societal problems", "result in severe social challenges"], "social-problems");
      add("prompt", /practical problems/i, "practical problems", "", ["day-to-day difficulties", "practical challenges", "problems in everyday life"], "practical-problems");
      add("prompt", /In the future/i, "In the future", "", ["In the years ahead", "Looking ahead", "In the coming decades"], "future");
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
      add("prompt", /Some people believe/i, "believe", "Some people ", ["argue that", "take the view that", "maintain that"], "some-believe");
      add("prompt", /Others believe/i, "believe", "Others ", ["argue that", "maintain that", "hold the view that"], "others-believe");
      add("prompt", /Other people think/i, "think", "Other people ", ["believe", "take the view that", "maintain that"], "other-think");
      add("prompt", /Some people say/i, "say", "Some people ", ["argue that", "maintain that", "contend that"], "some-say");
      add("prompt", /Many governments think/i, "think", "Many governments ", ["believe", "take the view that", "maintain that"], "governments-think");
      // --- Tier 3: generic single/double-word connectors. These appear ---
      // --- in dozens of prompts, so they are only used as a last-resort ---
      // --- filler once every more specific pattern above has been tried. ---
      add("prompt", /is very important/i, "very important", "is ", ["of great importance", "highly significant", "crucial"], "very-important");
      add("prompt", /is important/i, "important", "is ", ["essential", "of considerable importance", "significant"], "important");
      add("prompt", /the most important/i, "most important", (match) => match[0].slice(0, 4), ["primary", "most significant", "foremost"], "most-important");
      add("prompt", /In many countries/i, "In many countries", "", ["Across numerous countries", "In a wide range of nations", "In countries around the world"], "many-countries");
      add("prompt", /In some countries/i, "In some countries", "", ["In certain countries", "Within a number of nations", "In several parts of the world"], "some-countries");
      add("prompt", /Nowadays/i, (match) => match[0], "", [
        (match) => /^[A-Z]/.test(match[0]) ? "At present" : "at present",
        (match) => /^[A-Z]/.test(match[0]) ? "In contemporary society" : "in contemporary society",
        (match) => /^[A-Z]/.test(match[0]) ? "In the modern era" : "in the modern era",
      ], "nowadays");
      add("prompt", /governments/i, (match) => match[0], "", [
        (match) => /^[A-Z]/.test(match[0]) ? "Authorities" : "authorities",
        (match) => /^[A-Z]/.test(match[0]) ? "National administrations" : "national administrations",
        (match) => /^[A-Z]/.test(match[0]) ? "Public authorities" : "public authorities",
      ], "governments");
      add("prompt", /children/i, "children", "", ["young people", "younger members of society", "the younger generation"], "children");
      add("prompt", /people/i, "people", "", ["individuals", "members of the public", "members of society"], "people");
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
      return Object.assign({}, special, question, {
        id: question.id,
        category,
        sourceQuestion,
        sourceLabel: question.sourceLabel,
        taskInstruction,
        keywords: (special.keywords || []).map((keyword) => cloneKeyword(question, keyword)),
        points: (special.points || []).map((point, index) => Object.assign({}, point, { id: `${question.id}-special-${index + 1}` })),
        instructionSegments: [{ text: taskInstruction }],
      });
    }
    const points = collectWritingPoints(question);
    return Object.assign({}, question, {
      category,
      sourceQuestion: question.prompt,
      questionSegments: segmentsFor(question.prompt, points, "prompt"),
      instructionSegments: [{ text: question.taskInstruction }],
      keywords: keywordsForQuestion(question, category),
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
  audit.writingKeywordNotesValid = writingKeywords.every((item) => /[\u3400-\u9FFF]/.test(String(item.note || "")));
  audit.writingKeywordExamplesValid = writingKeywords.every((item) => Array.isArray(item.examples)
    && Array.isArray(item.examplesZh)
    && item.examples.length === 3
    && item.examplesZh.length === 3);
  audit.writingParaphraseVariantsValid = writingPoints.every((item) => Array.isArray(item.branches) && item.branches.length >= 3);
  audit.writingPromptOnly = writingPoints.every((item) => item.field !== "instruction");
  audit.valid = audit.tests === 44
    && audit.part1Sets === 44
    && audit.part2Sets === 44
    && audit.part3Sets === 44
    && audit.writingTask1 === 40
    && audit.writingTask2 === 40
    && audit.writingKeywordNoteTemplates === 89
    && audit.writingKeywordNotesValid
    && audit.writingKeywordExamplesValid
    && audit.writingParaphraseVariantsValid
    && audit.writingPromptOnly
    && writingSets.every((item) => item.points.length >= 2 && item.keywords.length >= 3);

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
  audit.speakingHintsValid = audit.speakingHintEntries === speakingCards.length
    && speakingCards.every((card) => Array.isArray(card.hints)
      && card.hints.length >= 2
      && card.hints.length <= 3
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

  function writingCategoryMatches(set, selectedCategory) {
    const value = String(selectedCategory || "all");
    if (value === "all") return true;
    const separator = value.indexOf(":");
    if (separator < 0) return true;
    const selectedTask = Number(value.slice(0, separator));
    const category = value.slice(separator + 1);
    return set.task !== selectedTask || set.category === category;
  }

  function writingPool(task, poolName, selectedCategory) {
    const taskNumber = Number(task);
    const taskSets = writingSets.filter((set) => set.task === taskNumber && writingCategoryMatches(set, selectedCategory));
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

  function writingConfiguredQueue(mode, taskPools, selectedCategory, lastIds) {
    const value = String(mode || "full");
    const pools = taskPools && typeof taskPools === "object" ? taskPools : {};
    const validPools = new Set(["all", "new", "unfamiliar", "mastered"]);
    if (["1", "2"].includes(value)) {
      const poolName = pools[value];
      if (!validPools.has(poolName)) return [];
      const selected = chooseWritingSet(writingPool(value, poolName, selectedCategory), lastIds, poolName === "all");
      return selected ? [selected] : [];
    }
    if (value !== "full") return [];
    const selected = [];
    for (const task of ["1", "2"]) {
      const poolName = pools[task];
      if (!validPools.has(poolName)) return [];
      const set = chooseWritingSet(writingPool(task, poolName, selectedCategory), lastIds, poolName === "all");
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

  G.VERSION = "3.0.0-paraphrase-random-keyword-notes";
  G.DATA = { speakingTests, speakingCards, speakingHints, readingWords, writingSets, writingKeywords, writingPoints, audit };
  G.utils = { shuffle, escapeHtml, speakingPool, speakingQueue, speakingConfiguredQueue, writingPool, writingConfiguredQueue };
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
