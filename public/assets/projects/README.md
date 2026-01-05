# Projects Assets Directory

Esta pasta contém todos os assets organizados por projeto.

## Estrutura

```
projects/
├── spaceship/
│   ├── images/
│   │   ├── cover/
│   │   └── sections/
│   ├── videos/
│   └── documents/
├── alf/
│   ├── images/
│   ├── videos/
│   └── documents/
└── spacesecure/
    ├── images/
    ├── videos/
    └── documents/
```

## Como usar

Cada projeto tem a sua própria pasta com subpastas para diferentes tipos de assets:

- **images/** - Imagens do projeto (cover e sections)
- **videos/** - Vídeos e animações
- **documents/** - PDFs e outros documentos

## Caminhos de referência

Todos os caminhos começam com `/assets/projects/[nome-do-projeto]/`:

- Imagens: `/assets/projects/spaceship/images/sections/nome.jpg`
- Vídeos: `/assets/projects/spaceship/videos/nome.mp4`
- Documentos: `/assets/projects/spaceship/documents/nome.pdf`

## Adicionar novo projeto

1. Cria uma nova pasta com o nome do projeto
2. Cria as subpastas: `images/cover/`, `images/sections/`, `videos/`, `documents/`
3. Adiciona os assets nas respetivas pastas
4. Usa os caminhos `/assets/projects/[nome-do-projeto]/...` nos ficheiros MDX
