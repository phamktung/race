import React,{useEffect} from "react";

const MbExchange = () => {
  const exchange = async () =>{
    const request = await fetch( 'https://cdnstoremedia.com/adt/cpc/cpm7k/demo/mbbank/mb-exchange-rate.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    } );

    const result = await request.json();
    console.log('result', result)
  }
  useEffect(()=>{
    exchange().then()
  },[]);
  return (
    <>

    </>
  )
}

export default MbExchange