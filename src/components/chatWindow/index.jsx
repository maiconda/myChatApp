import { useState, useRef, useEffect } from 'react'
import './index.css'
import MessageItem from '../messageItem'
import firebase from 'firebase'
import db from '../../firebase'

function ChatWindow({activeChat, user, activeChatMessages, chatlist, setActiveChat}) {

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
          visited: true,
          hour: chat[0].hour
      })
    }

    console.log(activeChat)

    const exitChat = () =>{
        if(window.innerWidth <= 700){
            document.querySelector('.content').style.left = '-150vh'
            setTimeout(() => {
                setActiveChat({})
            }, 300);
        }
    }

    const openUserProfile = () => {
        document.querySelector('.userProfile').style.zIndex = '1'
        document.querySelector('.popups').style.zIndex = '1'
        setTimeout(() => {
          document.querySelector('.popups').style.opacity = '100%'
          document.querySelector('.userProfile').style.opacity = '100%'
        }, 150);

        console.log("aço")
      }

    return (
        <div onClick={() => {removeNotification(activeChat.email)}} className='chatwindow'>
            <div className='chatWindowHeader'>
                <div onClick={openUserProfile} className='chatWindowHeader-div1'>
                    <div>
                    <img src={activeChat.photoURL} alt="" />
                    </div>
                    <div>
                    <h3>{activeChat.fullname}</h3>
                    </div>
                </div>

                <div onClick={exitChat} className='newChat-back chatWindow-back'>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Arrow / Arrow_Undo_Up_Left">
                    <path id="Vector" d="M7 13L3 9M3 9L7 5M3 9H16C18.7614 9 21 11.2386 21 14C21 16.7614 18.7614 19 16 19H11" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    </svg>
                </div>
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