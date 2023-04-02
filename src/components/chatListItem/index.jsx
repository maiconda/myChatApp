import './index.css'

function ChatListItem (props) {
    return (
        <div onClick={props.onClick} className={`chatListenner ${props.classActive}`}>
            <img src={props.img} alt="" />
            <div className='chatListenner-div1'>
                <div>
                    <h3>{props.name}</h3>
                    <p className={`lastmessage ${props.lastMessageClass}`}>{props.lastMessage}</p>
                </div>
            </div>
            <div className='chatListenner-div2'>
                <p>10:23</p>
                <span className={`chatListenner-notification ${props.notificationClass}`}></span>
            </div>
        </div>
    )    
}

export default ChatListItem