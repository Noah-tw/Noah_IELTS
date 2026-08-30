(function () {
  "use strict";

  const G = window.NoahIELTS;
  let writingKeywordTimer = null;
  let writingKeywordSequenceToken = 0;

  function render() { G.render(); }

  function stopActiveTools() {
    stopWritingKeywordSequence();
    if (G.actions) {
      G.actions.stopSpeech(false);
    }
    G.state.notice = "";
  }

  function selectLandingModule(module) {
    if (!['speaking', 'writing'].includes(module)) return;
    G.state.selectedModule = module;
    render();
  }

  function startSelectedModule() {
    openModule(G.state.selectedModule);
  }

  function openModule(module) {
    if (!['speaking', 'writing'].includes(module)) return;
    stopActiveTools();
    G.state.module = module;
    G.state.selectedModule = module;
    G.state.screen = "module";
    G.state.tab = "play";
    G.state.overlay = null;
    G.state.reviewCategory = "all";
    G.state.reviewVisible = 20;
    G.state.reviewOpen = {};
    G.state.speakingRunning = false;
    G.state.speakingComplete = false;
    G.state.speakingHintOpen = false;
    G.state.speakingHintIndex = 0;
    G.state.readingRunning = false;
    G.state.readingComplete = false;
    G.state.writingRunning = false;
    G.state.writingComplete = false;
    G.state.writingSessionSets = [];
    G.state.writingSetIndex = 0;
    G.state.writingRevealed = [];
    G.state.writingQuestionSkipped = false;
    G.state.writingPhase = "question";
    G.state.writingKeywordIndex = 0;
    G.state.writingKeywordSentenceIndex = 0;
    G.state.writingKeywordVisibleCount = 0;
    G.state.writingKeywordNewestIndex = -1;
    G.state.writingKeywordSequenceComplete = false;
    G.state.headerExpanded = false;
    render();
  }

  function goLanding() {
    stopActiveTools();
    G.state.screen = "landing";
    G.state.overlay = null;
    G.state.headerExpanded = false;
    render();
  }

  function goModuleMenu() {
    stopActiveTools();
    G.state.screen = "module";
    G.state.tab = "play";
    G.state.overlay = null;
    G.state.speakingRunning = false;
    G.state.speakingComplete = false;
    G.state.speakingHintOpen = false;
    G.state.speakingHintIndex = 0;
    G.state.readingRunning = false;
    G.state.readingComplete = false;
    G.state.writingRunning = false;
    G.state.writingComplete = false;
    G.state.writingSessionSets = [];
    G.state.writingSetIndex = 0;
    G.state.writingRevealed = [];
    G.state.writingQuestionSkipped = false;
    G.state.writingPhase = "question";
    G.state.writingKeywordIndex = 0;
    G.state.writingKeywordSentenceIndex = 0;
    G.state.writingKeywordVisibleCount = 0;
    G.state.writingKeywordNewestIndex = -1;
    G.state.writingKeywordSequenceComplete = false;
    G.state.headerExpanded = false;
    render();
  }

  function setTab(tab) {
    if (!['play', 'review'].includes(tab)) return;
    stopActiveTools();
    G.state.tab = tab;
    G.state.reviewVisible = 20;
    G.state.reviewOpen = {};
    render();
    if (tab === "play" && G.state.writingRunning && G.state.writingPhase === "keyword-list" && !G.state.writingKeywordSequenceComplete) {
      resumeWritingKeywordSequence();
    }
  }

  function openOverlay(name) {
    stopActiveTools();
    G.state.overlay = name;
    render();
  }

  function closeOverlay() {
    G.state.overlay = null;
    render();
    if (G.state.tab === "play" && G.state.writingRunning && G.state.writingPhase === "keyword-list" && !G.state.writingKeywordSequenceComplete) {
      resumeWritingKeywordSequence();
    }
  }

  function setReviewFilter(filter) {
    if (!["all", "new", "unfamiliar", "mastered", "favorite"].includes(filter)) return;
    G.state.reviewFilter = filter;
    G.state.reviewVisible = 20;
    G.state.reviewOpen = {};
    render();
  }

  function setReviewCategory(category) {
    G.state.reviewCategory = String(category || "all");
    G.state.reviewVisible = 20;
    G.state.reviewOpen = {};
    G.state.overlay = null;
    render();
  }

  function toggleReviewFavorite(module, id) {
    G.progress.toggleFavorite(module, id);
    render();
  }

  function toggleReviewCard(module, id) {
    const key = `${module}:${id}`;
    G.state.reviewOpen[key] = !G.state.reviewOpen[key];
    render();
  }

  function showMoreReview() {
    G.state.reviewVisible += 20;
    render();
  }

  function speakReviewItem(module, id) {
    const items = module === "reading"
      ? G.DATA.readingWords
      : module === "writing" ? G.DATA.writingSets : G.DATA.speakingCards;
    const item = items.find((entry) => entry.id === id);
    if (!item || !G.actions) return;
    G.actions.speak(module === "reading"
      ? item.word
      : module === "writing" ? item.sourceQuestion : item.text);
  }

  function speakReviewSentence(id, index) {
    const word = G.DATA.readingWords.find((entry) => entry.id === id);
    const sentence = word && word[`sentence${Number(index)}`];
    if (sentence && G.actions) G.actions.speak(sentence);
  }

  function speakingPartPools() {
    const pools = G.state.speakingPartPools;
    if (!pools || typeof pools !== "object") {
      G.state.speakingPartPools = { 1: "all", 2: "all", 3: "all" };
    }
    return G.state.speakingPartPools;
  }

  function openSpeakingPools() {
    stopActiveTools();
    G.state.overlay = "speaking-pools";
    render();
  }

  function setSpeakingPartPool(part, pool) {
    const value = String(part);
    if (!["1", "2", "3"].includes(value)) return;
    if (!["all", "new", "unfamiliar", "mastered", "none"].includes(pool)) return;
    const pools = speakingPartPools();
    if (pool === "none") {
      pools[value] = null;
      render();
      return;
    }
    if (!G.utils.speakingPool(value, pool).length) {
      const labels = { all: "All", new: "New", unfamiliar: "Practice", mastered: "Mastered" };
      G.actions.toast(`No ${labels[pool]} questions are available for Part ${value}.`);
      return;
    }
    pools[value] = pool;
    render();
  }

  function startSpeaking(mode) {
    stopActiveTools();
    if (G.actions) G.actions.unlockSpeech(true);
    const value = String(mode || G.state.speakingMode || "full");
    if (!["full", "1", "2", "3"].includes(value)) return;
    const previous = G.progress.getSpeakingLast();
    const pools = speakingPartPools();
    const deck = G.utils.speakingConfiguredQueue(value, pools, previous);
    const incompleteFull = value === "full" && deck.length !== 3;
    if (!deck.length || incompleteFull) {
      G.state.speakingRunning = false;
      G.state.speakingComplete = false;
      if (value === "full") G.actions.toast("Full Test needs an available question in every Part.");
      else if (!pools[value]) G.actions.toast(`Choose a Pool for Part ${value} first.`);
      else G.actions.toast(`No questions are available for Part ${value}.`);
      return;
    }
    G.state.speakingMode = value;
    G.state.speakingSessionPools = { 1: pools[1], 2: pools[2], 3: pools[3] };
    G.state.speakingDeck = deck;
    G.progress.saveSpeakingLast(deck.map((item) => item.id));
    G.state.speakingIndex = 0;
    G.state.speakingRunning = true;
    G.state.speakingComplete = false;
    G.state.speakingDone = 0;
    G.state.speakingHintOpen = false;
    G.state.speakingHintIndex = 0;
    G.state.headerExpanded = false;
    G.state.screen = "module";
    G.state.tab = "play";
    render();
    if (G.actions) G.actions.speakCurrent();
  }

  function startSpeakingMode(mode) {
    if (!['full', '1', '2', '3'].includes(String(mode))) return;
    G.state.overlay = null;
    startSpeaking(String(mode));
  }

  function currentSpeaking() {
    return G.state.speakingDeck[G.state.speakingIndex] || null;
  }

  function toggleSpeakingHint() {
    const item = currentSpeaking();
    if (!item || !Array.isArray(item.hints) || !item.hints.length) return;
    G.state.speakingHintOpen = !G.state.speakingHintOpen;
    render();
  }

  function nextSpeakingHint() {
    const item = currentSpeaking();
    if (!item || !Array.isArray(item.hints) || item.hints.length < 2) return;
    G.state.speakingHintOpen = true;
    G.state.speakingHintIndex = (G.state.speakingHintIndex + 1) % item.hints.length;
    render();
  }

  function nextSpeaking(markDone) {
    if (markDone === false) {
      skipSpeaking();
      return;
    }
    const item = currentSpeaking();
    if (!item) return;
    stopActiveTools();
    G.progress.markSpeaking(item.id, true);
    G.state.speakingDone += 1;
    if (G.state.speakingIndex >= G.state.speakingDeck.length - 1) {
      G.state.speakingRunning = false;
      G.state.speakingComplete = true;
    } else {
      G.state.speakingIndex += 1;
    }
    G.state.speakingHintOpen = false;
    G.state.speakingHintIndex = 0;
    render();
    if (G.state.speakingRunning && G.actions) G.actions.speakCurrent();
  }

  function skipSpeaking() {
    const item = currentSpeaking();
    if (!item) return;
    stopActiveTools();
    G.progress.markSpeaking(item.id, false);
    item._skipCount = (item._skipCount || 0) + 1;
    const remaining = G.state.speakingDeck.length - G.state.speakingIndex;

    if (item._skipCount >= remaining) {
      if (G.state.speakingIndex >= G.state.speakingDeck.length - 1) {
        G.state.speakingRunning = false;
        G.state.speakingComplete = true;
      } else {
        G.state.speakingIndex += 1;
      }
    } else {
      G.state.speakingDeck.splice(G.state.speakingIndex, 1);
      G.state.speakingDeck.push(item);
    }

    G.state.speakingHintOpen = false;
    G.state.speakingHintIndex = 0;
    render();
    if (G.state.speakingRunning && G.actions) G.actions.speakCurrent();
  }

  function repeatSpeaking() {
    startSpeaking(G.state.speakingMode);
  }

  function findSentenceForm(word) {
    const sentence = String(word.sentence1 || "");
    const forms = [word.word].concat(Array.isArray(word.forms) ? word.forms : [])
      .filter(Boolean)
      .sort((a, b) => String(b).length - String(a).length);
    for (const form of forms) {
      const escaped = String(form).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const match = sentence.match(new RegExp(`(^|[^A-Za-z])(${escaped})(?![A-Za-z])`, "i"));
      if (match) return match[2];
    }
    return word.word;
  }

  function blankSentence(word, answer) {
    const sentence = String(word.sentence1 || "");
    const escaped = String(answer).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return sentence.replace(new RegExp(escaped, "i"), "___");
  }

  function makeReadingQuestion(word) {
    const pool = G.DATA.readingWords.filter((item) => item.id !== word.id);
    const distractors = G.utils.shuffle(pool).slice(0, 3);
    if (G.state.readingMode === "matching") {
      return {
        word,
        prompt: word.word,
        promptLabel: "Choose the definition",
        correctId: word.id,
        choices: G.utils.shuffle([word].concat(distractors)).map((item) => ({ id: item.id, label: item.meaning })),
      };
    }
    if (G.state.readingMode === "listening") {
      return {
        word,
        prompt: "",
        promptLabel: "Listen and choose the word",
        correctId: word.id,
        choices: G.utils.shuffle([word].concat(distractors)).map((item) => ({ id: item.id, label: item.word })),
      };
    }
    const answer = findSentenceForm(word);
    return {
      word,
      prompt: blankSentence(word, answer),
      promptLabel: "Complete the sentence",
      correctId: word.id,
      choices: G.utils.shuffle([
        { id: word.id, label: answer },
        ...distractors.map((item) => ({ id: item.id, label: item.word })),
      ]),
    };
  }

  function chooseReadingMode(mode) {
    if (!['blank', 'matching', 'listening'].includes(mode)) return;
    G.state.readingMode = mode;
    G.state.overlay = null;
    render();
  }

  function startReading() {
    stopActiveTools();
    G.state.readingDeck = G.utils.shuffle(G.DATA.readingWords).slice(0, 20);
    G.state.readingIndex = 0;
    G.state.readingAnswer = null;
    G.state.readingQuestion = makeReadingQuestion(G.state.readingDeck[0]);
    G.state.readingRunning = true;
    G.state.readingComplete = false;
    G.state.readingCorrect = 0;
    G.state.readingWrong = 0;
    G.state.screen = "module";
    G.state.tab = "play";
    render();
  }

  function chooseReadingAnswer(id) {
    if (!G.state.readingQuestion || G.state.readingAnswer) return;
    const correct = id === G.state.readingQuestion.correctId;
    G.state.readingAnswer = { id, correct };
    if (correct) G.state.readingCorrect += 1;
    else G.state.readingWrong += 1;
    G.progress.markReading(G.state.readingQuestion.word.id, correct);
    if (G.actions) G.actions.playSound(correct ? "correct" : "wrong");
    render();
  }

  function nextReading(markDone) {
    if (!G.state.readingQuestion) return;
    stopActiveTools();
    if (markDone === false && !G.state.readingAnswer) G.progress.markReading(G.state.readingQuestion.word.id, false);
    if (G.state.readingIndex >= G.state.readingDeck.length - 1) {
      G.state.readingRunning = false;
      G.state.readingComplete = true;
      G.state.readingQuestion = null;
      G.state.readingAnswer = null;
    } else {
      G.state.readingIndex += 1;
      G.state.readingAnswer = null;
      G.state.readingQuestion = makeReadingQuestion(G.state.readingDeck[G.state.readingIndex]);
    }
    render();
  }

  function repeatReading() {
    startReading();
  }

  function currentWriting() {
    return G.state.writingDeck[G.state.writingIndex] || null;
  }

  function currentWritingSet() {
    return G.state.writingSessionSets[G.state.writingSetIndex] || null;
  }

  function currentWritingKeyword() {
    const set = currentWritingSet();
    if (!set || !Array.isArray(set.keywords)) return null;
    return set.keywords[G.state.writingKeywordIndex] || null;
  }

  function stopWritingKeywordSequence() {
    writingKeywordSequenceToken += 1;
    clearTimeout(writingKeywordTimer);
    writingKeywordTimer = null;
  }

  function revealNextWritingKeyword(token) {
    if (token !== writingKeywordSequenceToken) return;
    if (!G.state.writingRunning || G.state.writingPhase !== "keyword-list") return;
    if (G.state.overlay || G.state.tab !== "play") {
      writingKeywordTimer = setTimeout(function () { revealNextWritingKeyword(token); }, 250);
      return;
    }

    const set = currentWritingSet();
    const keywords = set && Array.isArray(set.keywords) ? set.keywords : [];
    const visible = Math.max(0, Number(G.state.writingKeywordVisibleCount) || 0);
    if (visible >= keywords.length) {
      if (keywords.length && !G.state.writingKeywordSequenceComplete) {
        // If the learner left this screen while the final word was speaking,
        // replay that last word when they return instead of silently marking
        // the sequence complete.
        G.state.writingKeywordVisibleCount = keywords.length - 1;
        revealNextWritingKeyword(token);
        return;
      }
      G.state.writingKeywordSequenceComplete = true;
      G.state.writingKeywordNewestIndex = -1;
      render();
      return;
    }

    const nextIndex = visible;
    const nextCount = nextIndex + 1;
    G.state.writingKeywordVisibleCount = nextCount;
    G.state.writingKeywordNewestIndex = nextIndex;
    G.state.writingKeywordSequenceComplete = false;
    render();
    // The DOM has captured the newest item. Clear the state marker now so a
    // later TTS-related re-render cannot replay the entrance animation.
    G.state.writingKeywordNewestIndex = -1;

    const keyword = keywords[nextIndex];
    if (!keyword || !G.actions) return;
    let continued = false;
    let started = false;
    function continueSequence() {
      if (continued || token !== writingKeywordSequenceToken) return;
      continued = true;
      clearTimeout(writingKeywordTimer);
      if (nextCount >= keywords.length) {
        G.state.writingKeywordSequenceComplete = true;
        render();
        return;
      }
      writingKeywordTimer = setTimeout(function () { revealNextWritingKeyword(token); }, 240);
    }

    // Two different fallbacks, because "no source has even started playing
    // yet" and "audio is genuinely mid-word" call for different rhythm.
    // Before real playback begins, G.tts.say()'s own source cascade (3
    // dictionary lookups + Google primary + Google backup, each with its own
    // timeout, patient:false) can legitimately take up to ~4.5s before it
    // even reaches the native-voice fallback, and native voice adds up to
    // another ~3.6s worst case before it's provably stuck. 8500ms sits above
    // that whole bound, so this pre-start timer only ever fires for a truly
    // broken browser - never as a race against a cascade that's still
    // legitimately in progress (a shorter value here was the actual cause of
    // the reported bug: the timer fired while a source had *just* started
    // playing, and the resulting "move to next word" call stopped that
    // still-playing audio mid-word).
    writingKeywordTimer = setTimeout(function () {
      if (!started) continueSequence();
    }, 8500);
    G.actions.speak(keyword.term, {
      quiet: true,
      patient: false,
      rate: 0.84,
      onStart: function () {
        // continued guards against a late-arriving onStart for a word we
        // already gave up on and moved past (see the "never started"
        // fallback above) - without it, this could reset the *next* word's
        // shared writingKeywordTimer and reintroduce the same cut-off bug
        // one word later.
        if (started || continued || token !== writingKeywordSequenceToken) return;
        started = true;
        clearTimeout(writingKeywordTimer);
        writingKeywordTimer = setTimeout(continueSequence, 4000);
      },
      onEnded: continueSequence,
    });
  }

  function skipWritingKeywordList() {
    const set = currentWritingSet();
    if (!set || !G.state.writingRunning || G.state.writingPhase !== "keyword-list") return;
    // stopActiveTools() bumps writingKeywordSequenceToken and cancels any
    // pending timer/TTS callback, so the in-flight word's onStart/onEnded
    // (and the 4000ms/8500ms fallbacks racing it) can never fire after this
    // point and collide with the audio we're about to start for the card
    // screen below - same guard advanceWritingFlow() already relies on.
    stopActiveTools();
    const keywords = Array.isArray(set.keywords) ? set.keywords : [];
    G.state.writingKeywordVisibleCount = keywords.length;
    G.state.writingKeywordNewestIndex = -1;
    G.state.writingKeywordSequenceComplete = true;
    G.state.writingPhase = "keyword-card";
    G.state.writingKeywordIndex = 0;
    G.state.writingKeywordSentenceIndex = 0;
    render();
    speakWritingKeyword();
  }

  function skipWritingKeywords() {
    const set = currentWritingSet();
    if (!set || !G.state.writingRunning || !["keyword-list", "keyword-card"].includes(G.state.writingPhase)) return;
    // This is a genuine opt-out from the whole Additional Keywords section,
    // distinct from skipWritingKeywordList(), which only ends the animated
    // one-by-one introduction and opens the cards. Cancel the active TTS and
    // invalidate every pending list callback before entering paraphrase.
    stopActiveTools();
    const keywords = Array.isArray(set.keywords) ? set.keywords : [];
    G.state.writingKeywordVisibleCount = keywords.length;
    G.state.writingKeywordNewestIndex = -1;
    G.state.writingKeywordSequenceComplete = true;
    G.state.writingPhase = "paraphrase";
    G.state.writingIndex = 0;
    G.state.writingRevealed = [];
    render();
  }

  function resumeWritingKeywordSequence() {
    stopWritingKeywordSequence();
    const token = writingKeywordSequenceToken;
    revealNextWritingKeyword(token);
  }

  function startWritingKeywordSequence() {
    G.state.writingKeywordVisibleCount = 0;
    G.state.writingKeywordNewestIndex = -1;
    G.state.writingKeywordSequenceComplete = false;
    resumeWritingKeywordSequence();
  }

  function writingTaskPools() {
    const pools = G.state.writingTaskPools;
    if (!pools || typeof pools !== "object") G.state.writingTaskPools = { 1: "all", 2: "all" };
    return G.state.writingTaskPools;
  }

  function writingTypeFilters() {
    const filters = G.state.writingTypeFilters;
    if (!filters || typeof filters !== "object" || Array.isArray(filters)) {
      G.state.writingTypeFilters = { 1: "all", 2: "all" };
    }
    return G.state.writingTypeFilters;
  }

  function openWritingPools() {
    stopActiveTools();
    G.state.overlay = "writing-pools";
    render();
  }

  function openWritingSetup(task) {
    stopActiveTools();
    const requestedTask = String(task || "");
    if (["1", "2"].includes(requestedTask)) G.state.writingSetupTask = requestedTask;
    else if (!["1", "2"].includes(String(G.state.writingSetupTask))) G.state.writingSetupTask = "1";
    G.state.overlay = "writing-setup";
    render();
  }

  function setWritingTaskPool(task, pool) {
    const value = String(task);
    if (!["1", "2"].includes(value)) return;
    if (!["all", "new", "unfamiliar", "mastered", "none"].includes(pool)) return;
    const pools = writingTaskPools();
    if (pool === "none") {
      pools[value] = null;
      render();
      return;
    }
    if (!G.utils.writingPool(value, pool, writingTypeFilters()).length) {
      const labels = { all: "All", new: "New", unfamiliar: "Practice", mastered: "Mastered" };
      G.actions.toast(`No ${labels[pool]} questions are available for Task ${value}.`);
      return;
    }
    pools[value] = pool;
    render();
  }

  function openWritingCategories() {
    openWritingSetup();
  }

  function setWritingSetupTask(task) {
    const value = String(task);
    if (!["1", "2"].includes(value)) return;
    G.state.writingSetupTask = value;
    render();
  }

  function setWritingCategory(task, category) {
    let taskValue = String(task || "");
    let categoryValue = String(category || "all");

    // Accept the earlier "1:Maps & Plans" action shape while an already-open
    // page is upgrading in memory. New UI actions always send Task separately.
    if (!["1", "2"].includes(taskValue)) {
      const legacy = taskValue;
      const separator = legacy.indexOf(":");
      if (separator < 0) return;
      taskValue = legacy.slice(0, separator);
      categoryValue = legacy.slice(separator + 1) || "all";
    }
    if (!["1", "2"].includes(taskValue)) return;
    const validCategories = new Set(G.DATA.writingSets
      .filter((set) => set.task === Number(taskValue))
      .map((set) => set.category));
    if (categoryValue !== "all" && !validCategories.has(categoryValue)) return;
    writingTypeFilters()[taskValue] = categoryValue;
    render();
  }

  function startWriting(mode) {
    stopActiveTools();
    if (G.actions) G.actions.unlockSpeech(false);
    const value = String(mode || G.state.writingMode || "full");
    if (!["full", "1", "2"].includes(value)) return;
    const pools = writingTaskPools();
    const previous = G.progress.getWritingLast();
    const sessionSets = G.utils.writingConfiguredQueue(value, pools, writingTypeFilters(), previous);
    const incompleteFull = value === "full" && sessionSets.length !== 2;
    if (!sessionSets.length || incompleteFull) {
      if (value === "full") G.actions.toast("Full Writing needs an available question in both Tasks.");
      else if (!pools[value]) G.actions.toast(`Choose a Pool for Task ${value} first.`);
      else G.actions.toast(`No questions are available for Task ${value}.`);
      G.state.writingRunning = false;
      G.state.writingComplete = false;
      return;
    }
    const firstSet = sessionSets[0];
    if (!firstSet || !Array.isArray(firstSet.points) || !firstSet.points.length) {
      G.actions.toast("Writing practice is not available.");
      return;
    }
    G.state.writingMode = value;
    G.state.writingSessionSets = sessionSets;
    G.state.writingSetIndex = 0;
    G.progress.saveWritingLast(sessionSets.map((set) => set.id));
    G.state.writingDeck = firstSet.points.slice();
    G.state.writingIndex = 0;
    G.state.writingRevealed = [];
    G.state.writingQuestionSkipped = false;
    G.state.writingPhase = "question";
    G.state.writingKeywordIndex = 0;
    G.state.writingKeywordSentenceIndex = 0;
    G.state.writingKeywordVisibleCount = 0;
    G.state.writingKeywordNewestIndex = -1;
    G.state.writingKeywordSequenceComplete = false;
    G.state.writingRunning = true;
    G.state.writingComplete = false;
    G.state.writingDone = 0;
    G.state.writingQuestionsDone = 0;
    G.state.headerExpanded = false;
    G.state.screen = "module";
    G.state.tab = "play";
    render();
    speakWritingQuestion();
  }

  function startWritingMode(mode) {
    if (!["full", "1", "2"].includes(String(mode))) return;
    G.state.overlay = null;
    startWriting(String(mode));
  }

  function speakWritingQuestion() {
    const set = currentWritingSet();
    const question = set ? String(set.sourceQuestion || "").trim() : "";
    if (question && G.actions) G.actions.speak(question);
  }

  function speakWritingKeyword() {
    const keyword = currentWritingKeyword();
    if (keyword && G.actions) G.actions.speak(keyword.term);
  }

  function speakWritingKeywordAt(index) {
    const set = currentWritingSet();
    const keywords = set && Array.isArray(set.keywords) ? set.keywords : [];
    const keyword = keywords[Number(index)];
    if (keyword && G.actions) G.actions.speak(keyword.term);
  }

  function speakWritingKeywordSentence() {
    const keyword = currentWritingKeyword();
    if (!keyword || !Array.isArray(keyword.examples) || !keyword.examples.length || !G.actions) return;
    const index = Math.max(0, Math.min(keyword.examples.length - 1, G.state.writingKeywordSentenceIndex || 0));
    G.actions.speak(keyword.examples[index]);
  }

  function advanceWritingFlow() {
    const set = currentWritingSet();
    if (!set || !G.state.writingRunning) return;
    // A premature/duplicate tap must be a harmless no-op.  Previously the
    // shared stopActiveTools() call ran first, invalidated the sequence token
    // and cancelled its safety timer, then this branch returned because the
    // list was not complete.  That left the learner permanently stranded on
    // the list if a touch event arrived while the button state and final TTS
    // callback were crossing.  Keep the active sequence alive until leaving
    // the phase is actually allowed.
    if (G.state.writingPhase === "keyword-list" && !G.state.writingKeywordSequenceComplete) return;
    stopActiveTools();
    if (G.state.writingPhase === "question") {
      G.state.writingPhase = "keyword-list";
      startWritingKeywordSequence();
      return;
    }
    if (G.state.writingPhase === "keyword-list") {
      G.state.writingPhase = "keyword-card";
      G.state.writingKeywordIndex = 0;
      G.state.writingKeywordSentenceIndex = 0;
      render();
      speakWritingKeyword();
      return;
    }
    if (G.state.writingPhase === "keyword-card") {
      const keywords = Array.isArray(set.keywords) ? set.keywords : [];
      if (G.state.writingKeywordIndex < keywords.length - 1) {
        G.state.writingKeywordIndex += 1;
        G.state.writingKeywordSentenceIndex = 0;
        render();
        speakWritingKeyword();
      } else {
        G.state.writingPhase = "paraphrase";
        G.state.writingIndex = 0;
        G.state.writingRevealed = [];
        render();
      }
    }
  }

  function nextWritingKeywordSentence() {
    const keyword = currentWritingKeyword();
    if (!keyword || !Array.isArray(keyword.examples) || keyword.examples.length < 2) return;
    stopActiveTools();
    G.state.writingKeywordSentenceIndex = ((G.state.writingKeywordSentenceIndex || 0) + 1) % keyword.examples.length;
    render();
    speakWritingKeywordSentence();
  }

  function revealWriting(index) {
    if (G.state.writingPhase !== "paraphrase") return;
    const point = currentWriting();
    if (!point || !Array.isArray(point.branches)) return;
    const row = Number(index);
    if (!Number.isInteger(row) || row < 0 || row >= point.branches.length) return;
    const revealed = Array.isArray(G.state.writingRevealed)
      ? G.state.writingRevealed.slice()
      : [];
    if (revealed[row]) return;
    revealed[row] = true;
    G.state.writingRevealed = revealed;
    if (G.actions) G.actions.playSound("writing-reveal", row);
    const allRevealed = point.branches.every((_branch, branchIndex) => revealed[branchIndex]);
    render();
    // A revealed rewrite is learned by sight and sound. On the last row the
    // completion chime waits until pronunciation ends so the sounds stay clear.
    if (G.actions) {
      G.actions.speak(point.branches[row].reveal, {
        quiet: true,
        patient: false,
        rate: 0.86,
        onEnded: allRevealed ? function () { G.actions.playSound("writing-complete"); } : null,
      });
    }
  }

  // Shared stepping logic for leaving the current paraphrase point, used by
  // both nextWriting (counted, all branches were revealed) and skipWriting
  // (not counted, revealed or not).
  function advanceWritingDeck(counted) {
    const completedIndex = G.state.writingIndex;
    if (counted) G.state.writingDone += 1;
    else G.state.writingQuestionSkipped = true;
    if (completedIndex >= G.state.writingDeck.length - 1) {
      const completedSet = currentWritingSet();
      // A question is a successful attempt only when every paraphrase point
      // was fully revealed. Keyword study remains optional, but skipping even
      // one paraphrase must keep the question in Practice instead of quietly
      // accumulating a false correct answer and eventually becoming Mastered.
      if (completedSet) G.progress.markWriting(completedSet.id, !G.state.writingQuestionSkipped);
      G.state.writingQuestionsDone += 1;
      if (G.state.writingSetIndex < G.state.writingSessionSets.length - 1) {
        G.state.writingSetIndex += 1;
        const nextSet = currentWritingSet();
        G.state.writingDeck = nextSet && Array.isArray(nextSet.points) ? nextSet.points.slice() : [];
        G.state.writingIndex = 0;
        G.state.writingRevealed = [];
        G.state.writingQuestionSkipped = false;
        G.state.writingPhase = "question";
        G.state.writingKeywordIndex = 0;
        G.state.writingKeywordSentenceIndex = 0;
        G.state.writingKeywordVisibleCount = 0;
        G.state.writingKeywordNewestIndex = -1;
        G.state.writingKeywordSequenceComplete = false;
      } else {
        G.state.writingRunning = false;
        G.state.writingComplete = true;
        G.state.headerExpanded = false;
      }
    } else {
      G.state.writingIndex += 1;
      G.state.writingRevealed = [];
    }
  }

  function nextWriting() {
    if (G.state.writingPhase !== "paraphrase" || !G.state.writingRunning) return;
    const point = currentWriting();
    if (!point || !Array.isArray(point.branches)) return;
    const revealed = Array.isArray(G.state.writingRevealed) ? G.state.writingRevealed : [];
    if (!point.branches.every((_branch, branchIndex) => revealed[branchIndex])) return;
    stopActiveTools();
    advanceWritingDeck(true);
    render();
    if (G.state.writingRunning && G.state.writingPhase === "question") speakWritingQuestion();
  }

  function skipWriting() {
    if (G.state.writingPhase !== "paraphrase" || !G.state.writingRunning) return;
    stopActiveTools();
    advanceWritingDeck(false);
    render();
    if (G.state.writingRunning && G.state.writingPhase === "question") speakWritingQuestion();
  }

  function repeatWriting() {
    startWriting(G.state.writingMode);
  }

  function toggleHeader() {
    if (!(G.state.speakingRunning || G.state.writingRunning)) return;
    G.state.headerExpanded = !G.state.headerExpanded;
    if (typeof document !== "undefined") {
      const screen = document.getElementById("scr-game");
      if (screen) {
        screen.classList.toggle("hdr-collapsed", !G.state.headerExpanded);
        screen.classList.toggle("hdr-expanded-midround", G.state.headerExpanded);
        return;
      }
    }
    render();
  }

  function importProgress(code) {
    const ok = G.progress.import(code);
    G.state.overlay = null;
    G.actions.toast(ok ? "Progress imported." : "That progress code is not valid.");
  }

  function resetProgress() {
    G.progress.reset();
    G.state.overlay = null;
    G.actions.toast("Progress reset.");
  }

  G.modes = {
    currentSpeaking,
    currentWriting,
    currentWritingSet,
    currentWritingKeyword,
    selectLandingModule,
    startSelectedModule,
    openModule,
    goLanding,
    goModuleMenu,
    setTab,
    openOverlay,
    closeOverlay,
    setReviewFilter,
    setReviewCategory,
    toggleReviewFavorite,
    toggleReviewCard,
    showMoreReview,
    speakReviewItem,
    speakReviewSentence,
    openSpeakingPools,
    setSpeakingPartPool,
    startSpeaking,
    startSpeakingMode,
    toggleSpeakingHint,
    nextSpeakingHint,
    nextSpeaking,
    skipSpeaking,
    repeatSpeaking,
    chooseReadingMode,
    startReading,
    chooseReadingAnswer,
    nextReading,
    repeatReading,
    openWritingPools,
    openWritingSetup,
    setWritingTaskPool,
    openWritingCategories,
    setWritingSetupTask,
    setWritingCategory,
    startWriting,
    startWritingMode,
    speakWritingQuestion,
    advanceWritingFlow,
    skipWritingKeywordList,
    skipWritingKeywords,
    nextWritingKeywordSentence,
    speakWritingKeyword,
    speakWritingKeywordAt,
    speakWritingKeywordSentence,
    revealWriting,
    nextWriting,
    skipWriting,
    repeatWriting,
    toggleHeader,
    importProgress,
    resetProgress,
  };
})();
