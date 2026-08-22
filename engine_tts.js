(function () {
  "use strict";

  const G = (window.NoahIELTS = window.NoahIELTS || {});
  const probe = new Audio();
  const silentAudio = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
  const localeMap = { en: "en-GB" };
  const lastGoodSource = new Map();
  const goodSourceTtl = 3 * 60 * 1000;
  let activeElement = null;
  let activeUtterance = null;
  let sourceTimer = null;
  let voiceTimer = null;
  let speechTimer = null;
  let playToken = 0;
  let mediaUnlocked = false;
  let unlockPromise = null;
  let lastRequestKey = "";
  let lastRequestAt = 0;

  probe.preload = "auto";
  probe.setAttribute("playsinline", "");
  probe.setAttribute("webkit-playsinline", "");

  function nativeLocale(lang) {
    return localeMap[lang] || lang || "en-GB";
  }

  function findNativeVoice(lang) {
    if (!window.speechSynthesis || typeof window.speechSynthesis.getVoices !== "function") return null;
    const target = nativeLocale(lang).toLowerCase();
    const base = target.split("-")[0];
    let voices = [];
    try { voices = window.speechSynthesis.getVoices() || []; } catch (_error) { return null; }
    return voices.find((voice) => String(voice.lang || "").toLowerCase() === target)
      || voices.find((voice) => String(voice.lang || "").toLowerCase().startsWith(`${base}-`))
      || null;
  }

  function primeNativeSpeech(lang) {
    if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === "undefined") return false;
    if (navigator.userActivation && navigator.userActivation.isActive === false) return false;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("\u00a0");
      utterance.lang = nativeLocale(lang);
      utterance.voice = findNativeVoice(lang);
      utterance.volume = 0;
      utterance.rate = 10;
      activeUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (_error) {
      return false;
    }
  }

  function stop() {
    playToken += 1;
    clearTimeout(sourceTimer);
    clearTimeout(voiceTimer);
    clearTimeout(speechTimer);
    sourceTimer = null;
    voiceTimer = null;
    speechTimer = null;
    if (activeElement) {
      activeElement.onplaying = null;
      activeElement.onended = null;
      activeElement.onerror = null;
      try { activeElement.pause(); activeElement.currentTime = 0; } catch (_error) {}
      activeElement = null;
    }
    activeUtterance = null;
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (_error) {}
  }

  function unlock(requestedLang, skipProbe) {
    const lang = requestedLang || "en";
    primeNativeSpeech(lang);
    if (mediaUnlocked || skipProbe) return Promise.resolve(true);
    if (unlockPromise) return unlockPromise;
    const token = playToken;
    probe.src = silentAudio;
    probe.playbackRate = 1;
    probe.volume = 1;
    probe.load();
    let result;
    try { result = probe.play(); } catch (_error) { return Promise.resolve(false); }
    unlockPromise = new Promise((resolve) => {
      let settled = false;
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        mediaUnlocked = ok;
        unlockPromise = null;
        resolve(ok);
      };
      const timeout = setTimeout(() => {
        if (token === playToken) {
          try { probe.pause(); probe.currentTime = 0; } catch (_error) {}
        }
        finish(false);
      }, 1500);
      Promise.resolve(result).then(() => {
        if (token !== playToken) return finish(false);
        try { probe.pause(); probe.currentTime = 0; } catch (_error) {}
        finish(true);
      }).catch(() => finish(false));
    });
    return unlockPromise;
  }

  function speakNative(text, lang, rate, token, complete, onStart) {
    if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === "undefined") {
      complete();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = nativeLocale(lang);
    utterance.rate = rate;
    activeUtterance = utterance;
    const deadline = Date.now() + 600;

    function begin(voice) {
      if (token !== playToken) return;
      if (voice) utterance.voice = voice;
      let started = false;
      utterance.onstart = function () {
        if (token !== playToken) return;
        started = true;
        clearTimeout(speechTimer);
        if (typeof onStart === "function") onStart();
      };
      utterance.onend = function () {
        if (token !== playToken) return;
        clearTimeout(speechTimer);
        activeUtterance = null;
        complete();
      };
      utterance.onerror = function () {
        if (token !== playToken) return;
        clearTimeout(speechTimer);
        activeUtterance = null;
        complete();
      };
      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        speechTimer = setTimeout(function () {
          if (token !== playToken || started) return;
          try { window.speechSynthesis.cancel(); } catch (_error) {}
          activeUtterance = null;
          complete();
        }, 3000);
      } catch (_error) {
        activeUtterance = null;
        complete();
      }
    }

    function chooseVoice() {
      if (token !== playToken) return;
      const voice = findNativeVoice(lang);
      if (voice || Date.now() >= deadline) {
        begin(voice);
        return;
      }
      voiceTimer = setTimeout(chooseVoice, 120);
    }
    chooseVoice();
  }

  function say(text, requestedLang, rate, patient, onEnded, onStart) {
    const sourceText = String(text || "").trim();
    if (!sourceText) {
      if (typeof onEnded === "function") onEnded();
      return;
    }
    const lang = requestedLang || "en";
    const playbackRate = Number(rate) || 0.9;
    const waitForGoogle = patient !== false;
    const requestKey = `${lang}|${sourceText}`;
    const now = Date.now();
    if (waitForGoogle && requestKey === lastRequestKey && now - lastRequestAt < 400) {
      if (typeof onEnded === "function") onEnded();
      return;
    }
    lastRequestKey = requestKey;
    lastRequestAt = now;

    if (unlockPromise) {
      const queuedToken = playToken;
      unlockPromise.finally(function () {
        if (queuedToken === playToken) say(sourceText, lang, playbackRate, waitForGoogle, onEnded, onStart);
      });
      return;
    }

    stop();
    const token = playToken;
    let completed = false;
    function complete() {
      if (completed || token !== playToken) return;
      completed = true;
      if (typeof onEnded === "function") onEnded();
    }

    const clean = sourceText.replace(/\|/g, " ").replace(/[!?.]/g, " ").replace(/\s+/g, " ").trim();
    const sources = [];
    const singleEnglishWord = lang === "en" && !clean.includes(" ");
    const dictionaryHeadword = singleEnglishWord && !/[’']/.test(clean) && !/(ing|ed|es|s)$/i.test(clean);
    function addDictionarySources() {
      const word = clean.toLowerCase();
      const timeout = waitForGoogle ? 7000 : 1000;
      sources.push({ id: "dictionary-gstatic-gb", timeout, url: `https://ssl.gstatic.com/dictionary/static/sounds/20200429/${word}--_gb_1.mp3` });
      sources.push({ id: "dictionary-gstatic-us", timeout, url: `https://ssl.gstatic.com/dictionary/static/sounds/20200429/${word}--_us_1.mp3` });
      sources.push({ id: "dictionary-api-uk", timeout, url: `https://api.dictionaryapi.dev/media/pronunciations/en/${word}-uk.mp3` });
    }
    if (dictionaryHeadword) addDictionarySources();
    sources.push({
      id: "google-primary",
      timeout: waitForGoogle ? 1500 : 900,
      url: `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&q=${encodeURIComponent(clean)}`,
    });
    sources.push({
      id: "google-backup",
      timeout: waitForGoogle ? 1000 : 650,
      url: `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=${lang}&q=${encodeURIComponent(clean)}`,
    });
    if (singleEnglishWord && !dictionaryHeadword) addDictionarySources();

    const remembered = lastGoodSource.get(requestKey);
    if (remembered && Date.now() - remembered.at < goodSourceTtl) {
      const index = sources.findIndex((source) => source.id === remembered.id);
      if (index > 0) sources.unshift(sources.splice(index, 1)[0]);
    }

    let sourceIndex = 0;
    G.tts._sourceAttempts = [];
    G.tts._lastSource = null;
    G.tts._lastFailure = null;

    // Fires the moment audio is genuinely audible (real playback, not just a
    // request being attempted), whichever source ends up succeeding. Callers
    // use this to know it is now unsafe to interrupt without cutting sound
    // off mid-word — only the true "started" signal should extend any of
    // their own pacing timers, never a fixed guess at network latency.
    let started = false;
    function fireStart() {
      if (started || token !== playToken) return;
      started = true;
      if (typeof onStart === "function") onStart();
    }

    function tryNextSource() {
      if (token !== playToken) return;
      if (sourceIndex >= sources.length) {
        speakNative(sourceText, lang, playbackRate, token, complete, fireStart);
        return;
      }
      const source = sources[sourceIndex];
      G.tts._sourceAttempts.push(source.id);
      const element = new Audio(source.url);
      activeElement = element;
      element.playbackRate = playbackRate;
      element.setAttribute("playsinline", "");
      let settled = false;
      function fail(reason, error) {
        if (settled || token !== playToken) return;
        settled = true;
        clearTimeout(sourceTimer);
        element.onplaying = null;
        element.onended = null;
        element.onerror = null;
        try { element.pause(); } catch (_error) {}
        G.tts._lastFailure = { source: source.id, reason, name: error && error.name ? error.name : "" };
        if (reason === "not-allowed") {
          mediaUnlocked = false;
          speakNative(sourceText, lang, playbackRate, token, complete, fireStart);
          return;
        }
        sourceIndex += 1;
        tryNextSource();
      }
      element.onplaying = function () {
        if (token !== playToken) return;
        clearTimeout(sourceTimer);
        mediaUnlocked = true;
        G.tts._lastSource = source.id;
        lastGoodSource.set(requestKey, { id: source.id, at: Date.now() });
        fireStart();
      };
      element.onended = function () {
        if (token !== playToken) return;
        settled = true;
        clearTimeout(sourceTimer);
        activeElement = null;
        complete();
      };
      element.onerror = function () { fail("source-error"); };
      sourceTimer = setTimeout(function () { fail("timeout"); }, source.timeout);
      let result;
      try { result = element.play(); } catch (error) {
        fail(error && error.name === "NotAllowedError" ? "not-allowed" : "play-rejected", error);
        return;
      }
      if (result && typeof result.catch === "function") {
        result.catch(function (error) {
          fail(error && error.name === "NotAllowedError" ? "not-allowed" : "play-rejected", error);
        });
      }
    }
    tryNextSource();
  }

  function diagnostics() {
    return {
      mediaUnlocked,
      attemptedSources: (G.tts._sourceAttempts || []).slice(),
      lastSource: G.tts._lastSource || null,
      lastFailure: G.tts._lastFailure || null,
    };
  }

  G.tts = { say, stop, unlock, diagnostics };
})();
