import type { Language } from "@/i18n/translations"

export type NotebookBlock =
  | { kind: "heading"; text: string }
  | { kind: "p"; text: string }
  | { kind: "callout"; tone: "tip" | "warning"; text: string }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "list"; title?: string; items: string[] }
  | { kind: "summary"; items: string[] }

export type NotebookChapter = {
  number: number
  icon: string
  title: string
  intro?: string
  blocks: NotebookBlock[]
}

const pt: NotebookChapter[] = [
  {
    number: 1,
    icon: "Signpost",
    title: "Regras de Prioridade",
    intro:
      "As regras de prioridade definem quem passa primeiro numa via. É um dos temas mais perguntados no exame oral, por isso é essencial dominar bem este capítulo.",
    blocks: [
      { kind: "heading", text: "Prioridade à direita" },
      {
        kind: "p",
        text: "Como regra geral, quando não existe sinalização nem semáforos, tem prioridade quem vem da direita.",
      },
      {
        kind: "callout",
        tone: "tip",
        text: 'Pensa sempre assim: "quem está à minha direita passa primeiro."',
      },
      { kind: "heading", text: "Cruzamentos" },
      {
        kind: "p",
        text: 'Num cruzamento sem sinalização, aplica-se a regra da prioridade à direita. Se houver sinal de STOP ou "cedência de passagem", essas indicações sobrepõem-se à regra geral.',
      },
      { kind: "heading", text: "Entroncamentos" },
      {
        kind: "p",
        text: "Num entroncamento (via que termina noutra via principal), quem vem da via secundária deve ceder passagem a quem circula na via principal, mesmo que essa via principal esteja à esquerda.",
      },
      {
        kind: "callout",
        tone: "warning",
        text: "Muitos candidatos confundem entroncamento com cruzamento. No entroncamento, a via onde estás termina; no cruzamento, as vias cruzam-se e continuam.",
      },
      { kind: "heading", text: "Rotundas" },
      {
        kind: "p",
        text: "Nas rotundas, tem prioridade quem já está dentro da rotunda. Quem pretende entrar deve ceder passagem aos veículos que já circulam nela.",
      },
      { kind: "heading", text: "Cedência de passagem" },
      {
        kind: "p",
        text: 'O sinal de "cedência de passagem" (triângulo invertido) obriga o condutor a abrandar ou parar, se necessário, para deixar passar os veículos que circulam na via com prioridade.',
      },
      { kind: "heading", text: "Veículos prioritários" },
      {
        kind: "p",
        text: "Veículos de emergência (bombeiros, ambulâncias, polícia) com sinais luminosos e sonoros ativados têm sempre prioridade sobre todos os outros veículos, independentemente da sinalização existente.",
      },
      { kind: "heading", text: "📝 Exemplos práticos" },
      {
        kind: "table",
        headers: ["Situação", "Quem tem prioridade"],
        rows: [
          [
            "Cruzamento sem sinais, dois carros chegam ao mesmo tempo",
            "Quem vem da direita",
          ],
          [
            "Rotunda com vários carros já a circular",
            "Quem já está dentro da rotunda",
          ],
          ["Entroncamento sem sinalização", "Veículo na via principal"],
          ["Ambulância com sirene ligada", "A ambulância, sempre"],
        ],
      },
      {
        kind: "list",
        title: "❌ Erros comuns",
        items: [
          "Achar que quem está numa avenida grande tem sempre prioridade sobre uma rua pequena, mesmo sem sinalização.",
          "Ignorar veículos de emergência com sirene, mesmo vindo da esquerda.",
          'Confundir "ceder passagem" com "parar obrigatoriamente" (STOP), que são sinais diferentes.',
          "Não perceber que dentro da rotunda quem já circula tem sempre prioridade.",
        ],
      },
      {
        kind: "summary",
        items: [
          "Sem sinalização: prioridade à direita.",
          "Entroncamento: quem vem da via secundária cede passagem.",
          "Rotunda: prioridade para quem já está dentro.",
          "Veículos de emergência com sinais ativados têm sempre prioridade.",
        ],
      },
    ],
  },
  {
    number: 2,
    icon: "TrafficCone",
    title: "Sinalização Rodoviária",
    intro:
      "A sinalização existe para organizar o trânsito e prevenir acidentes. Divide-se em várias categorias.",
    blocks: [
      { kind: "heading", text: "Sinais de perigo" },
      {
        kind: "p",
        text: "Formato triangular, fundo branco, borda vermelha. Avisam de um perigo à frente (curva perigosa, passagem de peões, animais soltos, pavimento escorregadio, entre outros).",
      },
      { kind: "heading", text: "Sinais de proibição" },
      {
        kind: "p",
        text: "Formato circular, fundo branco, borda vermelha. Indicam o que é proibido fazer (proibido ultrapassar, proibido virar à esquerda, limite de velocidade, entre outros).",
      },
      { kind: "heading", text: "Sinais de obrigação" },
      {
        kind: "p",
        text: "Formato circular, fundo azul. Indicam uma ação obrigatória (seguir em frente, virar à direita, via obrigatória para bicicletas, entre outros).",
      },
      { kind: "heading", text: "Sinais de indicação" },
      {
        kind: "p",
        text: "Formato retangular ou quadrado, geralmente fundo azul ou verde. Dão informação útil (parques de estacionamento, hospitais, autoestradas, direções).",
      },
      { kind: "heading", text: "Marcas rodoviárias" },
      { kind: "p", text: "São as linhas e símbolos pintados no pavimento:" },
      {
        kind: "table",
        headers: ["Marca", "Significado"],
        rows: [
          ["Linha contínua", "Proibido ultrapassar ou mudar de faixa"],
          ["Linha descontínua", "Permitido ultrapassar, se seguro"],
          [
            "Linha dupla (contínua + descontínua)",
            "Só pode ultrapassar quem tem a descontínua do seu lado",
          ],
          ["Zebra (passadeira)", "Passagem para peões"],
          ["Seta no chão", "Indica direção obrigatória na faixa"],
        ],
      },
      {
        kind: "list",
        title: "Como memorizar os sinais",
        items: [
          "Associa a forma à função: triângulo = perigo, círculo com vermelho = proibição, círculo azul = obrigação.",
          'Cria associações visuais simples: por exemplo, vermelho lembra "pare" ou "não pode".',
          "Revê os sinais em pequenos grupos por categoria, em vez de tentar decorar tudo de uma vez.",
        ],
      },
      {
        kind: "list",
        title: "📝 Exemplos",
        items: [
          "Sinal triangular com uma criança a correr: perigo, proximidade de escola.",
          'Sinal circular vermelho com um "60": proibido ultrapassar os 60 km/h.',
          "Sinal circular azul com uma seta para a direita: obrigatório virar à direita.",
        ],
      },
      {
        kind: "summary",
        items: [
          "Triângulo: perigo. Círculo vermelho: proibição. Círculo azul: obrigação.",
          "Linha contínua nunca se ultrapassa; linha descontínua permite ultrapassar.",
          "Marcas no chão complementam os sinais verticais.",
        ],
      },
    ],
  },
  {
    number: 3,
    icon: "ArrowLeftRight",
    title: "Ultrapassagem",
    blocks: [
      { kind: "heading", text: "Quando é permitida" },
      {
        kind: "p",
        text: "A ultrapassagem é permitida quando existe visibilidade suficiente, a via está livre no sentido contrário, há espaço seguro para regressar à faixa, e não existe sinalização que proíba a manobra.",
      },
      {
        kind: "list",
        title: "Quando é proibida",
        items: [
          "Em passagens de nível.",
          "Em curvas ou lombas sem visibilidade.",
          "Em passadeiras para peões.",
          "Quando existe linha contínua do seu lado.",
          "Perto de cruzamentos ou entroncamentos, salvo exceções sinalizadas.",
        ],
      },
      { kind: "heading", text: "Distância de segurança" },
      {
        kind: "p",
        text: "Antes e depois de ultrapassar, deve manter-se uma distância de segurança suficiente para o veículo ultrapassado e para o tráfego que vem em sentido contrário.",
      },
      { kind: "heading", text: "Ultrapassagem de bicicletas e motociclos" },
      {
        kind: "p",
        text: 'Deve manter-se uma distância lateral de segurança maior do que a usada para automóveis, porque estes veículos são mais instáveis e vulneráveis. Nunca se deve ultrapassar "à raspa".',
      },
      {
        kind: "list",
        title: "📝 Exemplos",
        items: [
          "Ultrapassar um trator numa reta longa, com boa visibilidade e sem linha contínua: permitido.",
          "Ultrapassar perto de uma curva sem visibilidade: proibido.",
          "Ultrapassar uma bicicleta deixando pelo menos 1,5 metros de distância lateral: correto.",
        ],
      },
      {
        kind: "list",
        title: "❌ Erros comuns",
        items: [
          "Ultrapassar em cima de uma passadeira ou perto dela.",
          "Não sinalizar a manobra com o pisca antes de ultrapassar.",
          "Regressar à faixa demasiado cedo, sem deixar espaço suficiente ao veículo ultrapassado.",
          "Ultrapassar bicicletas com pouca distância lateral.",
        ],
      },
      {
        kind: "summary",
        items: [
          "Só ultrapassar com visibilidade e espaço seguros.",
          "Nunca ultrapassar em curvas, lombas, passagens de nível ou passadeiras.",
          "Manter maior distância lateral ao ultrapassar bicicletas e motociclos.",
        ],
      },
    ],
  },
  {
    number: 4,
    icon: "SquareParking",
    title: "Paragem e Estacionamento",
    blocks: [
      { kind: "heading", text: "Diferença entre parar e estacionar" },
      {
        kind: "p",
        text: "Parar significa imobilizar o veículo por pouco tempo, mantendo-se o condutor pronto a retomar a marcha (por exemplo, para deixar sair um passageiro). Estacionar significa imobilizar o veículo por um período mais longo, podendo o condutor ausentar-se.",
      },
      {
        kind: "list",
        title: "Locais proibidos",
        items: [
          "Em passadeiras e a menos de 5 metros destas.",
          "Em cima de linhas contínuas.",
          "Em cruzamentos, entroncamentos e rotundas.",
          "Em passagens de nível.",
          "Em frente a saídas de garagens ou hidrantes.",
          "Em vias reservadas a transportes públicos.",
        ],
      },
      { kind: "heading", text: "Distâncias mínimas" },
      {
        kind: "p",
        text: "Deve respeitar-se uma distância mínima (normalmente indicada por sinalização local) junto a esquinas, paragens de autocarro e passagens de peões, para não obstruir a visibilidade nem a circulação.",
      },
      {
        kind: "list",
        title: "📝 Exemplos",
        items: [
          "Parar em segunda fila para deixar sair um passageiro: só permitido em situações muito específicas e por pouco tempo, evitar sempre que possível.",
          "Estacionar a menos de 5 metros de uma passadeira: proibido.",
          "Estacionar num local sinalizado para o efeito, dentro das marcas: correto.",
        ],
      },
      {
        kind: "summary",
        items: [
          "Parar é temporário e rápido; estacionar é prolongado.",
          "Nunca parar ou estacionar em passadeiras, cruzamentos ou passagens de nível.",
          "Respeitar sempre as distâncias mínimas de segurança e visibilidade.",
        ],
      },
    ],
  },
  {
    number: 5,
    icon: "Gauge",
    title: "Limites de Velocidade",
    blocks: [
      { kind: "heading", text: "Dentro das localidades" },
      {
        kind: "p",
        text: "O limite geral dentro das localidades é 50 km/h, salvo sinalização diferente.",
      },
      { kind: "heading", text: "Fora das localidades" },
      {
        kind: "p",
        text: "Fora das localidades, os limites variam consoante o tipo de via (estrada nacional, via rápida, autoestrada), sendo normalmente mais elevados que dentro das localidades, mas sempre definidos por sinalização ou por lei.",
      },
      { kind: "heading", text: "Adaptação da velocidade às condições da via" },
      {
        kind: "p",
        text: "O condutor deve sempre adaptar a velocidade às condições existentes: trânsito, visibilidade, estado do pavimento, condições climatéricas e tipo de via. O limite máximo legal não significa que se deva sempre circular a essa velocidade.",
      },
      {
        kind: "list",
        title: "📝 Exemplos",
        items: [
          "Circular a 50 km/h numa localidade sem sinalização específica: correto.",
          'Manter velocidade elevada com chuva forte só porque "o limite permite": errado, deve reduzir-se a velocidade.',
          "Reduzir a velocidade perto de escolas, mesmo sem sinal específico, se houver movimento de crianças.",
        ],
      },
      {
        kind: "summary",
        items: [
          "Dentro das localidades, 50 km/h é o limite geral.",
          "Fora das localidades, o limite depende do tipo de via.",
          "A velocidade deve ser sempre adaptada às condições reais, não apenas ao limite legal.",
        ],
      },
    ],
  },
  {
    number: 6,
    icon: "ShieldCheck",
    title: "Segurança na Condução",
    blocks: [
      { kind: "heading", text: "Cinto de segurança" },
      {
        kind: "p",
        text: "O uso do cinto é obrigatório para o condutor e todos os passageiros, em todos os bancos, sempre que o veículo estiver em movimento.",
      },
      { kind: "heading", text: "Transporte de crianças" },
      {
        kind: "p",
        text: "Crianças devem ser transportadas em sistemas de retenção adequados à sua idade, peso e altura (cadeirinhas ou assentos elevatórios), de acordo com a legislação em vigor.",
      },
      { kind: "heading", text: "Distância de segurança" },
      {
        kind: "p",
        text: "Deve manter-se sempre uma distância suficiente do veículo da frente para poder travar em segurança, mesmo em caso de travagem brusca. Esta distância deve aumentar em condições de chuva, neblina ou pavimento escorregadio.",
      },
      { kind: "heading", text: "Condução defensiva" },
      {
        kind: "p",
        text: "Consiste em antecipar riscos e comportamentos de outros condutores, mantendo distâncias e velocidades seguras, para reduzir a probabilidade de acidentes, mesmo quando o erro não é do próprio condutor.",
      },
      {
        kind: "summary",
        items: [
          "Cinto de segurança é obrigatório para todos os ocupantes.",
          "Crianças precisam de sistemas de retenção apropriados.",
          "Manter sempre distância de segurança suficiente.",
          "Conduzir de forma defensiva, antecipando riscos.",
        ],
      },
    ],
  },
  {
    number: 7,
    icon: "UserCheck",
    title: "Comportamento do Condutor",
    blocks: [
      { kind: "heading", text: "Respeito pelos peões" },
      {
        kind: "p",
        text: "Os peões têm prioridade nas passadeiras sinalizadas, especialmente quando já iniciaram a travessia. O condutor deve reduzir a velocidade e, se necessário, parar para os deixar passar.",
      },
      { kind: "heading", text: "Uso dos espelhos" },
      {
        kind: "p",
        text: "Os espelhos retrovisores devem ser consultados regularmente, especialmente antes de qualquer manobra (mudar de faixa, ultrapassar, estacionar, virar).",
      },
      { kind: "heading", text: "Piscas" },
      {
        kind: "p",
        text: "O uso do pisca é obrigatório antes de qualquer mudança de direção ou de faixa, para avisar os outros utilizadores da via com antecedência suficiente.",
      },
      { kind: "heading", text: "Utilização do telemóvel" },
      {
        kind: "p",
        text: "É proibido usar o telemóvel com o veículo em movimento, exceto com sistema de mãos-livres. Esta é uma das principais causas de distração e acidentes.",
      },
      {
        kind: "summary",
        items: [
          "Respeitar sempre os peões, especialmente nas passadeiras.",
          "Consultar os espelhos antes de qualquer manobra.",
          "Usar sempre o pisca para sinalizar mudanças de direção ou faixa.",
          "Nunca usar o telemóvel manualmente enquanto conduz.",
        ],
      },
    ],
  },
  {
    number: 8,
    icon: "Lightbulb",
    title: "Luzes do Veículo",
    blocks: [
      {
        kind: "table",
        headers: ["Luz", "Quando usar"],
        rows: [
          [
            "Luzes de presença",
            "Ao entardecer, em condições de fraca luminosidade, ou veículo estacionado em locais pouco iluminados",
          ],
          ["Médios", "Circulação noturna normal e em túneis"],
          [
            "Máximos",
            "Vias sem iluminação e sem outros veículos à frente ou em sentido contrário, devendo ser desligados ao cruzar com outro veículo",
          ],
          [
            "Luzes de nevoeiro",
            "Apenas em condições reais de nevoeiro, chuva forte ou neve, nunca em condições normais",
          ],
          [
            "Luzes de travagem",
            "Acendem automaticamente ao travar, avisando os veículos de trás",
          ],
          [
            "Luzes de marcha-atrás",
            "Acendem automaticamente ao engatar a marcha-atrás, avisando quem está por perto",
          ],
        ],
      },
      { kind: "heading", text: "Quando utilizar cada uma" },
      {
        kind: "p",
        text: "A regra principal é: usar sempre a luz adequada à visibilidade real e nunca ofuscar outros condutores. Os máximos devem ser trocados por médios assim que se aproxima outro veículo, em qualquer sentido.",
      },
      {
        kind: "summary",
        items: [
          "Médios para condução noturna normal.",
          "Máximos só em vias escuras e sem outros veículos por perto.",
          "Luzes de nevoeiro apenas em condições reais de nevoeiro ou chuva/neve intensa.",
          "Nunca ofuscar outros condutores.",
        ],
      },
    ],
  },
  {
    number: 9,
    icon: "CloudRain",
    title: "Situações Especiais",
    blocks: [
      { kind: "heading", text: "Chuva" },
      {
        kind: "p",
        text: "Reduzir a velocidade, aumentar a distância de segurança e ligar os médios (ou luzes de nevoeiro traseiras, se a chuva for muito intensa e reduzir muito a visibilidade).",
      },
      { kind: "heading", text: "Nevoeiro" },
      {
        kind: "p",
        text: "Reduzir bastante a velocidade, usar luzes de nevoeiro se existirem, evitar ultrapassagens e manter maior distância do veículo da frente.",
      },
      { kind: "heading", text: "Condução noturna" },
      {
        kind: "p",
        text: "Reduzir a velocidade em relação ao dia, usar corretamente médios e máximos, e redobrar a atenção com peões e ciclistas pouco visíveis.",
      },
      { kind: "heading", text: "Derrapagem" },
      {
        kind: "p",
        text: "Se o veículo derrapar, o condutor deve manter a calma, não travar bruscamente, tirar o pé do acelerador e virar o volante suavemente na direção da derrapagem até recuperar o controlo.",
      },
      {
        kind: "summary",
        items: [
          "Chuva e nevoeiro exigem redução de velocidade e aumento da distância de segurança.",
          "À noite, usar corretamente médios e máximos, sem ofuscar.",
          "Em caso de derrapagem, não travar bruscamente; corrigir suavemente a direção.",
        ],
      },
    ],
  },
  {
    number: 10,
    icon: "FileCheck2",
    title: "Álcool e Drogas",
    blocks: [
      { kind: "heading", text: "Efeitos na condução" },
      {
        kind: "p",
        text: "O álcool e as drogas reduzem a capacidade de concentração, os reflexos, a coordenação motora e a perceção de risco, aumentando muito a probabilidade de acidentes.",
      },
      { kind: "heading", text: "Tempo de reação" },
      {
        kind: "p",
        text: "O consumo de álcool ou drogas aumenta significativamente o tempo de reação do condutor perante imprevistos, o que pode ser decisivo para evitar ou não um acidente.",
      },
      { kind: "heading", text: "Consequências" },
      {
        kind: "p",
        text: "Conduzir sob efeito de álcool ou drogas é crime ou contraordenação grave, dependendo da taxa de alcoolemia, podendo resultar em multas, apreensão da carta, inibição de conduzir e, em casos graves, procedimento criminal.",
      },
      {
        kind: "summary",
        items: [
          "Álcool e drogas reduzem reflexos e aumentam o tempo de reação.",
          "O risco de acidente aumenta consideravelmente mesmo com pequenas quantidades.",
          "As consequências legais podem ser muito graves.",
        ],
      },
    ],
  },
  {
    number: 11,
    icon: "🚑",
    title: "Primeiros Socorros",
    blocks: [
      { kind: "heading", text: "Como sinalizar um acidente" },
      {
        kind: "p",
        text: "Colocar o triângulo de sinalização a uma distância segura, ligar os quatro piscas, e, se possível, colocar-se em local seguro fora da via de trânsito.",
      },
      {
        kind: "list",
        title: "O que fazer primeiro",
        items: [
          "Garantir a própria segurança e a dos outros antes de qualquer ação.",
          "Ligar para os serviços de emergência informando localização exata e número de feridos.",
          "Prestar apoio às vítimas sem as mover, salvo perigo iminente (incêndio, por exemplo).",
        ],
      },
      {
        kind: "list",
        title: "O que nunca fazer",
        items: [
          "Nunca retirar o capacete de um motociclista ferido, salvo risco de vida imediato.",
          "Nunca mover uma vítima com suspeita de lesão na coluna, exceto em caso de perigo imediato.",
          "Nunca dar de comer, beber ou medicamentos à vítima.",
        ],
      },
      {
        kind: "summary",
        items: [
          "Sinalizar sempre o local do acidente antes de qualquer outra ação.",
          "Chamar as emergências e prestar apoio básico sem mover vítimas desnecessariamente.",
          "Nunca retirar capacetes ou mover vítimas com possíveis lesões graves.",
        ],
      },
    ],
  },
  {
    number: 12,
    icon: "📄",
    title: "Documentação",
    blocks: [
      { kind: "heading", text: "Carta de condução" },
      {
        kind: "p",
        text: "Documento obrigatório que autoriza a condução, deve ser sempre transportada e estar válida para a categoria do veículo conduzido.",
      },
      { kind: "heading", text: "Documento do veículo" },
      {
        kind: "p",
        text: "Certifica a propriedade e as características do veículo, devendo estar sempre a bordo e atualizado.",
      },
      { kind: "heading", text: "Seguro obrigatório" },
      {
        kind: "p",
        text: "Todo o veículo em circulação deve ter seguro de responsabilidade civil obrigatório válido, que cobre danos causados a terceiros em caso de acidente.",
      },
      {
        kind: "summary",
        items: [
          "Carta de condução válida e adequada à categoria do veículo.",
          "Documento do veículo sempre a bordo e atualizado.",
          "Seguro obrigatório válido é essencial para circular legalmente.",
        ],
      },
    ],
  },
]

