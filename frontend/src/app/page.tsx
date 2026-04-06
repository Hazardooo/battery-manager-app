import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header>
        <h1>Battery Manager</h1>{" "}
      </header>
      <main>
        <Link href="/devices">Devices</Link>
      </main>
      <footer></footer>
    </div>
  );
}
