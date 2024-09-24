'use client';
import Modal from '@/components/Modal/Modal';
import definirSaudacao from '@/utils/definirSaudacao';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

const BoasVindas = () => {
  const [nome, setNome] = useState("");
  const router = useRouter();

  useEffect(() => {
    const localConfig = localStorage.getItem("config");
    const configObj = JSON.parse(localConfig ?? "{}");
    // Verifica se o nome já está definido no localStorage
    if (configObj?.nome) {
      setNome(configObj.nome); // Apenas define o nome, não redireciona imediatamente
      // Redirecionar apenas se já houver nome
      router.push('/');
    }
  }, [router]);

  const handleConfirmar = () => {
    if (!nome || nome.length < 3) {
      return;
    }
    const config = { nome };
    localStorage.setItem("config", JSON.stringify(config));
    // Redireciona após confirmar o nome
    router.push('/');
  };

  return (
    <Modal>
      <h1 className="title">{`Olá, ${definirSaudacao()}!`}</h1>
      <p>Para começarmos, qual seu nome?</p>
      <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <button disabled={!nome || nome.length < 3} className="btn-primary" onClick={handleConfirmar}>
        Confirmar
      </button>
    </Modal>
  );
};

export default BoasVindas;
