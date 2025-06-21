# 🎨 Guide du système de thème

## Fonctionnalité de basculement Light/Dark

Le tableau de bord administrateur dispose maintenant d'un système de thème avec basculement entre mode clair et mode sombre.

### 🌟 Caractéristiques

- **Thème par défaut** : Mode clair (Light)
- **Persistance** : Le choix de thème est sauvegardé et maintenu entre les sessions
- **Localisation** : Bloc "Thème" dans le tableau de bord admin (remplace l'ancien bloc "Paramètres")
- **Interface intuitive** : Toggle avec icônes Soleil/Lune

### 🎛️ Utilisation

1. **Accéder au tableau de bord** : `/admin/dashboard`
2. **Localiser le bloc "Thème"** dans la section d'actions rapides
3. **Utiliser le toggle** : 
   - Position gauche (🌞) = Mode clair
   - Position droite (🌙) = Mode sombre
4. **Changement instantané** : Le thème s'applique immédiatement
5. **Persistance automatique** : Votre choix est sauvegardé automatiquement

### 🔧 Implémentation technique

- **Hook personnalisé** : `useTheme()` pour la gestion d'état
- **Stockage local** : `localStorage` avec clé `admin-theme`
- **Tailwind CSS** : Classes `dark:` pour le mode sombre
- **Composant réutilisable** : `ThemeToggle` avec design moderne

### 📁 Fichiers concernés

- `src/hooks/useTheme.tsx` - Hook de gestion du thème
- `src/components/ui/theme-toggle.tsx` - Composant de basculement
- `src/pages/AdminDashboard.tsx` - Intégration dans le tableau de bord
- `tailwind.config.ts` - Configuration dark mode (déjà configuré)

### 🎯 Comportement

- **Mode clair** : Fond blanc/gris clair, texte sombre
- **Mode sombre** : Fond gris foncé/noir, texte clair
- **Transitions fluides** : Animations CSS pour un changement doux
- **Compatibilité** : Fonctionne sur tous les navigateurs modernes 