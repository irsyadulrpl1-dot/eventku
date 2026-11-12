import { events } from "@/Data/events";
import KatalogInteraktif from "@/components/KatalogInteraktif";

export default function HalamanEvent() {
  return (
    <div className="page-wrap inner-page">
      <header className="page-heading">
        <span className="eyebrow">Kalender pengalaman</span>
        <h1>Jelajahi event</h1>
        <p>Temukan acara yang cocok dengan minat dan waktumu.</p>
      </header>
      <KatalogInteraktif events={events} />
    </div>
  );
}