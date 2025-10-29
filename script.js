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
    "hello": "Hello! How can I help you today? You can ask me about buying comfortable shoes or the benefits of foot care."
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

    return "I'm sorry, I don't have an answer for that. Please ask me about buying comfortable shoes or the benefits of foot care.";
}

function handleUserInput() {
    const userInput = chatbotInput.value;
    if (userInput.trim() === '') return;

    addMessage(userInput, 'user');
    const botResponse = getBotResponse(userInput);
    setTimeout(() => addMessage(botResponse, 'bot'), 500);

    chatbotInput.value = '';
}

openChatbotButton.addEventListener('click', () => {
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
