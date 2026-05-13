const status = document.getElementById('status');
const transcriptDisplay = document.getElementById('transcript');
const container = document.querySelector('.jarvis-container');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    status.innerText = 'VOICE NOT SUPPORTED';
    transcriptDisplay.innerText = 'Use Chrome or Edge and allow microphone access.';
    console.warn('SpeechRecognition is not supported in this browser.');
} else {
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        container.classList.add('active');
        updateStatus('LISTENING...');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        updateTranscript(`Heard: "${transcript}"`);
        handleCommands(transcript);
    };

    recognition.onend = () => {
        container.classList.remove('active');
        updateStatus('SITTING BY...');
    };

    recognition.onerror = (event) => {
        updateStatus('ERROR');
        updateTranscript(`Problem: ${event.error}`);
        speak('I had trouble hearing you. Please try again.');
    };

    recognition.onnomatch = () => {
        speak('I did not recognize that command.');
    };

    document.getElementById('main-core').addEventListener('click', () => {
        updateStatus('ACTIVATING...');
        recognition.start();
    });
}

function updateStatus(text) {
    status.innerText = text;
}

function updateTranscript(text) {
    transcriptDisplay.innerText = text;
}

function speak(text) {
    const textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.volume = 1;
    textSpeak.pitch = 1;
    window.speechSynthesis.speak(textSpeak);
}

function handleCommands(message) {
    if (message.includes('hello') || message.includes('hey')) {
        speak('Hello Sir. How can I help you today?');
    } else if (message.includes('open google')) {
        window.open('https://google.com', '_blank');
        speak('Opening Google...');
    } else if (message.includes('open github')) {
        window.open('https://github.com/ReyanAhmedcoder/jarvis', '_blank');
        speak('Opening GitHub repository...');
    } else if (message.includes('search for')) {
        const query = message.split('search for')[1].trim();
        if (query) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            speak(`Searching for ${query}`);
        } else {
            speak('Please tell me what to search for.');
        }
    } else if (message.includes('time')) {
        const time = new Date().toLocaleTimeString([], {hour: 'numeric', minute: 'numeric'});
        speak(`The time is ${time}`);
        updateTranscript(`Current time: ${time}`);
    } else if (message.includes('identity')) {
        speak('I am JARVIS, your personal system assistant.');
    } else {
        speak('I am not sure I understand that command yet, Sir.');
    }
}
