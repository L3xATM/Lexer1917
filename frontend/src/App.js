import React, { useMemo, useState } from 'react';
import './App.css';

const COMPETITIONS = [
  'Primera División (LaLiga)',
  'Premier League',
  'UEFA Champions League',
  'UEFA Europa League',
  'Primera RFEF',
];

const initialNews = [
  {
    id: 1,
    title: 'El líder gana con un gol en el descuento',
    competition: 'Primera División (LaLiga)',
    date: '2026-02-10',
    result: 'Atlético 2-1 Sevilla',
    summary:
      'Partido muy igualado en el Metropolitano que se resolvió en la última jugada tras un córner.',
    image:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Noche europea con remontada histórica',
    competition: 'UEFA Champions League',
    date: '2026-02-11',
    result: 'Barcelona 3-2 Inter',
    summary:
      'El conjunto azulgrana levantó un 0-2 gracias a un gran segundo tiempo y un doblete de su delantero.',
    image:
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80',
  },
];

const standings = {
  'Primera División (LaLiga)': [
    ['Real Madrid', 54],
    ['Barcelona', 51],
    ['Atlético', 47],
    ['Athletic Club', 42],
    ['Real Sociedad', 39],
  ],
  'Premier League': [
    ['Arsenal', 56],
    ['Liverpool', 54],
    ['Manchester City', 52],
    ['Aston Villa', 45],
    ['Tottenham', 43],
  ],
  'UEFA Champions League': [
    ['Bayern', 15],
    ['Barcelona', 13],
    ['Inter', 12],
    ['PSG', 10],
    ['Benfica', 9],
  ],
  'UEFA Europa League': [
    ['Villarreal', 12],
    ['Roma', 11],
    ['Leverkusen', 10],
    ['West Ham', 9],
    ['Real Betis', 8],
  ],
  'Primera RFEF': [
    ['Deportivo', 49],
    ['Nàstic', 46],
    ['Ponferradina', 43],
    ['Cultural Leonesa', 40],
    ['Lugo', 38],
  ],
};

function App() {
  const [news, setNews] = useState(initialNews);
  const [selectedCompetition, setSelectedCompetition] = useState('Todas');
  const [formData, setFormData] = useState({
    title: '',
    competition: COMPETITIONS[0],
    date: '',
    result: '',
    summary: '',
    imageUrl: '',
  });
  const [previewImage, setPreviewImage] = useState('');

  const filteredNews = useMemo(() => {
    if (selectedCompetition === 'Todas') return news;
    return news.filter((item) => item.competition === selectedCompetition);
  }, [news, selectedCompetition]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setPreviewImage(localUrl);
    setFormData((prev) => ({ ...prev, imageUrl: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const image = formData.imageUrl || previewImage;
    if (!formData.title || !formData.date || !formData.result || !formData.summary || !image) {
      return;
    }

    const newEntry = {
      id: Date.now(),
      title: formData.title,
      competition: formData.competition,
      date: formData.date,
      result: formData.result,
      summary: formData.summary,
      image,
    };

    setNews((prev) => [newEntry, ...prev]);
    setFormData({
      title: '',
      competition: COMPETITIONS[0],
      date: '',
      result: '',
      summary: '',
      imageUrl: '',
    });
    setPreviewImage('');
  };

  return (
    <div className="app">
      <header className="hero">
        <p className="kicker">Panel de redacción</p>
        <h1>Noticias de Fútbol</h1>
        <p>
          Gestiona noticias, resultados y clasificación de <strong>LaLiga</strong>, <strong>Premier League</strong>,
          <strong> Champions</strong>, <strong>Europa League</strong> y <strong>Primera RFEF</strong>.
        </p>
      </header>

      <main className="layout">
        <section className="card">
          <h2>Subir nueva noticia</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Título
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ej: Victoria clave para el liderato"
                required
              />
            </label>

            <div className="grid-2">
              <label>
                Competición
                <select name="competition" value={formData.competition} onChange={handleInputChange}>
                  {COMPETITIONS.map((competition) => (
                    <option key={competition} value={competition}>
                      {competition}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Fecha
                <input name="date" type="date" value={formData.date} onChange={handleInputChange} required />
              </label>
            </div>

            <label>
              Resultado
              <input
                name="result"
                value={formData.result}
                onChange={handleInputChange}
                placeholder="Ej: Real Madrid 3-1 Valencia"
                required
              />
            </label>

            <label>
              Resumen
              <textarea
                name="summary"
                rows="4"
                value={formData.summary}
                onChange={handleInputChange}
                placeholder="Cuenta lo más importante del partido..."
                required
              />
            </label>

            <label>
              URL de foto
              <input
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://..."
              />
            </label>

            <label>
              O subir imagen local
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </label>

            {(formData.imageUrl || previewImage) && (
              <img className="preview" src={formData.imageUrl || previewImage} alt="Previsualización" />
            )}

            <button type="submit">Publicar noticia</button>
          </form>
        </section>

        <aside className="card">
          <h2>Clasificación</h2>
          {COMPETITIONS.map((competition) => (
            <div key={competition} className="table-wrap">
              <h3>{competition}</h3>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Equipo</th>
                    <th>Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings[competition].map(([team, points], index) => (
                    <tr key={team}>
                      <td>{index + 1}</td>
                      <td>{team}</td>
                      <td>{points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </aside>
      </main>

      <section className="card news-section">
        <div className="news-header">
          <h2>Últimas noticias</h2>
          <select value={selectedCompetition} onChange={(event) => setSelectedCompetition(event.target.value)}>
            <option value="Todas">Todas</option>
            {COMPETITIONS.map((competition) => (
              <option key={competition} value={competition}>
                {competition}
              </option>
            ))}
          </select>
        </div>

        <div className="news-grid">
          {filteredNews.map((article) => (
            <article key={article.id} className="news-card">
              <img src={article.image} alt={article.title} />
              <div>
                <p className="badge">{article.competition}</p>
                <h3>{article.title}</h3>
                <p className="meta">
                  {article.date} · {article.result}
                </p>
                <p>{article.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
