# 🎓 Scholora Frontend

**Plateforme d'éducation en ligne avec cours live et abonnements mensuels**

Application Next.js pour connecter étudiants et professeurs à travers des formations en direct.

## 🚀 Démarrage rapide

```bash
# Installation
git clone https://github.com/OBouysfi/scholora_frontend.git
cd scholora_frontend
npm install

# Développement
npm run dev

# Avec Docker
docker-compose up --build
```

**Accès :** http://localhost:3000

## 🛠️ Stack Technique

- **Frontend :** Next.js 14 + TypeScript + Tailwind CSS
- **State :** Zustand + React Query
- **Auth :** NextAuth.js
- **Payments :** Stripe
- **UI :** Headless UI + Heroicons

## ⚙️ Configuration

```bash
# Variables d'environnement
cp .env.example .env.local
```

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 📁 Structure

```
src/
├── app/          # App Router Next.js
├── components/   # Composants réutilisables
├── hooks/        # Custom hooks
├── lib/          # Configurations
├── stores/       # State management
└── types/        # Types TypeScript
```

## 🐳 Docker

```bash
# Développement
docker-compose up --build

# Services inclus
Frontend:      http://localhost:3000
Backend API:   http://localhost:8000
PostgreSQL:    localhost:5432
Redis:         localhost:6379
Elasticsearch: http://localhost:9200
```

## 📋 Scripts

```bash
npm run dev         # Développement
npm run build       # Build production
npm run lint        # Linting
npm run test        # Tests
```

## 🚀 Fonctionnalités

- ✅ **Multi-portails** : Étudiant, Professeur, Admin
- ✅ **Abonnements** mensuels avec Stripe
- ✅ **Cours live** en temps réel
- ✅ **Calendrier** intelligent
- ✅ **Recherche** avancée
- ✅ **Responsive** design

## 👥 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/ma-feature`)
3. Commit (`git commit -m 'Add: nouvelle fonctionnalité'`)
4. Push (`git push origin feature/ma-feature`)
5. Ouvrir une Pull Request

## 📄 License

MIT License - voir [LICENSE](LICENSE)

# Scholora Frontend

Frontend Next.js pour la plateforme éducative Scholora.

## Installation

Après avoir cloné le projet :

```bash
npm i
```

## Docker

### Construire l'image
```bash
docker build -t scholora_frontend .
```

### Lancer le container
```bash
docker run --name scholora_frontend -p 5173:3000 scholora_frontend
```

### Arrêter et supprimer
```bash
docker stop scholora_frontend
docker rm scholora_frontend
```

## URLs

- **Frontend** : http://localhost:5173
- **Login Admin** : http://localhost:5173/auth/login

## Identifiants de test

- ** contacter OTHMAN BOUYSFI

## Prérequis

- Docker
- Node.js 18+
- Backend Laravel en cours d'exécution sur le port 8000