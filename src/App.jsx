import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import TestResults from './components/test-results/TestResults';
import TestRuns from './components/test-runs/TestRuns';
import Header from './components/Header';
import Tests from './components/tests/Tests';
import TestRun from './components/test-run/TestRun';
import TestEdit from './components/test-edit/TestEdit';
import TestNew from './components/test-new/TestNew';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Tests />} />
          <Route index element={<Tests />} />
          <Route path="/tests/:testId/runs/:runId" element={<TestRun />} />
          <Route path="/tests/:id/runs" element={<TestRuns />} />
          <Route path="/tests/:id/results" element={<TestResults />} />
          <Route path="/tests/:id/edit" element={<TestEdit />} />
          <Route path="/tests/new" element={<TestNew />} />
          <Route path="/tests/:id" element={<TestResults />} />
          <Route path="/tests" element={<Tests />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
