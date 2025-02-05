# 🎮 **Fun Game Store** – Explorez, Favorisez, Jouez !

**Fun Game Store** est une plateforme moderne permettant aux utilisateurs de :

- **Découvrir** les jeux vidéo populaires grâce à l'API RAWG.
- **Gérer leurs favoris** pour retrouver rapidement leurs jeux préférés.
- **S'inscrire et se connecter** avec un système sécurisé basé sur **JWT et sessions**.
- **Personnaliser leur profil**.

📌 **Déployé sur Vercel** 👉 [Fun Game Store](https://fun-game-store.vercel.app/)

---

## 📌 **Table des matières**

1. [🛠️ Technologies utilisées](#️-technologies-utilisées)
2. [🚀 Fonctionnalités](#-fonctionnalités)
3. [📦 Installation et configuration](#-installation-et-configuration)
4. [🔑 Authentification & Sécurité](#-authentification--sécurité)
5. [🔍 API utilisée](#-api-utilisée)
6. [📜 Roadmap](#-roadmap)
7. [💡 Ressources utiles](#-ressources-utiles)

---

## 🛠️ **Technologies utilisées**

| Technologie        | Description                                          |
| ------------------ | ---------------------------------------------------- |
| **Next.js**        | Framework React avec rendu côté serveur (App Router) |
| **TypeScript**     | Typage robuste et sûr                                |
| **TailwindCSS**    | Framework CSS moderne et responsive                  |
| **Prisma**         | ORM pour gérer la base de données                    |
| **SQLite**         | Base de données pour le développement local          |
| **PostgreSQL**     | Base de données cloud via **Supabase**               |
| **JWT & Sessions** | Authentification sécurisée **sans NextAuth.js**      |
| **Vercel**         | Hébergement et déploiement                           |

---

## 🚀 **Fonctionnalités**

✔️ **Explorer** les jeux récents et populaires  
✔️ **Rechercher** des jeux par nom et genre  
✔️ **Ajouter en favoris** et retrouver facilement ses jeux préférés  
✔️ **S'inscrire et se connecter** via JWT (sessions sécurisées)  
✔️ **Modifier son profil** (nom, email, mot de passe)  
✔️ **Interface moderne et responsive**  

---

## 📦 **Installation et configuration**

### 1️⃣ **Cloner le projet**

```sh
git clone https://github.com/Ahmat-2000/fun-game-store.git
cd fun-game-store
```

### 2️⃣ **Installer les dépendances**

```sh
npm install
```

### 3️⃣ **Configurer l’environnement**

Créer un fichier **`.env`** et ajouter :

```env
# Mode développement (SQLite)
DATABASE_PROVIDER="sqlite"
DATABASE_URL="file:./dev.db"
DIRECT_URL=""

# Mode production (PostgreSQL - Supabase)
POSTGRES_URL="..."
DATABASE_URL="POSTGRES_PRISMA_URL" # à modifier
DIRECT_URL="POSTGRES_URL_NON_POOLING" # à modifier

# Clé API pour RAWG (Jeux vidéo)
NEXT_PUBLIC_RAWG_API_KEY="..."

# Secret pour sécuriser les sessions JWT
SESSION_SECRET_KEY="..."
```

🔹 **En local** : **SQLite** est utilisé  
🔹 **En production** : **PostgreSQL** sur **Supabase**

### 4️⃣ **Générer le client Prisma**

```sh
npx prisma generate
```

### 5️⃣ **Appliquer les migrations**

📌 **En local (SQLite)** :

```sh
npx prisma migrate dev --name init
```

📌 **En production (Supabase - PostgreSQL)** :

```sh
npx prisma migrate deploy
```

### 6️⃣ **Lancer le serveur**

```sh
npm run dev
```

📌 **Accès local** : [http://localhost:3000](http://localhost:3000)

---

## 🔑 **Authentification & Sécurité**

**Le système d'authentification repose sur JWT & Sessions.**  
✔️ **Les mots de passe** sont **hachés avec `bcryptjs`** avant stockage  
✔️ **Les tokens JWT** sont **signés et sécurisés** avec `jose`  
✔️ **Les sessions utilisateurs** sont stockées côté serveur pour plus de sécurité  

### **Sécurité**

✅ Vérification et validation des entrées utilisateur avec **Zod**  
🔄 Protection **XSS** via **Next.js et React**  
🔄 Protection **SQL Injection (SQLi)** grâce à **Prisma**  
🔄 Protection **CSRF** via **Tokens JWT & Sessions sécurisées**  

---

## 🔍 **API utilisée**

L’application utilise **RAWG API** pour récupérer les jeux vidéo.  
📌 **Documentation** : [RAWG API](https://api.rawg.io/docs/)

**Endpoints principaux :**

- **Liste des jeux** :  
  `https://api.rawg.io/api/games?key=VOTRE_CLE_API`
- **Détails d'un jeu** :  
  `https://api.rawg.io/api/games/{id}?key=VOTRE_CLE_API`
- **Ajouts et extensions d'un jeu** :  
  `https://api.rawg.io/api/games/{id}/additions?key=VOTRE_CLE_API`

---

## 📜 **Roadmap**

| 🚀 Étape | 📌 Tâche                                  | 🏁 Statut   |
| -------- | ----------------------------------------- | ----------- |
| **1**    | Implémentation de l'authentification      | ✅ Terminé   |
| **2**    | Page `/games` (recherche, filtres, liste) | ✅ Terminé   |
| **3**    | Système de favoris (ajout/suppression)    | ✅ Terminé   |
| **4**    | Page `/profile` (détails utilisateur)     | ✅ Terminé   |
| **5**    | Protection XSS, SQLi, CSRF                | 🔄 En cours |
| **6**    | Caching et amélioration des performances  | 🔜 À faire  |
| **7**    | Déploiement sur **Vercel**                | ✅ Terminé   |

---

## 💡 **Ressources utiles**

- **[Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)**  
- **[Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)**  
- **[Prisma JS Quickstart (SQLite)](https://www.prisma.io/docs/getting-started/quickstart-sqlite)**  
- **[Jose (JWT Auth)](https://www.npmjs.com/package/jose)**  
- **[Bcrypt JS (Hashing Passwords)](https://www.npmjs.com/package/bcryptjs)**  

---

## 🎉 **Contribuer**

Les contributions sont **les bienvenues** !  
Si vous trouvez un bug ou souhaitez ajouter une fonctionnalité, ouvrez une **issue** ou un **Pull Request** 🚀.

📬 **Contact** : [https://ahmat-mahamat.vercel.app](https://ahmat-mahamat.vercel.app)

---

🔥 **Merci d'utiliser Fun Game Store !** 🔥  
🎮 Bon jeu et amusez-vous bien ! 🚀

---
