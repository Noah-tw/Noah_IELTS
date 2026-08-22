Noah IELTS Practice — Writing V4
Date: 2026-08-22

V4 learning and interface fixes:
- Paraphrase practice now reads only the real question prompt. Repeated IELTS instructions such as timing, “Summarise…”, “Give reasons…”, examples and minimum word counts can never become paraphrase points.
- Every paraphrase point has three natural rewrite possibilities.
- Tapping a covered rewrite reveals and pronounces that exact phrase; the completion chime waits until the last pronunciation finishes.
- Additional Keywords now appear one at a time from the bottom, pronounce automatically, pause briefly, then reveal the next word. Progress dots show the four-word sequence.
- Additional Keyword terms use normal-weight text instead of bold text. Each visible speaker button can replay a word.
- Every Keyword Card has three English examples with three Traditional-Chinese translations, matching the original New Word Card rhythm.
- The top panel keeps the original in-round controls active. Game / Review, mode menu, Speaking / Writing switch and practice selection remain usable; returning from Review preserves the active question.
- Landing-page and top-right Speaking / Writing labels are replaced with clear microphone and writing-document icons.
- Writing Task 1 uses a readable deep blue button with the original chart cue; Task 2 uses a readable deep purple button with the original writing cue.
- Writing Pool and Category are no longer two cramped half-width controls. One full-width Practice Selection control opens a single panel containing Task pools and category focus.
- Pool choices now expose All / New / Practice / Mastered / Off for both Speaking Parts and Writing Tasks.
- Speaking and Writing dual mode cards retain the original WordArk height and padding instead of shrinking on short screens.

V3 fixes retained:
- Paraphrase uses one bottom button: Skip before completion, Next after every branch is revealed.
- The source phrase on a paraphrase screen stays neutral; colour is reserved for the rewrites below.
- Long Keyword Card terms use measured shrink-to-fit, so infrastructure does not break as “infrastructur / e”.
- The final Keyword Card reliably advances into the paraphrase flow.
- Keyword Card notes follow the original New Word Card logic: concise Traditional-Chinese grammar, countability, pattern and collocation guidance.
- Speaking and Writing use random non-recent selection with rolling recent histories (Speaking 24 prompts; Writing 12 questions).

Open index.html to run the standalone game. Keep every file and the data folder together.

Verified content:
- 44 Cambridge IELTS 10–20 Speaking tests
- 484 exact Speaking practice cards
- 80 Cambridge IELTS 11–20 Writing questions: Task 1 × 40 and Task 2 × 40
- 4 topic-focused Keyword Cards per Writing question
- 3 examples and Traditional-Chinese translations on every Keyword Card
- 2–4 actual-prompt paraphrase points per Writing question
- 3 rewrite variants on every paraphrase point
- No generated replacement question wording

Main Writing path:
Question Card → sequential Additional Keywords → four Keyword Cards → Paraphrase mini quizzes

Design protection:
- styles.css remains the original WordArk stylesheet.
- ielts.css contains IELTS-specific additions and overrides.
- Speaking questions keep their exact supplied English wording.
- Writing question prompts keep their exact supplied English wording.
- Mandarin support remains selective rather than duplicated across the whole interface.

Source structure:
- engine_data.js: Speaking parser, Writing prompt-only paraphrase rules, Pools, Categories and progress
- engine_modes.js: Speaking / Writing flow, keyword reveal sequence and pronunciation
- engine_tts.js: Google TTS source waterfall with native voice fallback
- engine_actions.js: buttons, feedback sounds and speech actions
- engine_render.js: interface rendering and inline SVG module icons
- engine_session.js: state and boot sequence
- data/speaking_hints.js: curated compact answer directions
- data/writing_source.js: all 80 supplied Writing questions
- data/writing_paraphrases.js: Keyword packs, original-style Traditional-Chinese notes and third examples
