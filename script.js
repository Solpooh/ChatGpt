// show message as an outgoing chat
const charInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");

let userText = null;

const createElement = (html, className) => {
    // Create new div and apply chat, specified class and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = html;
    return chatDiv;  // Return the created chat div
}

const showTypingAnimation = () => {
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="images/chatbot.jpg" alt="chatbot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span class="material-symbols-rounded">content_copy</span>
                </div>`;
    // Create an incoming chat div with user's message and append it to chat container
    const outgoingChatDiv = createElement(html, "incoming");
    chatContainer.appendChild(outgoingChatDiv);
}
const handleOutgoingChat = () => {
    userText = charInput.value.trim(); // Get charInput value and remove extra spaces
    // console.log(userText);
    // 보낸 채팅을 화면 메인에 보이기
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="images/user.jpg" alt="user-img">
                        <p>${userText}</p>
                    </div>
                </div>`;
    // Create an outgoing chat div with user's message and append it to chat container
    const outgoingChatDiv = createElement(html, "outgoing");
    chatContainer.appendChild(outgoingChatDiv);
    // 답변채팅 애니메이션 만들기 (incoming)
    setTimeout(showTypingAnimation, 500);



}
sendButton.addEventListener("click", handleOutgoingChat);