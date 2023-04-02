import './index.css'
import db, { auth, googleProvider } from '../../firebase'

function Login({setUser}) {

    const signInWithGoogle = () => {
        auth.signInWithPopup(googleProvider)
        .then((result) => {
          const newUser = {
            fullname: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL
          }
          console.log(result)
          setUser(newUser)
          localStorage.setItem('user',JSON.stringify(newUser))
          db.collection('users').doc(result.user.email).set(newUser)

          set
          // location.reload();
        })
        .catch((err) => console.log(err.message))
      }


    return(
        <div className='Login'>
            <button onClick={signInWithGoogle}>Logar</button>
        </div>
    )   
}

export default Login