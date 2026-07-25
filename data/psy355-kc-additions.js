// Numeracy strand Knowledge Check additions ("read the numbers")
// Authored 2026-07-25. Every numeric claim below is grounded in the named
// on-disk corpus file at the cited line; no statistic is invented.
// Item shape matches each course's existing KC bank ({q, options, answer,
// why, diff}) plus skill:'numeracy' and whyWrong (array aligned with
// options, null at the correct index).
window.NUMERACY_ADDITIONS = {
  BFS218: {
    // Corpus: BFS218/Asynchronous/_app/data/corpus-data.js
    "5": [
      {
        // Grounding: corpus-data.js line 360 (buolamwini2018 abstract): "error rates up to 34.7 percent, while the maximum error for lighter-skinned men was 0.8 percent"; three commercial systems tested.
        "q": "Gender Shades reports error rates of up to 34.7 percent for darker-skinned women, while the maximum error for lighter-skinned men was 0.8 percent. What does the phrase up to tell you about the 34.7 percent figure?",
        "options": [
          "It is the average error rate across every face in the benchmark",
          "It is the highest error rate observed for that group across the three systems tested, not the rate every system produced",
          "It means the true error rate is unknown, so you can set the figure aside",
          "It shows that every commercial system misclassified darker-skinned women 34.7 percent of the time"
        ],
        "answer": 1,
        "why": "Reading qualifiers is part of reading the numbers. The audit tested three commercial systems, and 34.7 percent is the worst observed error for darker-skinned women, just as 0.8 percent is the worst observed for lighter-skinned men. The qualifier limits the claim without weakening the disparity it measures.",
        "whyWrong": [
          "The 34.7 percent figure describes one group at the high end across systems, not an average over the whole benchmark.",
          null,
          "A maximum is still a measured number from a real audit. A qualifier bounds a claim; it does not erase it.",
          "Up to marks a ceiling across the systems tested; the study reports disparities that varied from system to system."
        ],
        "skill": "numeracy",
        "diff": 2
      },
      {
        // Grounding: corpus-data.js line 363 (buolamwini2018 sample): "1,270 unique faces ... balanced across the study's gender and skin-type categories"; line 360: aggregate or single-axis results can conceal the disparity.
        "q": "Buolamwini and Gebru built their own benchmark of 1,270 faces balanced across gender and skin type before testing the systems. Why does that balance matter when you read any overall accuracy number?",
        "options": [
          "A balanced benchmark guarantees every system will perform equally well on every group",
          "Balance matters only for training data, never for test data",
          "If one group dominates a test set, overall accuracy mostly reflects performance on that group and can hide high error rates for smaller groups",
          "A benchmark of 1,270 faces is too small to reveal anything about accuracy"
        ],
        "answer": 2,
        "why": "An aggregate accuracy score is a weighted average of group scores. Balancing the benchmark stops the largest group from swamping the number, which is exactly how the study exposed a gap that aggregate and single-axis results conceal.",
        "whyWrong": [
          "Balance changes what the test can reveal, not how the systems perform. The systems still failed some groups far more than others.",
          "The study shows the opposite: the composition of the test set decides whose errors an accuracy number can even register.",
          null,
          "The audit measured large, consistent disparities on this benchmark. Size alone does not decide whether a test is informative; design does."
        ],
        "skill": "numeracy",
        "diff": 3
      },
      {
        // Grounding: corpus-data.js line 389 (koenecke2020 abstract): "average word error rate was 0.35 for Black speakers and 0.19 for white speakers. The disparity remained in a subset of 206 identical short phrases"; authors could not inspect proprietary training data.
        "q": "Koenecke and colleagues found average word error rates of 0.35 for Black speakers and 0.19 for white speakers across five commercial systems, and the disparity remained in a subset of 206 identical short phrases. What does the identical-phrases result add?",
        "options": [
          "It proves the training data caused the gap",
          "It shows the gap disappears once the content of speech is controlled",
          "It shows 206 phrases is enough to settle the question for every dialect and system",
          "It weakens the explanation that speakers simply said different words, because the gap persisted when the words were the same"
        ],
        "answer": 3,
        "why": "Matched comparisons are a design tool. Holding the words constant rules out vocabulary differences as the whole story and points toward how the systems process the speech itself. That is how you test a rival explanation with numbers instead of arguing about it.",
        "whyWrong": [
          "The error analysis pointed to poorer acoustic-model performance, and the authors could not inspect the proprietary training data, so cause stays unproven.",
          "The abstract says the opposite: the disparity remained on the identical phrases.",
          "The study itself limits its findings to the systems, corpora, and groups tested; a matched subset strengthens one comparison, not every generalization.",
          null
        ],
        "skill": "numeracy",
        "diff": 3
      }
    ],
    "6": [
      {
        // Grounding: corpus-data.js lines 487-491 (robertson2020): "the factual record was incomplete and ... widespread use did not appear established at the time of writing"; no deployment prevalence number appears in the corpus, so this item teaches the method concept.
        "q": "Robertson, Khoo, and Song analysed Canadian examples and possible uses of algorithmic policing while stating that the factual record was incomplete and widespread use did not appear established. A headline citing the report says algorithmic policing is now widespread in Canada. What is wrong with the headline?",
        "options": [
          "The report documents examples and possible uses and explicitly declines to establish prevalence, so the headline asserts a fact the source withholds",
          "The report is too old to cite for any claim",
          "Nothing, because documented examples imply widespread use",
          "Human-rights reports always measure prevalence, so the headline must be accurate"
        ],
        "answer": 0,
        "why": "Reading the numbers includes noticing when a source refuses to give one. The authors said their factual record was incomplete; a claim about how widespread a practice is needs a measurement of prevalence, and this report tells you it does not have one.",
        "whyWrong": [
          null,
          "Age is not the problem. The report can still support what it actually claims: examples, possible uses, and human-rights risks.",
          "Examples show existence, not extent. Counting some cases is not the same as measuring how common a practice is.",
          "This report is a legal and policy analysis, and it says directly that widespread use was not established."
        ],
        "skill": "numeracy",
        "diff": 2
      },
      {
        // Grounding: corpus-data.js line 423 (opc2021 sample): "hundreds of searches of a database compiled from images scraped without consent"; line 424: findings do not establish that every Canadian police service used the same tool; line 120 (relationship text): "Keep prevalence, possible use, documented use, and a legal finding separate."
        "q": "The Privacy Commissioner's investigation examined the RCMP's use of Clearview AI, including hundreds of searches of a database compiled from images scraped without consent. What can that hundreds of searches figure support, and what can it not?",
        "options": [
          "It proves every Canadian police service ran a similar number of searches",
          "It shows the scale of one documented case; it cannot tell you how often facial recognition is used across Canadian policing",
          "It is a survey-based estimate of national police usage",
          "It is too vague to tell you anything about the RCMP case"
        ],
        "answer": 1,
        "why": "A count from a single investigated case measures that case. The course pairing puts it plainly: keep prevalence, possible use, documented use, and a legal finding separate. One well-documented case can anchor a legal conclusion without becoming a national usage rate.",
        "whyWrong": [
          "The report's findings concern the RCMP and Clearview AI; it does not establish that other services did the same.",
          null,
          "The figure comes from a federal privacy investigation of one force, not from a survey designed to estimate national usage.",
          "It is precise enough to matter: it establishes real, repeated use within the documented case."
        ],
        "skill": "numeracy",
        "diff": 2
      },
      {
        // Grounding: corpus-data.js line 555 (nagra2016 sample): "50 self-identified Muslim participants aged 18 to 31 in Toronto or Vancouver ... 24 men and 26 women, recruited through networks, snowball sampling, and student organizations"; line 556: does not estimate national prevalence.
        "q": "Nagra and Maurutto interviewed 50 young Canadian Muslims, 24 men and 26 women aged 18 to 31 in Toronto or Vancouver, recruited partly through snowball sampling. What kind of claim can this design support?",
        "options": [
          "A national percentage of young Muslims who experience extra security screening",
          "A causal estimate of how much surveillance changes behaviour",
          "A rich account of what these participants experienced and how they responded, without estimating how common those experiences are nationally",
          "None, because 50 people is too few for real research"
        ],
        "answer": 2,
        "why": "Sample size and recruitment set a claim's reach. Interviews with a snowball-recruited group in two cities document experience in depth, which is what the design is for. Estimating prevalence would need a sample built to represent the national population.",
        "whyWrong": [
          "Percentages generalize only from samples designed to represent a population; snowball recruitment in two cities is not that design.",
          "The study is qualitative and observational; it documents reported experiences, not measured causal effects.",
          null,
          "Fifty in-depth interviews is a substantial qualitative sample. The number is only a problem if you demand statistics the design never promised."
        ],
        "skill": "numeracy",
        "diff": 3
      }
    ],
    "10": [
      {
        // Grounding: corpus-data.js line 682 (bird2023 sample): "5,168,903 student-course observations for the course-completion model"; line 679: "the available administrative data predicted outcomes less accurately for Black students".
        "q": "Bird, Castleman, and Song's course-completion model was built on 5,168,903 student-course observations, yet the predictions were still less accurate for Black students. What does this show about sample size?",
        "options": [
          "A sample this large removes bias automatically",
          "The sample must actually have been much smaller than reported",
          "Accuracy differences across groups cannot be measured at this scale",
          "A large sample makes estimates more stable, but it cannot fix data that predict outcomes less accurately for one group"
        ],
        "answer": 3,
        "why": "More data shrinks random error, not systematic error. If the available administrative data carry less predictive signal for one group, millions of observations will reproduce that gap precisely rather than remove it. Big numbers earn trust in stability, not in fairness.",
        "whyWrong": [
          "The study is a direct counterexample: an enormous sample and a persistent racial accuracy gap at the same time.",
          "The corpus reports the sample exactly; the lesson is about what size can and cannot buy, not about the count.",
          "The researchers did measure group-level accuracy differences at this scale; that measurement is the finding.",
          null
        ],
        "skill": "numeracy",
        "diff": 2
      },
      {
        // Grounding: corpus-data.js line 679 (bird2023 abstract): "At some risk thresholds, Black students near the cut-off would be less likely than otherwise similar white students to be classified as at risk and receive support. The size of the disparity changed with the outcome and threshold"; line 930 (term "Bias in Predicting Success").
        "q": "In the simulations, the size of the racial disparity changed with the outcome being predicted and the risk threshold chosen. Why does that mean an equity audit must examine the decision rule, not only the model's overall accuracy?",
        "options": [
          "Because the harm appears at the cut-off: at some thresholds, Black students near it would be less likely than otherwise similar white students to be flagged for support, and an overall accuracy number never shows that",
          "Because overall accuracy is impossible to compute for large models",
          "Because thresholds only matter when a model is inaccurate for everyone",
          "Because changing the threshold changes the model's training data"
        ],
        "answer": 0,
        "why": "A model becomes a decision when someone picks a threshold, and the study shows the disparity moves as the outcome and threshold move. Reading the numbers here means asking what happens to the people near the line, not settling for one headline accuracy figure.",
        "whyWrong": [
          null,
          "Overall accuracy is routinely computed; the problem is what it hides, not whether it exists.",
          "The disparity arose partly because the data predicted outcomes less accurately for one group, not for everyone, and it shifted as the threshold moved.",
          "The threshold changes who gets classified as at risk and helped; it does not alter the data the model was trained on."
        ],
        "skill": "numeracy",
        "diff": 3
      },
      {
        // Grounding: corpus-data.js line 681 (bird2023 evidenceType): "Predictive-modelling audit and simulated resource-allocation study"; line 683 (evidenceLimit): "the study does not show the effect of an implemented support program".
        "q": "Bird, Castleman, and Song simulated what would happen if institutions used the predictions to target student support. What claim does that evidence type support?",
        "options": [
          "That the support programs colleges ran using these models failed",
          "How support would be distributed under a given model and threshold, not what an implemented support program would do for student outcomes",
          "That prediction models should never be used in education",
          "The exact number of students a real program would help"
        ],
        "answer": 1,
        "why": "A simulation projects allocation: who would be flagged and who would be missed under a rule. It measures the distribution of help, not the effect of help. Claims about improved outcomes need a study of an implemented program, which this is not.",
        "whyWrong": [
          "No implemented program was evaluated; the allocations are simulated, so no program's success or failure is measured.",
          null,
          "The study argues for auditing the decision rule; it recommends scrutiny, and a ban is a policy stance the evidence does not itself establish.",
          "Exact counts for a real program would require running the program; a simulation gives conditional projections, not outcomes."
        ],
        "skill": "numeracy",
        "diff": 3
      }
    ]
  },
  SOC122: {
    // Corpus: SOC122/_app/data/corpus-data.js
    // Week 5 carries no study statistics in the corpus, so all three items
    // teach the method concepts (sampling, design, measurement) as directed.
    "5": [
      {
        // Grounding: corpus-data.js line 1082 (term "Quantitative Method"): "it can show how widely something occurs and how variables relate at scale"; line 391 (soc-research abstract): testable hypothesis and chosen research design.
        "q": "OpenStax describes quantitative research as finding patterns across many cases, showing how widely something occurs and how variables relate at scale. A survey finds that two social variables rise and fall together. What extra step would a causal claim need?",
        "options": [
          "A larger survey, because more cases turn a pattern into a cause",
          "Nothing, because variables that move together must be causing each other",
          "A design built to test cause, because a pattern across many cases shows the variables are related, not which one moves the other or whether something else moves both",
          "A switch to qualitative interviews, which always settle causal questions"
        ],
        "answer": 2,
        "why": "Relation at scale is a real finding, but it is silent about direction and about third factors. The chapter's point is that the research design, not the size of the pattern, determines what kind of claim you can defend.",
        "whyWrong": [
          "Scaling up a survey gives you a more precise association; it does not tell you what causes what.",
          "Moving together is consistent with either variable driving the other, or with something else driving both.",
          null,
          "Interviews add depth and meaning; they are a different tool, not a shortcut to causal proof."
        ],
        "skill": "numeracy",
        "diff": 2
      },
      {
        // Grounding: corpus-data.js line 1082 (term "Quantitative Method"): "a number records what was counted and is silent about what was left out, which is why researchers pair it with careful interpretation".
        "q": "The Week 5 glossary says a number records what was counted and is silent about what was left out. When a statistic about social life reaches you, what first question does this point you toward?",
        "options": [
          "Whether the number is large enough to be impressive",
          "What was measured and who was included, because the choices behind the figure decide what it can honestly say",
          "Whether the number confirms what you already believed",
          "Whether the source used a computer to calculate it"
        ],
        "answer": 1,
        "why": "Every statistic is built from decisions: what counts, who is in the sample, what gets ignored. Reading the number means reading those decisions first, which is why the glossary pairs measurement with careful interpretation.",
        "whyWrong": [
          "Size tells you nothing until you know what was counted; a big number built on a narrow count can mislead.",
          null,
          "Checking a number against your prior beliefs tests you, not the number.",
          "How the arithmetic was done matters far less than what was defined, counted, and left out."
        ],
        "skill": "numeracy",
        "diff": 1
      },
      {
        // Grounding: corpus-data.js line 1088 (term "Qualitative Method"): "It usually works with fewer cases than quantitative research, trading breadth for the close, contextual understanding that numbers alone cannot provide"; line 1082 (strength of breadth).
        "q": "A classmate dismisses an interview study because it involved far fewer people than a big survey. Based on the Week 5 material, what is wrong with judging the study by sample size alone?",
        "options": [
          "Nothing, because larger samples always make a study better",
          "Interview studies secretly use large samples too",
          "Sample size only matters in psychology, not sociology",
          "Qualitative research deliberately trades breadth for depth, so a small number of cases is a design choice for understanding meaning, not a failed attempt at a survey"
        ],
        "answer": 3,
        "why": "Each method buys something different. Quantitative breadth shows how widely something occurs; qualitative depth shows how people make sense of their lives in their own terms. Judging one method by the other's yardstick misreads what the design is for.",
        "whyWrong": [
          "Bigger is better only for the questions surveys answer; depth questions need time with fewer people.",
          "The glossary is explicit that qualitative work usually involves fewer cases; that is its trade, not its flaw.",
          "The breadth-versus-depth trade applies across the social sciences, including this course's three disciplines.",
          null
        ],
        "skill": "numeracy",
        "diff": 2
      }
    ]
  },
  PSY355: {
    // Corpus: PSY355/_app/data/corpus-data.js
    "3": [
      {
        // Grounding: corpus-data.js line 473 (yeager2019 abstract): "randomized national study of 12,490 ninth-grade students in 65 regular United States public high schools"; line 475 (evidenceType): "Individually randomized national field experiment".
        "q": "Yeager and colleagues studied 12,490 ninth-grade students in 65 United States public high schools. What feature of the study, more than its size, lets it support a causal claim about the intervention?",
        "options": [
          "Random assignment, because comparing randomized groups isolates the intervention; a huge sample without randomization would still show only associations",
          "The number of schools, because 65 is a round enough figure",
          "The fact that it was published in a major journal",
          "The size itself, because any study over ten thousand students proves causation"
        ],
        "answer": 0,
        "why": "Size buys precision; randomization buys causal logic. Because students were randomly assigned, the groups differ only by chance plus the intervention, so a difference in outcomes can be attributed to the intervention. That is the design doing the work, not the headcount.",
        "whyWrong": [
          null,
          "The number of schools helps the results travel across contexts; it does not create causal leverage by itself.",
          "Where a study appears says nothing about whether its design can separate cause from association.",
          "An observational study of a million students would still leave direction and third factors unresolved."
        ],
        "skill": "numeracy",
        "diff": 2
      },
      {
        // Grounding: corpus-data.js line 473 (yeager2019 abstract): "a small improvement in core-course GPA among lower-achieving students and increased advanced-mathematics enrolment overall. The grade effect varied with school peer norms"; line 477 (evidenceLimit): effects were small and context-dependent.
        "q": "A headline says growth mindset boosts student achievement. The national experiment actually found a small improvement in core-course GPA among lower-achieving students, increased advanced-mathematics enrolment, and a grade effect that varied with school peer norms. What did the headline drop?",
        "options": [
          "Nothing important, because the headline captures the main result",
          "Only the year the study was published",
          "The size, the subgroup, and the context: the effect was small, concentrated among lower-achieving students, and depended on peer norms",
          "The names of the researchers who ran the study"
        ],
        "answer": 2,
        "why": "Reading the numbers means keeping three questions attached to every effect: how big, for whom, and under what conditions. The study answers all three carefully, and the headline discards all three, which is how a bounded finding becomes an inflated promise.",
        "whyWrong": [
          "A boost for everyone and a small effect for a subgroup under certain peer norms are very different claims.",
          "The missing pieces are the qualifiers that define the finding, not publication details.",
          null,
          "Author names matter for credit and follow-up, but they are not what separates the finding from the headline."
        ],
        "skill": "numeracy",
        "diff": 2
      },
      {
        // Grounding: corpus-data.js line 501 (claro2016 abstract): observational analysis of Chile's national tenth-grade data, association across income levels; line 505 (evidenceLimit): "the observational design does not show that mindset caused achievement"; contrast with line 475 (yeager2019 randomized).
        "q": "Claro, Paunesku, and Dweck analysed Chile's national tenth-grade data and found growth mindset associated with achievement across income levels. Why can Yeager's study support a causal claim while this one cannot?",
        "options": [
          "Because Yeager's sample was American and Claro's was Chilean",
          "Because Yeager's study randomly assigned an intervention while Claro's was observational; national coverage makes an association well measured, not causal",
          "Because Claro's dataset was too small to trust",
          "Because associations become causal once a dataset covers a whole country"
        ],
        "answer": 1,
        "why": "The two studies differ in design, not just place. Observational data, however complete, record mindset and achievement as they happen to occur together. Only the experiment manipulates one variable and watches what follows, which is what a causal verb requires.",
        "whyWrong": [
          "Nationality has nothing to do with causal logic; design does.",
          null,
          "A national dataset is very large; the limit is that nothing was manipulated, so direction and third factors stay open.",
          "Coverage improves precision and generalizability of the association; it cannot convert correlation into causation."
        ],
        "skill": "numeracy",
        "diff": 3
      }
    ],
    "8": [
      {
        // Grounding: corpus-data.js line 757 (stephenson2018 abstract): "cross-sectional study examined questionnaire responses from 184 university students"; line 760 (sample): "measured at one time point"; line 761 (evidenceLimit): cannot establish causal direction.
        "q": "Stephenson and colleagues measured 184 university students at one time point and found self-compassion associated with lower irrationality and better mental-health indicators. Why can the study not tell you which factor influences which?",
        "options": [
          "Because 184 students is far too few to compute an association",
          "Because questionnaires can never measure anything real",
          "Because the students were not paid to participate",
          "Because everything was measured once: with no time order and no intervention, the data cannot separate self-compassion lowering distress from distress lowering self-compassion, or a third factor moving both"
        ],
        "answer": 3,
        "why": "Cross-sectional means one snapshot. A snapshot can show that two things sit together, but cause needs sequence or manipulation, and this design has neither. The sample size is not the limit; the single time point is.",
        "whyWrong": [
          "The study did compute associations from this sample; size affects precision, not the direction problem.",
          "Questionnaires measure self-report with known limits, but the causal gap here comes from the design, not the instrument.",
          "Payment has nothing to do with whether a design can order cause and effect.",
          null
        ],
        "skill": "numeracy",
        "diff": 2
      },
      {
        // Grounding: corpus-data.js line 757 (stephenson2018 abstract): "the correlational design cannot establish that irrational beliefs cause distress or that self-compassion changes it"; line 761 (evidenceLimit): no intervention effect.
        "q": "Citing the same 184-student study, a wellness program claims that teaching self-compassion will reduce students' anxiety. What is the gap between the evidence and the claim?",
        "options": [
          "The study reports associations in questionnaire data; it delivered no self-compassion training, so it cannot estimate what changing self-compassion would do",
          "The study was about professors, not students",
          "There is no gap, because an association is enough to justify any program",
          "The study proved self-compassion does not affect anxiety"
        ],
        "answer": 0,
        "why": "An association describes people as they already are. A program claim is a prediction about what happens when you intervene, and that prediction needs intervention evidence. The corpus states the design cannot establish that self-compassion changes distress.",
        "whyWrong": [
          null,
          "The participants were 184 university students; the gap is about design, not population.",
          "Associations can motivate a program worth testing, but they cannot certify the effect the program advertises.",
          "Absence of causal evidence is not evidence of no effect; the study simply cannot answer the intervention question either way."
        ],
        "skill": "numeracy",
        "diff": 3
      },
      {
        // Grounding: corpus-data.js lines 730-734 (neff2003): "Neff's conceptual article defines self-compassion through self-kindness, common humanity, and mindfulness"; sample: "No intervention sample"; evidenceLimit: does not test whether a compassionate sentence changes outcomes.
        "q": "Neff's 2003 article defines self-compassion through self-kindness, common humanity, and mindfulness, and it has no intervention sample. What does that tell you about the numbers you could expect from it?",
        "options": [
          "It reports precise effect sizes for self-compassion exercises",
          "It can define the construct and propose research questions, but it cannot supply effect sizes or outcome rates because it tested nothing",
          "It secretly contains a large clinical trial",
          "Its lack of data makes the concept of self-compassion meaningless"
        ],
        "answer": 1,
        "why": "Evidence types set what numbers can exist. A conceptual article builds the idea that later studies measure. That is why the course treats exercises based on Neff's model as applications rather than tested interventions: the founding paper offers a definition, not a result.",
        "whyWrong": [
          "There is no sample and no intervention, so there is nothing to compute an effect size from.",
          null,
          "The corpus records no trial; the article defines self-compassion and proposes relationships for future research.",
          "Concepts are where measurement starts. A construct paper without data is early, not empty."
        ],
        "skill": "numeracy",
        "diff": 2
      }
    ],
    "9": [
      {
        // Grounding: corpus-data.js line 785 (nas2025 abstract): "questionnaire data from 305 academics in Türkiye ... A structural-equation model was consistent with indirect statistical paths"; line 789 (evidenceLimit): "cannot establish mediation over time or causal effects".
        "q": "Nas and colleagues' structural-equation model was consistent with indirect paths linking perseverance to life satisfaction through self-compassion and psychological flexibility, using data from 305 academics measured once. What does consistent with mean here?",
        "options": [
          "The model was proven correct beyond doubt",
          "The researchers were unsure whether they collected any data",
          "The data fit the proposed statistical model, but one-time-point measurement means the paths remain associations that cannot establish mediation over time or causal effects",
          "The paths were observed unfolding across several years"
        ],
        "answer": 2,
        "why": "Consistent with is a precise, modest phrase: the pattern in the data does not contradict the proposed paths. It is weaker than demonstrates and far weaker than causes, and noticing that difference is exactly what reading a statistics-heavy abstract requires.",
        "whyWrong": [
          "Fit is compatibility, not proof; the corpus states the paths remain associations.",
          "The data are real: 305 academics completed the questionnaires. The caution is about inference, not existence.",
          null,
          "All variables were measured at one time, so no unfolding over time was observed."
        ],
        "skill": "numeracy",
        "diff": 3
      },
      {
        // Grounding: corpus-data.js line 788 (nas2025 sample): "305 academics in Türkiye measured at one time point"; line 786 (coreIdea): "In this sample of academics".
        "q": "The sample in Nas and colleagues' study was 305 academics in Türkiye. Before applying the findings to a different group, such as college students, what should you check first?",
        "options": [
          "Whether 305 is divisible by the number of variables",
          "Whether academics are more intelligent than students",
          "Whether the study used a computer for the statistics",
          "Whether the relationships hold beyond this occupational and national group, because a finding describes the sample studied and travelling to other groups is a separate claim needing its own evidence"
        ],
        "answer": 3,
        "why": "Every statistic carries its sample with it. The corpus phrases the core idea carefully as in this sample of academics, and that wording is the boundary: work life, career stage, and setting all differ for students, so transfer is a hypothesis, not a given.",
        "whyWrong": [
          "Divisibility is numerology, not methodology; the meaningful question is who the 305 people were.",
          "Group comparisons of ability are irrelevant; the issue is whether relationships measured in one population appear in another.",
          "The software does not change whose lives the data describe.",
          null
        ],
        "skill": "numeracy",
        "diff": 2
      },
      {
        // Grounding: corpus-data.js line 785 (nas2025 abstract): "Perseverance, self-compassion, psychological flexibility, and life satisfaction were positively associated"; line 786 (coreIdea): "positively related ... not proof of causation".
        "q": "A summary of the study says perseverance leads to life satisfaction among academics. The study reports that the two were positively associated. Why is the verb swap a problem?",
        "options": [
          "Leads to asserts cause and direction, while the cross-sectional data support only that the variables moved together, so the summary claims more than the study measured",
          "Associated is a spelling error for leads to",
          "The two phrases mean exactly the same thing in research writing",
          "The problem is style, since shorter verbs are always less accurate"
        ],
        "answer": 0,
        "why": "Verbs are where causal claims hide. Associated, related, and linked describe co-occurrence; leads to, boosts, and causes describe influence. Swapping one family for the other quietly upgrades the evidence, and catching that upgrade is a core numeracy habit.",
        "whyWrong": [
          null,
          "Both phrases are real research language; they simply make different claims.",
          "Research writing keeps them distinct on purpose: one reports a pattern, the other a mechanism.",
          "Length is irrelevant; precision about what the design can support is what matters."
        ],
        "skill": "numeracy",
        "diff": 2
      }
    ]
  }
};

(function () {
  var KB = window.PSY355_KC = window.PSY355_KC || {};
  var src = window.NUMERACY_ADDITIONS && window.NUMERACY_ADDITIONS.PSY355;
  if (src) Object.keys(src).forEach(function (w) { KB[w] = (KB[w] || []).concat(src[w]); });
})();
