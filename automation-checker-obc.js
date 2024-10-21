require('dotenv').config()
const readline = require('readline')
const inquirer = require('inquirer')
const puppeteer = require('puppeteer');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const trilhas = {
  'Fundamentos Fullstack': {
    'Comece por aqui': {
      start: 'https://comunidade.onebitcode.com/c/curso/sections/360097/lessons/1336821',
      end: 'https://comunidade.onebitcode.com/c/curso/sections/360097/lessons/1336827'
    },
    'Preparando seu setup': {
      start: 'https://comunidade.onebitcode.com/c/curso/sections/360106/lessons/1337091',
      end: 'https://comunidade.onebitcode.com/c/curso/sections/360106/lessons/1337101'
    },
    'HTML 5': {
      start: 'https://comunidade.onebitcode.com/c/curso/sections/360099/lessons/1336851',
      end: 'https://comunidade.onebitcode.com/c/curso/sections/360099/lessons/1374418'
    },
    'CSS 3': {
      start: 'https://comunidade.onebitcode.com/c/curso/sections/360096/lessons/1336794',
      end: 'https://comunidade.onebitcode.com/c/curso/sections/360096/lessons/1374468'
    },
    'JavaScript I': {
      start: 'https://comunidade.onebitcode.com/c/curso/sections/360100/lessons/1336894',
      end: 'https://comunidade.onebitcode.com/c/curso/sections/360100/lessons/1336925'

    },
    'JavaScript II': {
      start: 'https://comunidade.onebitcode.com/c/curso/sections/360101/lessons/1336927',
      end: 'https://comunidade.onebitcode.com/c/curso/sections/360101/lessons/1336956'
    },
    'JavaScript III': {
      start: 'https://comunidade.onebitcode.com/c/curso/sections/360102/lessons/1336958',
      end: 'https://comunidade.onebitcode.com/c/curso/sections/360102/lessons/1336986'
    },
    'JavaScript IV': {
      start: 'https://comunidade.onebitcode.com/c/curso/sections/360103/lessons/1336988',
      end: 'https://comunidade.onebitcode.com/c/curso/sections/360103/lessons/1337027'
    },
    'JavaScript V': {
      start: 'https://comunidade.onebitcode.com/c/curso/sections/360104/lessons/1337029',
      end: 'https://comunidade.onebitcode.com/c/curso/sections/360104/lessons/1337057'
    },
    'JavaScript VI': {
      start: 'https://comunidade.onebitcode.com/c/curso/sections/360105/lessons/1337059',
      end: 'https://comunidade.onebitcode.com/c/curso/sections/360105/lessons/1337089'
    },
    'Typescript': {
      start: 'https://comunidade.onebitcode.com/c/curso/sections/360108/lessons/1337102',
      end: 'https://comunidade.onebitcode.com/c/curso/sections/360108/lessons/1337133'

    },
    'Git e Github': {
      start: 'https://comunidade.onebitcode.com/c/curso/sections/360098/lessons/1336828',
      end: 'https://comunidade.onebitcode.com/c/curso/sections/360098/lessons/1336850'
    }
  },
  'Trilha Backend': {
    'Introdução ao NodeJS': {
      start: 'https://comunidade.onebitcode.com/c/curso-backend-javascript/sections/360127/lessons/1337355',
      end: 'https://comunidade.onebitcode.com/c/curso-backend-javascript/sections/360127/lessons/1337375'
    },
    'Aplicações Web com NodeJs': {
      start: 'https://comunidade.onebitcode.com/c/curso-backend-javascript/sections/360124/lessons/1337285',
      end: 'https://comunidade.onebitcode.com/c/curso-backend-javascript/sections/360124/lessons/1337325'
    },
    'Banco de Dados SQL': {
      start: 'https://comunidade.onebitcode.com/c/curso-backend-javascript/sections/360126/lessons/1337326',
      end: 'https://comunidade.onebitcode.com/c/curso-backend-javascript/sections/360126/lessons/1337354'
    },
    'SQL no Node e PrismaORM': {
      start: 'https://comunidade.onebitcode.com/c/curso-backend-javascript/sections/360128/lessons/1337376',
      end: 'https://comunidade.onebitcode.com/c/curso-backend-javascript/sections/360128/lessons/1337425'
    }
  },
  'Trilha Frontend': {
    'CSS Moderno': {
      start: 'https://comunidade.onebitcode.com/c/curso-frontend/sections/360114/lessons/1337177',
      end: 'https://comunidade.onebitcode.com/c/curso-frontend/sections/360114/lessons/1337203'
    },

    'Saas': {
      start: 'https://comunidade.onebitcode.com/c/curso-frontend/sections/360119/lessons/1337269',
      end: 'https://comunidade.onebitcode.com/c/curso-frontend/sections/360119/lessons/1337283'
    },
    'Bootstrap': {
      start: 'https://comunidade.onebitcode.com/c/curso-frontend/sections/360112/lessons/1337150',
      end: 'https://comunidade.onebitcode.com/c/curso-frontend/sections/360112/lessons/1337176'
    },
    'Fundamentos do React': {
      start: 'https://comunidade.onebitcode.com/c/curso-frontend/sections/360116/lessons/1337204',
      end: 'https://comunidade.onebitcode.com/c/curso-frontend/sections/360116/lessons/1337255'
    },
    'Next.js': {
      start: 'https://comunidade.onebitcode.com/c/curso-frontend/sections/360117/lessons/1337256',
      end: 'https://comunidade.onebitcode.com/c/curso-frontend/sections/360117/lessons/1337268'
    }
  }
}


