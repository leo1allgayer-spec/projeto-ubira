# Configuração do Data Room protegido

A apresentação comercial é pública. O Data Room possui uma credencial principal e os documentos de maior sensibilidade exigem uma segunda senha.

## Segredos no Cloudflare

Em **Workers & Pages > projeto-ubira > Settings > Variables and Secrets**, configure no ambiente de produção:

- `DATA_ROOM_PASSWORD`: senha de entrada do Data Room.
- `SECONDARY_PASSWORD`: senha diferente, usada nos documentos de proteção adicional.
- `SESSION_SECRET`: chave aleatória longa, com pelo menos 32 caracteres.

Por compatibilidade com a configuração anterior, `SITE_PASSWORD` funciona temporariamente como fallback para as duas senhas. Antes da publicação definitiva, configure senhas distintas e remova esse fallback.

## Funcionamento

- A apresentação pública não solicita senha.
- A entrada em `data-room.html` solicita a credencial principal.
- Escrituras, registros, certidões, avaliação mercadológica e demonstrativos financeiros solicitam a segunda senha.
- As duas autorizações expiram após 8 horas.
- Cookies são assinados, `HttpOnly`, `Secure` e `SameSite=Lax`.
- Conteúdo e arquivos do Data Room recebem `noindex`, bloqueio de cache e cabeçalhos de segurança.
- `/logout` encerra as duas autorizações.

## Limite desta versão

Esta implementação usa senhas definidas no Cloudflare, sem banco de usuários. Para cumprir integralmente o manual com credenciais individuais, perfis, revogação, auditoria, limite de tentativas, arquivos privados e URLs temporárias, será necessária uma etapa de infraestrutura com armazenamento privado e gestão de identidades.

## Captação de leads e analytics

Configure também no ambiente de produção:

- `LEAD_WEBHOOK_URL`: endpoint HTTPS do CRM, automação ou serviço que receberá os formulários.
- `LEAD_WEBHOOK_TOKEN` (opcional): token Bearer enviado ao webhook.
- Binding `ANALYTICS` (opcional): dataset do Cloudflare Analytics Engine para eventos sem dados pessoais.
- `ANALYTICS_WEBHOOK_URL` (opcional): destino alternativo para eventos de conversão.

O endpoint `/api/lead` valida os campos, aplica honeypot e limite mínimo de tempo, não grava dados no site e retorna sucesso apenas depois que o webhook confirma o recebimento. Nenhum dado livre dos formulários é enviado ao endpoint de analytics.