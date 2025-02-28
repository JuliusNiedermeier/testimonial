import Link from "next/link";
import { FC } from "react";

const Home: FC = () => {
  return (
    <div className="h-[100svh] flex flex-col p-6">
      <header className="flex justify-end">
        <Link href="login">Login</Link>
      </header>
      <div className="flex-1 grid place-content-center">
        <h1 className="text-heading font-serif">Testimonial</h1>
        <p className="text-label">The smoothest way to gather testimonials.</p>
      </div>
    </div>
  );
};

export default Home;
