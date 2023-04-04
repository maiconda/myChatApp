import './index.css'

function MessageItem(props) {
    return(
        <div className={`message-item-div ${props.myMessageClass}`}>
            <div className={`message-item ${props.spacedMessage}`}>
                <p>{props.body}</p>
                <p>{props.hour}</p>
            </div>
        </div>
    )
}

export default MessageItem