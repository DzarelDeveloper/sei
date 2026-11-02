import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RouteMeta, ScrollManager } from './components/Layout'
import { CharacterProvider } from './state/CharacterContext'
import { ExplorationProvider } from './state/ExplorationContext'
import { SettingsProvider } from './state/SettingsContext'
import { AssessmentIntroPage } from './pages/AssessmentIntroPage'
import { AssessmentPage } from './pages/AssessmentPage'
import { AiResultsPage } from './pages/AiResultsPage'
import { ComparePage } from './pages/ComparePage'
import { CompletionPage } from './pages/CompletionPage'
import { FieldExplorePage } from './pages/FieldExplorePage'
import { LandingPage } from './pages/LandingPage'
import { LevelSelectPage } from './pages/LevelSelectPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PathwaysPage } from './pages/PathwaysPage'
import { ResultsPage } from './pages/ResultsPage'
import { SettingsPage } from './pages/SettingsPage'
import { SmaSmkResultsPage } from './pages/SmaSmkResultsPage'
import { TendencyPage } from './pages/TendencyPage'
import { TrackSelectPage } from './pages/TrackSelectPage'

export default function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <CharacterProvider>
        <SettingsProvider>
          <ExplorationProvider>
            <ScrollManager />
            <RouteMeta />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/pengaturan" element={<SettingsPage />} />
              <Route path="/mulai" element={<LevelSelectPage />} />
              <Route path="/mulai/sekolah" element={<TrackSelectPage />} />
              <Route path="/asesmen" element={<AssessmentPage />} />
              <Route path="/asesmen/pengantar" element={<AssessmentIntroPage />} />
              <Route
                path="/asesmen/kecenderungan"
                element={<TendencyPage />}
              />
              <Route path="/asesmen/selesai" element={<CompletionPage />} />
              <Route path="/hasil" element={<ResultsPage />} />
              <Route path="/hasil/sma-smk" element={<SmaSmkResultsPage />} />
              <Route path="/hasil/ai" element={<AiResultsPage />} />
              <Route path="/jalur" element={<PathwaysPage />} />
              <Route path="/jalur/bandingkan" element={<ComparePage />} />
              <Route path="/jelajah/bidang/:fieldId" element={<FieldExplorePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ExplorationProvider>
        </SettingsProvider>
      </CharacterProvider>
    </BrowserRouter>
  )
}
