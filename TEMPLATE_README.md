# Template para Criar Novos Posts

Este ficheiro `TEMPLATE.mdx` serve como base para criar novos projetos.

## Como usar:

1. **Copia o ficheiro `TEMPLATE.mdx`** e renomeia para o nome do teu projeto (ex: `meu-projeto.mdx`)

2. **Substitui os placeholders:**

   - `[nome-projeto]` → nome da pasta do projeto (ex: `spaceship`, `alf`)
   - `Post Title` → título do projeto
   - `Post Subtitle` → descrição do projeto
   - `Text here` → valores para Role, Scope, Duration, Context
   - `order: 1` → número de ordem (1, 2, 3...)

3. **Adiciona as imagens:**

   - Capa: `public/assets/projects/[nome-projeto]/images/cover/cover.jpg`
   - Secções: `public/assets/projects/[nome-projeto]/images/sections/section-1.jpg`, etc.

4. **Edita o conteúdo:**
   - Substitui os textos de exemplo pelos teus textos
   - Adiciona ou remove secções conforme necessário
   - Usa `<ProjectSection>` para secções com imagem
   - Usa `<ProjectCentered>` para secções centralizadas sem imagem

## Componentes disponíveis:

- `<ProjectSection>` - Secção com texto e imagem lado a lado

  - `image="/caminho/para/imagem.jpg"` - caminho da imagem
  - `imageAlt="Descrição"` - texto alternativo
  - `inverted={true}` - inverte o layout (imagem à esquerda, texto à direita)

- `<ProjectCentered>` - Secção centralizada sem imagem

## Exemplo completo:

```mdx
---
title: "Meu Projeto"
description: "Descrição do projeto"
cover: "/assets/projects/meu-projeto/images/cover/cover.jpg"
role: "Design Lead"
scope: "Product Design"
duration: "2024"
context: "Plataforma"
order: 1
---

<ProjectSection image="/assets/projects/meu-projeto/images/sections/overview.jpg" imageAlt="Overview">
## Overview

Texto sobre o projeto aqui...

</ProjectSection>
```
