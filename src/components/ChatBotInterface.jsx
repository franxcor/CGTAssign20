import Message from "./Message";
import style from "../styles/chatbot.module.css";
import responses from '../assets/responses.json';

import { useState } from "react";

const ChatBotInterface = () => {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);

    const trimInput = (inputValue) => {
        let tempString = inputValue.toLowerCase().trim();
        //reg ex short hand to get only the letters in a string
        tempString = tempString.replace(/[^a-zA-Z]+/g, '');
        return tempString;
    }

    const getCategory = (inputValue) => {
        if (inputValue === "") {
            return "empty";
        } else if ("hellohiheyhowdy".includes(inputValue)) {
            return "greetings";
        } else if ("byeok".includes(inputValue)) {
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
        let jsonCategory = getCategory(trimmedOutput);
        let number = randomNumber();
        responseMessage=responses[jsonCategory][number];
        console.log(responseMessage)
        setTimeout(() => {
            setMessages((prevMessages) => [
            ...prevMessages, {content: responseMessage, person: false}
            ]);
        }, 1000);
    }

    const sendMessage = ({event, isPerson}) => {
        event.preventDefault();

        if (inputValue.trim() === "") return;

        setMessages((prevMessages) => 
            [...prevMessages, 
                {content: inputValue, person: isPerson}]);

        respond(inputValue);
        setInputValue("");
        
    }

    return (
        <div className={style.content}>
            <div id="messageHistory" className = {style.messageHistory}>
                <Message content={"Hello, Welcome to ChatterBox"}></Message>
                {messages.map((msg, index) => (
                    <Message key={index} content={msg.content} person={msg.person}></Message>
                ))}
                
            </div>
            <form onSubmit={(event) => sendMessage({event, isPerson: true})}>
                <input className={style.textBox} type="text" value={inputValue} placeholder = "Start Typing" onChange={(e) => setInputValue(e.target.value)}/>
                <input className={style.button} type="submit" value=">"/>
            </form>
            
        </div>
    )
}

export default ChatBotInterface;