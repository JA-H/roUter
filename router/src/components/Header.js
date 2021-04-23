import LoginForm from './Login'

import { FaRoute } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer.js';
import { delJourneys } from '../reducers/journeyReducer.js'




const Header = () => {

    const user = useSelector(state=> state.user)
    const dispatch = useDispatch()

    const logoutHandler = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedUser')
        dispatch(setUser(null))
        dispatch(delJourneys())

    }

    return (
        <div className="Headerwrapper">
        <header className="App-header">
           <Link to="/"> <h1> roUter <FaRoute/> </h1> </Link>
        </header>
        
         

        {user=== null?
        <div className="headerlinks">
        
    <Link to="/register"> Register </Link>
    <Link to="/login"> Login </Link>
    </div> :

     <div className="headerlinks">

    <Link to="pastjourneys"> Past Journeys</Link>
    
     Hi, {user.username} <button onClick={logoutHandler}> Logout </button> </div>

}
            
            
            
        </div> 

    
        
    )
}

export default Header
