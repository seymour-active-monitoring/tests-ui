import React, {
  useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import TestRuns from '../../entities/TestRuns';
import apiClient from '../../services/ApiClient';
import { flagUrls, testRunsCompletedAtDifference } from '../../utils/helpers';
import TestBanner from '../shared/TestBanner';
import TestRunsTable from '../shared/TestRunsTable';
import LineChart from './LineChart';
import ResultCards from './ResultCards';

const RUNS_TO_DISPLAY = 3;

function TestResults() {
  const ref = useRef(null);
  const testId = useParams().id;
  const [testRuns, setTestRuns] = useState([]);
  const [testBannerData, setTestBannerData] = useState({});
  const [width, setWidth] = useState(1200);

  useLayoutEffect(() => {
    setWidth(ref?.current?.offsetWidth);
  }, []);

  const addAssertionCountsAndSetRuns = (runs) => {
    const shapedRuns = runs.map((run) => {
      const assertionsTotalCount = run.assertions.length;
      const assertionsPassedCount = run.assertions.filter((a) => a.success).length;
      return { ...run, assertionsTotalCount, assertionsPassedCount };
    });
    setTestRuns(shapedRuns);
  };

  const processTestRunDataSummary = (runs) => {
    const runsEntity = new TestRuns(runs);
    runsEntity.process();
    return runsEntity.summary();
  };

  const getTestRunsHook = () => {
    const run = async () => {
      try {
        const testData = await apiClient.getTestRuns({ testId });
        addAssertionCountsAndSetRuns(testData.runs);
        const {
          name, method, url, createdAt, updatedAt,
        } = testData;
        setTestBannerData({
          id: testId, name, method, url, createdAt, updatedAt,
        });
      } catch (err) {
        console.log(err);
      }
    };
    run();
  };

  useEffect(getTestRunsHook, []);

  const mostRecentTestRuns = ({ testRuns, count }) => testRuns.sort(
    testRunsCompletedAtDifference,
  ).slice(0, count);

  return (
    <div className="max-w-7xl mx-auto px-8">
      <TestBanner
        testData={testBannerData}
        flagUrls={flagUrls(testRuns)}
      />
      <ResultCards summaryData={processTestRunDataSummary(testRuns)} />
      <div className="flex items-center mb-1">
        <h1 className="mr-5 text-xl font-bold text-primary-900">{`Last ${RUNS_TO_DISPLAY} results`}</h1>
        <Link to={`/tests/${testId}/runs`}>
          <div className="text-secondary-800 hover:text-secondary-700">See all test runs</div>
        </Link>
      </div>
      <TestRunsTable testRuns={mostRecentTestRuns({ testRuns, count: RUNS_TO_DISPLAY })} />
      <h3 className="mr-5 text-xl font-bold text-heading-h3">Performance</h3>
      <h5 className="mb-4 mr-5 text-l font-semibold text-heading-h5">Response time</h5>
      <LineChart widthPixels={width} testRuns={testRuns} />
    </div>
  );
}

export default TestResults;
