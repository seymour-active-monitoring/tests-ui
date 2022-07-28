import { React, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GREEN_CHECK_MARK, RED_X, STOPWATCH } from '../../constants/IconUrls';
import apiClient from '../../services/ApiClient';
import { formatDateLong } from '../../utils/helpers';
import Assertions from './Assertions';

function TestRun() {
  const { testId, runId } = useParams();

  // test data
  const [testName, setTestName] = useState('');
  const [testHttpMethod, setTestHttpMethod] = useState('');
  const [testUrl, setTestUrl] = useState('');
  const [testCreatedAt, setTestCreatedAt] = useState('');

  // test run data
  const [assertions, setAssertions] = useState([]);
  const [regionName, setRegionName] = useState('');
  const [regionDisplayName, setRegionDisplayName] = useState('');
  const [regionFlagUrl, setRegionFlagUrl] = useState('');
  const [completedAt, setCompletedAt] = useState('');
  const [statusCode, setStatusCode] = useState('');
  const [responseTime, setResponseTime] = useState('');
  const [responseBody, setResponseBody] = useState({});
  const [responseHeaders, setResponseHeaders] = useState({});
  const [success, setSuccess] = useState(null);

  const getTestRunHook = () => {
    const run = async () => {
      try {
        const testRunData = await apiClient.getTestRun({ testId, runId });
        setTestName(testRunData.name);
        setTestHttpMethod(testRunData.method);
        setTestUrl(testRunData.url);
        setTestCreatedAt(testRunData.createdAt);
        setAssertions(testRunData.runs[0].assertions);
        setRegionName(testRunData.runs[0].regionName);
        setRegionDisplayName(testRunData.runs[0].regionDisplayName);
        setRegionFlagUrl(testRunData.runs[0].regionFlagUrl);
        setStatusCode(testRunData.runs[0].responseStatus);
        setResponseTime(testRunData.runs[0].responseTime);
        setCompletedAt(testRunData.runs[0].completedAt);
        setResponseBody(testRunData.runs[0].responseBody);
        setResponseHeaders(testRunData.runs[0].responseHeaders);
        setSuccess(testRunData.runs[0].success);
      } catch (err) {
        console.log(err);
      }
    };
    run();
  };

  useEffect(getTestRunHook, []);

  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="flex items-center">
        <div className="w-6 mr-2">
          <img src={success ? GREEN_CHECK_MARK : RED_X} alt="success" />
        </div>
        <Link to={`/tests/${testId}/runs`}>
          <h1 className="text-3xl font-bold text-gray-900">{testName}</h1>
        </Link>
        <div className="ml-4 text-gray-400">
          {`${success ? 'Passed' : 'Failed'} on ${formatDateLong(completedAt)} from ${regionDisplayName}`}
        </div>
        <div className="w-6 ml-2">
          <img src={regionFlagUrl} alt={regionName} />
        </div>
      </div>
      <div className="text-gray-400">
        {`Created on ${formatDateLong(testCreatedAt)}`}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          { `${testHttpMethod} ${testUrl}` }
        </div>
        <div className="justify-items-end flex">
          <div>
            {statusCode}
          </div>
          <div className="flex items-center">
            <div className="ml-2">
              {responseTime}
              {' '}
              ms
            </div>
            <div className="w-6 ml-2">
              <img src={STOPWATCH} alt="clock" />
            </div>
          </div>
        </div>
        <div />
      </div>
      <Assertions assertions={assertions} />

    </div>
  );
}

export default TestRun;
