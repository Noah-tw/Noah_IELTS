(function () {
  "use strict";

  const G = window.NoahIELTS;
  let audioContext = null;
  let audioResumePromise = null;
  let pendingSoundStarts = 0;
  let speechToken = 0;
  let speechDelayTimer = null;
  let soundBusyUntil = 0;
  let toastId = null;
  let bound = false;
  const soundReleaseGapMs = 70;
  const activeButtonSounds = new Set();
  // Exact generic click from Noah WordArk: 1100 Hz sine, 60 ms, gain 0.2.
  // WordArk also plays this matching WAV 80 ms later as a mobile-audio backup.
  const wordArkClickBackupDelayMs = 80;
  const wordArkClickSoundUrl = "data:audio/wav;base64,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";

  function context() {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return null;
    try {
      if (!audioContext) audioContext = new AudioCtor();
    } catch (_error) {
      return null;
    }
    return audioContext;
  }

  function ensureAudioContextRunning(ctx) {
    if (!ctx) return Promise.resolve(null);
    if (ctx.state === "running") return Promise.resolve(ctx);
    if (audioResumePromise) return audioResumePromise;
    audioResumePromise = new Promise(function (resolve) {
      let settled = false;
      function finish(value) {
        if (settled) return;
        settled = true;
        clearTimeout(timeoutId);
        resolve(value);
      }
      const timeoutId = setTimeout(function () { finish(null); }, 600);
      let result;
      try { result = ctx.resume(); }
      catch (_error) { finish(null); return; }
      Promise.resolve(result).then(function () {
        finish(ctx.state === "running" ? ctx : null);
      }).catch(function () { finish(null); });
    }).finally(function () { audioResumePromise = null; });
    return audioResumePromise;
  }

  function markSoundBusy(duration, delay) {
    const soundEnd = Date.now() + Math.ceil(((delay || 0) + duration) * 1000) + soundReleaseGapMs;
    soundBusyUntil = Math.max(soundBusyUntil, soundEnd);
  }

  function scheduleTone(ctx, frequency, duration, volume, delay, type) {
    if (!ctx || ctx.state !== "running") return;
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
    oscillator.onended = function () {
      try {
        oscillator.disconnect();
        gain.disconnect();
      } catch (_error) {}
    };
    markSoundBusy(duration, delay);
  }

  function tone(frequency, duration, volume, delay, type) {
    const ctx = context();
    if (!ctx) return;
    markSoundBusy(duration, delay);
    if (ctx.state === "running") {
      scheduleTone(ctx, frequency, duration, volume, delay, type);
      return;
    }
    // Safari/PWA commonly creates a suspended context.  Do not schedule a
    // 50ms oscillator until resume() has actually completed, or the entire
    // button sound can expire while the context clock is still stopped.
    pendingSoundStarts += 1;
    ensureAudioContextRunning(ctx).then(function (ready) {
      if (ready) scheduleTone(ready, frequency, duration, volume, delay, type);
    }).finally(function () {
      pendingSoundStarts = Math.max(0, pendingSoundStarts - 1);
    });
  }

  function playWordArkButtonSound() {
    // Keep WordArk's intended click unchanged. The oscillator is the primary
    // sound; its byte-identical WAV is a delayed rescue path for mobile devices
    // that temporarily suppress Web Audio.
    tone(1100, 0.06, 0.2, 0, "sine");
    setTimeout(function () {
      markSoundBusy(0.06, 0);
      if (typeof Audio === "undefined") return;
      let element;
      try { element = new Audio(wordArkClickSoundUrl); }
      catch (_error) { return; }
      element.preload = "auto";
      element.playbackRate = 1;
      element.muted = false;
      element.volume = 1;
      element.setAttribute("playsinline", "");
      element.setAttribute("webkit-playsinline", "");
      activeButtonSounds.add(element);
      let finished = false;
      function release() {
        if (finished) return;
        finished = true;
        activeButtonSounds.delete(element);
        element.onended = null;
        element.onerror = null;
      }
      element.onended = release;
      element.onerror = release;
      let result;
      try { result = element.play(); }
      catch (_error) { release(); return; }
      if (result && typeof result.catch === "function") result.catch(release);
      setTimeout(release, 600);
    }, wordArkClickBackupDelayMs);
  }

  function playSound(kind, variant) {
    if (kind === "writing-tap") {
      tone(250, 0.045, 0.055, 0, "sine");
      tone(500, 0.035, 0.035, 0.012, "triangle");
      return;
    }
    if (kind === "writing-reveal") {
      // The reveal list has no fixed branch cap. Cycle through six distinct
      // notes instead of clamping every branch after the fourth to one tone.
      const frequencies = [659, 740, 831, 932, 1047, 1175];
      const step = Math.max(0, Number(variant) || 0) % frequencies.length;
      const frequency = frequencies[step];
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
    playWordArkButtonSound();
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
    clearTimeout(speechDelayTimer);
    speechDelayTimer = null;
    if (G.tts) G.tts.stop();
    else if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (G.state) G.state.speechActive = false;
    if (renderAfter && G.render) G.render();
  }

  function speak(text, options) {
    const settings = options && typeof options === "object" ? options : {};
    const renderUi = settings.quiet !== true;
    const onEnded = typeof settings.onEnded === "function" ? settings.onEnded : null;
    const onStart = typeof settings.onStart === "function" ? settings.onStart : null;
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

    function beginSpeechWhenSoundIsClear() {
      if (token !== speechToken) return;
      if (pendingSoundStarts > 0) {
        speechDelayTimer = setTimeout(beginSpeechWhenSoundIsClear, 25);
        return;
      }
      const remaining = soundBusyUntil - Date.now();
      if (remaining > 0) {
        // Recheck when the timer fires: another quick tap may have extended
        // the sound-effect window after this speech request was queued.
        speechDelayTimer = setTimeout(beginSpeechWhenSoundIsClear, remaining);
        return;
      }
      speechDelayTimer = null;
      G.tts.say(cleanSpeech(text), "en", Number(settings.rate) || 0.88, settings.patient !== false, function () {
        if (token !== speechToken) return;
        G.state.speechActive = false;
        if (renderUi) G.render();
        if (onEnded) onEnded();
      }, function () {
        if (token !== speechToken) return;
        if (onStart) onStart();
      });
    }

    beginSpeechWhenSoundIsClear();
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
    else if (action === "set-writing-setup-task") G.modes.setWritingSetupTask(element.dataset.task);
    else if (action === "set-writing-task-pool") G.modes.setWritingTaskPool(element.dataset.task, element.dataset.pool);
    else if (action === "open-writing-categories") G.modes.openWritingCategories();
    else if (action === "choose-writing-category") G.modes.setWritingCategory(element.dataset.task, element.dataset.category);
    else if (action === "start-writing") G.modes.startWriting();
    else if (action === "start-writing-mode") G.modes.startWritingMode(element.dataset.mode);
    else if (action === "advance-writing-flow") G.modes.advanceWritingFlow();
    else if (action === "skip-writing-keyword-list") G.modes.skipWritingKeywordList();
    else if (action === "skip-writing-keywords") G.modes.skipWritingKeywords();
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
    if (event.key === "Escape" && G.state.overlay) {
      G.modes.closeOverlay();
      return;
    }
    if (event.repeat || !["Enter", " "].includes(event.key) || !(event.target instanceof Element)) return;
    const control = event.target.closest('[role="button"][data-action]');
    if (!control || control.disabled) return;
    event.preventDefault();
    handleAction(control);
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
