import { useState } from 'react';
import githubLogo from '../assets/github.png';
import Input from '../components/Input';
import Button from '../components/Button'
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles'

function App() {
  
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {

      const {data} = await api.get(`repos/${currentRepo}`);

      if(data.id){

        const doesExist = repos.find(repo => repo.id === data.id)
        
        if(!doesExist){
          setRepos(prev => [...prev, data]);
          setCurrentRepo('');
          return;
        }
      }
      alert('Este repositório já foi adicionado.')
  }

  const handleRemoveRepo = (id) => {
    let filteredRepos = repos.filter((repo) => repo.id !== id);
    setRepos(filteredRepos);
  }

  return (
    <Container>
      <img src={githubLogo} alt="Logo do GitHub" width={72} height={72} />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} /> )}      
    </Container>
  );
}

export default App;
