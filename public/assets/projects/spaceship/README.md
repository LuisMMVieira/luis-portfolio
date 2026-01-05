# Spaceship - Assets do Projeto

Esta pasta contém todos os assets do projeto Spaceship.

## Estrutura

```
spaceship/
├── images/
│   ├── cover/        # Imagem de capa do projeto (usada no card da homepage)
│   └── sections/     # Imagens para as secções do projeto (usadas nos componentes ProjectSection)
├── videos/           # Vídeos e animações do projeto
└── documents/        # PDFs e outros documentos relacionados
```

## Como usar

### Imagem de capa

- Coloca a imagem de capa em `images/cover/`
- Referência no frontmatter do MDX:
  ```yaml
  cover: "/assets/projects/spaceship/images/cover/spaceship-cover.jpg"
  ```

### Imagens das secções

- Coloca as imagens das secções em `images/sections/`
- Usa nos componentes ProjectSection:
  ```mdx
  <ProjectSection
    image="/assets/projects/spaceship/images/sections/navigation-system.jpg"
    imageAlt="Navigation System"
  >
    ## Navigation System ...
  </ProjectSection>
  ```

### Vídeos

- Coloca vídeos em `videos/`
- Referência: `/assets/projects/spaceship/videos/nome-do-video.mp4`

### Documentos

- Coloca documentos em `documents/`
- Referência: `/assets/projects/spaceship/documents/nome-do-documento.pdf`

## Nomenclatura recomendada

- **Capa**: `spaceship-cover.jpg` ou `cover.jpg`
- **Secções**: Use nomes descritivos como:
  - `navigation-system.jpg`
  - `design-system.jpg`
  - `ui-architecture.jpg`
- **Vídeos**: `spaceship-demo.mp4`, `navigation-flow.mp4`
- **Documentos**: `spaceship-case-study.pdf`
