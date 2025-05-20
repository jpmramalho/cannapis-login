import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';

// Componentes estilizados
const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  font-family: Arial, sans-serif;
`;

const Sidebar = styled.div`
  width: 230px;
  background-color: #1e2a38;
  color: white;
  height: 100%;
  overflow-y: auto;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  img {
    height: 40px;
  }
`;

const MenuItem = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-left: 4px solid ${props => props.active ? '#00a651' : 'transparent'};
  background-color: ${props => props.active ? 'rgba(0, 166, 81, 0.1)' : 'transparent'};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  i {
    margin-right: 10px;
    font-size: 18px;
    width: 24px;
    text-align: center;
  }
`;

const MainContent = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  overflow-y: auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  
  span {
    margin-right: 10px;
  }
`;

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/images/background_image.png');
  background-size: cover;
  background-position: center;
  font-family: Arial, sans-serif;
`;

const LoginLogo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  img {
    height: 60px;
  }
`;

const LoginCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  width: 350px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #333;
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  
  &:focus {
    border-color: #00a651;
  }
`;

const ForgotPassword = styled.a`
  color: #ff69b4;
  text-decoration: none;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 20px;
  align-self: flex-start;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #00a651;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #008c44;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const DashboardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin-top: 0;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModule, setActiveModule] = useState('home');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    // Verificação de credenciais
    if (username === 'adm' && password === 'adm') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Usuário ou senha incorretos.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setActiveModule('home');
  };

  if (!isLoggedIn) {
    return (
      <LoginContainer>
        <LoginLogo>
          <img src="/images/cannapis_logo.png" alt="CANNAPIS" />
        </LoginLogo>
        
        <LoginCard>
          <Title>CANNAPIS</Title>
          
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <FormGroup>
              <Label>Login</Label>
              <Input 
                type="text" 
                placeholder="Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Senha</Label>
              <Input 
                type="password" 
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            
            <ForgotPassword>Esqueci minha senha!</ForgotPassword>
            
            <Button type="submit">ENTRAR</Button>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </form>
        </LoginCard>
      </LoginContainer>
    );
  }

  return (
    <AppContainer>
      <Sidebar>
        <Logo>
          <img src="/images/cannapis_logo.png" alt="CANNAPIS" />
        </Logo>
        
        <MenuItem 
          active={activeModule === 'home'} 
          onClick={() => setActiveModule('home')}
        >
          <i className="fas fa-home"></i> Home
        </MenuItem>
        
        <MenuItem 
          active={activeModule === 'associados'} 
          onClick={() => setActiveModule('associados')}
        >
          <i className="fas fa-users"></i> Associados
        </MenuItem>
        
        <MenuItem 
          active={activeModule === 'produtos'} 
          onClick={() => setActiveModule('produtos')}
        >
          <i className="fas fa-box"></i> Produtos
        </MenuItem>
        
        <MenuItem 
          active={activeModule === 'pedidos'} 
          onClick={() => setActiveModule('pedidos')}
        >
          <i className="fas fa-shopping-cart"></i> Pedidos
        </MenuItem>
        
        <MenuItem 
          active={activeModule === 'acesso'} 
          onClick={() => setActiveModule('acesso')}
        >
          <i className="fas fa-lock"></i> Acesso
        </MenuItem>
        
        <MenuItem onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Sair
        </MenuItem>
      </Sidebar>
      
      <MainContent>
        <Header>
          <PageTitle>
            {activeModule === 'home' && 'Painel de Controle'}
            {activeModule === 'associados' && 'Associados'}
            {activeModule === 'produtos' && 'Produtos'}
            {activeModule === 'pedidos' && 'Pedidos'}
            {activeModule === 'acesso' && 'Acesso'}
          </PageTitle>
          
          <UserInfo>
            <span>Usuário: {username}</span>
          </UserInfo>
        </Header>
        
        <DashboardContent>
          {activeModule === 'home' && (
            <>
              <Card>
                <CardTitle>Resumo de associados</CardTitle>
                <p>Conteúdo do painel de controle</p>
              </Card>
              
              <Card>
                <CardTitle>Resumo por Período</CardTitle>
                <p>Conteúdo do painel de controle</p>
              </Card>
              
              <Card>
                <CardTitle>Resumo de Produção dos Pedidos</CardTitle>
                <p>Conteúdo do painel de controle</p>
              </Card>
            </>
          )}
          
          {activeModule === 'associados' && (
            <Card>
              <CardTitle>Gerenciamento de Associados</CardTitle>
              <p>Conteúdo da página de associados</p>
            </Card>
          )}
          
          {activeModule === 'produtos' && (
            <Card>
              <CardTitle>Gerenciamento de Produtos</CardTitle>
              <p>Conteúdo da página de produtos</p>
            </Card>
          )}
          
          {activeModule === 'pedidos' && (
            <Card>
              <CardTitle>Gerenciamento de Pedidos</CardTitle>
              <p>Conteúdo da página de pedidos</p>
            </Card>
          )}
          
          {activeModule === 'acesso' && (
            <Card>
              <CardTitle>Controle de Acesso</CardTitle>
              <p>Conteúdo da página de acesso</p>
            </Card>
          )}
        </DashboardContent>
      </MainContent>
    </AppContainer>
  );
}

export default App;
