"use client";
import Activity from "@/components/Activity/Activity";
import Header from "@/components/Header/Header";
import ModalNewActivity from "@/components/ModalNewActivity/ModalNewActivity";
import { useEffect, useState } from "react";
type Status = "done" | "pending";
import styles from "./page.module.scss";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

export interface Item {
  title: string;
  id: string;
  status: Status;
}

export default function Home() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [listItens, setListItens] = useState<Item[]>([]);

  // Verificar se o localStorage está disponível no lado do cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedConfig = JSON.parse(localStorage.getItem("config") || "{}");

      if (!savedConfig?.nome) {
        router.push("/boasvindas");
      }

      const itensLocalStorage = localStorage.getItem("list");
      const listItens: Item[] = itensLocalStorage ? JSON.parse(itensLocalStorage) : [];
      setListItens(listItens);
    }
  }, [router]);

  useEffect(() => {
    if (listItens.length > 0) {
      localStorage.setItem("list", JSON.stringify(listItens));
    }
  }, [listItens]);

  // Atualizar o status de um item (pending/done)
  const updateItemStatus = (id: string) => {
    setListItens((prevItens) =>
      prevItens.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'pending' ? 'done' : 'pending' }
          : item
      )
    );
  };

  // Remover item da lista
  const removeItem = (id: string) => {
    if (listItens.length === 1) {
      localStorage.removeItem("list");
      setListItens([]);
      return;
    }
    setListItens((prevItens) => prevItens.filter((item) => item.id !== id));
  };

  // Adicionar um novo item à lista
  const addItem = (item: string) => {
    setListItens((prevItens) => [
      ...prevItens,
      {
        title: item,
        id: uuid(),
        status: 'pending',
      },
    ]);
  };

  return (
    <>
      <Header />
      <main>
        <section className={styles.cardContainer}>
          <div className={styles.mainCard}>
            {listItens.length === 0
              ? <p className="text-secondary title">Nenhuma tarefa pendente</p>
              : (<>
                {listItens.some((item) => item.status === "pending") &&
                  (<>
                    <h2 className="text-secondary title">Suas tarefas de hoje</h2>
                    <div className={styles.activityContainer}>
                      {listItens
                        .filter((item) => item.status === 'pending')
                        .map((item) => (
                          <Activity
                            key={item.id}
                            item={item}
                            onUpdateStatus={updateItemStatus}
                            onRemove={removeItem}
                          />
                        ))}
                    </div>
                  </>)}
                {listItens.some((item) => item.status === "done") && (<>
                  <h2 className="text-secondary title">Tarefas Finalizadas</h2>
                  <div className={styles.activityContainer}>
                    {listItens
                      .filter((item) => item.status === 'done')
                      .map((item) => (
                        <Activity
                          key={item.id}
                          item={item}
                          onUpdateStatus={updateItemStatus}
                          onRemove={removeItem}
                        />
                      ))}
                  </div>
                </>)}
              </>)}
          </div>
          <button
            className={'btn-primary'}
            onClick={() => setModalOpen(true)}
          >
            Adicionar Nova Tarefa
          </button>
        </section>
      </main>
      {modalOpen &&
        <ModalNewActivity onClose={() => setModalOpen(false)} onAddItem={addItem} />
      }
    </>
  );
}
