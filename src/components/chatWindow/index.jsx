import { useState, useRef, useEffect } from 'react'
import './index.css'
import MessageItem from '../messageItem'
import firebase from 'firebase'
import db from '../../firebase'

function ChatWindow({activeChat, user, activeChatMessages, chatlist}) {

    const [message, setMessage] = useState('')

    useEffect(()=>{
        if (body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
        }
    })

    const body = useRef()

    const sendMessage = (e) => {
        e.preventDefault()

        if (message.length > 0) {

            const date = new Date();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const currentTime = `${hours}:${minutes}`;
            
            let payload = {
                text: message,
                senderEmail: user.email,
                receiverEmail: activeChat.email,
                timeStamp: firebase.firestore.Timestamp.now(),
                hour: currentTime
            }
    
            console.log(payload)
    
            db.collection('chats').doc(user.email).collection(activeChat.email).add(payload)
    
            db.collection('chats').doc(activeChat.email).collection(user.email).add(payload)

            db.collection('friendlist').doc(user.email).collection('list').doc(activeChat.email).set({
                email: activeChat.email,
                fullname: activeChat.fullname,
                photoURL: activeChat.photoURL,
                lastMessage: message,
                timeStamp: firebase.firestore.Timestamp.now(),
                visited: true,
                hour: currentTime
            })
    
            db.collection('friendlist').doc(activeChat.email).collection('list').doc(user.email).set({
                email: user.email,
                fullname: user.fullname,
                photoURL: user.photoURL,
                lastMessage: message,
                timeStamp: firebase.firestore.Timestamp.now(),
                visited: false,
                hour: currentTime
            })

            setMessage('')
            document.getElementById('sendInput').value = ''
        }
    }

    const removeNotification = (email) => {
        let chat = chatlist.filter(chat => chat.email === email)

        db.collection('friendlist').doc(user.email).collection('list').doc(chat[0].email).set({
          email: chat[0].email,
          fullname: chat[0].fullname,
          photoURL: chat[0].photoURL,
          lastMessage: chat[0].lastMessage,
          timeStamp: chat[0].timeStamp,
          visited: true
      })
    }

    return (
        <div onClick={() => {removeNotification(activeChat.email)}} className='chatwindow'>
            <div className='chatWindowHeader'>
                <img src={activeChat.photoURL} alt="" />
                <h3>{activeChat.fullname}</h3>
            </div>
            <div ref={body} className='chatwindow-chatdiv'>
                {activeChatMessages.map((item, index)=>{

                let spacedBottom = ''
                let spacedTop = ''

                if (activeChatMessages[index-1] != undefined) {
                    if(activeChatMessages[index-1].receiverEmail != user.email && item.receiverEmail === user.email){
                        spacedTop = 'spacedMessage-top'
                    }
                }

                if (activeChatMessages[index+1] != undefined) {
                    if(activeChatMessages[index+1].receiverEmail != user.email && item.receiverEmail === user.email){
                        spacedBottom = 'spacedMessage-bottom'
                    }
                }
                
                return (
                    <MessageItem
                    key={index}
                    body={item.text}
                    hour={item.hour}
                    myMessageClass={user.email === item.senderEmail && 'myMessageDiv'}
                    spacedMessage={`${spacedTop} ${spacedBottom}`}
                    />
                )})}
            </div>

            <form onSubmit={sendMessage} className='chatwindow-inputdiv'>
                <input autoComplete="false" id='sendInput' placeholder='Digite sua mensagem' onChange={(e)=> setMessage(e.target.value)} className='chatwindow-input' type="text" />
                <button className='send-button'>Enviar</button>
            </form>
        </div>
    )
}

export default ChatWindow