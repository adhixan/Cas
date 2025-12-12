/* style.js - Smarter CAS chatbot (client-side) */
document.addEventListener("DOMContentLoaded", () => {
  const messagesDiv = document.getElementById("messages");
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const clearBtn = document.getElementById("clearBtn");

  /* -------------------------
     Full CAS data (source of truth)
     ------------------------- */

  const casData = {
    id: "cas_root",
    collegeInfo: `College of Applied Science (CAS) Vattamkulam - Basic Details
We are a leading institute managed by IHRD, a Government of Kerala undertaking. We are affiliated with the University of Calicut.
Full Form: College of Applied Science.
Year Established: 2005.
Location: Nellissery, near Edappal, Malappuram District, Kerala.`,

    fullForm: `CAS stands for the College of Applied Science. We are part of the network of IHRD institutions across Kerala.`,

    contact: `Contact Information:
Phone: 0494-2689655 / 8547006802
Email: casvattamkulam@ihrd.ac.in
Website: casvattamkulam.ihrd.ac.in`,

    principal: `Principal: Sri. Abdussammed P.`,

    departments: `Departments:
Computer Science, Electronics, Commerce, General Department (Mathematics, English, etc.)`,

    ugCourses: `Undergraduate Programs:
B.Sc Computer Science Honours (36 seats)
BCA (24 seats)
B.Sc Electronics (36 seats)
B.Com Honours (48 seats)
BBA Logistics Honours (30 seats)`,

    pgCourses: `Postgraduate Programs:
M.Sc Computer Science (10 seats)
M.Com Finance (15 seats)`,

    activities: `Clubs & Activities:
NSS, Career Guidance & Placement, Standard Club, Health & Sports Club, Bhoomithra Sena, Daksha Club, Women Development Cell, Commerce Association, Computer Science Association, Electronics Association, IT Hub, Literary Club, Mathematics Club, ED Club, Tourism Club, Institution's Innovation Council, Media Cell.`,

    mission: `To impart quality education and create professionals with high competency and values.`,

    vision: `To develop into a contributing Centre of excellence in knowledge and technology creating globally competitive professionals who would contribute positively to the society.`,

    fees: `Approximate semester fees:
B.Sc CS / BCA / B.Sc Electronics: ₹17,270
B.Com Honours: ₹13,035
BBA Logistics: ₹8,470
M.Sc CS: ₹22,550
M.Com Finance: ₹18,425`,

    facilities: `Facilities:
Modern Computer Lab, Electronics Lab, Comprehensive Library, Open Gym, NSS Unit, Placement Support`,

    admission: `Admission:
University Quota (50%) via Calicut University CAP portal.
IHRD/Management Quota (50%) via ihrdadmissions.org.
UG admissions: after +2 results. PG admissions: after degree results.`,

    getCourseDetails: (courseName) => {
      const map = {
        'msc computer science': `M.Sc Computer Science:
Seats: 10 (may vary)
Duration: 2 Years (4 Semesters)
Eligibility: Bachelor degree in Computer Science or equivalent
Selection: Based on UG marks.
Fees: ₹22,550 per semester.`,

        'mcom finance': `M.Com Finance:
Seats: 15 (may vary)
Duration: 2 Years (4 Semesters)
Eligibility: Bachelor of Commerce or equivalent
Selection: Based on UG marks.
Fees: ₹18,425 per semester.`,

        'bsc computer science': `B.Sc Computer Science (Honours):
Seats: 36
Duration: 4 Years (8 Semesters)
Eligibility: +2 with Mathematics/Electronics
Selection: Based on +2 marks.
Fees: ₹17,270 per semester.`,

        'bca': `BCA:
Seats: 24
Duration: 4 Years (8 Semesters)
Eligibility: +2 with Mathematics/Computer Science/IT or equivalent
Selection: Based on +2 marks.
Fees: ₹17,270 per semester.`,

        'bba logistics': `BBA Logistics (Honours):
Seats: 30
Duration: 4 Years (8 Semesters)
Eligibility: +2 pass (min 45%)
Selection: Based on +2 marks.
Fees: ₹8,470 per semester.`,

        'bsc electronics': `B.Sc Electronics:
Seats: 36
Duration: 3 Years (6 Semesters)
Eligibility: +2 with Mathematics/Electronics
Selection: Based on +2 marks.
Fees: ₹17,270 per semester.`,

        'bcom honours': `B.Com Honours:
Seats: 48
Duration: 4 Years (8 Semesters)
Eligibility: +2 pass
Selection: Based on +2 marks.
Fees: ₹13,035 per semester.`
      };

      return map[courseName] || null;
    }
  };

  /* -------------------------
     Build a small searchable index
     Each "doc" has: id, text, tags
     ------------------------- */

  const docs = [
    { id: "collegeInfo", text: casData.collegeInfo, tags: ["about", "overview", "college"] },
    { id: "fullForm", text: casData.fullForm, tags: ["full form", "meaning"] },
    { id: "contact", text: casData.contact, tags: ["contact", "phone", "email"] },
    { id: "principal", text: casData.principal, tags: ["principal", "head"] },
    { id: "departments", text: casData.departments, tags: ["department", "departments", "faculty"] },
    { id: "ugCourses", text: casData.ugCourses, tags: ["ug", "undergraduate", "bsc", "bca", "bcom", "bba"] },
    { id: "pgCourses", text: casData.pgCourses, tags: ["pg", "postgraduate", "msc", "mcom"] },
    { id: "activities", text: casData.activities, tags: ["clubs", "activities", "events"] },
    { id: "mission", text: casData.mission, tags: ["mission", "goal"] },
    { id: "vision", text: casData.vision, tags: ["vision", "aim"] },
    { id: "fees", text: casData.fees, tags: ["fee", "fees", "cost", "price"] },
    { id: "facilities", text: casData.facilities, tags: ["facility", "facilities", "lab", "library", "gym"] },
    { id: "admission", text: casData.admission, tags: ["admission", "apply", "quota", "eligibility"] },

    // course-specific docs
    { id: "msc computer science", text: casData.getCourseDetails('msc computer science'), tags: ["msc", "m.sc", "msc computer science"] },
    { id: "mcom finance", text: casData.getCourseDetails('mcom finance'), tags: ["mcom", "m.com", "mcom finance"] },
    { id: "bsc computer science", text: casData.getCourseDetails('bsc computer science'), tags: ["bsc", "bsc computer science", "bsc cs"] },
    { id: "bca", text: casData.getCourseDetails('bca'), tags: ["bca"] },
    { id: "bba logistics", text: casData.getCourseDetails('bba logistics'), tags: ["bba", "bba logistics"] },
    { id: "bsc electronics", text: casData.getCourseDetails('bsc electronics'), tags: ["bsc electronics", "electronics"] },
    { id: "bcom honours", text: casData.getCourseDetails('bcom honours'), tags: ["bcom", "bcom honours", "bcom hons"] }
  ];

  /* -------------------------
     Simple text processing utilities
     ------------------------- */

  const STOPWORDS = new Set([
    "the","is","in","and","to","a","of","for","with","on","by","our","we","are","be","an","as","at","this","that","from","or","what","how","do","does","can","i","you","your","may","please","which","about","any"
  ]);

  function normalize(text) {
    return (text || "").toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tokenize(text) {
    return normalize(text).split(" ").filter(t => t && !STOPWORDS.has(t));
  }

  // build term frequency vector for a doc
  function termFreq(tokens) {
    const tf = {};
    tokens.forEach(t => { tf[t] = (tf[t] || 0) + 1; });
    return tf;
  }

  // build global vocabulary from docs
  const VOCAB = (() => {
    const set = new Set();
    docs.forEach(d => tokenize(d.text).forEach(t => set.add(t)));
    // include tag tokens too
    docs.forEach(d => d.tags.forEach(tag => tokenize(tag).forEach(t => set.add(t))));
    return Array.from(set);
  })();

  // convert tokens to vector aligned with VOCAB
  function vectorFromText(text) {
    const tf = termFreq(tokenize(text));
    const vector = VOCAB.map(w => tf[w] || 0);
    return vector;
  }

  // cosine similarity
  function dot(a,b){ return a.reduce((sum,x,i)=>sum+x*b[i],0); }
  function norm(a){ return Math.sqrt(a.reduce((s,x)=>s + x*x,0)); }
  function cosine(a,b){
    const n1 = norm(a), n2 = norm(b);
    if (n1 === 0 || n2 === 0) return 0;
    return dot(a,b) / (n1 * n2);
  }

  // precompute vectors for docs
  const docVectors = {};
  docs.forEach(d => {
    docVectors[d.id] = vectorFromText(d.text + " " + d.tags.join(" "));
  });

  /* -------------------------
     Fuzzy matching (Levenshtein) for short terms (courses)
     ------------------------- */

  function levenshtein(a,b) {
    if (a === b) return 0;
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = Array.from({length: m+1}, (_,i)=>Array(n+1).fill(0));
    for (let i=0;i<=m;i++) dp[i][0]=i;
    for (let j=0;j<=n;j++) dp[0][j]=j;
    for (let i=1;i<=m;i++){
      for (let j=1;j<=n;j++){
        const cost = a[i-1] === b[j-1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost);
      }
    }
    return dp[m][n];
  }

  function fuzzyBestMatch(term, candidates) {
    term = normalize(term).replace(/\s+/g," ");
    let best = null;
    let bestScore = Infinity; // smaller is better for distance
    candidates.forEach(c => {
      const d = levenshtein(term, c);
      if (d < bestScore) { bestScore = d; best = c; }
    });
    return { best, distance: bestScore };
  }

  /* -------------------------
     Lightweight conversation context
     ------------------------- */

  const conversationContext = {
    lastTopicId: null,   // id of last matched doc (e.g., 'bca' or 'fees')
    lastUserMsg: null
  };

  /* -------------------------
     Intent keywords (rule-based) - used first for fast routing
     ------------------------- */

  const intentKeywords = {
    greeting: ["hi","hello","hey","good morning","good evening","greetings"],
    about: ["about","overview","information","tell me about","what is cas","college details"],
    courses_general: ["courses","programs","degree","offer","offerings","what do you offer","study"],
    ug: ["undergraduate","ug","bachelor","b.sc","bsc","bca","bcom","bba"],
    pg: ["postgraduate","pg","master","msc","m.com","mcom"],
    fees: ["fee","fees","cost","price","how much","payment","semester fee"],
    admission: ["admission","apply","application","eligibility","quota","selection","how to apply"],
    contact: ["phone","email","contact","address","where","location"],
    facility: ["lab","library","gym","facilities","infrastructure","hostel"],
    activities: ["club","clubs","activities","events","association","nss","placement"],
    principal: ["principal","head","dean","director"]
  };

  function includesAny(msg, list) {
    return list.some(k => msg.includes(k));
  }

  /* -------------------------
     Main smart responder
     Steps:
       1) Normalize message
       2) Quick rule-based intent match
       3) If short follow-up (like "fees?") use context
       4) Semantic similarity (cosine) across docs
       5) Fuzzy match for course names if needed
       6) Return best answer with confidence
     ------------------------- */

  function getBestDocBySimilarity(msg) {
    const v = vectorFromText(msg);
    const results = docs.map(d => {
      const score = cosine(v, docVectors[d.id]);
      return { id: d.id, text: d.text, score };
    }).sort((a,b) => b.score - a.score);
    return results;
  }

  function getBotReply(userMsg) {
    const raw = userMsg || "";
    const msg = normalize(raw);

    // store last user msg
    conversationContext.lastUserMsg = raw;

    // 1) greeting
    if (includesAny(msg, intentKeywords.greeting)) {
      return { text: "Hello! 👋 I can help with courses (UG/PG), fees, admission, facilities, contact info — go ahead and ask.", id: "greeting", confidence: 0.99 };
    }

    // 2) if user asks a short follow-up like "fees?" "and fees?" "what about fees?" use context
    const shortFollowUp = (msg.length <= 30 && (msg.includes("fee") || msg.includes("fees") || msg.includes("duration") || msg.includes("seat") || msg.includes("seats") || msg === "fees?" || msg === "and fees?" || msg === "and fees"));
    if (shortFollowUp && conversationContext.lastTopicId) {
      // try to answer from the last topic (e.g., course details include fees)
      const lastId = conversationContext.lastTopicId;
      // course-specific
      const courseDoc = docs.find(d => d.id === lastId);
      if (courseDoc && courseDoc.text) {
        // if asking fees, attempt to extract lines containing "Fees" or "fees" or "Fees:"
        const feesLine = courseDoc.text.split("\n").filter(line => /fee/i.test(line)).join("\n");
        const answer = feesLine ? `${courseDoc.text}\n\n${feesLine}` : courseDoc.text;
        return { text: answer, id: lastId, confidence: 0.9 };
      }
    }

    // 3) rule-based intent quick routing (fast and reliable)
    if (includesAny(msg, intentKeywords.contact)) {
      return { text: casData.contact, id: "contact", confidence: 0.95 };
    }
    if (includesAny(msg, intentKeywords.admission)) {
      return { text: casData.admission, id: "admission", confidence: 0.95 };
    }
    if (includesAny(msg, intentKeywords.fees)) {
      return { text: casData.fees, id: "fees", confidence: 0.95 };
    }
    if (includesAny(msg, intentKeywords.facility)) {
      return { text: casData.facilities, id: "facilities", confidence: 0.95 };
    }
    if (includesAny(msg, intentKeywords.activities)) {
      return { text: casData.activities, id: "activities", confidence: 0.95 };
    }
    if (includesAny(msg, intentKeywords.principal)) {
      return { text: casData.principal, id: "principal", confidence: 0.95 };
    }
    if (includesAny(msg, intentKeywords.ug) && includesAny(msg, ["course","offer","list","which","what","programs","available","available?"])) {
      return { text: casData.ugCourses, id: "ugCourses", confidence: 0.93 };
    }
    if (includesAny(msg, intentKeywords.pg) && includesAny(msg, ["course","offer","list","which","what","programs","available","available?"])) {
      return { text: casData.pgCourses, id: "pgCourses", confidence: 0.93 };
    }

    // 4) Semantic similarity search (best-match)
    const simResults = getBestDocBySimilarity(msg);
    const best = simResults[0];

    // if best similarity is strong enough, use it
    if (best.score >= 0.25) { // tuned threshold (0.25 works well for small TF vectors)
      // store context topic if it's a doc that can be followed up
      conversationContext.lastTopicId = best.id;
      // return the doc's text
      const doc = docs.find(d => d.id === best.id);
      return { text: doc.text, id: doc.id, confidence: Math.min(0.99, 0.5 + best.score) };
    }

    // 5) Fuzzy match course names (short queries or typos)
    // Check if user typed a candidate course-like token
    const courseCandidates = docs.filter(d => d.id.includes("bsc") || d.id.includes("bca") || d.id.includes("bcom") || d.id.includes("bba") || d.id.includes("msc") || d.id.includes("mcom")).map(d => d.id);
    // try to find best fuzzy match among course names using raw user message
    const fuzzy = fuzzyBestMatch(raw.toLowerCase(), courseCandidates);
    // if distance is small enough relative to length, accept
    if (fuzzy.best && fuzzy.distance <= Math.max(2, Math.floor(fuzzy.best.length * 0.25))) {
      const doc = docs.find(d => d.id === fuzzy.best);
      conversationContext.lastTopicId = doc.id;
      return { text: doc.text, id: doc.id, confidence: 0.8 };
    }

    // 6) If nothing matched well — return friendly fallback with suggestions (no dead-end)
    const fallback = `Sorry — I didn't quite catch that. I can help with:
• Courses (UG / PG) — e.g. "What UG programs do you offer?"
• Course details — e.g. "Tell me about BCA" or "M.Sc Computer Science details"
• Fees — e.g. "How much is BCA per semester?"
• Admission — e.g. "How to apply?"
• Facilities / Labs / Library
• Contact / Address

Try one of the examples above, or ask: "list UG courses" — I'll pick the correct answer.`;
    return { text: fallback, id: "fallback", confidence: 0.3 };
  }

  /* -------------------------
     UI helpers
     ------------------------- */

  function addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "msg msg-user";
    div.innerHTML = `<div class="bubble bubble-user">${escapeHtml(text)}</div>`;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function addBotMessage(text) {
    const div = document.createElement("div");
    div.className = "msg msg-bot";
    div.innerHTML = `<div class="bubble bubble-bot">${formatBotText(text)}</div>`;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement("div");
    div.id = "typing";
    div.className = "msg msg-bot";
    div.innerHTML = `<div class="bubble bubble-bot"><div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>`;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById("typing");
    if (t) t.remove();
  }

  // simple markdown-lite formatting for responses (bold, lists, newlines)
  function formatBotText(text) {
    if (!text) return "";
    // Escape first to avoid HTML injection
    const esc = escapeHtml(text);

    // convert lines that start with bullet markers to <ul>
    // keep it simple: lines that start with • or - become list items
    const lines = esc.split("\n");
    let out = "";
    let inList = false;
    lines.forEach(line => {
      const l = line.trim();
      if (l.startsWith("•") || l.startsWith("-")) {
        if (!inList) { out += "<ul style='margin:6px 0;padding-left:18px'>"; inList = true; }
        out += `<li style="margin:4px 0">${escapeHtml(l.replace(/^[-•]\s*/, ""))}</li>`;
      } else {
        if (inList) { out += "</ul>"; inList = false; }
        // bold markers **text**
        const withBold = l.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        out += `<div style="margin:6px 0">${withBold}</div>`;
      }
    });
    if (inList) out += "</ul>";
    return out;
  }

  function escapeHtml(unsafe) {
    return (unsafe || "").replace(/[&<"'>]/g, function(m) {
      return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;" })[m];
    });
  }

  /* -------------------------
     Main send flow
     ------------------------- */

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addUserMessage(text);
    input.value = "";
    showTyping();

    setTimeout(() => {
      removeTyping();
      const reply = getBotReply(text);
      addBotMessage(reply.text);

      // if reply corresponded to a doc, update context (handled inside getBotReply)
      // optionally show a confidence hint for debugging (remove in production)
      // console.log("Reply ID:", reply.id, "Confidence:", reply.confidence);

    }, 350 + Math.random()*250);
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  clearBtn.addEventListener("click", () => {
    messagesDiv.innerHTML = "";
    conversationContext.lastTopicId = null;
    conversationContext.lastUserMsg = null;
    addBotMessage("Conversation cleared. Hello! 👋 Ask me anything about CAS Vattamkulam.");
  });

  // initial greeting
  addBotMessage("Hello! 👋 I'm the CAS Vattamkulam Assistant. Ask about courses, fees, admission, facilities, departments, or contact details.");

});
