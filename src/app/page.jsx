import Chrome from './components/Chrome';
import Hero from './components/Hero';
import History from './components/History';
import Stages from './components/Stages';
import Landscape from './components/Landscape';
import Gallery from './components/Gallery';
import Team from './components/Team';
import Thanks from './components/Thanks';

export default function Page() {
  return (
    <>
      <div id="top" />
      <Chrome />
      <div className="film-grain" />
      <main>
        <Hero />
        <History />
        <Stages />
        <Landscape />
        <Gallery />
        <Team />
        <Thanks />
      </main>
    </>
  );
}
