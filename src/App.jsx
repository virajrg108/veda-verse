import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import CantoList from './pages/sb/CantoList';
import ChapterList from './pages/sb/ChapterList';
import VerseList from './pages/sb/VerseList';
import VerseDetail from './pages/sb/VerseDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          {/* Srimad Bhagavatam Routes */}
          <Route path="sb">
            <Route index element={<CantoList />} />
            <Route path=":cantoId" element={<ChapterList />} />
            <Route path=":cantoId/:chapterId" element={<VerseList />} />
            <Route path=":cantoId/:chapterId/:verseId" element={<VerseDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
