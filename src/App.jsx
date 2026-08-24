// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import foto1 from './images/profissional1.jpg';

function App() {
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const [formContato, setFormContato] = useState({ nome: '', email: '', mensagem: '' });
  const [mensagemEnviada, setMensagemEnviada] = useState(false);
  const [theme, setTheme] = useState('light');

  const modalRef = useRef(null);

  // 1. GERENCIAMENTO DE TEMA COM PERSISTÊNCIA (localStorage)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      const initialTheme = prefersLight ? 'light' : 'dark';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  // 2. SUPORTE A LIBRAS (VLibras)
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    };
    document.body.appendChild(script);
  }, []);

  // 3. GERENCIAMENTO DE FOCO E TECLA ESC NO MODAL (Acessibilidade por Teclado)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && profissionalSelecionado) {
        setProfissionalSelecionado(null);
      }
    };

    if (profissionalSelecionado) {
      document.addEventListener('keydown', handleKeyDown);
      // Foca automaticamente no modal ao abrir
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 50);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [profissionalSelecionado]);

  const profissionais = [
    {
      id: 1,
      nome: "Ana Silva",
      cargo: "Desenvolvedora Frontend Senior",
      imagem: foto1,
      bio: "Especialista em React, TypeScript e UI/UX. Possui 5 anos de experiência criando interfaces modernas e acessíveis.",
      habilidades: ["React", "JavaScript", "CSS3/Sass", "Figma"],
      contato: "ana.silva@techcorp.com",
      disponibilidade: "Disponível para projetos"
    },
    {
      id: 2,
      nome: "Carlos Souza",
      cargo: "Engenheiro de DevOps",
      imagem: "/profissional2.jpg",
      bio: "Focado em automação de infraestrutura, CI/CD e ambientes em nuvem. Apaixonado por cultura DevOps e segurança.",
      habilidades: ["Docker", "Kubernetes", "AWS", "GitHub Actions"],
      contato: "carlos.souza@techcorp.com",
      disponibilidade: "Em projeto atual"
    },
    {
      id: 3,
      nome: "Mariana Costa",
      cargo: "Arquiteta de Software",
      imagem: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500",
      bio: "Líder técnica com vasta experiência em microsserviços, modelagem de sistemas escaláveis e otimização de performance.",
      habilidades: ["Node.js", "GraphQL", "Microsserviços", "SQL/NoSQL"],
      contato: "mariana.costa@techcorp.com",
      disponibilidade: "Disponível para consultoria"
    }
  ];

  const handleEnviarContato = (e) => {
    e.preventDefault();
    if (formContato.nome.trim() && formContato.email.trim() && formContato.mensagem.trim()) {
      setMensagemEnviada(true);
      setFormContato({ nome: '', email: '', mensagem: '' });
      setTimeout(() => setMensagemEnviada(false), 6000);
    }
  };

  return (
    <div className="site-wrapper">
      {/* WIDGET VLIBRAS */}
      <div vp-component="true">
        <div vp-page-box="true"></div>
        <div vp-widget-wrapper="true"></div>
      </div>

      {/* SKIP LINK PARA LEITORES DE TELA E TECLADO */}
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>

      {/* HEADER */}
      <header className="header-container" role="banner">
        <div className="nav-brand">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1087/1087815.png" 
            alt="Logotipo oficial da TechCorp Solutions" 
            className="header-logo" 
          />
          <div className="brand-text">
            <h1>TechCorp</h1>
            <span>SOLUTIONS</span>
          </div>
        </div>
        <nav className="nav-links" aria-label="Navegação principal">
          <a href="#home">Início</a>
          <a href="#talentos">Talentos</a>
          <a href="#sobre">Sobre Nós</a>
          
          <button 
            type="button" 
            className="btn-theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
          >
            {theme === 'light' ? '🌙 Escuro' : '☀️ Claro'}
          </button>

          <a href="#contato" className="btn-primary-nav">Contato</a>
        </nav>
      </header>

      <main id="main-content" tabIndex="-1">
        {/* HERO SECTION */}
        <section className="hero-section" id="home" aria-labelledby="hero-title">
          <div className="hero-content">
            <span className="badge">Plataforma de Talentos Tech</span>
            <h2 id="hero-title">Conecte sua empresa aos melhores especialistas de Tecnologia</h2>
            <p>Encontre desenvolvedores, arquitetos e engenheiros altamente qualificados para transformar suas ideias em produtos digitais de alta performance.</p>
            <div className="hero-actions">
              <a href="#talentos" className="btn-primary">Explorar Talentos</a>
              <a href="#sobre" className="btn-secondary">Sobre a TechCorp</a>
            </div>
          </div>
        </section>

        {/* TALENTOS */}
        <section className="main-section" id="talentos" aria-labelledby="talentos-title">
          <div className="section-header">
            <h2 id="talentos-title">Nossa Equipe de Destaque</h2>
            <p>Conheça os especialistas que lideram a transformação digital na nossa plataforma.</p>
          </div>

          <div className="cards-container">
            {profissionais.map((prof) => (
              <article key={prof.id} className="card-hover card-estilizado">
                <div className="card-img-wrapper">
                  <img 
                    src={prof.imagem} 
                    alt={`Fotografia de perfil de ${prof.nome}, ${prof.cargo}`} 
                  />
                  <span className="status-badge" aria-label={`Status: ${prof.disponibilidade}`}>
                    {prof.disponibilidade}
                  </span>
                </div>
                <h3>{prof.nome}</h3>
                <p className="card-subtitle">{prof.cargo}</p>
                <button 
                  className="btn-perfil" 
                  onClick={() => setProfissionalSelecionado(prof)}
                  aria-label={`Abrir janela com detalhes sobre ${prof.nome}`}
                >
                  Ver Perfil Completo
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* SOBRE NÓS */}
        <section className="about-section" id="sobre" aria-labelledby="sobre-title">
          <div className="about-container">
            <div className="about-text">
              <span className="badge-light">Quem Somos</span>
              <h2 id="sobre-title">Impulsionando a Inovação Tecnológica com Talentos de Elite</h2>
              <p>
                A <strong>TechCorp Solutions</strong> conecta projetos desafiadores aos melhores profissionais do mercado. Garantimos agilidade, código de alta qualidade e acessibilidade universal.
              </p>
              <div className="about-stats" role="region" aria-label="Estatísticas da empresa">
                <div className="stat-card">
                  <h3>+150</h3>
                  <p>Projetos Entregues</p>
                </div>
                <div className="stat-card">
                  <h3>99%</h3>
                  <p>Satisfação dos Clientes</p>
                </div>
                <div className="stat-card">
                  <h3>24/7</h3>
                  <p>Suporte Especializado</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section className="contact-section" id="contato" aria-labelledby="contato-title">
          <div className="contact-container">
            <div className="contact-info">
              <h2 id="contato-title">Fale Conosco</h2>
              <p>Oferecemos canais 100% acessíveis via texto para comunicação com todos os públicos.</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <strong>📍 Endereço:</strong>
                  <span>Av. Paulista, 1000 - São Paulo, SP</span>
                </div>
                <div className="contact-item">
                  <strong>📧 E-mail:</strong>
                  <span>contato@techcorp.com</span>
                </div>
                <div className="contact-item">
                  <strong>💬 WhatsApp / Mensagem:</strong>
                  <span>(11) 99999-8921</span>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleEnviarContato} aria-labelledby="form-title" noValidate>
              <h3 id="form-title">Envie uma Mensagem</h3>
              
              {mensagemEnviada && (
                <div className="success-banner" role="status" aria-live="polite">
                  ✅ Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.
                </div>
              )}

              <div className="form-group">
                <label htmlFor="nome">Seu Nome <span className="required-star" aria-hidden="true">*</span></label>
                <input 
                  type="text" 
                  id="nome" 
                  name="nome"
                  autoComplete="name"
                  placeholder="Ex: João Silva" 
                  value={formContato.nome}
                  onChange={(e) => setFormContato({...formContato, nome: e.target.value})}
                  required 
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Seu E-mail <span className="required-star" aria-hidden="true">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  autoComplete="email"
                  placeholder="Ex: joao@empresa.com" 
                  value={formContato.email}
                  onChange={(e) => setFormContato({...formContato, email: e.target.value})}
                  required 
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mensagem">Como podemos ajudar? <span className="required-star" aria-hidden="true">*</span></label>
                <textarea 
                  id="mensagem" 
                  name="mensagem"
                  rows="4" 
                  placeholder="Descreva sua necessidade..." 
                  value={formContato.mensagem}
                  onChange={(e) => setFormContato({...formContato, mensagem: e.target.value})}
                  required
                  aria-required="true"
                ></textarea>
              </div>

              <button type="submit" className="btn-primary btn-submit">Enviar Mensagem por Texto</button>
            </form>
          </div>
        </section>
      </main>

      {/* MODAL COM TRAP FOCUS E TECLA ESC */}
      {profissionalSelecionado && (
        <div 
          className="modal-overlay" 
          onClick={() => setProfissionalSelecionado(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
            tabIndex="-1"
          >
            <button 
              type="button"
              className="modal-close" 
              onClick={() => setProfissionalSelecionado(null)}
              aria-label="Fechar janela de detalhes"
            >
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Fechar</span>
            </button>
            <img 
              src={profissionalSelecionado.imagem} 
              alt={`Foto de ${profissionalSelecionado.nome}`} 
              className="modal-img" 
            />
            <h2 id="modal-title">{profissionalSelecionado.nome}</h2>
            <p className="modal-cargo">{profissionalSelecionado.cargo}</p>
            <p className="modal-bio">{profissionalSelecionado.bio}</p>
            
            <h4>Habilidades Principais</h4>
            <ul className="modal-habilidades" aria-label="Lista de habilidades">
              {profissionalSelecionado.habilidades.map((hab, index) => (
                <li key={index}>{hab}</li>
              ))}
            </ul>

            <div className="modal-footer">
              <p><strong>Contato Direct:</strong> {profissionalSelecionado.contato}</p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="main-footer" role="contentinfo">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>TechCorp Solutions</h3>
            <p>Conectando inovação, engenharia de software e acessibilidade universal para todos.</p>
          </div>
          <nav className="footer-links" aria-label="Navegação do rodapé">
            <h4>Navegação</h4>
            <a href="#home">Início</a>
            <a href="#talentos">Talentos</a>
            <a href="#sobre">Sobre Nós</a>
            <a href="#contato">Contato</a>
          </nav>
        </div>
        <div className="copyright">
          &copy; 2026 TechCorp Solutions. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

export default App;