const en: NotebookChapter[] = [
  {
    number: 1,
    icon: "🚦",
    title: "Right of Way Rules",
    intro:
      "Right of way rules define who goes first on the road. It's one of the most common topics in the oral exam, so it's essential to master this chapter well.",
    blocks: [
      { kind: "heading", text: "Priority to the right" },
      {
        kind: "p",
        text: "As a general rule, when there are no signs or traffic lights, the vehicle coming from the right has priority.",
      },
      {
        kind: "callout",
        tone: "tip",
        text: 'Always think of it this way: "whoever is on my right goes first."',
      },
      { kind: "heading", text: "Intersections" },
      {
        kind: "p",
        text: 'At an unsigned intersection, the priority-to-the-right rule applies. If there is a STOP sign or a "give way" sign, those signs override the general rule.',
      },
      { kind: "heading", text: "Junctions" },
      {
        kind: "p",
        text: "At a junction (a road that ends at another main road), the vehicle coming from the secondary road must give way to traffic on the main road, even if that main road is on the left.",
      },
      {
        kind: "callout",
        tone: "warning",
        text: "Many candidates confuse junctions with intersections. At a junction, the road you're on ends; at an intersection, the roads cross and continue.",
      },
      { kind: "heading", text: "Roundabouts" },
      {
        kind: "p",
        text: "On roundabouts, vehicles already inside the roundabout have priority. Anyone wanting to enter must give way to vehicles already circulating in it.",
      },
      { kind: "heading", text: "Yield / give way" },
      {
        kind: "p",
        text: 'The "give way" sign (inverted triangle) requires the driver to slow down or stop, if necessary, to let vehicles on the priority road pass.',
      },
      { kind: "heading", text: "Priority vehicles" },
      {
        kind: "p",
        text: "Emergency vehicles (fire trucks, ambulances, police) with lights and sirens active always have priority over all other vehicles, regardless of existing signage.",
      },
      { kind: "heading", text: "📝 Practical examples" },
      {
        kind: "table",
        headers: ["Situation", "Who has priority"],
        rows: [
          [
            "Unsigned intersection, two cars arrive at the same time",
            "The one coming from the right",
          ],
          [
            "Roundabout with several cars already circulating",
            "Whoever is already inside the roundabout",
          ],
          ["Unsigned junction", "Vehicle on the main road"],
          ["Ambulance with siren on", "The ambulance, always"],
        ],
      },
      {
        kind: "list",
        title: "❌ Common mistakes",
        items: [
          "Assuming that whoever is on a large avenue always has priority over a small street, even without signage.",
          "Ignoring emergency vehicles with sirens, even when coming from the left.",
          'Confusing "give way" with "mandatory stop" (STOP sign), which are different signs.',
          "Not realizing that inside a roundabout, whoever is already circulating always has priority.",
        ],
      },
      {
        kind: "summary",
        items: [
          "No signage: priority to the right.",
          "Junction: the vehicle from the secondary road gives way.",
          "Roundabout: priority for whoever is already inside.",
          "Emergency vehicles with active signals always have priority.",
        ],
      },
    ],
  },
  {
    number: 2,
    icon: "🪧",
    title: "Road Signs",
    intro:
      "Road signage exists to organize traffic and prevent accidents. It is divided into several categories.",
    blocks: [
      { kind: "heading", text: "Danger signs" },
      {
        kind: "p",
        text: "Triangular shape, white background, red border. They warn of a hazard ahead (dangerous bend, pedestrian crossing, loose animals, slippery road, among others).",
      },
      { kind: "heading", text: "Prohibition signs" },
      {
        kind: "p",
        text: "Circular shape, white background, red border. They indicate what is forbidden (no overtaking, no left turn, speed limit, among others).",
      },
      { kind: "heading", text: "Mandatory signs" },
      {
        kind: "p",
        text: "Circular shape, blue background. They indicate a mandatory action (go straight ahead, turn right, mandatory bicycle lane, among others).",
      },
      { kind: "heading", text: "Information signs" },
      {
        kind: "p",
        text: "Rectangular or square shape, usually blue or green background. They give useful information (car parks, hospitals, motorways, directions).",
      },
      { kind: "heading", text: "Road markings" },
      {
        kind: "p",
        text: "These are the lines and symbols painted on the road surface:",
      },
      {
        kind: "table",
        headers: ["Marking", "Meaning"],
        rows: [
          ["Solid line", "No overtaking or changing lanes"],
          ["Dashed line", "Overtaking allowed, if safe"],
          [
            "Double line (solid + dashed)",
            "Only the driver with the dashed line on their side may overtake",
          ],
          ["Zebra crossing", "Pedestrian crossing"],
          [
            "Arrow on the road",
            "Indicates the mandatory direction for the lane",
          ],
        ],
      },
      {
        kind: "list",
        title: "How to memorize the signs",
        items: [
          "Associate shape with function: triangle = danger, red circle = prohibition, blue circle = obligation.",
          'Create simple visual associations: for example, red reminds you of "stop" or "not allowed".',
          "Review the signs in small groups by category, instead of trying to memorize everything at once.",
        ],
      },
      {
        kind: "list",
        title: "📝 Examples",
        items: [
          "A triangular sign with a child running: danger, school nearby.",
          'A red circular sign with a "60": no exceeding 60 km/h.',
          "A blue circular sign with a right arrow: mandatory right turn.",
        ],
      },
      {
        kind: "summary",
        items: [
          "Triangle: danger. Red circle: prohibition. Blue circle: obligation.",
          "A solid line should never be crossed; a dashed line allows overtaking.",
          "Road markings complement the vertical signs.",
        ],
      },
    ],
  },
  {
    number: 3,
    icon: "🔄",
    title: "Overtaking",
    blocks: [
      { kind: "heading", text: "When it is allowed" },
      {
        kind: "p",
        text: "Overtaking is allowed when there is enough visibility, the opposite lane is clear, there is safe space to return to the lane, and there is no signage prohibiting the maneuver.",
      },
      {
        kind: "list",
        title: "When it is forbidden",
        items: [
          "At level crossings.",
          "On bends or crests with no visibility.",
          "At pedestrian crossings.",
          "When there is a solid line on your side.",
          "Near intersections or junctions, except where signposted otherwise.",
        ],
      },
      { kind: "heading", text: "Safety distance" },
      {
        kind: "p",
        text: "Before and after overtaking, a sufficient safety distance must be kept from the vehicle being overtaken and from oncoming traffic.",
      },
      { kind: "heading", text: "Overtaking bicycles and motorcycles" },
      {
        kind: "p",
        text: 'A greater lateral safety distance must be kept than the one used for cars, because these vehicles are more unstable and vulnerable. Never overtake them "too close".',
      },
      {
        kind: "list",
        title: "📝 Examples",
        items: [
          "Overtaking a tractor on a long straight, with good visibility and no solid line: allowed.",
          "Overtaking near a bend with no visibility: forbidden.",
          "Overtaking a bicycle while leaving at least 1.5 meters of lateral distance: correct.",
        ],
      },
      {
        kind: "list",
        title: "❌ Common mistakes",
        items: [
          "Overtaking on or near a pedestrian crossing.",
          "Not signaling the maneuver with the indicator before overtaking.",
          "Returning to the lane too soon, without leaving enough space for the overtaken vehicle.",
          "Overtaking bicycles with too little lateral distance.",
        ],
      },
      {
        kind: "summary",
        items: [
          "Only overtake with safe visibility and space.",
          "Never overtake on bends, crests, level crossings or pedestrian crossings.",
          "Keep a greater lateral distance when overtaking bicycles and motorcycles.",
        ],
      },
    ],
  },
  {
    number: 4,
    icon: "🅿️",
    title: "Stopping and Parking",
    blocks: [
      { kind: "heading", text: "Difference between stopping and parking" },
      {
        kind: "p",
        text: "Stopping means immobilizing the vehicle for a short time, with the driver ready to move off again (for example, to let a passenger out). Parking means immobilizing the vehicle for a longer period, and the driver may leave it.",
      },
      {
        kind: "list",
        title: "Forbidden places",
        items: [
          "At pedestrian crossings and within 5 meters of them.",
          "On solid lines.",
          "At intersections, junctions and roundabouts.",
          "At level crossings.",
          "In front of garage exits or fire hydrants.",
          "On lanes reserved for public transport.",
        ],
      },
      { kind: "heading", text: "Minimum distances" },
      {
        kind: "p",
        text: "A minimum distance (usually indicated by local signage) must be respected near corners, bus stops and pedestrian crossings, so as not to obstruct visibility or traffic.",
      },
      {
        kind: "list",
        title: "📝 Examples",
        items: [
          "Stopping in a second lane to let a passenger out: only allowed in very specific situations and for a short time, avoid whenever possible.",
          "Parking less than 5 meters from a pedestrian crossing: forbidden.",
          "Parking in a signposted spot, within the markings: correct.",
        ],
      },
      {
        kind: "summary",
        items: [
          "Stopping is temporary and quick; parking is prolonged.",
          "Never stop or park at pedestrian crossings, intersections or level crossings.",
          "Always respect the minimum safety and visibility distances.",
        ],
      },
    ],
  },
  {
    number: 5,
    icon: "⏱️",
    title: "Speed Limits",
    blocks: [
      { kind: "heading", text: "Within built-up areas" },
      {
        kind: "p",
        text: "The general limit within built-up areas is 50 km/h, unless otherwise signposted.",
      },
      { kind: "heading", text: "Outside built-up areas" },
      {
        kind: "p",
        text: "Outside built-up areas, limits vary depending on the type of road (national road, expressway, motorway), and are usually higher than within built-up areas, but always defined by signage or law.",
      },
      { kind: "heading", text: "Adapting speed to road conditions" },
      {
        kind: "p",
        text: "The driver must always adapt speed to existing conditions: traffic, visibility, road surface condition, weather and type of road. The legal maximum limit does not mean you should always drive at that speed.",
      },
      {
        kind: "list",
        title: "📝 Examples",
        items: [
          "Driving at 50 km/h in a built-up area with no specific signage: correct.",
          'Keeping a high speed in heavy rain just because "the limit allows it": wrong, speed should be reduced.',
          "Reducing speed near schools, even without a specific sign, if there is child activity nearby.",
        ],
      },
      {
        kind: "summary",
        items: [
          "Within built-up areas, 50 km/h is the general limit.",
          "Outside built-up areas, the limit depends on the type of road.",
          "Speed should always be adapted to real conditions, not just the legal limit.",
        ],
      },
    ],
  },
  {
    number: 6,
    icon: "🛡️",
    title: "Driving Safety",
    blocks: [
      { kind: "heading", text: "Seatbelt" },
      {
        kind: "p",
        text: "Wearing a seatbelt is mandatory for the driver and all passengers, in every seat, whenever the vehicle is moving.",
      },
      { kind: "heading", text: "Transporting children" },
      {
        kind: "p",
        text: "Children must be transported in restraint systems suited to their age, weight and height (child seats or booster seats), in accordance with current legislation.",
      },
      { kind: "heading", text: "Safety distance" },
      {
        kind: "p",
        text: "A sufficient distance from the vehicle ahead must always be kept in order to brake safely, even in the event of sudden braking. This distance should increase in rain, fog or slippery road conditions.",
      },
      { kind: "heading", text: "Defensive driving" },
      {
        kind: "p",
        text: "This means anticipating risks and the behavior of other drivers, keeping safe distances and speeds, in order to reduce the likelihood of accidents, even when the mistake is not the driver's own.",
      },
      {
        kind: "summary",
        items: [
          "The seatbelt is mandatory for all occupants.",
          "Children need appropriate restraint systems.",
          "Always keep a sufficient safety distance.",
          "Drive defensively, anticipating risks.",
        ],
      },
    ],
  },
  {
    number: 7,
    icon: "🙋",
    title: "Driver Behavior",
    blocks: [
      { kind: "heading", text: "Respect for pedestrians" },
      {
        kind: "p",
        text: "Pedestrians have priority at marked crossings, especially once they have started to cross. The driver must slow down and, if necessary, stop to let them pass.",
      },
      { kind: "heading", text: "Using the mirrors" },
      {
        kind: "p",
        text: "The rear-view mirrors should be checked regularly, especially before any maneuver (changing lanes, overtaking, parking, turning).",
      },
      { kind: "heading", text: "Indicators" },
      {
        kind: "p",
        text: "Using the indicator is mandatory before any change of direction or lane, to warn other road users with enough advance notice.",
      },
      { kind: "heading", text: "Use of mobile phones" },
      {
        kind: "p",
        text: "It is forbidden to use a mobile phone while the vehicle is moving, except with a hands-free system. This is one of the main causes of distraction and accidents.",
      },
      {
        kind: "summary",
        items: [
          "Always respect pedestrians, especially at crossings.",
          "Check the mirrors before any maneuver.",
          "Always use the indicator to signal changes of direction or lane.",
          "Never use a mobile phone by hand while driving.",
        ],
      },
    ],
  },
  {
    number: 8,
    icon: "💡",
    title: "Vehicle Lights",
    blocks: [
      {
        kind: "table",
        headers: ["Light", "When to use"],
        rows: [
          [
            "Sidelights",
            "At dusk, in conditions of poor visibility, or a vehicle parked in poorly lit places",
          ],
          ["Low beams", "Normal night driving and in tunnels"],
          [
            "High beams",
            "Unlit roads with no other vehicles ahead or oncoming, and must be switched off when meeting another vehicle",
          ],
          [
            "Fog lights",
            "Only in actual fog, heavy rain or snow conditions, never in normal conditions",
          ],
          [
            "Brake lights",
            "Come on automatically when braking, warning vehicles behind",
          ],
          [
            "Reverse lights",
            "Come on automatically when reverse gear is engaged, warning those nearby",
          ],
        ],
      },
      { kind: "heading", text: "When to use each one" },
      {
        kind: "p",
        text: "The main rule is: always use the light suited to actual visibility and never dazzle other drivers. High beams must be switched to low beams as soon as another vehicle approaches, in either direction.",
      },
      {
        kind: "summary",
        items: [
          "Low beams for normal night driving.",
          "High beams only on dark roads with no other vehicles nearby.",
          "Fog lights only in actual fog or heavy rain/snow conditions.",
          "Never dazzle other drivers.",
        ],
      },
    ],
  },
  {
    number: 9,
    icon: "🌧️",
    title: "Special Situations",
    blocks: [
      { kind: "heading", text: "Rain" },
      {
        kind: "p",
        text: "Reduce speed, increase the safety distance and turn on low beams (or rear fog lights, if the rain is very heavy and greatly reduces visibility).",
      },
      { kind: "heading", text: "Fog" },
      {
        kind: "p",
        text: "Reduce speed considerably, use fog lights if available, avoid overtaking and keep a greater distance from the vehicle ahead.",
      },
      { kind: "heading", text: "Night driving" },
      {
        kind: "p",
        text: "Reduce speed compared to daytime, use low and high beams correctly, and pay extra attention to pedestrians and cyclists who are hard to see.",
      },
      { kind: "heading", text: "Skidding" },
      {
        kind: "p",
        text: "If the vehicle skids, the driver should stay calm, avoid braking suddenly, ease off the accelerator and steer gently in the direction of the skid until regaining control.",
      },
      {
        kind: "summary",
        items: [
          "Rain and fog require reducing speed and increasing the safety distance.",
          "At night, use low and high beams correctly, without dazzling others.",
          "In case of skidding, don't brake suddenly; correct the steering gently.",
        ],
      },
    ],
  },
  {
    number: 10,
    icon: "🍺",
    title: "Alcohol and Drugs",
    blocks: [
      { kind: "heading", text: "Effects on driving" },
      {
        kind: "p",
        text: "Alcohol and drugs reduce concentration, reflexes, motor coordination and risk perception, greatly increasing the likelihood of accidents.",
      },
      { kind: "heading", text: "Reaction time" },
      {
        kind: "p",
        text: "Consuming alcohol or drugs significantly increases a driver's reaction time when facing the unexpected, which can be decisive in avoiding or causing an accident.",
      },
      { kind: "heading", text: "Consequences" },
      {
        kind: "p",
        text: "Driving under the effect of alcohol or drugs is a crime or a serious offense, depending on the blood alcohol level, and may result in fines, license confiscation, driving bans and, in serious cases, criminal proceedings.",
      },
      {
        kind: "summary",
        items: [
          "Alcohol and drugs reduce reflexes and increase reaction time.",
          "The risk of an accident increases considerably even with small amounts.",
          "The legal consequences can be very serious.",
        ],
      },
    ],
  },
  {
    number: 11,
    icon: "🚑",
    title: "First Aid",
    blocks: [
      { kind: "heading", text: "How to signal an accident" },
      {
        kind: "p",
        text: "Place the warning triangle at a safe distance, turn on the hazard lights, and, if possible, get to a safe place away from the traffic lane.",
      },
      {
        kind: "list",
        title: "What to do first",
        items: [
          "Ensure your own safety and that of others before taking any action.",
          "Call emergency services, giving the exact location and number of injured people.",
          "Provide support to victims without moving them, unless there is imminent danger (a fire, for example).",
        ],
      },
      {
        kind: "list",
        title: "What never to do",
        items: [
          "Never remove the helmet of an injured motorcyclist, unless there is immediate risk to life.",
          "Never move a victim suspected of a spinal injury, except in case of immediate danger.",
          "Never give the victim food, drink or medication.",
        ],
      },
      {
        kind: "summary",
        items: [
          "Always signal the accident scene before taking any other action.",
          "Call emergency services and provide basic support without unnecessarily moving victims.",
          "Never remove helmets or move victims with possible serious injuries.",
        ],
      },
    ],
  },
  {
    number: 12,
    icon: "📄",
    title: "Documents",
    blocks: [
      { kind: "heading", text: "Driving license" },
      {
        kind: "p",
        text: "A mandatory document that authorizes driving; it must always be carried and be valid for the category of vehicle being driven.",
      },
      { kind: "heading", text: "Vehicle registration document" },
      {
        kind: "p",
        text: "Certifies the ownership and characteristics of the vehicle, and must always be on board and up to date.",
      },
      { kind: "heading", text: "Mandatory insurance" },
      {
        kind: "p",
        text: "Every vehicle in circulation must have valid mandatory third-party liability insurance, which covers damage caused to third parties in the event of an accident.",
      },
      {
        kind: "summary",
        items: [
          "A valid driving license suited to the vehicle category.",
          "The vehicle document always on board and up to date.",
          "Valid mandatory insurance is essential to drive legally.",
        ],
      },
    ],
  },
]

