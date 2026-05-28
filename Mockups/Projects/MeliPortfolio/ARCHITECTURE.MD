# Architecture — Meli Portfolio & Resume

## Decisões Arquiteturais

| Decisão | Escolha | Alternativas | Justificativa |
|---------|---------|-------------|---------------|
| Framework | Next.js 16 | CRA, Vite | SSR/SSG, API routes no mesmo deploy, Turbopack |
| Banco de dados | MongoDB Atlas | PostgreSQL, Firebase | Documentos flexíveis para galeria + i18n |
| Armazenamento | Vercel Blob | S3, Cloudinary | Integração nativa com Vercel, URLs assinadas |
| Gerenciamento de estado | Zustand + TanStack Query | Redux, Context API | Leve, persist middleware, cache de queries |
| Autenticação | Bearer Token (API Key) | NextAuth, JWT | Simplicidade para admin single-user |
| Estilização | Tailwind v4 + CSS Modules | Styled Components, Sass | Utilidade-first, sem runtime CSS |

## Fluxos Principais

### Galeria de Imagens
```
Usuário → /gallery → GET /api/gallery → MongoDB → Vercel Blob (signed URLs)
Admin  → /galleryAdmin → Auth (Bearer) → POST/DELETE /api/gallery → MongoDB + Blob
```

### Formulário de Vaga IT
```
Usuário → /meli-it-case → Form (CPF/CEP/phone validation) → POST /api/applications → MongoDB
```

### Internacionalização
```
I18nProvider → detecta navigator.language → fallback EN → traduções via dicionário (PT/EN/ES)
```

## Observações
- Imagens privadas no Vercel Blob usam URLs assinadas com validade, servidas via proxy em `/api/gallery/proxy`
- Rate limiting: 20 req/min por IP nos endpoints de API
- Admin auth usa `ADMIN_API_KEY` do env, sem refresh token
- Build roda com Turbopack `next dev --turbo` para dev
