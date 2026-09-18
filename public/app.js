async function sendMessage() {
  const input = document.getElementById("message");
  const chat = document.getElementById("chat");

  const message = input.value.trim();

  if (!message) return;

  // Show user's message
  const userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.textContent = message;
  chat.appendChild(userMessage);

  input.value = "";

  // Show thinking message
  const thinking = document.createElement("div");
  thinking.className = "message bot";
  thinking.textContent = "Kamar AI is thinking...";
  chat.appendChild(thinking);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    thinking.textContent = data.reply || "Sorry, I couldn't respond.";

  } catch (error) {
    thinking.textContent =
      "I couldn't connect to Kamar AI. Please try again.";
  }

  chat.scrollTop = chat.scrollHeight;
}

// Press Enter to send
document.getElementById("message").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});