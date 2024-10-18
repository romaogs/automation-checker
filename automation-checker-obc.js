const puppeteer = require('puppeteer');

(async () => {
  // Inicia o navegador
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Acessa o site do Circle na página de login
  await page.goto('https://comunidade.onebitcode.com/users/sign_in?post_login_redirect=https%3A%2F%2Fcomunidade.onebitcode.com%2Ffeed#email');


  const email = 'seu email'
  const senha = 'sua senha'

  // Faz login 
  await page.type('#user_email', email);
  await page.type('#user_password', senha);
  await page.click('button[type="submit"]');

  // Aguarda a navegação até a página de cursos
  await page.waitForNavigation();

  const initialPage = 'https://comunidade.onebitcode.com/c/curso/sections/360097/lessons/1336821'

  // Navega para a página do curso e encontra a aula que deseja marcar como concluída
  await page.goto(initialPage);

  let continuar = true;

  while (continuar) {
    try {
      // Espera o botão "Concluir aula" aparecer na página
      await page.waitForSelector('button[type="submit"]', { timeout: 10000 });

      // Clica no botão "Concluir aula"
      await page.click('button[type="submit"]');
      console.log('Aula concluída!');

      // Aguarda a navegação para a próxima aula
      await page.waitForNavigation({ timeout: 10000 });

    } catch (error) {
      console.log('Erro ao concluir aula. Recarregando a página...');

      try {
        // Recarrega a página caso não tenha conseguido clicar no botão "Concluir aula"
        await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
        console.log('Página recarregada. Tentando novamente...');
      } catch (reloadError) {
        console.log('Erro ao recarregar a página.');
        continuar = false; // Sai do loop se houver erro ao recarregar a página
      }
    }
  }


  // // Fecha o navegador
  await browser.close();
})();
