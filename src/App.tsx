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


  async Tarhelybetoltes() {
    let response = await fetch('http://localhost:3000/ablak');
    let data = await response.json() as Ablak[];
    this.setState({
      ablakok: data,
    })
  }

  componentDidMount() {
    this.Tarhelybetoltes();
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

    await this.Tarhelybetoltes();

  }


  render(){
    const { ujTipus, ujVastagsag, ujMeret } = this.state;

    return <div>
      <h2>Új Ablak hozzáadása</h2>
      Típus: <input type='text' value={ujTipus} onChange={e => this.setState({ujTipus: e.currentTarget.value})}></input><br/>
      Vastagság: <input type='number' value={ujVastagsag} onChange={e => this.setState({ ujVastagsag: parseInt(e.currentTarget.value)})}></input> mm<br/>
      Méret: <input type='number' value={ujMeret} onChange={e => this.setState({ ujMeret: parseInt(e.currentTarget.value)})}></input> cm^2<br/>
      <button onClick={this.Felvetelkezeles}>Felvétel</button>
      <h2>Ablakok</h2>
      <ul>
        {
          this.state.ablakok.map((ablak) => <li>{ablak.tipus} | {ablak.vastagsag} mm | {ablak.meret} cm^2 </li>)
        }
      </ul>
    </div>
  }
}

export default App;