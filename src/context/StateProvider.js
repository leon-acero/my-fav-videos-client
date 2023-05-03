import React, {useState, createContext} from "react";

export const stateContext = createContext()


function StateProvider (props) {

	const [listaDeVideos, setListaDeVideos] = useState (null);
    const [videoSeleccionado, setVideoSeleccionado] = useState (null)
	const [currentUser, setCurrentUser] = useState (null);

	return (
		<stateContext.Provider value = { 
            {   listaDeVideos, setListaDeVideos, 
                videoSeleccionado, setVideoSeleccionado,
				currentUser, setCurrentUser
            } 
        }>
			{props.children}
		</stateContext.Provider >
	)

}

export default StateProvider