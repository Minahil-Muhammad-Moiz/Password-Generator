import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setlength] = useState(0);
  const [numAllowed, setNumAllowed] = useState(false);
  const [CharAllowed, setCharAllowed] = useState(false);
  const [pass, setPass] = useState("");

  const passwordRef = useRef(null);

  const copyPass = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(pass)
  }, [pass])

  const passGen = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmmnopqrstuvwxyz";

    if (numAllowed) str += "012356789";
    if (CharAllowed) str += "!@#$%^&*{}[]?/;:<>";

    for (let i = 1; i <= length; i++) {
      let randomPass = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(randomPass);
    }

    setPass(password);
  }, [numAllowed, CharAllowed, length, setPass]);

  useEffect(() => {
    passGen();
  }, [numAllowed, CharAllowed, length, passGen]);

  return (
    <div className="bg-stone-600 mx-auto rounded-md w-[80%] p-6 my-6 flex flex-col">
      <h1 className="text-center text-3xl">Password Generator</h1>
      <div className="w-full border flex justify-between my-4 mx-auto">
        <input
          type="text"
          className="w-[80%] text-black"
          value={pass}
          ref={passwordRef}
          readOnly
        />
        <button className="text-center text-xl bg-blue-600 w-[20%]" onClick={copyPass}>
          COPY
        </button>
      </div>
      <div className="flex">
        <input
          type="range"
          id="password"
          min={6}
          max={16}
          onChange={(e) => setlength(e.target.value)}
        />
        <label htmlFor="password">Length({length})</label>
        <input
          type="checkbox"
          id="num"
          onClick={() => setNumAllowed((prev) => !prev)}
          defaultChecked={numAllowed}
        />
        <label htmlFor="num">Numbers</label>
        <input
          type="checkbox"
          id="char"
          onClick={() => {
            setCharAllowed((prev) => !prev);
          }}
          defaultChecked={CharAllowed}
        />
        <label htmlFor="char">Characters</label>
      </div>
    </div>
  );
};

export default App;
