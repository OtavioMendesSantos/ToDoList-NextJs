import React, { useEffect, useState } from 'react'
import Modal from '../Modal/Modal'
import definirSaudacao from '@/utils/definirSaudacao'

const ModalBoasVindas = ({ callback }: { callback: (arg0: string) => void }) => {
    const [nome, setNome] = useState("")
    const [modalOpen, setModalOpen] = useState(true)

    useEffect(() => {
        const localConfig = localStorage.getItem("config")
        const configObj = JSON.parse(localConfig ?? "{}")
        if (configObj?.nome) {
            callback(configObj?.nome)
            setModalOpen(false)
        } else {
            setModalOpen(true)
        }
    }, [])

    const handleConfirmar = () => {
        if (!nome || nome.length < 3) {
            return
        }

        const config = { nome }
        localStorage.setItem("config", JSON.stringify(config))

        callback(nome)
        setModalOpen(false)
    }

    return (
        <>
            {modalOpen && (
                <Modal style={{ backgroundColor: "#fff" }}>
                    <h1 className="title">{`Olá, ${definirSaudacao()}!`}</h1>
                    <p>Para começarmos, qual seu nome?</p>
                    <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <button disabled={!nome || nome.length < 3} className="btn-primary" onClick={handleConfirmar}>
                        Confirmar
                    </button>
                </Modal>
            )}
        </>
    )
}

export default ModalBoasVindas