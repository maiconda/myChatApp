import './index.css'
import UserNewChat from '../userNewChat'
import { useEffect, useState } from 'react'

function NewChat({allUsers, setAllUsers, allUsersStatic, setChatInfos}){

    const searchUser = (input) => {

        if (input === '') {
            setAllUsers(allUsersStatic)
        } else {
            setAllUsers(allUsersStatic.filter((doc) => doc.data().fullname.toLowerCase().startsWith(input) || doc.data().email.toLowerCase().startsWith(input.toLowerCase())))
        }
    }

    const exitNewMessages = () => {
        document.querySelector('.newChat').style.bottom = '-100vh'
      } 

    return (
    
    
        <div className='newChat'>
            <div className='newChat-header'>
                <div onClick={exitNewMessages} className='newChat-back'>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Arrow / Arrow_Undo_Up_Left">
                    <path id="Vector" d="M7 13L3 9M3 9L7 5M3 9H16C18.7614 9 21 11.2386 21 14C21 16.7614 18.7614 19 16 19H11" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    </svg>
                </div>
                <h3>Nova Conversa</h3>
            </div>
            <div className='search-div'>
              <div className='search'>
                <input autoComplete="false" placeholder='Pesquisar' spellCheck="false" type="text" onChange={(e) => {searchUser(e.target.value)}} />
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z" fill="#97999c"/>
                </svg>
              </div>
            </div>
            <div className='newChat-users'>

            {allUsers.map((user, index) => (
                <UserNewChat
                    key={index}
                    name={user.data().fullname}
                    img={user.data().photoURL}
                    email={user.data().email}
                    onClick={()=> {

                        exitNewMessages()

                        setChatInfos(
                            user.data().email,
                            user.data().fullname,
                            user.data().photoURL
                        )

                    }}
                />
            ))}
            </div>
        </div>
    )
}

export default NewChat