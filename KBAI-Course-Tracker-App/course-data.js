// Course-specific schedule and grading data.
// Reuse the tracker for another course by replacing WEEKS and GRADE_ITEMS.
const WEEKS=[
  {num:1,date:'May 18',title:'Setup week',sideBg:'#EEEDFE',
   deadlines:[{t:'Start-of-course survey',due:'May 25',cls:'dl-blue'},{t:'Syllabus comprehension quiz',due:'May 25',cls:'dl-blue'}],
   sections:[
    {label:'Must do',cat:'tip',tasks:['Read full ARC-AGI project overview','Download and run ARC starter code — confirm ArcDriver.py works','Watch lesson 01: Introduction to KBAI (45 min)','Watch lesson 02: Introduction to CS7637 (60 min)','Complete start-of-course survey (2 pts)','Complete syllabus comprehension quiz (2 pts)','Click the secret syllabus link — free 1.0 participation point']},
    {label:'ARC-AGI',cat:'arc',tasks:['Understand ArcProblem, ArcSet, ArcData structures from the overview','Manually solve 3–4 Training B problems as a human using the web viewer','Write notes on your human reasoning — becomes your Milestone A journal']},
    {label:'Do not do this week',cat:'exam',tasks:['Do NOT spend 5+ hrs building a perfect agent — Milestone A bar is just 1 correct answer']}
  ]},
  {num:2,date:'May 25',title:'Milestone A due',sideBg:'#EEEDFE',
   deadlines:[{t:'Milestone A code',due:'Jun 1 6:30pm',cls:'dl-red'},{t:'Milestone A journal',due:'Jun 1 6:30pm',cls:'dl-red'},{t:'Milestone A peer review',due:'Jun 1 7:30pm',cls:'dl-amber'}],
   sections:[
    {label:'Milestone A — code',cat:'arc',tasks:['Hard-code or randomly answer 1 Training B problem — just prove setup works','Submit to Gradescope Milestone A assignment','Activate your submission in Gradescope (do not leave it on default)']},
    {label:'Milestone A — journal (JDF ~5 pages)',cat:'arc',tasks:['Set up Overleaf with JDF template','Describe human reasoning on 3–4 ARC problems you solved manually','Explain your planned agent approach (transformation detection vs inference)','Discuss anticipated challenges in designing the agent','Export PDF, add Overleaf edit-share link in Canvas comment','Submit PDF to Canvas Milestone A assignment']},
    {label:'ARC coding — start Milestone B',cat:'arc',tasks:['Build first primitives: color counting, grid size detection, background detection','Explore Set B training patterns: rotation, reflection, color fills','Start your 5-line session log — write it after EVERY coding session from now']},
    {label:'Labs',cat:'lab',tasks:['Download Lab1.zip, open in Overleaf, read the .tex instructions (due Jun 8)']},
    {label:'Lectures',cat:'tip',tasks:['Watch lesson 03: Semantic Networks (60 min)','Watch lesson 04: Generate and Test (30 min)','Watch lesson 05: Means-Ends Analysis (60 min)']},
    {label:'Participation',cat:'part',tasks:['Peer review Milestone A within 4 days of Jun 1 = 1.5 pts each (up to 3 reviews)']}
  ]},
  {num:3,date:'Jun 1',title:'Lab 1 due',sideBg:'#E1F5EE',
   deadlines:[{t:'Lab 1: Jill Watson',due:'Jun 8 6:30pm',cls:'dl-green'},{t:'Lab 1 peer review',due:'Jun 8 7:30pm',cls:'dl-amber'}],
   sections:[
    {label:'Lab 1 — Jill Watson (6% of grade)',cat:'lab',tasks:['Complete Lab 1.tex activities in Overleaf — read .tex comments, not the PDF','Export PDF with Overleaf edit-share link in Canvas comment','Submit to Canvas Lab 1 assignment by Jun 8 — aim for Jun 6/7']},
    {label:'ARC — Milestone B progress',cat:'arc',tasks:['Target 8+ correct on Training B locally (minimum bar is 6, aim higher)','Add transforms: object extraction, bounding boxes, rotation, reflection','Test locally before Gradescope — only 40 submissions allowed total','Continue 5-line session log after every coding session']},
    {label:'Lectures',cat:'tip',tasks:['Watch lesson 06: Production Systems (60 min)','Watch lesson 07: Frames (45 min)']},
    {label:'Participation',cat:'part',tasks:['Peer review Milestone A if not done in Week 2 (1.0 pt within 7 days of Jun 1)']}
  ]},
  {num:4,date:'Jun 8',title:'Milestone B due',sideBg:'#EEEDFE',
   deadlines:[{t:'Milestone B code',due:'Jun 15 6:30pm',cls:'dl-red'},{t:'Milestone B journal',due:'Jun 15 6:30pm',cls:'dl-red'},{t:'Quarter-course survey',due:'Jun 15 6:30pm',cls:'dl-blue'},{t:'Milestone B peer review',due:'Jun 15 7:30pm',cls:'dl-amber'}],
   sections:[
    {label:'Milestone B — code',cat:'arc',tasks:['Submit agent to Gradescope — target 6+ Training B AND 6+ Test B for full credit','Activate your best submission in Gradescope (not just latest)']},
    {label:'Milestone B — journal',cat:'arc',tasks:['Describe how your agent currently works in detail','Report exact numbers: Training B X/16, Test B Y/16','What it succeeds on and why (not just which — explain how/why)','What it struggles on and why (explore the reason, not just list)','Efficiency analysis — runtime, Big O if possible','Improvement plan for final project submission','Set C generalization plan — what new patterns will you need?','Include Overleaf edit-share link, submit PDF to Canvas']},
    {label:'ARC — start Set C',cat:'arc',tasks:['Look at all 16 Set C training problems — categorise what new reasoning is needed','Plan Set C strategies: connected components, shape recognition, complex fills']},
    {label:'Labs',cat:'lab',tasks:['Download Lab2.zip (SAMI), open in Overleaf, read .tex (due Jun 22)']},
    {label:'Lectures',cat:'tip',tasks:['Watch lesson 08: Learning by Recording Cases (30 min)','Watch lesson 09: Case-Based Reasoning (60 min)']},
    {label:'Participation',cat:'part',tasks:['Complete quarter-course survey (2 pts)','Peer review Lab 1 within 4 days = 1.5 pts','Peer review Milestone B within 4 days = 1.5 pts']}
  ]},
  {num:5,date:'Jun 15',title:'Lab 2 + Honorlock setup',sideBg:'#E1F5EE',
   deadlines:[{t:'Lab 2: SAMI',due:'Jun 22 6:30pm',cls:'dl-green'},{t:'Lab 2 peer review',due:'Jun 22 7:30pm',cls:'dl-amber'}],
   sections:[
    {label:'Lab 2 — SAMI (6% of grade)',cat:'lab',tasks:['Complete Lab 2.tex activities in Overleaf','Export PDF with Overleaf edit-share link in Canvas comment','Submit to Canvas Lab 2 by Jun 22 — aim for Jun 20/21']},
    {label:'Exam 1 prep — start now, not later',cat:'exam',tasks:['Create your Exam 1 notes file (covers lessons 01–12)','Complete Honorlock onboarding exam — debug tech well before Exam 1','Confirm EdStem and Canvas Files load inside Honorlock']},
    {label:'ARC — Set C development',cat:'arc',tasks:['Build connected components detection — essential for many Set C problems','Continue iterating Set B/C agent and logging every session']},
    {label:'Lectures',cat:'tip',tasks:['Watch lesson 10: Incremental Concept Learning (60 min)','Watch lesson 11: Classification (45 min)']}
  ]},
  {num:6,date:'Jun 22',title:'Milestone C + Exam 1 — heaviest week',sideBg:'#FCEBEB',
   deadlines:[{t:'Milestone C code',due:'Jun 29 6:30pm',cls:'dl-red'},{t:'Milestone C journal',due:'Jun 29 6:30pm',cls:'dl-red'},{t:'Exam 1 (lessons 01–12)',due:'Jun 29 6:30pm',cls:'dl-red'},{t:'Milestone C peer review',due:'Jun 29 7:30pm',cls:'dl-amber'}],
   sections:[
    {label:'Stagger! Do NOT do Exam + Milestone on same day',cat:'exam',tasks:['Mon/Tue: finalize Exam 1 notes file','Wed/Thu: take Exam 1 (open-book, open-EdStem, 90 min, 22 questions)','Never leave an exam question blank — partial credit rewards any answer','Fri/Sat: submit Milestone C to Gradescope','Sun: write and submit Milestone C journal']},
    {label:'Milestone C — code',cat:'arc',tasks:['Target 6+ Training C + 6+ Test C for full performance credit','Activate your best submission in Gradescope']},
    {label:'Milestone C — journal',cat:'arc',tasks:['Same structure as Milestone B journal','Add Set D generalization section at the end','Include Overleaf edit-share link, submit PDF to Canvas by Jun 29']},
    {label:'Labs',cat:'lab',tasks:['Download Lab3.zip (VERA), open in Overleaf, read .tex (due Jul 6)']},
    {label:'Lectures',cat:'tip',tasks:['Watch lesson 12: Logic (90 min) — Exam 1 ends here','Watch lesson 13: Planning (75 min)','Watch lesson 14: Understanding (30 min)']},
    {label:'Participation',cat:'part',tasks:['Peer review Lab 2 within 4 days = 1.5 pts','Peer review Milestone C within 4 days = 1.5 pts']}
  ]},
  {num:7,date:'Jun 29',title:'Lab 3 + Set D begins',sideBg:'#E1F5EE',
   deadlines:[{t:'Lab 3: VERA',due:'Jul 6 6:30pm',cls:'dl-green'},{t:'Connect Four Basic',due:'Jul 2 6:30pm',cls:'dl-amber'},{t:'Lab 3 peer review',due:'Jul 6 7:30pm',cls:'dl-amber'}],
   sections:[
    {label:'Lab 3 — VERA (6% of grade)',cat:'lab',tasks:['Complete Lab 3.tex activities in Overleaf','Export PDF with Overleaf edit-share link','Submit to Canvas Lab 3 by Jul 6 — aim for Jul 4/5']},
    {label:'ARC — shift to Set D',cat:'arc',tasks:['Read all 16 Set D training problems — categorise new reasoning needed','Start preliminary Set D agent iteration','Revisit Set B/C problems still failing — fix for final project score','Begin mapping overall agent architecture: how does it decide which transform to apply?']},
    {label:'Lectures',cat:'tip',tasks:['Watch lesson 15: Commonsense Reasoning (60 min)','Watch lesson 16: Scripts (30 min)','Watch lesson 17: Explanation-Based Learning (45 min)']},
    {label:'Participation',cat:'part',tasks:['Peer review Milestone C within 7 days if not done (1.0 pt)','Forum post/comment if you have a genuine question or insight']}
  ]},
  {num:8,date:'Jul 6',title:'Milestone D due',sideBg:'#EEEDFE',
   deadlines:[{t:'Milestone D code',due:'Jul 13 6:30pm',cls:'dl-red'},{t:'Milestone D journal',due:'Jul 13 6:30pm',cls:'dl-red'},{t:'Connect Four Extended',due:'Jul 13 6:30pm',cls:'dl-amber'},{t:'Mid-course survey',due:'Jul 13 6:30pm',cls:'dl-blue'},{t:'Milestone D peer review',due:'Jul 13 7:30pm',cls:'dl-amber'}],
   sections:[
    {label:'Milestone D — code',cat:'arc',tasks:['Submit agent — target 6+ Training D + 6+ Test D for full performance credit','Activate your best submission in Gradescope']},
    {label:'Milestone D — journal',cat:'arc',tasks:['Describe agent function, performance numbers (Training D X/16, Test D Y/16)','Successes and why, struggles and why, efficiency analysis with specific metrics','Improvement plan aimed at final project (all 96 problems)','Include Overleaf edit-share link, submit PDF to Canvas by Jul 13']},
    {label:'Shift mindset to final project',cat:'arc',tasks:['Stop thinking per-milestone — start thinking: final agent covering all 96 problems','Begin outlining final report sections now — your session logs are the backbone','Map which problem types the agent handles vs fails — this IS the report structure']},
    {label:'Labs',cat:'lab',tasks:['Download Lab4.zip (Ivy), open in Overleaf, read .tex (due Jul 20)']},
    {label:'Lectures',cat:'tip',tasks:['Watch lesson 18: Analogical Reasoning (60 min)','Watch lesson 19: Version Spaces (60 min)']},
    {label:'Participation',cat:'part',tasks:['Complete mid-course survey (2 pts)','Peer review Lab 3 within 4 days = 1.5 pts','Peer review Milestone D within 4 days = 1.5 pts']}
  ]},
  {num:9,date:'Jul 13',title:'Lab 4 + final project sprint',sideBg:'#EEEDFE',
   deadlines:[{t:'Lab 4: Ivy',due:'Jul 20 6:30pm',cls:'dl-green'},{t:'Final project approaching',due:'Jul 27 6:30pm',cls:'dl-purple'},{t:'Lab 4 peer review',due:'Jul 20 7:30pm',cls:'dl-amber'}],
   sections:[
    {label:'Lab 4 — Ivy (6% of grade)',cat:'lab',tasks:['Complete Lab 4.tex activities in Overleaf','Export PDF with Overleaf edit-share link','Submit to Canvas Lab 4 by Jul 20 — aim for Jul 18/19']},
    {label:'ARC — main coding sprint',cat:'arc',tasks:['Consolidate agent across all three sets: B, C, and D','Submit early drafts to Final Project Gradescope — benchmark your all-96 score','Target 60+ correct out of 96 (each correct = 1 raw performance point of 50)','Fix Set B/C regressions — improving D often breaks earlier problems','Draft final report structure — use session logs as the development history section']},
    {label:'Lectures',cat:'tip',tasks:['Watch lesson 20: Constraint Propagation (45 min)','Watch lesson 21: Configuration (45 min)','Watch lesson 22: Diagnosis (45 min)']},
    {label:'Participation',cat:'part',tasks:['Peer review Milestone D if not done (1.0 pt within 7 days)']}
  ]},
  {num:10,date:'Jul 20',title:'Final ARC-AGI project due',sideBg:'#EEEDFE',
   deadlines:[{t:'Final ARC project code',due:'Jul 27 6:30pm',cls:'dl-purple'},{t:'Final ARC project report',due:'Jul 27 6:30pm',cls:'dl-purple'},{t:'Connect Four Multiplayer',due:'Jul 27 6:30pm',cls:'dl-amber'},{t:'Final project peer review',due:'Jul 27 7:30pm',cls:'dl-amber'}],
   sections:[
    {label:'Final project — code (50% of project grade)',cat:'arc',tasks:['Final Gradescope submission — activate your BEST submission before Jul 27 6:30pm','Do NOT leave it on Gradescope default (latest) — manually activate the one you want']},
    {label:'Final project — report (JDF up to 10 pages, 50% of project grade)',cat:'arc',tasks:['How agent works — thorough description worth 10 pts','Performance across all sets with specific numbers — worth 5 pts','3 successful problems with full reasoning — pick meaningfully different ones, worth 12 pts','2 failed problems with breakdown of where reasoning fails — worth 6 pts','Development history — your session logs become this section, worth 7 pts','Human vs agent comparison — full section, worth 10 pts, do NOT rush this','Include Overleaf edit-share link, submit PDF to Canvas Final Project']},
    {label:'Lectures',cat:'tip',tasks:['Watch lesson 23: Learning by Correcting Mistakes (45 min)','Watch lesson 24: Meta-Reasoning (30 min)','Watch lesson 25: Advanced Topics (60 min)']},
    {label:'Participation',cat:'part',tasks:['Peer review Final ARC project within 4 days = 1.5 pts']}
  ]},
  {num:11,date:'Jul 27',title:'Lab 5 + Exam 2',sideBg:'#FCEBEB',
   deadlines:[{t:'Lab 5: A4L',due:'Aug 3 6:30pm',cls:'dl-green'},{t:'Exam 2 (lessons 13–25)',due:'Aug 3 6:30pm',cls:'dl-red'},{t:'Connect Four Hidden Multiplayer',due:'Aug 3 6:30pm',cls:'dl-amber'},{t:'Lab 5 peer review',due:'Aug 3 7:30pm',cls:'dl-amber'}],
   sections:[
    {label:'Stagger again — do NOT stack on same day',cat:'exam',tasks:['Take Exam 2 before Friday — covers lessons 13–25, same open-book format as Exam 1','Your Exam 2 notes file should already exist from building it weekly — do not start from scratch','Never leave a question blank — 22 multi-correct, partial credit for every answer']},
    {label:'Lab 5 — A4L (6% of grade)',cat:'lab',tasks:['Download Lab5.zip, open in Overleaf, read .tex instructions carefully','Complete Lab 5.tex activities','Export PDF with Overleaf edit-share link','Submit to Canvas Lab 5 by Aug 3']},
    {label:'Lectures',cat:'tip',tasks:['Watch lesson 25a: Generative AI (120 min) — most relevant to your career goals, give this real attention']},
    {label:'Participation',cat:'part',tasks:['Peer review Final Project if not done (1.0 pt within 7 days)','Peer review Lab 5 within 4 days = 1.5 pts']}
  ]},
  {num:12,date:'Aug 3',title:'Wrap-up',sideBg:'#E1F5EE',
   deadlines:[{t:'End-of-course survey',due:'Aug 9 6:30pm',cls:'dl-blue'},{t:'CIOS survey',due:'Aug 9 6:30pm',cls:'dl-blue'}],
   sections:[
    {label:'Final tasks',cat:'tip',tasks:['Complete end-of-course survey (2 pts) — do this early in the week','Complete CIOS survey (2 pts)','Watch lesson 26: Wrap-Up (30 min)']},
    {label:'Career reflection',cat:'tip',tasks:['Map KBAI concepts to your AI engineer interview narrative','ARC-AGI agent design, case-based reasoning, constraint propagation, meta-reasoning — all articulable as AI system design experience','Lesson 25a (Generative AI) content is directly usable in job conversations']}
  ]}
];

const GRADE_ITEMS=[
  {id:'lab1',name:'Lab 1: Jill Watson',weight:6,max:100},
  {id:'lab2',name:'Lab 2: SAMI',weight:6,max:100},
  {id:'lab3',name:'Lab 3: VERA',weight:6,max:100},
  {id:'lab4',name:'Lab 4: Ivy',weight:6,max:100},
  {id:'lab5',name:'Lab 5: A4L',weight:6,max:100},
  {id:'milA',name:'Milestone A',weight:4,max:10},
  {id:'milB',name:'Milestone B',weight:4,max:10},
  {id:'milC',name:'Milestone C',weight:4,max:10},
  {id:'milD',name:'Milestone D',weight:4,max:10},
  {id:'arcFinal',name:'Final ARC project',weight:20,max:100},
  {id:'exam1',name:'Exam 1',weight:10,max:110},
  {id:'exam2',name:'Exam 2',weight:10,max:110},
  {id:'part',name:'Participation',weight:10,max:90}
];
