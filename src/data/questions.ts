import type { Question } from "@/types"

export const questions: Question[] = [
  {
    id: 1,
    topic: "prioridade",
    question: "Quem tem prioridade num cruzamento sem sinalização?",
    answer: "Quem vem da direita.",
  },
  {
    id: 2,
    topic: "prioridade",
    question: "Quem tem prioridade numa rotunda?",
    answer: "Quem já está dentro da rotunda.",
  },
  {
    id: 3,
    topic: "prioridade",
    question: "O que fazer perante um sinal de cedência de passagem?",
    answer: "Abrandar ou parar, cedendo passagem à via prioritária.",
  },
  {
    id: 4,
    topic: "prioridade",
    question: "Quem tem prioridade num entroncamento sem sinalização?",
    answer: "Quem circula na via principal.",
  },
  {
    id: 5,
    topic: "prioridade",
    question: "Uma ambulância com sirene tem sempre prioridade?",
    answer: "Sim, sempre.",
  },
  {
    id: 6,
    topic: "prioridade",
    question: "O que é um entroncamento?",
    answer: "Uma via que termina ao encontrar outra via principal.",
  },
  {
    id: 7,
    topic: "prioridade",
    question: "A prioridade à direita aplica-se sempre?",
    answer: "Só quando não há sinalização que diga o contrário.",
  },
  {
    id: 8,
    topic: "prioridade",
    question: "Um sinal de STOP obriga a quê?",
    answer: "A parar totalmente antes de prosseguir, mesmo sem trânsito.",
  },
  {
    id: 9,
    topic: "prioridade",
    question:
      "O que prevalece: sinalização ou regra geral de prioridade à direita?",
    answer: "A sinalização.",
  },
  {
    id: 10,
    topic: "prioridade",
    question: "Um veículo já dentro da rotunda deve ceder a quem quer entrar?",
    answer: "Não, tem sempre prioridade.",
  },

  // ── Sinalização Rodoviária ────────────────────────────────
  {
    id: 11,
    topic: "sinalizacao",
    question: "Que forma têm os sinais de perigo?",
    answer: "Triangular.",
  },
  {
    id: 12,
    topic: "sinalizacao",
    question: "Que forma têm os sinais de proibição?",
    answer: "Circular com borda vermelha.",
  },
  {
    id: 13,
    topic: "sinalizacao",
    question: "Que cor têm os sinais de obrigação?",
    answer: "Azul.",
  },
  {
    id: 14,
    topic: "sinalizacao",
    question: "O que significa uma linha contínua no chão?",
    answer: "Proibido ultrapassar ou mudar de faixa.",
  },
  {
    id: 15,
    topic: "sinalizacao",
    question: "O que significa uma linha descontínua?",
    answer: "Permite ultrapassar, se for seguro.",
  },
  {
    id: 16,
    topic: "sinalizacao",
    question: "O que é uma zebra no pavimento?",
    answer: "Uma passadeira para peões.",
  },
  {
    id: 17,
    topic: "sinalizacao",
    question: "Os sinais de indicação são obrigatórios de cumprir?",
    answer: "São informativos, não impõem obrigação direta.",
  },
  {
    id: 18,
    topic: "sinalizacao",
    question: "Como identificar um sinal de proibição rapidamente?",
    answer: "Pela cor vermelha e forma circular.",
  },
  {
    id: 19,
    topic: "sinalizacao",
    question: 'Um sinal triangular com um "!" o que indica?',
    answer: "Perigo genérico não especificado noutro sinal.",
  },
  {
    id: 20,
    topic: "sinalizacao",
    question: "Uma linha dupla contínua e descontínua, quem pode ultrapassar?",
    answer: "Só quem tem a linha descontínua do seu lado.",
  },

  // ── Ultrapassagem ─────────────────────────────────────────
  {
    id: 21,
    topic: "ultrapassagem",
    question: "É permitido ultrapassar numa curva sem visibilidade?",
    answer: "Não.",
  },
  {
    id: 22,
    topic: "ultrapassagem",
    question: "É permitido ultrapassar numa passagem de nível?",
    answer: "Não.",
  },
  {
    id: 23,
    topic: "ultrapassagem",
    question: "O que se deve fazer antes de ultrapassar?",
    answer:
      "Verificar espelhos, sinalizar com o pisca e confirmar espaço seguro.",
  },
  {
    id: 24,
    topic: "ultrapassagem",
    question:
      "Qual a distância lateral recomendada ao ultrapassar uma bicicleta?",
    answer: "Pelo menos 1,5 metros.",
  },
  {
    id: 25,
    topic: "ultrapassagem",
    question: "É permitido ultrapassar em cima de uma linha contínua?",
    answer: "Não.",
  },
  {
    id: 26,
    topic: "ultrapassagem",
    question: "O que fazer se não houver espaço seguro para ultrapassar?",
    answer: "Não ultrapassar e esperar melhor oportunidade.",
  },
  {
    id: 27,
    topic: "ultrapassagem",
    question: "Pode-se ultrapassar perto de uma passadeira com peões?",
    answer: "Não.",
  },
  {
    id: 28,
    topic: "ultrapassagem",
    question: "Depois de ultrapassar, o que se deve fazer?",
    answer: "Regressar à faixa com distância segura do veículo ultrapassado.",
  },
  {
    id: 29,
    topic: "ultrapassagem",
    question: "Ultrapassar numa lomba sem visibilidade é permitido?",
    answer: "Não.",
  },
  {
    id: 30,
    topic: "ultrapassagem",
    question: "O pisca deve ser usado ao ultrapassar?",
    answer: "Sim, sempre, antes e depois da manobra.",
  },

  // ── Paragem e Estacionamento ──────────────────────────────
  {
    id: 31,
    topic: "paragem-estacionamento",
    question: "Qual a diferença entre parar e estacionar?",
    answer:
      "Parar é temporário, o condutor fica pronto para seguir; estacionar é prolongado, podendo o condutor ausentar-se.",
  },
  {
    id: 32,
    topic: "paragem-estacionamento",
    question: "É permitido estacionar a menos de 5 metros de uma passadeira?",
    answer: "Não.",
  },
  {
    id: 33,
    topic: "paragem-estacionamento",
    question: "É permitido parar em cima de uma linha contínua?",
    answer: "Não.",
  },
  {
    id: 34,
    topic: "paragem-estacionamento",
    question: "É permitido estacionar num cruzamento?",
    answer: "Não.",
  },
  {
    id: 35,
    topic: "paragem-estacionamento",
    question: "É permitido parar numa passagem de nível?",
    answer: "Não.",
  },
  {
    id: 36,
    topic: "paragem-estacionamento",
    question:
      "O que fazer se precisar de parar rapidamente para deixar sair um passageiro?",
    answer: "Escolher local seguro e permitido, o mais rápido possível.",
  },
  {
    id: 37,
    topic: "paragem-estacionamento",
    question: "É permitido estacionar em frente a uma garagem?",
    answer: "Não.",
  },
  {
    id: 38,
    topic: "paragem-estacionamento",
    question:
      "É permitido estacionar em vias reservadas a transportes públicos?",
    answer: "Não.",
  },
  {
    id: 39,
    topic: "paragem-estacionamento",
    question: "Estacionar numa rotunda é permitido?",
    answer: "Não.",
  },
  {
    id: 40,
    topic: "paragem-estacionamento",
    question: "Parar em segunda fila é sempre proibido?",
    answer: "Sim, salvo situações muito específicas e por tempo mínimo.",
  },

  // ── Limites de Velocidade ─────────────────────────────────
  {
    id: 41,
    topic: "velocidade",
    question: "Qual o limite geral dentro das localidades?",
    answer: "50 km/h.",
  },
  {
    id: 42,
    topic: "velocidade",
    question: "O limite fora das localidades é sempre o mesmo?",
    answer: "Não, varia consoante o tipo de via.",
  },
  {
    id: 43,
    topic: "velocidade",
    question: "Deve-se circular sempre à velocidade máxima permitida?",
    answer: "Não, deve adaptar-se às condições reais.",
  },
  {
    id: 44,
    topic: "velocidade",
    question: "O que fazer com chuva forte em relação à velocidade?",
    answer: "Reduzir a velocidade.",
  },
  {
    id: 45,
    topic: "velocidade",
    question: "Perto de escolas, deve-se reduzir a velocidade mesmo sem sinal?",
    answer: "Sim, se houver movimento de crianças.",
  },
  {
    id: 46,
    topic: "velocidade",
    question: "O limite de velocidade pode ser alterado por sinalização local?",
    answer: "Sim.",
  },
  {
    id: 47,
    topic: "velocidade",
    question: "É correto ultrapassar o limite em caso de pressa?",
    answer: "Não, nunca.",
  },
  {
    id: 48,
    topic: "velocidade",
    question: "A velocidade deve ser adaptada em pavimento molhado?",
    answer: "Sim, sempre.",
  },
  {
    id: 49,
    topic: "velocidade",
    question: "Existe limite mínimo de velocidade em certas vias?",
    answer: "Sim, em autoestradas pode existir um limite mínimo.",
  },
  {
    id: 50,
    topic: "velocidade",
    question: "Velocidade excessiva é uma das principais causas de acidentes?",
    answer: "Sim.",
  },

  // ── Segurança na Condução ─────────────────────────────────
  {
    id: 51,
    topic: "seguranca",
    question: "O cinto de segurança é obrigatório para todos os passageiros?",
    answer: "Sim.",
  },
  {
    id: 52,
    topic: "seguranca",
    question: "Crianças pequenas podem viajar sem cadeirinha?",
    answer: "Não, devem usar sistema de retenção adequado.",
  },
  {
    id: 53,
    topic: "seguranca",
    question: "O que é distância de segurança?",
    answer:
      "O espaço necessário para travar sem colidir com o veículo da frente.",
  },
  {
    id: 54,
    topic: "seguranca",
    question: "Deve-se aumentar a distância de segurança com chuva?",
    answer: "Sim.",
  },
  {
    id: 55,
    topic: "seguranca",
    question: "O que é condução defensiva?",
    answer:
      "Antecipar riscos e comportamentos de outros para evitar acidentes.",
  },
  {
    id: 56,
    topic: "seguranca",
    question: "O cinto deve ser usado em trajetos curtos?",
    answer: "Sim, sempre.",
  },
  {
    id: 57,
    topic: "seguranca",
    question: "A distância de segurança depende da velocidade?",
    answer: "Sim, quanto maior a velocidade, maior a distância necessária.",
  },
  {
    id: 58,
    topic: "seguranca",
    question:
      "É seguro seguir muito perto do carro da frente numa autoestrada?",
    answer: "Não.",
  },
  {
    id: 59,
    topic: "seguranca",
    question: "Condução defensiva evita todos os acidentes?",
    answer: "Não, mas reduz significativamente o risco.",
  },
  {
    id: 60,
    topic: "seguranca",
    question: "O cinto de segurança deve ser ajustado corretamente?",
    answer: "Sim, sem folgas excessivas.",
  },

  // ── Comportamento do Condutor ─────────────────────────────
  {
    id: 61,
    topic: "comportamento",
    question: "Os peões têm prioridade nas passadeiras?",
    answer: "Sim.",
  },
  {
    id: 62,
    topic: "comportamento",
    question: "Deve-se usar o telemóvel manualmente ao conduzir?",
    answer: "Não, é proibido.",
  },
  {
    id: 63,
    topic: "comportamento",
    question: "Quando se deve usar o pisca?",
    answer: "Antes de qualquer mudança de direção ou de faixa.",
  },
  {
    id: 64,
    topic: "comportamento",
    question: "Os espelhos devem ser consultados antes de manobras?",
    answer: "Sim, sempre.",
  },
  {
    id: 65,
    topic: "comportamento",
    question: "É permitido usar sistema de mãos-livres para telefonar?",
    answer: "Sim, é permitido.",
  },
  {
    id: 66,
    topic: "comportamento",
    question:
      "Deve-se parar para um peão que já iniciou a travessia numa passadeira?",
    answer: "Sim.",
  },
  {
    id: 67,
    topic: "comportamento",
    question: "O pisca deve ser ligado com antecedência suficiente?",
    answer: "Sim.",
  },
  {
    id: 68,
    topic: "comportamento",
    question: "Distrações ao volante aumentam o risco de acidente?",
    answer: "Sim, significativamente.",
  },
  {
    id: 69,
    topic: "comportamento",
    question: "É correto buzinar sem necessidade?",
    answer: "Não, deve ser usado apenas quando necessário.",
  },
  {
    id: 70,
    topic: "comportamento",
    question:
      "O condutor deve verificar o ângulo morto antes de mudar de faixa?",
    answer: "Sim.",
  },

  // ── Luzes do Veículo ──────────────────────────────────────
  {
    id: 71,
    topic: "luzes",
    question: "Quando se deve usar os médios?",
    answer: "Na condução noturna normal.",
  },
  {
    id: 72,
    topic: "luzes",
    question: "Quando se deve usar os máximos?",
    answer: "Em vias escuras sem outros veículos próximos.",
  },
  {
    id: 73,
    topic: "luzes",
    question: "O que fazer com os máximos ao cruzar com outro veículo?",
    answer: "Mudar para médios.",
  },
  {
    id: 74,
    topic: "luzes",
    question: "Quando usar luzes de nevoeiro?",
    answer: "Apenas em nevoeiro real, chuva forte ou neve.",
  },
  {
    id: 75,
    topic: "luzes",
    question: "As luzes de travagem acendem automaticamente?",
    answer: "Sim, ao travar.",
  },
  {
    id: 76,
    topic: "luzes",
    question: "As luzes de marcha-atrás servem para quê?",
    answer: "Avisar outros de que o veículo vai recuar.",
  },
  {
    id: 77,
    topic: "luzes",
    question: "É correto usar luzes de nevoeiro em dias normais?",
    answer: "Não.",
  },
  {
    id: 78,
    topic: "luzes",
    question: "As luzes de presença servem para quê?",
    answer: "Para melhorar a visibilidade em condições de fraca luz.",
  },
  {
    id: 79,
    topic: "luzes",
    question: "Os máximos podem ofuscar outros condutores?",
    answer: "Sim, por isso devem ser usados com cuidado.",
  },
  {
    id: 80,
    topic: "luzes",
    question: "É obrigatório usar luzes em túneis?",
    answer: "Sim, mesmo de dia.",
  },

  // ── Situações Especiais ───────────────────────────────────
  {
    id: 81,
    topic: "situacoes-especiais",
    question: "O que fazer em caso de chuva forte?",
    answer: "Reduzir a velocidade e aumentar a distância de segurança.",
  },
  {
    id: 82,
    topic: "situacoes-especiais",
    question: "O que fazer em caso de nevoeiro?",
    answer: "Reduzir muito a velocidade e usar luzes de nevoeiro se existirem.",
  },
  {
    id: 83,
    topic: "situacoes-especiais",
    question: "Deve-se ultrapassar em nevoeiro denso?",
    answer: "Não, deve evitar-se.",
  },
  {
    id: 84,
    topic: "situacoes-especiais",
    question: "O que fazer em caso de derrapagem?",
    answer: "Não travar bruscamente e corrigir suavemente a direção.",
  },
  {
    id: 85,
    topic: "situacoes-especiais",
    question: "A condução noturna exige mais atenção com peões?",
    answer: "Sim.",
  },
  {
    id: 86,
    topic: "situacoes-especiais",
    question: "Deve-se reduzir a velocidade à noite mesmo sem sinalização?",
    answer: "Sim, é recomendável.",
  },
  {
    id: 87,
    topic: "situacoes-especiais",
    question: "O pavimento molhado aumenta a distância de travagem?",
    answer: "Sim.",
  },
  {
    id: 88,
    topic: "situacoes-especiais",
    question: "O que fazer se o veículo começar a aquaplanar?",
    answer:
      "Tirar o pé do acelerador suavemente e manter o volante firme sem travadas bruscas.",
  },
  {
    id: 89,
    topic: "situacoes-especiais",
    question: "Deve-se manter maior distância do carro da frente com nevoeiro?",
    answer: "Sim.",
  },
  {
    id: 90,
    topic: "situacoes-especiais",
    question:
      "A visibilidade reduzida obriga a adaptar o comportamento de condução?",
    answer: "Sim, sempre.",
  },

  // ── Álcool e Documentação (inclui primeiros socorros) ────
  {
    id: 91,
    topic: "alcool-documentacao",
    question: "O álcool afeta os reflexos do condutor?",
    answer: "Sim, significativamente.",
  },
  {
    id: 92,
    topic: "alcool-documentacao",
    question: "Conduzir sob efeito de álcool é crime?",
    answer: "Pode ser, dependendo da taxa de alcoolemia.",
  },
  {
    id: 93,
    topic: "alcool-documentacao",
    question: "O tempo de reação aumenta com o consumo de álcool?",
    answer: "Sim.",
  },
  {
    id: 94,
    topic: "alcool-documentacao",
    question: "O que fazer primeiro num acidente?",
    answer: "Garantir a segurança de todos e sinalizar o local.",
  },
  {
    id: 95,
    topic: "alcool-documentacao",
    question: "Deve-se retirar o capacete de um motociclista ferido?",
    answer: "Não, salvo risco de vida imediato.",
  },
  {
    id: 96,
    topic: "alcool-documentacao",
    question: "Deve-se mover uma vítima com suspeita de lesão na coluna?",
    answer: "Não, salvo perigo iminente.",
  },
  {
    id: 97,
    topic: "alcool-documentacao",
    question: "A carta de condução deve ser sempre transportada?",
    answer: "Sim.",
  },
  {
    id: 98,
    topic: "alcool-documentacao",
    question: "O seguro obrigatório cobre danos a terceiros?",
    answer: "Sim.",
  },
  {
    id: 99,
    topic: "alcool-documentacao",
    question: "O documento do veículo deve estar atualizado?",
    answer: "Sim.",
  },
  {
    id: 100,
    topic: "alcool-documentacao",
    question:
      "Deve-se ligar imediatamente para as emergências após um acidente grave?",
    answer: "Sim.",
  },
  {
    id: 101,
    topic: "alcool-documentacao",
    question: "É permitido conduzir com a carta de outra categoria de veículo?",
    answer: "Não.",
  },
  {
    id: 102,
    topic: "alcool-documentacao",
    question: "O triângulo de sinalização deve ser colocado a que distância?",
    answer:
      "A uma distância segura, de forma a avisar outros condutores com antecedência.",
  },
]

export const getQuestionsByTopic = (topic: Question["topic"]) =>
  questions.filter((q) => q.topic === topic)
