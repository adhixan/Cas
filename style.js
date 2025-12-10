document.addEventListener("DOMContentLoaded", () => {

  const messagesDiv = document.getElementById("messages");
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const quickActions = document.getElementById("quickActions");

  // College data
  const casData = {
    collegeInfo: `
**College of Applied Science (CAS) Vattamkulam - Basic Details**

We are a leading institute managed by **IHRD**, a Government of Kerala undertaking. We are affiliated with the **University of Calicut**.

•  **Full Form:** College of Applied Science
•  **Year Established:** 2005
•  **Location:** Nellissery, near Edappal, Malappuram District, Kerala.
    `,

    fullForm: `
CAS stands for the **College of Applied Science**. We are part of the network of IHRD (Institute of Human Resources Development) institutions across Kerala.
    `,

    contact: `
📍 **Contact Information:**
You can reach the College of Applied Science, Vattamkulam, at:

☎️ **Phone:** 0494-2689655 or 8547006802
📧 **Email:** casvattamkulam@ihrd.ac.in
🌐 **Website:** casvattamkulam.ihrd.ac.in
    `,

    principal: `
👨‍🏫 Our Principal is **Sri. Abdussammed P.** He is dedicated to maintaining high standards of education and discipline.
    `,

    departments: `
We have dynamic departments covering various streams:

• **Computer Science:** (B.Sc CS, BCA, M.Sc CS)
• **Electronics:** (B.Sc Electronics)
• **Commerce:** (B.Com Honours, M.Com Finance)
• **General Department:** (Mathematics, English, etc.)
    `,

    ugCourses: `
We offer the following **Undergraduate (UG)** programs:

• **B.Sc Computer Science** (3 years)
• **BCA** (3 years)
• **B.Sc Electronics** (3 years)
• **B.Com with Computer Application (Honours)** (4 years)

Need details on eligibility or intake for any of these?
    `,

    pgCourses: `
We offer the following **Postgraduate (PG)** programs:

• **M.Sc Computer Science** (2 years)
• **M.Com Finance** (2 years)

These programs are excellent for career advancement!
    `,

    fees: `
The fee structure varies by course, but here are the approximate semester fees:

- **B.Sc/BCA:** ₹17,270 per semester
- **B.Com Honours:** ₹13,035 per semester
- **M.Sc CS:** ₹22,575 per semester
- **M.Com Finance:** ₹18,575 per semester

*Note: SC/ST/OEC students may be eligible for fee concessions and financial grants.*
    `,

    admission: `
The admission process is split into two parts:

1.  **University Quota (50%):** Apply through the University of Calicut CAP portal.
2.  **IHRD / Management Quota (50%):** Apply directly through the IHRD admission portal (ihrdadmissions.org).

Be sure to check both portals for deadlines!
    `,

    facilities: `
We provide excellent facilities to support your learning:

• **Modern Computer and Electronics Labs** (fully equipped)
• **Comprehensive Library** with reference section
• **Smart Classrooms** and Seminar Hall
• **Open Gym** for fitness
• **NSS Unit** and dedicated **Placement Support** team.
    `
  };

  // reply logic
  function getBotReply(message) {
    const msg = message.toLowerCase();

    // 1. Core Info & Welcome
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hai"))
      return "Hello! 👋 I am the CAS Vattamkulam AI Assistant. How can I assist you with information about the college today?";
    
    // CAS Full Form
    if (msg.includes("full form") || msg.includes("cas full form") || msg.includes("cas means"))
      return casData.fullForm;

    // General College Info
    if (msg.includes("about the college") || msg.includes("about cas") || msg.includes("what is cas"))
      return casData.collegeInfo + "\n\nWhat other details are you looking for?";
      
    // Year Established
    if (msg.includes("year") || msg.includes("established") || msg.includes("started") || msg.includes("when"))
      return "The College of Applied Science, Vattamkulam was proudly established in **2005** and has been serving students for almost two decades.";

    // 2. Specific Topics
    if (msg.includes("contact") || msg.includes("phone") || msg.includes("email") || msg.includes("address") || msg.includes("location") || msg.includes("where"))
      return casData.contact;

    if (msg.includes("principal") || msg.includes("head"))
      return casData.principal;

    if (msg.includes("ug") || msg.includes("undergraduate"))
      return casData.ugCourses;

    if (msg.includes("pg") || msg.includes("postgraduate"))
      return casData.pgCourses;

    if (msg.includes("course") || msg.includes("program") || msg.includes("degree") || msg.includes("all courses"))
      return casData.ugCourses + "\n\n" + casData.pgCourses;

    if (msg.includes("fees") || msg.includes("fee") || msg.includes("cost") || msg.includes("fee structure"))
      return casData.fees;

    if (msg.includes("admission") || msg.includes("apply") || msg.includes("quota") || msg.includes("procedure"))
      return casData.admission;

    if (msg.includes("department") || msg.includes("departments"))
      return casData.departments;

    if (msg.includes("facility") || msg.includes("infrastructure") || msg.includes("lab") || msg.includes("library") || msg.includes("gym") || msg.includes("facilities available"))
      return casData.facilities;

    // 3. Default/Fallback
    return `
I'm sorry, I couldn't quite understand that. 😟 

I specialize in answering questions about CAS Vattamkulam's **courses, fees, admission process, and facilities.**

Could you please rephrase your question or select one of the quick actions below?
    `;
  }

  function addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "msg msg-user";
    div.innerHTML = `
      <div class="bubble bubble-user">${text}</div>
      <div class="user-icon"><i data-lucide="user"></i></div>
    `;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    lucide.createIcons();
  }

  function addBotMessage(text) {
    const div = document.createElement("div");
    div.className = "msg msg-bot";
    div.innerHTML = `
      <div class="bot-icon"><i data-lucide="bot"></i></div>
      <div class="bubble bubble-bot">${text}</div>
    `;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    lucide.createIcons();
  }

  function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.id = "typing";
    typingDiv.className = "msg msg-bot";
    typingDiv.innerHTML = `
      <div class="bot-icon"><i data-lucide="bot"></i></div>
      <div class="bubble bubble-bot">
        <div class="typing">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    `;
    messagesDiv.appendChild(typingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    lucide.createIcons();
  }

  function removeTyping() {
    const t = document.getElementById("typing");
    if (t) t.remove();
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // Hide quick actions on first message
    quickActions.style.display = "none";
    
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  document.querySelectorAll(".quick-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      input.value = btn.innerText;
      quickActions.style.display = "none";
      sendMessage();
    });
  });

  // initial greeting
  addBotMessage("Hello! 👋 I am the CAS Vattamkulam AI Assistant. I can help you with College Overview, Courses, Fees, Admission, and Facilities. What would you like to know?");
});