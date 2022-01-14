import './App.css';

function App() {

  //Some constant titles
  const acknowledgements = "BCB MQP Advisor: Dr. Lane Harrison  ;  BBT MQP Advisor: Dr. Scarlet Shell";

  return (
    <div className="App">
      <div className="content">
        <h1><i>Mycobacterium tuberculosis</i> Metabolic Pathway Biovisualization</h1>
         <h3>An MQP compelted by Adrian Orszulak</h3>
         <h4>{acknowledgements}</h4>
      </div>
    </div>
  );
}

export default App;
