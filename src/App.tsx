import React, { Component } from 'react';
import './App.css';

interface State {
  ablakok: Ablak[];
  ujTipus: string;
  ujVastagsag: number;
  ujMeret: number;
}

interface Ablak {
  id: number;
  tipus : string;
  vastagsag : number;
  meret : number;
}


class App extends Component<{}, State> {

  constructor(props: {}) {
    super(props);

    this.state = {
      ujTipus: '',
      ujVastagsag: 0,
      ujMeret: 0,
      ablakok: [],
    }
  }


  async Ablakbetoltes() {
    let response = await fetch('http://localhost:3000/ablak');
    let data = await response.json() as Ablak[];
    this.setState({
      ablakok: data,
    })
  }

  componentDidMount() {
    this.Ablakbetoltes();
  }
  async DeleteAblak(id:number){
    await fetch('http://localhost:3000/ablak/'+ id, {
      method: 'DELETE',
    })
    await this.Ablakbetoltes();
  }

  Felvetelkezeles = async () => {
    const { ujTipus, ujVastagsag, ujMeret} = this.state;
    if(ujTipus.trim() === '' || ujVastagsag <=0 || ujMeret <=0) {
     return;
    }

    const adat = {
      tipus: ujTipus,
      vastagsag: ujVastagsag,
      meret: ujMeret,
    };

    await fetch('http://localhost:3000/ablak', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(adat),
    });

    this.setState({
      ujTipus: '',
      ujVastagsag: 0,
      ujMeret: 0,
    })

    await this.Ablakbetoltes();

  }


  render(){
    const { ujTipus, ujVastagsag, ujMeret } = this.state;

    return <div>
      <h2>Új Ablak hozzáadása</h2>
      <div className="lacika">
      Típus: <input type='text' value={ujTipus} onChange={e => this.setState({ujTipus: e.currentTarget.value})}></input><br/>
      Vastagság: <input type='number' value={ujVastagsag} onChange={e => this.setState({ ujVastagsag: parseInt(e.currentTarget.value)})}></input> mm<br/>
      Méret: <input type='number' value={ujMeret} onChange={e => this.setState({ ujMeret: parseInt(e.currentTarget.value)})}></input> cm^2<br/></div>
      <button onClick={this.Felvetelkezeles}>Felvétel</button>
      <h2>Ablakok</h2>
      <ul>
        {
          this.state.ablakok.map((ablak) => <table><tr><td>{ablak.tipus} | {ablak.vastagsag} mm | {ablak.meret} cm^2 <button onClick= {() => this.DeleteAblak(ablak.id)}>Törlés</button></td></tr></table>)
        }
      </ul>
    </div>
  }
}

export default App;