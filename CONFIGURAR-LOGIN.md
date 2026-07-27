# Configuração do acesso protegido

O site utiliza uma Cloudflare Pages Function para bloquear todo o conteúdo antes que HTML, imagens, vídeos ou documentos sejam entregues ao navegador.

## Variáveis secretas obrigatórias

No painel do Cloudflare:

1. Abra **Workers & Pages**.
2. Selecione o projeto **projeto-ubira**.
3. Acesse **Settings > Variables and Secrets**.
4. Adicione as três variáveis abaixo no ambiente de **Production** e marque todas como **Encrypt**:

   - `SITE_USERNAME`: usuário compartilhado para acessar o site.
   - `SITE_PASSWORD`: senha forte para acessar o site.
   - `SESSION_SECRET`: chave aleatória longa, diferente da senha, com pelo menos 32 caracteres.

5. Salve as variáveis.
6. Faça um novo deploy do projeto para que os segredos sejam carregados.

Enquanto as três variáveis não estiverem configuradas, o site permanecerá fechado e mostrará a mensagem de configuração.

## Funcionamento

- A sessão autenticada dura 8 horas.
- O cookie de sessão é assinado, `HttpOnly`, `Secure` e `SameSite=Lax`.
- O endereço `/logout` encerra a sessão.
- PDFs, imagens e vídeos também exigem autenticação.
- Nenhuma senha é armazenada no GitHub ou no navegador.

## Troca de senha

Altere `SITE_PASSWORD` no painel do Cloudflare e faça um novo deploy. Para invalidar imediatamente todas as sessões existentes, altere também `SESSION_SECRET`.
