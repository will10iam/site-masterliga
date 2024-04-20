/* import './index.css'
import Sidebar from '../../components/Sidebar'
import Title from '../../components/Title'
import { FiPlusCircle, FiEdit } from 'react-icons/fi'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { db } from '../../services/firebaseConection'
import { collection, getDocs, getDoc, doc, addDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const listRef = collection(db, "teams");

export default function New() {
    const { user } = useContext(AuthContext)

    const { id } = useParams();

    const navigate = useNavigate();

    const [teamSelected, setTeamSelected] = useState(0);

    const [teams, setTeams] = useState([])
    const [loadTeam, setLoadTeam] = useState(true)
    const [ligas, setLigas] = useState('')
    const [temp, setTemp] = useState('')
    const [status, setStatus] = useState('Aberto')
    const [idCustomer, setIdCustomer] = useState(false)

    useEffect(() => {

        async function loadteams() {
            const querySnapshot = await getDocs(listRef)
                .then((snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeTime: doc.data().nomeTime
                        })
                    })

                    if (snapshot.docs.size === 0) {
                        console.log("NENHUMA EMPRESA ENCONTRADA");
                        setTeams([{ id: '1', nomeTime: "FREELA" }])
                        setLoadTeam(false)
                        return;
                    }

                    setTeams(lista)
                    setLoadTeam(false)



                    if (id) {
                        loadId(lista);
                    }


                })
                .catch((error) => {
                    console.log("ERRO AO BUSCAR OS TIMES", error)
                    setLoadTeam(false)
                    setTeams([{ id: '1', nomeTime: "FREELA" }])

                })
        }
        loadteams();
    }, [id])


    async function loadId(lista) {
        const docRef = doc(db, 'masterligas', id)
        await getDoc(docRef)
            .then((snapshot) => {
                setLigas(snapshot.data().ligas)
                setTemp(snapshot.data().temp)
                setStatus(snapshot.data().status)

                let index = lista.findIndex(item => item.id === snapshot.data().timeID)
                setTeamSelected(index);
                setIdCustomer(true)
            })
            .catch((error) => {
                console.log(error)
                setIdCustomer(false)
            })
    }


    function handleOptionChange(e) {
        setStatus(e.target.value);
    }

    function handleChangeSelect(e) {
        setLigas(e.target.value);
    }

    function handleChangeCustomer(e) {
        setTeamSelected(e.target.value)
    }

    function handleChangeTemp(e) {
        setTemp(e.target.value)
    }

    async function handleRegister(e) {
        e.preventDefault();

        if (idCustomer) {
            const docRef = doc(db, 'masterligas', id)
            await updateDoc(docRef, {
                time: teams[teamSelected].nomeTime,
                timeID: teams[teamSelected].id,
                ligas: ligas,
                temp: temp,
                status: status,
                userID: user.uid,
            })
                .then(() => {
                    toast.success('Atualizado com sucesso')
                    setTeamSelected(0)
                    navigate('/dashboard')
                })
                .catch((error) => {
                    toast.error('Opa! Alguma coisa deu errado.')
                    console.log(error)
                })


            return;
        }

        await addDoc(collection(db, "masterligas"), {
            created: new Date(),
            time: teams[teamSelected].nomeTime,
            timeID: teams[teamSelected].id,
            ligas: ligas,
            temp: temp,
            status: status,
            userID: user.uid,
        })
            .then(() => {
                toast.success("Masterliga Registrada com Sucesso!")
                setTeamSelected(0)
            })
            .catch((error) => {
                toast.error("ERRO AO REGISTRAR, VERIFIQUE OS CAMPOS E TENTE NOVAMENTE!")
                console.log(error);
            })
    }

    return (
        <div>
            <Sidebar />

            <div className='content'>
                <Title name={id ? 'Editando MasterLiga' : 'Nova MasterLiga'}>
                    <span>
                        {id ? <FiEdit size={25} /> : <FiPlusCircle size={25} />}
                    </span>
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Time</label>
                        {loadTeam ? (
                            <input type='text' disabled={true} value="Carregando..." />
                        ) : (
                            <select value={teamSelected} onChange={handleChangeCustomer}>
                                {teams.map((item, index) => {
                                    return (
                                        <option key={index} value={index}>
                                            {item.nomeTime}
                                        </option>
                                    )
                                })}
                            </select>
                        )
                        }

                        <label>Liga</label>
                        <select value={ligas} onChange={handleChangeSelect}>
                            <option value="Liga Profesional de Fútbol">Liga Profesional de Fútbol</option>
                            <option value="Jupiler Pro League">Jupiler Pro League</option>
                            <option value="Brasileirão Série A">Brasileirão Série A</option>
                            <option value="Brasileirão Série B">Brasileirão Série B</option>
                            <option value="Campeonato AFP PlanVital">Campeonato AFP PlanVital</option>
                            <option value="Liga BetPlay DIMAYOR">Liga BetPlay DIMAYOR</option>
                            <option value="CFA Super League">CFA Super League</option>
                            <option value="3F Superliga">3F Superliga</option>
                            <option value="Scottish Premiership">Scottish Premiership</option>
                            <option value="La Liga">La Liga</option>
                            <option value="La Liga2">La Liga2</option>
                            <option value="Ligue 1 Uber Eats">Ligue 1 Uber Eats</option>
                            <option value="Ligue 2 BKT">Ligue 2 BKT</option>
                            <option value="Premier League">Premier League</option>
                            <option value="EFL Championship">EFL Championship</option>
                            <option value="Serie A Tim">Serie A Tim</option>
                            <option value="Serie BKT">Serie BKT</option>
                            <option value="J-League">J-League</option>
                            <option value="J2-League">J2-League</option>
                            <option value="Eredivisie">Eredivisie</option>
                            <option value="Liga NOS">Liga NOS</option>
                            <option value="Russian Premier League">Russian Premier League</option>
                            <option value="Raiffeisen Super League">Raiffeisen Super League</option>
                            <option value="TOYOTA Thai League">TOYOTA Thai League</option>
                            <option value="SporToto Super Lig">SporToto Super Lig</option>
                            <option value="Outros Europa">Outros Europa</option>
                            <option value="Outros Ásia">Outros Europa</option>
                            <option value="Outros América Latina">Outros Europa</option>
                        </select>

                        <label>Temporada Atual</label>
                        <input
                            type="text"
                            placeholder='em qual temporada seu time está?'
                            value={temp}
                            onChange={handleChangeTemp}
                        />


                        <label>Status</label>
                        <div className='status'>
                            <input
                                type="radio"
                                name='radio'
                                value="Jogando"
                                onChange={handleOptionChange}
                                checked={status === 'Jogando'}
                            />
                            <span>Jogando</span>

                            <input
                                type="radio"
                                name='radio'
                                value="Em Pausa"
                                onChange={handleOptionChange}
                                checked={status === 'Em Pausa'}
                            />
                            <span>Em Pausa</span>

                            <input
                                type="radio"
                                name='radio'
                                value="Finalizada"
                                onChange={handleOptionChange}
                                checked={status === 'Finalizada'}
                            />
                            <span>Finalizada</span>

                        </div>


                        <button type="submit">Registrar ML</button>
                    </form>
                </div>
            </div>
        </div>
    )
} */


