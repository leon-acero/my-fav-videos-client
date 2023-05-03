import "./offlineFallback.css"


function OfflineFallback() {
  return (
    
    <div className='offlineFallback'>
      <div className='offlineFallback__leftPanel'>
        <div className='offlineFallback__laptops'>

          <h3 className='offlineFallback__subTitulo'>MY FAV VIDEOS</h3>

          <div className='offlineFallback_container_titulo'>        
            <h1 className='offlineFallback__titulo'>No estas conectado a la Red</h1>
          </div>

          <h1 className='offlineFallback__posiblesSoluciones'>Posibles Soluciones</h1>

          <div className='offlineFallback_container_slogan'>
            <p className='offlineFallback_slogan'>1. Si estas usando Wi-Fi checa tu conexión.</p>
            <p className='offlineFallback_slogan'>2. Si estas usando datos checa si tienes saldo y haz una recarga de ser necesario.</p>
            <p className='offlineFallback_slogan'>3. Si estas en un lugar con mala recepción muévete de lugar.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfflineFallback