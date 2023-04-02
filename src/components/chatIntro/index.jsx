import './index.css'
import notebookIcon from '../../assets/notebookIcon.png'

function ChatIntro(params) {
    return(
        <div className="chatIntro">
            <div className='chatIntro-div'>
                <div className='chatIntroImg'>
                    <img src={notebookIcon} alt="" />
                </div>
                <h3>Obrigado por entrar!</h3>
                <p>Para apoiar o projeto, dê seu feedback ao desenvolvedor.</p>
                <div className='chatIntrobutton-div'>
                    <button>Enviar Feedback</button>
                </div>
            </div>
        </div>
    )
}

export default ChatIntro