import { useState,useEffect } from 'react'
import './App.css'

function App() {
  
  const [name, setName] =useState("")
  const [gold, setGold] = useState(0)
  const [silver, setSilver]= useState(0)
  const [bronze, setBronze] = useState(0)

  const [countrys, setCountrys] =useState([])

  const [ischeck, setIscheck] = useState(false)

  useEffect(()=>{
    //눌렸을 때 ischeck은 트루
    //안눌렸을 때 ischeck은 false
    const sortnow=sortmadel([...countrys])
    setCountrys(sortnow)

  },[ischeck])

  function reset(){
    setName("")
    setGold(0)
    setSilver(0)
    setBronze(0)
  }

  function sortmadel(before){
    if(ischeck){
      return before.sort((a,b)=>{
        const totala= a.gold+a.silver+a.bronze;
        const totalb=b.gold+b.silver+b.bronze;
        return totalb-totala
      })
    }else{return before.sort((a,b)=>b.gold-a.gold)}
  }


  function addCountry(e){
    e.preventDefault();
    const has=countrys.findIndex((item)=>item.name ===name)
    if (has===-1){
      const newCountry={
        name: name,
        gold: gold,
        silver: silver,
        bronze: bronze
      }
      const nowCountry=[...countrys, newCountry]
      const sortnow=sortmadel(nowCountry)
      setCountrys(sortnow)
    }else{alert("이미 존재하는 나라입니다.")}
    reset()
  }

  function updateCountry(){
    const has= countrys.findIndex((item)=>item.name===name)
    if(has===-1){
      alert("등록되지 않은 국가입니다.")
    }else{
      const newcountrys= countrys.filter((country)=>country.name!==name)
      const updatecountry={
        name: name,
        gold: gold,
        silver: silver,
        bronze: bronze
      }
      const nowcountrys= [...newcountrys, updatecountry]
      const sortnow=sortmadel(nowcountrys)

      setCountrys(sortnow)
    }
    reset()
  }

  function delCountry(name){
    const nowcountrys = countrys.filter((country)=>{return country.name!==name})
    setCountrys([...nowcountrys])
  }


  return (
    <>
      <div>
        <h1>올림픽</h1>
        <label>총 메달 수로 정렬<input type='checkbox' checked={ischeck}
          onChange={e=>setIscheck(e.target.checked)}
        /></label>
        
      </div>
      <div>
        <form onSubmit={addCountry}>
          <label>
            국가명
            <input value={name} onChange={(e)=>{setName(e.target.value)}}/>
          </label>
          <label>
            금메달
            <input value={gold} onChange={(e)=>{setGold(+e.target.value)}} min={0}/>
          </label>
          <label>
            은메달
            <input value={silver} onChange={(e)=>{setSilver(+e.target.value)}} min={0}/>
          </label>
          <label>
            동메달
            <input value={bronze} onChange={(e)=>{setBronze(+e.target.value)}} min={0}/>
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
