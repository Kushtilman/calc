import React, {useState} from 'react';


const App = () => {
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');

  const ops = ['/', '*', '+', '-', '.'];
  const updateCalc = (val) => {
    if (calc.includes(val) && calc === '.') {
      return;
    }
    if (calc === '' && val === '.') {
      setCalc('0.');
    }
    if ((calc.slice(-1).toString() === '+' && val === '.')
      || (calc.slice(-1).toString() === '-' && val === '.')
      || (calc.slice(-1).toString() === '/' && val === '.')
      || (calc.slice(-1).toString() === '*' && val === '.')) {
      setCalc(calc + '0.');
    }
    if ((ops.includes(val) && calc === '')
      || (ops.includes(val) && ops.includes(calc.slice(-1)))) {
      return;
    }
    if (!ops.includes(val)) {
      setResult(eval(calc + val).toString());
    }
    setCalc(calc + val);
  }

  const clear = () => {
    setCalc('');
    setResult('');
  }

  const backspace = () => {
    if (calc === '0') {
      return;
    }
    setCalc(calc.slice(0, -1));
  }

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <li key={i}>
          <button
            type="button"
            onClick={() => updateCalc(i.toString())}
          ><span>{i}</span></button>
        </li>
      )
    }
    return digits;
  }

  const minPlus = () => {
    if (calc.charAt(0) === '-') {
      setCalc(calc.substring(1))
      setResult(result.substring(1))
    } else {
      setCalc('-' + calc)
      setResult('-' + calc)
    }
  }

  const calculate = () => {
    if ((calc === '0')
      || (calc === '')
      || (calc.slice(-1) === '+')
      || (calc.slice(-1) === '-')
      || (calc.slice(-1) === '*')
      || (calc.slice(-1) === '/')
      || (calc.slice(-1) === '.')
    ) {
      return
    }
    setCalc(eval(calc).toString());
  }

  return (
    <div className="app">
      <div className="container">
        <h1>CITIZEN</h1>
        <div className="result">
          {result ? <span>({result})</span> : ''}
          {calc || '0'}
        </div>
        <ul className="keypad">
          <li>
            <button onClick={clear} type="button" className="btn btn-dark">AC</button>
          </li>
          <li>
            <button onClick={backspace} type="button" className="btn btn-dark">&larr;</button>
          </li>
          <li>
            <button onClick={minPlus} type="button" className="btn btn-dark">&plusmn;</button>
          </li>
          <li>
            <button onClick={() => updateCalc('/')} type="button" className="btn btn-ops">&divide;</button>
          </li>
          <li>
            <button onClick={() => updateCalc('*')} type="button" className="btn btn-ops">&times;</button>
          </li>
          <li>
            <button onClick={() => updateCalc('-')} type="button" className="btn btn-ops">&minus;</button>
          </li>
          <li>
            <button onClick={() => updateCalc('0')} type="button" className="btn">0</button>
          </li>
          <li>
            <button onClick={() => updateCalc('.')} type="button" className="btn">.</button>
          </li>
          <li>
            <button onClick={calculate} type="button" className="btn btn-ops">=</button>
          </li>
          <li>
            <button onClick={() => updateCalc('+')} type="button" className="btn btn-ops">+</button>
          </li>
          {createDigits()}
        </ul>
      </div>
    </div>
  );
};

export default App;
