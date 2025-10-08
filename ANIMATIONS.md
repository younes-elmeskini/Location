# Guide des Animations

Ce document décrit les animations implémentées dans l'application de location de voitures.

## 🎬 Types d'Animations

### 1. Animations de Section (SectionAnimation)
- **Fonction** : Anime l'apparition des sections principales
- **Directions disponibles** : `up`, `down`, `left`, `right`
- **Utilisation** : Wrapper pour les sections importantes

```tsx
<SectionAnimation direction="up" delay={0.2}>
  <div>Contenu de la section</div>
</SectionAnimation>
```

### 2. Animations Échelonnées (StaggeredAnimation)
- **Fonction** : Anime les éléments de liste avec un délai progressif
- **Utilisation** : Parfait pour les grilles de cartes ou listes

```tsx
<StaggeredAnimation>
  {items.map(item => (
    <StaggeredItem key={item.id}>
      <CardComponent {...item} />
    </StaggeredItem>
  ))}
</StaggeredAnimation>
```

### 3. Animations de Page (PageTransition)
- **Fonction** : Transition fluide entre les pages
- **Utilisation** : Wrapper global dans le layout

```tsx
<PageTransition>
  {children}
</PageTransition>
```

### 4. Animations de Scroll (ScrollAnimation)
- **Fonction** : Éléments qui apparaissent au scroll
- **Utilisation** : Contenu qui se révèle progressivement

```tsx
<ScrollAnimation delay={0.3}>
  <div>Contenu qui apparaît au scroll</div>
</ScrollAnimation>
```

## 🎨 Animations CSS Personnalisées

### Classes Utilitaires
- `.animate-fade-in-up` : Apparition depuis le bas
- `.animate-fade-in-left` : Apparition depuis la gauche
- `.animate-fade-in-right` : Apparition depuis la droite
- `.animate-scale-in` : Apparition avec effet de zoom
- `.animate-slide-in-down` : Glissement depuis le haut

### Classes Interactives
- `.card-hover` : Effet de survol pour les cartes
- `.button-animation` : Animation pour les boutons
- `.interactive-element` : Transition générale pour les éléments interactifs

## 🚀 Composants Animés

### 1. HeroFilter
- **Animation** : Texte qui apparaît depuis la gauche
- **Forme** : Formulaire qui glisse depuis la droite
- **Bouton** : Effet de scale au survol

### 2. InfoBlock
- **Animation** : Grille d'icônes avec effet échelonné
- **Icônes** : Apparition avec effet de scale
- **Cartes** : Effet de survol avec élévation

### 3. MenuCars
- **Animation** : Cartes qui apparaissent progressivement
- **Délai** : 0.1s entre chaque carte
- **Hover** : Élévation des cartes au survol

### 4. CarCard
- **Animation** : Image qui apparaît avec scale
- **Contenu** : Informations qui apparaissent avec délai
- **Interactions** : Hover et tap effects

## ⚙️ Configuration

### Durées par défaut
- **Sections** : 0.6s - 0.8s
- **Cartes** : 0.3s - 0.5s
- **Boutons** : 0.2s
- **Transitions** : 0.3s

### Easing Functions
- **Cubic Bezier** : `[0.25, 0.46, 0.45, 0.94]`
- **Effet** : Animation naturelle et fluide

### Viewport Settings
- **Once** : `true` (animation une seule fois)
- **Margin** : `-100px` (déclenchement avant la vue)

## 🎯 Bonnes Pratiques

### Performance
- Utilisez `viewport={{ once: true }}` pour éviter les re-animations
- Privilégiez les animations CSS pour les éléments simples
- Utilisez Framer Motion pour les interactions complexes

### Accessibilité
- Respectez les préférences `prefers-reduced-motion`
- Gardez les animations subtiles et non intrusives
- Assurez-vous que le contenu reste lisible pendant les animations

### UX
- Les délais entre les éléments créent un rythme visuel agréable
- Les effets de hover donnent un feedback immédiat
- Les transitions de page maintiennent la continuité

## 🔧 Personnalisation

Pour ajouter de nouvelles animations :

1. **Créer un nouveau variant** dans `SectionAnimation.tsx`
2. **Ajouter une classe CSS** dans `globals.css`
3. **Utiliser les composants existants** avec de nouveaux props

### Exemple d'ajout
```tsx
// Nouveau variant
const bounceVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

// Nouvelle classe CSS
@keyframes bounceIn {
  0% { transform: scale(0.3) rotate(-10deg); }
  50% { transform: scale(1.05) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); }
}
```

## 📱 Responsive

Toutes les animations s'adaptent automatiquement aux différentes tailles d'écran :
- **Mobile** : Animations plus rapides
- **Desktop** : Animations plus fluides
- **Tablet** : Transition progressive

Les animations sont optimisées pour offrir une expérience utilisateur cohérente sur tous les appareils.
