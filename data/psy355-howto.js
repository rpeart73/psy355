/* PSY355 per-page how-to registry (2026-07-25). Every screen carries its own
   "How to use this page" panel so students can teach themselves each surface.
   tour.file is the chaptered video tour; each page's clip value is a
   media-fragment time range inside that one file. Plain language, no dashes. */
window.PSY355_HOWTO = {
 "tour": {
  "file": "videos/howto-tour.mp4",
  "note": "Silent screen tour with on-screen captions."
 },
 "byScreen": {
  "journey": {
   "title": "How to use your home page",
   "intro": "This page is your course map. Every week is a station on one journey, and everything else on the site hangs off this page.",
   "steps": [
    {
     "do": "Find the current week.",
     "detail": "The highlighted station is where the course is right now. Click any station to open that week's page."
    },
    {
     "do": "Read the station badge before you click.",
     "detail": "Each station shows how that week runs, for example how many readings it carries or that it is a focus week with no new material."
    },
    {
     "do": "Use the Study Compass.",
     "detail": "The compass box suggests what to do next based on what you have already visited on this device. It is a suggestion, never a requirement."
    },
    {
     "do": "Search when you know what you want.",
     "detail": "The search box finds readings, concepts, and scholars across the whole course, so you do not have to remember which week something lives in."
    },
    {
     "do": "Pick your program lens if you want one.",
     "detail": "The Viewing as chip personalizes examples to your field of study. The course content stays the same for everyone; only the framing changes. You can turn it off any time."
    }
   ],
   "saves": "Your visited weeks, compass activity, and program lens choice are saved only in this browser on this device. Nothing is sent anywhere.",
   "graded": "Nothing on this page is graded or reported to your professor.",
   "next": "Open the current week's station and start with its Before you begin section.",
   "clip": "4,18"
  },
  "station": {
   "title": "How to use a week page",
   "intro": "Each week page is a complete module: what to read, what the ideas mean, and ways to check yourself. The page opens as a folded map so you can see its shape first.",
   "steps": [
    {
     "do": "Start with the hero card.",
     "detail": "It names the week's question, how the week runs, and a Start button that takes you to the right first section."
    },
    {
     "do": "Open sections one at a time.",
     "detail": "Each heading has an open and close control. Expand all and Collapse all live at the top. The page remembers what you left open on this device."
    },
    {
     "do": "Rate the ideas in Before you begin.",
     "detail": "This is a no-grade snapshot of where your understanding sits. You will rate the same ideas again at the end of the week to see how far you moved."
    },
    {
     "do": "Work the readings from the Readings section.",
     "detail": "Each reading names where to get it, usually Blackboard or open access, and what part to focus on. The site never hosts the reading itself."
    },
    {
     "do": "Use the Study Guide before the Knowledge Check.",
     "detail": "The Study Guide is rehearsal: flip cards from earlier weeks, explain ideas back in your own words, and climb the question ladder. Then take the Knowledge Check."
    },
    {
     "do": "Take the Knowledge Check with honest confidence.",
     "detail": "Answer, mark how sure you were, then reveal. The report sorts ideas into mastered, fragile, and confident misses. Confident misses are the most valuable thing to review."
    },
    {
     "do": "Close with the reflection and Generate Your Weekly Notes.",
     "detail": "Type your reflection, then generate the Word file. It collects your week into one organized record on Seneca letterhead."
    }
   ],
   "saves": "Your ratings, quiz history, reflections, and open sections are saved only in this browser on this device.",
   "graded": "Every check on this page is practice. None of it is scored, recorded, or visible to your professor.",
   "next": "When the week feels solid, return Home and open the next station.",
   "clip": "18,32"
  },
  "site": {
   "title": "How to use this page",
   "intro": "This page explains how the whole site works. The panel you are reading now appears on every page, always tuned to that page.",
   "steps": [
    {
     "do": "Skim the cards in order.",
     "detail": "They cover how weeks run, where your work is saved, and what to do when you are stuck."
    },
    {
     "do": "Look for the How to use this page bar anywhere you go.",
     "detail": "Every page carries its own version of this panel with steps for that page. Open it whenever a page feels unfamiliar."
    },
    {
     "do": "Watch a page's video tour when reading is not enough.",
     "detail": "The video plays a silent captioned tour of the page you are on."
    },
    {
     "do": "Back up your saved work.",
     "detail": "The Take your saved work with you box on this page downloads everything you have typed and rated as one file, and restores it on any device. The accessibility statement lives here too."
    }
   ],
   "saves": "Everything you type or rate on this site stays in this browser on this device. Clear My Work wipes it.",
   "graded": "Nothing on this site is graded. Blackboard is the only official gradebook.",
   "next": "Head back Home and open the current week.",
   "clip": "32,45"
  },
  "pathways": {
   "title": "How to use Course Rhythm",
   "intro": "This page shows the shape of the whole term at once, so no week ever surprises you.",
   "steps": [
    {
     "do": "Read the rhythm row for each stretch of weeks.",
     "detail": "It shows which weeks meet live, which are independent, and where Study Week and the final project weeks sit."
    },
    {
     "do": "Note the weeks that change mode.",
     "detail": "Independent weeks carry an instructor update instead of a lecture. The week page always names its own mode at the top."
    },
    {
     "do": "Plan your heavy weeks early.",
     "detail": "Use the rhythm to spot where readings stack up against your other courses, then start those weeks earlier."
    }
   ],
   "saves": "This page stores nothing.",
   "graded": "Nothing here is graded.",
   "next": "Open Calendar and Due Dates to put exact dates against this rhythm.",
   "clip": "45,59"
  },
  "readings": {
   "title": "How to use Readings and Media",
   "intro": "This is the course library: every assigned source in one place, with practice attached.",
   "steps": [
    {
     "do": "Browse or filter to find a source.",
     "detail": "Filter by week or search by author, title, or idea."
    },
    {
     "do": "Open a source's detail page.",
     "detail": "It shows the full citation, where to access the reading, roughly how long it takes, and what the source argues."
    },
    {
     "do": "Use Source Practice on sources you have read.",
     "detail": "Each practised source gives you a few questions with explanations, so you know whether the reading actually landed."
    },
    {
     "do": "Save sources to your shelf.",
     "detail": "The saved shelf collects sources you want to come back to, for example for an assignment."
    }
   ],
   "saves": "Your saved shelf and practice history stay in this browser on this device.",
   "graded": "Source Practice is never scored.",
   "next": "Take two or three sources into Compare Sources and hold them side by side.",
   "clip": "59,73"
  },
  "compare": {
   "title": "How to use Compare Sources",
   "intro": "Comparison is where course thinking gets real. This page holds two or three sources next to each other so you can see what each one argues.",
   "steps": [
    {
     "do": "Pick two or three sources.",
     "detail": "Choose sources that speak to the same question from different angles."
    },
    {
     "do": "Read the side-by-side panels.",
     "detail": "Each panel keeps the source's own argument, evidence, and limits visible."
    },
    {
     "do": "Press Synthesize when you are ready.",
     "detail": "The synthesis builds a layered frame across your chosen sources. Use it as a thinking scaffold, not as sentences to copy."
    },
    {
     "do": "Write your own take in the notes box.",
     "detail": "One or two sentences in your own words is worth more than the whole generated frame."
    }
   ],
   "saves": "Your comparison notes stay in this browser on this device.",
   "graded": "Comparisons are never graded. They exist to sharpen your written work.",
   "next": "Carry your comparison insight into this week's reflection or your next assignment.",
   "clip": "73,87"
  },
  "walkthroughs": {
   "title": "How to use Weekly Experiences",
   "intro": "Each teaching week has an immersive experience that walks the week's idea as a sequence of scenes, evidence, and questions.",
   "steps": [
    {
     "do": "Pick a week and enter.",
     "detail": "The experience opens over the page. Nothing behind it is lost."
    },
    {
     "do": "Move with the arrows or arrow keys.",
     "detail": "Each slide is one move: a scene, a figure, a question, or a program panel tuned to your lens."
    },
    {
     "do": "Use the voice control if you want narration.",
     "detail": "The read-aloud control speaks each slide with a voice you choose. It is optional and off by default."
    },
    {
     "do": "Leave any time; return any time.",
     "detail": "Close returns you to the page you came from. The experience remembers where you left off on this device."
    }
   ],
   "saves": "Your position in each experience is saved in this browser on this device.",
   "graded": "Experiences are teaching, not testing. Nothing is scored.",
   "next": "After an experience, open the same week's Study Guide to lock the idea in.",
   "clip": "87,100"
  },
  "videos": {
   "title": "How to use Videos and Podcasts",
   "intro": "This gallery collects scholar media for the course: the researchers you are reading, speaking for themselves.",
   "steps": [
    {
     "do": "Filter by week or browse the whole gallery.",
     "detail": "Each item names the scholar, the source it connects to, and why it is worth your minutes."
    },
    {
     "do": "Play inside the page.",
     "detail": "Videos are embedded with privacy-friendly players. Nothing tracks you into another site while you stay here."
    },
    {
     "do": "Connect what you watch to the week's reading.",
     "detail": "A talk is a way into a source, not a replacement for reading it."
    }
   ],
   "saves": "This page stores nothing beyond your program lens choice.",
   "graded": "Watching is never tracked or graded.",
   "next": "Open the reading the video connects to in Readings and Media.",
   "clip": "100,114"
  },
  "glossary": {
   "title": "How to use the Glossary",
   "intro": "Every key term and thinker in the course lives here, with real definitions and real citations.",
   "steps": [
    {
     "do": "Search or browse by week.",
     "detail": "Terms are written in two to four sentences, enough to actually understand, and each carries the citation it comes from."
    },
    {
     "do": "Use terms to speak precisely.",
     "detail": "Discussion posts and written work read stronger when the course vocabulary is used accurately."
    },
    {
     "do": "Follow a term back to its week.",
     "detail": "Each entry names its home week, so you can revisit the fuller context."
    }
   ],
   "saves": "This page stores nothing.",
   "graded": "Nothing here is graded.",
   "next": "Turn terms into memory with Concept Flashcards.",
   "clip": "114,128"
  },
  "cards": {
   "title": "How to use Concept Flashcards",
   "intro": "One flip card per course concept: the term in front, the definition behind.",
   "steps": [
    {
     "do": "Try to answer before you flip.",
     "detail": "Recalling before revealing is what makes flashcards work. Guessing first, even wrongly, strengthens the memory."
    },
    {
     "do": "Filter by week.",
     "detail": "Before a Knowledge Check, run the cards for that week plus one earlier week."
    },
    {
     "do": "Say the definition out loud in your own words.",
     "detail": "If you can only repeat the card's wording, flip it again tomorrow."
    }
   ],
   "saves": "This page stores nothing.",
   "graded": "Cards are pure practice.",
   "next": "Take the week's Knowledge Check and see what stuck.",
   "clip": "128,142"
  },
  "assignments": {
   "title": "How to use Starting Your Assignment",
   "intro": "This page turns each assessment into a concrete starting path so the blank page never wins.",
   "steps": [
    {
     "do": "Pick the assessment you are starting.",
     "detail": "Each one shows what it asks, when it is due, and which weeks feed it."
    },
    {
     "do": "Follow the start path step by step.",
     "detail": "The path breaks the assessment into first moves you can do today, with the course material each move draws on."
    },
    {
     "do": "Open the Assignment Start Lab when you want a working session.",
     "detail": "The lab walks you through building a personal plan you can print or save. It is private and never submitted."
    },
    {
     "do": "Submit on Blackboard, always.",
     "detail": "This site helps you start and plan. The official assignment, rubric, and submission all live on Blackboard."
    }
   ],
   "saves": "Your lab plan and notes stay in this browser on this device.",
   "graded": "Nothing here is submitted or graded. Blackboard is the only submission channel.",
   "next": "Block one hour, open the lab, and leave with a plan.",
   "clip": "142,155"
  },
  "career": {
   "title": "How to use Career Choices",
   "intro": "This page connects the course to your own field of study, whatever you are here to become.",
   "steps": [
    {
     "do": "Pick your area of study, or your exact program.",
     "detail": "Undecided is a real option and has its own write-up."
    },
    {
     "do": "Read the lens first.",
     "detail": "The Read it this way line gives you one question to carry through the whole course from your field's point of view."
    },
    {
     "do": "Work the scenario.",
     "detail": "Each field gets a concrete scenario showing the course ideas operating in that world, plus the transferable skills employers actually name."
    },
    {
     "do": "Follow the week links.",
     "detail": "Each field points at the two or three weeks that matter most for it, and those links jump straight to the stations."
    },
    {
     "do": "Write the reflection.",
     "detail": "One honest paragraph about how this course touches your field is a seed for assignments later."
    }
   ],
   "saves": "Your field choice and reflection stay in this browser on this device. The chip follows you around the site until you turn it off.",
   "graded": "The graded curriculum is identical for every student. The lens changes examples and framing only.",
   "next": "Visit a week the page recommends for your field and watch the framing follow you.",
   "clip": "155,169"
  },
  "ecology": {
   "title": "How to use Resilience Ecology",
   "intro": "Resilience is not a solo trait. This page maps the resources around you, which is the course's social ecology argument made personal.",
   "steps": [
    {
     "do": "Work outward from yourself.",
     "detail": "Name what you control, then the people, services, and structures around you that hold you up."
    },
    {
     "do": "Be concrete.",
     "detail": "A named person beats a category. Write the actual tutor, the actual friend, the actual service."
    },
    {
     "do": "Notice the gaps without judging them.",
     "detail": "A thin ring is information about your environment, not a verdict on you. Navigating toward resources is the skill the course teaches."
    }
   ],
   "saves": "Your ecology notes stay in this browser on this device.",
   "graded": "This is private reflection. It is never seen or scored.",
   "next": "Bring one insight from your map into this week's reflection.",
   "clip": "169,183"
  },
  "calendar": {
   "title": "How to use Calendar and Due Dates",
   "intro": "Every date that matters in one place: classes, openings, deadlines, Study Week, and the end of term.",
   "steps": [
    {
     "do": "Scan the term at a glance.",
     "detail": "Deadlines cluster at two points in the term. Seeing them early is the whole game."
    },
    {
     "do": "Download the calendar file.",
     "detail": "The download button gives you a file your phone or computer calendar can subscribe to, so the dates live where you already look."
    },
    {
     "do": "Treat Blackboard as the official source.",
     "detail": "If anything ever differs, Blackboard and your professor's announcements win."
    }
   ],
   "saves": "This page stores nothing.",
   "graded": "Nothing here is graded.",
   "next": "Put the two deadline clusters into your own planner now, before they are close.",
   "clip": "183,196"
  },
  "review": {
   "title": "How to use Term Review",
   "intro": "This page mixes practice questions from every week so far into one set, so ideas stay alive instead of fading after their week ends.",
   "steps": [
    {
     "do": "Answer, then mark how sure you were.",
     "detail": "Pick an answer, choose Guessing, Think so, or Sure, then press See how I did. The reveal explains the right answer and what each wrong option gets wrong."
    },
    {
     "do": "Trust the ordering.",
     "detail": "Questions you have missed before come first. That is deliberate: reviewing what almost stuck is worth more than repeating what already has."
    },
    {
     "do": "Read the calibration report at the end.",
     "detail": "It sorts the set into mastered, fragile, confident misses, and growing edges. Confident misses are gold: ideas that feel settled but are not."
    },
    {
     "do": "Follow the revisit buttons.",
     "detail": "Every item links back to its home week. Reread the concept, then run another set."
    },
    {
     "do": "Come back weekly.",
     "detail": "Two short mixed sets a week beat one long cram. The pool grows as the course does."
    }
   ],
   "saves": "Your practice history is saved only in this browser and feeds the missed-first ordering here and in the weekly Knowledge Checks.",
   "graded": "Nothing here is scored, recorded, or visible to your professor.",
   "next": "Run one set now, then revisit the week your confident misses point at.",
   "clip": "196,210"
  },
  "outcomes": {
   "title": "How to use What This Course Builds",
   "intro": "This page shows the official course learning outcomes and the Ontario employability skills behind every week, so you can always see why the work exists.",
   "steps": [
    {
     "do": "Read the outcomes as promises.",
     "detail": "Each one names something you will be able to do by the end. They are the same for every student on every route through the course."
    },
    {
     "do": "Use the week buttons.",
     "detail": "Each outcome lists the weeks that build it. If an outcome feels shaky, those weeks are where to go."
    },
    {
     "do": "Check the assessment lines.",
     "detail": "Each outcome names the assessments that measure it, so no graded task ever comes out of nowhere."
    },
    {
     "do": "Notice the skills employers name.",
     "detail": "The Essential Employability Skills list is what Ontario colleges promise every graduate. This course practises the ones shown."
    }
   ],
   "saves": "This page stores nothing.",
   "graded": "Nothing here is graded. Blackboard carries the official documents.",
   "next": "Open a week one of your shakier outcomes points at.",
   "clip": "210,224"
  }
 }
};
