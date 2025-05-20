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

// Novos componentes para submódulos de Produtos
const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  i {
    margin-right: 5px;
  }
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid ${props => props.active ? '#00a651' : 'transparent'};
  border-bottom: ${props => props.active ? '2px solid #00a651' : 'none'};
  background-color: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#00a651' : '#333'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin-right: 5px;
  
  &:hover {
    background-color: ${props => props.active ? 'white' : '#f5f5f5'};
  }
`;

const FormSection = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  color: #333;
  margin-top: 0;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  margin-bottom: 15px;
`;

const FormColumn = styled.div`
  flex: ${props => props.width || 1};
  padding: 0 10px;
  min-width: 200px;
`;

const Select = styled.select`
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    border-color: #00a651;
  }
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  
  input {
    margin-right: 10px;
  }
`;

const HelpText = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 5px;
  font-style: italic;
`;

const ActionButton = styled.button`
  background-color: #00a651;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 10px;
  
  &:hover {
    background-color: #008c44;
  }
`;

const CancelButton = styled.button`
  background-color: #f0f0f0;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModule, setActiveModule] = useState('home');
  const [activeProductTab, setActiveProductTab] = useState('principal');
  const [showProductForm, setShowProductForm] = useState(false);

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
    setShowProductForm(false);
  };

  const renderProductContent = () => {
    if (showProductForm) {
      return (
        <>
          <ProductHeader>
            <BackButton onClick={() => setShowProductForm(false)}>
              <i className="fas fa-arrow-left"></i> Voltar
            </BackButton>
            <div>
              <ActionButton>Salvar</ActionButton>
              <CancelButton onClick={() => setShowProductForm(false)}>Cancelar</CancelButton>
            </div>
          </ProductHeader>
          
          <TabsContainer>
            <Tab 
              active={activeProductTab === 'principal'} 
              onClick={() => setActiveProductTab('principal')}
            >
              Principal
            </Tab>
            <Tab 
              active={activeProductTab === 'informacoes'} 
              onClick={() => setActiveProductTab('informacoes')}
            >
              Informações do Produto
            </Tab>
            <Tab 
              active={activeProductTab === 'venda'} 
              onClick={() => setActiveProductTab('venda')}
            >
              Configurações de Venda
            </Tab>
            <Tab 
              active={activeProductTab === 'frete'} 
              onClick={() => setActiveProductTab('frete')}
            >
              Configurações de Frete
            </Tab>
            <Tab 
              active={activeProductTab === 'impostos'} 
              onClick={() => setActiveProductTab('impostos')}
            >
              Configurações de Impostos
            </Tab>
            <Tab 
              active={activeProductTab === 'contabeis'} 
              onClick={() => setActiveProductTab('contabeis')}
            >
              Configurações Contábeis
            </Tab>
            <Tab 
              active={activeProductTab === 'fotos'} 
              onClick={() => setActiveProductTab('fotos')}
            >
              Fotos do Produto
            </Tab>
          </TabsContainer>
          
          {activeProductTab === 'principal' && (
            <FormSection>
              <SectionTitle>Informações Principais</SectionTitle>
              <HelpText>( * ) Informações obrigatórias.</HelpText>
              
              <FormRow>
                <FormColumn>
                  <Label>Tipo de Produto *</Label>
                  <Select>
                    <option value="">...</option>
                    <option value="flores">Flores In Natura</option>
                    <option value="extrato">Extrato Vegetal</option>
                  </Select>
                </FormColumn>
                
                <FormColumn>
                  <Label>Status</Label>
                  <Select>
                    <option value="ativo">Ativo</option>
                    <option value="desativado">Desativado</option>
                  </Select>
                </FormColumn>
              </FormRow>
              
              <FormRow>
                <FormColumn>
                  <Label>Produto Online?</Label>
                  <Select>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </Select>
                </FormColumn>
                
                <FormColumn>
                  <Label>Produto Restrito?</Label>
                  <Select>
                    <option value="">...</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </Select>
                </FormColumn>
              </FormRow>
              
              <FormRow>
                <FormColumn width={2}>
                  <Label>Nome do Produto *</Label>
                  <Input type="text" />
                </FormColumn>
              </FormRow>
              
              <FormRow>
                <FormColumn width={2}>
                  <Label>Descrição Resumida</Label>
                  <TextArea />
                </FormColumn>
              </FormRow>
              
              <FormRow>
                <FormColumn width={2}>
                  <Label>Descrição Completa</Label>
                  <TextArea />
                </FormColumn>
              </FormRow>
              
              <FormRow>
                <FormColumn>
                  <Label>Fornecedor</Label>
                  <Select>
                    <option value="">...</option>
                    <option value="cannapis">CANNAPIS</option>
                  </Select>
                </FormColumn>
              </FormRow>
            </FormSection>
          )}
          
          {activeProductTab === 'venda' && (
            <FormSection>
              <SectionTitle>Configurações de Venda</SectionTitle>
              
              <FormRow>
                <FormColumn>
                  <Checkbox>
                    <input type="checkbox" id="disponivel" />
                    <Label htmlFor="disponivel">Disponível para Todos</Label>
                  </Checkbox>
                  
                  <Checkbox>
                    <input type="checkbox" id="somente_associados" />
                    <Label htmlFor="somente_associados">Somente Associados</Label>
                  </Checkbox>
                  
                  <Checkbox>
                    <input type="checkbox" id="somente_adimplentes" />
                    <Label htmlFor="somente_adimplentes">Somente Adimplentes</Label>
                  </Checkbox>
                </FormColumn>
                
                <FormColumn>
                  <Label>Segmentar por tipo de associado</Label>
                  <Select>
                    <option value="nenhum">Nenhum</option>
                  </Select>
                  <HelpText>Preencha somente caso o produto seja exclusivo para alguns tipos de associados</HelpText>
                </FormColumn>
              </FormRow>
              
              <FormRow>
                <FormColumn>
                  <Label>É uma Cortesia?</Label>
                  <Select>
                    <option value="">...</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </Select>
                </FormColumn>
                
                <FormColumn>
                  <Label>Permitir valor configurável?</Label>
                  <Select>
                    <option value="">...</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </Select>
                  <HelpText>1 - O campo de valor configurável, permitirá alterar o valor do produto/serviço no ato do pedido.</HelpText>
                  <HelpText>2 - Informe apenas um dos dois campos de desconto. Caso informe ambos, o sistema irá considerar o valor absoluto.</HelpText>
                </FormColumn>
              </FormRow>
              
              <FormRow>
                <FormColumn>
                  <Label>Habilitar Controle de Estoque nos pedidos?</Label>
                  <Select>
                    <option value="">...</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </Select>
                </FormColumn>
                
                <FormColumn>
                  <Label>Qtde Limite por Pedido</Label>
                  <Input type="number" />
                </FormColumn>
              </FormRow>
            </FormSection>
          )}
          
          {activeProductTab === 'frete' && (
            <FormSection>
              <SectionTitle>Configurações de Frete</SectionTitle>
              
              <FormRow>
                <FormColumn>
                  <Label>Tem Entrega?</Label>
                  <Select>
                    <option value="">...</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </Select>
                </FormColumn>
              </FormRow>
            </FormSection>
          )}
          
          {activeProductTab === 'impostos' && (
            <FormSection>
              <SectionTitle>Configurações de Impostos</SectionTitle>
              
              <FormRow>
                <FormColumn>
                  <Label>Inserir Impostos?</Label>
                  <Select>
                    <option value="">...</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </Select>
                </FormColumn>
              </FormRow>
            </FormSection>
          )}
          
          {activeProductTab === 'contabeis' && (
            <FormSection>
              <SectionTitle>Configurações Contábeis</SectionTitle>
              
              <FormRow>
                <FormColumn>
                  <Label>Código Contábil</Label>
                  <Input type="text" />
                </FormColumn>
              </FormRow>
            </FormSection>
          )}
          
          {activeProductTab === 'fotos' && (
            <FormSection>
              <SectionTitle>Fotos do Produto</SectionTitle>
              
              <FormRow>
                <FormColumn>
                  <Button>Adicionar Foto</Button>
                  <HelpText>Adicione fotos do produto para exibição no site.</HelpText>
                </FormColumn>
              </FormRow>
            </FormSection>
          )}
        </>
      );
    }
    
    return (
      <>
        <ProductHeader>
          <PageTitle>Produtos</PageTitle>
          <ActionButton onClick={() => setShowProductForm(true)}>
            <i className="fas fa-plus"></i> Novo Produto
          </ActionButton>
        </ProductHeader>
        
        <Card>
          <CardTitle>Lista de Produtos</CardTitle>
          <p>Nenhum produto cadastrado. Clique em "Novo Produto" para adicionar.</p>
        </Card>
      </>
    );
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
          onClick={() => {
            setActiveModule('home');
            setShowProductForm(false);
          }}
        >
          <i className="fas fa-home"></i> Home
        </MenuItem>
        
        <MenuItem 
          active={activeModule === 'associados'} 
          onClick={() => {
            setActiveModule('associados');
            setShowProductForm(false);
          }}
        >
          <i className="fas fa-users"></i> Associados
        </MenuItem>
        
        <MenuItem 
          active={activeModule === 'produtos'} 
          onClick={() => {
            setActiveModule('produtos');
            setShowProductForm(false);
          }}
        >
          <i className="fas fa-box"></i> Produtos
        </MenuItem>
        
        <MenuItem 
          active={activeModule === 'pedidos'} 
          onClick={() => {
            setActiveModule('pedidos');
            setShowProductForm(false);
          }}
        >
          <i className="fas fa-shopping-cart"></i> Pedidos
        </MenuItem>
        
        <MenuItem 
          active={activeModule === 'acesso'} 
          onClick={() => {
            setActiveModule('acesso');
            setShowProductForm(false);
          }}
        >
          <i className="fas fa-lock"></i> Acesso
        </MenuItem>
        
        <MenuItem onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Sair
        </MenuItem>
      </Sidebar>
      
      <MainContent>
        {activeModule === 'home' && (
          <>
            <Header>
              <PageTitle>Painel de Controle</PageTitle>
              <UserInfo>
                <span>Usuário: {username}</span>
              </UserInfo>
            </Header>
            
            <DashboardContent>
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
            </DashboardContent>
          </>
        )}
        
        {activeModule === 'associados' && (
          <>
            <Header>
              <PageTitle>Associados</PageTitle>
              <UserInfo>
                <span>Usuário: {username}</span>
              </UserInfo>
            </Header>
            
            <Card>
              <CardTitle>Gerenciamento de Associados</CardTitle>
              <p>Conteúdo da página de associados</p>
            </Card>
          </>
        )}
        
        {activeModule === 'produtos' && (
          <>
            <Header>
              <PageTitle>Produtos</PageTitle>
              <UserInfo>
                <span>Usuário: {username}</span>
              </UserInfo>
            </Header>
            
            {renderProductContent()}
          </>
        )}
        
        {activeModule === 'pedidos' && (
          <>
            <Header>
              <PageTitle>Pedidos</PageTitle>
              <UserInfo>
                <span>Usuário: {username}</span>
              </UserInfo>
            </Header>
            
            <Card>
              <CardTitle>Gerenciamento de Pedidos</CardTitle>
              <p>Conteúdo da página de pedidos</p>
            </Card>
          </>
        )}
        
        {activeModule === 'acesso' && (
          <>
            <Header>
              <PageTitle>Controle de Acesso</PageTitle>
              <UserInfo>
                <span>Usuário: {username}</span>
              </UserInfo>
            </Header>
            
            <Card>
              <CardTitle>Controle de Acesso</CardTitle>
              <p>Conteúdo da página de acesso</p>
            </Card>
          </>
        )}
      </MainContent>
    </AppContainer>
  );
}

export default App;
