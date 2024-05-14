import { useState, useCallback, useEffect , useRef} from "react";

function Generate(){

    const [length,setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [characterAllowed, setCharacterAllowed] = useState(false);
    const [Password, setPassword] = useState("");

    const passwordRef = useRef(null);

    const PasswordGenerator = useCallback(()=>{
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numberAllowed){
        str = str + "0123456789";
        
      }
      if(characterAllowed){
        str = str + "!@#$%^&*(){}[]?<>~`"
      }

      for(let i =1; i <= length; i++){
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char);
      }
      setPassword(pass);


    },[length, numberAllowed, characterAllowed, setPassword]);

   const copyPasswordToClipBoard = useCallback(()=>{
     window.navigator.clipboard.writeText(Password)
   }, [Password])

   useEffect(()=>{
      PasswordGenerator();
   },[length, numberAllowed,characterAllowed, PasswordGenerator ])
     return(
        <div className="flex justify-center items-center">
<div className="  border-2 border-fuchsia-600 flex flex-col  w-[40%] bg-slate-100 items-start pl-4 gap-3 shadow-xl">
             <section>
             <h1 className="font-sans text-4xl font-bold ">Password Generator</h1>
             </section>
            
             <section>
                 <label for="val">Length: {length}</label><br />
               <input  type="range" id="val" name="val" min={8} max={100} value={length} className="w-96 cursor-pointer"onChange={(e)=>{setLength(e.target.value)}} ></input>
             </section>
             <section>
             <input type="checkbox" id="numbers" name="numbers" value={numberAllowed}  onChange={()=>{
              setNumberAllowed((prev) => !prev);
             }}/>    
                  <label>Numbers (0-9) </label>
             </section>
             <section>
             <input type="checkbox" id="character" name="character" value={characterAllowed} onChange={()=>{
              setCharacterAllowed((prev) => !prev)
             }}/>    
                  <label> Special Characters (!#@$...)</label>
             </section>
             <section className="bg-white">
                 <input type="text" className="  outline-none w-96 border  border-black   h-8 mb-3 rounded-md p-2" value={Password} readOnly ref={passwordRef} ></input>
                 <button className="outline-none bg-fuchsia-500 text-white px-3 py-1 rounded-md" onClick={copyPasswordToClipBoard}>Copy</button>
             </section>
          
            
         </div>
        </div>
         
   )
 }

 export default Generate;

