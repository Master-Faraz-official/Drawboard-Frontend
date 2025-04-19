import { ResultType } from '@/app/page';
import React from 'react'

interface resultPropType {
  result: ResultType[];
}

const ResultForm = ({ result }: resultPropType) => {
  console.log(result)
  return (
    <div className='w-full h-[220px] flex flex-col '>
      <h1>This is result form</h1>
      {result.map((item, idx) => (
        <p key={idx} className='flex flex-col '>
          {item.expr} = {item.result}
        </p>
      ))}
    </div>
  )
}

export default ResultForm