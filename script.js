// Seletores
const micButton = document.getElementById("micButton");
const userInput = document.getElementById("userInput");
const sendMessageButton = document.getElementById("sendMessageButton");
const chatBox = document.querySelector(".chat-box");

// Verifica se a API SpeechRecognition está disponível no navegador
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = true; // Para continuar a captura até que o usuário pare de falar
  recognition.lang = "pt-BR"; // Define o idioma para português
  recognition.interimResults = true; // Mostra os resultados parciais durante o reconhecimento

  recognition.onstart = () => {
    micButton.classList.add("active"); // Adiciona uma classe quando o microfone estiver ativo
  };

  recognition.onend = () => {
    micButton.classList.remove("active"); // Remove a classe quando o microfone parar
  };

  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }

    // Atualiza o campo de entrada com a transcrição do microfone
    userInput.value = transcript;
  };

  micButton.addEventListener("click", () => {
    if (micButton.classList.contains("active")) {
      recognition.stop(); // Para o reconhecimento se o microfone já estiver ativo
    } else {
      recognition.start(); // Inicia o reconhecimento de fala
    }
  });
} else {
  alert("Desculpe, a funcionalidade de reconhecimento de voz não é suportada neste navegador.");
}

// Função para enviar mensagem ao assistente
sendMessageButton.addEventListener("click", () => {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    const userMessageElement = document.createElement("div");
    userMessageElement.textContent = userMessage;
    chatBox.appendChild(userMessageElement);
    userInput.value = ""; // Limpa o campo de entrada

    // Resposta simulada do assistente
    const assistantMessage = document.createElement("div");
    assistantMessage.textContent = "Estou processando sua pergunta...";
    chatBox.appendChild(assistantMessage);

    // Simulação de resposta após 2 segundos
    setTimeout(() => {
      assistantMessage.textContent = "Resposta automatizada: Não sei a resposta ainda!";
      assistantMessage.classList.add("fade-in"); // Adiciona animação
    }, 2000);
  }
});
