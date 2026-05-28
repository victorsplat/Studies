# Requirements — Meli Portfolio & Resume

## Funcionais
- [x] RF-01: Página inicial com Hero, Sobre, Skills, Projetos, Contato
- [x] RF-02: Alternar entre PT/EN/ES sem recarregar
- [x] RF-03: Alternar tema dark/light com persistência
- [x] RF-04: Galeria pública com visualização em grid
- [x] RF-05: Modo Explore (carrossel 3D com profundidade de campo)
- [x] RF-06: Admin autenticado via token
- [x] RF-07: CMS admin: upload, editar, deletar imagens
- [x] RF-08: Formulário de candidatura IT com validação brasileira (CPF, CEP, telefone, PCD)
- [x] RF-09: Armazenamento de imagens em Vercel Blob com URLs assinadas
- [x] RF-10: Rate limiting (20 req/min)
- [ ] RF-11: Testes automatizados
- [ ] RF-12: Monitoramento com Sentry

## Não-Funcionais
- [x] RNF-01: Build zero lint errors
- [x] RNF-02: Responsivo (mobile-first)
- [x] RNF-03: Animações suaves (Framer Motion)
- [x] RNF-04: Compressão de imagens client-side antes do upload
- [x] RNF-05: Autenticação stateless (Bearer)

## Regras de Negócio
- [x] RN-01: Apenas admin pode gerenciar galeria
- [x] RN-02: Imagens privadas servidas via proxy com signed URLs
- [ ] RN-03: Dados de formulário de candidatura não expostos publicamente
