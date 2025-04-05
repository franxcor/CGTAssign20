import Message from "./Message";
import style from "../styles/chatbot.module.css";
import responses from '../assets/responses.json';

import { useState, useEffect, useRef } from "react";

const ChatBotInterface = () => {
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const chatContainerRef = useRef(null);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (!chatContainer) return;

        setTimeout(() => {
            chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
        }, 0); // Ensures React finishes rendering before scrolling
    }, [messages]);
    

    const trimInput = (inputValue) => {
        let tempString = inputValue.toLowerCase().trim();
        //reg ex short hand to get only the letters in a string
        tempString = tempString.replace(/[^a-zA-Z]+/g, '');
        return tempString;
    }

    const getCategory = (inputValue) => {
        if (inputValue === "") {
            return "empty";
        } else if (inputValue.includes("hey") || inputValue.includes("hi") || inputValue.includes("hello") || inputValue.includes("howdy")) {
            return "greetings";
        } else if (inputValue.includes("thank") || inputValue.includes("bye") || inputValue.includes("ok")) {
            return "farewells";
        } else if (inputValue.includes("joke")) {
            return "joke";
        } else {
            return "unknown";
        }
    }
    const randomNumber = () => {
        return (Math.floor(Math.random() * 5) + 1).toString();
    }

    const respond = async (inputValue) => {
        let responseMessage = "";
        let trimmedOutput = trimInput(inputValue);
        setInputValue("");
        let jsonCategory = getCategory(trimmedOutput);
        let number = randomNumber();
        responseMessage=responses[jsonCategory][number];

        return new Promise((resolve) => {
            setTimeout(() => {
                setMessages((prevMessages) => [
                ...prevMessages, {content: responseMessage, person: false}
                ]);
                resolve();
        }, 1000);
    });
    }

    const sendMessage = async ({event, isPerson}) => {
        event.preventDefault();
        if (loading) return;
        setLoading(true);
        if (inputValue.trim() === "") return;

        setMessages((prevMessages) => 
            [...prevMessages, 
                {content: inputValue, person: isPerson}]);
        await respond(inputValue);
        setLoading(false);
       
    }

    return (
        <div className={style.content}>
            <div id="messageHistory" ref={chatContainerRef} className = {style.messageHistory}>
                <Message content={"Hello, Welcome to ChatterBox"}></Message>
                {messages.map((msg, index) => (
                    <Message key={index} content={msg.content} person={msg.person}></Message>
                ))}
                
            </div>
            <form onSubmit={(event) => sendMessage({event, isPerson: true})}>
                <input className={style.textBox} 
                type="text" 
                value={inputValue} 
                placeholder = "Start Typing" 
                onChange={(e) => setInputValue(e.target.value)}/>
                <input className={style.button} 
                type="submit" 
                value=">"
                disabled={loading}/>
            </form>
            
        </div>
    )
}

export default ChatBotInterface;