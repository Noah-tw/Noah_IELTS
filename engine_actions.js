(function () {
  "use strict";

  const G = window.NoahIELTS;
  let audioContext = null;
  let speechToken = 0;
  let toastId = null;
  let bound = false;

  function context() {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return null;
    if (!audioContext) audioContext = new AudioCtor();
    if (audioContext.state === "suspended") audioContext.resume().catch(function () {});
    return audioContext;
  }

  function tone(frequency, duration, volume, delay, type) {
    const ctx = context();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = ctx.currentTime + (delay || 0);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.type = type || "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    oscillator.start(start);
    oscillator.stop(start + duration);
  }

  function playSound(kind, variant) {
    if (kind === "writing-tap") {
      tone(250, 0.045, 0.055, 0, "sine");
      tone(500, 0.035, 0.035, 0.012, "triangle");
      return;
    }
    if (kind === "writing-reveal") {
      const step = Math.max(0, Math.min(2, Number(variant) || 0));
      const frequency = [659, 740, 831][step];
      tone(frequency, 0.11, 0.13, 0, "triangle");
      tone(frequency * 2, 0.065, 0.04, 0.018, "sine");
      return;
    }
    if (kind === "writing-complete") {
      tone(659, 0.09, 0.13, 0.07, "triangle");
      tone(831, 0.09, 0.12, 0.15, "triangle");
      tone(988, 0.15, 0.13, 0.23, "triangle");
      return;
    }
    if (kind === "correct") {
      tone(523, 0.1, 0.2);
      tone(784, 0.1, 0.18, 0.06);
      tone(1047, 0.12, 0.15, 0.12);
      return;
    }
    if (kind === "wrong") {
      tone(190, 0.16, 0.12, 0, "sawtooth");
      return;
    }
    if (kind === "done") {
      tone(523, 0.08, 0.2);
      tone(659, 0.08, 0.2, 0.09);
      tone(784, 0.08, 0.2, 0.18);
      tone(1047, 0.2, 0.22, 0.27);
      return;
    }
    tone(1050, 0.05, 0.1);
  }

  function cleanSpeech(text) {
    return String(text || "")
      .replaceAll("[Why/Why not?]", "Why, or why not?")
      .replaceAll("[Why?/Why not?]", "Why, or why not?")
      .replaceAll("[Why/Why not]", "Why, or why not?")
      .replaceAll("[Why?]", "Why?")
      .replaceAll("[Why]", "Why?")
      .replaceAll("[", "")
      .replaceAll("]", "");
  }

  function stopSpeech(renderAfter) {
    speechToken += 1;
    if (G.tts) G.tts.stop();
    else if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (G.state) G.state.speechActive = false;
    if (renderAfter && G.render) G.render();
  }

  function speak(text, options) {
    const settings = options && typeof options === "object" ? options : {};
    const renderUi = settings.quiet !== true;
    const onEnded = typeof settings.onEnded === "function" ? settings.onEnded : null;
    if (!G.tts || typeof G.tts.say !== "function") {
      G.state.notice = "Speech playback is not available in this browser.";
      if (renderUi) G.render();
      if (onEnded) onEnded();
      return;
    }
    stopSpeech(false);
    const token = ++speechToken;
    G.state.speechActive = true;
    G.state.notice = "";
    if (renderUi) G.render();
    G.tts.say(cleanSpeech(text), "en", Number(settings.rate) || 0.88, settings.patient !== false, function () {
      if (token !== speechToken) return;
      G.state.speechActive = false;
      if (renderUi) G.render();
      if (onEnded) onEnded();
    });
  }

  function unlockSpeech(skipProbe) {
    if (!G.tts || typeof G.tts.unlock !== "function") return Promise.resolve(false);
    try { return G.tts.unlock("en", Boolean(skipProbe)); }
    catch (_error) { return Promise.resolve(false); }
  }

  function currentSpeechText() {
    if (G.state.module === "writing") return "";
    const item = G.modes.currentSpeaking();
    if (!item) return "";
    return item.text;
  }

  function speakCurrent() {
    const text = currentSpeechText();
    if (text) speak(text);
  }

  function toast(message) {
    clearTimeout(toastId);
    G.state.toast = message;
    G.render();
    toastId = setTimeout(function () {
      G.state.toast = "";
      G.render();
    }, 2600);
  }

  function handleAction(element) {
    const action = element.dataset.action;
    if (!action) return;

    if (action === "select-module") G.modes.selectLandingModule(element.dataset.module);
    else if (action === "start-selected") G.modes.startSelectedModule();
    else if (action === "go-landing") G.modes.goLanding();
    else if (action === "go-module") G.modes.goModuleMenu();
    else if (action === "switch-module") G.modes.openModule(element.dataset.module);
    else if (action === "set-tab") G.modes.setTab(element.dataset.tab);
    else if (action === "open-overlay") G.modes.openOverlay(element.dataset.overlay);
    else if (action === "close-overlay") G.modes.closeOverlay();
    else if (action === "set-review-filter") G.modes.setReviewFilter(element.dataset.filter);
    else if (action === "choose-review-category") G.modes.setReviewCategory(element.dataset.category);
    else if (action === "toggle-review-favorite") G.modes.toggleReviewFavorite(element.dataset.module, element.dataset.id);
    else if (action === "toggle-review-card") G.modes.toggleReviewCard(element.dataset.module, element.dataset.id);
    else if (action === "show-more-review") G.modes.showMoreReview();
    else if (action === "speak-review") G.modes.speakReviewItem(element.dataset.module, element.dataset.id);
    else if (action === "speak-review-sentence") G.modes.speakReviewSentence(element.dataset.id, element.dataset.index);
    else if (action === "open-speaking-pools") G.modes.openSpeakingPools();
    else if (action === "set-speaking-part-pool") G.modes.setSpeakingPartPool(element.dataset.part, element.dataset.pool);
    else if (action === "start-speaking") G.modes.startSpeaking();
    else if (action === "start-speaking-mode") G.modes.startSpeakingMode(element.dataset.mode);
    else if (action === "toggle-speaking-hint") G.modes.toggleSpeakingHint();
    else if (action === "next-speaking-hint") G.modes.nextSpeakingHint();
    else if (action === "next-speaking") G.modes.nextSpeaking(true);
    else if (action === "skip-speaking") G.modes.skipSpeaking();
    else if (action === "repeat-speaking") G.modes.repeatSpeaking();
    else if (action === "open-writing-pools") G.modes.openWritingPools();
    else if (action === "open-writing-setup") G.modes.openWritingSetup();
    else if (action === "set-writing-task-pool") G.modes.setWritingTaskPool(element.dataset.task, element.dataset.pool);
    else if (action === "open-writing-categories") G.modes.openWritingCategories();
    else if (action === "choose-writing-category") G.modes.setWritingCategory(element.dataset.category);
    else if (action === "start-writing") G.modes.startWriting();
    else if (action === "start-writing-mode") G.modes.startWritingMode(element.dataset.mode);
    else if (action === "advance-writing-flow") G.modes.advanceWritingFlow();
    else if (action === "next-writing-keyword-sentence") G.modes.nextWritingKeywordSentence();
    else if (action === "speak-writing-keyword") G.modes.speakWritingKeyword();
    else if (action === "speak-writing-keyword-list") G.modes.speakWritingKeywordAt(element.dataset.index);
    else if (action === "speak-writing-keyword-sentence") G.modes.speakWritingKeywordSentence();
    else if (action === "reveal-writing") G.modes.revealWriting(Number(element.dataset.index));
    else if (action === "next-writing") G.modes.nextWriting();
    else if (action === "skip-writing") G.modes.skipWriting();
    else if (action === "repeat-writing") G.modes.repeatWriting();
    else if (action === "toggle-header") G.modes.toggleHeader();
    else if (action === "speak-current") {
      if (G.state.speechActive) stopSpeech(true);
      else speakCurrent();
    }
    else if (action === "export-progress") {
      const code = G.progress.export();
      G.state.exportText = code;
      if (navigator.clipboard && code) navigator.clipboard.writeText(code).catch(function () {});
      toast(code ? "Progress code copied." : "Progress could not be exported.");
    }
    else if (action === "import-progress") {
      const box = document.getElementById("xp-box");
      G.modes.importProgress(box ? box.value : "");
    }
    else if (action === "confirm-reset") G.modes.openOverlay("reset");
    else if (action === "reset-progress") G.modes.resetProgress();
  }

  function onPointerDown(event) {
    if (!(event.target instanceof Element)) return;
    const control = event.target.closest("button,[data-action]");
    if (!control || control.disabled) return;
    if (control.dataset.action === "reveal-writing") {
      playSound("writing-tap");
      return;
    }
    playSound("click");
  }

  function onClick(event) {
    if (!(event.target instanceof Element)) return;
    const backdrop = event.target.closest("[data-overlay-backdrop]");
    if (backdrop && event.target === backdrop) {
      G.modes.closeOverlay();
      return;
    }
    const element = event.target.closest("[data-action]");
    if (element && !element.disabled) handleAction(element);
  }

  function onKeyDown(event) {
    if (event.key === "Escape" && G.state.overlay) G.modes.closeOverlay();
  }

  G.actions = {
    bind: function () {
      if (bound) return;
      bound = true;
      document.addEventListener("pointerdown", onPointerDown, { passive: true });
      document.addEventListener("click", onClick);
      document.addEventListener("keydown", onKeyDown);
    },
    playSound,
    speak,
    speakCurrent,
    stopSpeech,
    unlockSpeech,
    toast,
  };
})();
