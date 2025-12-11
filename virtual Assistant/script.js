// Selecting the DOM elements
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelectorAll(".ring");

//speak function
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
}

//greeting function
function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

// Greet when the window loads
window.addEventListener("load", () => {
    wishMe();
});

//Speech Recognition
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let text = event.results[currentIndex][0].transcript;
    content.innerText = text;
    takeCommand(text.toLowerCase());
};

// Button click to start recognition
btn.addEventListener("click", () => {
    recognition.start();
    voice.forEach(el => el.style.display = "flex");
    btn.style.display = "none";
});

// joke data
let jokes = [
    "Why don’t scientists trust atoms? Because they make up everything!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "Why can’t your nose be 12 inches long? Because then it would be a foot!",
    "Why don't skeletons fight each other? They don't have the guts.",
    "I'm reading a book on anti-gravity. It's impossible to put down!"
];

// Fact data
let facts = [
    "Did you know? Honey never spoils.",
    "Bananas are berries, but strawberries aren’t.",
    "Octopuses have three hearts.",
    "The Eiffel Tower can grow taller in summer.",
    "Humans share about 60% of DNA with bananas."
];

let lastJokeIndex = -1;
let lastFactIndex = -1;

// non-repeating function
function getRandomNonRepeating(arr, lastIndexVar) {
    let index;
    do {
        index = Math.floor(Math.random() * arr.length);
    } while (index === lastIndexVar);
    return [arr[index], index];
}

//  Command Map
const commandMap = [

    { name: "greet", patterns: [/hello/i, /hi/i, /hey/i], response: "Hello Sir! How can I assist you today?" },
    { name: "morning", patterns: [/good morning/i], response: "Good morning! Hope you have a productive day!" },
    { name: "afternoon", patterns: [/good afternoon/i], response: "Good afternoon! How may I help?" },
    { name: "evening", patterns: [/good evening/i], response: "Good evening! What can I do for you?" },
    { name: "who", patterns: [/who are you/i], response: "I'm ALEX your intelligent assistant created by Subhendu." },
    { name: "creator", patterns: [/who.*created you/i], response: "I was created by Subhendu Sekhar Sahu." },
    { name: "time", patterns: [/what.*time/i, /current time/i], response: () => new Date().toLocaleTimeString() },
    { name: "date", patterns: [/what.*date/i, /today.*date/i], response: () => new Date().toLocaleDateString() },
// Important websites
    { name: "youtube", patterns: [/open youtube/i], response: "Opening YouTube...", action: () => window.open("https://youtube.com", "_blank") },
    { name: "google", patterns: [/open google/i], response: "Opening Google...", action: () => window.open("https://google.com", "_blank") },
    { name: "facebook", patterns: [/open facebook/i], response: "Opening Facebook...", action: () => window.open("https://facebook.com", "_blank") },
    { name: "instagram", patterns: [/open instagram/i], response: "Opening Instagram...", action: () => window.open("https://instagram.com", "_blank") },
    { name: "linkedin", patterns: [/open linkedin/i], response: "Opening LinkedIn...", action: () => window.open("https://linkedin.com", "_blank") },
    { name: "github", patterns: [/open github/i], response: "Opening GitHub...", action: () => window.open("https://github.com", "_blank") },
    { name: "twitter", patterns: [/open twitter/i], response: "Opening Twitter...", action: () => window.open("https://twitter.com", "_blank") },
    { name: "reddit", patterns: [/open reddit/i], response: "Opening Reddit...", action: () => window.open("https://reddit.com", "_blank") },
    { name: "stackoverflow", patterns: [/open stack.?overflow/i], response: "Opening StackOverflow...", action: () => window.open("https://stackoverflow.com", "_blank") },
// Desktop apps
    { name: "calculator", patterns: [/open calculator/i], response: "Opening calculator ...", action: () =>  window.open("calculator://") },
    { name: "notepad", patterns: [/open notepad/i], response: "Opening notepad ...", action: () =>  window.open("notepad://") },
    { name: "cmd", patterns: [/open command prompt|open cmd/i], response: "Opening command prompt...", action: () =>  window.open("command prompt://") },
    { name: "paint", patterns: [/open paint/i], response: "Opening paint ...", action: () =>  window.open("paint://") },
    { name: "whatsapp", patterns: [/open whatsapp/i], response: "Opening WhatsApp ...", action: () => window.open("whatsapp://") },

//Math Functions
    {
    name: "math",
    patterns: [
        /^[0-9\+\-\*\/\.\(\)\s]+$/,
        /what is ([0-9\s\+\-\*\/\.\(\)]+)$/i,
        /calculate ([0-9\s\+\-\*\/\.\(\)]+)$/i
    ],
    response: (match) => {
        try {
            let expression = match[1] || match[0];
            const result = Function('"use strict";return (' + expression + ')')();
            return `The answer is ${result}.`;
        } catch {
            return "Sorry, I couldn't calculate that.";
        }
    }
   },

   //jokes
     {
        name: "joke",
        patterns: [/joke/i, /make me laugh/i, /funny/i],
        response: () => {
            const [joke, index] = getRandomNonRepeating(jokes, lastJokeIndex);
            lastJokeIndex = index;
            return joke;
        }
    },

    //facts
    {
        name: "fact",
        patterns: [/fact/i, /tell me something/i],
        response: () => {
            const [fact, index] = getRandomNonRepeating(facts, lastFactIndex);
            lastFactIndex = index;
            return fact;
        }
    },

    // Introduction
    {
        name: "my_name",
        patterns: [/my name is (.+)/i],
        response: (match) => {
            localStorage.setItem("userName", match[1].trim());
            return `Nice to meet you, ${match[1].trim()}!`;
        }
    },
    // Recall
    {
        name: "remember_name",
        patterns: [/what'?s my name/i],
        response: () => {
            const name = localStorage.getItem("userName");
            return name ? `Your name is ${name}.` : "I don't know your name yet.";
        }
    },

    // Search google
    {
        name: "search",
        patterns: [/search (.+)/i],
        response: (match) => `Searching Google for ${match[1]}...`,
        action: (match) => window.open(`https://www.google.com/search?q=${match[1]}`, "_blank")
    },

    //weather
    {
        name: "weather",
        patterns: [/weather/i],
        response: "I am not connected to the internet, but you can check weather on Google.",
        action: () => window.open("https://www.google.com/search?q=weather", "_blank")
    },

    //Farewell
    { name: "goodbye", patterns: [/goodbye|bye|see you/i], response: "Goodbye! Have a nice day!" }
];

// Command Processing

function takeCommand(message) {
    voice.forEach(el => el.style.display = "none");
    btn.style.display = "flex";
    let found = false;

    for (let cmd of commandMap) {
        for (let pattern of cmd.patterns) {
            const match = message.match(pattern);
            if (match) {
                let response = typeof cmd.response === "function" ? cmd.response(match) : cmd.response;
                speak(response);
                if (cmd.action) {
                    if (typeof cmd.action === "function") {
                        cmd.action(match);
                    } else {
                        window.open(cmd.action, "_blank");
                    }
                }
                found = true;
                break;
            }
        }
        if (found) break;
    }

    // Default fallback command
    if (!found) {
        speak("Let me search on google.");
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
};
