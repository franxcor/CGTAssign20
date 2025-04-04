import style from "../styles/message.module.css";
const Message = ({content, person}) => {
    return (
        <div className = {`${style["message"]} ${person ? style["person"] : ""}`}>
            {content}
        </div>
    )
}

export default Message;