const fr: NotebookChapter[] = [
  {
    number: 1,
    icon: "🚦",
    title: "Règles de Priorité",
    intro:
      "Les règles de priorité définissent qui passe en premier sur une voie. C'est l'un des sujets les plus souvent abordés à l'examen oral, il est donc essentiel de bien maîtriser ce chapitre.",
    blocks: [
      { kind: "heading", text: "Priorité à droite" },
      {
        kind: "p",
        text: "En règle générale, en l'absence de signalisation ou de feux, la priorité revient à celui qui vient de la droite.",
      },
      {
        kind: "callout",
        tone: "tip",
        text: 'Pense toujours ainsi : "celui qui est à ma droite passe en premier."',
      },
      { kind: "heading", text: "Carrefours" },
      {
        kind: "p",
        text: "À un carrefour sans signalisation, la règle de priorité à droite s'applique. S'il y a un panneau STOP ou \"cédez le passage\", ces indications priment sur la règle générale.",
      },
      { kind: "heading", text: "Intersections en T" },
      {
        kind: "p",
        text: "À une intersection en T (une voie qui se termine sur une voie principale), celui qui vient de la voie secondaire doit céder le passage à la circulation de la voie principale, même si cette voie principale se trouve à gauche.",
      },
      {
        kind: "callout",
        tone: "warning",
        text: "Beaucoup de candidats confondent l'intersection en T avec le carrefour. Dans l'intersection en T, la voie où tu te trouves se termine ; dans le carrefour, les voies se croisent et continuent.",
      },
      { kind: "heading", text: "Ronds-points" },
      {
        kind: "p",
        text: "Sur les ronds-points, la priorité revient à celui qui est déjà à l'intérieur du rond-point. Celui qui veut y entrer doit céder le passage aux véhicules qui y circulent déjà.",
      },
      { kind: "heading", text: "Cédez le passage" },
      {
        kind: "p",
        text: 'Le panneau "cédez le passage" (triangle inversé) oblige le conducteur à ralentir ou à s\'arrêter, si nécessaire, pour laisser passer les véhicules circulant sur la voie prioritaire.',
      },
      { kind: "heading", text: "Véhicules prioritaires" },
      {
        kind: "p",
        text: "Les véhicules d'urgence (pompiers, ambulances, police) avec signaux lumineux et sonores activés ont toujours la priorité sur tous les autres véhicules, indépendamment de la signalisation existante.",
      },
      { kind: "heading", text: "📝 Exemples pratiques" },
      {
        kind: "table",
        headers: ["Situation", "Qui a la priorité"],
        rows: [
          [
            "Carrefour sans signalisation, deux voitures arrivent en même temps",
            "Celle qui vient de la droite",
          ],
          [
            "Rond-point avec plusieurs voitures déjà en circulation",
            "Celui qui est déjà à l'intérieur du rond-point",
          ],
          [
            "Intersection en T sans signalisation",
            "Véhicule sur la voie principale",
          ],
          ["Ambulance avec sirène allumée", "L'ambulance, toujours"],
        ],
      },
      {
        kind: "list",
        title: "❌ Erreurs courantes",
        items: [
          "Penser que celui qui est sur une grande avenue a toujours la priorité sur une petite rue, même sans signalisation.",
          "Ignorer les véhicules d'urgence avec sirène, même venant de la gauche.",
          'Confondre "céder le passage" avec "arrêt obligatoire" (STOP), qui sont des panneaux différents.',
          "Ne pas comprendre qu'à l'intérieur d'un rond-point, celui qui circule déjà a toujours la priorité.",
        ],
      },
      {
        kind: "summary",
        items: [
          "Sans signalisation : priorité à droite.",
          "Intersection en T : celui qui vient de la voie secondaire cède le passage.",
          "Rond-point : priorité à celui qui est déjà à l'intérieur.",
          "Les véhicules d'urgence avec signaux activés ont toujours la priorité.",
        ],
      },
    ],
  },
  {
    number: 2,
    icon: "🪧",
    title: "Signalisation Routière",
    intro:
      "La signalisation existe pour organiser la circulation et prévenir les accidents. Elle se divise en plusieurs catégories.",
    blocks: [
      { kind: "heading", text: "Panneaux de danger" },
      {
        kind: "p",
        text: "Forme triangulaire, fond blanc, bordure rouge. Ils annoncent un danger à venir (virage dangereux, passage piétons, animaux en liberté, chaussée glissante, entre autres).",
      },
      { kind: "heading", text: "Panneaux d'interdiction" },
      {
        kind: "p",
        text: "Forme circulaire, fond blanc, bordure rouge. Ils indiquent ce qui est interdit (interdiction de dépasser, interdiction de tourner à gauche, limite de vitesse, entre autres).",
      },
      { kind: "heading", text: "Panneaux d'obligation" },
      {
        kind: "p",
        text: "Forme circulaire, fond bleu. Ils indiquent une action obligatoire (continuer tout droit, tourner à droite, voie obligatoire pour vélos, entre autres).",
      },
      { kind: "heading", text: "Panneaux d'indication" },
      {
        kind: "p",
        text: "Forme rectangulaire ou carrée, généralement fond bleu ou vert. Ils donnent des informations utiles (parkings, hôpitaux, autoroutes, directions).",
      },
      { kind: "heading", text: "Marquages au sol" },
      {
        kind: "p",
        text: "Ce sont les lignes et symboles peints sur la chaussée :",
      },
      {
        kind: "table",
        headers: ["Marquage", "Signification"],
        rows: [
          ["Ligne continue", "Interdiction de dépasser ou de changer de voie"],
          [
            "Ligne discontinue",
            "Dépassement autorisé, si la sécurité le permet",
          ],
          [
            "Ligne double (continue + discontinue)",
            "Seul celui qui a la ligne discontinue de son côté peut dépasser",
          ],
          ["Passage zébré", "Passage pour piétons"],
          ["Flèche au sol", "Indique la direction obligatoire de la voie"],
        ],
      },
      {
        kind: "list",
        title: "Comment mémoriser les panneaux",
        items: [
          "Associe la forme à la fonction : triangle = danger, cercle rouge = interdiction, cercle bleu = obligation.",
          'Crée des associations visuelles simples : par exemple, le rouge rappelle "stop" ou "interdit".',
          "Révise les panneaux par petits groupes selon leur catégorie, plutôt que d'essayer de tout mémoriser d'un coup.",
        ],
      },
      {
        kind: "list",
        title: "📝 Exemples",
        items: [
          "Panneau triangulaire avec un enfant qui court : danger, proximité d'une école.",
          'Panneau circulaire rouge avec "60" : interdiction de dépasser 60 km/h.',
          "Panneau circulaire bleu avec une flèche vers la droite : obligation de tourner à droite.",
        ],
      },
      {
        kind: "summary",
        items: [
          "Triangle : danger. Cercle rouge : interdiction. Cercle bleu : obligation.",
          "Une ligne continue ne se dépasse jamais ; une ligne discontinue permet de dépasser.",
          "Les marquages au sol complètent les panneaux verticaux.",
        ],
      },
    ],
  },
  {
    number: 3,
    icon: "🔄",
    title: "Dépassement",
    blocks: [
      { kind: "heading", text: "Quand il est autorisé" },
      {
        kind: "p",
        text: "Le dépassement est autorisé lorsqu'il y a une visibilité suffisante, que la voie est dégagée en sens inverse, qu'il y a de l'espace pour revenir en sécurité sur la voie, et qu'aucune signalisation n'interdit la manœuvre.",
      },
      {
        kind: "list",
        title: "Quand il est interdit",
        items: [
          "Aux passages à niveau.",
          "Dans les virages ou sur les sommets de côte sans visibilité.",
          "Aux passages piétons.",
          "Quand il y a une ligne continue de ton côté.",
          "Près des carrefours ou intersections, sauf exceptions signalées.",
        ],
      },
      { kind: "heading", text: "Distance de sécurité" },
      {
        kind: "p",
        text: "Avant et après un dépassement, il faut maintenir une distance de sécurité suffisante avec le véhicule dépassé et avec la circulation venant en sens inverse.",
      },
      { kind: "heading", text: "Dépassement de vélos et de motos" },
      {
        kind: "p",
        text: 'Il faut maintenir une distance latérale de sécurité plus grande que celle utilisée pour les voitures, car ces véhicules sont plus instables et plus vulnérables. Il ne faut jamais dépasser "au ras".',
      },
      {
        kind: "list",
        title: "📝 Exemples",
        items: [
          "Dépasser un tracteur sur une longue ligne droite, avec une bonne visibilité et sans ligne continue : autorisé.",
          "Dépasser près d'un virage sans visibilité : interdit.",
          "Dépasser un vélo en laissant au moins 1,5 mètre de distance latérale : correct.",
        ],
      },
      {
        kind: "list",
        title: "❌ Erreurs courantes",
        items: [
          "Dépasser sur ou près d'un passage piétons.",
          "Ne pas signaler la manœuvre avec le clignotant avant de dépasser.",
          "Revenir sur la voie trop tôt, sans laisser assez d'espace au véhicule dépassé.",
          "Dépasser des vélos avec trop peu de distance latérale.",
        ],
      },
      {
        kind: "summary",
        items: [
          "Ne dépasser qu'avec une visibilité et un espace sûrs.",
          "Ne jamais dépasser dans les virages, sur les sommets de côte, aux passages à niveau ou aux passages piétons.",
          "Garder une plus grande distance latérale en dépassant vélos et motos.",
        ],
      },
    ],
  },
  {
    number: 4,
    icon: "🅿️",
    title: "Arrêt et Stationnement",
    blocks: [
      { kind: "heading", text: "Différence entre s'arrêter et stationner" },
      {
        kind: "p",
        text: "S'arrêter signifie immobiliser le véhicule pendant peu de temps, le conducteur restant prêt à repartir (par exemple, pour laisser descendre un passager). Stationner signifie immobiliser le véhicule pour une période plus longue, le conducteur pouvant s'absenter.",
      },
      {
        kind: "list",
        title: "Endroits interdits",
        items: [
          "Aux passages piétons et à moins de 5 mètres de ceux-ci.",
          "Sur les lignes continues.",
          "Aux carrefours, intersections et ronds-points.",
          "Aux passages à niveau.",
          "Devant les sorties de garage ou les bouches d'incendie.",
          "Sur les voies réservées aux transports publics.",
        ],
      },
      { kind: "heading", text: "Distances minimales" },
      {
        kind: "p",
        text: "Une distance minimale (généralement indiquée par la signalisation locale) doit être respectée près des coins de rue, des arrêts de bus et des passages piétons, afin de ne pas gêner la visibilité ni la circulation.",
      },
      {
        kind: "list",
        title: "📝 Exemples",
        items: [
          "S'arrêter en double file pour laisser descendre un passager : autorisé seulement dans des situations très précises et pour peu de temps, à éviter autant que possible.",
          "Stationner à moins de 5 mètres d'un passage piétons : interdit.",
          "Stationner à un endroit signalé à cet effet, dans les limites du marquage : correct.",
        ],
      },
      {
        kind: "summary",
        items: [
          "S'arrêter est temporaire et rapide ; stationner est prolongé.",
          "Ne jamais s'arrêter ni stationner aux passages piétons, carrefours ou passages à niveau.",
          "Toujours respecter les distances minimales de sécurité et de visibilité.",
        ],
      },
    ],
  },
  {
    number: 5,
    icon: "⏱️",
    title: "Limitations de Vitesse",
    blocks: [
      { kind: "heading", text: "En agglomération" },
      {
        kind: "p",
        text: "La limite générale en agglomération est de 50 km/h, sauf signalisation différente.",
      },
      { kind: "heading", text: "Hors agglomération" },
      {
        kind: "p",
        text: "Hors agglomération, les limites varient selon le type de voie (route nationale, voie rapide, autoroute), étant généralement plus élevées qu'en agglomération, mais toujours définies par la signalisation ou par la loi.",
      },
      {
        kind: "heading",
        text: "Adapter la vitesse aux conditions de la route",
      },
      {
        kind: "p",
        text: "Le conducteur doit toujours adapter sa vitesse aux conditions existantes : circulation, visibilité, état de la chaussée, conditions météorologiques et type de voie. La limite légale maximale ne signifie pas qu'il faut toujours rouler à cette vitesse.",
      },
      {
        kind: "list",
        title: "📝 Exemples",
        items: [
          "Rouler à 50 km/h en agglomération sans signalisation spécifique : correct.",
          'Maintenir une vitesse élevée sous une forte pluie simplement parce que "la limite le permet" : incorrect, il faut réduire la vitesse.',
          "Réduire la vitesse près des écoles, même sans panneau spécifique, en cas de présence d'enfants.",
        ],
      },
      {
        kind: "summary",
        items: [
          "En agglomération, 50 km/h est la limite générale.",
          "Hors agglomération, la limite dépend du type de voie.",
          "La vitesse doit toujours être adaptée aux conditions réelles, pas seulement à la limite légale.",
        ],
      },
    ],
  },
  {
    number: 6,
    icon: "🛡️",
    title: "Sécurité de Conduite",
    blocks: [
      { kind: "heading", text: "Ceinture de sécurité" },
      {
        kind: "p",
        text: "Le port de la ceinture est obligatoire pour le conducteur et tous les passagers, à toutes les places, dès que le véhicule est en mouvement.",
      },
      { kind: "heading", text: "Transport d'enfants" },
      {
        kind: "p",
        text: "Les enfants doivent être transportés dans des systèmes de retenue adaptés à leur âge, poids et taille (sièges auto ou rehausseurs), conformément à la législation en vigueur.",
      },
      { kind: "heading", text: "Distance de sécurité" },
      {
        kind: "p",
        text: "Une distance suffisante avec le véhicule qui précède doit toujours être maintenue afin de pouvoir freiner en sécurité, même en cas de freinage brusque. Cette distance doit augmenter en cas de pluie, de brouillard ou de chaussée glissante.",
      },
      { kind: "heading", text: "Conduite défensive" },
      {
        kind: "p",
        text: "Elle consiste à anticiper les risques et le comportement des autres conducteurs, en maintenant des distances et des vitesses sûres, afin de réduire la probabilité d'accidents, même lorsque l'erreur ne vient pas du conducteur lui-même.",
      },
      {
        kind: "summary",
        items: [
          "La ceinture de sécurité est obligatoire pour tous les occupants.",
          "Les enfants ont besoin de systèmes de retenue adaptés.",
          "Toujours maintenir une distance de sécurité suffisante.",
          "Conduire de façon défensive, en anticipant les risques.",
        ],
      },
    ],
  },
  {
    number: 7,
    icon: "🙋",
    title: "Comportement du Conducteur",
    blocks: [
      { kind: "heading", text: "Respect des piétons" },
      {
        kind: "p",
        text: "Les piétons ont la priorité aux passages signalés, surtout lorsqu'ils ont déjà commencé à traverser. Le conducteur doit ralentir et, si nécessaire, s'arrêter pour les laisser passer.",
      },
      { kind: "heading", text: "Utilisation des rétroviseurs" },
      {
        kind: "p",
        text: "Les rétroviseurs doivent être consultés régulièrement, surtout avant toute manœuvre (changement de voie, dépassement, stationnement, virage).",
      },
      { kind: "heading", text: "Clignotants" },
      {
        kind: "p",
        text: "L'utilisation du clignotant est obligatoire avant tout changement de direction ou de voie, pour prévenir les autres usagers de la route suffisamment à l'avance.",
      },
      { kind: "heading", text: "Utilisation du téléphone portable" },
      {
        kind: "p",
        text: "Il est interdit d'utiliser le téléphone portable en conduisant, sauf avec un système mains libres. C'est l'une des principales causes de distraction et d'accidents.",
      },
      {
        kind: "summary",
        items: [
          "Toujours respecter les piétons, surtout aux passages piétons.",
          "Consulter les rétroviseurs avant toute manœuvre.",
          "Toujours utiliser le clignotant pour signaler un changement de direction ou de voie.",
          "Ne jamais utiliser le téléphone à la main en conduisant.",
        ],
      },
    ],
  },
  {
    number: 8,
    icon: "💡",
    title: "Éclairage du Véhicule",
    blocks: [
      {
        kind: "table",
        headers: ["Feu", "Quand l'utiliser"],
        rows: [
          [
            "Feux de position",
            "Au crépuscule, en conditions de faible luminosité, ou véhicule garé dans des endroits peu éclairés",
          ],
          [
            "Feux de croisement",
            "Conduite nocturne normale et dans les tunnels",
          ],
          [
            "Feux de route",
            "Routes non éclairées et sans autres véhicules devant ou en sens inverse, à éteindre en croisant un autre véhicule",
          ],
          [
            "Feux de brouillard",
            "Uniquement en cas de brouillard réel, forte pluie ou neige, jamais en conditions normales",
          ],
          [
            "Feux de stop",
            "S'allument automatiquement au freinage, pour avertir les véhicules suivants",
          ],
          [
            "Feux de recul",
            "S'allument automatiquement en marche arrière, pour avertir les personnes à proximité",
          ],
        ],
      },
      { kind: "heading", text: "Quand utiliser chacun d'eux" },
      {
        kind: "p",
        text: "La règle principale est : toujours utiliser l'éclairage adapté à la visibilité réelle et ne jamais éblouir les autres conducteurs. Les feux de route doivent être remplacés par les feux de croisement dès qu'un autre véhicule approche, dans un sens comme dans l'autre.",
      },
      {
        kind: "summary",
        items: [
          "Feux de croisement pour la conduite nocturne normale.",
          "Feux de route uniquement sur routes sombres sans autres véhicules à proximité.",
          "Feux de brouillard uniquement en cas de brouillard réel ou de forte pluie/neige.",
          "Ne jamais éblouir les autres conducteurs.",
        ],
      },
    ],
  },
  {
    number: 9,
    icon: "🌧️",
    title: "Situations Particulières",
    blocks: [
      { kind: "heading", text: "Pluie" },
      {
        kind: "p",
        text: "Réduire la vitesse, augmenter la distance de sécurité et allumer les feux de croisement (ou les feux arrière de brouillard, si la pluie est très forte et réduit beaucoup la visibilité).",
      },
      { kind: "heading", text: "Brouillard" },
      {
        kind: "p",
        text: "Réduire fortement la vitesse, utiliser les feux de brouillard s'ils existent, éviter les dépassements et garder une plus grande distance avec le véhicule qui précède.",
      },
      { kind: "heading", text: "Conduite nocturne" },
      {
        kind: "p",
        text: "Réduire la vitesse par rapport au jour, utiliser correctement les feux de croisement et de route, et redoubler d'attention envers les piétons et cyclistes peu visibles.",
      },
      { kind: "heading", text: "Dérapage" },
      {
        kind: "p",
        text: "Si le véhicule dérape, le conducteur doit garder son calme, ne pas freiner brusquement, relâcher l'accélérateur et tourner doucement le volant dans le sens du dérapage jusqu'à retrouver le contrôle.",
      },
      {
        kind: "summary",
        items: [
          "La pluie et le brouillard exigent une réduction de vitesse et une distance de sécurité accrue.",
          "La nuit, utiliser correctement les feux de croisement et de route, sans éblouir.",
          "En cas de dérapage, ne pas freiner brusquement ; corriger la direction en douceur.",
        ],
      },
    ],
  },
  {
    number: 10,
    icon: "🍺",
    title: "Alcool et Drogues",
    blocks: [
      { kind: "heading", text: "Effets sur la conduite" },
      {
        kind: "p",
        text: "L'alcool et les drogues réduisent la capacité de concentration, les réflexes, la coordination motrice et la perception du risque, augmentant fortement la probabilité d'accidents.",
      },
      { kind: "heading", text: "Temps de réaction" },
      {
        kind: "p",
        text: "La consommation d'alcool ou de drogues augmente significativement le temps de réaction du conducteur face à l'imprévu, ce qui peut être décisif pour éviter ou non un accident.",
      },
      { kind: "heading", text: "Conséquences" },
      {
        kind: "p",
        text: "Conduire sous l'effet de l'alcool ou de drogues est un délit ou une infraction grave, selon le taux d'alcoolémie, pouvant entraîner des amendes, la confiscation du permis, une interdiction de conduire et, dans les cas graves, des poursuites pénales.",
      },
      {
        kind: "summary",
        items: [
          "L'alcool et les drogues réduisent les réflexes et augmentent le temps de réaction.",
          "Le risque d'accident augmente considérablement même avec de petites quantités.",
          "Les conséquences légales peuvent être très graves.",
        ],
      },
    ],
  },
  {
    number: 11,
    icon: "🚑",
    title: "Premiers Secours",
    blocks: [
      { kind: "heading", text: "Comment signaler un accident" },
      {
        kind: "p",
        text: "Placer le triangle de signalisation à une distance sûre, allumer les quatre clignotants (warning), et, si possible, se mettre en lieu sûr, à l'écart de la circulation.",
      },
      {
        kind: "list",
        title: "Que faire en premier",
        items: [
          "Assurer sa propre sécurité et celle des autres avant toute action.",
          "Appeler les services d'urgence en indiquant la localisation exacte et le nombre de blessés.",
          "Porter assistance aux victimes sans les déplacer, sauf danger imminent (incendie, par exemple).",
        ],
      },
      {
        kind: "list",
        title: "Ce qu'il ne faut jamais faire",
        items: [
          "Ne jamais retirer le casque d'un motocycliste blessé, sauf risque vital immédiat.",
          "Ne jamais déplacer une victime suspectée d'une lésion à la colonne vertébrale, sauf danger immédiat.",
          "Ne jamais donner à boire, à manger ou des médicaments à la victime.",
        ],
      },
      {
        kind: "summary",
        items: [
          "Toujours signaler le lieu de l'accident avant toute autre action.",
          "Appeler les secours et apporter une aide de base sans déplacer inutilement les victimes.",
          "Ne jamais retirer les casques ni déplacer des victimes présentant des blessures potentiellement graves.",
        ],
      },
    ],
  },
  {
    number: 12,
    icon: "📄",
    title: "Documents",
    blocks: [
      { kind: "heading", text: "Permis de conduire" },
      {
        kind: "p",
        text: "Document obligatoire qui autorise à conduire ; il doit toujours être transporté et être valide pour la catégorie du véhicule conduit.",
      },
      { kind: "heading", text: "Carte grise du véhicule" },
      {
        kind: "p",
        text: "Certifie la propriété et les caractéristiques du véhicule ; elle doit toujours être à bord et à jour.",
      },
      { kind: "heading", text: "Assurance obligatoire" },
      {
        kind: "p",
        text: "Tout véhicule en circulation doit avoir une assurance responsabilité civile obligatoire valide, qui couvre les dommages causés à des tiers en cas d'accident.",
      },
      {
        kind: "summary",
        items: [
          "Permis de conduire valide et adapté à la catégorie du véhicule.",
          "Carte grise du véhicule toujours à bord et à jour.",
          "Une assurance obligatoire valide est essentielle pour circuler légalement.",
        ],
      },
    ],
  },
]

export const notebookChapters: Record<Language, NotebookChapter[]> = {
  pt,
  en,
  fr,
}

export const notebookUi = {
  pt: {
    pageTitle: "Caderno de Estudo",
    pageSubtitle:
      "O guia completo do exame oral, organizado por capítulos, sempre à mão.",
    chapterLabel: "Capítulo",
    summaryLabel: "📌 Resumo do capítulo",
  },
  en: {
    pageTitle: "Study Notebook",
    pageSubtitle:
      "The complete oral exam guide, organized by chapter, always at hand.",
    chapterLabel: "Chapter",
    summaryLabel: "📌 Chapter summary",
  },
  fr: {
    pageTitle: "Cahier d'Étude",
    pageSubtitle:
      "Le guide complet de l'examen oral, organisé par chapitres, toujours à portée de main.",
    chapterLabel: "Chapitre",
    summaryLabel: "📌 Résumé du chapitre",
  },
} satisfies Record<
  Language,
  {
    pageTitle: string
    pageSubtitle: string
    chapterLabel: string
    summaryLabel: string
  }
>
