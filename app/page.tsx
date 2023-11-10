import Board from "@/components/Board";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import Image from "next/image";

export default function Home() {
   return (
      <main className="relative">
         <Header />
         <Modal />
         <Board />
      </main>
   );
}
