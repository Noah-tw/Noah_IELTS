(function () {
  "use strict";

  const G = window.NoahIELTS;
  const esc = G.utils.escapeHtml;

  const speakingPoolLabels = {
    all: "📚 All",
    new: "✨ New",
    unfamiliar: "🔁 Practice",
    mastered: "🏆 Mastered",
  };
  const speakingPartDetails = {
    1: ["Part 1", "Interview"],
    2: ["Part 2", "Long Turn"],
    3: ["Part 3", "Discussion"],
  };
  const reviewPartIcons = { 1: "🎙️", 2: "🗣️", 3: "💬" };
  const readingModeLabels = {
    blank: "Fill the Blank",
    matching: "Meaning Match",
    listening: "Listening",
  };

  function moduleIcon(module, className) {
    const classes = className ? ` ${className}` : "";
    if (module === "speaking") {
      return `<svg class="ielts-icon${classes}" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <rect x="11" y="3.5" width="10" height="16" rx="5" fill="currentColor"></rect>
        <path d="M7.5 15.5v1a8.5 8.5 0 0 0 17 0v-1M16 25v4M11 29h10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></path>
      </svg>`;
    }
    return `<svg class="ielts-icon${classes}" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M7 4.5h12l5 5V27H7z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"></path>
      <path d="M19 4.5v5h5M11 14h8M11 18h6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="m13 25 1-4 8-8 3 3-8 8z" fill="currentColor"></path>
    </svg>`;
  }

  function percent(value, total) {
    return total ? Math.min(100, Math.round((value / total) * 100)) : 0;
  }

  function partPool(part) {
    const pools = G.state.speakingPartPools || {};
    return pools[String(part)] || null;
  }

  function partPoolCount(part) {
    const pool = partPool(part);
    return pool ? G.utils.speakingPool(String(part), pool).length : 0;
  }

  function partPracticeAvailable(part) {
    return Boolean(partPool(part)) && partPoolCount(part) > 0;
  }

  function fullPracticeAvailable() {
    return [1, 2, 3].every((part) => Boolean(partPool(part)) && partPoolCount(part) > 0);
  }

  function writingTaskPool(task) {
    const pools = G.state.writingTaskPools || {};
    return pools[String(task)] || null;
  }

  function writingTaskPoolCount(task) {
    const pool = writingTaskPool(task);
    return pool ? G.utils.writingPool(String(task), pool, G.state.writingCategory).length : 0;
  }

  function writingTaskAvailable(task) {
    return Boolean(writingTaskPool(task)) && writingTaskPoolCount(task) > 0;
  }

  function fullWritingAvailable() {
    return [1, 2].every((task) => writingTaskAvailable(task));
  }

  function writingCategories(task) {
    return Array.from(new Set(G.DATA.writingSets.filter((set) => set.task === Number(task)).map((set) => set.category))).sort();
  }

  function renderSpeakingPoolSummary() {
    const labels = [1, 2, 3].map((part) => {
      const pool = partPool(part);
      const label = pool ? speakingPoolLabels[pool].replace(/^\S+\s/, "") : "None";
      return `P${part} ${label}`;
    });
    return `<button class="btn-filter active speaking-pool-filter" data-action="open-speaking-pools" aria-label="Edit Speaking Part Pools">
      <span class="btn-filter-label">${labels.join(" · ")}</span>
      <span class="btn-filter-arrow">▾</span>
    </button>`;
  }

  function renderWritingFilters() {
    const labels = [1, 2].map((task) => {
      const pool = writingTaskPool(task);
      const label = pool ? speakingPoolLabels[pool].replace(/^\S+\s/, "") : "None";
      return `T${task} ${label}`;
    });
    const categoryValue = String(G.state.writingCategory || "all");
    const categoryLabel = categoryValue === "all"
      ? "All categories"
      : `T${categoryValue.slice(0, categoryValue.indexOf(":"))} · ${categoryValue.slice(categoryValue.indexOf(":") + 1)}`;
    return `<button class="btn-filter active writing-practice-filter" data-action="open-writing-setup" aria-label="Edit Writing practice selection">
      <span class="writing-filter-icon" aria-hidden="true">📂</span>
      <span class="writing-filter-copy">
        <strong>${labels.join(" · ")}</strong>
        <small>${esc(categoryLabel)}</small>
      </span>
      <span class="btn-filter-arrow">▾</span>
    </button>`;
  }

  function renderLanding() {
    const selected = G.state.selectedModule;
    const stats = G.progress.stats();
    const isSpeaking = selected === "speaking";
    const total = isSpeaking ? G.DATA.audit.totalSpeakingCards : G.DATA.writingSets.length;
    const done = isSpeaking ? stats.speakingSeen : stats.writingSeen;
    const progress = percent(done, total);
    const secondLabel = "Practised";
    const unitLabel = isSpeaking ? "Prompts" : "Questions";

    return `
      <div id="scr-landing" class="screen">
        <div class="l-inner">
          <div class="l-hero">
            <div class="l-owl-wrap"><div class="l-owl">🦜</div></div>
            <div class="l-title">Noah's <em>IELTS Practice</em></div>
            <div class="l-byline">crafted by <span class="l-byline-emphasis">Noah</span></div>
            <div class="l-sub">Speaking &amp; Writing support</div>
          </div>

          <div class="l-lang-section">
            <span class="l-lang-label">Practice</span>
            <div class="ielts-module-grid">
              <button class="l-lang ielts-module-card ${selected === "speaking" ? "sel" : ""}" data-action="select-module" data-module="speaking">
                <span class="l-lang-flag"><span class="ielts-module-icon speaking-icon">${moduleIcon("speaking")}</span></span>
                <span class="l-lang-code">Speaking</span>
                <small>Cambridge 10–20</small>
              </button>
              <button class="l-lang ielts-module-card ${selected === "writing" ? "sel" : ""}" data-action="select-module" data-module="writing">
                <span class="l-lang-flag"><span class="ielts-module-icon writing-icon">${moduleIcon("writing")}</span></span>
                <span class="l-lang-code">Writing</span>
                <small>Question · Keywords · Paraphrase</small>
              </button>
            </div>
          </div>

          <div class="l-stats">
            <div class="l-stat"><div class="l-sv">${total}</div><div class="l-sl">${unitLabel}</div></div>
            <div class="l-stat"><div class="l-sv">${done}</div><div class="l-sl">${secondLabel}</div></div>
          </div>

          <div class="l-prog">
            <div class="l-prog-label"><span>Progress</span><span>${progress}%</span></div>
            <div class="prog-track"><div class="prog-fill" style="width:${progress}%"></div></div>
          </div>

          <button class="btn-go" data-action="start-selected">Start 🚀</button>
          <button class="btn-ghost" data-action="open-overlay" data-overlay="settings">⚙️ Settings &amp; Export/Import</button>
          <div class="source-note">Exact supplied questions · No generated question wording</div>
        </div>
      </div>`;
  }

  function renderSpeakingMenu() {
    const parts = [1, 2, 3].filter(partPracticeAvailable);
    const showFull = fullPracticeAvailable();
    if (!showFull && !parts.length) {
      return `<div class="speaking-no-practice">
        <span>📭</span>
        <strong>No practice selected</strong>
        <button class="btn-ghost" data-action="open-speaking-pools">Choose a Part Pool</button>
      </div>`;
    }

    const fullCard = showFull ? `
      <div class="ready-card-wrap random-wrap">
        <div class="ready-card-inner speaking-full-test-card">
          <div class="ready-topic-label">Cambridge IELTS 10–20</div>
          <div class="ready-title">Full<br>Test</div>
          <div class="coin-outer" role="button" tabindex="0" aria-label="Start Full Test" data-action="start-speaking-mode" data-mode="full">
            <div class="coin-inner">
              <div class="coin-edge"></div>
              <div class="coin-face">
                <div class="coin-tri">
                  <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden="true">
                    <path d="M13 7.5C13 5.1 15.6 3.6 17.7 4.8L43.7 20.3C45.8 21.5 45.8 24.5 43.7 25.7L17.7 41.2C15.6 42.4 13 40.9 13 38.5V7.5Z" fill="white"/>
                  </svg>
                </div>
                <span class="coin-lbl">Start</span>
              </div>
            </div>
          </div>
        </div>
      </div>` : "";
    const partCard = parts.length ? `
      <div class="ready-card-wrap lesson-wrap speaking-part-wrap">
        <div class="ready-card-inner">
          <div class="ready-topic-label">Choose one Part</div>
          <div class="ready-title">Practice<br>by Part</div>
          <div class="speaking-part-options">
            ${parts.map((part) => {
              const details = speakingPartDetails[part];
              return `<button class="mode-btn speaking-part-option speaking-part-option-${part}" data-action="start-speaking-mode" data-mode="${part}"><strong>${details[0]}</strong><small>${details[1]}</small></button>`;
            }).join("")}
          </div>
        </div>
      </div>` : "";
    return `
      <div class="ready-dual${showFull ? "" : " speaking-menu-parts-only"}" aria-label="Speaking practice modes">
        ${fullCard}${partCard}
      </div>`;
  }

  function renderReadingMenu() {
    const mode = G.state.readingMode;
    const stats = G.progress.stats();
    return `
      <div class="ready-screen-wrap">
        <div class="ready-screen">
          <div class="ready-topic-label">IELTS Reading Vocabulary</div>
          <div class="ready-icon">📖</div>
          <div class="ready-title">${readingModeLabels[mode]}</div>
          <div class="ready-sub">20 questions drawn from ${G.DATA.readingWords.length} original WordArk entries</div>
          <div class="part-count-row reading-counts">
            <span><b>${stats.readingSeen}</b> Seen</span>
            <span><b>${stats.readingMastered}</b> Mastered</span>
          </div>
          <button class="btn-go compact-go" data-action="start-reading">Start Practice</button>
        </div>
      </div>
      <div class="menu-actions">
        <button class="btn-filter standalone-filter" data-action="open-overlay" data-overlay="modes">
          <span class="btn-filter-label">🎮 ${readingModeLabels[mode]}</span><span class="btn-filter-arrow">▾</span>
        </button>
        <button class="btn-ghost" data-action="open-overlay" data-overlay="settings">⚙️ Settings &amp; Export/Import</button>
      </div>`;
  }

  function renderWritingMenu() {
    const tasks = [1, 2].filter(writingTaskAvailable);
    const showFull = fullWritingAvailable();
    if (!showFull && !tasks.length) {
      return `<div class="speaking-no-practice">
        <span class="ielts-module-icon writing-icon">${moduleIcon("writing")}</span>
        <strong>No practice selected</strong>
        <button class="btn-ghost" data-action="open-writing-setup">Choose Writing Practice</button>
      </div>`;
    }
    const fullCard = showFull ? `
      <div class="ready-card-wrap random-wrap">
        <div class="ready-card-inner writing-full-practice-card">
          <div class="ready-topic-label">Cambridge IELTS 11–20</div>
          <div class="ready-title">Full<br>Writing</div>
          <div class="coin-outer" role="button" tabindex="0" aria-label="Start Full Writing" data-action="start-writing-mode" data-mode="full">
            <div class="coin-inner">
              <div class="coin-edge"></div>
              <div class="coin-face">
                <div class="coin-tri">
                  <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden="true">
                    <path d="M13 7.5C13 5.1 15.6 3.6 17.7 4.8L43.7 20.3C45.8 21.5 45.8 24.5 43.7 25.7L17.7 41.2C15.6 42.4 13 40.9 13 38.5V7.5Z" fill="white"/>
                  </svg>
                </div>
                <span class="coin-lbl">Start</span>
              </div>
            </div>
          </div>
        </div>
      </div>` : "";
    const taskDetails = {
      1: ["Task 1", "Visual Report", "📊"],
      2: ["Task 2", "Essay", "✍️"],
    };
    const taskCard = tasks.length ? `
      <div class="ready-card-wrap lesson-wrap writing-task-wrap">
        <div class="ready-card-inner">
          <div class="ready-topic-label">Choose one Task</div>
          <div class="ready-title">Practice<br>by Task</div>
          <div class="speaking-part-options writing-task-options">
            ${tasks.map((task) => {
              const details = taskDetails[task];
              return `<button class="mode-btn speaking-part-option writing-task-option writing-task-option-${task}" data-action="start-writing-mode" data-mode="${task}">
                <span class="writing-task-option-icon" aria-hidden="true">${details[2]}</span>
                <span class="writing-task-option-copy"><strong>${details[0]}</strong><small>${details[1]} · ${writingTaskPoolCount(task)}</small></span>
              </button>`;
            }).join("")}
          </div>
        </div>
      </div>` : "";
    return `
      <div class="ready-dual${showFull ? "" : " writing-menu-tasks-only"}" aria-label="Writing practice modes">
        ${fullCard}${taskCard}
      </div>`;
  }

  function reviewItems() {
    if (G.state.module === "speaking") return G.DATA.speakingCards;
    if (G.state.module === "writing") return G.DATA.writingSets;
    return G.DATA.readingWords;
  }

  function reviewCategory(item) {
    if (G.state.module === "speaking") return String(item.part);
    if (G.state.module === "writing") return `${item.task}:${item.category || "General"}`;
    return String(item.category || "General");
  }

  function reviewCategories() {
    if (G.state.module === "speaking") return ["1", "2", "3"];
    if (G.state.module === "writing") {
      return Array.from(new Set(G.DATA.writingSets.map((set) => reviewCategory(set))))
        .sort((a, b) => Number(a.slice(0, 1)) - Number(b.slice(0, 1)) || a.localeCompare(b));
    }
    return Array.from(new Set(G.DATA.readingWords.map((word) => String(word.category || "General"))));
  }

  function filteredReviewItems() {
    const filter = G.state.reviewFilter || "all";
    const category = G.state.reviewCategory || "all";
    return reviewItems().filter((item) => {
      const filterMatch = filter === "all"
        || (filter === "favorite" ? G.progress.isFavorite(G.state.module, item.id) : G.progress.statusFor(G.state.module, item.id) === filter);
      return filterMatch && (category === "all" || reviewCategory(item) === category);
    });
  }

  function renderReviewSubbar() {
    const filter = G.state.reviewFilter || "all";
    const tabs = [
      ["all", "📚", "All"],
      ["new", "✨", "New"],
      ["unfamiliar", "🔁", "Practice"],
      ["mastered", "🏆", "Mastered"],
      ["favorite", "❤️", "Fav"],
    ];
    const selectedCategory = G.state.reviewCategory || "all";
    const categoryLabel = selectedCategory === "all"
      ? "📂 All topics"
      : G.state.module === "speaking"
        ? `${reviewPartIcons[selectedCategory]} Part ${selectedCategory}`
        : G.state.module === "writing"
          ? `T${selectedCategory.slice(0, 1)} · ${selectedCategory.slice(selectedCategory.indexOf(":") + 1)}`
          : `📖 ${selectedCategory}`;
    return `<div class="review-subbar">
      <div class="rev-tabs" id="rev-tabs-row">
        ${tabs.map(([id, icon, label]) => `<button class="rev-tab ${filter === id ? "on" : ""}" data-action="set-review-filter" data-filter="${id}" data-f="${id}"><span>${icon}</span>${label}</button>`).join("")}
      </div>
      <div class="review-topic-row">
        <button class="btn-filter pool-${filter}" id="rev-topic-btn" data-action="open-overlay" data-overlay="review-categories">
          <span class="btn-filter-label" id="rev-topic-label">${esc(categoryLabel)}</span>
          <span class="btn-filter-arrow">▾</span>
        </button>
      </div>
    </div>`;
  }

  function highlightedSentence(sentence, word) {
    const source = String(sentence || "");
    const forms = [word.word].concat(Array.isArray(word.forms) ? word.forms : [])
      .map((form) => String(form || "").trim())
      .filter(Boolean)
      .filter((form, index, all) => all.indexOf(form) === index)
      .sort((a, b) => b.length - a.length);
    if (!forms.length) return esc(source);
    const alternatives = forms.map((form) => form.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
    const matcher = new RegExp(alternatives, "gi");
    let html = "";
    let last = 0;
    let match;
    while ((match = matcher.exec(source))) {
      html += esc(source.slice(last, match.index));
      html += `<b>${esc(match[0])}</b>`;
      last = match.index + match[0].length;
      if (!match[0].length) matcher.lastIndex += 1;
    }
    return html + esc(source.slice(last));
  }

  function renderReadingReviewCard(word) {
    const moduleName = "reading";
    const key = `${moduleName}:${word.id}`;
    const open = Boolean(G.state.reviewOpen[key]);
    const favorite = G.progress.isFavorite(moduleName, word.id);
    const sentences = [1, 2, 3].map((number) => ({
      number,
      text: word[`sentence${number}`],
      translation: word[`sentence${number}_en`],
    })).filter((sentence) => sentence.text);
    const hasExtra = sentences.length || word.tip;
    return `<article class="r-card${open ? " r-open" : ""}" data-action="toggle-review-card" data-module="${moduleName}" data-id="${esc(word.id)}">
      <div class="r-card-toggle">
        <div class="review-card-copy">
          <div class="r-word">${esc(word.word)}</div>
          ${word.ipa ? `<div class="r-hint">/${esc(word.ipa)}/</div>` : ""}
          <div class="r-meaning">${esc(word.meaning || word.definition || "")}</div>
          ${word.zh ? `<div class="r-zh">${esc(word.zh)}${word.zh_def ? `<span class="r-zh-def"> — ${esc(word.zh_def)}</span>` : ""}</div>` : ""}
        </div>
        <div class="review-card-actions">
          <button class="r-fav${favorite ? " on" : ""}" data-action="toggle-review-favorite" data-module="${moduleName}" data-id="${esc(word.id)}" aria-label="${favorite ? "Remove from favorites" : "Add to favorites"}">${favorite ? "❤️" : "🤍"}</button>
          <button class="r-tts" data-action="speak-review" data-module="${moduleName}" data-id="${esc(word.id)}" aria-label="Read word aloud">🔊</button>
        </div>
      </div>
      ${hasExtra ? `<div class="r-card-chevron-row"><span class="r-chev">▾</span></div>
        <div class="r-card-body"><div class="review-card-details">
          ${sentences.map((sentence) => `<div class="r-sent-group review-sentence-row">
            <div class="review-sentence-copy">
              <div class="r-sent">${highlightedSentence(sentence.text, word)}</div>
              ${sentence.translation ? `<div class="r-sent-trans">${esc(sentence.translation)}</div>` : ""}
            </div>
            <button class="wc-sent-tts" data-action="speak-review-sentence" data-id="${esc(word.id)}" data-index="${sentence.number}" aria-label="Read example aloud">🔊</button>
          </div>`).join("")}
          ${word.tip ? `<div class="r-tip-wrap">💬 ${esc(word.tip)}</div>` : ""}
        </div></div>` : ""}
    </article>`;
  }

  function renderSpeakingReviewCard(item) {
    const moduleName = "speaking";
    const key = `${moduleName}:${item.id}`;
    const open = Boolean(G.state.reviewOpen[key]);
    const favorite = G.progress.isFavorite(moduleName, item.id);
    const hasExtra = item.part === 2 && (item.bullets.length || item.closing);
    return `<article class="r-card speaking-review-card${open ? " r-open" : ""}" data-action="toggle-review-card" data-module="${moduleName}" data-id="${esc(item.id)}">
      <div class="r-card-toggle">
        <div class="review-card-copy">
          <div class="r-word">${esc(item.text)}</div>
          <div class="r-hint">Part ${item.part} · Cambridge IELTS ${item.book} · Test ${item.test}</div>
          ${item.topic ? `<div class="r-meaning">${esc(item.topic)}</div>` : ""}
        </div>
        <div class="review-card-actions">
          <button class="r-fav${favorite ? " on" : ""}" data-action="toggle-review-favorite" data-module="${moduleName}" data-id="${esc(item.id)}" aria-label="${favorite ? "Remove from favorites" : "Add to favorites"}">${favorite ? "❤️" : "🤍"}</button>
          <button class="r-tts" data-action="speak-review" data-module="${moduleName}" data-id="${esc(item.id)}" aria-label="Read question aloud">🔊</button>
        </div>
      </div>
      ${hasExtra ? `<div class="r-card-chevron-row"><span class="r-chev">▾</span></div>
        <div class="r-card-body"><div class="review-card-details speaking-review-details">
          <span>You should say:</span>
          <ul>${item.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join("")}</ul>
          ${item.closing ? `<p>${esc(item.closing)}</p>` : ""}
        </div></div>` : ""}
    </article>`;
  }

  function renderWritingReviewCard(item) {
    const moduleName = "writing";
    const key = `${moduleName}:${item.id}`;
    const open = Boolean(G.state.reviewOpen[key]);
    const favorite = G.progress.isFavorite(moduleName, item.id);
    const keywords = Array.isArray(item.keywords) ? item.keywords : [];
    const points = Array.isArray(item.points) ? item.points : [];
    const hasExtra = Boolean(item.taskInstruction || keywords.length || points.length);
    return `<article class="r-card writing-review-card${open ? " r-open" : ""}" data-action="toggle-review-card" data-module="${moduleName}" data-id="${esc(item.id)}">
      <div class="r-card-toggle">
        <div class="review-card-copy">
          <div class="r-word">${esc(item.sourceQuestion)}</div>
          <div class="r-hint">Task ${item.task} · Cambridge IELTS ${item.book} · Test ${item.test}</div>
          <div class="r-meaning">${esc(item.category || "Writing")}</div>
        </div>
        <div class="review-card-actions">
          <button class="r-fav${favorite ? " on" : ""}" data-action="toggle-review-favorite" data-module="${moduleName}" data-id="${esc(item.id)}" aria-label="${favorite ? "Remove from favorites" : "Add to favorites"}">${favorite ? "❤️" : "🤍"}</button>
          <button class="r-tts" data-action="speak-review" data-module="${moduleName}" data-id="${esc(item.id)}" aria-label="Read question aloud">🔊</button>
        </div>
      </div>
      ${hasExtra ? `<div class="r-card-chevron-row"><span class="r-chev">▾</span></div>
        <div class="r-card-body"><div class="review-card-details writing-review-details">
          ${item.taskInstruction ? `<div class="writing-review-task"><strong>${esc(item.taskInstruction)}</strong>${item.minimumWords ? `<span>${esc(item.minimumWords)}</span>` : ""}</div>` : ""}
          ${keywords.length ? `<div class="writing-review-section-label">Keyword Cards</div><div class="writing-review-keywords">${keywords.map((keyword) => `<span>${esc(keyword.term)}</span>`).join("")}</div>` : ""}
          ${points.length ? `<div class="writing-review-section-label">Paraphrase points</div><div class="writing-review-points">${points.map((point) => `<div><strong>${esc(point.source)}</strong><span>→ ${point.branches.map((branch) => esc(`${branch.lead || ""}${branch.reveal || ""}`.trim())).join(" · ")}</span></div>`).join("")}</div>` : ""}
        </div></div>` : ""}
    </article>`;
  }

  function renderReviewContent() {
    const items = filteredReviewItems();
    const visible = items.slice(0, G.state.reviewVisible || 20);
    const unit = G.state.module === "reading" ? "words" : "questions";
    if (!items.length) return `<div id="rev-list"><div class="rev-empty">No ${unit} here.</div></div>`;
    return `<div id="rev-list">
      ${visible.map((item) => G.state.module === "speaking"
        ? renderSpeakingReviewCard(item)
        : G.state.module === "writing" ? renderWritingReviewCard(item) : renderReadingReviewCard(item)).join("")}
      ${visible.length < items.length ? `<button id="rev-more-btn" class="btn-close review-more-button" data-action="show-more-review">Show more (${items.length - visible.length} left) ▾</button>` : ""}
    </div>`;
  }

  function renderSpeakingHint(item) {
    if (!G.state.speakingHintOpen || !Array.isArray(item.hints) || !item.hints.length) return "";
    const index = G.state.speakingHintIndex % item.hints.length;
    const lines = item.hints[index];
    return `
      <section class="speaking-hint-panel" id="speaking-hint-panel" aria-label="Speaking hint">
        <div class="intro-sent-nav speaking-hint-nav">
          <span class="speaking-hint-label">💡 Quick notes</span>
          ${item.hints.length > 1 ? `
            <span class="intro-sent-dots" aria-label="Hint ${index + 1} of ${item.hints.length}">
              ${item.hints.map((_hint, hintIndex) => `<span class="intro-sent-dot ${hintIndex === index ? "on" : ""}"></span>`).join("")}
            </span>
            <button class="intro-sent-next" data-action="next-speaking-hint" aria-label="Show another hint">Next</button>` : ""}
        </div>
        <div class="speaking-hint-lines" aria-live="polite">
          ${lines.map((line) => `<div class="speaking-hint-line"><span aria-hidden="true"></span><strong>${esc(line)}</strong></div>`).join("")}
        </div>
      </section>`;
  }

  function renderSpeakingQuestion() {
    const item = G.modes.currentSpeaking();
    if (!item) return "";
    const hint = renderSpeakingHint(item);
    const hasHint = Array.isArray(item.hints) && item.hints.length;
    return `
      <div class="q-prompt">Cambridge IELTS ${item.book} · Test ${item.test}</div>
      <article class="wcard speaking-card part-${item.part}">
        <div class="wc-top">
          <span class="wc-badge ${item.part === 2 ? "blue-badge" : item.part === 3 ? "purple-badge" : ""}">Part ${item.part}</span>
          ${item.topic ? `<span class="topic-label">${esc(item.topic)}</span>` : ""}
          ${hasHint ? `<button class="speaking-hint-trigger${G.state.speakingHintOpen ? " on" : ""}" data-action="toggle-speaking-hint" aria-controls="speaking-hint-panel" aria-expanded="${G.state.speakingHintOpen ? "true" : "false"}"><span aria-hidden="true">💡</span><strong>${G.state.speakingHintOpen ? "Hide" : "Hint"}</strong></button>` : ""}
          <button class="wc-tts" data-action="speak-current" aria-label="Read question aloud">${G.state.speechActive ? "■" : "🔊"}</button>
        </div>
        <h1 class="speaking-question">${esc(item.text)}</h1>
        ${hint || (item.part === 2 ? `
          <div class="cue-box cue-box-large">
            <span>You should say:</span>
            <ul>${item.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join("")}</ul>
            <p>${esc(item.closing)}</p>
          </div>` : "")}
      </article>
      ${G.state.notice ? `<div class="notice-card">${esc(G.state.notice)}</div>` : ""}`;
  }

  function renderReadingQuestion() {
    const question = G.state.readingQuestion;
    const answer = G.state.readingAnswer;
    if (!question) return "";
    const word = question.word;
    let stimulus = "";
    if (G.state.readingMode === "listening") {
      stimulus = `
        <article class="wcard wcard-listen">
          <div class="q-prompt">${esc(question.promptLabel)}</div>
          <div class="listen-stimulus">
            <button class="listen-big-btn" data-action="speak-current" aria-label="Play word">${G.state.speechActive ? "■" : "🔊"}</button>
            <span class="listen-big-label">Tap to listen</span>
          </div>
        </article>`;
    } else if (G.state.readingMode === "matching") {
      stimulus = `
        <article class="wcard">
          <div class="q-prompt">${esc(question.promptLabel)}</div>
          <div class="wc-word">${esc(question.prompt)}</div>
          ${word.ipa ? `<div class="wc-pron">/${esc(word.ipa)}/</div>` : ""}
        </article>`;
    } else {
      const sentence = esc(question.prompt).replace("___", answer ? `<span class="blank-filled">${esc(question.choices.find((choice) => choice.id === question.correctId).label)}</span>` : `<span class="blank-slot">_____</span>`);
      stimulus = `
        <div class="q-prompt">${esc(question.promptLabel)}</div>
        <div class="blank-box">${sentence}</div>`;
    }

    const choices = question.choices.map((choice, index) => {
      let className = "mc-opt";
      if (answer) {
        className += " done";
        if (choice.id === question.correctId) className += " ok";
        else if (choice.id === answer.id) className += " no";
      }
      return `
        <button class="${className}" data-action="choose-reading-answer" data-id="${esc(choice.id)}" ${answer ? "disabled" : ""}>
          <span class="mc-l">${String.fromCharCode(65 + index)}</span>
          <span class="mc-t">${esc(choice.label)}</span>
        </button>`;
    }).join("");

    return `
      ${stimulus}
      <div class="mc-opts">${choices}</div>
      ${answer ? `
        <article class="answer-reveal ${answer.correct ? "correct" : "incorrect"}">
          <div><span>${answer.correct ? "Correct" : "Answer"}</span><strong>${esc(word.word)}</strong></div>
          <p>${esc(word.definition || word.meaning)}</p>
          ${word.zh ? `<small>${esc(word.zh)}${word.zh_def ? ` · ${esc(word.zh_def)}` : ""}</small>` : ""}
        </article>` : ""}`;
  }

  function writingColorClass(tone) {
    return ["green", "blue", "purple", "orange"].includes(tone)
      ? `writing-color-${tone}`
      : "writing-color-blue";
  }

  function renderWritingQuestionCard() {
    const set = G.modes.currentWritingSet();
    if (!set) return "";
    const segments = Array.isArray(set.questionSegments) && set.questionSegments.length
      ? set.questionSegments
      : [{ text: set.sourceQuestion || "" }];
    const instructionSegments = Array.isArray(set.instructionSegments) && set.instructionSegments.length
      ? set.instructionSegments
      : [{ text: set.taskInstruction || "" }];
    return `
      <section class="writing-flow-screen writing-question-screen" aria-label="Writing question card">
        <article class="intro-card writing-question-card">
          <div class="intro-badge">Writing Question</div>
          <div class="writing-question-meta">${esc(set.sourceLabel)}</div>
          <div class="intro-sent-wrap writing-question-wrap">
            <div class="writing-question-copy">
              ${segments.map((segment) => segment.tone
                ? `<mark class="writing-highlight ${writingColorClass(segment.tone)}">${esc(segment.text)}</mark>`
                : esc(segment.text)).join("")}
            </div>
          </div>
          <div class="writing-question-task">
            <strong>${instructionSegments.map((segment) => segment.tone
              ? `<mark class="writing-highlight ${writingColorClass(segment.tone)}">${esc(segment.text)}</mark>`
              : esc(segment.text)).join("")}</strong>
            <span>${esc(set.minimumWords || "")}</span>
          </div>
        </article>
        <button class="btn-intro-go writing-flow-next" data-action="advance-writing-flow">See keywords →</button>
      </section>`;
  }

  function renderWritingKeywordList() {
    const set = G.modes.currentWritingSet();
    if (!set) return "";
    const keywords = Array.isArray(set.keywords) ? set.keywords : [];
    const visibleCount = Math.max(0, Math.min(keywords.length, Number(G.state.writingKeywordVisibleCount) || 0));
    const newestIndex = Number(G.state.writingKeywordNewestIndex);
    const complete = Boolean(G.state.writingKeywordSequenceComplete) || visibleCount >= keywords.length;
    return `
      <section class="writing-flow-screen" aria-label="Additional keywords list">
        <article class="intro-card keyword-card keyword-list-card">
          <div class="intro-badge">Additional Keywords</div>
          <div class="keyword-list-heading">
            <span class="keyword-list-heading-title">Useful topic language</span>
            <span>One word at a time — listen, then replay</span>
          </div>
          <div class="keyword-list" aria-live="polite">
            ${keywords.slice(0, visibleCount).map((keyword, index) => `
              <div class="keyword-list-item${index === newestIndex ? " is-new" : " is-settled"}">
                <span class="keyword-list-number">${String(index + 1).padStart(2, "0")}</span>
                <div class="keyword-list-body">
                  <div class="keyword-list-row">
                    <span class="keyword-list-term">${esc(keyword.term)}</span>
                    <button type="button" class="keyword-list-tts" data-action="speak-writing-keyword-list" data-index="${index}" aria-label="Pronounce ${esc(keyword.term)}">🔊</button>
                  </div>
                  <div class="keyword-list-sub">
                    ${keyword.pos ? `<small>${esc(keyword.pos)}</small>` : ""}
                    ${keyword.zh ? `<small class="keyword-list-zh">${esc(keyword.zh)}</small>` : ""}
                  </div>
                </div>
              </div>`).join("")}
          </div>
          <div class="keyword-sequence-progress" aria-label="${visibleCount} of ${keywords.length} keywords">
            <span class="keyword-sequence-dots">${keywords.map((_keyword, index) => `<i class="${index < visibleCount ? "on" : ""}${index === newestIndex ? " newest" : ""}"></i>`).join("")}</span>
            <span>${complete ? "Ready for the cards ✓" : `${visibleCount}/${keywords.length} · listening…`}</span>
          </div>
        </article>
        <button class="btn-intro-go writing-flow-next" data-action="advance-writing-flow" ${complete ? "" : "disabled"}>${complete ? "Open Keyword Cards →" : "Listen to each word…"}</button>
      </section>`;
  }

  function highlightKeywordExample(example, term) {
    const source = String(example || "");
    const target = String(term || "");
    const index = source.toLowerCase().indexOf(target.toLowerCase());
    if (index < 0 || !target) return esc(source);
    return `${esc(source.slice(0, index))}<b>${esc(source.slice(index, index + target.length))}</b>${esc(source.slice(index + target.length))}`;
  }

  function renderWritingKeywordCard() {
    const set = G.modes.currentWritingSet();
    const keyword = G.modes.currentWritingKeyword();
    if (!set || !keyword) return "";
    const keywords = Array.isArray(set.keywords) ? set.keywords : [];
    const examples = Array.isArray(keyword.examples) ? keyword.examples : [];
    const exampleIndex = Math.max(0, Math.min(examples.length - 1, G.state.writingKeywordSentenceIndex || 0));
    const example = examples[exampleIndex] || "";
    const examplesZh = Array.isArray(keyword.examplesZh) ? keyword.examplesZh : [];
    const exampleZh = examplesZh[exampleIndex] || "";
    const lastKeyword = G.state.writingKeywordIndex >= keywords.length - 1;
    return `
      <section class="writing-flow-screen keyword-card-screen" aria-label="Keyword card">
        <article class="intro-card keyword-card">
          <div class="intro-badge">Keyword Card · ${G.state.writingKeywordIndex + 1}/${keywords.length}</div>
          ${example ? `<div class="intro-sent-wrap">
            <div class="intro-sent-box">
              <div class="intro-sent-nav">
                <button class="intro-sent-tts" data-action="speak-writing-keyword-sentence" aria-label="Read example sentence">${G.state.speechActive ? "■" : "🔊"}</button>
                ${examples.length > 1 ? `<span class="intro-sent-dots" aria-label="Example ${exampleIndex + 1} of ${examples.length}">
                  ${examples.map((_item, index) => `<span class="intro-sent-dot${index === exampleIndex ? " on" : ""}"></span>`).join("")}
                </span>
                <button class="intro-sent-next" data-action="next-writing-keyword-sentence">next</button>` : ""}
              </div>
              <div class="intro-sent">${highlightKeywordExample(example, keyword.term)}</div>
              ${exampleZh ? `<div class="intro-sent-en" id="intro-sent-en">${esc(exampleZh)}</div>` : ""}
            </div>
          </div>` : ""}
          <div class="intro-word-row">
            <div class="intro-word">${esc(keyword.term)}</div>
            <button class="intro-tts" data-action="speak-writing-keyword" aria-label="Pronounce keyword">${G.state.speechActive ? "■" : "🔊"}</button>
          </div>
          <div class="intro-meta keyword-meta">
            ${keyword.ipa ? `<span class="intro-ipa">${esc(keyword.ipa)}</span>` : ""}
            ${keyword.pos ? `<span class="ielts-pos keyword-pos">${esc(keyword.pos)}</span>` : ""}
          </div>
          <div class="intro-dict intro-dict-tight keyword-definition">
            <div class="intro-dict-en">${esc(keyword.meaning || "")}</div>
            ${keyword.zh ? `<div class="intro-dict-zh-inline">
              <span class="intro-dict-zh-word">${esc(keyword.zh)}</span>
              ${keyword.zh_def ? `<span class="intro-dict-zh-sep"> — </span><span class="intro-dict-zh-def">${esc(keyword.zh_def)}</span>` : ""}
            </div>` : ""}
          </div>
          ${keyword.note ? `<div class="intro-tip keyword-tip">💬 <bdi dir="ltr">${esc(keyword.note)}</bdi></div>` : ""}
        </article>
        <button class="btn-intro-go writing-flow-next" data-action="advance-writing-flow">${lastKeyword ? "Start paraphrase →" : "Next keyword →"}</button>
      </section>`;
  }

  function renderWritingParaphrase() {
    const point = G.modes.currentWriting();
    if (!point) return "";
    const revealed = Array.isArray(G.state.writingRevealed) ? G.state.writingRevealed : [];
    const allRevealed = point.branches.every((_branch, index) => Boolean(revealed[index]));
    const sourceSegments = Array.isArray(point.sourceSegments) && point.sourceSegments.length
      ? point.sourceSegments
      : [{ text: point.source }];
    return `
      <section class="writing-stage ${writingColorClass(point.tone)}" aria-label="Writing paraphrase practice">
        <article class="wcard writing-source-card">
          <div class="wc-top writing-source-top">
            <span class="wc-badge writing-point-badge">Paraphrase ${G.state.writingIndex + 1}</span>
          </div>
          <h1 class="wc-question-big writing-source-text">${sourceSegments.map((segment) => esc(segment.text)).join("")}</h1>
        </article>
        <div class="writing-branches" style="--writing-rows:${point.branches.length}">
          ${point.branches.map((branch, index) => {
            const isRevealed = Boolean(revealed[index]);
            return `<div class="writing-branch${isRevealed ? " revealed" : ""}">
              <div class="writing-phrase">
                ${branch.lead ? `<span>${esc(branch.lead)}</span>` : ""}
                ${isRevealed
                  ? `<strong class="writing-answer">${esc(branch.reveal)}</strong>`
                  : `<button type="button" class="writing-cover" data-action="reveal-writing" data-index="${index}" aria-label="Reveal paraphrase ${index + 1}"><span aria-hidden="true">${esc(branch.reveal)}</span></button>`}
              </div>
            </div>`;
          }).join("")}
        </div>
        <div class="q-prompt writing-instruction${allRevealed ? " complete" : ""}">
          ${allRevealed ? "Nice — tap Next below to continue" : "Tap each covered rewrite"}
        </div>
      </section>`;
  }

  function renderWritingQuestion() {
    if (G.state.writingPhase === "question") return renderWritingQuestionCard();
    if (G.state.writingPhase === "keyword-list") return renderWritingKeywordList();
    if (G.state.writingPhase === "keyword-card") return renderWritingKeywordCard();
    return renderWritingParaphrase();
  }

  function renderComplete(module) {
    const isSpeaking = module === "speaking";
    return `
      <div class="cc">
        <div class="cc-emo">${isSpeaking ? "🎙️" : "✍️"}</div>
        <div class="cc-title">Practice complete</div>
        <div class="cc-score">${isSpeaking
          ? "Your speaking progress was saved on this device."
          : "You studied the question, keywords and every paraphrase."}</div>
        <div class="cc-stats">
          ${isSpeaking ? `
            <div class="ccs"><span class="ccs-v">${G.state.speakingDone}</span><span class="ccs-l">Done</span></div>
            <div class="ccs"><span class="ccs-v">${G.state.speakingDeck.length}</span><span class="ccs-l">Prompts</span></div>` : `
            <div class="ccs"><span class="ccs-v">${G.state.writingQuestionsDone}</span><span class="ccs-l">Questions</span></div>
            <div class="ccs"><span class="ccs-v">${G.state.writingDone}</span><span class="ccs-l">Paraphrases</span></div>`}
        </div>
        <button class="btn-cc p" data-action="${isSpeaking ? "repeat-speaking" : "repeat-writing"}">Practice again</button>
        <button class="btn-cc s" data-action="go-module">Back to menu</button>
      </div>`;
  }

  function renderBottomBar() {
    if (G.state.tab === "review") return "";
    if (G.state.speakingRunning) {
      return `
        <div id="bot-bar">
          <button class="btn-skip" data-action="skip-speaking">Skip</button>
          <button class="btn-next" data-action="next-speaking">Done →</button>
        </div>`;
    }
    if (G.state.writingRunning && G.state.writingPhase === "paraphrase") {
      const point = G.modes.currentWriting();
      const revealed = Array.isArray(G.state.writingRevealed) ? G.state.writingRevealed : [];
      const allRevealed = Boolean(point) && Array.isArray(point.branches)
        && point.branches.every((_branch, index) => Boolean(revealed[index]));
      return `
        <div id="bot-bar">
          ${allRevealed
            ? '<button class="btn-next" data-action="next-writing">Next →</button>'
            : '<button class="btn-skip" data-action="skip-writing">Skip</button>'}
        </div>`;
    }
    return "";
  }

  function renderGameContent() {
    if (G.state.tab === "review") return renderReviewContent();
    if (G.state.module === "speaking") {
      if (G.state.speakingComplete) return renderComplete("speaking");
      if (G.state.speakingRunning) return renderSpeakingQuestion();
      return renderSpeakingMenu();
    }
    if (G.state.module === "writing") {
      if (G.state.writingComplete) return renderComplete("writing");
      if (G.state.writingRunning) return renderWritingQuestion();
      return renderWritingMenu();
    }
    return "";
  }

  function writingFlowProgress() {
    const set = G.modes.currentWritingSet();
    const sets = Array.isArray(G.state.writingSessionSets) ? G.state.writingSessionSets : [];
    const stepsFor = (item) => 2 + (Array.isArray(item && item.keywords) ? item.keywords.length : 0) + (Array.isArray(item && item.points) ? item.points.length : 0);
    const total = sets.reduce((sum, item) => sum + stepsFor(item), 0);
    const offset = sets.slice(0, G.state.writingSetIndex).reduce((sum, item) => sum + stepsFor(item), 0);
    const keywordCount = set && Array.isArray(set.keywords) ? set.keywords.length : 0;
    let index = offset;
    if (G.state.writingPhase === "keyword-list") index = offset + 1;
    else if (G.state.writingPhase === "keyword-card") index = offset + 2 + G.state.writingKeywordIndex;
    else if (G.state.writingPhase === "paraphrase") index = offset + 2 + keywordCount + G.state.writingIndex;
    return { index, total };
  }

  function renderGame() {
    const speaking = G.state.module === "speaking";
    const writing = G.state.module === "writing";
    const running = G.state.speakingRunning || G.state.writingRunning;
    const review = G.state.tab === "review";
    const writingProgress = writingFlowProgress();
    const progressIndex = speaking ? G.state.speakingIndex : writingProgress.index;
    const progressTotal = speaking ? G.state.speakingDeck.length : writingProgress.total;
    const stripPercent = running ? percent(progressIndex + 1, progressTotal) : 0;
    const backAction = !review && (running || G.state.speakingComplete || G.state.writingComplete) ? "go-module" : "go-landing";
    const writingPhaseLabel = G.state.writingPhase === "question"
      ? "Question Card"
      : G.state.writingPhase === "keyword-list"
        ? "Additional Keywords"
        : G.state.writingPhase === "keyword-card"
          ? `Keyword Card ${G.state.writingKeywordIndex + 1}/${(G.modes.currentWritingSet() && G.modes.currentWritingSet().keywords.length) || 0}`
          : "Paraphrase";
    const subbarContent = review
      ? renderReviewSubbar()
      : speaking ? renderSpeakingPoolSummary() : renderWritingFilters();
    const modeCode = speaking ? "SP" : "WR";
    const foldClass = running ? (G.state.headerExpanded ? " hdr-expanded-midround" : " hdr-collapsed") : "";
    const miniPoolAction = speaking ? "open-speaking-pools" : "open-writing-setup";
    const questionAreaClass = review
      ? "review-area"
      : writing && running
        ? "writing-area"
        : speaking && running
          ? `speaking-area${G.state.speakingHintOpen ? " speaking-hint-open" : ""}`
          : "";

    return `
      <div id="scr-game" class="screen${foldClass}">
        <div class="g-header">
          <button class="btn-cfg" data-action="${backAction}" title="Back">←</button>
          <div class="g-tabs">
            <button class="g-tab ${G.state.tab === "play" ? "on" : ""}" data-action="set-tab" data-tab="play">Game</button>
            <button class="g-tab ${G.state.tab === "review" ? "on" : ""}" data-action="set-tab" data-tab="review">Review</button>
          </div>
          <button class="btn-cfg" data-action="go-module" title="${speaking ? "Speaking practice modes" : "Writing practice"}">🎮</button>
          <button class="btn-lang-sw module-switch-${speaking ? "speaking" : "writing"}" data-action="open-overlay" data-overlay="modules" title="Switch Speaking or Writing">
            <span class="blsw-flag">${moduleIcon(speaking ? "speaking" : "writing", "ielts-header-icon")}</span><span class="blsw-code">${modeCode}</span>
          </button>
        </div>

        <div class="g-subbar${review ? " review-mode" : ""}">
          ${subbarContent}
          ${running ? `<button class="gh-fold" data-action="toggle-header" title="Fold back">▴</button>` : ""}
        </div>

        <div id="g-mini">
          <button class="gm-btn" data-action="go-module" title="End practice">←</button>
          <button class="gm-btn gm-lang module-switch-${speaking ? "speaking" : "writing"}" data-action="open-overlay" data-overlay="modules" title="Switch Speaking or Writing">${moduleIcon(speaking ? "speaking" : "writing", "ielts-mini-icon")}</button>
          <button class="gm-btn" data-action="${miniPoolAction}" title="Practice selection"><span class="ielts-mini-pool">📂</span></button>
          <span class="gm-spacer"></span>
          <span class="writing-mini-phase" aria-live="polite">${writing ? esc(writingPhaseLabel) : `Part ${(G.modes.currentSpeaking() && G.modes.currentSpeaking().part) || ""}`}</span>
          <button class="gm-btn gm-toggle" data-action="toggle-header" title="Show controls">▾</button>
        </div>

        <div class="g-panel on" id="panel-play">
          ${running ? `
            <div id="game-strip">
              <div class="gs-bar-wrap"><div class="gs-bar-fill" style="width:${stripPercent}%"></div></div>
              <span class="gs-frac">${progressIndex + 1}/${progressTotal}</span>
              <button class="gs-end" data-action="go-module">✕ End</button>
            </div>` : ""}
          <div id="q-area" class="${questionAreaClass}">${renderGameContent()}</div>
        </div>
        ${renderBottomBar()}
      </div>`;
  }

  function renderReviewCategoryOverlay() {
    const categories = reviewCategories();
    const selected = G.state.reviewCategory || "all";
    const tint = `tint-${G.state.reviewFilter || "all"}`;
    const speaking = G.state.module === "speaking";
    const writing = G.state.module === "writing";
    const unit = speaking || writing ? "questions" : "words";
    return `
      <div class="ov on" data-overlay-backdrop>
        <div class="cat-sheet-outer">
          <div class="cat-sheet-top review-category-top">
            <div class="sh-handle"></div>
            <span class="fs-section-label">Topic — tap to focus</span>
          </div>
          <div class="cat-scroll">
            <div class="cat-list" id="rev-cat-list">
              <button class="cat-item cat-all ${tint}${selected === "all" ? " on" : ""}" data-action="choose-review-category" data-category="all">
                <span class="cat-item-icon">📂</span><span class="cat-item-name">All topics</span><span class="cat-item-count">${reviewItems().length} ${unit}</span>
              </button>
              ${categories.map((category) => {
                const count = reviewItems().filter((item) => reviewCategory(item) === category).length;
                const task = writing ? category.slice(0, category.indexOf(":")) : "";
                const label = speaking ? `Part ${category}` : writing ? `Task ${task} · ${category.slice(category.indexOf(":") + 1)}` : category;
                const icon = speaking ? reviewPartIcons[category] : writing ? `<span class="ielts-category-task">T${task}</span>` : "📖";
                return `<button class="cat-item ${tint}${selected === category ? " on" : ""}" data-action="choose-review-category" data-category="${esc(category)}">
                  <span class="cat-item-icon">${icon}</span><span class="cat-item-name">${esc(label)}</span><span class="cat-item-count">${count} ${unit}</span>
                </button>`;
              }).join("")}
            </div>
          </div>
          <div class="cat-sheet-bottom"><button class="btn-close" data-action="close-overlay">Done</button></div>
        </div>
      </div>`;
  }

  function renderSpeakingPoolOverlay() {
    const options = [
      ["all", "All"],
      ["new", "New"],
      ["unfamiliar", "Practice"],
      ["mastered", "Mastered"],
      ["none", "Off"],
    ];
    const partRows = [1, 2, 3].map((part) => {
      const assignedPool = partPool(part);
      const buttons = options.map(([pool, label]) => {
        const count = pool === "none" ? null : G.utils.speakingPool(String(part), pool).length;
        const selected = pool === "none" ? !assignedPool : assignedPool === pool;
        const disabled = pool !== "none" && count === 0 && !selected;
        return `<button class="speaking-pool-option speaking-pool-option-${pool}${selected ? " on" : ""}" data-action="set-speaking-part-pool" data-part="${part}" data-pool="${pool}"
            role="radio" aria-label="Part ${part}: ${label}${count === null ? "" : `, ${count} available`}" aria-checked="${selected}" ${disabled ? "disabled" : ""}>
          <span class="speaking-pool-option-label">${selected ? `<span class="speaking-pool-state-mark" aria-hidden="true">✓</span>` : ""}${label}</span>
          ${count === null ? "" : `<small>${count.toLocaleString()}</small>`}
        </button>`;
      }).join("");
      return `<div class="speaking-pool-row" role="radiogroup" aria-label="Pool for Part ${part}">
        <strong class="speaking-pool-part-label">Part ${part}</strong>
        ${buttons}
      </div>`;
    }).join("");
    return `
      <div class="ov on" data-overlay-backdrop>
        <div class="sheet speaking-pool-sheet">
          <div class="sh-handle"></div>
          <div class="sh-title">Choose one Pool per Part</div>
          <div class="speaking-pool-matrix">${partRows}</div>
          <button class="btn-close" data-action="close-overlay">Done</button>
        </div>
      </div>`;
  }

  function renderWritingPoolOverlay() {
    const options = [
      ["all", "All"],
      ["new", "New"],
      ["unfamiliar", "Practice"],
      ["mastered", "Mastered"],
      ["none", "Off"],
    ];
    const rows = [1, 2].map((task) => {
      const assignedPool = writingTaskPool(task);
      const buttons = options.map(([pool, label]) => {
        const count = pool === "none" ? null : G.utils.writingPool(String(task), pool, G.state.writingCategory).length;
        const selected = pool === "none" ? !assignedPool : assignedPool === pool;
        const disabled = pool !== "none" && count === 0 && !selected;
        return `<button class="speaking-pool-option writing-pool-option writing-pool-option-${pool}${selected ? " on" : ""}" data-action="set-writing-task-pool" data-task="${task}" data-pool="${pool}"
            role="radio" aria-label="Task ${task}: ${label}${count === null ? "" : `, ${count} available`}" aria-checked="${selected}" ${disabled ? "disabled" : ""}>
          <span class="speaking-pool-option-label">${selected ? `<span class="speaking-pool-state-mark" aria-hidden="true">✓</span>` : ""}${label}</span>
          ${count === null ? "" : `<small>${count.toLocaleString()}</small>`}
        </button>`;
      }).join("");
      return `<div class="speaking-pool-row writing-pool-row" role="radiogroup" aria-label="Pool for Task ${task}">
        <strong class="speaking-pool-part-label">Task ${task}</strong>
        ${buttons}
      </div>`;
    }).join("");
    const selectedCategory = String(G.state.writingCategory || "all");
    const categoryGroups = [1, 2].map((task) => `
      <div class="writing-category-group-label"><span class="ielts-category-task">T${task}</span> Task ${task}</div>
      ${writingCategories(task).map((category) => {
        const value = `${task}:${category}`;
        const count = G.DATA.writingSets.filter((set) => set.task === task && set.category === category).length;
        return `<button class="cat-item tint-all${selectedCategory === value ? " on" : ""}" data-action="choose-writing-category" data-category="${esc(value)}">
          <span class="cat-item-icon"><span class="ielts-category-task">T${task}</span></span>
          <span class="cat-item-name">${esc(category)}</span>
          <span class="cat-item-count">${count} questions</span>
        </button>`;
      }).join("")}`).join("");
    return `
      <div class="ov on" data-overlay-backdrop>
        <div class="sheet speaking-pool-sheet writing-pool-sheet writing-setup-sheet">
          <div class="sh-handle"></div>
          <div class="sh-title">Writing Practice</div>
          <div class="writing-setup-label">Question pools</div>
          <div class="speaking-pool-matrix">${rows}</div>
          <div class="writing-setup-divider"></div>
          <div class="writing-setup-label">Category focus</div>
          <p class="writing-setup-help">Choose All, or focus one category in either Task.</p>
          <div class="cat-list writing-category-list writing-setup-category-list">
            <button class="cat-item cat-all tint-all${selectedCategory === "all" ? " on" : ""}" data-action="choose-writing-category" data-category="all">
              <span class="cat-item-icon"><span class="ielts-category-all">ALL</span></span>
              <span class="cat-item-name">All categories</span>
              <span class="cat-item-count">${G.DATA.writingSets.length} questions</span>
            </button>
            ${categoryGroups}
          </div>
          <button class="btn-close" data-action="close-overlay">Done</button>
        </div>
      </div>`;
  }

  function renderWritingCategoryOverlay() {
    const selected = String(G.state.writingCategory || "all");
    const allCount = G.DATA.writingSets.length;
    const groups = [1, 2].map((task) => `
      <div class="writing-category-group-label"><span class="ielts-category-task">T${task}</span> Task ${task}</div>
      ${writingCategories(task).map((category) => {
        const value = `${task}:${category}`;
        const count = G.DATA.writingSets.filter((set) => set.task === task && set.category === category).length;
        return `<button class="cat-item tint-all${selected === value ? " on" : ""}" data-action="choose-writing-category" data-category="${esc(value)}">
          <span class="cat-item-icon"><span class="ielts-category-task">T${task}</span></span>
          <span class="cat-item-name">${esc(category)}</span>
          <span class="cat-item-count">${count} questions</span>
        </button>`;
      }).join("")}`).join("");
    return `
      <div class="ov on" data-overlay-backdrop>
        <div class="cat-sheet-outer">
          <div class="cat-sheet-top review-category-top">
            <div class="sh-handle"></div>
            <span class="fs-section-label">Writing category — tap to focus</span>
          </div>
          <div class="cat-scroll">
            <div class="cat-list writing-category-list">
              <button class="cat-item cat-all tint-all${selected === "all" ? " on" : ""}" data-action="choose-writing-category" data-category="all">
                <span class="cat-item-icon"><span class="ielts-category-all">ALL</span></span>
                <span class="cat-item-name">All categories</span>
                <span class="cat-item-count">${allCount} questions</span>
              </button>
              ${groups}
            </div>
          </div>
          <div class="cat-sheet-bottom"><button class="btn-close" data-action="close-overlay">Done</button></div>
        </div>
      </div>`;
  }

  function renderModesOverlay() {
    const buttons = [
      ["blank", "✍️ Fill the Blank"],
      ["matching", "🔗 Meaning Match"],
      ["listening", "🔊 Listening"],
    ].map(([id, label]) => `<button class="mode-btn ${G.state.readingMode === id ? "on" : ""}" data-action="choose-reading-mode" data-mode="${id}">${label}</button>`).join("");
    return `
      <div class="ov on" data-overlay-backdrop>
        <div class="sheet">
          <div class="sh-handle"></div>
          <div class="sh-title">🎮 Practice Modes</div>
          <div id="mode-btns">${buttons}</div>
          <button class="btn-close" data-action="close-overlay">Done</button>
        </div>
      </div>`;
  }

  function renderModulesOverlay() {
    return `
      <div class="ov on" data-overlay-backdrop>
        <div class="sheet">
          <div class="sh-handle"></div>
          <div class="sh-title">Choose Practice</div>
          <div id="lang-grid" class="ielts-module-switch-grid">
            <button class="lang-card ${G.state.module === "speaking" ? "on" : ""}" data-action="switch-module" data-module="speaking"><span class="lc-f"><span class="ielts-module-icon speaking-icon">${moduleIcon("speaking")}</span></span><span class="lc-n">Speaking</span></button>
            <button class="lang-card ${G.state.module === "writing" ? "on" : ""}" data-action="switch-module" data-module="writing"><span class="lc-f"><span class="ielts-module-icon writing-icon">${moduleIcon("writing")}</span></span><span class="lc-n">Writing</span></button>
          </div>
          <button class="btn-close" data-action="close-overlay">Close</button>
        </div>
      </div>`;
  }

  function renderSettingsOverlay() {
    return `
      <div class="ov on" data-overlay-backdrop>
        <div class="sheet">
          <div class="sh-handle"></div>
          <div class="sh-title">⚙️ Settings</div>
          <span class="ss-lbl">Export / Import Progress</span>
          <p class="xp-note">Tap <b>Copy Code</b> to save your progress. Paste it on another device and tap <b>Import</b>.</p>
          <textarea class="xp-area" id="xp-box" placeholder="Paste your progress code here…" rows="3" autocorrect="off" autocapitalize="off" spellcheck="false">${esc(G.state.exportText)}</textarea>
          <div class="xp-row">
            <button class="xp-btn p" data-action="export-progress">📋 Copy Code</button>
            <button class="xp-btn s" data-action="import-progress">📥 Import</button>
          </div>
          <span class="ss-lbl">Danger Zone</span>
          <button class="btn-danger" data-action="confirm-reset">Reset All Progress</button>
          <button class="btn-close" data-action="close-overlay">Close</button>
        </div>
      </div>`;
  }

  function renderResetOverlay() {
    return `
      <div class="ov on" data-overlay-backdrop>
        <div class="m-sheet">
          <h3>Reset Progress?</h3>
          <p>All Speaking and Writing practice history will be permanently deleted.</p>
          <div class="m-btns">
            <button class="m-btn c" data-action="close-overlay">Cancel</button>
            <button class="m-btn d" data-action="reset-progress">Reset</button>
          </div>
        </div>
      </div>`;
  }

  function renderOverlay() {
    if (G.state.overlay === "review-categories") return renderReviewCategoryOverlay();
    if (G.state.overlay === "speaking-pools") return renderSpeakingPoolOverlay();
    if (G.state.overlay === "writing-setup") return renderWritingPoolOverlay();
    if (G.state.overlay === "writing-pools") return renderWritingPoolOverlay();
    if (G.state.overlay === "writing-categories") return renderWritingCategoryOverlay();
    if (G.state.overlay === "modes") return renderModesOverlay();
    if (G.state.overlay === "modules") return renderModulesOverlay();
    if (G.state.overlay === "settings") return renderSettingsOverlay();
    if (G.state.overlay === "reset") return renderResetOverlay();
    return "";
  }

  function fitKeywordCardTerm() {
    const word = document.querySelector(".keyword-card-screen .intro-word");
    if (!word) return;
    const row = word.closest(".intro-word-row");
    if (!row) return;
    const available = row.clientWidth - 120;
    if (available <= 0) return;

    word.style.maxWidth = `${available}px`;
    word.style.whiteSpace = "nowrap";
    word.style.wordBreak = "normal";
    word.style.overflowWrap = "normal";

    const startSize = parseFloat(getComputedStyle(word).fontSize);
    let size = startSize;
    const minimum = Math.max(12, startSize * 0.58);
    while (word.scrollWidth > available && size > minimum) {
      size -= 1;
      word.style.fontSize = `${size}px`;
    }

    if (word.scrollWidth > available) {
      word.style.whiteSpace = "normal";
      word.style.wordBreak = "break-word";
      word.style.overflowWrap = "anywhere";
    }
  }

  function scheduleKeywordCardFit() {
    if (typeof requestAnimationFrame === "function") requestAnimationFrame(fitKeywordCardTerm);
    else fitKeywordCardTerm();
  }

  G.render = function () {
    if (!G.root) return;
    G.root.innerHTML = `${G.state.screen === "landing" ? renderLanding() : renderGame()}${renderOverlay()}${G.state.toast ? `<div id="toast" class="on">${esc(G.state.toast)}</div>` : '<div id="toast"></div>'}`;
    scheduleKeywordCardFit();
  };
})();
