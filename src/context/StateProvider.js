import React, {useState, createContext} from "react";

export const stateContext = createContext()


function StateProvider (props) {

	const [listaDeVideos, setListaDeVideos] = useState (null);

    const [videoSeleccionado, setVideoSeleccionado] = useState (null)

	return (
		<stateContext.Provider value = { 
            {   listaDeVideos, setListaDeVideos, 
                videoSeleccionado, setVideoSeleccionado 
            } 
        }>
			{props.children}
		</stateContext.Provider >
	)

}

export default StateProvider