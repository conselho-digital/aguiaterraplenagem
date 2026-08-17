# Águia Terraplenagem

Site institucional (página única, estático) da Águia Terraplenagem, com informações
sobre os serviços, área de atendimento e contato via WhatsApp/telefone.

Site publicado: https://aguiaterraplenagem.com.br/

## Estrutura

- `index.html` — página principal
- `css/style.css` — estilos
- `js/script.js` — comportamento do menu mobile e ano do rodapé
- `images/` — logo, banner, favicon e ícones
- `robots.txt` / `sitemap.xml` — arquivos de SEO para indexação em buscadores

## Como visualizar localmente

**Opção mais simples:** baixe os arquivos do repositório (botão verde **Code → Download ZIP**
no GitHub, ou `git clone`), extraia a pasta e dê duplo clique no arquivo `index.html`
para abri-lo diretamente no navegador. Não é necessário instalar nada.

**Opção alternativa (via servidor local):** para simular exatamente como o site
se comporta quando publicado, sirva a pasta com um servidor estático simples:

```bash
python3 -m http.server 8000
```

E acesse `http://localhost:8000`.
