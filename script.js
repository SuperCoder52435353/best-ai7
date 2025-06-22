// script.js
import { getAIResponse } from './brain/brain.js';

const input = document.getElementById('userInput');
const chat = document.getElementById('chat');
const voiceBtn = document.getElementById('voiceStart');
const toggleBtn = document.getElementById('toggleTheme');

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function handleUserInput() {
  const question = input.value.trim();
  if (!question) return;
  addMessage(question, 'user');
  input.value = '';

  setTimeout(async () => {
    const answer = await getAIResponse(question);
    addMessage(answer, 'bot');
    speak(answer);
  }, 300);
}

function speak(text) {
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'uz-UZ';
    window.speechSynthesis.speak(utter);
  }
}

voiceBtn.addEventListener('click', () => {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'uz-UZ';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start();
  voiceBtn.innerText = "🎤...";
  recognition.onresult = e => {
    input.value = e.results[0][0].transcript;
    handleUserInput();
    voiceBtn.innerText = "🎤";
  };
  recognition.onerror = () => {
    alert("Ovozda xatolik.");
    voiceBtn.innerText = "🎤";
  };
});

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

input.addEventListener('keypress', e => {
  if (e.key === 'Enter') handleUserInput();
});
import { getAIResponse } from './brain/brain.js';
import { getAIResponse } from './brain/brain.js';
import { getAIResponse } from './brain/brain.js';
