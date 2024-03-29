import { React, useEffect } from 'react';

const SPACES_FOR_TAB = 2;

const SAMPLE_JSON = `{
  "key1": "value1",
  "key2": "value2",
  "key3": "value3"
}
`;

function CodeInput({ requestBody, setRequestBody }) {
  useEffect(() => {
    if (requestBody.caret >= 0) {
      requestBody.target.setSelectionRange(
        requestBody.caret + SPACES_FOR_TAB,
        requestBody.caret + SPACES_FOR_TAB,
      );
    }
  }, [requestBody]);

  const handleTab = (e) => {
    const content = e.target.value;
    const caret = e.target.selectionStart;

    if (e.key === 'Tab') {
      e.preventDefault();
      const newRequestBody = content.substring(0, caret) + ' '.repeat(SPACES_FOR_TAB) + content.substring(caret);
      setRequestBody({ value: newRequestBody, caret, target: e.target });
    }
  };

  const handleRequestBodyChange = (e) => {
    setRequestBody({ value: e.target.value, caret: -1, target: e.target });
  };

  return (
    <div className="mt-1">
      <textarea
        rows={6}
        className="shadow-sm bg-slate-800 text-secondary-700 focus:ring-slate-500 focus:border-slate-500 block w-full sm:text-sm border-slate-300 rounded-md"
        onKeyDown={handleTab}
        onChange={handleRequestBodyChange}
        value={requestBody.value}
        placeholder={SAMPLE_JSON}
      />
    </div>
  );
}

export default CodeInput;
