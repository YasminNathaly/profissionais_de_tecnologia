import React, { useState } from 'react';
import './App.css';

// 1.5 Importação da foto armazenada na subpasta src/images
import foto1 from './images/profissional1.jpg';

function App() {
  // Estado para controlar qual profissional está com o modal aberto
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);

  // 1.4 Dados completos dos profissionais em JSON
  const profissionais = [
    {
      id: 1,
      nome: "Ana Silva",
      cargo: "Desenvolvedora Frontend",
      imagem: foto1,
      tipoImagem: "src",
      estiloTipo: "Função JSON",
      bio: "Especialista em React, TypeScript e UI/UX. Possui 5 anos de experiência criando interfaces modernas e acessíveis.",
      habilidades: ["React", "JavaScript", "CSS3/Sass", "Figma", "Acessibilidade (WCAG)"],
      contato: "ana.silva@techcorp.com"
    },
    {
      id: 2,
      nome: "Carlos Souza",
      cargo: "Engenheiro de DevOps",
      imagem: "/profissional2.jpg",
      tipoImagem: "public",
      estiloTipo: "CSS Inline",
      bio: "Focado em automação de infraestrutura, CI/CD e ambientes em nuvem. Apaixonado por cultura DevOps e segurança.",
      habilidades: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Terraform"],
      contato: "carlos.souza@techcorp.com"
    },
    {
      id: 3,
      nome: "Mariana Costa",
      cargo: "Arquiteta de Software",
      imagem: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500",
      tipoImagem: "HTTPS Externa",
      estiloTipo: "Classe CSS Externa",
      bio: "Líder técnica com vasta experiência em microsserviços, modelagem de sistemas escaláveis e otimização de performance.",
      habilidades: ["Arquitetura de Sistemas", "Node.js", "GraphQL", "Microsserviços", "SQL/NoSQL"],
      contato: "mariana.costa@techcorp.com"
    }
  ];

  // 1.1 Estilos do elemento "1" via função que devolve um objeto JSON
  const getEstilosElemento1 = () => {
    return {
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '16px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      textAlign: 'center',
      flex: '1',
      minWidth: '250px'
    };
  };

  return (
    <div>
      {/* Cabeçalho */}
      <header className="header-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1087/1087815.png" 
            alt="Logotipo da empresa TechCorp" 
            className="header-logo" 
          />
          <h1>TechCorp Solutions</h1>
        </div>
        <p>Inovação e excelência em desenvolvimento de software.</p>
      </header>

      {/* Conteúdo Principal */}
      <main className="cards-container">

        {/* Card 1 */}
        <div className="card-hover" style={getEstilosElemento1()}>
          <img 
            src={profissionais[0].imagem} 
            alt={`Foto de ${profissionais[0].nome}`} 
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} 
          />
          <h3>{profissionais[0].nome} - {profissionais[0].cargo}</h3>
          <button 
            className="btn-perfil" 
            onClick={() => setProfissionalSelecionado(profissionais[0])}
            aria-label={`Ver perfil de ${profissionais[0].nome}`}
          >
            Ver Perfil
          </button>
        </div>

        {/* Card 2 */}
        <div className="card-hover" style={{
          border: '2px solid #cbd5e0',
          borderRadius: '12px',
          padding: '16px',
          backgroundColor: '#edf2f7',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          flex: '1',
          minWidth: '250px'
        }}>
          <img 
            src={profissionais[1].imagem} 
            alt={`Foto de ${profissionais[1].nome}`} 
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} 
          />
          <h3>{profissionais[1].nome} - {profissionais[1].cargo}</h3>
          <button 
            className="btn-perfil" 
            onClick={() => setProfissionalSelecionado(profissionais[1])}
            aria-label={`Ver perfil de ${profissionais[1].nome}`}
          >
            Ver Perfil
          </button>
        </div>

        {/* Card 3 */}
        <div className="card-estilizado card-hover">
          <img 
            src={profissionais[2].imagem} 
            alt={`Foto de ${profissionais[2].nome}`} 
          />
          <h3>{profissionais[2].nome} - {profissionais[2].cargo}</h3>
          <button 
            className="btn-perfil" 
            onClick={() => setProfissionalSelecionado(profissionais[2])}
            aria-label={`Ver perfil de ${profissionais[2].nome}`}
          >
            Ver Perfil
          </button>
        </div>

      </main>

      {/* Modal de Detalhes do Perfil */}
      {profissionalSelecionado && (
        <div className="modal-overlay" onClick={() => setProfissionalSelecionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setProfissionalSelecionado(null)}
              aria-label="Fechar perfil"
            >
              &times;
            </button>
            <img 
              src={profissionalSelecionado.imagem} 
              alt={profissionalSelecionado.nome} 
              className="modal-img" 
            />
            <h2>{profissionalSelecionado.nome}</h2>
            <p className="modal-cargo">{profissionalSelecionado.cargo}</p>
            <p className="modal-bio">{profissionalSelecionado.bio}</p>
            
            <h4>Habilidades Principais:</h4>
            <ul className="modal-habilidades">
              {profissionalSelecionado.habilidades.map((hab, index) => (
                <li key={index}>{hab}</li>
              ))}
            </ul>

            <div className="modal-footer">
              <p><strong>Contato:</strong> {profissionalSelecionado.contato}</p>
              <p><small>Estilização do card: {profissionalSelecionado.estiloTipo} | Imagem: {profissionalSelecionado.tipoImagem}</small></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;