import './index.css'
import Sidebar from '../../components/Sidebar'
import Title from '../../components/Title'
import { FiPlusCircle, FiEdit } from 'react-icons/fi'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { db } from '../../services/firebaseConection'
import { collection, getDocs, getDoc, doc, addDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const listRef = collection(db, "teams");

export default function New() {
    const { user } = useContext(AuthContext)

    const { id } = useParams();

    const navigate = useNavigate();

    const [teamSelected, setTeamSelected] = useState(0);

    const [teams, setTeams] = useState([])
    const [loadTeam, setLoadTeam] = useState(true)
    const [ligas, setLigas] = useState('')
    const [temp, setTemp] = useState('')
    const [status, setStatus] = useState('Aberto')
    const [idCustomer, setIdCustomer] = useState(false)

    // Estado para armazenar as informações dos jogadores
    const [jogadores, setJogadores] = useState([]);

    useEffect(() => {
        // Carregar times existentes ao iniciar a página
        async function loadteams() {
            const querySnapshot = await getDocs(listRef)
                .then((snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeTime: doc.data().nomeTime
                        })
                    })

                    if (snapshot.docs.size === 0) {
                        console.log("NENHUMA EMPRESA ENCONTRADA");
                        setTeams([{ id: '1', nomeTime: "FREELA" }])
                        setLoadTeam(false)
                        return;
                    }

                    setTeams(lista)
                    setLoadTeam(false)

                    if (id) {
                        loadId(lista);
                    }
                })
                .catch((error) => {
                    console.log("ERRO AO BUSCAR OS TIMES", error)
                    setLoadTeam(false)
                    setTeams([{ id: '1', nomeTime: "FREELA" }])
                })
        }
        loadteams();
    }, [id])

    async function loadId(lista) {
        const docRef = doc(db, 'masterligas', id)
        await getDoc(docRef)
            .then((snapshot) => {
                setLigas(snapshot.data().ligas)
                setTemp(snapshot.data().temp)
                setStatus(snapshot.data().status)

                let index = lista.findIndex(item => item.id === snapshot.data().timeID)
                setTeamSelected(index);
                setIdCustomer(true);

                setJogadores(snapshot.data().jogadores || []);
            })
            .catch((error) => {
                console.log(error)
                setIdCustomer(false)
            })
    }

    function handleOptionChange(e) {
        setStatus(e.target.value);
    }

    function handleChangeSelect(e) {
        setLigas(e.target.value);
    }

    function handleChangeCustomer(e) {
        setTeamSelected(e.target.value)
    }

    function handleChangeTemp(e) {
        setTemp(e.target.value)
    }

    async function handleRegister(e) {
        e.preventDefault();

        if (idCustomer) {
            const docRef = doc(db, 'masterligas', id)
            await updateDoc(docRef, {
                time: teams[teamSelected].nomeTime,
                timeID: teams[teamSelected].id,
                ligas: ligas,
                temp: temp,
                status: status,
                userID: user.uid,
                jogadores: jogadores,
            })
                .then(() => {
                    toast.success('Atualizado com sucesso')
                    setTeamSelected(0)
                    navigate('/dashboard')
                })
                .catch((error) => {
                    toast.error('Opa! Alguma coisa deu errado.')
                    console.log(error)
                })

            return;
        }

        await addDoc(collection(db, "masterligas"), {
            created: new Date(),
            time: teams[teamSelected].nomeTime,
            timeID: teams[teamSelected].id,
            ligas: ligas,
            temp: temp,
            status: status,
            userID: user.uid,
            jogadores: jogadores // Adicionando informações dos jogadores
        })
            .then(() => {
                toast.success("Masterliga Registrada com Sucesso!")
                setTeamSelected(0)
            })
            .catch((error) => {
                toast.error("ERRO AO REGISTRAR, VERIFIQUE OS CAMPOS E TENTE NOVAMENTE!")
                console.log(error);
            })
    }

    // Função para adicionar um novo jogador
    const adicionarJogador = () => {
        setJogadores([...jogadores, {
            nome: '',
            posicao: '',
            gols: '',
            assistencias: '',
            nota: ''
        }]);
    };

    // Função para atualizar as informações de um jogador específico
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newArray = [...jogadores];
        newArray[index][name] = value;
        setJogadores(newArray);
    };

    return (
        <div>
            <Sidebar />

            <div className='content'>
                <Title name={id ? 'Editando MasterLiga' : 'Nova MasterLiga'}>
                    <span>
                        {id ? <FiEdit size={25} /> : <FiPlusCircle size={25} />}
                    </span>
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Time</label>
                        {loadTeam ? (
                            <input type='text' disabled={true} value="Carregando..." />
                        ) : (
                            <select value={teamSelected} onChange={handleChangeCustomer}>
                                {teams.map((item, index) => {
                                    return (
                                        <option key={index} value={index}>
                                            {item.nomeTime}
                                        </option>
                                    )
                                })}
                            </select>
                        )
                        }

                        <label>Liga</label>
                        <select value={ligas} onChange={handleChangeSelect}>
                            <option value="Liga Profesional de Fútbol">Liga Profesional de Fútbol</option>
                            <option value="Jupiler Pro League">Jupiler Pro League</option>
                            <option value="Brasileirão Série A">Brasileirão Série A</option>
                            <option value="Brasileirão Série B">Brasileirão Série B</option>
                            <option value="Campeonato AFP PlanVital">Campeonato AFP PlanVital</option>
                            <option value="Liga BetPlay DIMAYOR">Liga BetPlay DIMAYOR</option>
                            <option value="CFA Super League">CFA Super League</option>
                            <option value="3F Superliga">3F Superliga</option>
                            <option value="Scottish Premiership">Scottish Premiership</option>
                            <option value="La Liga">La Liga</option>
                            <option value="La Liga2">La Liga2</option>
                            <option value="Ligue 1 Uber Eats">Ligue 1 Uber Eats</option>
                            <option value="Ligue 2 BKT">Ligue 2 BKT</option>
                            <option value="Premier League">Premier League</option>
                            <option value="EFL Championship">EFL Championship</option>
                            <option value="Serie A Tim">Serie A Tim</option>
                            <option value="Serie BKT">Serie BKT</option>
                            <option value="J-League">J-League</option>
                            <option value="J2-League">J2-League</option>
                            <option value="Eredivisie">Eredivisie</option>
                            <option value="Liga NOS">Liga NOS</option>
                            <option value="Russian Premier League">Russian Premier League</option>
                            <option value="Raiffeisen Super League">Raiffeisen Super League</option>
                            <option value="TOYOTA Thai League">TOYOTA Thai League</option>
                            <option value="SporToto Super Lig">SporToto Super Lig</option>
                            <option value="Outros Europa">Outros Europa</option>
                            <option value="Outros Ásia">Outros Europa</option>
                            <option value="Outros América Latina">Outros Europa</option>
                            {/* Opções de ligas aqui */}
                        </select>

                        <label>Temporada Atual</label>
                        <input
                            type="text"
                            placeholder='em qual temporada seu time está?'
                            value={temp}
                            onChange={handleChangeTemp}
                        />

                        <label>Status</label>
                        <div className='status'>
                            <input
                                type="radio"
                                name='radio'
                                value="Jogando"
                                onChange={handleOptionChange}
                                checked={status === 'Jogando'}
                            />
                            <span>Jogando</span>

                            <input
                                type="radio"
                                name='radio'
                                value="Em Pausa"
                                onChange={handleOptionChange}
                                checked={status === 'Em Pausa'}
                            />
                            <span>Em Pausa</span>

                            <input
                                type="radio"
                                name='radio'
                                value="Finalizada"
                                onChange={handleOptionChange}
                                checked={status === 'Finalizada'}
                            />
                            <span>Finalizada</span>
                        </div>

                        <label>Jogadores</label>
                        {/* Inputs para as informações dos jogadores */}
                        {jogadores.map((jogador, index) => (
                            <div key={index}>
                                <label>{index + 1}</label>
                                <input
                                    type="text"
                                    name="nome"
                                    value={jogador.nome}
                                    onChange={(event) => handleInputChange(index, event)}
                                    placeholder="Nome do jogador"
                                />
                                <input
                                    type="text"
                                    name="posicao"
                                    value={jogador.posicao}
                                    onChange={(event) => handleInputChange(index, event)}
                                    placeholder="Posição"
                                />
                                <input
                                    type="number"
                                    name="gols"
                                    value={jogador.gols}
                                    onChange={(event) => handleInputChange(index, event)}
                                    placeholder="Qtos gols?"
                                />
                                <input
                                    type="number"
                                    name="assistencias"
                                    value={jogador.assistencias}
                                    onChange={(event) => handleInputChange(index, event)}
                                    placeholder="Qtos passes?"
                                />
                                <input
                                    type="text"
                                    name="nota"
                                    value={jogador.nota}
                                    onChange={(event) => handleInputChange(index, event)}
                                    placeholder="Nota do Jogador?"
                                />
                                {/* Outros inputs para as informações do jogador */}
                            </div>
                        ))}

                        {/* Botão para adicionar novo jogador */}
                        <button type="button" onClick={adicionarJogador} className='button'>Adicionar Jogador</button>

                        <button type="submit">Registrar MasterLiga</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
