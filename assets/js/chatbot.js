/* ===================== LEAD UP — ASSISTENTE VIRTUAL ===================== */
(function () {
  'use strict';

  var CHAT_DATA = {
    greeting: "Olá! 👋 Eu sou o assistente virtual da <strong>Lead Up</strong>. Posso te ajudar com informações sobre nossa empresa, pacotes, preços, como funciona a consultoria e muito mais. Escolha um tema abaixo ou digite sua pergunta:",
    fallback: "Hmm, não tenho certeza se entendi 🤔. Você pode escolher um dos temas abaixo, tentar reformular a pergunta, ou falar direto com a nossa equipe pelo WhatsApp.",
    greetingsKw: ["oi", "ola", "olá", "bom dia", "boa tarde", "boa noite", "ei", "hey", "hello", "alo", "alô"],
    categories: [
      {
        id: 'sobre',
        label: 'Sobre a Lead Up',
        icon: 'bi-building',
        items: [
          { q: 'O que é a Lead Up?', a: 'A Lead Up é uma consultoria de marketing especializada em pequenas e médias empresas. Analisamos seus processos, criamos estratégias sob medida e treinamos sua equipe — para que sua empresa assuma o controle do próprio crescimento, sem depender de terceiros.', kw: ['o que é a lead up', 'quem é a lead up', 'sobre a lead up', 'quem somos', 'o que é a empresa'] },
          { q: 'Qual é a missão da Lead Up?', a: 'Nossa missão é ajudar empresas a melhorar seus resultados por meio de estratégias de marketing e capacitação de equipes.', kw: ['missão', 'missao', 'qual a missão'] },
          { q: 'Qual é a visão da Lead Up?', a: 'Nossa visão é ser referência em consultoria e treinamento em marketing para pequenas e médias empresas da região.', kw: ['visão', 'visao', 'qual a visão'] },
          { q: 'Quais são os valores da Lead Up?', a: 'Nossos valores são: Ética e Transparência, Foco em Resultados, Inovação, Comprometimento com o Cliente e Trabalho em Equipe.', kw: ['valores', 'quais valores', 'princípios', 'principios'] },
          { q: 'Quem faz parte da equipe da Lead Up?', a: 'Nossa equipe é formada por: Ana Júlia Moreira (Marketing), Isabella Souza (Financeiro), Sara Cristina (Operacional), Arthur Santos (Administrativo), Aryadne Marreiro (Gestão de Pessoas) e Giovana Alves (Comercial e Vendas).', kw: ['equipe', 'quem trabalha', 'time', 'funcionários', 'funcionarios', 'líderes', 'lideres', 'colaboradores'] },
          { q: 'Para que tipo de empresa a Lead Up trabalha?', a: 'Atendemos empresas de pequeno a médio porte, de qualquer segmento — lojas, comércios, prestadores de serviço e negócios em crescimento que desejam estruturar ou melhorar seu marketing.', kw: ['tipo de empresa', 'que empresas', 'segmento', 'porte', 'pme', 'pequenas empresas', 'quem vocês atendem', 'quem voces atendem'] },
          { q: 'A Lead Up se preocupa com sustentabilidade?', a: 'Sim! Temos baixo impacto ambiental: processos 100% digitais, reuniões online para reduzir deslocamentos, redução de desperdícios e uso consciente de recursos — sem comprometer a qualidade dos serviços.', kw: ['sustentabilidade', 'ambiental', 'meio ambiente', 'sustentável', 'sustentavel'] },
          { q: 'Qual é o lema da Lead Up?', a: '"Quem domina o Marketing, domina o Crescimento." Essa frase resume nossa essência: acreditamos que a falta de estratégia é o principal problema das empresas, e que consultoria + treinamento geram melhoria contínua e autonomia.', kw: ['lema', 'frase', 'slogan', 'frase de efeito', 'domina o marketing'] }
        ]
      },
      {
        id: 'pacotes',
        label: 'Pacotes e Preços',
        icon: 'bi-tags-fill',
        items: [
          { q: 'Quais pacotes a Lead Up oferece?', a: 'Temos 3 pacotes:<br>• <strong>Consultoria</strong> — R$ 3.000<br>• <strong>Treinamento</strong> — R$ 2.500<br>• <strong>Consultoria + Treinamento</strong> — R$ 5.000', kw: ['quais pacotes', 'pacotes oferecidos', 'todos os pacotes', 'lista de pacotes', 'planos'] },
          { q: 'O que é a Consultoria e quanto custa?', a: 'A Consultoria custa R$ 3.000. Inclui diagnóstico da empresa, criação de estratégias de marketing e orientação com acompanhamento.', kw: ['consultoria', '3000', '3.000'] },
          { q: 'O que é o Treinamento e quanto custa?', a: 'O Treinamento custa R$ 2.500. Inclui capacitação da equipe, atividades práticas e avaliação do aprendizado.', kw: ['treinamento de equipe', 'treinamento', '2500', '2.500'] },
          { q: 'O que inclui o pacote Consultoria + Treinamento (R$ 5.000)?', a: 'É o nosso pacote <strong>"Mais completo"</strong>: R$ 5.000. Integra teoria e prática, com acompanhamento dos resultados, métricas e feedback, diagnóstico e estratégia de marketing e treinamento da equipe.', kw: ['consultoria + treinamento', 'consultoria e treinamento', '5000', '5.000', 'mais completo', 'consultoria mais treinamento', 'pacote completo'] },
          { q: 'Qual pacote é mais indicado para quem está começando?', a: 'Se você precisa de direção, a Consultoria (R$ 3.000) mostra onde estão as oportunidades e cria a estratégia. Se sua equipe já sabe o que fazer mas precisa aprender a executar, o Treinamento (R$ 2.500) é o ideal. E para ter os dois juntos, o pacote Consultoria + Treinamento (R$ 5.000).', kw: ['pacote indicado', 'recomendado', 'começando', 'comecando', 'iniciante', 'qual escolher', 'melhor pacote', 'primeiro pacote'] },
          { q: 'Quanto custam os pacotes da Lead Up?', a: 'Resumo de preços:<br>• Consultoria — R$ 3.000<br>• Treinamento — R$ 2.500<br>• Consultoria + Treinamento — R$ 5.000', kw: ['preço', 'preco', 'preços', 'precos', 'quanto custa', 'valores dos pacotes', 'tabela de preços', 'investimento'] },
          { q: 'Como funciona o pagamento? Tem parcelamento?', a: 'Para saber sobre formas de pagamento e condições especiais, fale com nossa equipe pelo WhatsApp ou pelo formulário de contato.', kw: ['pagamento', 'parcelamento', 'parcelar', 'desconto', 'forma de pagamento', 'à vista', 'a vista', 'avista'] }
        ]
      },
      {
        id: 'funciona',
        label: 'Como Funciona',
        icon: 'bi-gear-fill',
        items: [
          { q: 'Como funciona a consultoria na prática?', a: 'Depende do pacote! No Treinamento (R$ 2.500), por exemplo, em 4 semanas fazemos diagnóstico rápido, workshops práticos e uma simulação real com a equipe. Já no pacote Consultoria + Treinamento (R$ 5.000), passamos por diagnóstico, estratégia, treinamento da equipe e acompanhamento dos resultados.', kw: ['como funciona', 'na prática', 'na pratica', 'exemplo de como funciona'] },
          { q: 'Qual é o processo de trabalho da Lead Up?', a: 'Nosso processo tem 5 etapas: 1) <strong>Diagnóstico</strong> — entendemos profundamente o cliente e seus desafios; 2) <strong>Análise</strong> — mapeamos oportunidades e pontos críticos; 3) <strong>Estratégia</strong> — criamos um plano personalizado; 4) <strong>Treinamento</strong> — capacitamos a equipe com workshops práticos; 5) <strong>Resultados</strong> — acompanhamos métricas e ajustamos continuamente.', kw: ['processo de trabalho', 'como trabalham', 'etapas do processo', 'passo a passo'] },
          { q: 'Quanto tempo dura o pacote Consultoria + Treinamento?', a: 'O pacote Consultoria + Treinamento dura cerca de 4 meses (16 semanas), seguindo o cronograma: Semanas 1-2 Diagnóstico, 3-4 Planejamento Estratégico, 5-8 Treinamento de Equipe, 9-14 Acompanhamento e Consultoria, e 15-16 Métricas e Resultados.', kw: ['quanto tempo dura', 'duração', 'duracao', 'prazo do pacote', 'tempo do pacote'] },
          { q: 'Qual o cronograma do pacote Consultoria + Treinamento?', a: 'Cronograma do pacote Consultoria + Treinamento (≈ 4 meses):<br>• Semanas 1-2 — Diagnóstico<br>• Semanas 3-4 — Planejamento Estratégico<br>• Semanas 5-8 — Treinamento de Equipe<br>• Semanas 9-14 — Acompanhamento e Consultoria<br>• Semanas 15-16 — Métricas e Resultados<br><br>Os pacotes de Consultoria ou Treinamento seguem uma versão reduzida, focada apenas nas etapas contratadas.', kw: ['cronograma', 'linha do tempo', 'semanas'] },
          { q: 'O treinamento é presencial ou online?', a: 'Oferecemos as duas modalidades! Os workshops podem ser realizados presencialmente, nas instalações da sua empresa, ou de forma remota — conforme a preferência do contratante.', kw: ['presencial', 'online', 'remoto', 'modalidade do treinamento', 'treinamento online', 'treinamento presencial'] },
          { q: 'A empresa precisa ter equipe de marketing para contratar a Lead Up?', a: 'Não. Trabalhamos tanto com empresas que ainda não têm equipe de marketing quanto com aquelas que precisam capacitar a equipe existente — o treinamento é adaptado ao nível atual de cada time.', kw: ['precisa ter equipe', 'equipe de marketing', 'sem equipe', 'time de marketing'] },
          { q: 'Os pacotes de Consultoria ou Treinamento também têm 16 semanas de cronograma?', a: 'Não necessariamente — os pacotes de Consultoria ou Treinamento seguem uma versão reduzida do cronograma, com foco apenas nas etapas que foram contratadas.', kw: ['pacotes individuais cronograma', 'versão reduzida', 'versao reduzida', 'reduzido', 'cronograma menor'] }
        ]
      },
      {
        id: 'diferenciais',
        label: 'Diferenciais',
        icon: 'bi-star-fill',
        items: [
          { q: 'Qual o diferencial da Lead Up?', a: 'Quatro pontos nos diferenciam:<br>1) <strong>Consultoria + Treinamento</strong> — não apenas orientamos, executamos junto com sua equipe;<br>2) <strong>Soluções Personalizadas</strong> — cada cliente tem um plano único;<br>3) <strong>Workshops e Simulações</strong> — treinamentos práticos com recursos reais;<br>4) <strong>Marketing 5.0</strong> — ferramentas digitais modernas com toque humano.', kw: ['diferencial', 'diferença', 'diferenca', 'por que escolher', 'vantagem', 'por que a lead up'] },
          { q: 'O que significa "Marketing 5.0"?', a: 'É a era do marketing que combina IA, automação e personalização em escala, com experiências hiper-personalizadas e toque humano. A Lead Up usa essas ferramentas modernas — unindo tecnologia e dados com a conexão humana, preparando empresas para a "Era do Futuro" do marketing.', kw: ['marketing 5.0', 'marketing 5', 'era da tecnologia', 'marketing 7.0', 'evolução do marketing', 'evolucao do marketing'] },
          { q: 'A Lead Up trabalha dentro da empresa do cliente?', a: 'Sim! Integramos consultoria estratégica e treinamento prático com soluções personalizadas, atuando dentro da própria empresa do cliente, lado a lado com a equipe — para garantir que o conhecimento fique internalizado.', kw: ['dentro da empresa', 'no local', 'in loco', 'junto com a equipe', 'trabalham na empresa'] }
        ]
      },
      {
        id: 'contato',
        label: 'Contato',
        icon: 'bi-envelope-fill',
        items: [
          { q: 'Como entro em contato com a Lead Up?', a: 'Você pode falar com a gente pelo formulário na página "Contato", pelo WhatsApp ou pelo e-mail leadupservices@gmail.com. Preenchendo o formulário, você recebe uma proposta personalizada em até 24h.', kw: ['como entro em contato', 'falar com a equipe', 'atendimento', 'como falo com vocês', 'como falo com voces'] },
          { q: 'Qual o e-mail da Lead Up?', a: 'Nosso e-mail é leadupservices@gmail.com', kw: ['e-mail', 'email', 'qual o email', 'qual o e-mail'] },
          { q: 'Qual o telefone ou WhatsApp da Lead Up?', a: 'Nosso telefone/WhatsApp é (11) 9 4155-3416. Você pode clicar no botão verde de WhatsApp no canto da tela para falar com a gente agora mesmo!', kw: ['telefone', 'whatsapp', 'número', 'numero', 'celular', 'contato whatsapp'] },
          { q: 'Em quanto tempo recebo uma resposta?', a: 'Em até 24 horas após o envio do formulário de contato, nossa equipe te responde com uma proposta personalizada.', kw: ['tempo de resposta', 'prazo de resposta', '24h', '24 horas', 'quando vão responder', 'quando vao responder'] },
          { q: 'Como peço um orçamento ou proposta personalizada?', a: 'É simples: preencha o formulário na página "Contato" com seus dados e o principal desafio de marketing da sua empresa, ou fale direto pelo WhatsApp. Nossa equipe te envia uma proposta personalizada em até 24h.', kw: ['orçamento', 'orcamento', 'proposta', 'cotação', 'cotacao', 'proposta personalizada'] }
        ]
      },
      {
        id: 'conversa',
        label: 'Conversa',
        icon: 'bi-chat-heart-fill',
        items: [
          { q: 'Quem é você?', a: 'Eu sou o assistente virtual da Lead Up! 🤖 Estou aqui para responder suas dúvidas sobre nossos pacotes, preços, processos e muito mais. Se eu não souber algo, posso te direcionar para a nossa equipe humana.', kw: ['quem é você', 'quem e voce', 'você é um robô', 'voce e um robo', 'é um bot', 'e um bot', 'assistente'] },
          { q: 'Obrigado!', a: 'De nada! 😊 Fico feliz em ajudar. Se tiver mais alguma dúvida, é só perguntar — ou escolher outro tema no menu abaixo.', kw: ['obrigado', 'obrigada', 'valeu', 'agradeço', 'agradeco'] },
          { q: 'Tchau', a: 'Até logo! 👋 Se precisar, é só clicar no botão do assistente de novo. E lembre-se: nossa equipe também está disponível pelo WhatsApp e pela página de Contato.', kw: ['tchau', 'até logo', 'ate logo', 'adeus', 'falou'] }
        ]
      }
    ]
  };

  function normalize(s) {
    return (s || '').toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  }

  function flattenItems() {
    var all = [];
    CHAT_DATA.categories.forEach(function (cat) {
      cat.items.forEach(function (item) { all.push(item); });
    });
    return all;
  }

  function findBestAnswer(text) {
    var norm = normalize(text);
    if (!norm) return null;

    var isGreeting = CHAT_DATA.greetingsKw.some(function (g) {
      var ng = normalize(g);
      return norm === ng || norm.indexOf(ng + ' ') === 0;
    });
    if (isGreeting) return { a: CHAT_DATA.greeting, isGreeting: true };

    var best = null, bestScore = 0;
    flattenItems().forEach(function (item) {
      var score = 0;
      item.kw.forEach(function (k) {
        var nk = normalize(k);
        if (nk && norm.indexOf(nk) !== -1) score += nk.length;
      });
      if (score > bestScore) { bestScore = score; best = item; }
    });
    return (best && bestScore >= 3) ? best : null;
  }

  /* ===================== WIDGET ===================== */
  var started = false;

  function injectWidget() {
    var html =
      '<div class="chatbot" id="leadupChatbot">' +
        '<button class="chatbot-toggle" id="chatbotToggle" title="Assistente virtual" aria-label="Abrir assistente virtual">' +
          '<i class="bi bi-chat-dots-fill icon-chat"></i>' +
          '<i class="bi bi-x-lg icon-close"></i>' +
          '<span class="chatbot-badge" id="chatbotBadge">1</span>' +
        '</button>' +
      '</div>' +
      '<div class="chatbot-window" id="chatbotWindow" role="dialog" aria-label="Assistente virtual Lead Up">' +
        '<div class="chatbot-header">' +
          '<div class="chatbot-header-info">' +
            '<div class="chatbot-avatar"><i class="bi bi-robot"></i></div>' +
            '<div><h3>Assistente Lead Up</h3><span class="chatbot-status"><i class="bi bi-circle-fill"></i> Online</span></div>' +
          '</div>' +
          '<button class="chatbot-close" id="chatbotClose" aria-label="Fechar"><i class="bi bi-x-lg"></i></button>' +
        '</div>' +
        '<div class="chatbot-messages" id="chatbotMessages"></div>' +
        '<div class="chatbot-quick" id="chatbotQuick"></div>' +
        '<form class="chatbot-input-row" id="chatbotForm">' +
          '<input type="text" id="chatbotInput" placeholder="Digite sua pergunta..." autocomplete="off" />' +
          '<button type="submit" class="chatbot-send" aria-label="Enviar"><i class="bi bi-send-fill"></i></button>' +
        '</form>' +
      '</div>';
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function scrollToBottom() {
    var msgs = document.getElementById('chatbotMessages');
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addBotMessage(html) {
    var msgs = document.getElementById('chatbotMessages');
    var div = document.createElement('div');
    div.className = 'chatbot-msg bot';
    div.innerHTML = html;
    msgs.appendChild(div);
    scrollToBottom();
  }

  function addUserMessage(text) {
    var msgs = document.getElementById('chatbotMessages');
    var div = document.createElement('div');
    div.className = 'chatbot-msg user';
    div.textContent = text;
    msgs.appendChild(div);
    scrollToBottom();
  }

  function showTyping(callback) {
    var msgs = document.getElementById('chatbotMessages');
    var div = document.createElement('div');
    div.className = 'chatbot-msg bot chatbot-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
    scrollToBottom();
    setTimeout(function () {
      div.remove();
      callback();
    }, 450 + Math.random() * 350);
  }

  function renderMenu() {
    var quick = document.getElementById('chatbotQuick');
    quick.innerHTML = '';
    CHAT_DATA.categories.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.className = 'chatbot-chip chatbot-chip-cat';
      btn.innerHTML = '<i class="bi ' + cat.icon + '"></i> ' + cat.label;
      btn.addEventListener('click', function () { openCategory(cat); });
      quick.appendChild(btn);
    });
  }

  function openCategory(cat) {
    addUserMessage(cat.label);
    showTyping(function () {
      addBotMessage('Aqui estão algumas perguntas sobre <strong>' + cat.label + '</strong>:');
      renderCategoryQuestions(cat);
    });
  }

  function renderCategoryQuestions(cat) {
    var quick = document.getElementById('chatbotQuick');
    quick.innerHTML = '';
    cat.items.forEach(function (item) {
      var btn = document.createElement('button');
      btn.className = 'chatbot-chip';
      btn.textContent = item.q;
      btn.addEventListener('click', function () { askQuestion(item, cat); });
      quick.appendChild(btn);
    });
    var back = document.createElement('button');
    back.className = 'chatbot-chip chatbot-chip-back';
    back.innerHTML = '<i class="bi bi-arrow-left"></i> Menu principal';
    back.addEventListener('click', function () {
      addUserMessage('Menu principal');
      showTyping(function () {
        addBotMessage('Claro! Escolha um tema:');
        renderMenu();
      });
    });
    quick.appendChild(back);
  }

  function askQuestion(item, cat) {
    addUserMessage(item.q);
    showTyping(function () {
      addBotMessage(item.a);
      renderCategoryQuestions(cat);
    });
  }

  function handleUserInput(text) {
    text = text.trim();
    if (!text) return;
    addUserMessage(text);
    document.getElementById('chatbotInput').value = '';
    showTyping(function () {
      var match = findBestAnswer(text);
      addBotMessage(match ? match.a : CHAT_DATA.fallback);
      renderMenu();
    });
  }

  function openChat() {
    document.getElementById('leadupChatbot').classList.add('open');
    document.getElementById('chatbotWindow').classList.add('open');
    document.getElementById('chatbotBadge').style.display = 'none';
    sessionStorage.setItem('leadup-chat-opened', '1');
    if (!started) {
      started = true;
      showTyping(function () {
        addBotMessage(CHAT_DATA.greeting);
        renderMenu();
      });
    }
    document.getElementById('chatbotInput').focus();
  }

  function closeChat() {
    document.getElementById('leadupChatbot').classList.remove('open');
    document.getElementById('chatbotWindow').classList.remove('open');
  }

  function init() {
    injectWidget();
    if (sessionStorage.getItem('leadup-chat-opened')) {
      document.getElementById('chatbotBadge').style.display = 'none';
    }
    document.getElementById('chatbotToggle').addEventListener('click', function () {
      var el = document.getElementById('leadupChatbot');
      if (el.classList.contains('open')) { closeChat(); } else { openChat(); }
    });
    document.getElementById('chatbotClose').addEventListener('click', closeChat);
    document.getElementById('chatbotForm').addEventListener('submit', function (e) {
      e.preventDefault();
      handleUserInput(document.getElementById('chatbotInput').value);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
