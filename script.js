// show message as an outgoing chat
const charInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");

let userText = null;
const API_KEY = "";

// 새로고침해도 localStorage의 data를 유지.
const loadDataFromLocalstorage = () => {
    const themeColor = localStorage.getItem("theme-color");

    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

    chatContainer.innerHTML = localStorage.getItem("all-chats");
    // 채팅 컨테이너 맨 아래로 스크롤 for new chat
    chatContainer.scrollTo(0, chatContainer.scrollHeight);

}
loadDataFromLocalstorage();

const createElement = (html, className) => {
    // <div class="chat className">태그 만들기</div>
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = html;
    return chatDiv;
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

    chatContainer.scrollTo(0, chatContainer.scrollHeight);

    // Saving all chat HTML data as all-chats name in the local storage
    localStorage.setItem("all-chats", chatContainer.innerHTML);
}

// 복사기능 만들기
const copyResponse = (copyBtn) => {
    // copy the text content of the response to the clipboard
    const responseTextElement = copyBtn.parentElement.querySelector("p"); // 복사 버튼의 부모요소에서 <p>요소를 찾아 저장
    // navigator.clipboard = 브라우저 API의 일부, 클립보드에 접근가능 객체
    navigator.clipboard.writeText(responseTextElement.textContent);
    copyBtn.textContent = "done"; // 복사 완료 시 "done"
    // 1초 후에 다시 "content_copy" 로 변경
    setTimeout(() => copyBtn.textContent = "content_copy", 1000);
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
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div>`;
    // Create an incoming chat div with user's message and append it to chat container
    const incomingChatDiv = createElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);

    // API 사용하기
    getChatResponse(incomingChatDiv);
}
const handleOutgoingChat = () => {
    userText = charInput.value.trim(); 
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
    outgoingChatDiv.querySelector("p").textContent = userText; // textContent 와 innerHTML의 차이점 
    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    // 답변채팅 애니메이션 만들기 (incoming)
    setTimeout(showTypingAnimation, 500);
}
themeButton.addEventListener("click", () => {
    // Toggle body's class for the theme mode
    document.body.classList.toggle("light-mode");
    // save the updated theme to the local storage(새로고침때마다 바뀌는 것 방지)
    localStorage.setItem("theme-color", themeButton.innerText);
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
})
sendButton.addEventListener("click", handleOutgoingChat);