const typewriterElement = document.getElementById('typewriter');
const text = "Welcome to FutureSphere";
let index = 0;

function type() {
    if (index < text.length) {
        typewriterElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 100);
    }
}

function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    document.getElementById('datetime-container').textContent = dateTimeString;
}

document.addEventListener('DOMContentLoaded', () => {
    type();
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

const openChatbotButton = document.getElementById('open-chatbot');
const closeChatbotButton = document.getElementById('close-chatbot');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSubmit = document.getElementById('chatbot-submit');

const knowledgeBase = {
    "how do I buy comfortable shoes?": "When buying shoes, look for good arch support, a cushioned insole, and a wide toe box. Make sure there's about half an inch of space between your longest toe and the end of the shoe. It's best to shop for shoes in the afternoon when your feet are slightly swollen.",
    "what are the benefits of caring for my feet?": "Good foot care can prevent common problems like blisters, calluses, and fungal infections. It can also improve your posture and reduce strain on your back and knees. Regularly massaging your feet can also improve circulation and reduce stress.",
    "how often should I replace my shoes?": "For running or athletic shoes, it's recommended to replace them every 300-500 miles. For casual shoes, replace them when you see visible signs of wear and tear, or when they no longer feel supportive.",
    "what kind of socks are best?": "Moisture-wicking socks made from materials like wool, nylon, or polyester are best for keeping your feet dry and preventing blisters. Avoid 100% cotton socks, as they retain moisture.",
    "hello": "Hello! How can I help you today? You can ask me about shoes, technology, or education.",
    // New Technology questions
    "what is artificial intelligence?": "Artificial Intelligence (AI) is a branch of computer science that aims to create intelligent machines that can perform tasks that typically require human intelligence, such as learning, problem-solving, and decision-making.",
    "what is blockchain?": "Blockchain is a decentralized, distributed, and often public, digital ledger consisting of records called blocks that is used to record transactions across many computers so that any involved block cannot be altered retroactively, without the alteration of all subsequent blocks.",
    "what is the internet of things?": "The Internet of Things (IoT) is a system of interrelated computing devices, mechanical and digital machines, objects, animals or people that are provided with unique identifiers (UIDs) and the ability to transfer data over a network without requiring human-to-human or human-to-computer interaction.",
    "what is quantum computing?": "Quantum computing is a type of computing that uses the principles of quantum mechanics to perform calculations. It has the potential to solve certain problems much faster than classical computers.",
    // New Education questions
    "what are the benefits of online learning?": "Online learning offers flexibility, allowing you to learn from anywhere at your own pace. It can also be more affordable than traditional education and provides access to a wider range of courses and programs.",
    "what is project-based learning?": "Project-based learning is a teaching method in which students learn by actively engaging in real-world and personally meaningful projects. It encourages critical thinking, collaboration, and creativity.",
    "what is the importance of early childhood education?": "Early childhood education is crucial for a child's brain development. It helps build a strong foundation for lifelong learning and well-being, and it can improve social, emotional, and cognitive skills.",
    "what are some effective study techniques?": "Effective study techniques include active recall (testing yourself), spaced repetition (reviewing information at increasing intervals), and the Feynman technique (explaining a concept in simple terms). It's also important to get enough sleep and take regular breaks."
};

function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chatbot-message', sender); // sender is 'user' or 'bot'
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotResponse(userInput) {
    const input = userInput.toLowerCase().trim();

    // Use keywords for matching
    if (input.includes("comfort") || (input.includes("buy") && input.includes("shoes"))) {
        return knowledgeBase["how do I buy comfortable shoes?"];
    }
    if (input.includes("care") || input.includes("feet")) {
        return knowledgeBase["what are the benefits of caring for my feet?"];
    }
    if (input.includes("replace") || input.includes("often")) {
        return knowledgeBase["how often should I replace my shoes?"];
    }
    if (input.includes("socks")) {
        return knowledgeBase["what kind of socks are best?"];
    }
    if (input.includes("hello") || input.includes("hi")) {
        return knowledgeBase["hello"];
    }
    // New Technology keywords
    if (input.includes("artificial intelligence") || input.includes("ai")) {
        return knowledgeBase["what is artificial intelligence?"];
    }
    if (input.includes("blockchain")) {
        return knowledgeBase["what is blockchain?"];
    }
    if (input.includes("internet of things") || input.includes("iot")) {
        return knowledgeBase["what is the internet of things?"];
    }
    if (input.includes("quantum computing")) {
        return knowledgeBase["what is quantum computing?"];
    }
    // New Education keywords
    if (input.includes("online learning")) {
        return knowledgeBase["what are the benefits of online learning?"];
    }
    if (input.includes("project-based learning")) {
        return knowledgeBase["what is project-based learning?"];
    }
    if (input.includes("early childhood education")) {
        return knowledgeBase["what is the importance of early childhood education?"];
    }
    if (input.includes("study techniques")) {
        return knowledgeBase["what are some effective study techniques?"];
    }

    return "I'm sorry, I don't have an answer for that. You can ask me about shoes, technology, or education.";
}

function handleUserInput() {
    const userInput = chatbotInput.value;
    if (userInput.trim() === '') return;

    addMessage(userInput, 'user');
    const botResponse = getBotResponse(userInput);
    setTimeout(() => addMessage(botResponse, 'bot'), 500);

    chatbotInput.value = '';
}

const exploreFutureButton = document.getElementById('explore-future-btn');

openChatbotButton.addEventListener('click', () => {
    chatbotContainer.style.display = 'flex';
    openChatbotButton.style.display = 'none';
});

exploreFutureButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the anchor tag from navigating
    chatbotContainer.style.display = 'flex';
    openChatbotButton.style.display = 'none';
});

closeChatbotButton.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
    openChatbotButton.style.display = 'block';
});

chatbotSubmit.addEventListener('click', handleUserInput);
chatbotInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleUserInput();
    }
});
