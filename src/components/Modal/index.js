import { FiX } from 'react-icons/fi'
import './index.css'

export default function Modal({ conteudo, close }) {

    console.log(conteudo.id)
    return (
        <div className='modal'>
            <div className='container'>
                <button className='close' onClick={close}>
                    <FiX size={25} color='#FFF' />
                    Voltar
                </button>

                <main>
                    <h2>Detalhes da MasterLiga</h2>

                    <div className='row'>
                        <span>
                            Time: <i>{conteudo.time}</i>
                        </span>

                        <span className='span2'>
                            Temporada: <i>{conteudo.temp}</i>
                        </span>

                        <span>
                            Início: <i>{conteudo.createdFormat}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Jogador</th>
                                    <th scope="col">Posição</th>
                                    <th scope="col">Gols</th>
                                    <th scope="col">Assist.</th>
                                    <th scope="col">Nota</th>
                                </tr>
                            </thead>
                            <tbody>
                                {conteudo.jogadores.map((jogador, index) => (

                                    <tr key={index}>
                                        <td data-label="Jogador">{jogador.nome}</td>
                                        <td data-label="Posição">{jogador.posicao}</td>
                                        <td data-label="Gols">{jogador.gols}</td>
                                        <td data-label="Assistências">{jogador.assistencias}</td>
                                        <td data-label="Nota">{jogador.nota}</td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>

                    <div className='row'>
                        <span className='status'>
                            Status:
                            <i
                                className='status-badge'
                                style={{ color: '#FFF', backgroundColor: conteudo.status === 'Jogando' ? '#5cb85c' : conteudo.status === ' Em Pausa' ? '#f6a935' : conteudo.status === 'Finalizada' ? '#3583f6' : '#999' }}>
                                {conteudo.status}
                            </i>
                        </span>

                        <span>
                            Títulos: {conteudo.troféu}
                        </span>
                    </div>


                    {/* {conteudo.complemento !== '' && (
                        <>
                            <h3>Complemento</h3>
                            <p>
                                {conteudo.complemento}
                            </p>

                        </>

                    )} */}

                </main>
            </div>

        </div>
    )
}

