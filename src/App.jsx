import { Fragment, useEffect, useState } from 'react'
import './App.css'
import ChatListItem from './components/chatListItem'
import ChatIntro from './components/chatIntro'
import ChatWindow from './components/chatWindow'
import NewChat from './components/newChat'
import Login from './components/login'
import Popups from './components/popups'
import db, { auth } from './firebase'

function App() {


  const [chatlist, setChatlist] = useState([])
  const [activeChat, setActiveChat] = useState({})
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [allUsers, setAllUsers] = useState([])
  const [allUsersStatic, setAllUsersStatic] = useState([])
  const [activeChatMessages, setActiveChatMessages] = useState([])

  useEffect(() => {
    getChatlist()
    getAllUsers()
    setAllUsers(allUsersStatic)
  }, [])

  useEffect(() => {
    getChatlist()
    getAllUsers()
    setAllUsers(allUsersStatic)
  }, [user])

  useEffect(() => {
    setAllUsers(allUsersStatic)
  }, [allUsersStatic])

  useEffect(() => {
    if (activeChat.email !== undefined) {
      setActiveChatMessages([])
      getActiveChatMessages()
    }
  }, [activeChat])

  const getChatlist = async () => {
    const data = await db
    .collection('friendlist')
    .doc(user.email)
    .collection('list')
    .orderBy('timeStamp', 'asc')
    .onSnapshot((snapShot) => {
      let chat = snapShot.docs.map((doc) => doc.data())
      setChatlist(chat.reverse())
    })
  }

  const getActiveChatMessages = async () => {

    const data = await db
    .collection('chats')
    .doc(user.email)
    .collection(activeChat.email)
    .orderBy('timeStamp', 'asc')
    .onSnapshot((snapShot) => {
      let messages = snapShot.docs.map((doc) => doc.data())
      setActiveChatMessages(messages)
    })
  }

  const getAllUsers = async () => {
    const data = await db.collection('users').onSnapshot(snapshot => {
      setAllUsersStatic(snapshot.docs.filter((doc) => doc.data().email !== user.email))
    })
  }

  const signOut = () => {
    auth.signOut()
    .then(() => {
      setUser(null)
      localStorage.removeItem('user')
    })
  }

  const openNewMessages = () => {
    document.querySelector('.newChat').style.bottom = '20px'
  }

  const openDashboard = () => {
    document.querySelector('.popups').style.zIndex = '1'
    document.querySelector('.popups').style.opacity = '100%'

  }

  const setChatInfos = (email, fullname, photoURL) => {

    if(email != activeChat.email){
      setActiveChat({
        email: email,
        fullname: fullname,
        photoURL: photoURL
      })
    }

    let chat = chatlist.filter(chat => chat.email === email)

    if(chat.length === 1){
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

  }

  return (
  <Fragment>
  {user ? 
  <Fragment>
          <Popups
          user={user}
          signOut={signOut}
        />
    <main>

      <section className="sidebar">

      <NewChat
        allUsers={allUsers}
        setAllUsers={setAllUsers}
        allUsersStatic={allUsersStatic}
        setChatInfos={setChatInfos}
        />
          <div className='sidebar-header'>
            <div className='sidebar-infos'>
              <img onClick={openDashboard} src={user.photoURL} alt="" />
              <h3 onClick={openDashboard}>{user.fullname}</h3>
            </div>
            <div onClick={openNewMessages} className='newMessage'>
              <svg width="27px" height="27px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path fill="#fff" fillRule="evenodd" d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"/>
              </svg>
            </div>
          </div>
          <div className='messages-div'>
            <div className='search-div'>
              <div className='search'>
                <input autoComplete="off" spellCheck='false' placeholder='Pesquisar' type="text" />
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z" fill="#97999c"/>
                </svg>
              </div>
            </div>

            <div className='chats'>
              {chatlist.map((chat,index)=>(
                <ChatListItem
                  key={index}

                  onClick={()=>{
                    setChatInfos(chat.email, chat.fullname, chat.photoURL)
                  }}
                  hour={chat.hour}
                  img={chat.photoURL}
                  name={chat.fullname}
                  lastMessage={chat.lastMessage}
                  classActive={activeChat.email === chat.email && 'chatActive'}
                  notificationClass={chat.visited === true && 'notification-none'}
                  lastMessageClass={chat.visited === false && 'lastmessage-notification'}
                />
              ))}
            </div>

            <div className='navbar-mobile'>
            <div className='mobile-1'>Mensagens</div>
            <div className='mobile-2' onClick={openNewMessages}>Nova Mensagem</div>
            <div className='mobile-3'>Perfil</div>
          </div>
          </div>
      </section>
      <section className="content">
        {activeChat.fullname !== undefined && 
          <ChatWindow
            user={user}
            activeChat={activeChat}
            activeChatMessages={activeChatMessages}
            chatlist={chatlist}
          />
        }
        {activeChat.fullname === undefined && 
          <ChatIntro/>
        }
      </section>
    </main>
    </Fragment> : 
    <Login setUser={setUser}/>}
  </Fragment>
  )
}

export default App
