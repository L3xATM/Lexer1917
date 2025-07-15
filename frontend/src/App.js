import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaGithub, 
  FaDiscord, 
  FaEnvelope, 
  FaExternalLinkAlt,
  FaCode,
  FaDesktop,
  FaRocket,
  FaHeart,
  FaDownload,
  FaStar,
  FaTools,
  FaLightbulb
} from 'react-icons/fa';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/portfolio`);
      setPortfolioData(response.data);
    } catch (err) {
      setError('Error al cargar los datos del portafolio');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-kuromi-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-kuromi-accent mx-auto mb-4"></div>
          <p className="text-kuromi-secondary font-kuromi">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-kuromi-dark flex items-center justify-center">
        <div className="text-center text-kuromi-secondary">
          <p className="text-xl mb-4">💔 {error}</p>
          <button 
            onClick={fetchPortfolioData}
            className="kuromi-button"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const { personal_info, about, technologies, contact } = portfolioData;

  return (
    <div className="min-h-screen bg-kuromi-dark">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-kuromi-primary/90 backdrop-blur-md z-50 border-b border-kuromi-accent/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-kuromi-secondary">
              L3x <span className="text-kuromi-accent">💖</span>
            </div>
            <div className="flex space-x-6">
              <a href="#home" className="text-kuromi-secondary hover:text-kuromi-accent transition-colors">Inicio</a>
              <a href="#about" className="text-kuromi-secondary hover:text-kuromi-accent transition-colors">Sobre mí</a>
              <a href="#skills" className="text-kuromi-secondary hover:text-kuromi-accent transition-colors">Skills</a>
              <a href="#contact" className="text-kuromi-secondary hover:text-kuromi-accent transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1660853856473-6551edca8f28?w=300&h=300&fit=crop&crop=face"
              alt="Lex Profile"
              className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-kuromi-accent shadow-lg shadow-kuromi-accent/50 animate-float"
            />
            <h1 className="text-5xl md:text-7xl font-bold text-kuromi-secondary mb-4">
              Hola, soy <span className="text-kuromi-accent">Lex</span>
            </h1>
            <p className="text-xl text-kuromi-secondary/80 mb-2">
              También conocido como <span className="text-kuromi-pink font-semibold">L3x</span>
            </p>
            <p className="text-2xl text-kuromi-purple font-semibold mb-8">
              {personal_info.title}
            </p>
          </div>
          
          <div className="kuromi-card max-w-2xl mx-auto p-8 mb-8">
            <p className="text-lg text-kuromi-secondary leading-relaxed">
              {personal_info.description}
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <button className="kuromi-button flex items-center space-x-2">
              <FaDownload />
              <span>Descargar CV</span>
            </button>
            <button className="kuromi-button flex items-center space-x-2">
              <FaRocket />
              <span>Ver Proyectos</span>
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-kuromi-secondary mb-16">
            Sobre <span className="text-kuromi-accent">mí</span> 💖
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="kuromi-card p-8">
              <h3 className="text-2xl font-semibold text-kuromi-accent mb-6 flex items-center">
                <FaLightbulb className="mr-3" />
                Mi Especialización
              </h3>
              <p className="text-kuromi-secondary/90 mb-6">
                {about.specialization}
              </p>
              <ul className="space-y-3">
                {about.projects.map((project, index) => (
                  <li key={index} className="flex items-center text-kuromi-secondary">
                    <FaStar className="text-kuromi-pink mr-3" />
                    {project}
                  </li>
                ))}
              </ul>
            </div>

            <div className="kuromi-card p-8">
              <h3 className="text-2xl font-semibold text-kuromi-accent mb-6 flex items-center">
                <FaTools className="mr-3" />
                Proyecto Actual
              </h3>
              <div className="bg-kuromi-gradient p-6 rounded-lg mb-6">
                <h4 className="text-xl font-semibold text-white mb-2">
                  {about.current_project.title}
                </h4>
                <p className="text-kuromi-secondary/90 text-sm mb-2">
                  {about.current_project.type}
                </p>
                <p className="text-white">
                  {about.current_project.description}
                </p>
              </div>
            </div>
          </div>

          <div className="kuromi-card p-8 mt-12">
            <h3 className="text-2xl font-semibold text-kuromi-accent mb-6 flex items-center">
              <FaHeart className="mr-3" />
              ¿Qué me diferencia?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {about.differentiators.map((diff, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-kuromi-pink rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-kuromi-secondary/90">{diff}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-kuromi-primary/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-kuromi-secondary mb-16">
            Tecnologías y <span className="text-kuromi-accent">Skills</span> 🚀
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="kuromi-card p-6">
              <FaCode className="text-3xl text-kuromi-accent mb-4" />
              <h3 className="text-xl font-semibold text-kuromi-secondary mb-4">Lenguajes</h3>
              <ul className="space-y-2">
                {technologies.languages.map((lang, index) => (
                  <li key={index} className="text-kuromi-secondary/80">{lang}</li>
                ))}
              </ul>
            </div>

            <div className="kuromi-card p-6">
              <FaRocket className="text-3xl text-kuromi-purple mb-4" />
              <h3 className="text-xl font-semibold text-kuromi-secondary mb-4">Frameworks</h3>
              <ul className="space-y-2">
                {technologies.frameworks.map((framework, index) => (
                  <li key={index} className="text-kuromi-secondary/80">{framework}</li>
                ))}
              </ul>
            </div>

            <div className="kuromi-card p-6">
              <FaDesktop className="text-3xl text-kuromi-pink mb-4" />
              <h3 className="text-xl font-semibold text-kuromi-secondary mb-4">Herramientas</h3>
              <ul className="space-y-2">
                {technologies.tools.map((tool, index) => (
                  <li key={index} className="text-kuromi-secondary/80">{tool}</li>
                ))}
              </ul>
            </div>

            <div className="kuromi-card p-6">
              <FaTools className="text-3xl text-kuromi-accent mb-4" />
              <h3 className="text-xl font-semibold text-kuromi-secondary mb-4">Otras Skills</h3>
              <ul className="space-y-2">
                {technologies.other_skills.map((skill, index) => (
                  <li key={index} className="text-kuromi-secondary/80">{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-kuromi-secondary mb-16">
            ¡Hablemos! <span className="text-kuromi-accent">💬</span>
          </h2>
          
          <div className="kuromi-card max-w-4xl mx-auto p-8">
            <p className="text-lg text-kuromi-secondary mb-8">
              ¿Tienes algún proyecto en mente? ¿Necesitas ayuda con Discord bots o desarrollo web? 
              ¡No dudes en contactarme!
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a 
                href={`https://${contact.discord}`}
                className="kuromi-card p-6 hover:scale-105 transition-transform"
              >
                <FaDiscord className="text-4xl text-kuromi-accent mx-auto mb-4" />
                <h3 className="font-semibold text-kuromi-secondary mb-2">Discord</h3>
                <p className="text-kuromi-secondary/80 text-sm">{contact.discord}</p>
              </a>

              <a 
                href={`https://${contact.github}`}
                className="kuromi-card p-6 hover:scale-105 transition-transform"
              >
                <FaGithub className="text-4xl text-kuromi-purple mx-auto mb-4" />
                <h3 className="font-semibold text-kuromi-secondary mb-2">GitHub</h3>
                <p className="text-kuromi-secondary/80 text-sm">L3xATM</p>
              </a>

              <a 
                href={`mailto:${contact.email}`}
                className="kuromi-card p-6 hover:scale-105 transition-transform"
              >
                <FaEnvelope className="text-4xl text-kuromi-pink mx-auto mb-4" />
                <h3 className="font-semibold text-kuromi-secondary mb-2">Email</h3>
                <p className="text-kuromi-secondary/80 text-sm">{contact.email}</p>
              </a>

              <a 
                href={`https://${contact.kofi}`}
                className="kuromi-card p-6 hover:scale-105 transition-transform"
              >
                <FaHeart className="text-4xl text-kuromi-accent mx-auto mb-4" />
                <h3 className="font-semibold text-kuromi-secondary mb-2">Ko-fi</h3>
                <p className="text-kuromi-secondary/80 text-sm">Apóyame ☕</p>
              </a>

              <a 
                href={`https://${contact.linktree}`}
                className="kuromi-card p-6 hover:scale-105 transition-transform"
              >
                <FaExternalLinkAlt className="text-4xl text-kuromi-purple mx-auto mb-4" />
                <h3 className="font-semibold text-kuromi-secondary mb-2">Linktree</h3>
                <p className="text-kuromi-secondary/80 text-sm">Todos mis enlaces</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-kuromi-primary py-8 px-6 border-t border-kuromi-accent/20">
        <div className="container mx-auto text-center">
          <p className="text-kuromi-secondary/80">
            Hecho con <span className="text-kuromi-accent">💖</span> por Lex usando React & TailwindCSS
          </p>
          <p className="text-kuromi-secondary/60 text-sm mt-2">
            © 2024 Lex (L3x) - Desarrollador & Tech Enthusiast
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;