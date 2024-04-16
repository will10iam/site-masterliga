import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar";
import Title from '../../components/Title'
import './index.css'
import { FiEdit2, FiPlus, FiSearch } from "react-icons/fi";
import { SiPremierleague } from "react-icons/si";
import { Link } from "react-router-dom";
import { db } from "../../services/firebaseConection";
import { collection, orderBy, limit, getDocs, startAfter, query } from "firebase/firestore";
import { format } from "date-fns";
import Modal from "../../components/Modal";



const listRef = collection(db, "masterligas");

export default function Dashboard() {

    const [masterligas, setMasterligas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();
    const [loadingMore, setLoadingMore] = useState(false);

    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState()

    useEffect(() => {
        async function loadmasterligas() {
            const q = query(listRef, orderBy('created', 'desc'), limit(1));

            const querySnapshot = await getDocs(q)
            setMasterligas([]);
            await updateState(querySnapshot);

            setLoading(false);
        }

        loadmasterligas();
        return (() => { })
    }, []);

    async function updateState(querySnapshot) {
        const isCollectionEmpty = querySnapshot.size === 0;


        if (!isCollectionEmpty) {
            let lista = [];

            querySnapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    ligas: doc.data().ligas,
                    temp: doc.data().temp,
                    time: doc.data().time,
                    timeID: doc.data().timeID,
                    created: doc.data().created,
                    createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    complemento: doc.data().complemento,
                    status: doc.data().status,
                })
            })

            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]

            setMasterligas(masterligas => [...masterligas, ...lista])
            setLastDocs(lastDoc);


        } else {
            setIsEmpty(true)
        }

        setLoadingMore(false)
    }


    async function handleMore() {
        setLoadingMore(true);

        const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs), limit(1));
        const querySnapshot = await getDocs(q)
        await updateState(querySnapshot);
    }

    function toggleModal(item) {
        setShowPostModal(!showPostModal)
        setDetail(item)
    }

    if (loading) {
        return (
            <div>
                <Sidebar />
                <div className="content">
                    <Title name="Minhas MasterLigas">
                        <SiPremierleague size={25} />
                    </Title>

                    <div className="container dashboard">
                        <span>Buscando times...</span>
                    </div>
                </div>
            </div>
        )
    }




    return (
        <>
            <Sidebar />
            <div className="content">
                <Title name="Minhas MasterLigas">
                    <SiPremierleague size={25} />
                </Title>
                <>
                    {masterligas.length === 0 ? (
                        <div className="container dashboard">
                            <span>Nenhum time encontrado...</span>
                            <Link to="/new" className="new">
                                <FiPlus color="#FFF" size={25} />
                                Cadastrar Nova ML
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/new" className="new">
                                <FiPlus color="#FFF" size={25} />
                                Cadastrar Nova ML
                            </Link>

                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Time</th>
                                        <th scope="col">Liga</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Temp. Atual</th>
                                        <th scope="col">Cadastrado em</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {masterligas.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td data-label="Cliente">{item.time}</td>
                                                <td data-label="Assunto">{item.ligas}</td>
                                                <td data-label="Status">
                                                    <span className="badge" style={{ backgroundColor: item.status === 'Jogando' ? '#5cb85c' : item.status === ' Em Pausa' ? '#f6a935' : item.status === 'Finalizada' ? '#3583f6' : '#999' }}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td data-label="Temp Atual">{item.temp}</td>
                                                <td data-label="Cadastrado">{item.createdFormat}</td>
                                                <td data-label="#">
                                                    <button className="action" style={{ backgroundColor: '#3583f6' }} onClick={() => toggleModal(item)}>
                                                        <FiSearch color='#FFF' size={17} />
                                                    </button>
                                                    <Link to={`/new/${item.id}`} className="action" style={{ backgroundColor: '#f6a935' }}>
                                                        <FiEdit2 color='#FFF' size={17} />
                                                    </Link>
                                                </td>

                                            </tr>

                                        )
                                    })}


                                </tbody>
                            </table>

                            {loadingMore && <h3>Buscando mais masterligas..</h3>}
                            {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}
                        </>
                    )}
                </>
            </div>

            {showPostModal && (
                <Modal
                    conteudo={detail}
                    close={() => setShowPostModal(!showPostModal)}

                />


            )}
        </>
    )
}