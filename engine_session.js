(function () {
  "use strict";

  const G = window.NoahIELTS;

  function makeState() {
    return {
      screen: "landing",
      selectedModule: "speaking",
      module: "speaking",
      tab: "play",
      overlay: null,
      reviewFilter: "all",
      reviewCategory: "all",
      reviewVisible: 20,
      reviewOpen: {},
      speakingPartPools: { 1: "all", 2: "all", 3: "all" },
      speakingMode: "full",
      speakingSessionPools: null,
      speakingDeck: [],
      speakingIndex: 0,
      speakingRunning: false,
      speakingComplete: false,
      speakingDone: 0,
      speakingHintOpen: false,
      speakingHintIndex: 0,
      readingMode: "blank",
      readingDeck: [],
      readingIndex: 0,
      readingQuestion: null,
      readingAnswer: null,
      readingRunning: false,
      readingComplete: false,
      readingCorrect: 0,
      readingWrong: 0,
      writingTaskPools: { 1: "all", 2: "all" },
      writingMode: "full",
      writingTypeFilters: { 1: "all", 2: "all" },
      writingSetupTask: "1",
      writingSessionSets: [],
      writingSetIndex: 0,
      writingDeck: [],
      writingIndex: 0,
      writingRevealed: [],
      writingQuestionSkipped: false,
      writingPhase: "question",
      writingKeywordIndex: 0,
      writingKeywordSentenceIndex: 0,
      writingKeywordVisibleCount: 0,
      writingKeywordNewestIndex: -1,
      writingKeywordSequenceComplete: false,
      writingRunning: false,
      writingComplete: false,
      writingDone: 0,
      writingQuestionsDone: 0,
      headerExpanded: false,
      speechActive: false,
      notice: "",
      toast: "",
      exportText: "",
    };
  }

  G.init = function () {
    G.root = document.getElementById("app");
    G.state = makeState();
    G.progress.load();

    if (!G.root) throw new Error("Missing #app root.");
    if (!G.DATA.audit.valid || !G.DATA.writingSets.length || !G.DATA.writingKeywords.length || !G.DATA.writingPoints.length) {
      G.root.innerHTML = '<main class="screen"><div class="rev-empty">Question data could not be verified.</div></main>';
      return;
    }

    G.actions.bind();
    G.render();

    // FIX (same landing-screen gap as the WordArk build): the very first
    // forceViewportRecalc() call in index.html runs before #app has any
    // content, so it can't repaint anything. #scr-landing (just built by the
    // G.render() call above) is the first real content to exist - recalc once
    // more now that something is actually on screen to repaint.
    if (window.isStandalonePWA && window.forceViewportRecalc) {
      requestAnimationFrame(window.forceViewportRecalc);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", G.init, { once: true });
  } else {
    G.init();
  }
})();
