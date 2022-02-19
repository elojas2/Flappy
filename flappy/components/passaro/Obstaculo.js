
import { View } from 'react-native';
import React from 'react';


const Obstaculo = ({cor, obstaculoLeft, obstaculoWidht, obstaculoHeight, espacoEntreCanos, randomBottom}) => {

    return (
        <>
            <View style ={{
                position: "absolute",
                backgroundColor: cor,
                width: obstaculoWidht,
                height: obstaculoHeight,
                left: obstaculoLeft,
                bottom: randomBottom + obstaculoHeight + espacoEntreCanos,

            }}/>

            <View style ={{
                position: "absolute",
                backgroundColor: cor,
                width: obstaculoWidht,
                height: obstaculoHeight,
                left: obstaculoLeft,
                bottom: randomBottom,

            }}
            />
    
        </>
    )
}

export default Obstaculo