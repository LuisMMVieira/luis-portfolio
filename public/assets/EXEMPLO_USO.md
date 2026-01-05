# Como usar assets nos projetos

## Estrutura de pastas

Cada projeto tem a sua própria pasta em `public/assets/projects/`:

- `spaceship/` - assets do projeto Spaceship
- `alf/` - assets do projeto Alf
- `spacesecure/` - assets do projeto Spacesecure

Cada projeto contém:

- `images/cover/` - imagem de capa
- `images/sections/` - imagens das secções
- `videos/` - vídeos e animações
- `documents/` - PDFs e documentos

## Adicionar imagens

1. Coloca as imagens na pasta do projeto correspondente
2. Usa o componente `ProjectSection` com a propriedade `image`:

```mdx
<ProjectSection image="/assets/projects/spaceship/images/sections/navigation-system.jpg" imageAlt="Navigation System">
## Navigation System

Descrição do projeto aqui...

</ProjectSection>
```

## Exemplo completo

```mdx
---
title: "Meu Projeto"
description: "Descrição do projeto"
cover: "/assets/projects/spaceship/images/cover/spaceship-cover.jpg"
role: "Design Lead"
scope: "Product Design"
duration: "2022-2024"
context: "Plataforma"
order: 1
---

<ProjectSection image="/assets/projects/spaceship/images/sections/overview.jpg" imageAlt="Overview do projeto">
## Overview

Texto sobre o projeto aqui...

</ProjectSection>

<ProjectSection inverted={true} image="/assets/projects/spaceship/images/sections/details.jpg" imageAlt="Detalhes">
## Detalhes

Mais texto aqui...

</ProjectSection>

<ProjectCentered>
## Conclusão

Texto centralizado aqui...

</ProjectCentered>
```

## Sem imagem (placeholder)

Se não especificares a propriedade `image`, será mostrado um placeholder:

```mdx
<ProjectSection>
## Seção sem imagem

Texto aqui...

</ProjectSection>
```
