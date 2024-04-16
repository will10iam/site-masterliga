import { useContext } from "react"
import { Link } from "react-router-dom"
import avatarImg from '../../assets/avatar.png'
import './index.css'
import { AuthContext } from "../../contexts/auth";
import { SiPremierleague } from "react-icons/si";
import { TbShieldCheckeredFilled } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlinePoweroff } from "react-icons/ai";


export default function Sidebar() {
    const { user, logout } = useContext(AuthContext);

    async function handleLogOut() {
        await logout();
    }

    return (
        <>
            <div className="sidebar">
                <div>
                    <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="" />
                </div>


                <Link to="/dashboard">
                    <SiPremierleague color="#FFF" size={24} />
                    Minhas ML's
                </Link>
                <Link to="/teams">
                    <TbShieldCheckeredFilled color="#FFF" size={24} />
                    Times
                </Link>
                <Link to="/profile">
                    <FaUserAlt color="#FFF" size={24} />
                    Perfil
                </Link>

                <Link to="/">
                    <button onClick={handleLogOut}><AiOutlinePoweroff color="#FFF" size={24} /></button>
                    Sair
                </Link>


            </div>

        </>
    )
}