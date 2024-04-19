import { useState } from "react"

import Header from "../../components/Sidebar"
import Title from "../../components/Title"

import { TbShieldCheckeredFilled } from "react-icons/tb";

import { db } from "../../services/firebaseConection"
import { addDoc, collection } from "firebase/firestore"
import { toast } from "react-toastify"





export default function Teams() {
    const [time, setTime] = useState('')
    const [liga, setLiga] = useState('')
    const [tecnico, setTecnico] = useState('')


    async function handleRegister(e) {
        e.preventDefault();

        if (time !== '' && liga !== '' && tecnico !== '') {
            await addDoc(collection(db, "teams"), {
                nomeTime: time,
                liga: liga,
                tecnico: tecnico
            })
                .then(() => {
                    setTime('')
                    setLiga('')
                    setTecnico('')
                    toast.success("Cadastrado com sucesso")
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Erro ao fazer ao cadastro!")
                })
        } else {
            toast.error("Preencha os campos corretamente")
        }
    }


    return (
        <>
            <Header />

            <div className="content">
                <Title name="Times">
                    <TbShieldCheckeredFilled size={25} />
                </Title>


                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Nome do Time</label>
                        <input
                            type="text"
                            placeholder="insira o nome do time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />

                        <label>Pertence a qual liga?</label>
                        <input
                            type="text"
                            placeholder="insira a liga em que o time joga"
                            value={liga}
                            onChange={(e) => setLiga(e.target.value)}
                        />

                        <label>Qual o nome do técnico?</label>
                        <input
                            type="text"
                            placeholder="insira o técnico atual"
                            value={tecnico}
                            onChange={(e) => setTecnico(e.target.value)}
                        />

                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </div>

        </>
    )
}