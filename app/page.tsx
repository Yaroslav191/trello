"use client";

import Board from "@/components/Board";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useModalStore } from "@/store/ModalStore";

import Image from "next/image";

export default function Home() {
   const [isOpen] = useModalStore((state) => [state.isOpen]);

   return (
      <main className="relative">
         <Header />
         {isOpen && <Modal />}
         <Board />
      </main>
   );
}
