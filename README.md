# 🚀 Rick & Morty Explorer

Una aplicación web moderna construida con **Next.js 15** que permite explorar personajes del universo Rick and Morty, comparar sus episodios y descubrir conexiones entre ellos.

## 🌟 Demo en Vivo

**[👉 Ver Aplicación](https://rick-and-morty-nextjs-tau.vercel.app/)**

## ✨ Características Principales

### 🔍 **Exploración Avanzada**
- **Búsqueda en tiempo real** con debounce (500ms)
- **Filtros múltiples** por status, species y gender
- **Paginación inteligente** con navegación fluida
- **Estados de carga** con skeleton components

### 👥 **Comparación de Personajes**
- **Selección dual** de personajes para comparar
- **Episodios compartidos** entre personajes seleccionados
- **Estadísticas visuales** de episodios por personaje
- **Persistencia de selección** en localStorage

### ❤️ **Sistema de Favoritos**
- **Marcar favoritos** con persistencia local
- **Indicadores visuales** (corazón y estrella)
- **Gestión completa** de favoritos

### 🎨 **Experiencia de Usuario**
- **Diseño responsive** optimizado para todos los dispositivos
- **Animaciones suaves** y transiciones elegantes
- **Tema moderno** con gradientes y sombras
- **Accesibilidad completa** con ARIA labels y navegación por teclado

## 🛠️ Stack Tecnológico

### **Frontend**
- **[Next.js 15](https://nextjs.org/)** - React Framework con App Router
- **[React 18](https://reactjs.org/)** - Biblioteca de UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utility-first

### **UI Components**
- **[Radix UI](https://www.radix-ui.com/)** - Componentes primitivos accesibles
- **[Lucide React](https://lucide.dev/)** - Iconos modernos
- **[Class Variance Authority](https://cva.style/)** - Gestión de variantes de componentes

### **Testing**
- **[Jest](https://jestjs.io/)** - Framework de testing
- **[React Testing Library](https://testing-library.com/)** - Testing de componentes React
- **[jsdom](https://github.com/jsdom/jsdom)** - Entorno DOM para tests

### **API**
- **[Rick and Morty API](https://rickandmortyapi.com/)** - API REST pública

## 📦 Instalación y Configuración

### **Prerrequisitos**
- Node.js 18+ 
- npm o yarn

### **Instalación**

\`\`\`bash
# Clonar el repositorio
git clone https://github.com/LeandroDiPalma/rick-and-morty-nextjs
cd rick-morty-nextjs

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
\`\`\`

### **Scripts Disponibles**

\`\`\`bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter ESLint
npm test             # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Tests con coverage
\`\`\`

## 🏗️ Arquitectura del Proyecto

\`\`\`
src/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   ├── globals.css        # Estilos globales
│   ├── loading.tsx        # Componente de carga
│   ├── error.tsx          # Página de error
│   └── not-found.tsx      # Página 404
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base (Button, Card, etc.)
│   ├── character-card.tsx # Card de personaje
│   ├── character-section.tsx # Sección de personajes
│   ├── episode-list.tsx   # Lista de episodios
│   ├── search-filters.tsx # Barra de búsqueda y filtros
│   └── character-skeleton.tsx # Loading skeleton
├── hooks/                 # Custom hooks
│   ├── use-characters.ts  # Hook para personajes
│   ├── use-episodes.ts    # Hook para episodios
│   ├── use-favorites.ts   # Hook para favoritos
│   ├── use-filters.ts     # Hook para filtros
│   ├── use-debounce.ts    # Hook de debounce
│   └── use-character-selection.ts # Hook de selección
├── types/                 # Definiciones de TypeScript
│   └── index.ts          # Tipos principales
└── lib/                   # Utilidades
    └── utils.ts          # Funciones helper
\`\`\`

## 🎯 Funcionalidades Detalladas

### **Búsqueda y Filtros**
- Búsqueda por nombre con debounce para optimizar llamadas API
- Filtros por status: Alive, Dead, Unknown
- Filtros por species: Human, Alien, Robot, Cronenberg
- Filtros por gender: Male, Female, Genderless, Unknown
- Limpieza rápida de todos los filtros

### **Gestión de Estado**
- **useState** para estado local de componentes
- **useEffect** para efectos secundarios y API calls
- **localStorage** para persistencia de favoritos y selecciones
- **Custom hooks** para lógica reutilizable

### **Optimizaciones de Performance**
- **Debounce** en búsqueda (500ms)
- **Lazy loading** de imágenes
- **Memoización** de componentes pesados
- **Skeleton loading** para mejor UX
