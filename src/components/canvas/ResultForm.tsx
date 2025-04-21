import { ResultType } from '@/app/page';
import React from 'react';

interface resultPropType {
  result: ResultType[];
}

const ResultForm = ({ result }: resultPropType) => {
  return (
    <div className='w-full h-[220px] flex flex-col items-center  p-4 text-slate-300 '>

      <h1 className='font-bold text-lg  '> Computation Summary </h1>

      <div className='flex flex-col space-y-2 pt-5 text-slate-400 '>
        {result.map((item, idx) => (
          <div key={idx} className='flex'>
            <div className='font-semibold'>{item.expr}</div>
            <div className=''>
              {typeof item.result === 'number' ? (
                <p>= {item.result}</p>
              ) : (
                Object.entries(item.result).map(([key, value], index) => (
                  <p key={index}>
                    {key} = {value}
                  </p>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultForm;
