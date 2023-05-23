import React from 'react'

function ShowData(response) {
  
  let totalTime = response.response.Total;
  let path = response.response.Path.join(' > ');

  return (
    <div>
      
      <p>
        <b>
          <p>It will take { totalTime } seconds to be delivered.</p>
          <p>This is the fastest route found to pick up and deliver:</p>
        </b> 
        <p>
        { path }
        </p> 
      </p>

      <p>
       
      </p>

    </div>
  )
}

export default ShowData