const status = document.getElementById('status');
const container = document.querySelector('.jarvis-container');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
    container.classList.add('active');
    status.innerText = "LISTENING...";
};

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    handleCommands(transcript);
};

recognition.onend = () => {
    container.classList.remove('active');
    status.innerText = "SITTING BY...";
};

// Start listening when clicking the core
document.getElementById('main-core').addEventListener('click', () => {
    recognition.start();
});

function speak(text) {
    const textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.volume = 1;
    textSpeak.pitch = 1;
    window.speechSynthesis.speak(textSpeak);
}

function handleCommands(message) {
    if (message.includes('hello') || message.includes('hey')) {
        speak("Hello Sir. How can I help you today?");
    } else if (message.includes('open google')) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"});
        speak("The time is " + time);
    } else if (message.includes('identity')) {
        speak("I am JARVIS, your personal system assistant.");
    } else {
        speak("I'm not sure I understand that command yet, Sir.");
    }
}