import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header>
        <h1 className="text-primary">Battery Manager</h1>{" "}
      </header>
      <main>
        <Link className="text-primary" href="/devices">
          Devices
        </Link>
      </main>
      <footer>
        <Link className="text-primary" href={"https://github.com/Hazardooo"}>
          Author
        </Link>
      </footer>
    </div>
  );
}
