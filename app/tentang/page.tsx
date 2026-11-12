import Ikon from "@/components/Ikon";

export default function HalamanTentang() {
  return (
    <div className="page-wrap inner-page">
      <header className="page-heading">
        <span className="eyebrow">Tentang Eventku</span>
        <h1>Lebih mudah menemukan pengalaman yang berarti.</h1>
        <p>
          Eventku membantu kamu menjelajahi acara pilihan dan menemukan detail
          yang dibutuhkan sebelum merencanakan kehadiran.
        </p>
      </header>
      <section className="about-panel">
        <span className="about-icon">
          <Ikon nama="ticket" />
        </span>
        <div>
          <h2>Temukan. Rencanakan. Nikmati.</h2>
          <p>
            Kami merapikan informasi acara dalam satu tempat—mulai dari jadwal,
            lokasi, hingga ketersediaan tiket—agar kamu bisa fokus menantikan
            momennya.
          </p>
        </div>
      </section>
    </div>
  );
}