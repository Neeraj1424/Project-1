const chatbot = {
    qIndex: 0,
    answers: [],
    questions: [
        {
            question: "What symptoms are you experiencing?",
            options: ["Fever/cough", "Stomach issues", "Joint pain", "Headaches"]
        },
        {
            question: "How long have you had symptoms?",
            options: ["<1 week", "1-2 weeks", ">1 month"]
        },
        {
            question: "Any other symptoms?",
            options: ["Breathing issues", "Chest pain", "None"]
        }
    ],
    conditions: {
        "Fever/cough,<1 week,Breathing issues": {
            diagnosis: ["Pneumonia/COVID-19"],
            remedies: ["Steam inhalation", "Hydration", "Rest"],
            doctors: ["Pulmonologist"]
        },
        "Stomach issues,>1 month,None": {
            diagnosis: ["Chronic Gastritis"],
            remedies: ["Bland diet", "Probiotics", "Small meals"],
            doctors: ["Gastroenterologist"]
        }
    },
    doctors: {
        "Pulmonologist": [
            {name: "Dr. A. Mehta", contact: "9876543210", hospital: "City Chest Clinic"}
        ],
        "Gastroenterologist": [
            {name: "Dr. R. Sharma", contact: "9998887776", hospital: "Digestive Care Center"}
        ]
    },
    init() {
        document.getElementById('chatBotButton').addEventListener('click', () => this.toggleChat());
        document.getElementById('closeChat').addEventListener('click', () => this.closeChat());
    },
    toggleChat() {
        const chatBox = document.getElementById('chatBox');
        chatBox.style.display = chatBox.style.display === 'block' ? 'none' : 'block';
        if (chatBox.style.display === 'block') this.startChat();
    },
    startChat() {
        this.qIndex = 0;
        this.answers = [];
        this.displayQuestion();
    },
    displayQuestion() {
        const content = document.getElementById('chatContent');
        content.innerHTML = '';
        
        if (this.qIndex < this.questions.length) {
            const q = this.questions[this.qIndex];
            let html = `<div class="chat-message bot-message">${q.question}</div><div class="options-container">`;
            q.options.forEach(opt => html += `<div class="option-button" onclick="chatbot.recordAnswer('${opt}')">${opt}</div>`);
            content.innerHTML = html + '</div>';
        } else {
            this.showDiagnosis();
        }
    },
    recordAnswer(answer) {
        this.answers.push(answer);
        document.getElementById('chatContent').innerHTML += 
            `<div class="chat-message user-message">${answer}</div>`;
        this.qIndex++;
        setTimeout(() => this.displayQuestion(), 500);
    },
    showDiagnosis() {
        const key = this.answers.join(',');
        const result = this.conditions[key] || {
            diagnosis: ["General Consultation Needed"],
            remedies: ["Maintain hydration", "Monitor symptoms"],
            doctors: ["General Physician"]
        };
        
        let html = `<div class="diagnosis-card">
            <h4>Possible Conditions: ${result.diagnosis.join(', ')}</h4>
            <p>Home Remedies:<br>${result.remedies.join(', ')}</p>
            <p>Recommended Specialists:<br>`;
        
        result.doctors.forEach(type => {
            html += `${this.doctors[type][0].name} (${type}) - ${this.doctors[type][0].contact}<br>`;
        });
        
        document.getElementById('chatContent').innerHTML += 
            `<div class="chat-message bot-message">${html}</div>`;
    },
    closeChat() {
        document.getElementById('chatBox').style.display = 'none';
        this.qIndex = 0;
        this.answers = [];
    }
};

document.addEventListener('DOMContentLoaded', () => chatbot.init());