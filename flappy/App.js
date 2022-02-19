import React, {useState, useEffect} from 'react'
import { Dimensions, StyleSheet, View, TouchableWithoutFeedback, Text} from 'react-native';
import Passaro from "./components/passaro/passaro.js";
import Obstaculo from "./components/passaro/Obstaculo"

export default function App() {

  const screenWidht = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const passaroLeft = screenWidht / 2
  const [passaroBottom, setPassaroBottom] = useState(screenHeight/2)
  const [pontuacao, setPontuacao] = useState(0)
  const gravidade = 3
  const [obstaculoLeft, setObstaculoLeft] = useState(screenWidht)
  const [obstaculoLeftDois, setObstaculoLeftDois] = useState(screenWidht + screenWidht/2 + 20)
  const [obstaculoNegHeight, setObstaculoNegHeight] = useState(0)
  const [obstaculoNegHeightDois, setObstaculoNegHeightDois] = useState(0)
  const obstaculoWidht = 60
  const obstaculoHeight = 350
  const espacoEntreCanos = 250
  let jogoTimer
  let obstaculoLeftTimer
  let obstaculoLeftTimerDois
  const [isGameOver, setIsGameOver] = useState(false)


  //passarinho caindo
  useEffect(() => {
    if(passaroBottom > 0){

      jogoTimer = setInterval(() => {
        setPassaroBottom(passaroBottom => passaroBottom - gravidade)
      },30)

      return() =>{
        clearInterval(jogoTimer)
      }
    }
  }, [passaroBottom])

  console.log(passaroBottom)

  const jump=()=>{
    if(!isGameOver && (passaroBottom < screenHeight)){
      setPassaroBottom(passaroBottom=>passaroBottom+50)
      console.log("jump")
    }
  }

  //obstaculo

  useEffect(() => {
    if(obstaculoLeft > -obstaculoWidht){
      obstaculoLeftTimer = setInterval(() => {
        setObstaculoLeft(obstaculoLeft => obstaculoLeft - 5)
      },30)
    
    return() =>{
      clearInterval(obstaculoLeftTimer)
    }
  }else{
    setObstaculoLeft(screenWidht)
    setObstaculoNegHeight(-Math.random()*100)
    setPontuacao(pontuacao => pontuacao + 1)
  }
}, [obstaculoLeft])
  

   //obstaculo

   useEffect(() => {
    if(obstaculoLeftDois > -obstaculoWidht){
      obstaculoLeftTimerDois = setInterval(() => {
        setObstaculoLeftDois(obstaculoLeftDois => obstaculoLeftDois - 5)
      },30)
    
    return() =>{
      clearInterval(obstaculoLeftTimerDois)
    }
  }else{
    setObstaculoLeftDois(screenWidht)
    setObstaculoNegHeightDois(-Math.random()*100)
    setPontuacao(pontuacao => pontuacao + 1)

  }
}, [obstaculoLeftDois])
  

//colisão

useEffect(()=>{
  if(
  ((passaroBottom < (obstaculoNegHeight + obstaculoHeight + 30)|| 
  passaroBottom >(obstaculoNegHeight + obstaculoHeight + espacoEntreCanos - 30))  &&
  (obstaculoLeft > screenWidht/2 - 30 && obstaculoLeft < screenWidht/2 + 30)
  )
  ||
  ((passaroBottom < (obstaculoNegHeightDois + obstaculoHeight + 30)|| 
  passaroBottom >(obstaculoNegHeightDois + obstaculoHeight + espacoEntreCanos - 30))  &&
  (obstaculoLeftDois > screenWidht/2 - 30 && obstaculoLeftDois < screenWidht/2 + 30)
  )
  )
  {
    console.log("game over")
    gameOver()
    
  }


})


const gameOver = () =>{

  clearInterval(jogoTimer)
  clearInterval(obstaculoLeftTimer)
  clearInterval(obstaculoLeftTimerDois)
  setIsGameOver(true)
}




  return (

    <TouchableWithoutFeedback onPress={jump}>
    <View style={styles.container}>
      {isGameOver && <Text> {pontuacao} </Text>}
      <Passaro
        passaroBottom = {passaroBottom}
        passaroLeft = {passaroLeft}
      />

      <Obstaculo
        cor = {"green"}
        obstaculoWidht = {obstaculoWidht}
        obstaculoHeight = {obstaculoHeight}
        randomBottom={obstaculoNegHeight}
        espacoEntreCanos = {espacoEntreCanos}  
        obstaculoLeft={obstaculoLeft}
      
      />

      <Obstaculo
        cor={"yellow"}
        obstaculoWidht = {obstaculoWidht}
        obstaculoHeight = {obstaculoHeight}
        randomBottom={obstaculoNegHeightDois}
        espacoEntreCanos = {espacoEntreCanos}  
        obstaculoLeft={obstaculoLeftDois}
      
      />


    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
