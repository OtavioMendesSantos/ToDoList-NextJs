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
  const [nome] = useState<string>(JSON.parse(localStorage.getItem("config") || "{}")?.nome || "");
  const [modalOpen, setModalOpen] = useState(false)
  const [listItens, setListItens] = useState<Item[]>([]);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!!nome) return;
    router.push("/boasvindas")
  }, [nome, router]);

  useEffect(() => {
    const itensLocalStorage = localStorage.getItem("list");
    const listItens: Item[] = itensLocalStorage ? JSON.parse(itensLocalStorage) : [];
    setListItens(listItens);
    setIsLoaded(true)
  }, []);

  useEffect(() => {
    if (!isLoaded) return
    if (listItens.length > 0) {
      localStorage.setItem("list", JSON.stringify(listItens));
    }
  }, [listItens]);

  const updateItemStatus = (id: string) => {
    setListItens((prevItens) =>
      prevItens.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'pending' ? 'done' : 'pending' }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setListItens((prevItens) => prevItens.filter((item) => item.id !== id));
  };

  const addItem = (item: string) => {
    setListItens((prevItens) => [
      ...prevItens,
      {
        title: item,
        id: uuid(),
        status: 'pending',
      },
    ])
  }

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
                            onUpdateStatus={updateItemStatus} // Passa a função de atualizar status
                            onRemove={removeItem} // Passa a função de remover item
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
                          onUpdateStatus={updateItemStatus} // Passa a função de atualizar status
                          onRemove={removeItem} // Passa a função de remover item
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
