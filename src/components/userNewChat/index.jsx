import './index.css'

function UserNewChat(props){
    return(
        <div onClick={props.onClick} className="userNewChat-div">
            <div>
            <img src={props.img} alt="" />
            </div>

            <div>
            <h3>{props.name}</h3>
            <p>{props.email}</p>
            </div>
        </div>
    )
}

export default UserNewChat