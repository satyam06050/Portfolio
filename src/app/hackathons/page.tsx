import Hackathons from "@/components/Hackathon";

export default function HackathonsPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">my hackathons.</h1>
      <Hackathons />
    </article>
  );
}
