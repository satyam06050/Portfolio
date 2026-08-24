import { HackathonCard } from "./HackathonCard";
import hackathons from "@/data/hackathon.json";

export default function Hackathons() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="grid gap-8 md:grid-cols-2">
        {hackathons.map((item) => (
          <HackathonCard key={item.title} hackathon={item} />
        ))}
      </div>
    </section>
  );
}