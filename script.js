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

// 화살표 함수정의
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


}
sendButton.addEventListener("click", handleOutgoingChat);