// Função para perguntar algo ao usuário usando readline
function perguntar(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function escolherModulo() {
  const trilhasDisponiveis = Object.keys(trilhas);
  console.log('Trilhas disponíveis: ', trilhasDisponiveis.join(', '));

  // Pergunta ao usuário para escolher uma trilha
  const trilhaEscolhida = await perguntar('Escolha uma trilha: ');
  const trilhaSelecionada = trilhas[trilhaEscolhida];

  if (!trilhaSelecionada) {
    console.log(`Erro: A trilha "${trilhaEscolhida}" não foi encontrada.`);
    return escolherModulo();
  }

  const modulosDisponiveis = Object.keys(trilhaSelecionada);
  console.log('Módulos disponíveis: ', modulosDisponiveis.join(', '));

  // Pergunta ao usuário para escolher um módulo
  const moduloEscolhido = await perguntar('Escolha um módulo: ');
  const modulo = trilhaSelecionada[moduloEscolhido];

  if (!modulo) {
    console.log(`Erro: O módulo "${moduloEscolhido}" não foi encontrado.`);
    return escolherModulo();
  }

  console.log(`Iniciando automação para o módulo: ${moduloEscolhido}...`);
  await iniciar(modulo.start, modulo.end);

  const outroModulo = await perguntar('Deseja escolher outro módulo? (s/n) ');
  if (outroModulo.toLowerCase() === 's') {
    await escolherModulo();
  } else {
    console.log('Encerrando a aplicação.');
    rl.close();
  }
}



async function iniciar(urlStart, urlEnd) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Acessa o site e faz login
  await page.goto('https://comunidade.onebitcode.com/users/sign_in?post_login_redirect=https%3A%2F%2Fcomunidade.onebitcode.com%2Ffeed#email');
  await page.type('#user_email', process.env.EMAIL);
  await page.type('#user_password', process.env.SENHA);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  await page.goto(urlStart);
  let continuar = true;

  while (continuar) {
    try {
      await page.waitForSelector('button[type="submit"]', { timeout: 10000 });
      await page.click('button[type="submit"]');
      console.log('Aula concluída!');

      if (page.url() === urlEnd) {
        console.log('Última aula concluída!');
        continuar = false;
      } else {
        await page.waitForNavigation({ timeout: 10000 });
      }
    } catch (error) {
      console.log('Erro ao concluir aula. Recarregando a página...');
      try {
        await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
        console.log('Página recarregada. Tentando novamente...');
      } catch (reloadError) {
        console.log('Erro ao recarregar a página.');
        continuar = false;
      }
    }
  }

  await browser.close();
}

console.log('iniciando script')

escolherModulo().catch(error => {
  console.error('Erro ao executar a automação:', error);
  rl.close();
});
