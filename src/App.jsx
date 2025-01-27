import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [name, setName] =useState("")
  const [gold, setGold] = useState(0)
  const [silver, setSilver]= useState(0)
  const [bronze, setBronze] = useState(0)

  const [countrys, setCountrys] =useState([])

  function reset(){
    setName("")
    setGold(0)
    setSilver(0)
    setBronze(0)
  }


  function addCountry(e){
    e.preventDefault();
    const newCountry={
      name: name,
      gold: gold,
      silver: silver,
      bronze: bronze
    }
    const nowCountry=[...countrys, newCountry]
    setCountrys(nowCountry)
    reset
  }

  function updateCountry(){
    const newcountrys= countrys.filter((country)=>country.name!==name)
    const updatecountry={
      name: name,
      gold: gold,
      silver: silver,
      bronze: bronze
    }
    const nowcountrys= [...newcountrys, updatecountry]
    setCountrys(nowcountrys)
    reset
  }

  function delCountry(name){
    const nowcountrys = countrys.filter((country)=>{country.name!==name})
    setCountrys([...nowcountrys])
  }


  return (
    <>
      <div>
        <h1>올림픽</h1>
      </div>
      <div>
        <form onSubmit={addCountry}>
          <label>
            국가명
            <input value={name} onChange={(e)=>{setName(e.target.value)}}/>
          </label>
          <label>
            금메달
            <input value={gold} onChange={(e)=>{setGold(e.target.value)}} min={0}/>
          </label>
          <label>
            은메달
            <input value={silver} onChange={(e)=>{setSilver(e.target.value)}} min={0}/>
          </label>
          <label>
            동메달
            <input value={bronze} onChange={(e)=>{setBronze(e.target.value)}} min={0}/>
          </label>
          <label>
            <input type='submit'value={"추가하기"}/>
            <input type='button' value={"업데이트"} onClick={updateCountry}/>
          </label>
        </form>
      </div>
      <div>
        <ul>
          {
            countrys.map((country)=>{return <li key={country.name}>{country.name}/{country.gold}/{country.silver}/{country.bronze}
            <button onClick={()=>delCountry(country.name)}>삭제하기</button></li>})
          }
        </ul>
      </div>

    </>
  )
}

export default App
