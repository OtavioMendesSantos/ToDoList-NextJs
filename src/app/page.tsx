"use client";
import ActivitiesCards from "@/components/ActivitiesCard/ActivitiesCards";
import Header from "@/components/Header/Header";
import ModalBoasVindas from "@/components/ModalBoasVindas/ModalBoasVindas";
import { useState } from "react";


export default function Home() {
  const [userName, setUserName] = useState("")
  const attUserName = (name: string) => {
    setUserName(name)
  }

  if (userName === '') return (<ModalBoasVindas callback={attUserName} />)

  return (
    <>
      <Header />
      <main className="main">
        <section style={{ gridColumn: '2 / 3' }}>
          <ActivitiesCards />
        </section>
      </main>
    </>
  );
}
