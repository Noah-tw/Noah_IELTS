(function () {
  "use strict";

  // Dedicated IELTS Speaking preparation notes, keyed to every exact question ID.
  // One version is shown at a time; limits are enforced by the build audit.
  window.SPEAKING_HINTS = {
  "C10-T1-P1-Q1": [
    [
      "Relax at home",
      "Meet friends for dinner"
    ],
    [
      "Finish weekly chores",
      "Take a long walk"
    ]
  ],
  "C10-T1-P1-Q2": [
    [
      "Saturday evening",
      "No alarm tomorrow"
    ],
    [
      "Sunday morning",
      "Quiet coffee, no rush"
    ]
  ],
  "C10-T1-P1-Q3": [
    [
      "They feel too short",
      "Monday comes quickly"
    ],
    [
      "Usually long enough",
      "I return refreshed"
    ]
  ],
  "C10-T1-P1-Q4": [
    [
      "Free time is essential",
      "It prevents burnout"
    ],
    [
      "Weekends protect family time",
      "Relationships stay close"
    ]
  ],
  "C10-T1-P2": [
    [
      "My former English teacher",
      "Explains hard ideas clearly",
      "Patient with every student"
    ],
    [
      "My older sister",
      "Cooks without written recipes",
      "Always gets flavours right"
    ]
  ],
  "C10-T1-P3-S1-Q1": [
    [
      "Clear communication skills",
      "Work depends on teamwork",
      "Avoid costly misunderstandings"
    ],
    [
      "Strong digital skills",
      "Most jobs use technology",
      "Access better opportunities"
    ]
  ],
  "C10-T1-P3-S1-Q2": [
    [
      "School teaches critical thinking",
      "Home teaches money management",
      "Both build independence"
    ],
    [
      "School develops teamwork",
      "Home provides cooking practice",
      "Daily life reinforces skills"
    ]
  ],
  "C10-T1-P3-S1-Q3": [
    [
      "Adapt quickly to change",
      "Careers keep evolving",
      "Learning becomes lifelong"
    ],
    [
      "Use technology responsibly",
      "Artificial intelligence keeps growing",
      "Ethical judgement matters"
    ]
  ],
  "C10-T1-P3-S2-Q1": [
    [
      "Specialist doctors earn most",
      "Training takes many years",
      "Decisions carry high stakes"
    ],
    [
      "Senior technology managers",
      "Rare expertise stays valuable",
      "Companies compete for talent"
    ]
  ],
  "C10-T1-P3-S2-Q2": [
    [
      "Experienced teachers deserve more",
      "They shape children's futures",
      "Better pay retains talent"
    ],
    [
      "Emergency workers deserve more",
      "They face serious risks",
      "Society depends on them"
    ]
  ],
  "C10-T1-P3-S2-Q3": [
    [
      "Equal pay sounds fair",
      "Skills carry different value",
      "Motivation could fall"
    ],
    [
      "Smaller gaps seem fairer",
      "Basic needs stay covered",
      "Responsibility still earns more"
    ]
  ],
  "C10-T2-P1-Q1": [
    [
      "Mostly acoustic pop",
      "The melodies feel calming"
    ],
    [
      "Upbeat dance music",
      "It lifts my mood"
    ]
  ],
  "C10-T2-P1-Q2": [
    [
      "During my morning commute",
      "It wakes me up"
    ],
    [
      "Late in the evening",
      "It helps me unwind"
    ]
  ],
  "C10-T2-P1-Q3": [
    [
      "I learned the piano",
      "Lessons built my confidence"
    ],
    [
      "No, lessons were expensive",
      "I sang at school"
    ]
  ],
  "C10-T2-P1-Q4": [
    [
      "Yes, basic lessons help",
      "Children learn discipline"
    ],
    [
      "Only with real interest",
      "Forced practice causes stress"
    ]
  ],
  "C10-T2-P2": [
    [
      "The corner bakery",
      "Warm bread every morning",
      "Five minutes from home"
    ],
    [
      "A family-run pharmacy",
      "Helpful advice from staff",
      "Beside the bus stop"
    ]
  ],
  "C10-T2-P3-S1-Q1": [
    [
      "Independent cafés and bakeries",
      "Serve daily local needs",
      "Keep money nearby"
    ],
    [
      "Small pharmacies and grocers",
      "Offer personal service",
      "Neighbours build trust"
    ]
  ],
  "C10-T2-P3-S1-Q2": [
    [
      "They create local jobs",
      "Owners know their customers",
      "Neighbourhoods feel connected"
    ],
    [
      "They keep streets active",
      "Convenience encourages walking",
      "Local identity becomes stronger"
    ]
  ],
  "C10-T2-P3-S1-Q3": [
    [
      "Malls offer lower prices",
      "Customers leave small shops",
      "Local variety gradually disappears"
    ],
    [
      "Big centres dominate advertising",
      "Small firms lose visibility",
      "Closures reduce local choice"
    ]
  ],
  "C10-T2-P3-S2-Q1": [
    [
      "They want greater independence",
      "Decisions stay under control",
      "Success feels personally rewarding"
    ],
    [
      "They spot unmet demand",
      "A useful idea grows",
      "Income may increase"
    ]
  ],
  "C10-T2-P3-S2-Q2": [
    [
      "Income can be unstable",
      "Costs continue every month",
      "Stress affects family life"
    ],
    [
      "Owners work long hours",
      "Holidays become difficult",
      "Burnout is a risk"
    ]
  ],
  "C10-T2-P3-S2-Q3": [
    [
      "Good financial judgement",
      "Cash flow needs control",
      "Businesses survive slow periods"
    ],
    [
      "Clear communication skills",
      "Staff need direction",
      "Customers expect honest answers"
    ]
  ],
  "C10-T3-P1-Q1": [
    [
      "Yes, especially abroad",
      "New cultures fascinate me"
    ],
    [
      "Mostly short local trips",
      "They clear my mind"
    ]
  ],
  "C10-T3-P1-Q2": [
    [
      "Quite a lot recently",
      "Mostly around nearby countries"
    ],
    [
      "Not as much lately",
      "Work limits my time"
    ]
  ],
  "C10-T3-P1-Q3": [
    [
      "Travel with close friends",
      "Share experiences, split costs"
    ],
    [
      "I prefer travelling alone",
      "Plans stay completely flexible"
    ]
  ],
  "C10-T3-P1-Q4": [
    [
      "I'd visit New Zealand",
      "The scenery looks spectacular"
    ],
    [
      "I'd explore northern Japan",
      "I love cooler weather"
    ]
  ],
  "C10-T3-P2": [
    [
      "My cheerful young cousin",
      "We meet every weekend",
      "Always asks thoughtful questions"
    ],
    [
      "My neighbour's daughter",
      "Eight years old",
      "Confident and very curious"
    ]
  ],
  "C10-T3-P3-S1-Q1": [
    [
      "Weekday time stays limited",
      "Parents often work late",
      "Weekends become essential"
    ],
    [
      "Several hours each evening",
      "Shared meals create contact",
      "Phones still cause distraction"
    ]
  ],
  "C10-T3-P3-S1-Q2": [
    [
      "Regular time builds trust",
      "Children share problems sooner",
      "Conflicts resolve more easily"
    ],
    [
      "Shared activities create memories",
      "Parents understand children's interests",
      "Relationships remain warm"
    ]
  ],
  "C10-T3-P3-S1-Q3": [
    [
      "Families spend less time",
      "Work and screens compete",
      "Conversations become shorter"
    ],
    [
      "Parents discuss feelings more",
      "Older authority has softened",
      "Children speak more openly"
    ]
  ],
  "C10-T3-P3-S2-Q1": [
    [
      "Online games and videos",
      "Friends connect remotely",
      "Screens fill spare time"
    ],
    [
      "Team sports remain popular",
      "Children enjoy friendly competition",
      "Exercise supports health"
    ]
  ],
  "C10-T3-P3-S2-Q2": [
    [
      "Sports support physical health",
      "Screens encourage long sitting",
      "Balance matters most"
    ],
    [
      "Creative hobbies reduce stress",
      "Online activities can connect",
      "Excessive use harms sleep"
    ]
  ],
  "C10-T3-P3-S2-Q3": [
    [
      "More virtual group activities",
      "Technology feels increasingly immersive",
      "Outdoor time may fall"
    ],
    [
      "Organised sports may grow",
      "Parents value healthy routines",
      "Facilities need investment"
    ]
  ],
  "C10-T4-P1-Q1": [
    [
      "Yes, ten minutes away",
      "I walked there daily"
    ],
    [
      "No, across town",
      "The bus took ages"
    ]
  ],
  "C10-T4-P1-Q2": [
    [
      "Supportive, patient teachers",
      "Lessons felt welcoming"
    ],
    [
      "Excellent sports facilities",
      "I played after class"
    ]
  ],
  "C10-T4-P1-Q3": [
    [
      "The classrooms felt crowded",
      "Concentration was difficult"
    ],
    [
      "Too much homework",
      "Evenings felt exhausting"
    ]
  ],
  "C10-T4-P1-Q4": [
    [
      "Add quieter study spaces",
      "Students could focus"
    ],
    [
      "Offer more practical classes",
      "Learning would feel relevant"
    ]
  ],
  "C10-T4-P2": [
    [
      "A reliable electric bicycle",
      "Wanted one since university",
      "First tried a friend's"
    ],
    [
      "A home with garden",
      "Wanted it for years",
      "Coastal homes inspired me"
    ]
  ],
  "C10-T4-P3-S1-Q1": [
    [
      "Latest phones and laptops",
      "Technology signals social status",
      "Advertising creates urgency"
    ],
    [
      "Cars and fashionable clothes",
      "Friends influence their choices",
      "Belonging feels important"
    ]
  ],
  "C10-T4-P3-S1-Q2": [
    [
      "Possessions provide security",
      "Ownership feels more predictable",
      "Anxiety briefly decreases"
    ],
    [
      "People compare themselves socially",
      "New purchases prove success",
      "Approval feels rewarding"
    ]
  ],
  "C10-T4-P3-S1-Q3": [
    [
      "Only for a while",
      "Novelty fades quickly",
      "Relationships matter much more"
    ],
    [
      "Useful items improve comfort",
      "Excess creates clutter",
      "Happiness needs deeper meaning"
    ]
  ],
  "C10-T4-P3-S2-Q1": [
    [
      "Characters display perfect lifestyles",
      "Products become status symbols",
      "Viewers imitate them"
    ],
    [
      "Repeated advertising shapes desire",
      "Familiar brands feel trustworthy",
      "Impulse buying increases"
    ]
  ],
  "C10-T4-P3-S2-Q2": [
    [
      "Consumer demand creates jobs",
      "Businesses invest and expand",
      "Tax revenue may grow"
    ],
    [
      "New purchases drive innovation",
      "Companies improve their products",
      "Customers gain better choices"
    ]
  ],
  "C10-T4-P3-S2-Q3": [
    [
      "Possessions may matter less",
      "Experiences gain social value",
      "Sustainability changes priorities"
    ],
    [
      "Status symbols will remain",
      "Social media amplifies comparison",
      "Luxury markets keep growing"
    ]
  ],
  "C11-T1-P1-Q1": [
    [
      "Fresh noodle dishes",
      "They are deeply comforting"
    ],
    [
      "Spicy vegetable curries",
      "The flavours stay interesting"
    ]
  ],
  "C11-T1-P1-Q2": [
    [
      "My father usually cooks",
      "He enjoys experimenting"
    ],
    [
      "We take turns cooking",
      "It shares the workload"
    ]
  ],
  "C11-T1-P1-Q3": [
    [
      "Sometimes at weekends",
      "I learn simple recipes"
    ],
    [
      "Rarely, they feel repetitive",
      "I prefer written recipes"
    ]
  ],
  "C11-T1-P1-Q4": [
    [
      "Eating at home",
      "Cheaper and more relaxed"
    ],
    [
      "Eating out with friends",
      "No cooking or cleaning"
    ]
  ],
  "C11-T1-P2": [
    [
      "My aunt's city apartment",
      "Near the central station",
      "Bright open-plan kitchen"
    ],
    [
      "My friend's country house",
      "Beside a quiet river",
      "Warm wooden interior"
    ]
  ],
  "C11-T1-P3-S1-Q1": [
    [
      "City apartments dominate",
      "Housing space is limited",
      "Commuting stays convenient"
    ],
    [
      "Detached suburban houses",
      "Families want more space",
      "Prices remain more affordable"
    ]
  ],
  "C11-T1-P3-S1-Q2": [
    [
      "Private outdoor space",
      "Children can play safely",
      "Noise affects fewer neighbours"
    ],
    [
      "More rooms and storage",
      "Families can grow comfortably",
      "Home working becomes easier"
    ]
  ],
  "C11-T1-P3-S1-Q3": [
    [
      "Many would prefer larger",
      "Extra space improves comfort",
      "Cost prevents the move"
    ],
    [
      "Not everyone wants size",
      "Large homes need maintenance",
      "Central location matters more"
    ]
  ],
  "C11-T1-P3-S2-Q1": [
    [
      "Difficult in major cities",
      "Demand exceeds housing supply",
      "Rents rise quickly"
    ],
    [
      "Easier outside city centres",
      "More land is available",
      "Transport becomes the trade-off"
    ]
  ],
  "C11-T1-P3-S2-Q2": [
    [
      "Renting offers flexibility",
      "Relocation stays easy",
      "Savings remain available"
    ],
    [
      "Buying builds long-term security",
      "Payments create an asset",
      "Maintenance costs remain"
    ]
  ],
  "C11-T1-P3-S2-Q3": [
    [
      "No single right age",
      "Income differs widely",
      "Readiness matters more"
    ],
    [
      "Independent living builds confidence",
      "Adults learn daily responsibilities",
      "Family finances still matter"
    ]
  ],
  "C11-T2-P1-Q1": [
    [
      "Usually twice a week",
      "We catch up properly"
    ],
    [
      "Mostly on weekends",
      "Weekdays stay too busy"
    ]
  ],
  "C11-T2-P1-Q2": [
    [
      "Her name was Anna",
      "Always calm and loyal"
    ],
    [
      "We met through football",
      "Shared every lunch break"
    ]
  ],
  "C11-T2-P1-Q3": [
    [
      "Friendly but not close",
      "We greet each other"
    ],
    [
      "Quite close to them",
      "We share small favours"
    ]
  ],
  "C11-T2-P1-Q4": [
    [
      "Family matters slightly more",
      "They offer lasting support"
    ],
    [
      "Close friends feel essential",
      "They understand daily problems"
    ]
  ],
  "C11-T2-P2": [
    [
      "A favourite travel writer",
      "Stories feel deeply observant",
      "Ask about research journeys"
    ],
    [
      "A thoughtful children's author",
      "Books shaped my childhood",
      "Discuss creating believable characters"
    ]
  ],
  "C11-T2-P3-S1-Q1": [
    [
      "Adventure and fantasy stories",
      "Imagination drives interest",
      "Heroes feel exciting"
    ],
    [
      "Funny illustrated books",
      "Pictures support understanding",
      "Reading feels less demanding"
    ]
  ],
  "C11-T2-P3-S1-Q2": [
    [
      "Screens offer instant entertainment",
      "Books require sustained attention",
      "Habits weaken over time"
    ],
    [
      "Few books at home",
      "Parents rarely read",
      "Children lack examples"
    ]
  ],
  "C11-T2-P3-S1-Q3": [
    [
      "Let children choose topics",
      "Personal interest creates motivation",
      "Reading becomes enjoyable"
    ],
    [
      "Parents read together nightly",
      "Attention feels supportive",
      "A routine gradually forms"
    ]
  ],
  "C11-T2-P3-S2-Q1": [
    [
      "Checking work emails",
      "Main points matter first",
      "Decisions happen quickly"
    ],
    [
      "Researching several sources",
      "Scanning finds useful sections",
      "Time is saved"
    ]
  ],
  "C11-T2-P3-S2-Q2": [
    [
      "Lawyers read case files",
      "Details affect legal arguments",
      "Errors carry consequences"
    ],
    [
      "Researchers review many papers",
      "Evidence must be compared",
      "Knowledge stays current"
    ]
  ],
  "C11-T2-P3-S2-Q3": [
    [
      "Novels create emotional connection",
      "Characters feel personally meaningful",
      "Curiosity sustains attention"
    ],
    [
      "Factual books teach directly",
      "Real discoveries feel fascinating",
      "Interest depends on readers"
    ]
  ],
  "C11-T3-P1-Q1": [
    [
      "Natural landscape photos",
      "Light changes every scene"
    ],
    [
      "Candid family pictures",
      "They preserve real moments"
    ]
  ],
  "C11-T3-P1-Q2": [
    [
      "Back them up online",
      "Then share selected ones"
    ],
    [
      "Print my favourites",
      "They decorate my room"
    ]
  ],
  "C11-T3-P1-Q3": [
    [
      "I take plenty photos",
      "They feel more personal"
    ],
    [
      "I buy local postcards",
      "The artwork looks distinctive"
    ]
  ],
  "C11-T3-P1-Q4": [
    [
      "Only informal pictures",
      "Posed photos feel awkward"
    ],
    [
      "Yes, with close friends",
      "They capture shared memories"
    ]
  ],
  "C11-T3-P2": [
    [
      "A spring day seaside",
      "Warm with light wind",
      "Walked along the cliffs"
    ],
    [
      "A crisp autumn morning",
      "Clear skies after rain",
      "Hiked through a forest"
    ]
  ],
  "C11-T3-P3-S1-Q1": [
    [
      "Humid summer heat",
      "Sleep becomes uncomfortable",
      "Energy levels fall"
    ],
    [
      "Long periods of rain",
      "Outdoor plans get cancelled",
      "Moods can worsen"
    ]
  ],
  "C11-T3-P3-S1-Q2": [
    [
      "Farmers depend on rainfall",
      "Crops need stable seasons",
      "Income can collapse"
    ],
    [
      "Construction workers face storms",
      "Outdoor sites become unsafe",
      "Projects suffer delays"
    ]
  ],
  "C11-T3-P3-S1-Q3": [
    [
      "Spring flower festivals",
      "Communities welcome warmer weather",
      "Tourism supports local shops"
    ],
    [
      "Harvest celebrations in autumn",
      "Families share seasonal food",
      "Traditions stay alive"
    ]
  ],
  "C11-T3-P3-S2-Q1": [
    [
      "Important before long journeys",
      "Weather affects safe travel",
      "Plans may need changing"
    ],
    [
      "Useful for outdoor workers",
      "Conditions shape daily tasks",
      "Preparation prevents accidents"
    ]
  ],
  "C11-T3-P3-S2-Q2": [
    [
      "Official weather applications",
      "Local radar updates quickly",
      "Warnings come directly"
    ],
    [
      "National forecasting services",
      "Experts explain uncertainty",
      "Information stays consistent"
    ]
  ],
  "C11-T3-P3-S2-Q3": [
    [
      "Coastal weather changes quickly",
      "Wind shifts without warning",
      "Short forecasts work best"
    ],
    [
      "Generally predictable by season",
      "Mountains create local changes",
      "Exact timing stays difficult"
    ]
  ],
  "C11-T4-P1-Q1": [
    [
      "They honoured a relative",
      "It honours my grandfather"
    ],
    [
      "They liked its sound",
      "It worked internationally"
    ]
  ],
  "C11-T4-P1-Q2": [
    [
      "It means quiet strength",
      "My parents valued that"
    ],
    [
      "No special meaning",
      "It simply sounded pleasant"
    ]
  ],
  "C11-T4-P1-Q3": [
    [
      "Fairly common here",
      "People spell it easily"
    ],
    [
      "Quite unusual locally",
      "People often ask twice"
    ]
  ],
  "C11-T4-P1-Q4": [
    [
      "No, it feels personal",
      "It connects my family"
    ],
    [
      "Maybe shorten it slightly",
      "Friends already use that"
    ]
  ],
  "C11-T4-P2": [
    [
      "A documentary about oceans",
      "Beautiful underwater filming",
      "Learned how reefs recover"
    ],
    [
      "A programme about sleep",
      "Useful everyday subject",
      "Changed my evening routine"
    ]
  ],
  "C11-T4-P3-S1-Q1": [
    [
      "Dramas and comedy series",
      "People want easy relaxation",
      "Characters build loyalty"
    ],
    [
      "Live sports programmes",
      "Shared excitement attracts viewers",
      "Results stay unpredictable"
    ]
  ],
  "C11-T4-P3-S1-Q2": [
    [
      "Yes, formats feel repetitive",
      "Cheap production encourages quantity",
      "Original programmes lose space"
    ],
    [
      "Not necessarily too many",
      "Audiences still enjoy them",
      "Competition creates participation"
    ]
  ],
  "C11-T4-P3-S1-Q3": [
    [
      "Online news now leads",
      "Phones provide instant updates",
      "Television serves older viewers"
    ],
    [
      "Television remains trusted",
      "Professional presenters add credibility",
      "Social media offers speed"
    ]
  ],
  "C11-T4-P3-S2-Q1": [
    [
      "Food and household products",
      "Everyone buys them regularly",
      "Brands compete intensely"
    ],
    [
      "Cars and financial services",
      "Sales bring high profits",
      "Images shape aspiration"
    ]
  ],
  "C11-T4-P3-S2-Q2": [
    [
      "Some ignore familiar adverts",
      "Repetition becomes background noise",
      "Memorable stories still work"
    ],
    [
      "Viewers notice useful offers",
      "Immediate relevance captures attention",
      "Purchasing becomes more likely"
    ]
  ],
  "C11-T4-P3-S2-Q3": [
    [
      "Strict rules protect children",
      "Young viewers trust easily",
      "Unhealthy choices can follow"
    ],
    [
      "Claims need clear evidence",
      "Consumers deserve accurate information",
      "Trust in media grows"
    ]
  ],
  "C12-T1-P1-Q1": [
    [
      "Yes, extremely important",
      "Energy stays stable"
    ],
    [
      "Mostly during weekdays",
      "Weekends are more flexible"
    ]
  ],
  "C12-T1-P1-Q2": [
    [
      "Drink warm tea",
      "Then sleep much earlier"
    ],
    [
      "Take a hot shower",
      "It clears my nose"
    ]
  ],
  "C12-T1-P1-Q3": [
    [
      "Only trusted health advice",
      "Sources must be reliable"
    ],
    [
      "Yes, during outbreaks",
      "Guidance changes my habits"
    ]
  ],
  "C12-T1-P1-Q4": [
    [
      "Walk after every meal",
      "Small habits feel manageable"
    ],
    [
      "Cook more at home",
      "Control salt and sugar"
    ]
  ],
  "C12-T1-P2": [
    [
      "Waiting for my train",
      "Almost three delayed hours",
      "Heavy rain stopped services"
    ],
    [
      "A late hospital appointment",
      "Waited nearly two hours",
      "An emergency took priority"
    ]
  ],
  "C12-T1-P3-S1-Q1": [
    [
      "Job interviews and exams",
      "First impressions carry weight",
      "Lateness increases stress"
    ],
    [
      "Flights and medical appointments",
      "Schedules cannot wait",
      "Missing them costs money"
    ]
  ],
  "C12-T1-P3-S1-Q2": [
    [
      "Quite important culturally",
      "Punctuality shows respect",
      "Others can plan reliably"
    ],
    [
      "Less strict socially",
      "Small delays are accepted",
      "Work still requires punctuality"
    ]
  ],
  "C12-T1-P3-S1-Q3": [
    [
      "Navigation predicts traffic",
      "Drivers choose faster routes",
      "Unexpected delays decrease"
    ],
    [
      "Calendar alerts give warning",
      "People leave on time",
      "Forgotten appointments become rare"
    ]
  ],
  "C12-T1-P3-S2-Q1": [
    [
      "Teachers need great patience",
      "Learning speeds differ",
      "Encouragement builds confidence"
    ],
    [
      "Nurses handle anxious patients",
      "Care cannot be rushed",
      "Calm improves treatment"
    ]
  ],
  "C12-T1-P3-S2-Q2": [
    [
      "Usually, for complex tasks",
      "Progress takes repeated effort",
      "Rushing creates mistakes"
    ],
    [
      "Not during urgent problems",
      "Decisions sometimes need speed",
      "Delay can worsen outcomes"
    ]
  ],
  "C12-T1-P3-S2-Q3": [
    [
      "Experience may build patience",
      "Setbacks become more familiar",
      "Reactions become calmer"
    ],
    [
      "Age alone changes little",
      "Personality matters strongly",
      "Stress affects everyone"
    ]
  ],
  "C12-T2-P1-Q1": [
    [
      "Yes, in school choir",
      "Friends made it enjoyable"
    ],
    [
      "Only around my family",
      "I felt less nervous"
    ]
  ],
  "C12-T2-P1-Q2": [
    [
      "Almost every day",
      "Usually while cooking"
    ],
    [
      "Only at celebrations",
      "Crowds make it fun"
    ]
  ],
  "C12-T2-P1-Q3": [
    [
      "Yes, an old ballad",
      "The lyrics feel honest"
    ],
    [
      "A lively pop song",
      "It improves my mood"
    ]
  ],
  "C12-T2-P1-Q4": [
    [
      "Important at family events",
      "Everyone sings together"
    ],
    [
      "Mostly during national festivals",
      "Songs preserve traditions"
    ]
  ],
  "C12-T2-P2": [
    [
      "A respected comedy actor",
      "Known for family films",
      "Warm, natural performances"
    ],
    [
      "A popular dramatic actor",
      "Plays complex historical roles",
      "Supports young filmmakers"
    ]
  ],
  "C12-T2-P3-S1-Q1": [
    [
      "Action films and comedies",
      "They offer simple escapism",
      "Wide audiences enjoy them"
    ],
    [
      "Local family dramas",
      "Stories reflect daily life",
      "Viewers recognise themselves"
    ]
  ],
  "C12-T2-P3-S1-Q2": [
    [
      "Cinema offers huge screens",
      "Crowds create shared excitement",
      "Tickets cost more"
    ],
    [
      "Home viewing feels comfortable",
      "Pausing stays possible",
      "Distractions interrupt attention"
    ]
  ],
  "C12-T2-P3-S1-Q3": [
    [
      "Small cinemas may close",
      "Streaming is more convenient",
      "Operating costs keep rising"
    ],
    [
      "Major cinemas will survive",
      "New releases attract crowds",
      "Social outings still matter"
    ]
  ],
  "C12-T2-P3-S2-Q1": [
    [
      "Theatre preserved national stories",
      "Live performances recorded history",
      "Language traditions survived"
    ],
    [
      "It shaped public debate",
      "Plays challenged social rules",
      "Culture gradually changed"
    ]
  ],
  "C12-T2-P3-S2-Q2": [
    [
      "Tradition is fairly limited",
      "Cinema attracts larger audiences",
      "Tickets can be expensive"
    ],
    [
      "Strong in major cities",
      "Festivals draw regular crowds",
      "Schools introduce young audiences"
    ]
  ],
  "C12-T2-P3-S2-Q3": [
    [
      "A public cultural service",
      "Funding protects experimental work",
      "Access stays affordable"
    ],
    [
      "Business discipline still helps",
      "Budgets require careful control",
      "Popular shows fund others"
    ]
  ],
  "C12-T3-P1-Q1": [
    [
      "Mostly from local shops",
      "I can try everything"
    ],
    [
      "Usually online",
      "The selection is wider"
    ]
  ],
  "C12-T3-P1-Q2": [
    [
      "A few times yearly",
      "I replace worn items"
    ],
    [
      "Almost every month",
      "Seasonal sales tempt me"
    ]
  ],
  "C12-T3-P1-Q3": [
    [
      "Comfort comes first",
      "Then I check quality"
    ],
    [
      "Fit and fabric matter",
      "Trends matter much less"
    ]
  ],
  "C12-T3-P1-Q4": [
    [
      "Yes, much simpler now",
      "Comfort became more important"
    ],
    [
      "Not very much",
      "Classic styles still suit"
    ]
  ],
  "C12-T3-P2": [
    [
      "Talked with my brother",
      "Planning our shared holiday",
      "Agreed on a budget"
    ],
    [
      "Discussed savings with colleague",
      "Rent had increased sharply",
      "Started tracking daily spending"
    ]
  ],
  "C12-T3-P3-S1-Q1": [
    [
      "Teach spending responsibility",
      "Children make small choices",
      "Mistakes remain affordable"
    ],
    [
      "Reward completed household tasks",
      "Effort gains clear value",
      "Saving habits begin early"
    ]
  ],
  "C12-T3-P3-S1-Q2": [
    [
      "Yes, practical lessons help",
      "Every adult manages money",
      "Debt can be avoided"
    ],
    [
      "Teach budgets through projects",
      "Students practise real decisions",
      "Confidence grows early"
    ]
  ],
  "C12-T3-P3-S1-Q3": [
    [
      "Part-time work teaches responsibility",
      "Income funds personal needs",
      "Study must remain priority"
    ],
    [
      "Not during demanding courses",
      "Long hours reduce concentration",
      "Grades may suffer"
    ]
  ],
  "C12-T3-P3-S2-Q1": [
    [
      "Money buys comfort",
      "Security reduces daily stress",
      "Relationships create deeper happiness"
    ],
    [
      "Beyond basic needs, less",
      "Constant comparison continues",
      "Satisfaction stops increasing"
    ]
  ],
  "C12-T3-P3-S2-Q2": [
    [
      "Social trust breaks down",
      "Groups understand outsiders less",
      "Conflict becomes likelier"
    ],
    [
      "Poor families lack opportunities",
      "Education remains unequal",
      "Poverty passes across generations"
    ]
  ],
  "C12-T3-P3-S2-Q3": [
    [
      "Yes, through fair partnerships",
      "Wealth brings global responsibility",
      "Shared problems cross borders"
    ],
    [
      "Help should build capacity",
      "Local systems need strengthening",
      "Dependence should be avoided"
    ]
  ],
  "C12-T4-P1-Q1": [
    [
      "Yes, especially painting",
      "Colours encouraged creativity"
    ],
    [
      "Not really, honestly",
      "Drawing felt frustrating"
    ]
  ],
  "C12-T4-P1-Q2": [
    [
      "Sometimes sketch small objects",
      "It helps me focus"
    ],
    [
      "Rarely these days",
      "Work leaves little time"
    ]
  ],
  "C12-T4-P1-Q3": [
    [
      "Last month downtown",
      "A photography exhibition"
    ],
    [
      "About two years ago",
      "Tickets were unexpectedly expensive"
    ]
  ],
  "C12-T4-P1-Q4": [
    [
      "Bright landscape prints",
      "They make rooms peaceful"
    ],
    [
      "Simple family photographs",
      "Warm and deeply personal"
    ]
  ],
  "C12-T4-P2": [
    [
      "Visited my mother",
      "A busy primary school",
      "Delivered her forgotten lunch"
    ],
    [
      "Met my cousin",
      "A small design studio",
      "Saw his finished project"
    ]
  ],
  "C12-T4-P3-S1-Q1": [
    [
      "Natural light and quiet",
      "Concentration becomes much easier",
      "Stress levels fall"
    ],
    [
      "Comfortable chairs and airflow",
      "Bodies stay less tired",
      "Productivity improves"
    ]
  ],
  "C12-T4-P3-S1-Q2": [
    [
      "Fresh air feels healthier",
      "Daily movement increases",
      "Work feels less confined"
    ],
    [
      "They dislike office routines",
      "Changing locations adds variety",
      "Independence feels greater"
    ]
  ],
  "C12-T4-P3-S1-Q3": [
    [
      "Colleagues matter much more",
      "Support shapes every day",
      "Poor relationships cause stress"
    ],
    [
      "Buildings still affect wellbeing",
      "Noise damages concentration",
      "Teams cannot fix everything"
    ]
  ],
  "C12-T4-P3-S2-Q1": [
    [
      "More freedom and leisure",
      "People pursue personal projects",
      "Some lose daily structure"
    ],
    [
      "Communities might gain volunteers",
      "Unpaid care becomes valued",
      "Purpose still remains essential"
    ]
  ],
  "C12-T4-P3-S2-Q2": [
    [
      "All useful, not equal",
      "Some protect human life",
      "Responsibility clearly differs"
    ],
    [
      "Every job supports society",
      "Invisible work still matters",
      "Respect should remain equal"
    ]
  ],
  "C12-T4-P3-S2-Q3": [
    [
      "Work becomes their identity",
      "Achievement provides approval",
      "Rest feels unproductive"
    ],
    [
      "High pressure rewards overwork",
      "Boundaries slowly disappear",
      "Health eventually suffers"
    ]
  ],
  "C13-T1-P1-Q1": [
    [
      "Usually on my laptop",
      "Headphones block background noise"
    ],
    [
      "On the living-room television",
      "My family watches together"
    ]
  ],
  "C13-T1-P1-Q2": [
    [
      "A weekly travel series",
      "It inspires future trips"
    ],
    [
      "A clever comedy show",
      "The dialogue feels natural"
    ]
  ],
  "C13-T1-P1-Q3": [
    [
      "I avoid reality shows",
      "The conflict feels artificial"
    ],
    [
      "Very violent dramas",
      "They leave me tense"
    ]
  ],
  "C13-T1-P1-Q4": [
    [
      "Probably fewer programmes",
      "Short videos take over"
    ],
    [
      "Slightly more documentaries",
      "Streaming makes access easier"
    ]
  ],
  "C13-T1-P2": [
    [
      "My university friend",
      "Runs a tutoring service",
      "Wanted flexible working hours"
    ],
    [
      "My neighbour",
      "Opened a small bakery",
      "Turned baking into work"
    ]
  ],
  "C13-T1-P3-S1-Q1": [
    [
      "Dangerous manual jobs",
      "Pay rarely matches risk",
      "Safer options attract youth"
    ],
    [
      "Repetitive service roles",
      "Growth feels very limited",
      "Customers can be demanding"
    ]
  ],
  "C13-T1-P3-S1-Q2": [
    [
      "Teachers know student strengths",
      "They understand career pathways",
      "Advice stays practical"
    ],
    [
      "Parents know personalities deeply",
      "They consider long-term wellbeing",
      "Bias can still interfere"
    ]
  ],
  "C13-T1-P3-S1-Q3": [
    [
      "No, purpose also matters",
      "Daily work needs meaning",
      "Motivation lasts longer"
    ],
    [
      "Income remains essential",
      "Bills still need paying",
      "Balance matters most"
    ]
  ],
  "C13-T1-P3-S2-Q1": [
    [
      "Yes, competition drives overwork",
      "Technology keeps workers reachable",
      "Rest time keeps shrinking"
    ],
    [
      "Job insecurity adds pressure",
      "People fear falling behind",
      "Families lose shared time"
    ]
  ],
  "C13-T1-P3-S2-Q2": [
    [
      "Health problems increase",
      "Public healthcare carries costs",
      "Productivity eventually declines"
    ],
    [
      "Family relationships weaken",
      "Parents have less time",
      "Children receive less support"
    ]
  ],
  "C13-T1-P3-S2-Q3": [
    [
      "Protect paid leave",
      "Managers must respect boundaries",
      "Burnout rates should fall"
    ],
    [
      "Offer flexible working hours",
      "Parents manage responsibilities better",
      "Retention should improve"
    ]
  ],
  "C13-T2-P1-Q1": [
    [
      "This age suits me",
      "I feel more independent"
    ],
    [
      "Mostly, but time flies",
      "Responsibilities keep growing"
    ]
  ],
  "C13-T2-P1-Q2": [
    [
      "Yes, quite often",
      "I imagined different careers"
    ],
    [
      "Not really back then",
      "I focused on friends"
    ]
  ],
  "C13-T2-P1-Q3": [
    [
      "Definitely more patient",
      "Experience changed my reactions"
    ],
    [
      "More confident socially",
      "I know my strengths"
    ]
  ],
  "C13-T2-P1-Q4": [
    [
      "I'll work more remotely",
      "Commuting will decrease"
    ],
    [
      "My family may grow",
      "Priorities will shift"
    ]
  ],
  "C13-T2-P2": [
    [
      "My first tablet",
      "Needed it for classes",
      "Simple after one week"
    ],
    [
      "A new work laptop",
      "Old computer kept crashing",
      "Setup took one evening"
    ]
  ],
  "C13-T2-P3-S1-Q1": [
    [
      "Around primary-school age",
      "Basic skills develop naturally",
      "Play should still dominate"
    ],
    [
      "About eight years old",
      "Children can follow instructions",
      "Safety habits come first"
    ]
  ],
  "C13-T2-P3-S1-Q2": [
    [
      "Yes, for interactive practice",
      "Feedback arrives immediately",
      "Different learners get support"
    ],
    [
      "Use it in moderation",
      "Teachers still guide thinking",
      "Screens should not dominate"
    ]
  ],
  "C13-T2-P3-S1-Q3": [
    [
      "No, teachers provide empathy",
      "Children need human encouragement",
      "Technology remains a tool"
    ],
    [
      "Routine instruction may automate",
      "Teachers focus on discussion",
      "Their role will change"
    ]
  ],
  "C13-T2-P3-S2-Q1": [
    [
      "Communication became nearly instant",
      "Distance matters much less",
      "Global teamwork feels normal"
    ],
    [
      "Video calls improved connection",
      "Families see each other",
      "Travel is less necessary"
    ]
  ],
  "C13-T2-P3-S2-Q2": [
    [
      "Yes, major problems remain",
      "Clean energy needs breakthroughs",
      "Research keeps advancing"
    ],
    [
      "Artificial intelligence will grow",
      "New uses emerge constantly",
      "Regulation must catch up"
    ]
  ],
  "C13-T2-P3-S2-Q3": [
    [
      "Constant alerts damage focus",
      "People want calmer routines",
      "Productivity may recover"
    ],
    [
      "Privacy concerns keep growing",
      "Platforms collect personal data",
      "Users limit exposure"
    ]
  ],
  "C13-T3-P1-Q1": [
    [
      "Usually pay by card",
      "It is quicker"
    ],
    [
      "Cash for small purchases",
      "Spending feels more visible"
    ]
  ],
  "C13-T3-P1-Q2": [
    [
      "Yes, for overseas trips",
      "Goals keep me disciplined"
    ],
    [
      "Sometimes for new technology",
      "I save monthly"
    ]
  ],
  "C13-T3-P1-Q3": [
    [
      "Only for useful experience",
      "Learning can outweigh salary"
    ],
    [
      "No, not long-term",
      "Living costs are high"
    ]
  ],
  "C13-T3-P1-Q4": [
    [
      "Yes, enormously",
      "I could buy housing"
    ],
    [
      "Somewhat, not completely",
      "Relationships would stay unchanged"
    ]
  ],
  "C13-T3-P2": [
    [
      "Discussed remote working",
      "Three project teammates",
      "Mixed views on productivity"
    ],
    [
      "Debated course assessment",
      "My seminar group",
      "Preferred practical assignments"
    ]
  ],
  "C13-T3-P3-S1-Q1": [
    [
      "Others offer fresh perspectives",
      "Emotions become less intense",
      "Solutions appear more clearly"
    ],
    [
      "Talking provides emotional support",
      "People feel less alone",
      "Confidence returns"
    ]
  ],
  "C13-T3-P3-S1-Q2": [
    [
      "Friends may feel safer",
      "They share similar experiences",
      "Advice may lack depth"
    ],
    [
      "Family knows long history",
      "Support is often reliable",
      "Some topics feel sensitive"
    ]
  ],
  "C13-T3-P3-S1-Q3": [
    [
      "No, privacy can disappear",
      "Conflicting advice creates confusion",
      "Trust may be damaged"
    ],
    [
      "A few trusted people",
      "Different perspectives still help",
      "Details remain protected"
    ]
  ],
  "C13-T3-P3-S2-Q1": [
    [
      "Clear, concise speaking",
      "Meetings have limited time",
      "Decisions become easier"
    ],
    [
      "Active listening matters most",
      "Colleagues feel respected",
      "Misunderstandings decrease"
    ]
  ],
  "C13-T3-P3-S2-Q2": [
    [
      "Instructions become confusing",
      "Employees repeat work",
      "Deadlines may be missed"
    ],
    [
      "Tone causes unnecessary conflict",
      "Trust within teams falls",
      "Clients may leave"
    ]
  ],
  "C13-T3-P3-S2-Q3": [
    [
      "Remote meetings will grow",
      "Teams span more countries",
      "Written clarity becomes crucial"
    ],
    [
      "Artificial intelligence assists writing",
      "Routine messages become faster",
      "Human judgement still matters"
    ]
  ],
  "C13-T4-P1-Q1": [
    [
      "Many small birds",
      "A park is nearby"
    ],
    [
      "Mostly stray cats",
      "Neighbours leave food outside"
    ]
  ],
  "C13-T4-P1-Q2": [
    [
      "A documentary each month",
      "Wildlife filming amazes me"
    ],
    [
      "Hardly ever now",
      "I read science news"
    ]
  ],
  "C13-T4-P1-Q3": [
    [
      "Yes, a wildlife park",
      "Rescue work impressed me"
    ],
    [
      "Only once during childhood",
      "I remember the elephants"
    ]
  ],
  "C13-T4-P1-Q4": [
    [
      "Perhaps in animal rescue",
      "The work feels meaningful"
    ],
    [
      "Probably not full-time",
      "I dislike medical procedures"
    ]
  ],
  "C13-T4-P2": [
    [
      "An online research library",
      "Use it every week",
      "Reliable academic articles"
    ],
    [
      "A language-learning website",
      "Practise during lunch breaks",
      "Clear grammar examples"
    ]
  ],
  "C13-T4-P3-S1-Q1": [
    [
      "Endless new content",
      "Small rewards keep appearing",
      "Stopping feels surprisingly difficult"
    ],
    [
      "Platforms learn user interests",
      "Recommendations become highly personal",
      "Time passes unnoticed"
    ]
  ],
  "C13-T4-P3-S1-Q2": [
    [
      "Daily tasks become slower",
      "Information is harder finding",
      "Local services matter again"
    ],
    [
      "Communication costs increase",
      "Distant relationships weaken",
      "Work becomes less flexible"
    ]
  ],
  "C13-T4-P3-S1-Q3": [
    [
      "More voice-based searching",
      "Typing becomes less common",
      "Access grows easier"
    ],
    [
      "Users may seek privacy",
      "Smaller communities gain appeal",
      "Data sharing decreases"
    ]
  ],
  "C13-T4-P3-S2-Q1": [
    [
      "Share emergency information",
      "Updates reach people quickly",
      "Communities coordinate help"
    ],
    [
      "Teach useful practical skills",
      "Experts reach wide audiences",
      "Learning becomes accessible"
    ]
  ],
  "C13-T4-P3-S2-Q2": [
    [
      "Distance reduces empathy",
      "Consequences feel less real",
      "Anger spreads quickly"
    ],
    [
      "Negative posts gain attention",
      "Algorithms reward strong reactions",
      "Behaviour becomes more extreme"
    ]
  ],
  "C13-T4-P3-S2-Q3": [
    [
      "Likely for younger audiences",
      "Targeting is highly precise",
      "Results are easily measured"
    ],
    [
      "Other channels will remain",
      "Trust varies by platform",
      "Older customers watch television"
    ]
  ],
  "C14-T1-P1-Q1": [
    [
      "A user-experience designer",
      "Creative problem-solving suits me"
    ],
    [
      "An English teacher",
      "Helping learners feels rewarding"
    ]
  ],
  "C14-T1-P1-Q2": [
    [
      "Extremely useful professionally",
      "Most clients speak English"
    ],
    [
      "Useful for overseas travel",
      "It builds independence"
    ]
  ],
  "C14-T1-P1-Q3": [
    [
      "Several trips each year",
      "I enjoy cultural variety"
    ],
    [
      "Only occasional holidays",
      "I prefer staying settled"
    ]
  ],
  "C14-T1-P1-Q4": [
    [
      "More flexible working hours",
      "Technology enables remote work"
    ],
    [
      "A quieter home life",
      "Balance will matter more"
    ]
  ],
  "C14-T1-P2": [
    [
      "A mystery about memory",
      "Recommended by a friend",
      "Questioned unreliable narration"
    ],
    [
      "A novel about migration",
      "Read for book club",
      "Changed my view home"
    ]
  ],
  "C14-T1-P3-S1-Q1": [
    [
      "Illustrated adventure stories",
      "Pictures hold children's attention",
      "Imagination keeps them reading"
    ],
    [
      "Humorous school stories",
      "Situations feel familiar",
      "Children enjoy shared jokes"
    ]
  ],
  "C14-T1-P3-S1-Q2": [
    [
      "Vocabulary grows naturally",
      "Stories introduce new words",
      "Language becomes more confident"
    ],
    [
      "Shared reading builds closeness",
      "Parents give full attention",
      "Children feel secure"
    ]
  ],
  "C14-T1-P3-S1-Q3": [
    [
      "Usually, within suitable limits",
      "Choice creates genuine interest",
      "Reading becomes self-directed"
    ],
    [
      "Parents should still guide",
      "Some books may overwhelm",
      "Age matters"
    ]
  ],
  "C14-T1-P3-S2-Q1": [
    [
      "Fairly popular with commuters",
      "One device holds everything",
      "Travel feels much easier"
    ],
    [
      "Growing among younger readers",
      "Instant downloads add convenience",
      "Print still feels special"
    ]
  ],
  "C14-T1-P3-S2-Q2": [
    [
      "Text size adjusts easily",
      "Children read more comfortably",
      "Accessibility improves"
    ],
    [
      "Interactive dictionaries explain words",
      "Questions get answered instantly",
      "Parents keep reading flowing"
    ]
  ],
  "C14-T1-P3-S2-Q3": [
    [
      "Not completely",
      "Printed books feel tangible",
      "Many readers value ownership"
    ],
    [
      "Perhaps for school materials",
      "Updates cost much less",
      "Heavy bags disappear"
    ]
  ],
  "C14-T2-P1-Q1": [
    [
      "Mostly Instagram and YouTube",
      "Friends share updates there"
    ],
    [
      "Only one messaging platform",
      "I protect my privacy"
    ]
  ],
  "C14-T2-P1-Q2": [
    [
      "Around thirty minutes daily",
      "I set app limits"
    ],
    [
      "Too much on weekends",
      "Short videos become addictive"
    ]
  ],
  "C14-T2-P1-Q3": [
    [
      "Travel photos and hobbies",
      "Nothing financially sensitive"
    ],
    [
      "Mostly work achievements",
      "My profile stays professional"
    ]
  ],
  "C14-T2-P1-Q4": [
    [
      "Yes, constant comparison",
      "It harms confidence"
    ],
    [
      "Targeted advertising bothers me",
      "Tracking feels intrusive"
    ]
  ],
  "C14-T2-P2": [
    [
      "A comfortable reading chair",
      "Bought from local shop",
      "Perfect beside the window"
    ],
    [
      "A warm bedside lamp",
      "Found during winter sales",
      "Makes reading much easier"
    ]
  ],
  "C14-T2-P3-S1-Q1": [
    [
      "They want greater comfort",
      "Useful objects ease routines",
      "Home feels more personal"
    ],
    [
      "Advertising encourages constant upgrades",
      "Trends change very quickly",
      "Purchases keep repeating"
    ]
  ],
  "C14-T2-P3-S1-Q2": [
    [
      "Not necessarily",
      "Paint and lighting help",
      "Creativity matters more"
    ],
    [
      "Furniture can cost plenty",
      "Quality lasts longer",
      "Budgets shape choices"
    ]
  ],
  "C14-T2-P3-S1-Q3": [
    [
      "They prioritise other goals",
      "Home is mainly functional",
      "Travel matters more"
    ],
    [
      "Temporary renters feel detached",
      "Moving remains likely",
      "Decorating seems wasteful"
    ]
  ],
  "C14-T2-P3-S2-Q1": [
    [
      "Flats require less maintenance",
      "Shared services reduce chores",
      "City locations stay convenient"
    ],
    [
      "Security is often stronger",
      "Neighbours remain close",
      "Solo residents feel safer"
    ]
  ],
  "C14-T2-P3-S2-Q2": [
    [
      "Homes will become smarter",
      "Energy use adjusts automatically",
      "Living costs may fall"
    ],
    [
      "Smaller flexible rooms",
      "Furniture serves several purposes",
      "Urban space stays limited"
    ]
  ],
  "C14-T2-P3-S2-Q3": [
    [
      "Yes, priorities change",
      "Young adults value location",
      "Families later need space"
    ],
    [
      "Older people prefer accessibility",
      "Stairs become inconvenient",
      "Nearby services matter"
    ]
  ],
  "C14-T3-P1-Q1": [
    [
      "Several times each week",
      "We meet by chance"
    ],
    [
      "Usually at weekends",
      "Our schedules rarely match"
    ]
  ],
  "C14-T3-P1-Q2": [
    [
      "Occasionally for coffee",
      "We know each other"
    ],
    [
      "Not usually",
      "I value private space"
    ]
  ],
  "C14-T3-P1-Q3": [
    [
      "Yes, I stay considerate",
      "I keep noise low"
    ],
    [
      "Generally yes",
      "I collect their parcels"
    ]
  ],
  "C14-T3-P1-Q4": [
    [
      "Yes, during a move",
      "He carried heavy boxes"
    ],
    [
      "Once during illness",
      "She brought groceries"
    ]
  ],
  "C14-T3-P2": [
    [
      "My final research presentation",
      "Finding evidence was difficult",
      "Practised with classmates"
    ],
    [
      "A complex client report",
      "Deadline was extremely tight",
      "Split work into stages"
    ]
  ],
  "C14-T3-P3-S1-Q1": [
    [
      "Emergency medical work",
      "Decisions affect human lives",
      "Pressure stays constant"
    ],
    [
      "Underground mining jobs",
      "Conditions can be dangerous",
      "Physical strain accumulates"
    ]
  ],
  "C14-T3-P3-S1-Q2": [
    [
      "Strong sense of purpose",
      "Challenges feel meaningful",
      "Success brings deep pride"
    ],
    [
      "Higher pay attracts workers",
      "Rare skills receive rewards",
      "Families gain security"
    ]
  ],
  "C14-T3-P3-S1-Q3": [
    [
      "Yes, at certain times",
      "Every role has pressure",
      "Deadlines create difficulty"
    ],
    [
      "Difficulty still varies greatly",
      "Risks are not equal",
      "Support changes experience"
    ]
  ],
  "C14-T3-P3-S2-Q1": [
    [
      "Goals give clear direction",
      "Daily choices become focused",
      "Progress feels measurable"
    ],
    [
      "Not everyone needs one",
      "Exploration can be valuable",
      "Pressure may reduce happiness"
    ]
  ],
  "C14-T3-P3-S2-Q2": [
    [
      "Hard work usually helps",
      "Skills improve through practice",
      "Opportunities still matter"
    ],
    [
      "Strategy matters as much",
      "Effort needs clear direction",
      "Burnout can block progress"
    ]
  ],
  "C14-T3-P3-S2-Q3": [
    [
      "No, success brings pressure",
      "Expectations keep rising",
      "Private life may suffer"
    ],
    [
      "Many feel genuinely fulfilled",
      "Purpose matches their values",
      "Relationships provide balance"
    ]
  ],
  "C14-T4-P1-Q1": [
    [
      "Yes, it feels peaceful",
      "Everything is within reach"
    ],
    [
      "Mostly, though traffic worsened",
      "Evenings can be noisy"
    ]
  ],
  "C14-T4-P1-Q2": [
    [
      "Walk through the park",
      "It clears my head"
    ],
    [
      "Visit the local café",
      "I meet neighbours there"
    ]
  ],
  "C14-T4-P1-Q3": [
    [
      "A larger public library",
      "Students need quiet space"
    ],
    [
      "More protected cycle lanes",
      "Roads would feel safer"
    ]
  ],
  "C14-T4-P1-Q4": [
    [
      "Maybe nearer the centre",
      "Commuting would be shorter"
    ],
    [
      "No, I feel settled",
      "Friends live nearby"
    ]
  ],
  "C14-T4-P2": [
    [
      "A large book website",
      "Bought two study guides",
      "Delivery came earlier"
    ],
    [
      "A local furniture site",
      "Ordered a simple desk",
      "Good photos, slow support"
    ]
  ],
  "C14-T4-P3-S1-Q1": [
    [
      "Clothes and small electronics",
      "Prices compare very easily",
      "Delivery feels convenient"
    ],
    [
      "Books and household supplies",
      "Items are standardised",
      "Buying feels low-risk"
    ]
  ],
  "C14-T4-P3-S1-Q2": [
    [
      "It saves travel time",
      "Shopping fits any schedule",
      "Busy people gain flexibility"
    ],
    [
      "Prices compare easily",
      "Competition creates discounts",
      "Customers feel in control"
    ]
  ],
  "C14-T4-P3-S1-Q3": [
    [
      "Products may disappoint",
      "Photos hide poor quality",
      "Returns take time"
    ],
    [
      "Local shops lose customers",
      "Town centres become quieter",
      "Community jobs disappear"
    ]
  ],
  "C14-T4-P3-S2-Q1": [
    [
      "Not always lower",
      "Delivery and returns cost",
      "Physical shops provide service"
    ],
    [
      "Lower overheads can help",
      "Savings should reach customers",
      "Competition decides prices"
    ]
  ],
  "C14-T4-P3-S2-Q2": [
    [
      "Yes, as social spaces",
      "Restaurants and entertainment attract",
      "Shopping becomes an outing"
    ],
    [
      "Some malls will struggle",
      "Routine purchases move online",
      "They must change purpose"
    ]
  ],
  "C14-T4-P3-S2-Q3": [
    [
      "Routine services move online",
      "Simple transactions suit automation",
      "Branches become less necessary"
    ],
    [
      "Complex advice stays personal",
      "Trust needs human contact",
      "Hybrid service will remain"
    ]
  ],
  "C15-T1-P1-Q1": [
    [
      "Project updates and deadlines",
      "They organise my workload"
    ],
    [
      "Course notices and feedback",
      "Teachers send weekly summaries"
    ]
  ],
  "C15-T1-P1-Q2": [
    [
      "I usually text friends",
      "Replies stay quick, casual"
    ],
    [
      "Phone close friends",
      "Tone is much clearer"
    ]
  ],
  "C15-T1-P1-Q3": [
    [
      "Usually within one day",
      "I dislike growing backlogs"
    ],
    [
      "Only urgent ones immediately",
      "Others wait until evening"
    ]
  ],
  "C15-T1-P1-Q4": [
    [
      "No, mostly unwanted",
      "They clutter my inbox"
    ],
    [
      "Only from trusted shops",
      "Discounts can be useful"
    ]
  ],
  "C15-T1-P2": [
    [
      "A coastal family hotel",
      "White building near beach",
      "Small pool and café"
    ],
    [
      "A city business hotel",
      "Opposite the main station",
      "Quiet rooms, helpful staff"
    ]
  ],
  "C15-T1-P3-S1-Q1": [
    [
      "Cleanliness and safe location",
      "Guests need basic confidence",
      "Reviews confirm both"
    ],
    [
      "Comfortable beds and quiet",
      "Sleep shapes the stay",
      "Convenience comes next"
    ]
  ],
  "C15-T1-P3-S1-Q2": [
    [
      "Rooms feel impersonal",
      "Long stays become lonely",
      "Home routines are missing"
    ],
    [
      "Hidden charges cause frustration",
      "Services cost extra",
      "Budgets become uncertain"
    ]
  ],
  "C15-T1-P3-S1-Q3": [
    [
      "Sometimes, yes",
      "Basic hotels meet needs",
      "Experiences matter more"
    ],
    [
      "Worth it occasionally",
      "Service reduces travel stress",
      "Special trips feel memorable"
    ]
  ],
  "C15-T1-P3-S2-Q1": [
    [
      "Good for sociable people",
      "Guests bring constant variety",
      "Career paths can grow"
    ],
    [
      "Hours can be difficult",
      "Weekends remain busy",
      "Family time may suffer"
    ]
  ],
  "C15-T1-P3-S2-Q2": [
    [
      "Big hotels feel specialised",
      "Roles have clear boundaries",
      "Promotion options are wider"
    ],
    [
      "Small hotels feel personal",
      "Staff handle varied tasks",
      "Teams know each other"
    ]
  ],
  "C15-T1-P3-S2-Q3": [
    [
      "Calm problem-solving skills",
      "Guest complaints need solutions",
      "Reputation stays protected"
    ],
    [
      "Strong team leadership",
      "Many departments must coordinate",
      "Service remains consistent"
    ]
  ],
  "C15-T2-P1-Q1": [
    [
      "Two languages confidently",
      "Another at basic level"
    ],
    [
      "Three in daily life",
      "My family is multilingual"
    ]
  ],
  "C15-T2-P1-Q2": [
    [
      "Essential for my career",
      "International teams use it"
    ],
    [
      "Very useful for travel",
      "Problems become easier"
    ]
  ],
  "C15-T2-P1-Q3": [
    [
      "Fun vocabulary games",
      "Our teacher encouraged speaking"
    ],
    [
      "Too much grammar drilling",
      "Speaking practice was limited"
    ]
  ],
  "C15-T2-P1-Q4": [
    [
      "Probably Mandarin Chinese",
      "The writing system differs"
    ],
    [
      "Arabic might be hardest",
      "Pronunciation seems challenging"
    ]
  ],
  "C15-T2-P2": [
    [
      "An independent bookshop site",
      "Bought a travel guide",
      "Clear checkout, careful packaging"
    ],
    [
      "A sports retailer online",
      "Ordered running shoes",
      "Easy returns, slow delivery"
    ]
  ],
  "C15-T2-P3-S1-Q1": [
    [
      "Clothing and phone accessories",
      "Choice is much wider",
      "Prices stay competitive"
    ],
    [
      "Groceries and household basics",
      "Repeat orders save time",
      "Delivery is predictable"
    ]
  ],
  "C15-T2-P3-S1-Q2": [
    [
      "Convenience drives its growth",
      "Stores never close",
      "Commuting becomes unnecessary"
    ],
    [
      "Customer reviews reduce uncertainty",
      "Experiences are shared",
      "Trust grows gradually"
    ]
  ],
  "C15-T2-P3-S1-Q3": [
    [
      "Sizing can be unreliable",
      "Items look different online",
      "Returns create waste"
    ],
    [
      "Scams remain a risk",
      "Fake websites copy brands",
      "Consumers lose money"
    ]
  ],
  "C15-T2-P3-S2-Q1": [
    [
      "Advertising creates artificial needs",
      "Trends change every season",
      "People fear missing out"
    ],
    [
      "Shopping provides quick pleasure",
      "Stress briefly disappears",
      "The habit repeats"
    ]
  ],
  "C15-T2-P3-S2-Q2": [
    [
      "Convenience and jobs help",
      "Waste and debt increase",
      "Harms may outweigh benefits"
    ],
    [
      "Consumer demand funds innovation",
      "Living standards can rise",
      "Strong regulation reduces harm"
    ]
  ],
  "C15-T2-P3-S2-Q3": [
    [
      "Difficult but possible",
      "Repair and reuse items",
      "Buy with clear lists"
    ],
    [
      "Social pressure remains strong",
      "Ads follow people everywhere",
      "Community values must shift"
    ]
  ],
  "C15-T3-P1-Q1": [
    [
      "Yes, around age seven",
      "My father taught me"
    ],
    [
      "No, I learned later",
      "School had no pool"
    ]
  ],
  "C15-T3-P1-Q2": [
    [
      "About twice monthly",
      "The pool is distant"
    ],
    [
      "Every weekend in summer",
      "It keeps me fit"
    ]
  ],
  "C15-T3-P1-Q3": [
    [
      "A modern public pool",
      "It offers evening lanes"
    ],
    [
      "A safe nearby beach",
      "Lifeguards patrol it"
    ]
  ],
  "C15-T3-P1-Q4": [
    [
      "Outdoors in warm weather",
      "Fresh air feels freeing"
    ],
    [
      "Indoors is more reliable",
      "Weather cannot interrupt"
    ]
  ],
  "C15-T3-P2": [
    [
      "A well-known restaurant founder",
      "Built an affordable chain",
      "Trains young local chefs"
    ],
    [
      "A successful technology founder",
      "Creates education software",
      "Known for fair leadership"
    ]
  ],
  "C15-T3-P3-S1-Q1": [
    [
      "Actors and popular singers",
      "Entertainment reaches huge audiences",
      "Fans follow personal lives"
    ],
    [
      "Successful athletes",
      "International competitions create heroes",
      "Achievements inspire young people"
    ]
  ],
  "C15-T3-P3-S1-Q2": [
    [
      "Fame attracts audience attention",
      "Stories generate easy clicks",
      "News companies earn money"
    ],
    [
      "Private mistakes seem dramatic",
      "Fans feel personal connection",
      "Demand stays constant"
    ]
  ],
  "C15-T3-P3-S1-Q3": [
    [
      "Social media glamorises fame",
      "Recognition looks instantly rewarding",
      "Difficulties stay hidden"
    ],
    [
      "Many want creative careers",
      "Fame feels validating",
      "Competition remains intense"
    ]
  ],
  "C15-T3-P3-S2-Q1": [
    [
      "Often through endorsements",
      "Brands pay for attention",
      "Income grows quickly"
    ],
    [
      "Not for every celebrity",
      "Fame may be brief",
      "Work remains uncertain"
    ]
  ],
  "C15-T3-P3-S2-Q2": [
    [
      "Fans provide emotional support",
      "Public approval feels rewarding",
      "Careers gain momentum"
    ],
    [
      "Shared enthusiasm builds community",
      "Performances feel more meaningful",
      "Loneliness may decrease"
    ]
  ],
  "C15-T3-P3-S2-Q3": [
    [
      "Promote important charities",
      "Attention brings more donations",
      "Public awareness expands"
    ],
    [
      "Model responsible behaviour",
      "Young followers may copy",
      "Positive habits spread"
    ]
  ],
  "C15-T4-P1-Q1": [
    [
      "Only on special occasions",
      "Daily jewellery feels inconvenient"
    ],
    [
      "Almost every day",
      "I wear one ring"
    ]
  ],
  "C15-T4-P1-Q2": [
    [
      "Simple silver necklaces",
      "They match most clothes"
    ],
    [
      "Small handmade earrings",
      "Each pair feels distinctive"
    ]
  ],
  "C15-T4-P1-Q3": [
    [
      "Mostly at weddings",
      "Jewellery marks the occasion"
    ],
    [
      "Often on birthdays",
      "It becomes a keepsake"
    ]
  ],
  "C15-T4-P1-Q4": [
    [
      "Yes, for my mother",
      "I chose a bracelet"
    ],
    [
      "Once for a friend",
      "The earrings suited her"
    ]
  ],
  "C15-T4-P2": [
    [
      "A programme about vaccines",
      "Watched during the pandemic",
      "Learned how immunity develops"
    ],
    [
      "A documentary about space",
      "Saw it last winter",
      "Explained distant black holes"
    ]
  ],
  "C15-T4-P3-S1-Q1": [
    [
      "Moderately interested",
      "Health stories gain attention",
      "Technical details feel difficult"
    ],
    [
      "Interest rises during crises",
      "Science affects daily choices",
      "Trust becomes important"
    ]
  ],
  "C15-T4-P3-S1-Q2": [
    [
      "They use technology earlier",
      "Interactive tools explain concepts",
      "Practice feels engaging"
    ],
    [
      "Schools offer better resources",
      "Experiments become more accessible",
      "Curiosity gets rewarded"
    ]
  ],
  "C15-T4-P3-S1-Q3": [
    [
      "Short public documentaries",
      "Visual explanations reduce complexity",
      "Stories hold attention"
    ],
    [
      "Museums offer practical exhibits",
      "Visitors learn by doing",
      "Families discuss discoveries"
    ]
  ],
  "C15-T4-P3-S2-Q1": [
    [
      "Antibiotics transformed medicine",
      "Infections became treatable",
      "Life expectancy increased"
    ],
    [
      "The internet connected knowledge",
      "Information travels instantly",
      "Research collaboration accelerated"
    ]
  ],
  "C15-T4-P3-S2-Q2": [
    [
      "Strongly disagree",
      "Unanswered questions remain",
      "New tools reveal more"
    ],
    [
      "Climate solutions need discovery",
      "Current technology is insufficient",
      "Research must continue"
    ]
  ],
  "C15-T4-P3-S2-Q3": [
    [
      "Governments fund basic research",
      "Benefits serve everyone",
      "Risky projects still proceed"
    ],
    [
      "Companies fund applied research",
      "Products reach markets faster",
      "Public oversight remains necessary"
    ]
  ],
  "C16-T1-P1-Q1": [
    [
      "My closest teammate",
      "We share most projects"
    ],
    [
      "Two classmates from college",
      "Our skills complement well"
    ]
  ],
  "C16-T1-P1-Q2": [
    [
      "Research and presentations",
      "Different viewpoints improve them"
    ],
    [
      "Planning weekly tasks",
      "We divide responsibilities"
    ]
  ],
  "C16-T1-P1-Q3": [
    [
      "Yes, for detailed writing",
      "Silence improves concentration"
    ],
    [
      "During early planning",
      "I form ideas alone"
    ]
  ],
  "C16-T1-P1-Q4": [
    [
      "Yes, trust matters",
      "Cooperation becomes much easier"
    ],
    [
      "Respect matters more",
      "Friendship is not essential"
    ]
  ],
  "C16-T1-P2": [
    [
      "A mountain national park",
      "Visited during spring",
      "Walked to a waterfall"
    ],
    [
      "The old city fortress",
      "Visited with my family",
      "Joined a guided tour"
    ]
  ],
  "C16-T1-P3-S1-Q1": [
    [
      "Historic sites and temples",
      "They reveal national identity",
      "Visitors learn local stories"
    ],
    [
      "Natural parks and beaches",
      "Scenery offers relaxation",
      "Families enjoy outdoor activities"
    ]
  ],
  "C16-T1-P3-S1-Q2": [
    [
      "Young visitors seek activities",
      "Adventure feels more exciting",
      "Older visitors value history"
    ],
    [
      "Both enjoy famous landmarks",
      "Younger people share photos",
      "Older people prefer tours"
    ]
  ],
  "C16-T1-P3-S1-Q3": [
    [
      "Free national museum entry",
      "Culture belongs to everyone",
      "Access supports education"
    ],
    [
      "Free basic entry helps",
      "Special exhibitions can charge",
      "Maintenance still gets funding"
    ]
  ],
  "C16-T1-P3-S2-Q1": [
    [
      "Tourism creates local jobs",
      "Visitors spend across businesses",
      "Tax revenue increases"
    ],
    [
      "It funds cultural preservation",
      "Historic sites gain income",
      "Traditions stay visible"
    ]
  ],
  "C16-T1-P3-S2-Q2": [
    [
      "Travel broadens perspectives",
      "Different customs become understandable",
      "Prejudice may decrease"
    ],
    [
      "People gain confidence",
      "Unfamiliar situations require decisions",
      "Independence grows"
    ]
  ],
  "C16-T1-P3-S2-Q3": [
    [
      "Basic phrases are valuable",
      "Respect becomes visible",
      "Simple problems get easier"
    ],
    [
      "Fluency is not necessary",
      "Translation tools can help",
      "Effort matters most"
    ]
  ],
  "C16-T2-P1-Q1": [
    [
      "Lavender is my favourite",
      "Its scent feels calming"
    ],
    [
      "I love small succulents",
      "They need little care"
    ]
  ],
  "C16-T2-P1-Q2": [
    [
      "Mostly roses and herbs",
      "The climate is mild"
    ],
    [
      "Tall trees and ferns",
      "Rain keeps them green"
    ]
  ],
  "C16-T2-P1-Q3": [
    [
      "Yes, a few plants",
      "Rooms feel more alive"
    ],
    [
      "Not especially",
      "My flat lacks sunlight"
    ]
  ],
  "C16-T2-P1-Q4": [
    [
      "Yes, for my mother",
      "They brightened her birthday"
    ],
    [
      "Once for a colleague",
      "It marked her promotion"
    ]
  ],
  "C16-T2-P2": [
    [
      "Review of a hotel",
      "Read on travel site",
      "Mentioned noise and cleanliness"
    ],
    [
      "Review of language classes",
      "Found in local forum",
      "Compared teachers and prices"
    ]
  ],
  "C16-T2-P3-S1-Q1": [
    [
      "Restaurants, hotels and products",
      "Purchases involve personal risk",
      "Experience helps others"
    ],
    [
      "Local services and tradespeople",
      "Quality varies widely",
      "Reviews guide choices"
    ]
  ],
  "C16-T2-P3-S1-Q2": [
    [
      "They want to help",
      "Good experiences deserve recognition",
      "Businesses gain support"
    ],
    [
      "They feel disappointed",
      "Writing releases frustration",
      "Warnings protect others"
    ]
  ],
  "C16-T2-P3-S1-Q3": [
    [
      "Usually good for both",
      "Shoppers gain useful evidence",
      "Companies spot weak service"
    ],
    [
      "Only with genuine reviews",
      "Fake comments distort choices",
      "Trust can collapse"
    ]
  ],
  "C16-T2-P3-S2-Q1": [
    [
      "Emotionally demanding work",
      "Customers may arrive angry",
      "Staff must stay calm"
    ],
    [
      "Rewarding when problems resolve",
      "People show real gratitude",
      "Communication skills improve"
    ]
  ],
  "C16-T2-P3-S2-Q2": [
    [
      "Platforms make complaints easy",
      "Responses arrive publicly",
      "Expectations have risen"
    ],
    [
      "Service may actually worsen",
      "Automated systems frustrate customers",
      "Complaints then increase"
    ]
  ],
  "C16-T2-P3-S2-Q3": [
    [
      "Very important",
      "Repeated complaints reveal patterns",
      "Fixes protect reputation"
    ],
    [
      "Take them seriously, proportionately",
      "Evidence should be checked",
      "Staff need fair treatment"
    ]
  ],
  "C16-T3-P1-Q1": [
    [
      "No, I prefer spring",
      "Summer gets too humid"
    ],
    [
      "Yes, absolutely",
      "Long evenings feel lively"
    ]
  ],
  "C16-T3-P1-Q2": [
    [
      "Stay indoors at midday",
      "Go out after sunset"
    ],
    [
      "Swim at the pool",
      "Cold water feels refreshing"
    ]
  ],
  "C16-T3-P1-Q3": [
    [
      "Usually a short trip",
      "We visit the coast"
    ],
    [
      "Not every summer",
      "Travel costs vary"
    ]
  ],
  "C16-T3-P1-Q4": [
    [
      "Yes, they felt endless",
      "I played outside daily"
    ],
    [
      "Mostly, except the heat",
      "Friends made them memorable"
    ]
  ],
  "C16-T3-P2": [
    [
      "A high-quality upright piano",
      "Simple polished wooden case",
      "Would practise every evening"
    ],
    [
      "A spacious city apartment",
      "Bright rooms, small balcony",
      "Shorter commute, more privacy"
    ]
  ],
  "C16-T3-P3-S1-Q1": [
    [
      "Latest phones and cars",
      "Brands signal social status",
      "Peers influence decisions"
    ],
    [
      "Overseas travel experiences",
      "Memories feel more valuable",
      "Social media inspires them"
    ]
  ],
  "C16-T3-P3-S1-Q2": [
    [
      "Younger buyers want technology",
      "New features attract them",
      "Older buyers value comfort"
    ],
    [
      "Older people choose property",
      "Long-term security matters",
      "Young people need mobility"
    ]
  ],
  "C16-T3-P3-S1-Q3": [
    [
      "More likely for themselves",
      "Large purchases feel personal",
      "Preferences differ greatly"
    ],
    [
      "Family may receive them",
      "Milestones justify expense",
      "Gifts show commitment"
    ]
  ],
  "C16-T3-P3-S2-Q1": [
    [
      "Extremely difficult",
      "Wealth often needs capital",
      "Opportunities are unequal"
    ],
    [
      "Possible through entrepreneurship",
      "Risk and timing matter",
      "Failure remains common"
    ]
  ],
  "C16-T3-P3-S2-Q2": [
    [
      "Agree beyond basic comfort",
      "Relationships shape wellbeing",
      "Comparison never fully ends"
    ],
    [
      "Money buys greater freedom",
      "Stress from bills falls",
      "Purpose still matters"
    ]
  ],
  "C16-T3-P3-S2-Q3": [
    [
      "Fund community education",
      "Skills create lasting opportunity",
      "Inequality can decrease"
    ],
    [
      "Support public health projects",
      "Treatment reaches more people",
      "Benefits spread widely"
    ]
  ],
  "C16-T4-P1-Q1": [
    [
      "Burgers and fried chicken",
      "Easy to find everywhere"
    ],
    [
      "Tacos and noodle bowls",
      "They offer stronger flavours"
    ]
  ],
  "C16-T4-P1-Q2": [
    [
      "Sometimes for leftovers",
      "It saves several minutes"
    ],
    [
      "Rarely for full meals",
      "Fresh cooking tastes better"
    ]
  ],
  "C16-T4-P1-Q3": [
    [
      "Extremely popular here",
      "Several open late"
    ],
    [
      "Mostly popular with students",
      "Prices remain affordable"
    ]
  ],
  "C16-T4-P1-Q4": [
    [
      "During a long journey",
      "Options are limited"
    ],
    [
      "After working very late",
      "Cooking feels exhausting"
    ]
  ],
  "C16-T4-P2": [
    [
      "A short-video app",
      "Downloaded during university",
      "Scrolling wasted my evenings"
    ],
    [
      "Old project software",
      "Started for one client",
      "Too slow and confusing"
    ]
  ],
  "C16-T4-P3-S1-Q1": [
    [
      "Competitive sports games",
      "Friends play together",
      "Matches create excitement"
    ],
    [
      "Story-driven adventure games",
      "Players explore imaginary worlds",
      "Progress feels rewarding"
    ]
  ],
  "C16-T4-P3-S1-Q2": [
    [
      "Challenges provide clear goals",
      "Success gives quick feedback",
      "Confidence briefly rises"
    ],
    [
      "Games offer social connection",
      "Teams cooperate online",
      "Distance matters less"
    ]
  ],
  "C16-T4-P3-S1-Q3": [
    [
      "Age limits for violence",
      "Young children imitate behaviour",
      "Parents need guidance"
    ],
    [
      "Not every simple game",
      "Content differs greatly",
      "Ratings should be specific"
    ]
  ],
  "C16-T4-P3-S2-Q1": [
    [
      "Visual simulations explain concepts",
      "Abstract ideas become concrete",
      "Understanding improves"
    ],
    [
      "Adaptive exercises give feedback",
      "Students practise independently",
      "Teachers see weak areas"
    ]
  ],
  "C16-T4-P3-S2-Q2": [
    [
      "Often true with apps",
      "Students explore without fear",
      "Teachers get less time"
    ],
    [
      "Teachers understand educational purpose",
      "Technical speed is insufficient",
      "Guidance still matters"
    ]
  ],
  "C16-T4-P3-S2-Q3": [
    [
      "No, human teachers adapt",
      "Emotions affect learning",
      "Machines miss subtle needs"
    ],
    [
      "Routine marking may automate",
      "Teachers gain discussion time",
      "Roles change, not vanish"
    ]
  ],
  "C17-T1-P1-Q1": [
    [
      "Ancient local civilisations",
      "Their cities fascinated me"
    ],
    [
      "Twentieth-century world events",
      "They shaped modern politics"
    ]
  ],
  "C17-T1-P1-Q2": [
    [
      "Yes, very much",
      "Stories made events memorable"
    ],
    [
      "Not at first",
      "Dates confused me"
    ]
  ],
  "C17-T1-P1-Q3": [
    [
      "Perhaps once a month",
      "Good documentaries add context"
    ],
    [
      "Only when recommended",
      "I prefer historical podcasts"
    ]
  ],
  "C17-T1-P1-Q4": [
    [
      "The industrial revolution",
      "It transformed daily life"
    ],
    [
      "Ancient Egypt",
      "Its engineering amazes me"
    ]
  ],
  "C17-T1-P2": [
    [
      "A quiet suburban neighbourhood",
      "Families knew each other",
      "Played outside after school"
    ],
    [
      "A busy central district",
      "Shops on every corner",
      "Noisy but very convenient"
    ]
  ],
  "C17-T1-P3-S1-Q1": [
    [
      "Collect parcels during absences",
      "Small help prevents theft",
      "Trust grows naturally"
    ],
    [
      "Check on older residents",
      "Loneliness can be serious",
      "Communities become safer"
    ]
  ],
  "C17-T1-P3-S1-Q2": [
    [
      "Often only casually",
      "People exchange brief greetings",
      "Busy schedules limit contact"
    ],
    [
      "Closer in smaller towns",
      "Families stay for years",
      "Shared history builds trust"
    ]
  ],
  "C17-T1-P3-S1-Q3": [
    [
      "Very important",
      "Emergencies happen nearby",
      "Quick support can matter"
    ],
    [
      "Good neighbours reduce conflict",
      "Noise problems get discussed",
      "Home feels more peaceful"
    ]
  ],
  "C17-T1-P3-S2-Q1": [
    [
      "Reliable public transport",
      "Workers reach jobs efficiently",
      "Traffic pressure falls"
    ],
    [
      "Parks and health clinics",
      "Wellbeing needs nearby support",
      "Families stay healthier"
    ]
  ],
  "C17-T1-P3-S2-Q2": [
    [
      "Local shops feel personal",
      "Owners know regular customers",
      "Prices may be higher"
    ],
    [
      "Large shops offer variety",
      "Bulk buying lowers prices",
      "Experience feels less personal"
    ]
  ],
  "C17-T1-P3-S2-Q3": [
    [
      "Usually, for convenience",
      "Short journeys reduce traffic",
      "Children gain local friends"
    ],
    [
      "Not when quality differs",
      "Education should come first",
      "Transport can be arranged"
    ]
  ],
  "C17-T2-P1-Q1": [
    [
      "Yes, a fantasy novel",
      "The world felt magical"
    ],
    [
      "A funny adventure story",
      "I reread it often"
    ]
  ],
  "C17-T2-P1-Q2": [
    [
      "Several hours each week",
      "Research requires careful reading"
    ],
    [
      "Quite a lot daily",
      "Most materials are digital"
    ]
  ],
  "C17-T2-P1-Q3": [
    [
      "Mostly contemporary fiction",
      "Characters feel relatable"
    ],
    [
      "Travel memoirs",
      "They reveal unfamiliar places"
    ]
  ],
  "C17-T2-P1-Q4": [
    [
      "I read news online",
      "Updates arrive immediately"
    ],
    [
      "I buy print magazines",
      "Reading feels less distracting"
    ]
  ],
  "C17-T2-P2": [
    [
      "I'd visit Seoul",
      "Take a direct flight",
      "Explore markets and museums"
    ],
    [
      "I'd visit Barcelona",
      "Travel there by train",
      "See architecture and beaches"
    ]
  ],
  "C17-T2-P3-S1-Q1": [
    [
      "Explore historic neighbourhoods",
      "Walking reveals local character",
      "Small cafés add atmosphere"
    ],
    [
      "Visit museums and markets",
      "Culture becomes tangible",
      "Local food adds context"
    ]
  ],
  "C17-T2-P3-S1-Q2": [
    [
      "Central hotels cost more",
      "Land values are high",
      "Budgets disappear quickly"
    ],
    [
      "Attractions charge entrance fees",
      "Transport adds daily costs",
      "Popular seasons raise prices"
    ]
  ],
  "C17-T2-P3-S1-Q3": [
    [
      "A small group",
      "Ideas and costs shared",
      "Memories feel richer"
    ],
    [
      "Alone offers full flexibility",
      "Plans change easily",
      "Confidence grows"
    ]
  ],
  "C17-T2-P3-S2-Q1": [
    [
      "Jobs concentrate in cities",
      "Workers follow opportunities",
      "Housing demand rises"
    ],
    [
      "Universities attract young adults",
      "Graduates remain for careers",
      "Families later join"
    ]
  ],
  "C17-T2-P3-S2-Q2": [
    [
      "Housing becomes unaffordable",
      "Low-income residents move outward",
      "Commutes become longer"
    ],
    [
      "Transport networks get crowded",
      "Air quality declines",
      "Daily stress increases"
    ]
  ],
  "C17-T2-P3-S2-Q3": [
    [
      "More compact mixed-use areas",
      "Homes sit near services",
      "Car use may fall"
    ],
    [
      "Greener public spaces",
      "Heat needs managing",
      "Wellbeing shapes planning"
    ]
  ],
  "C17-T3-P1-Q1": [
    [
      "Usually sparkling water",
      "It feels light"
    ],
    [
      "Warm green tea",
      "It aids digestion"
    ]
  ],
  "C17-T3-P1-Q2": [
    [
      "Yes, around two litres",
      "I carry a bottle"
    ],
    [
      "Probably not enough",
      "I forget while working"
    ]
  ],
  "C17-T3-P1-Q3": [
    [
      "Coffee in the morning",
      "It helps me focus"
    ],
    [
      "Tea in the evening",
      "It feels more relaxing"
    ]
  ],
  "C17-T3-P1-Q4": [
    [
      "Tea or fresh juice",
      "Most guests accept either"
    ],
    [
      "Usually coffee",
      "I keep several options"
    ]
  ],
  "C17-T3-P2": [
    [
      "A riverside peace statue",
      "Near the old bridge",
      "Two figures holding hands"
    ],
    [
      "A stone founder's monument",
      "In the central square",
      "Weathered but still dignified"
    ]
  ],
  "C17-T3-P3-S1-Q1": [
    [
      "Ancient temples and forts",
      "They reveal national history",
      "Architecture remains impressive"
    ],
    [
      "Memorials to major events",
      "Stories create emotional connection",
      "Guides add context"
    ]
  ],
  "C17-T3-P3-S1-Q2": [
    [
      "Statues honour public service",
      "Communities preserve shared memory",
      "Values become visible"
    ],
    [
      "Famous figures attract visitors",
      "Recognition supports local identity",
      "Debate can still occur"
    ]
  ],
  "C17-T3-P3-S1-Q3": [
    [
      "Preserve those with value",
      "History cannot be replaced",
      "Future generations deserve access"
    ],
    [
      "Not every old structure",
      "Safety and usefulness matter",
      "Document before removal"
    ]
  ],
  "C17-T3-P3-S2-Q1": [
    [
      "Art meets science",
      "Creative ideas become practical",
      "Cities visibly change"
    ],
    [
      "Career choices are broad",
      "Design affects every building",
      "Skills travel internationally"
    ]
  ],
  "C17-T3-P3-S2-Q2": [
    [
      "Homes became more open-plan",
      "Families use shared spaces",
      "Light travels further"
    ],
    [
      "Energy efficiency improved",
      "Insulation and solar panels",
      "Bills and emissions fall"
    ]
  ],
  "C17-T3-P3-S2-Q3": [
    [
      "Strongly affects moods",
      "Natural light supports energy",
      "Dark rooms feel oppressive"
    ],
    [
      "Layout shapes social contact",
      "Shared areas encourage conversation",
      "Isolation can decrease"
    ]
  ],
  "C17-T4-P1-Q1": [
    [
      "A phone map",
      "Directions update instantly"
    ],
    [
      "Paper maps for hiking",
      "Batteries cannot fail"
    ]
  ],
  "C17-T4-P1-Q2": [
    [
      "Last weekend downtown",
      "Roadworks changed my route"
    ],
    [
      "During my last holiday",
      "Streets were unfamiliar"
    ]
  ],
  "C17-T4-P1-Q3": [
    [
      "Usually, at first",
      "Then I memorise landmarks"
    ],
    [
      "Only for longer distances",
      "I like wandering freely"
    ]
  ],
  "C17-T4-P1-Q4": [
    [
      "Fairly easy",
      "I notice landmarks quickly"
    ],
    [
      "Sometimes difficult",
      "Complex junctions confuse me"
    ]
  ],
  "C17-T4-P2": [
    [
      "Rushed to an interview",
      "Train stopped unexpectedly",
      "Arrived just on time"
    ],
    [
      "Finished a class presentation",
      "Partner became suddenly ill",
      "Simplified the final slides"
    ]
  ],
  "C17-T4-P3-S1-Q1": [
    [
      "Brief delays are fine",
      "Unexpected delays happen",
      "Message first"
    ],
    [
      "Repeated lateness feels disrespectful",
      "Friends waste their time",
      "Trust gradually weakens"
    ]
  ],
  "C17-T4-P3-S1-Q2": [
    [
      "Discuss the cause first",
      "Transport problems may happen",
      "Support can help"
    ],
    [
      "Repeated lateness needs consequences",
      "Warnings create clear expectations",
      "Teams stay reliable"
    ]
  ],
  "C17-T4-P3-S1-Q3": [
    [
      "Leave a time buffer",
      "Small delays get absorbed",
      "Stress remains lower"
    ],
    [
      "Use calendar reminders",
      "Preparation starts earlier",
      "Important items aren't forgotten"
    ]
  ],
  "C17-T4-P3-S2-Q1": [
    [
      "Short focused blocks",
      "Attention stays stronger",
      "Breaks restore energy"
    ],
    [
      "Long blocks support depth",
      "Complex ideas need continuity",
      "Phones must stay away"
    ]
  ],
  "C17-T4-P3-S2-Q2": [
    [
      "Deadlines get missed",
      "Rushed work contains errors",
      "Grades may fall"
    ],
    [
      "Sleep becomes shorter",
      "Concentration worsens next day",
      "Stress keeps building"
    ]
  ],
  "C17-T4-P3-S2-Q3": [
    [
      "Very important",
      "Rest protects mental health",
      "Learning becomes sustainable"
    ],
    [
      "Leisure supports friendships",
      "Isolation decreases",
      "Motivation returns"
    ]
  ],
  "C18-T1-P1-Q1": [
    [
      "Electricity, water and internet",
      "They arrive monthly"
    ],
    [
      "Rent and phone service",
      "Both use automatic payments"
    ]
  ],
  "C18-T1-P1-Q2": [
    [
      "Usually by bank transfer",
      "It is secure"
    ],
    [
      "Automatic card payments",
      "I avoid missing deadlines"
    ]
  ],
  "C18-T1-P1-Q3": [
    [
      "Yes, one phone bill",
      "The reminder arrived late"
    ],
    [
      "Never so far",
      "Calendar alerts help me"
    ]
  ],
  "C18-T1-P1-Q4": [
    [
      "Use less electricity",
      "Switch appliances off"
    ],
    [
      "Compare internet providers",
      "Better deals appear yearly"
    ]
  ],
  "C18-T1-P2": [
    [
      "A simple vegetable curry",
      "Learned at university",
      "Followed my roommate's recipe"
    ],
    [
      "Fresh lemon tea",
      "Learned during a cold",
      "My grandmother showed me"
    ]
  ],
  "C18-T1-P3-S1-Q1": [
    [
      "Simple eggs and pasta",
      "Basic steps feel manageable",
      "Confidence grows quickly"
    ],
    [
      "Vegetable soup and rice",
      "Ingredients are inexpensive",
      "Families can eat together"
    ]
  ],
  "C18-T1-P3-S1-Q2": [
    [
      "Yes, it builds independence",
      "Young adults feed themselves",
      "Health choices improve"
    ],
    [
      "It also teaches safety",
      "Heat needs careful handling",
      "Accidents become less likely"
    ]
  ],
  "C18-T1-P3-S1-Q3": [
    [
      "Basics start at home",
      "Parents model daily habits",
      "Practice happens naturally"
    ],
    [
      "Schools teach nutrition",
      "Every child gets access",
      "Knowledge becomes more equal"
    ]
  ],
  "C18-T1-P3-S2-Q1": [
    [
      "Creative but physically demanding",
      "New menus feel rewarding",
      "Long shifts cause fatigue"
    ],
    [
      "Fast-paced and social",
      "Teams work closely",
      "Pressure peaks at mealtimes"
    ]
  ],
  "C18-T1-P3-S2-Q2": [
    [
      "Excellent time management",
      "Many dishes finish together",
      "Service stays smooth"
    ],
    [
      "A sensitive palate",
      "Flavours need careful balance",
      "Customers remember quality"
    ]
  ],
  "C18-T1-P3-S2-Q3": [
    [
      "Considerable influence",
      "Recipes look achievable",
      "Viewers try new ingredients"
    ],
    [
      "Mostly through entertainment",
      "Complex work looks simple",
      "Expectations may become unrealistic"
    ]
  ],
  "C18-T2-P1-Q1": [
    [
      "Yes, especially experiments",
      "Results felt surprising"
    ],
    [
      "Mostly biology",
      "Living systems interested me"
    ]
  ],
  "C18-T2-P1-Q2": [
    [
      "One very patient teacher",
      "She used simple demonstrations"
    ],
    [
      "They encouraged questions",
      "Lessons felt practical"
    ]
  ],
  "C18-T2-P1-Q3": [
    [
      "Quite interested now",
      "Science explains daily life"
    ],
    [
      "Mainly medical science",
      "New treatments affect everyone"
    ]
  ],
  "C18-T2-P1-Q4": [
    [
      "Rapid vaccine development",
      "It protected millions quickly"
    ],
    [
      "Affordable solar technology",
      "Clean energy became practical"
    ]
  ],
  "C18-T2-P2": [
    [
      "The coastal national park",
      "Three hours from capital",
      "Cliffs, trails and wildlife"
    ],
    [
      "Our historic old town",
      "In the southern region",
      "Markets, temples and museums"
    ]
  ],
  "C18-T2-P3-S1-Q1": [
    [
      "The national history museum",
      "School groups visit regularly",
      "Local stories feel relevant"
    ],
    [
      "A modern art gallery",
      "Exhibitions change often",
      "Young artists attract visitors"
    ]
  ],
  "C18-T2-P3-S1-Q2": [
    [
      "Free permanent collections",
      "Heritage belongs to everyone",
      "Education benefits widely"
    ],
    [
      "Small admission fees help",
      "Buildings require maintenance",
      "Low-income visitors need exemptions"
    ]
  ],
  "C18-T2-P3-S1-Q3": [
    [
      "Interactive exhibits and stories",
      "Visitors actively participate",
      "Facts become memorable"
    ],
    [
      "Friendly expert guides",
      "Questions receive clear answers",
      "Objects gain human context"
    ]
  ],
  "C18-T2-P3-S2-Q1": [
    [
      "Packages feel less stressful",
      "Transport and hotels align",
      "Families avoid complex planning"
    ],
    [
      "Prices look more predictable",
      "Major costs are bundled",
      "Budgeting becomes easier"
    ]
  ],
  "C18-T2-P3-S2-Q2": [
    [
      "Yes, crowds raise rents",
      "Local services become overloaded",
      "Residents feel displaced"
    ],
    [
      "Seasonal jobs can help",
      "Income reaches small businesses",
      "Careful limits are needed"
    ]
  ],
  "C18-T2-P3-S2-Q3": [
    [
      "Water use increases sharply",
      "Pools strain local supplies",
      "Residents face shortages"
    ],
    [
      "Coastal habitats get damaged",
      "Construction removes natural areas",
      "Wildlife numbers fall"
    ]
  ],
  "C18-T3-P1-Q1": [
    [
      "A few times monthly",
      "Delivery saves travel time"
    ],
    [
      "Mostly during sales",
      "Prices compare easily"
    ]
  ],
  "C18-T3-P1-Q2": [
    [
      "New running shoes",
      "Old ones wore out"
    ],
    [
      "A desk lamp",
      "Reviews looked consistently positive"
    ]
  ],
  "C18-T3-P1-Q3": [
    [
      "Sometimes for electronics",
      "Online prices are lower"
    ],
    [
      "Rarely for clothes",
      "Fit needs checking first"
    ]
  ],
  "C18-T3-P1-Q4": [
    [
      "Yes, some shops closed",
      "Foot traffic has fallen"
    ],
    [
      "It is changing gradually",
      "Centres add more cafés"
    ]
  ],
  "C18-T3-P2": [
    [
      "Visited my older brother",
      "He lives near campus",
      "Cooked dinner together"
    ],
    [
      "Stayed with my aunt",
      "Her home is rural",
      "Shared old family photos"
    ]
  ],
  "C18-T3-P3-S1-Q1": [
    [
      "Major religious holidays",
      "Traditions bring relatives home",
      "Meals are shared"
    ],
    [
      "Weddings and milestone birthdays",
      "Families mark life changes",
      "Memories become collective"
    ]
  ],
  "C18-T3-P3-S1-Q2": [
    [
      "Usually several times yearly",
      "Distance limits weekly contact",
      "Holidays create opportunities"
    ],
    [
      "Often in close families",
      "Grandparents help with childcare",
      "Generations stay connected"
    ]
  ],
  "C18-T3-P3-S1-Q3": [
    [
      "Old conflicts may return",
      "Long gatherings feel tense",
      "Avoidance seems easier"
    ],
    [
      "Social expectations feel exhausting",
      "Privacy becomes limited",
      "Some prefer quiet celebrations"
    ]
  ],
  "C18-T3-P3-S2-Q1": [
    [
      "Yes, with gentle guidance",
      "Children understand difficult tasks",
      "Confidence can grow"
    ],
    [
      "Parents shouldn't complete tasks",
      "Mistakes support learning",
      "Teachers see true ability"
    ]
  ],
  "C18-T3-P3-S2-Q2": [
    [
      "Very important when possible",
      "Daily conversation builds closeness",
      "Problems surface early"
    ],
    [
      "Quality matters more frequency",
      "Busy families need flexibility",
      "Forced meals cause tension"
    ]
  ],
  "C18-T3-P3-S2-Q3": [
    [
      "Yes, tasks should rotate",
      "Everyone uses the home",
      "Responsibility feels fair"
    ],
    [
      "Age-appropriate sharing works",
      "Children learn practical skills",
      "Parents feel less burdened"
    ]
  ],
  "C18-T4-P1-Q1": [
    [
      "Usually seven hours",
      "That keeps me alert"
    ],
    [
      "Around eight hours",
      "I protect my routine"
    ]
  ],
  "C18-T4-P1-Q2": [
    [
      "Occasionally after lunch",
      "Short naps refresh me"
    ],
    [
      "Almost never",
      "Naps disturb nighttime sleep"
    ]
  ],
  "C18-T4-P1-Q3": [
    [
      "Read a paper book",
      "Screens keep me awake"
    ],
    [
      "Listen to quiet music",
      "It slows my thoughts"
    ]
  ],
  "C18-T4-P1-Q4": [
    [
      "Sometimes very clearly",
      "Unusual dreams stay memorable"
    ],
    [
      "Rarely after breakfast",
      "Details disappear quickly"
    ]
  ],
  "C18-T4-P2": [
    [
      "Met my closest colleague",
      "During workplace orientation",
      "She seemed calm, kind"
    ],
    [
      "Met a university friend",
      "During a group project",
      "He listened very carefully"
    ]
  ],
  "C18-T4-P3-S1-Q1": [
    [
      "A few close friends",
      "Trust matters more quantity",
      "Children feel secure"
    ],
    [
      "Larger groups build confidence",
      "Different interests become available",
      "Social skills develop"
    ]
  ],
  "C18-T4-P3-S1-Q2": [
    [
      "Direct control is risky",
      "Children need social independence",
      "Resentment may grow"
    ],
    [
      "Intervene only for harm",
      "Bullying needs adult support",
      "Safety comes first"
    ]
  ],
  "C18-T4-P3-S1-Q3": [
    [
      "Interests change with age",
      "New activities create connections",
      "Old friendships may fade"
    ],
    [
      "Schools and classes change",
      "Children meet different peers",
      "Convenience shapes friendship"
    ]
  ],
  "C18-T4-P3-S2-Q1": [
    [
      "Join regular community classes",
      "Repeated meetings feel natural",
      "Shared interests start conversation"
    ],
    [
      "Volunteer locally",
      "Purpose brings people together",
      "Trust develops through action"
    ]
  ],
  "C18-T4-P3-S2-Q2": [
    [
      "Identities may be false",
      "Trust develops without evidence",
      "Personal safety becomes uncertain"
    ],
    [
      "Online contact stays shallow",
      "Body language is missing",
      "Misunderstandings happen easily"
    ]
  ],
  "C18-T4-P3-S2-Q3": [
    [
      "Often harder",
      "Work routines limit meetings",
      "People become more cautious"
    ],
    [
      "Still possible through hobbies",
      "Shared interests reduce awkwardness",
      "Consistency matters"
    ]
  ],
  "C19-T1-P1-Q1": [
    [
      "Yes, many restaurants",
      "Our city is multicultural"
    ],
    [
      "Several international markets",
      "Ingredients are easily found"
    ]
  ],
  "C19-T1-P1-Q2": [
    [
      "About once weekly",
      "I enjoy new flavours"
    ],
    [
      "Only on special occasions",
      "Local food is cheaper"
    ]
  ],
  "C19-T1-P1-Q3": [
    [
      "Yes, homemade Thai curry",
      "A friend shared instructions"
    ],
    [
      "I tried Italian bread",
      "The dough took patience"
    ]
  ],
  "C19-T1-P1-Q4": [
    [
      "Traditional noodle soup",
      "It tastes comforting"
    ],
    [
      "Our grilled street food",
      "Visitors enjoy bold flavours"
    ]
  ],
  "C19-T1-P2": [
    [
      "A ban on smoking",
      "National government introduced it",
      "Protect workers from smoke"
    ],
    [
      "Mandatory seat-belt law",
      "Introduced after road deaths",
      "Made family travel safer"
    ]
  ],
  "C19-T1-P3-S1-Q1": [
    [
      "Attendance and uniform rules",
      "Schools need predictable routines",
      "Distractions stay lower"
    ],
    [
      "Anti-bullying and safety rules",
      "Children need protection",
      "Respect becomes expected"
    ]
  ],
  "C19-T1-P3-S1-Q2": [
    [
      "Very important",
      "Boundaries create safety",
      "Learning can continue"
    ],
    [
      "Rules need clear reasons",
      "Students accept them better",
      "Fairness builds trust"
    ]
  ],
  "C19-T1-P3-S1-Q3": [
    [
      "First explain the harm",
      "Children reflect on consequences",
      "Behaviour may improve"
    ],
    [
      "Use proportionate consequences",
      "Repeated offences need escalation",
      "Consistency feels fair"
    ]
  ],
  "C19-T1-P3-S2-Q1": [
    [
      "Law offers stable careers",
      "Skills apply widely",
      "Income can be strong"
    ],
    [
      "Students want social impact",
      "Justice feels meaningful",
      "Cases affect real lives"
    ]
  ],
  "C19-T1-P3-S2-Q2": [
    [
      "Clear analytical thinking",
      "Evidence needs careful testing",
      "Arguments become stronger"
    ],
    [
      "Calm persuasive communication",
      "Clients need confidence",
      "Courts require clarity"
    ]
  ],
  "C19-T1-P3-S2-Q3": [
    [
      "Yes, deadlines are strict",
      "Cases carry serious consequences",
      "Mistakes affect clients"
    ],
    [
      "Some roles feel manageable",
      "Specialisation changes pressure",
      "Supportive firms help"
    ]
  ],
  "C19-T2-P1-Q1": [
    [
      "A moderate amount",
      "Mostly within Asia"
    ],
    [
      "Only a few times",
      "Tickets are expensive"
    ]
  ],
  "C19-T2-P1-Q2": [
    [
      "It saves considerable time",
      "Distant places feel reachable"
    ],
    [
      "Airport excitement feels special",
      "Views can be spectacular"
    ]
  ],
  "C19-T2-P1-Q3": [
    [
      "Airport noise bothers me",
      "Sleep would be difficult"
    ],
    [
      "Maybe near small airport",
      "Travel would be convenient"
    ]
  ],
  "C19-T2-P1-Q4": [
    [
      "Probably more often",
      "Work may involve travel"
    ],
    [
      "Perhaps less",
      "Environmental concerns are growing"
    ]
  ],
  "C19-T2-P2": [
    [
      "A local marathon runner",
      "Won a national medal",
      "Trained despite serious injury"
    ],
    [
      "A young science student",
      "Received an innovation prize",
      "Designed a water filter"
    ]
  ],
  "C19-T2-P3-S1-Q1": [
    [
      "Certificates and small trophies",
      "Achievements become visible",
      "Children feel proud"
    ],
    [
      "Books and learning vouchers",
      "Rewards support further growth",
      "Families appreciate usefulness"
    ]
  ],
  "C19-T2-P3-S1-Q2": [
    [
      "Recognition builds confidence",
      "Effort feels noticed",
      "Motivation may increase"
    ],
    [
      "Rewards clarify expectations",
      "Good work becomes concrete",
      "Habits can form"
    ]
  ],
  "C19-T2-P3-S1-Q3": [
    [
      "Both sources matter differently",
      "Parents give emotional support",
      "Teachers judge academic progress"
    ],
    [
      "Teacher rewards feel objective",
      "Classroom effort is recognised",
      "Parent praise remains personal"
    ]
  ],
  "C19-T2-P3-S2-Q1": [
    [
      "Top salaries seem excessive",
      "Fans fund the industry",
      "Public workers earn less"
    ],
    [
      "Rare talent attracts revenue",
      "Careers are short",
      "Higher pay seems justified"
    ]
  ],
  "C19-T2-P3-S2-Q2": [
    [
      "Equal team prize money",
      "Victory requires every role",
      "Unity stays stronger"
    ],
    [
      "Performance bonuses can vary",
      "Exceptional effort deserves recognition",
      "Base prize remains equal"
    ]
  ],
  "C19-T2-P3-S2-Q3": [
    [
      "Participation builds health",
      "Not everyone can win",
      "Enjoyment sustains sport"
    ],
    [
      "Winning still creates goals",
      "Competition drives improvement",
      "Balance matters"
    ]
  ],
  "C19-T3-P1-Q1": [
    [
      "Usually with close friends",
      "Plans feel more flexible"
    ],
    [
      "Mostly with family",
      "We rarely meet otherwise"
    ]
  ],
  "C19-T3-P1-Q2": [
    [
      "A small central hotel",
      "Walking saves transport costs"
    ],
    [
      "A quiet rental apartment",
      "It feels more private"
    ]
  ],
  "C19-T3-P1-Q3": [
    [
      "A coastal weekend trip",
      "We plan to hike"
    ],
    [
      "Visit a historic city",
      "Museums are the priority"
    ]
  ],
  "C19-T3-P1-Q4": [
    [
      "Yes, excellent food",
      "Historic streets attract visitors"
    ],
    [
      "Yes, especially in spring",
      "Weather stays comfortable"
    ]
  ],
  "C19-T3-P2": [
    [
      "Driving to the airport",
      "Travelling with my sister",
      "Road accident caused delays"
    ],
    [
      "Returning from the coast",
      "Three friends in car",
      "Heavy rain slowed traffic"
    ]
  ],
  "C19-T3-P3-S1-Q1": [
    [
      "Very interested outside cities",
      "Cars provide independence",
      "Transport options are limited"
    ],
    [
      "Interest is falling downtown",
      "Public transport works well",
      "Ownership costs keep rising"
    ]
  ],
  "C19-T3-P3-S1-Q2": [
    [
      "Countryside roads feel calmer",
      "Distances are longer",
      "Hazards appear unexpectedly"
    ],
    [
      "City driving needs attention",
      "Traffic changes constantly",
      "Parking causes stress"
    ]
  ],
  "C19-T3-P3-S1-Q3": [
    [
      "Most are reasonably careful",
      "Road rules are understood",
      "Rush hours worsen manners"
    ],
    [
      "Many drive too aggressively",
      "Speeding feels common",
      "Pedestrians become less safe"
    ]
  ],
  "C19-T3-P3-S2-Q1": [
    [
      "Still a small minority",
      "Prices remain relatively high",
      "Charging points are limited"
    ],
    [
      "Growing quickly in cities",
      "Incentives reduce costs",
      "Drivers value quiet travel"
    ]
  ],
  "C19-T3-P3-S2-Q2": [
    [
      "Lower purchase taxes",
      "Upfront cost would fall",
      "More families could switch"
    ],
    [
      "Build reliable charging networks",
      "Range anxiety decreases",
      "Long journeys feel practical"
    ]
  ],
  "C19-T3-P3-S2-Q3": [
    [
      "Eventually, probably",
      "Battery technology keeps improving",
      "Rules will tighten"
    ],
    [
      "Not everywhere soon",
      "Rural infrastructure develops slowly",
      "Older cars last years"
    ]
  ],
  "C19-T4-P1-Q1": [
    [
      "Yes, near my office",
      "Staff remember my order"
    ],
    [
      "A quiet neighbourhood café",
      "Its courtyard feels peaceful"
    ]
  ],
  "C19-T4-P1-Q2": [
    [
      "Sometimes before work",
      "I plan my day"
    ],
    [
      "Rarely by myself",
      "I prefer conversation"
    ]
  ],
  "C19-T4-P1-Q3": [
    [
      "Friendly, consistent service",
      "Customers feel remembered"
    ],
    [
      "Good coffee, fair prices",
      "People return regularly"
    ]
  ],
  "C19-T4-P1-Q4": [
    [
      "Chains feel predictable",
      "Prices and menus match"
    ],
    [
      "Convenient central locations",
      "Expectations stay predictable"
    ]
  ],
  "C19-T4-P2": [
    [
      "A hill above town",
      "Visited after summer rain",
      "Wide valley and lakes"
    ],
    [
      "A quiet coastal path",
      "Went there last spring",
      "Cliffs above blue water"
    ]
  ],
  "C19-T4-P3-S1-Q1": [
    [
      "Many products offer little",
      "Branding raises the price",
      "Results can be temporary"
    ],
    [
      "Basic products are useful",
      "Skin needs protection",
      "Expensive extras are optional"
    ]
  ],
  "C19-T4-P3-S1-Q2": [
    [
      "Idealised images create desire",
      "Customers compare themselves",
      "Products promise confidence"
    ],
    [
      "Influencers demonstrate daily routines",
      "Recommendations feel personal",
      "Trust drives sales"
    ]
  ],
  "C19-T4-P3-S1-Q3": [
    [
      "Yes, children are vulnerable",
      "They lack advertising awareness",
      "Insecurity may develop"
    ],
    [
      "Only basic hygiene products",
      "Claims must stay factual",
      "Parental guidance remains essential"
    ]
  ],
  "C19-T4-P3-S2-Q1": [
    [
      "Media celebrates smooth skin",
      "Youth suggests health",
      "Ageing stays hidden"
    ],
    [
      "Advertising targets older fears",
      "Products promise lost youth",
      "Beauty becomes commercial"
    ]
  ],
  "C19-T4-P3-S2-Q2": [
    [
      "Sometimes, through first impressions",
      "Attractive people gain attention",
      "Skills still sustain success"
    ],
    [
      "Bias can affect hiring",
      "Confidence may also increase",
      "Fair policies are needed"
    ]
  ],
  "C19-T4-P3-S2-Q3": [
    [
      "Media ideals keep shifting",
      "New celebrities gain influence",
      "Trends spread globally"
    ],
    [
      "Cultural values evolve",
      "Diversity becomes more visible",
      "Standards may broaden"
    ]
  ],
  "C20-T1-P1-Q1": [
    [
      "About thirty minutes daily",
      "I walk to work"
    ],
    [
      "Several short walks",
      "I avoid nearby buses"
    ]
  ],
  "C20-T1-P1-Q2": [
    [
      "Yes, much more",
      "I walked between classes"
    ],
    [
      "No, roughly the same",
      "Walking remains my transport"
    ]
  ],
  "C20-T1-P1-Q3": [
    [
      "A riverside path",
      "It stays quiet"
    ],
    [
      "A wooded local park",
      "Paths are well maintained"
    ]
  ],
  "C20-T1-P1-Q4": [
    [
      "Yes, along the coast",
      "Daily distances feel manageable"
    ],
    [
      "Maybe for one weekend",
      "Long walks need training"
    ]
  ],
  "C20-T1-P2": [
    [
      "A funny stage comedy",
      "Go with university friends",
      "They praised the cast"
    ],
    [
      "A moving family film",
      "Watch with my sister",
      "Reviews loved its ending"
    ]
  ],
  "C20-T1-P3-S1-Q1": [
    [
      "Musicals and light comedies",
      "They suit family outings",
      "Songs add spectacle"
    ],
    [
      "Contemporary local dramas",
      "Stories reflect current issues",
      "Audiences recognise themselves"
    ]
  ],
  "C20-T1-P3-S1-Q2": [
    [
      "Easy for popular shows",
      "Online booking is quick",
      "Good seats sell early"
    ],
    [
      "Difficult during short runs",
      "Limited venues create demand",
      "Prices rise quickly"
    ]
  ],
  "C20-T1-P3-S1-Q3": [
    [
      "Yes, offer student prices",
      "Cost is a barrier",
      "Attendance could grow"
    ],
    [
      "Use modern relatable stories",
      "Young lives need representation",
      "Interest becomes personal"
    ]
  ],
  "C20-T1-P3-S2-Q1": [
    [
      "Creative self-expression",
      "Actors explore other lives",
      "Performance feels exciting"
    ],
    [
      "Public recognition and variety",
      "Every project feels different",
      "Routine stays limited"
    ]
  ],
  "C20-T1-P3-S2-Q2": [
    [
      "Strong emotional awareness",
      "Characters need believable motives",
      "Audiences feel connection"
    ],
    [
      "Confidence under pressure",
      "Live mistakes cannot pause",
      "Focus must continue"
    ]
  ],
  "C20-T1-P3-S2-Q3": [
    [
      "Income is very unstable",
      "Auditions bring frequent rejection",
      "Planning becomes difficult"
    ],
    [
      "Public attention reduces privacy",
      "Personal mistakes spread quickly",
      "Stress can increase"
    ]
  ],
  "C20-T2-P1-Q1": [
    [
      "Mango is my favourite",
      "It tastes naturally sweet"
    ],
    [
      "I love crisp apples",
      "They travel well"
    ]
  ],
  "C20-T2-P1-Q2": [
    [
      "I dislike overripe bananas",
      "The texture feels unpleasant"
    ],
    [
      "Not keen on grapefruit",
      "It tastes too bitter"
    ]
  ],
  "C20-T2-P1-Q3": [
    [
      "Yes, especially fruit pies",
      "Warm apples taste richer"
    ],
    [
      "Sometimes in savoury dishes",
      "Pineapple adds freshness"
    ]
  ],
  "C20-T2-P1-Q4": [
    [
      "The weekly street market",
      "Produce is very fresh"
    ],
    [
      "A nearby greengrocer",
      "Staff choose ripe fruit"
    ]
  ],
  "C20-T2-P2": [
    [
      "Planned an outdoor picnic",
      "Heavy rain was forecast",
      "Booked a small café"
    ],
    [
      "Planned a weekend flight",
      "Friend became unwell",
      "Took a local daytrip"
    ]
  ],
  "C20-T2-P3-S1-Q1": [
    [
      "Holidays and shared meals",
      "Friends compare free dates",
      "Costs are divided"
    ],
    [
      "Exercise and weekend activities",
      "Shared goals improve commitment",
      "Plans stay enjoyable"
    ]
  ],
  "C20-T2-P3-S1-Q2": [
    [
      "Friends understand current interests",
      "Ideas feel more adventurous",
      "Practical advice may lack"
    ],
    [
      "Family knows long-term needs",
      "Experience can guide choices",
      "Expectations may interfere"
    ]
  ],
  "C20-T2-P3-S1-Q3": [
    [
      "Yes, personal goals differ",
      "Copying creates poor fit",
      "Motivation may disappear"
    ],
    [
      "Friends can still inspire",
      "Discuss rather than imitate",
      "Decisions remain personal"
    ]
  ],
  "C20-T2-P3-S2-Q1": [
    [
      "Useful but not essential",
      "Transferable skills matter",
      "Careers often change"
    ],
    [
      "Important for specialist fields",
      "Training must meet requirements",
      "Graduates enter smoothly"
    ]
  ],
  "C20-T2-P3-S2-Q2": [
    [
      "Real tasks reveal preferences",
      "Assumptions get tested",
      "Choices become informed"
    ],
    [
      "Workplace habits develop early",
      "Feedback shows weak skills",
      "Confidence grows"
    ]
  ],
  "C20-T2-P3-S2-Q3": [
    [
      "Possible with retraining",
      "Online courses increase access",
      "Income may dip temporarily"
    ],
    [
      "Harder in regulated careers",
      "Qualifications take years",
      "Family costs limit risk"
    ]
  ],
  "C20-T3-P1-Q1": [
    [
      "Yes, science museums",
      "Interactive exhibits felt exciting"
    ],
    [
      "Not particularly then",
      "Displays seemed too formal"
    ]
  ],
  "C20-T3-P1-Q2": [
    [
      "A small history museum",
      "Local stories are engaging"
    ],
    [
      "Yes, a modern gallery",
      "Exhibitions change monthly"
    ]
  ],
  "C20-T3-P1-Q3": [
    [
      "With one close friend",
      "We discuss each exhibit"
    ],
    [
      "Alone for art galleries",
      "I set my pace"
    ]
  ],
  "C20-T3-P1-Q4": [
    [
      "Yes, it adds context",
      "Local history becomes visible"
    ],
    [
      "Only if time allows",
      "Street life matters too"
    ]
  ],
  "C20-T3-P2": [
    [
      "My final design project",
      "Solved a real problem",
      "Tutor gave useful feedback"
    ],
    [
      "A detailed research report",
      "Needed for graduation",
      "Classmates checked my data"
    ]
  ],
  "C20-T3-P3-S1-Q1": [
    [
      "Career progress and income",
      "Comparison creates disappointment",
      "Goals feel delayed"
    ],
    [
      "Relationships and free time",
      "Busy lives reduce connection",
      "Loneliness can grow"
    ]
  ],
  "C20-T3-P3-S1-Q2": [
    [
      "Not always positive",
      "Unrealistic goals create pressure",
      "Present happiness gets ignored"
    ],
    [
      "Healthy ambition gives direction",
      "Progress builds confidence",
      "Purpose strengthens resilience"
    ]
  ],
  "C20-T3-P3-S1-Q3": [
    [
      "Supportive relationships",
      "People feel understood",
      "Stress becomes manageable"
    ],
    [
      "Meaningful work and rest",
      "Purpose needs balance",
      "Health remains protected"
    ]
  ],
  "C20-T3-P3-S2-Q1": [
    [
      "Good colleagues matter more",
      "Daily support reduces stress",
      "Work feels cooperative"
    ],
    [
      "Fair salary still matters",
      "Security protects home life",
      "Low pay causes resentment"
    ]
  ],
  "C20-T3-P3-S2-Q2": [
    [
      "Not regularly",
      "Deep skills take time",
      "Good workplaces still evolve"
    ],
    [
      "Change when growth stops",
      "New roles restore challenge",
      "Risk needs planning"
    ]
  ],
  "C20-T3-P3-S2-Q3": [
    [
      "Possible in most roles",
      "Autonomy creates ownership",
      "Purpose can be found"
    ],
    [
      "Some conditions prevent it",
      "Unsafe treatment destroys trust",
      "Management must improve"
    ]
  ],
  "C20-T4-P1-Q1": [
    [
      "Patient and dependable",
      "People can trust me"
    ],
    [
      "Curious and open-minded",
      "I enjoy learning constantly"
    ]
  ],
  "C20-T4-P1-Q2": [
    [
      "We are equally practical",
      "Problems stay manageable"
    ],
    [
      "My mother is calmer",
      "I react more quickly"
    ]
  ],
  "C20-T4-P1-Q3": [
    [
      "Honesty and reliability",
      "Trust grows over time"
    ],
    [
      "Warmth and good humour",
      "Time together feels easy"
    ]
  ],
  "C20-T4-P1-Q4": [
    [
      "Yes, I listen carefully",
      "Teams feel heard"
    ],
    [
      "Mostly, I stay decisive",
      "Pressure rarely freezes me"
    ]
  ],
  "C20-T4-P2": [
    [
      "A major transport strike",
      "Discussed with my colleagues",
      "Opinions differed on fairness"
    ],
    [
      "News about school closures",
      "Talked with my family",
      "We debated online learning"
    ]
  ],
  "C20-T4-P3-S1-Q1": [
    [
      "Mostly through phone apps",
      "Updates arrive instantly",
      "Notifications shape attention"
    ],
    [
      "Television remains important",
      "Older viewers trust presenters",
      "Stories receive more context"
    ]
  ],
  "C20-T4-P3-S1-Q2": [
    [
      "Local news feels immediate",
      "Events affect daily routines",
      "People recognise places"
    ],
    [
      "National news gets prominence",
      "Major decisions affect everyone",
      "Interest depends on impact"
    ]
  ],
  "C20-T4-P3-S1-Q3": [
    [
      "Very important",
      "Global events affect prices",
      "Countries depend on others"
    ],
    [
      "It builds wider perspective",
      "Foreign lives feel closer",
      "Prejudice may decrease"
    ]
  ],
  "C20-T4-P3-S2-Q1": [
    [
      "Ordinary voices feel relatable",
      "Viewers hear familiar concerns",
      "Debate feels inclusive"
    ],
    [
      "Live disagreement creates drama",
      "Outcomes remain unpredictable",
      "Audiences stay engaged"
    ]
  ],
  "C20-T4-P3-S2-Q2": [
    [
      "People with strong experiences",
      "Personal stories add evidence",
      "Others may feel represented"
    ],
    [
      "Confident community campaigners",
      "They want public change",
      "Media offers reach"
    ]
  ],
  "C20-T4-P3-S2-Q3": [
    [
      "Good when balanced",
      "Different viewpoints challenge assumptions",
      "Listeners think more carefully"
    ],
    [
      "Harmful when conflict dominates",
      "Extreme voices get attention",
      "Complex issues become simplified"
    ]
  ]
};
})();
