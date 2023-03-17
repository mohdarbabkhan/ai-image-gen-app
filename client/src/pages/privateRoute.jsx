
import { useSelector } from 'react-redux'

import Loading from "./LoadingToRedirect"

const privateRoute = ({children}) => {

    const {user} = useSelector((state) => state.auth)

  return user ? children : <Loading/>
}

export default privateRoute