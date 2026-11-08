# Poesia Polonesa — apresentação no GitHub Pages

Apresentação fullscreen, sem molduras, estática e interativa convertida de `Poesia2.pptx` (7 slides). Não requer Node.js, Python nem backend.

## Publicação no GitHub Pages

1. Crie um repositório no GitHub (para GitHub Free, use um repositório **público**).
2. Envie **o conteúdo deste ZIP**, não a pasta contendo o ZIP, para a raiz do repositório. `index.html`, `styles.css`, `app.js`, `assets/` e `.nojekyll` precisam ficar na raiz.
3. Entre em **Settings → Pages → Build and deployment**.
4. Selecione **Deploy from a branch**, branch **main**, pasta **/(root)** e salve.
5. Acesse `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/` após a publicação.

**Importante:** não teste o embed abrindo `index.html` por `file://`. O YouTube pode retornar o erro 153 porque não recebe um `Referer` válido. GitHub Pages serve o projeto por HTTPS, com origem identificável. O site explicita `strict-origin-when-cross-origin` nos metadados e nos iframes. Alguns navegadores, extensões de privacidade ou restrições do vídeo podem ainda bloquear o embed; nesse caso, cada slide também oferece link para abrir o vídeo no YouTube.

## Controles

- Setas ← / →, PageUp / PageDown ou espaço: navegar.
- F: tela cheia. G: visão geral. ?: ajuda. Home / End: início / fim.
- Deslizar lateralmente: navegação em telas de toque.
- Ao sair de um slide, o vídeo é interrompido.

## Vídeos

- Slide 3: https://youtu.be/TC7wRIpTJfo (declamação em polonês).
- Slide 6: https://www.youtube.com/watch?v=hs92DCl_4i8 (vídeo incorporado do PowerPoint).

O link textual exibido no PowerPoint para o slide 6 aponta por engano para o vídeo do slide 3; a apresentação web usa o vídeo realmente incorporado naquele slide.

## Estrutura

`index.html`: slides e conteúdo; `styles.css`: aparência; `app.js`: navegação, controles e YouTube; `assets/`: imagens extraídas do arquivo original; `.nojekyll`: evita processamento Jekyll desnecessário.

## Layout fullscreen

Os slides ocupam **100% da largura e altura da janela** do navegador, sem bordas externas. Navegação e ações ficam sobrepostas discretamente. Use `F` ou o botão superior para ativar a tela cheia real do navegador. No celular, os slides longos continuam roláveis.
