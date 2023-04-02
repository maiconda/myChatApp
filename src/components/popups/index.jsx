import './index.css'

function Popups(props) {
    
    const closeDashboard = () => {


        document.querySelector('.popups').style.opacity = '0'
        
        setTimeout(() => {
            document.querySelector('.popups').style.zIndex = '-1'
        }, 300);
        
    }

    return(
        <section className='popups'>
        <div className='dashboard'>
          <div className='closedash-div'>
            <div onClick={closeDashboard}>
                <svg width="27px" height="27px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path fill="#fff" fillRule="evenodd" d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"/>
                </svg>
            </div>
          </div>
          <div className='dashboard-infos'>
            <div>


            <img src={props.user.photoURL } alt="" />
            <div  className='dashboard-infos-div'>
                <h3>{props.user.fullname}</h3>
                <p>{props.user.email}</p>
            </div>
            <button onClick={props.signOut}>Sair</button>
          </div>
          </div>
        </div>
      </section>
    )
}

export default Popups