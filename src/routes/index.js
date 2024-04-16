import { Routes, Route } from 'react-router-dom'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Private from './Private'
import Profile from '../pages/Profile'
import Teams from '../pages/Teams'
import New from '../pages/New'

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
            <Route path="/profile" element={<Private><Profile /></Private>} />
            <Route path='/teams' element={<Private><Teams /></Private>} />
            <Route path='/new' element={<Private><New /></Private>} />

            <Route path='/new/:id' element={<Private><New /></Private>} />
        </Routes>
    )
}

export default RoutesApp;