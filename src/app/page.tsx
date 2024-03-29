import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center p-2">
      <Image
        src="/robfalken.png"
        alt="Rob Falken"
        width={32}
        height={32}
        className="rounded mr-2"
      />
      Rob Falken.
    </main>
  );
}
