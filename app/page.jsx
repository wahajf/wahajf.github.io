import PillNavbar from './components/PillNavbar';
import MainContent from './components/MainContent';

export default function Home() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="header-hero-stage-wrapper">
        <PillNavbar />
        <MainContent renderHeroOnly={true} />
      </div>
      <MainContent renderSheetOnly={true} />
    </div>
  );
}
