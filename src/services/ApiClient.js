/* eslint-disable consistent-return */
import axios from 'axios';

const config = require('../config.json');

const URL = config.testsCrudUrl;

function logError(errorResponse) {
  const { response } = errorResponse;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error('Error: ', errorResponse);
  }
}

const apiClient = {
  createTest: async (test) => {
    try {
      const { data } = await axios.post(`${URL}/api/tests`, test);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  editTest: async (test, testId) => {
    try {
      const { data } = await axios.put(`${URL}/api/tests/${testId}`, test);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  getTests: async () => {
    try {
      const { data } = await axios.get(`${URL}/api/tests`);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  getTest: async ({ id }) => {
    try {
      const { data } = await axios.get(`${URL}/api/tests/${id}`);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  deleteTest: async (id) => {
    try {
      const { data } = await axios.delete(`${URL}/api/tests/${id}`);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  getSideload: async () => {
    try {
      const { data } = await axios.get(`${URL}/api/sideload`);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  runTestNow: async (testId) => {
    try {
      const { data } = await axios.post(`${URL}/api/tests/${testId}/run`);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  getTestRuns: async ({ testId }) => {
    try {
      const { data } = await axios.get(`${URL}/api/tests/${testId}/runs`);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  getTestRun: async ({ testId, runId }) => {
    try {
      const { data } = await axios.get(`${URL}/api/tests/${testId}/runs/${runId}`);
      return data;
    } catch (e) {
      logError(e);
    }
  },
};

export default apiClient;
