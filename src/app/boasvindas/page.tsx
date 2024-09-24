'use client';
import Modal from '@/components/Modal/Modal'
import definirSaudacao from '@/utils/definirSaudacao'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

const BoasVindas = () => {
  const [nome, setNome] = useState("")
  const router = useRouter();

  useEffect(() => {
    const localConfig = localStorage.getItem("config")
    const configObj = JSON.parse(localConfig ?? "{}")
    if (configObj?.nome) {
      setNome(configObj?.nome)
      router.push('/')
    }
  }, [])

  const handleConfirmar = () => {
    if (!nome || nome.length < 3) {
      return
    }
    const config = { nome }
    localStorage.setItem("config", JSON.stringify(config))
    setNome(nome)
    router.push('/')
  }

  return (
    <Modal>
      <h1 className="title">{`Olá, ${definirSaudacao()}!`}</h1>
      <p>Para começarmos, qual seu nome?</p>
      <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <button disabled={!nome || nome.length < 3} className="btn-primary" onClick={handleConfirmar}>
        Confirmar
      </button>
    </Modal>
  )
}

export default BoasVindas