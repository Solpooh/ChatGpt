// show message as an outgoing chat
const charInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");

let userText = null;
const API_KEY = "";
// require('dotenv').config(); // dotenv 모듈을 사용하여 환경 변수 로드

// const API_KEY = process.env.API_KEY;

const createElement = (html, className) => {
    // Create new div and apply chat, specified class and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = html;
    return chatDiv;  // Return the created chat div
}

const getChatResponse = async (incomingChatDiv) => {
    const API_URL = "https://api.openai.com/v1/completions";
    // console response 실제 text로 바꾸기
    const pElement = document.createElement("p");

    // Define the properties and data for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-instruct",
            prompt: userText,
            max_tokens: 2048,
            temperature: 0.2,
            top_p: 1,
            n: 1,
            stop: null
        })
    }

    // promise - 비동기
    // fetch()는 Promise 객체를 반환
    // API에 POST 요청을 보내고, 응답을 받고, 응답을 단락 요소 텍스트로 설정합니다
    try {
        const response = await (await fetch(API_URL, requestOptions)).json()
        pElement.textContent = response.choices[0].text.trim();
    } catch(error) {
        console.log(error);
    }

    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
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
    const incomingChatDiv = createElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);

    // API 사용하기
    getChatResponse(incomingChatDiv);
}
const handleOutgoingChat = () => {
    userText = charInput.value.trim(); // Get charInput value and remove extra spaces
    if(!userText) return;

    // console.log(userText);
    // 보낸 채팅을 화면 메인에 보이기
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="images/user.jpg" alt="user-img">
                        <p></p>
                    </div>
                </div>`;
    // Create an outgoing chat div with user's message and append it to chat container
    const outgoingChatDiv = createElement(html, "outgoing");
    outgoingChatDiv.querySelector("p").textContent = userText;
    chatContainer.appendChild(outgoingChatDiv);
    // 답변채팅 애니메이션 만들기 (incoming)
    setTimeout(showTypingAnimation, 500);



}
sendButton.addEventListener("click", handleOutgoingChat);