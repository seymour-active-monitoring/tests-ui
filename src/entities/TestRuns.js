/* eslint-disable no-underscore-dangle */
import percentile from 'percentile';

class TestRuns {
  constructor(runs) {
    this._runs = runs;
    this._runsWithFailedRequests = 0;
    this._runsWithFailedAssertions = 0;
    this._responseTimes = [];
  }

  sortResponseTimesAscending() {
    this._responseTimes.sort((t1, t2) => t1 - t2);
  }

  percentileResponseTime(p) {
    this.sortResponseTimesAscending();
    return percentile(p, this._responseTimes);
  }

  process() {
    this._runs.forEach((run) => {
      this._responseTimes.push(Number(run.responseTime));
      if (Number(run.responseCode) > 400) {
        this._runsWithFailedRequests += 1;
      }
      if (!run.success) {
        this._runsWithFailedAssertions += 1;
      }
    });
  }

  summary() {
    const runsCount = this._runs.length;
    const availability = ((runsCount - this._runsWithFailedRequests) * 100.0) / runsCount;
    const runsWithFailedAssertions = this._runsWithFailedAssertions;
    const responseTimeP50 = this.percentileResponseTime(50);
    const responseTimeP95 = this.percentileResponseTime(95);

    return {
      availability,
      runsWithFailedAssertions,
      responseTimeP50,
      responseTimeP95,
    };
  }
}

export default TestRuns;
