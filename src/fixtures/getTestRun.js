const getTestRunResponse = {
  id: 13,
  name: '0727-t4',
  method: 'post',
  url: 'https://trellific.corkboard.dev/api/boards',
  createdAt: '2022-07-27T18:25:52.654Z',
  runs: [
    {
      id: 833,
      testId: 13,
      success: true,
      completedAt: '2022-07-27T18:26:30.883Z',
      regionName: 'eu-north-1',
      regionDisplayName: 'Stockholm',
      regionFlagUrl: 'https://countryflagsapi.com/png/sweden',
      responseTime: '607',
      responseStatus: '201',
      responseBody: {
        _id: '62e1835397e4e03502e0c79c',
        title: '0727-t4 board test',
        createdAt: '2022-07-27T18:26:27.421Z',
        updatedAt: '2022-07-27T18:26:27.421Z',
      },
      responseHeaders: {
        date: 'Wed, 27 Jul 2022 18:26:27 GMT',
        etag: 'W/"8d-6pBWsSkppIUQ3VfbjSMdxQVaCRY"',
        server: 'nginx/1.18.0 (Ubuntu)',
        connection: 'close',
        'content-type': 'application/json; charset=utf-8',
        'x-powered-by': 'Express',
        'content-length': '141',
        'request-duration': 607,
        'access-control-allow-origin': '*',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept',
      },
      assertions: [
        {
          id: 1,
          type: 'responseTime',
          property: null,
          comparison: 'lessThan',
          expectedValue: '700',
          actualValue: '607',
          success: true,
        },
        {
          id: 2,
          type: 'statusCode',
          property: null,
          comparison: 'equalTo',
          expectedValue: '201',
          actualValue: '201',
          success: true,
        },
      ],
    },
  ],
};

export default getTestRunResponse;
