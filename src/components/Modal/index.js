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
                    <h2>Detalhes da ML</h2>

                    <div className='row'>
                        <span>
                            Time: <i>{conteudo.time}</i>
                        </span>

                        <span>
                            Temp: <i>{conteudo.temp}</i>
                        </span>

                        <span>
                            Cadastrado em: <i>{conteudo.createdFormat}</i>
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
                                        <td data-label="Jogador">{jogador.posicao}</td>
                                        <td data-label="Jogador">{jogador.gols}</td>
                                        <td data-label="Jogador">{jogador.assistencias}</td>
                                        <td data-label="Jogador">{jogador.nota}</td>
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

