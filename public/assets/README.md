# Assets Directory

Esta pasta contém todos os assets do projeto organizados por tipo e projeto.

## Estrutura

```
assets/
├── projects/         # Assets organizados por projeto
│   ├── spaceship/
│   ├── alf/
│   └── spacesecure/
└── icons/            # Ícones gerais do site
```

## Organização por projeto

Cada projeto em `projects/` tem:

- **images/** - Imagens (cover e sections)
- **videos/** - Vídeos e animações
- **documents/** - PDFs e documentos

Ver `projects/README.md` para mais detalhes sobre a estrutura de cada projeto.

## Ícones gerais

A pasta `icons/` contém ícones e gráficos que são usados em todo o site (não específicos de um projeto).

## Como usar

### Imagens de projetos

```mdx
<ProjectSection
  image="/assets/projects/spaceship/images/sections/navigation.jpg"
  imageAlt="Navigation"
>
  ## Seção ...
</ProjectSection>
```

### Vídeos

```html
<video src="/assets/projects/spaceship/videos/demo.mp4"></video>
```

### Documentos

```mdx
[Download PDF](/assets/projects/spaceship/documents/case-study.pdf)
```

### Ícones gerais

```html
<img src="/assets/icons/logo.svg" alt="Logo" />
```
