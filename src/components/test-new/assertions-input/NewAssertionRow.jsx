import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import TextSelect from '../../shared/TextSelect';
import TextInput from '../../shared/TextInput';

function NewAssertionRow({ assertions, setAssertions }) {
  const dispatch = useDispatch();

  const assertionTypes = useSelector((state) => state.sideloads.assertionTypes);
  const comparisonTypes = useSelector((state) => state.sideloads.comparisons);

  const [type, setType] = useState('responseTime');
  const [property, setProperty] = useState('');
  const [comparisonType, setComparisonType] = useState('equalTo');
  const [target, setTarget] = useState('');

  const handleNewType = (e) => {
    setType(e.target.value);
  };

  const handlePropertyChange = (e) => {
    setProperty(e.target.value);
  };

  const handleNewComparisonType = (e) => {
    setComparisonType(e.target.value);
  };

  const handleTargetChange = (e) => {
    setTarget(e.target.value);
  };

  const handleNewAssertionSubmit = () => {
    setProperty('');
    setTarget('');

    const newAssertion = {
      id: uuidv4(), // for assertion lookup and deletion
      type,
      property,
      comparison: comparisonType,
      target,
    };

    const assertionsCopy = [...assertions];
    assertionsCopy.push(newAssertion);
    setAssertions(assertionsCopy);
  };

  const propertyInput = () => {
    if (['body', 'header'].includes(type)) {
      return <TextInput onChange={handlePropertyChange} value={property} type="text" />;
    }
  };

  return (
    <tr>
      <td className="whitespace-nowrap py-4 px-3 text-sm">
        <TextSelect onChange={handleNewType} options={assertionTypes} />
      </td>
      <td className="whitespace-nowrap py-4 px-3 text-sm">
        { propertyInput() }
      </td>
      <td className="whitespace-nowrap py-4 px-3 text-sm">
        <TextSelect onChange={handleNewComparisonType} options={comparisonTypes} />
      </td>
      <td className="whitespace-nowrap py-4 px-3 text-sm">
        <TextInput onChange={handleTargetChange} value={target} type="text" />
      </td>
      <td className="text-sm text-table-value">
        { type === 'responseTime' ? 'ms' : ''}
      </td>
      <td className="text-heading-h4">
        <div className="grid align-items-end justify-items-end mr-4">
          <button type="button" onClick={handleNewAssertionSubmit}>Add</button>
        </div>
      </td>
    </tr>
  );
}

export default NewAssertionRow;
