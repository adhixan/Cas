document.addEventListener("DOMContentLoaded", () => {

  const messagesDiv = document.getElementById("messages");
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const quickActions = document.getElementById("quickActions");
  const quickButtonsDiv = quickActions.querySelector('.quick-buttons'); 

  // HIDE QUICK ACTIONS ON LOAD
  quickActions.style.display = 'none';

  // --- 1. Bot Data and Special Actions ---

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

    // DATA ADDED: Clubs and Activities
    activities: `
We encourage holistic development through various **Clubs and Associations**:

1. **NSS Unit**
2. **Career Guidance & Placement Cell**
3. **Standard Club**
4. **Health & Sports Club**
5. **Bhoomithra Sena Club**
6. **Daksha Club**
7. **Women Development Cell**
8. **Commerce Association**
9. **Computer Science Association**
10. **Electronics Association**
11. **IT Hub**
12. **Literary Club**
13. **Mathematics Club**
14. **ED Club** (Entrepreneurship Development Club)
15. **Tourism Club**
16. **Institution's Innovation Council**
17. **Media Cell**
    `,

    // DATA ADDED: Mission and Vision
    mission: `
To impart quality education and create professionals with high competency and values who can make indelible mark in their respective fields.
    `,
    vision: `
To develop into a contributing Centre of excellence in knowledge and technology creating globally competitive professionals who would contribute positively to the society.
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

    // FACILITIES DATA (UPDATED)
    facilities: `
We provide excellent facilities to support your learning:

• **Modern Computer Lab** (fully equipped)
• **Electronics Lab**
• **Comprehensive Library**
• **Open Gym** for fitness
• **NSS Unit** and dedicated **Placement Support** team.
    `
  };


  // --- 2. Quick Action Button Definitions ---
  const defaultActions = [
      'Show all courses',
      'Admission procedure',
      'Contact details',
      'Facilities available'
  ];


  // --- 3. Helper Functions for UI and Logic ---

  function setQuickActions(title, buttons) {
      const quickTitle = quickActions.querySelector('.quick-title span');
      
      quickTitle.textContent = title;
      quickButtonsDiv.innerHTML = ''; // Clear old buttons
      
      buttons.forEach(btnText => {
          const button = document.createElement('button');
          button.className = 'quick-btn';
          button.textContent = btnText;
          button.addEventListener('click', () => {
              // Set input value and trigger sendMessage
              input.value = button.textContent;
              sendMessage();
          });
          quickButtonsDiv.appendChild(button);
      });

      // Show the quick actions box
      quickActions.style.display = 'block';
  }

  function initializeQuickActions() {
      // Sets the default buttons and ensures they are wired up
      setQuickActions('Quick questions:', defaultActions);
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


  // --- 4. Reply Logic (FIXED FACILITIES MATCHING) ---

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

    // ADDED: Clubs and Activities
    if (msg.includes("activities") || msg.includes("club") || msg.includes("association"))
        return casData.activities;

    // ADDED: Mission and Vision
    if (msg.includes("mission") && msg.includes("vision"))
        return "Our guiding principles are:\n\n**Mission:** " + casData.mission + "\n\n**Vision:** " + casData.vision;
    if (msg.includes("mission"))
        return casData.mission;
    if (msg.includes("vision"))
        return casData.vision;

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

    // FIX: Using a regex for facilities to match multiple variations
    if (/(facility|facilities|infrastructure|lab|library|gym)/.test(msg))
      return casData.facilities;

    // 3. Default/Fallback
    return `
I'm sorry, I couldn't quite understand that. 😟 

I specialize in answering questions about CAS Vattamkulam's **courses, fees, admission process, and facilities.**

Could you please rephrase your question or select one of the quick actions below?
    `;
  }

  // --- 5. Main Send Function (UPDATED QUICK ACTION DISPLAY LOGIC) ---

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // Hide quick actions when the user sends a message
    quickActions.style.display = "none";
    
    addUserMessage(text);
    input.value = "";

    showTyping();

    setTimeout(() => {
      removeTyping();
      const botResponse = getBotReply(text);
      addBotMessage(botResponse);

      // Check if the response is the default fallback message
      const isFallback = botResponse.includes("Couldn't quite understand that");
      
      // If it's the welcome message or any non-fallback/non-navigational response, show quick actions.
      // This ensures quick actions always return after a successful answer.
      if (!isFallback) {
          initializeQuickActions();
      } else {
          // If it IS fallback, initialize the actions to prompt the user
          initializeQuickActions();
      }
      
    }, 600);
  }


  // --- 6. Event Listeners and Initialization ---

  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Re-wire the quick action buttons to call sendMessage with their content
  // Note: The buttons are static in HTML, but dynamically re-set by initializeQuickActions
  document.querySelectorAll(".quick-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      input.value = btn.innerText;
      quickActions.style.display = "none";
      sendMessage();
    });
  });

  // initial greeting and quick actions display
  addBotMessage("Hello! 👋 I am the CAS Vattamkulam AI Assistant. I can help you with College Overview, Courses, Fees, Admission, and Facilities. What would you like to know?");
  initializeQuickActions(); // Show buttons only after the initial welcome
});