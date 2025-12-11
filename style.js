document.addEventListener("DOMContentLoaded", () => {

  const messagesDiv = document.getElementById("messages");
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const quickActions = document.getElementById("quickActions");
  const quickButtonsDiv = quickActions.querySelector('.quick-buttons'); 
  const quickTitle = quickActions.querySelector('.quick-title'); // Reference to the title for click event


  // HIDE QUICK ACTIONS ON LOAD
  quickActions.style.display = 'none';

  // --- 1. Bot Data and Special Actions (UPDATED) ---

  const casData = {
    collegeInfo: `
**College of Applied Science (CAS) Vattamkulam - Basic Details**

We are a leading institute managed by **IHRD**, a Government of Kerala undertaking. We are affiliated with the **University of Calicut**.

•  **Full Form:** College of Applied Science
•  **Year Established:** 2005
•  **Location:** Nellissery, near Edappal, Malappuram District, Kerala.
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

• **Computer Science:** (B.Sc CS Hons, BCA, M.Sc CS)
• **Electronics:** (B.Sc Electronics)
• **Commerce:** (B.Com Hons, M.Com Finance, BBA Logistics Hons)
• **General Department:** (Mathematics, English, etc.)
    `,

    // UPDATED UG COURSES DATA
    ugCourses: `
We offer the following **Undergraduate (UG)** programs:

• **B.Sc Computer Science Honours** (4 years, 36 Seats)
• **BCA** (4 years, 24 Seats)
• **B.Sc Electronics** (3 years, 36 Seats)
• **B.Com with Computer Application (Honours)** (4 years, 48 Seats)
• **BBA Logistics Honours** (4 years, 30 Seats)

Need details on eligibility, fees, or intake for any of these?
    `,

    // UPDATED PG COURSES DATA
    pgCourses: `
We offer the following **Postgraduate (PG)** programs:

• **M.Sc Computer Science** (2 years, 10 Seats)
• **M.Com Finance** (2 years, 15 Seats)

These programs are excellent for career advancement!
    `,

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

    mission: `
To impart quality education and create professionals with high competency and values who can make indelible mark in their respective fields.
    `,
    vision: `
To develop into a contributing Centre of excellence in knowledge and technology creating globally competitive professionals who would contribute positively to the society.
    `,

    // GENERAL FEES: Summarized
    fees: `
The fee structure varies by course. Here are the approximate semester fees (excluding Admission, Alumni, and Caution Deposit fees):

- **B.Sc CS/BCA/B.Sc Electronics:** ₹17,270 per semester
- **B.Com Honours:** ₹13,035 per semester
- **BBA Logistics Honours:** ₹8,470 per semester
- **M.Sc CS:** ₹22,550 per semester
- **M.Com Finance:** ₹18,425 per semester

*Note: SC/ST/OEC students may be eligible for fee concessions and financial grants. All figures are per semester.*
    `,

    // DETAILED COURSE DATA FUNCTION (NEW/UPDATED)
    getCourseDetails: (courseName) => {
        const details = {
            'msc computer science': {
                seats: '10 + marginal increase',
                duration: '2 Years (4 Semesters)',
                eligibility: 'Bachelor of Computer Science',
                selection: 'On the basis of marks of UG course.',
                fees: `
**M.Sc Computer Science Fee Details (Per Semester)**
| Fee Particulars | Amount (₹) |
|---|---|
| Semester Fee | 22,550 |
| Admission Fee | 1,100 |
| Alumni Fee | 200 |
| Caution Deposit (Refundable) | 1,000 |
*Note: Total payable at admission is ₹24,850. SC/ST/OEC students may be eligible for exemption.*
                `
            },
            'mcom finance': {
                seats: '15 + marginal increase',
                duration: '2 Years (4 Semesters)',
                eligibility: 'Bachelor of Commerce',
                selection: 'On the basis of marks of UG course.',
                fees: `
**M.Com Finance Fee Details (Per Semester)**
| Fee Particulars | Amount (₹) |
|---|---|
| Semester Fee | 18,425 |
| Admission Fee | 1,100 |
| Alumni Fee | 200 |
| Caution Deposit (Refundable) | 1,000 |
*Note: Total payable at admission is ₹20,725. SC/ST/OEC students may be eligible for exemption.*
                `
            },
            'bsc computer science': {
                seats: '36 + marginal increase',
                duration: '4 Years (8 Semesters) - Honours',
                eligibility: 'Higher Secondary or Equivalent with Maths or Electronics',
                selection: 'On the basis of marks of optional subjects at higher secondary course.',
                fees: `
**B.Sc Computer Science Fee Details (Per Semester)**
| Fee Particulars | Amount (₹) |
|---|---|
| Semester Fee | 17,270 |
| Admission Fee | 330 |
| Alumni Fee | 200 |
| Caution Deposit (Refundable) | 1,000 |
*Note: Total payable at admission is ₹18,800. SC/ST/OEC students may be eligible for exemption.*
                `
            },
            'bca': {
                seats: '24',
                duration: '4 Years (8 Semesters)',
                eligibility: 'HSE or equivalent with Mathematics/ Computer Science/Computer Application/ IT/Informatics Practice/Informatics/ Additional Mathematics.',
                selection: 'On the basis of marks of optional subjects at higher secondary course.',
                fees: `
**BCA Fee Details (Per Semester)**
| Fee Particulars | Amount (₹) |
|---|---|
| Semester Fee | 17,270 |
| Admission Fee | 330 |
| Alumni Fee | 200 |
| Caution Deposit (Refundable) | 1,000 |
*Note: Total payable at admission is ₹18,800. SC/ST/OEC students may be eligible for exemption.*
                `
            },
            'bba logistics': {
                seats: '30',
                duration: '4 Years (8 Semesters) - Honours',
                eligibility: 'HSE or equivalent with not less than 45%. 5% concession for OBC/OEC. Pass only for SC/ST.',
                selection: 'On the basis of marks of optional subjects at higher secondary course.',
                fees: `
**BBA Logistics Honours Fee Details (Per Semester)**
| Fee Particulars | Amount (₹) |
|---|---|
| Semester Fee | 8,470 |
| Admission Fee | 330 |
| Alumni Fee | 200 |
| Caution Deposit (Refundable) | 1,000 |
*Note: Total payable at admission is ₹10,000. SC/ST/OEC students may be eligible for exemption.*
                `
            },
            'bsc electronics': {
                seats: '36 + marginal increase',
                duration: '3 Years (6 Semesters)',
                eligibility: 'Higher Secondary or Equivalent with Maths or Electronics',
                selection: 'On the basis of marks of optional subjects at higher secondary course.',
                fees: `
**B.Sc Electronics Fee Details (Per Semester)**
| Fee Particulars | Amount (₹) |
|---|---|
| Semester Fee | 17,270 |
| Admission Fee | 330 |
| Alumni Fee | 200 |
| Caution Deposit (Refundable) | 1,000 |
*Note: Total payable at admission is ₹18,800. SC/ST/OEC students may be eligible for exemption.*
                `
            },
            'bcom honours': {
                seats: '48 + marginal increase',
                duration: '4 Years (8 Semesters)',
                eligibility: 'Higher Secondary or Equivalent.',
                selection: 'On the basis of marks of optional subjects at higher secondary course.',
                fees: `
**B.Com Honours Fee Details (Per Semester)**
| Fee Particulars | Amount (₹) |
|---|---|
| Semester Fee | 13,035 |
| Admission Fee | 330 |
| Alumni Fee | 200 |
| Caution Deposit (Refundable) | 1,000 |
*Note: Total payable at admission is ₹14,565. SC/ST/OEC students may be eligible for exemption.*
                `
            }
        }[courseName];

        if (!details) return null;

        return `
**Details for ${courseName.toUpperCase()}:**

• **Duration:** ${details.duration}
• **Seats:** ${details.seats}
• **Eligibility:** ${details.eligibility}
• **Mode of Selection:** ${details.selection}

${details.fees}

*Note: PTA Fee & University affiliation fee are not included in the fee lists.*
        `;
    },


    admission: `
### 🎓 Admission Procedure (UG & PG Courses)

Admission to all courses is conducted through a dual-quota system:
* **University Quota (50%):** Filled through the University of Calicut CAP portal.
* **IHRD / Management Quota (50%):** Filled directly through the IHRD admission portal (**www.ihrdadmissions.org**).

---
#### **1. Undergraduate (UG) Admission**

* **Time of Notification:** After the publication of the Kerala Govt. +2 results.
* **Course Intake (Total Seats mentioned in UG section):**
    * B.Sc Computer Science Honours: **36 seats**
    * BCA: **24 seats**
    * B.Sc Electronics: **36 seats**
    * B.Com Honours: **48 seats** (Note: Previous data mentioned 60, but UG list shows 48 seats for B.Com Hons)
    * BBA Logistics Honours: **30 seats**
* **Application Requirement:** Applicants must apply through **both** the Calicut University single-window system (CAP) and the IHRD online admission portal for IHRD/Management quota consideration.

---
#### **2. Postgraduate (PG) Admission**

* **Time of Notification:** After the publication of the Calicut University Degree results.
* **Course Intake (Total Seats):**
    * M.Sc Computer Science: **10 seats**
    * M.Com Finance: **15 seats**
* **Application Requirement:** Applicants must apply through **both** the Calicut University single-window procedure and the IHRD online admission portal for IHRD/Management quota consideration.

Be sure to check both portals for official notifications and deadlines!
    `,

    facilities: `
We provide excellent facilities to support your learning:

• **Modern Computer Lab** (fully equipped)
• **Electronics Lab**
• **Comprehensive Library**
• **Open Gym** for fitness
• **NSS Unit** and dedicated **Placement Support** team.
    `
  };


  // --- 2. Quick Action Button Definitions (UPDATED) ---
  const allQuickActions = [
      'Show all courses',
      'Admission procedure',
      'Contact details',
      'Facilities available',
      'What is the fee structure?',
      'B.Sc Computer Science details',
      'BCA details',
      'B.Sc Electronics details',
      'B.Com Honours details',
      'BBA Logistics Honours details',
      'M.Sc Computer Science details',
      'M.Com Finance details',
      'Clubs and activities',
      'What is the mission and vision?'
  ];


  // --- 3. Helper Functions for UI and Logic ---

  function createQuickActions(buttons) {
      quickButtonsDiv.innerHTML = ''; // Clear old buttons
      
      buttons.forEach(btnText => {
          const button = document.createElement('button');
          button.className = 'quick-btn';
          button.textContent = btnText;
          button.addEventListener('click', () => {
              // Hide quick actions for a clean transition
              quickActions.style.display = 'none'; 
              // Set input value and trigger sendMessage
              input.value = button.textContent;
              sendMessage();
          });
          quickButtonsDiv.appendChild(button);
      });

      quickActions.style.display = 'block'; // Ensure the container is visible
  }

  function initializeQuickActions() {
      // Set the full list of actions
      createQuickActions(allQuickActions);
      // Ensure the dropdown is collapsed initially
      quickActions.classList.remove('expanded');
      // Set the title text
      quickTitle.querySelector('span').textContent = 'Quick Questions: Click to expand menu';
      // Re-create lucide icons if they were dynamically changed
      lucide.createIcons();
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


  // --- 4. Reply Logic (UPDATED MATCHING) ---

  function getBotReply(message) {
    const msg = message.toLowerCase();

    // Specific Course Details
    if (msg.includes("m.sc computer science") || msg.includes("msc cs"))
        return casData.getCourseDetails('msc computer science');
    if (msg.includes("m.com finance") || msg.includes("mcom finance"))
        return casData.getCourseDetails('mcom finance');
    if (msg.includes("b.sc computer science") || msg.includes("bsc cs"))
        return casData.getCourseDetails('bsc computer science');
    if (msg.includes("bca"))
        return casData.getCourseDetails('bca');
    if (msg.includes("bba logistics") || msg.includes("bba hons"))
        return casData.getCourseDetails('bba logistics');
    if (msg.includes("b.sc electronics") || msg.includes("bsc electronics"))
        return casData.getCourseDetails('bsc electronics');
    if (msg.includes("b.com honours") || msg.includes("bcom hons"))
        return casData.getCourseDetails('bcom honours');


    // General Info & Welcome
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hai"))
      return "Hello! 👋 I am the CAS Vattamkulam AI Assistant. How can I assist you with information about the college today?";
    
    if (msg.includes("full form") || msg.includes("cas full form") || msg.includes("cas means"))
      return casData.fullForm;

    if (msg.includes("about the college") || msg.includes("about cas") || msg.includes("what is cas"))
      return casData.collegeInfo + "\n\nWhat other details are you looking for?";
      
    if (msg.includes("year") || msg.includes("established") || msg.includes("started") || msg.includes("when"))
      return "The College of Applied Science, Vattamkulam was proudly established in **2005** and has been serving students for almost two decades.";

    if (msg.includes("activities") || msg.includes("club") || msg.includes("association"))
        return casData.activities;

    if (msg.includes("mission") && msg.includes("vision"))
        return "Our guiding principles are:\n\n**Mission:** " + casData.mission + "\n\n**Vision:** " + casData.vision;
    if (msg.includes("mission"))
        return casData.mission;
    if (msg.includes("vision"))
        return casData.vision;


    // Specific Topics
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

    if (/(facility|facilities|infrastructure|lab|library|gym)/.test(msg))
      return casData.facilities;

    // Default/Fallback
    return `
I'm sorry, I couldn't quite understand that. 😟 

I specialize in answering questions about CAS Vattamkulam's **courses, fees, admission process, and facilities.**

Could you please rephrase your question or select an option from the menu?
    `;
  }

  // --- 5. Main Send Function ---

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // Always collapse and hide quick actions before sending
    quickActions.classList.remove('expanded');
    quickActions.style.display = "none";
    
    addUserMessage(text);
    input.value = "";

    showTyping();

    setTimeout(() => {
      removeTyping();
      const botResponse = getBotReply(text);
      addBotMessage(botResponse);

      // Re-initialize and show quick actions after every reply
      initializeQuickActions();
      
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

  // NEW: Dropdown Toggle Listener on the title
  quickTitle.addEventListener("click", () => {
    quickActions.classList.toggle('expanded'); // Toggle class for CSS control
    // Re-create icons to apply the rotation/change
    lucide.createIcons();
  });


  // initial greeting and quick actions display
  addBotMessage("Hello! 👋 I am the CAS Vattamkulam AI Assistant. I can help you with College Overview, Courses, Fees, Admission, and Facilities. What would you like to know?");
  initializeQuickActions();
});
