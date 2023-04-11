import React, { useState } from 'react';

import BarChart from './BarChart';
import AreaChart from './AreaChart';
import { useAppCtx } from '../context/appContext';
import Wrapper from '../assets/wrappers/ChartsContainer';

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useAppCtx();
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart((state) => !state)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;
