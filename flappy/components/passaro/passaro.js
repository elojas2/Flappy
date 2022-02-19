
import { View } from 'react-native';
import React from 'react';


const Passaro =({passaroBottom, passaroLeft}) =>{

    const passaroWidth = 50
    const passaroHeight = 60

    return(
        <View style={{
            position: "absolute",
            width: 50,
            height: 60,
            backgroundColor: "blue",
            left: passaroLeft - (passaroWidth/2),
            bottom: passaroBottom - (passaroHeight/2),
        }}/>
        
)}

export default Passaro