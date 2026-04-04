# Smart Budget Tracker

O aplicație web Full-Stack pentru gestionarea finanțelor personale, construită pentru a demonstra arhitectura modernă web și separarea clară a responsabilităților (Frontend, API, Bază de date).

## Tehnologii Folosite

* **Frontend:** React, TypeScript, Vite
* **Backend:** Python, Django, Django REST Framework (DRF)
* **Bază de Date:** PostgreSQL
* **Arhitectură:** RESTful API

## Funcționalități

* **Vizualizare Tranzacții:** Preluarea și afișarea istoricului de venituri și cheltuieli.
* **Adăugare Tranzacții:** Formular controlat pentru înregistrarea de noi tranzacții, cu categorii dinamice.
* **Ștergere Tranzacții:** Posibilitatea de a șterge înregistrări, cu actualizarea automată a interfeței.
* **Dashboard Interactiv:** Calcularea automată a balanței, totalului de venituri și totalului de cheltuieli.

## 🛠️ Cum să rulezi proiectul local

### 1. Setare Backend (Django)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Pe Windows folositi: venv\Scripts\activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver

### 2. Setare Frontend (React)
cd frontend
npm install
npm run dev

Aplicația va fi disponibilă la http://localhost:5173