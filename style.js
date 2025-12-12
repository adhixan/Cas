document.addEventListener("DOMContentLoaded", () => {

  const messagesDiv = document.getElementById("messages");
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  /* ------------------------------
      FULL CAS DATA (UNCHANGED)
  ------------------------------ */
  const casData = {
    collegeInfo: `
**College of Applied Science (CAS) Vattamkulam - Basic Details**

We are a leading institute managed by **IHRD**, a Government of Kerala undertaking. We are affiliated with the **University of Calicut**.

•  **Full Form:** College of Applied Science  
•  **Year Established:** 2005  
•  **Location:** Nellissery, near Edappal, Malappuram District, Kerala.
    `,

    fullForm: `
CAS stands for the **College of Applied Science**. We are part of the IHRD institution network across Kerala.
    `,

    contact: `
📍 **Contact Information:**  
☎️ **Phone:** 0494-2689655 / 8547006802  
📧 **Email:** casvattamkulam@ihrd.ac.in  
🌐 **Website:** casvattamkulam.ihrd.ac.in
    `,

    principal: `
👨‍🏫 The Principal of CAS Vattamkulam is **Sri. Abdussammed P.**.
    `,

    departments: `
Departments at CAS Vattamkulam:

• Computer Science  
• Electronics  
• Commerce  
• General Department (English, Mathematics, etc.)
    `,

    ugCourses: `
**Undergraduate (UG) Programs:**

• B.Sc Computer Science Honours — 36 Seats  
• BCA — 24 Seats  
• B.Sc Electronics — 36 Seats  
• B.Com Honours — 48 Seats  
• BBA Logistics Honours — 30 Seats (NEW)
    `,

    pgCourses: `
**Postgraduate (PG) Programs:**

• M.Sc Computer Science — 10 Seats  
• M.Com Finance — 15 Seats
    `,

    activities: `
CAS encourages holistic growth with:

1. NSS  
2. Career Guidance Cell  
3. Standard Club  
4. Sports Club  
5. Media Cell  
6. Daksha Club  
7. Women Development Cell  
8. Literary Club  
9. Tourism Club  
10. ED Club  
11. Mathematics Club  
12. IT Hub  
13. Commerce Association  
14. CS Association  
15. Electronics Association  
16. Innovation Council  
17. Bhoomithra Sena  
    `,

    mission: `To create competent professionals with strong values.`,
    vision: `To be a center of excellence in knowledge & technology.`,

    fees: `
**Approximate Semester Fees:**

• B.Sc CS / BCA / B.Sc Electronics — ₹17,270  
• B.Com Honours — ₹13,035  
• BBA Logistics — ₹8,470  
• M.Sc CS — ₹22,550  
• M.Com Finance — ₹18,425  
    `,

    facilities: `
Our campus provides:

• Modern Computer Lab  
• Electronics Lab  
• Library  
• Open Gym  
• NSS Unit  
• Placement Cell
    `,

    getCourseDetails: (course) => {
      const details = {
        "msc computer science": {
          seats: "10 Seats",
          duration: "2 Years",
          eligibility: "B.Sc Computer Science",
          selection: "Based on UG marks.",
          fees: "₹22,550 per semester"
        },
        "mcom finance": {
          seats: "15 Seats",
          duration: "2 Years",
          eligibility: "B.Com Degree",
          selection: "Based on UG marks.",
          fees: "₹18,425 per semester"
        },
        "bsc computer science": {
          seats: "36 Seats",
          duration: "4 Years (Honours)",
          eligibility: "+2 with Maths/Electronics",
          selection: "Based on +2 marks.",
          fees: "₹17,270 per semester"
        },
        "bca": {
          seats: "24 Seats",
          duration: "4 Years",
          eligibility: "+2 with CS/Maths/IT",
          selection: "Based on +2 marks.",
          fees: "₹17,270 per semester"
        },
        "bba logistics": {
          seats: "30 Seats",
          duration: "4 Years",
          eligibility: "+2 pass (min 45%)",
          selection: "Based on +2 marks.",
          fees: "₹8,470 per semester"
        },
        "bsc electronics": {
          seats: "36 Seats",
          duration: "3 Years",
          eligibility: "+2 with Maths/Electronics",
          selection: "Based on +2 marks.",
          fees: "₹17,270 per semester"
        },
        "bcom honours": {
          seats: "48 Seats",
          duration: "4 Years",
          eligibility: "+2 pass",
          selection: "Based on +2 marks.",
          fees: "₹13,035 per semester"
        }
      }[course];

      if (!details) return null;

      return `
**${course.toUpperCase()}**

• **Duration:** ${details.duration}  
• **Seats:** ${details.seats}  
• **Eligibility:** ${details.eligibility}  
• **Selection:** ${details.selection}  
• **Fees:** ${details.fees}  
      `;
    },

    admission: `
**Admission Process:**

1️⃣ **University Quota (50%)** — Apply via Calicut University CAP portal  
2️⃣ **Management/IHRD Quota (50%)** — Apply via ihrdadmissions.org

UG admissions begin after +2 results.  
PG admissions start after UG results.
    `
  };

  /* ------------------------ UI FUNCTIONS ------------------------ */

  function addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "msg msg-user";
    div.innerHTML = `<div class="bubble bubble-user">${text}</div>`;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function addBotMessage(text) {
    const div = document.createElement("div");
    div.className = "msg msg-bot";
    div.innerHTML = `<div class="bubble bubble-bot">${text}</div>`;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement("div");
    div.id = "typing";
    div.className = "msg msg-bot";
    div.innerHTML = `
      <div class="bubble bubble-bot">
        <div class="typing">
          <div class="dot"></div><div class="dot"></div><div class="dot"></div>
        </div>
      </div>`;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById("typing");
    if (t) t.remove();
  }

  /* ------------------------ BOT LOGIC ------------------------ */

  function getBotReply(message) {
    const msg = message.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi")) return "Hello! 👋 How can I help you today?";
    if (msg.includes("about")) return casData.collegeInfo;
    if (msg.includes("full form")) return casData.fullForm;
    if (msg.includes("contact")) return casData.contact;
    if (msg.includes("principal")) return casData.principal;
    if (msg.includes("department")) return casData.departments;
    if (msg.includes("ug")) return casData.ugCourses;
    if (msg.includes("pg")) return casData.pgCourses;
    if (msg.includes("course")) return casData.ugCourses + "\n\n" + casData.pgCourses;
    if (msg.includes("fee")) return casData.fees;
    if (msg.includes("admission")) return casData.admission;
    if (msg.includes("facility")) return casData.facilities;
    if (msg.includes("activity") || msg.includes("club")) return casData.activities;
    if (msg.includes("mission")) return casData.mission;
    if (msg.includes("vision")) return casData.vision;

    // Course matcher
    const courseNames = [
      "msc computer science","mcom finance","bsc computer science",
      "bca","bba logistics","bsc electronics","bcom honours"
    ];
    for (let c of courseNames) {
      if (msg.includes(c)) return casData.getCourseDetails(c);
    }

    return "I'm here to help! Ask anything about CAS Vattamkulam.";
  }

  /* ------------------------ SEND MESSAGE ------------------------ */

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = "";
    showTyping();

    setTimeout(() => {
      removeTyping();
      addBotMessage(getBotReply(text));
    }, 600);
  }

  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  addBotMessage("Hello! 👋 I'm the CAS Vattamkulam AI Assistant. How can I help you today?");
});
