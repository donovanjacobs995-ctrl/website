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

document.addEventListener('DOMContentLoaded', type);
