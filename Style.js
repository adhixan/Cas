// style.js

document.addEventListener("DOMContentLoaded", () => {

  const messagesDiv = document.getElementById("messages");
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const quickActions = document.getElementById("quickActions");

  // College data (ENHANCED for all topics)
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

    // **DATA for Quick Actions**
    courses: `
📚 **Courses Offered at CAS Vattamkulam:**
We offer the following undergraduate programs, all affiliated with the University of Calicut:

1.  **B.Sc. Computer Science** (3 Years)
2.  **B.Sc. Electronics** (3 Years)
3.  **B.Com. with Computer Application** (3 Years)
    `,

    admission: `
📋 **Admission Procedure**
Admissions are primarily managed centrally by **IHRD (Institute of Human Resources Development)**.

1.  **Application:** You must apply online through the IHRD Centralised Allotment Process (CAP).
2.  **Eligibility:** Check the detailed eligibility criteria (e.g., qualifying marks, subjects) for the specific course on the IHRD website.
3.  **Allotment:** Seats are allotted based on your rank/index marks and reservation policies.
    `,

    facilities: `
🏛️ **Campus Facilities**
The college provides modern facilities to support a great learning environment:

* Well-equipped Computer Labs and Electronics Labs.
* A comprehensive Library with a wide collection of books and journals.
* High-speed Wi-Fi access across the campus.
* Separate Hostel facilities for boys and girls.
* A dedicated college canteen.
    `
  };


  // **NEW: Keyword-Reply Map for AI-like analysis**
  const keywordMap = [
    { keywords: ["hi", "hello", "hey", "greeting", "start"], reply: "👋 Hello! I'm your AI Assistant for College of Applied Science (CAS) Vattamkulam. How can I help you today?" },
    { keywords: ["contact", "phone", "email", "number", "reach", "address"], reply: casData.contact },
    { keywords: ["full form", "fullform", "cas meaning", "what is cas"], reply: casData.fullForm },
    { keywords: ["principal", "head", "sir name", "principal's name"], reply: casData.principal },
    { keywords: ["info", "basic", "details", "college info", "about us", "location", "established", "affiliate", "university"], reply: casData.collegeInfo },
    { keywords: ["course", "courses", "programs", "degrees", "bachelor", "bsc", "bcom"], reply: casData.courses },
    { keywords: ["admission", "procedure", "apply", "how to join", "eligibility"], reply: casData.admission },
    { keywords: ["facility", "facilities", "available", "lab", "hostel", "library", "canteen", "wifi", "internet"], reply: casData.facilities }
  ];


  // **NEW: Improved getBotReply Function with AI-like logic**
  function getBotReply(msg) {
    const normalizedMsg = msg.toLowerCase().trim();

    // Iterate through the keyword map to find the best match (AI-like analysis)
    for (const item of keywordMap) {
      for (const keyword of item.keywords) {
        if (normalizedMsg.includes(keyword)) {
          // Converts markdown (**) to HTML for bold text
          return item.reply.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').trim(); 
        }
      }
    }

    // Default reply if no keyword matches
    return "I am still learning! Please try rephrasing your question or selecting one of the quick actions. I can answer questions about courses, contact, admissions, and facilities.";
  }

  // Helper functions for Chat UI
  function addUserMessage(text) {
    const message = document.createElement("div");
    message.className = "message message-user";
    message.innerHTML = `
      <div class="bubble bubble-user">${text}</div>
      <div class="user-icon"><i data-lucide="user"></i></div>
    `;
    messagesDiv.appendChild(message);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    lucide.createIcons();
  }

  function addBotMessage(text) {
    const message = document.createElement("div");
    message.className = "message message-bot";
    message.innerHTML = `
      <div class="bot-icon"><i data-lucide="bot"></i></div>
      <div class="bubble bubble-bot">${text}</div>
    `;
    messagesDiv.appendChild(message);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    lucide.createIcons();
  }

  function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "message message-bot typing-message";
    typingDiv.id = "typing";
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

  function sendMessage(text) {
    const messageText = text || input.value.trim();
    if (!messageText) return;

    // Hide quick actions on first message
    quickActions.style.display = "none";
    
    addUserMessage(messageText);
    input.value = "";

    showTyping();

    setTimeout(() => {
      removeTyping();
      // The AI logic is in getBotReply(messageText)
      addBotMessage(getBotReply(messageText));
    }, 600);
  }

  // Event Listeners
  sendBtn.addEventListener("click", () => sendMessage());

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Quick Action Buttons Listener
  document.querySelectorAll(".quick-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      // Sends the button's text as a user message
      sendMessage(btn.textContent);
    });
  });

  // Initial Welcome Message
  setTimeout(() => {
    addBotMessage(getBotReply("start"));
  }, 500);

});
