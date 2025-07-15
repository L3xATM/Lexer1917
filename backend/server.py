from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import os
from datetime import datetime

app = FastAPI(title="Lex Portfolio API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Portfolio data
portfolio_data = {
    "personal_info": {
        "name": "Lex",
        "also_known_as": "L3x",
        "title": "Desarrollador Full Stack & Entusiasta de la Tecnología",
        "description": "Entusiasta de la tecnología con una fuerte inclinación por el desarrollo de soluciones prácticas y accesibles. Desde muy joven me ha apasionado desmontar, entender y optimizar todo lo relacionado con la informática.",
        "location": "Barcelona, España",
        "age": 18,
        "birthday": "31 de Diciembre"
    },
    "about": {
        "specialization": "Montaje y mantenimiento de PCs, desarrollo de software ligero y útil, especialmente enfocado a comunidades y usuarios individuales.",
        "projects": [
            "Múltiples bots para Discord",
            "Páginas web personales",
            "Proyectos tipo microsaas"
        ],
        "current_project": {
            "title": "Guía básica para montar y mantener tu propio PC",
            "type": "Ebook",
            "description": "Dirigido a quienes quieren adentrarse en el mundo del hardware desde cero"
        },
        "differentiators": [
            "Me muevo entre lo técnico y lo creativo, combinando código con diseño funcional",
            "Soy autodidacta y me gusta aprender constantemente nuevas tecnologías",
            "He gestionado y optimizado comunidades en Discord",
            "Me involucro en todas las fases de un proyecto: desde la idea hasta la implementación",
            "Valoro la simplicidad, claridad y eficiencia en todo lo que creo"
        ]
    },
    "technologies": {
        "languages": ["JavaScript", "Node.js", "HTML", "CSS"],
        "frameworks": ["Discord.js", "TailwindCSS", "React"],
        "tools": ["Git & GitHub", "Visual Studio Code", "Canva", "Netlify"],
        "other_skills": [
            "Automatización de tareas",
            "Diseño web básico",
            "Administración de servidores",
            "Asesoramiento en hardware"
        ]
    },
    "contact": {
        "discord": "L3x#3052 o l3xssj",
        "github": "github.com/L3xATM",
        "email": "contactol3x@gmail.com",
        "kofi": "ko-fi.com/l3x",
        "linktree": "linktr.ee/Lexer"
    }
}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

@app.get("/api/portfolio")
async def get_portfolio():
    return portfolio_data

@app.get("/api/personal-info")
async def get_personal_info():
    return portfolio_data["personal_info"]

@app.get("/api/about")
async def get_about():
    return portfolio_data["about"]

@app.get("/api/technologies")
async def get_technologies():
    return portfolio_data["technologies"]

@app.get("/api/contact")
async def get_contact():
    return portfolio_data["contact"]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)