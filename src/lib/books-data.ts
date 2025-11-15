export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  chapters: number;
  genre: string;
  description: string;
  views: string;
  synopsis: string;
  ageRating: string;
  tags: string[];
  fullStory: Chapter[];
}

export interface Chapter {
  id: number;
  title: string;
  content: string;
  wordCount: number;
  isPaid?: boolean;
}

export const booksData: Book[] = [
  {
    id: "1",
    title: "Amor Proibido: O Segredo do Bilionário",
    author: "Ana Silva",
    cover: "",
    rating: 4.8,
    chapters: 25,
    genre: "Romance",
    description: "Uma história envolvente sobre amor, segredos e redenção.",
    views: "1.2K",
    ageRating: "16+",
    tags: ["Romance", "Drama", "Bilionário", "Segredos"],
    synopsis: "Emma Thompson é uma jovem jornalista determinada a desvendar os segredos do misterioso CEO Marcus Blackwood. Quando ela consegue uma entrevista exclusiva, não imagina que sua vida mudaria para sempre. Marcus esconde um passado sombrio e um coração ferido, mas Emma desperta nele sentimentos que ele pensava estar mortos. Entre segredos corporativos, traições familiares e uma atração irresistível, eles precisarão decidir se o amor vale o risco de expor suas vulnerabilidades.",
    fullStory: [
      {
        id: 1,
        title: "O Encontro",
        content: `Emma Thompson ajeitou nervosamente sua blusa enquanto esperava no luxuoso lobby da Blackwood Industries. Aos 26 anos, ela havia conquistado uma posição respeitável no jornal The Metropolitan, mas aquela entrevista poderia mudar sua carreira para sempre.

Marcus Blackwood era um enigma. Aos 35 anos, ele havia transformado uma pequena empresa familiar em um império bilionário. Mas era sua vida pessoal que intrigava a mídia - ele nunca dava entrevistas, nunca aparecia em eventos sociais, e rumores sobre seu passado circulavam como lendas urbanas.

"Senhorita Thompson?" Uma secretária elegante a chamou. "O Sr. Blackwood a receberá agora."

Emma seguiu por corredores de mármore até chegar a uma porta dupla de mogno. Seu coração acelerou quando a porta se abriu.

Marcus Blackwood estava de pé junto à janela panorâmica, observando a cidade. Quando se virou, Emma sentiu o ar faltar em seus pulmões. Ele era ainda mais impressionante pessoalmente - cabelos negros perfeitamente penteados, olhos cinza penetrantes, e um terno que provavelmente custava mais que seu carro.

"Senhorita Thompson," sua voz era profunda e controlada. "Você tem exatamente 30 minutos."

Emma engoliu em seco e abriu seu notebook. "Obrigada por me receber, Sr. Blackwood. Sei que o senhor valoriza sua privacidade."

"Então vamos direto ao ponto." Ele se sentou atrás da mesa, seus olhos fixos nela com uma intensidade que a fazia se sentir exposta.

As perguntas começaram profissionais - sobre a empresa, estratégias de mercado, planos futuros. Mas Emma não era como os outros jornalistas. Ela havia pesquisado profundamente, e suas perguntas começaram a tocar em territórios mais pessoais.

"O senhor perdeu seus pais aos 18 anos," ela disse suavemente. "Como isso moldou o homem que é hoje?"

Algo mudou em seus olhos. Por um momento, a máscara de controle escorregou, revelando uma dor antiga. "Isso está fora do escopo desta entrevista."

"Com todo respeito, Sr. Blackwood, seus leitores querem conhecer o homem por trás do império. Não apenas números e estratégias."

Marcus se levantou abruptamente, caminhando até a janela. O silêncio se estendeu por longos segundos. Quando ele finalmente falou, sua voz estava mais baixa, quase vulnerável.

"Meus pais morreram em um acidente de carro. Eu estava dirigindo." Ele pausou, e Emma prendeu a respiração. "Desde então, cada decisão que tomo, cada empresa que construo, é uma tentativa de provar que aquela noite não me definiu."

Emma sentiu lágrimas picarem seus olhos. Ela havia esperado uma resposta corporativa, não aquela honestidade crua.

"Obrigada por compartilhar isso," ela disse suavemente.

Marcus se virou, e seus olhos se encontraram. Algo passou entre eles - um reconhecimento, uma conexão que nenhum dos dois esperava.

"Seus 30 minutos acabaram, Senhorita Thompson."

Mas quando Emma se levantou para sair, ele a chamou. "Emma."

Era a primeira vez que ele usava seu primeiro nome.

"Sim?"

"Jantar. Amanhã à noite. Fora do registro."

Não era um pedido. Mas também não era apenas profissional.

Emma sabia que deveria recusar. Sabia que estava cruzando uma linha perigosa. Mas quando olhou para aqueles olhos cinza, viu algo que a jornalista nela reconheceu - uma história esperando para ser contada. E a mulher nela viu algo mais - um homem esperando para ser compreendido.

"Às oito?" ela ouviu sua própria voz responder.

Um pequeno sorriso tocou os lábios dele - o primeiro que ela via. "Às oito."

Enquanto Emma saía do prédio, ela sabia que sua vida havia mudado. Ela veio buscar uma história, mas talvez tivesse encontrado algo muito mais perigoso - uma conexão com um homem que o mundo inteiro queria desvendar, mas que ninguém realmente conhecia.

E Marcus, observando-a partir da janela, sentiu algo que não sentia há anos - esperança. Esperança de que talvez, apenas talvez, alguém pudesse ver além das cicatrizes e encontrar o homem que ele escondia do mundo.`,
        wordCount: 850,
        isPaid: false
      },
      { id: 2, title: "Jantar Perigoso", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 3, title: "A Manhã Seguinte", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1500, isPaid: true },
      { id: 4, title: "Segredos Revelados", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1800, isPaid: true },
      { id: 5, title: "A Traição", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 2000, isPaid: true }
    ]
  },
  {
    id: "2",
    title: "Paixão Sob as Estrelas",
    author: "Carolina Mendes",
    cover: "",
    rating: 4.6,
    chapters: 18,
    genre: "Romance",
    description: "Um romance celestial que transcende o tempo e o espaço.",
    views: "890",
    ageRating: "16+",
    tags: ["Romance", "Fantasia", "Destino"],
    synopsis: "Luna é uma astrônoma que dedica suas noites observando as estrelas. Quando conhece Orion, um misterioso fotógrafo que também ama a noite, ela descobre que algumas conexões são escritas nas estrelas. Mas Orion guarda um segredo que pode mudar tudo.",
    fullStory: [
      { id: 1, title: "Noite Estrelada", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true },
      { id: 2, title: "O Encontro Cósmico", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1300, isPaid: true },
      { id: 3, title: "Constelações do Coração", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1500, isPaid: true }
    ]
  },
  {
    id: "3",
    title: "Corações Entrelaçados",
    author: "Beatriz Costa",
    cover: "",
    rating: 4.7,
    chapters: 22,
    genre: "Romance",
    description: "Duas almas destinadas a se encontrarem, mesmo contra todas as probabilidades.",
    views: "1.5K",
    ageRating: "14+",
    tags: ["Romance", "Drama", "Destino"],
    synopsis: "Sofia e Gabriel cresceram em mundos completamente diferentes. Ela, uma artista de rua lutando para sobreviver. Ele, herdeiro de uma família tradicional. Quando seus caminhos se cruzam em um acidente inesperado, descobrem que o amor não conhece barreiras sociais.",
    fullStory: [
      { id: 1, title: "O Acidente", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true },
      { id: 2, title: "Mundos Diferentes", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1400, isPaid: true },
      { id: 3, title: "Primeiro Beijo", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1600, isPaid: true }
    ]
  },
  {
    id: "4",
    title: "Desejo Proibido: O Amigo do Meu Irmão",
    author: "Júlia Santos",
    cover: "",
    rating: 4.9,
    chapters: 30,
    genre: "Romance",
    description: "Quando o desejo encontra o proibido, as consequências são inevitáveis.",
    views: "2.1K",
    ageRating: "18+",
    tags: ["Romance", "Proibido", "Hot", "Drama"],
    synopsis: "Isabella sempre viu Diego como apenas o melhor amigo de seu irmão mais velho. Mas quando ela volta da faculdade transformada em uma mulher, Diego percebe que seus sentimentos mudaram completamente. O problema? Ele prometeu ao irmão dela que nunca a tocaria.",
    fullStory: [
      { id: 1, title: "O Retorno", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1300, isPaid: true },
      { id: 2, title: "Tensão Crescente", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1500, isPaid: true },
      { id: 3, title: "A Promessa Quebrada", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1800, isPaid: true }
    ]
  },
  {
    id: "5",
    title: "Noites Quentes em Paris",
    author: "Isabela Rodrigues",
    cover: "",
    rating: 4.5,
    chapters: 20,
    genre: "Romance",
    description: "Uma viagem a Paris que mudará tudo.",
    views: "1.3K",
    ageRating: "18+",
    tags: ["Romance", "Hot", "Internacional"],
    synopsis: "Valentina vai a Paris para esquecer um relacionamento fracassado. Lá, conhece Pierre, um chef francês irresistível que lhe mostra que o amor pode ser encontrado nos lugares mais inesperados. Entre vinhos, jantares românticos e noites apaixonadas, ela descobre que Paris é realmente a cidade do amor.",
    fullStory: [
      { id: 1, title: "Chegada em Paris", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 2, title: "O Chef Francês", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1400, isPaid: true },
      { id: 3, title: "Noite na Torre Eiffel", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1600, isPaid: true }
    ]
  },
  {
    id: "6",
    title: "Sedução no Escritório",
    author: "Mariana Alves",
    cover: "",
    rating: 4.7,
    chapters: 28,
    genre: "Romance",
    description: "Quando o profissional encontra o pessoal, as regras são quebradas.",
    views: "1.8K",
    ageRating: "18+",
    tags: ["Romance", "Hot", "Escritório", "Chefe"],
    synopsis: "Amanda é contratada como assistente executiva do CEO mais cobiçado da cidade, Rafael Monteiro. Ele é conhecido por sua frieza e profissionalismo impecável. Mas quando trabalham juntos em um projeto importante, a tensão entre eles se torna insuportável. O que acontece quando as portas do escritório se fecham?",
    fullStory: [
      { id: 1, title: "Primeiro Dia", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true },
      { id: 2, title: "Horas Extras", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1500, isPaid: true },
      { id: 3, title: "A Reunião Privada", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1700, isPaid: true }
    ]
  },
  {
    id: "7",
    title: "Sob a Lua Cheia: O Alfa e Sua Companheira",
    author: "Luna Ferreira",
    cover: "",
    rating: 4.8,
    chapters: 35,
    genre: "Fantasia",
    description: "Destinos entrelaçados sob a luz da lua cheia.",
    views: "2.5K",
    ageRating: "16+",
    tags: ["Fantasia", "Lobisomem", "Romance", "Sobrenatural"],
    synopsis: "Selene sempre soube que era diferente, mas nunca imaginou que era a companheira destinada do Alfa mais poderoso da América do Norte. Quando Dante a encontra, ele sabe imediatamente que ela é sua. Mas Selene não está pronta para aceitar seu destino, e Dante terá que provar que o vínculo entre eles é mais forte que qualquer medo.",
    fullStory: [
      { id: 1, title: "O Despertar", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1400, isPaid: true },
      { id: 2, title: "O Encontro com o Alfa", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1600, isPaid: true },
      { id: 3, title: "A Transformação", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1800, isPaid: true }
    ]
  },
  {
    id: "8",
    title: "A Maldição do Vampiro",
    author: "Dante Moraes",
    cover: "",
    rating: 4.6,
    chapters: 32,
    genre: "Fantasia",
    description: "Amor eterno tem seu preço.",
    views: "1.9K",
    ageRating: "18+",
    tags: ["Fantasia", "Vampiro", "Romance", "Dark"],
    synopsis: "Morgana é uma caçadora de vampiros que jurou vingar a morte de sua família. Mas quando conhece Lucian, um vampiro de 300 anos amaldiçoado a viver eternamente sem amor, tudo muda. Ele oferece informações sobre os assassinos de sua família em troca de sua ajuda para quebrar a maldição. Mas o preço pode ser mais alto do que ela imagina.",
    fullStory: [
      { id: 1, title: "A Caçadora", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1300, isPaid: true },
      { id: 2, title: "O Pacto", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1500, isPaid: true },
      { id: 3, title: "Sangue e Desejo", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1700, isPaid: true }
    ]
  },
  {
    id: "9",
    title: "Sangue e Lua: O Lobisomem Amaldiçoado",
    author: "Rafael Oliveira",
    cover: "",
    rating: 4.7,
    chapters: 28,
    genre: "Fantasia",
    description: "Uma maldição antiga, um amor impossível.",
    views: "1.7K",
    ageRating: "16+",
    tags: ["Fantasia", "Lobisomem", "Maldição", "Romance"],
    synopsis: "Kai é um lobisomem amaldiçoado a se transformar a cada lua cheia sem controle, matando tudo em seu caminho. Isolado da sociedade, ele vive sozinho até conhecer Aurora, uma bruxa que pode ser sua única salvação. Mas quebrar a maldição exige um sacrifício que nenhum dos dois está pronto para fazer.",
    fullStory: [
      { id: 1, title: "A Maldição", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 2, title: "A Bruxa", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1400, isPaid: true },
      { id: 3, title: "Ritual de Sangue", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1600, isPaid: true }
    ]
  },
  {
    id: "10",
    title: "Destino Cruel",
    author: "Camila Souza",
    cover: "",
    rating: 4.4,
    chapters: 25,
    genre: "Drama",
    description: "Quando o destino é implacável, o amor é a única salvação.",
    views: "1.1K",
    ageRating: "16+",
    tags: ["Drama", "Romance", "Superação"],
    synopsis: "Laura é diagnosticada com uma doença terminal aos 25 anos. Decidida a viver seus últimos meses intensamente, ela faz uma lista de desejos. No topo da lista: viver um grande amor. Quando conhece Theo, um médico que também carrega suas próprias cicatrizes, ela descobre que mesmo o tempo limitado pode ser preenchido com amor infinito.",
    fullStory: [
      { id: 1, title: "O Diagnóstico", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true },
      { id: 2, title: "A Lista", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1300, isPaid: true },
      { id: 3, title: "Encontrando Theo", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1500, isPaid: true }
    ]
  },
  {
    id: "11",
    title: "Lágrimas de Cristal",
    author: "Fernanda Lima",
    cover: "",
    rating: 4.5,
    chapters: 20,
    genre: "Drama",
    description: "Às vezes, as lágrimas são a única forma de cura.",
    views: "950",
    ageRating: "14+",
    tags: ["Drama", "Família", "Superação"],
    synopsis: "Após perder a mãe em um acidente, Clara se fecha emocionalmente e para de falar. Seu pai, desesperado, a leva para a casa da avó no interior, onde ela conhece Miguel, um garoto local que também carrega suas próprias dores. Juntos, eles aprendem que a cura vem quando permitimos que outros vejam nossas lágrimas.",
    fullStory: [
      { id: 1, title: "O Silêncio", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true },
      { id: 2, title: "A Casa da Avó", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 3, title: "Miguel", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1400, isPaid: true }
    ]
  },
  {
    id: "12",
    title: "Caminhos Cruzados",
    author: "Pedro Martins",
    cover: "",
    rating: 4.6,
    chapters: 24,
    genre: "Drama",
    description: "Três vidas, um destino entrelaçado.",
    views: "1.4K",
    ageRating: "16+",
    tags: ["Drama", "Destino", "Múltiplas Histórias"],
    synopsis: "Três pessoas completamente diferentes - um músico fracassado, uma executiva workaholic e um adolescente fugitivo - têm suas vidas entrelaçadas após um acidente de metrô. Enquanto lidam com as consequências, descobrem que seus destinos estavam conectados muito antes daquele dia fatídico.",
    fullStory: [
      { id: 1, title: "O Acidente", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1300, isPaid: true },
      { id: 2, title: "Três Histórias", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1500, isPaid: true },
      { id: 3, title: "Conexões Ocultas", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1600, isPaid: true }
    ]
  },
  {
    id: "13",
    title: "Mistério na Mansão Blackwood",
    author: "Arthur Campos",
    cover: "",
    rating: 4.7,
    chapters: 26,
    genre: "Mistério",
    description: "Segredos enterrados há décadas estão prestes a vir à tona.",
    views: "1.6K",
    ageRating: "14+",
    tags: ["Mistério", "Suspense", "Investigação"],
    synopsis: "A detetive Sarah Collins é chamada para investigar o desaparecimento de uma jovem herdeira na misteriosa Mansão Blackwood. Conforme investiga, ela descobre que a mansão guarda segredos sombrios de gerações passadas, e que o desaparecimento atual pode estar conectado a crimes não resolvidos de 50 anos atrás.",
    fullStory: [
      { id: 1, title: "O Chamado", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 2, title: "A Mansão", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1400, isPaid: true },
      { id: 3, title: "Primeiras Pistas", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1600, isPaid: true }
    ]
  },
  {
    id: "14",
    title: "A Última Testemunha",
    author: "Rodrigo Ferreira",
    cover: "",
    rating: 4.8,
    chapters: 30,
    genre: "Mistério",
    description: "Quando você é a única pessoa que sabe a verdade, o perigo é real.",
    views: "2.0K",
    ageRating: "16+",
    tags: ["Mistério", "Thriller", "Suspense"],
    synopsis: "Julia testemunha um assassinato, mas quando a polícia chega, não há corpo, não há evidências, e ninguém acredita nela. Determinada a provar que não está louca, ela começa sua própria investigação, sem saber que está entrando em uma conspiração muito maior e mais perigosa do que imaginava.",
    fullStory: [
      { id: 1, title: "A Testemunha", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1300, isPaid: true },
      { id: 2, title: "Ninguém Acredita", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1500, isPaid: true },
      { id: 3, title: "A Investigação", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1700, isPaid: true }
    ]
  },
  {
    id: "15",
    title: "Sombras do Passado",
    author: "Letícia Barros",
    cover: "",
    rating: 4.5,
    chapters: 22,
    genre: "Mistério",
    description: "O passado nunca fica realmente enterrado.",
    views: "1.2K",
    ageRating: "16+",
    tags: ["Mistério", "Psicológico", "Suspense"],
    synopsis: "Após herdar a casa de sua avó falecida, Marina começa a ter pesadelos perturbadores sobre eventos que nunca viveu. Quando descobre um diário escondido no sótão, ela percebe que os pesadelos são memórias reais de crimes que sua avó testemunhou décadas atrás - e o assassino ainda está vivo.",
    fullStory: [
      { id: 1, title: "A Herança", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true },
      { id: 2, title: "Pesadelos", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1300, isPaid: true },
      { id: 3, title: "O Diário", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1500, isPaid: true }
    ]
  },
  {
    id: "16",
    title: "Aventura na Amazônia",
    author: "Carlos Henrique",
    cover: "",
    rating: 4.6,
    chapters: 28,
    genre: "Aventura",
    description: "Uma expedição que mudará tudo.",
    views: "1.5K",
    ageRating: "12+",
    tags: ["Aventura", "Natureza", "Descoberta"],
    synopsis: "O biólogo Lucas lidera uma expedição à Amazônia em busca de uma espécie rara de planta medicinal. Acompanhado por uma equipe diversa, ele enfrenta perigos da selva, tribos isoladas e caçadores ilegais. Mas a maior descoberta não é a planta - é uma cidade perdida que pode reescrever a história da humanidade.",
    fullStory: [
      { id: 1, title: "A Expedição", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 2, title: "Na Selva", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1400, isPaid: true },
      { id: 3, title: "A Descoberta", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1600, isPaid: true }
    ]
  },
  {
    id: "17",
    title: "O Tesouro do Pirata",
    author: "Marina Azevedo",
    cover: "",
    rating: 4.4,
    chapters: 24,
    genre: "Aventura",
    description: "Um mapa antigo, um tesouro lendário, uma aventura épica.",
    views: "1.3K",
    ageRating: "10+",
    tags: ["Aventura", "Pirata", "Tesouro"],
    synopsis: "Quando o jovem Tom encontra um mapa antigo no sótão de seu avô, ele descobre que seu ancestral era um famoso pirata. Junto com seus amigos, ele embarca em uma aventura pelo Caribe em busca do lendário tesouro de Barba Negra, enfrentando tempestades, rivais perigosos e enigmas centenários.",
    fullStory: [
      { id: 1, title: "O Mapa", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true },
      { id: 2, title: "Navegando", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 3, title: "A Ilha", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1400, isPaid: true }
    ]
  },
  {
    id: "18",
    title: "Jornada ao Centro da Terra",
    author: "Eduardo Santos",
    cover: "",
    rating: 4.7,
    chapters: 32,
    genre: "Aventura",
    description: "Uma expedição impossível a um mundo desconhecido.",
    views: "1.8K",
    ageRating: "12+",
    tags: ["Aventura", "Ficção Científica", "Exploração"],
    synopsis: "A geóloga Ana descobre uma caverna que desafia todas as leis da física - ela parece não ter fim. Liderando uma equipe de cientistas, ela desce quilômetros abaixo da superfície e descobre um ecossistema impossível, com criaturas pré-históricas e uma civilização subterrânea que vive isolada há milênios.",
    fullStory: [
      { id: 1, title: "A Caverna", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1300, isPaid: true },
      { id: 2, title: "Descendo", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1500, isPaid: true },
      { id: 3, title: "O Mundo Subterrâneo", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1700, isPaid: true }
    ]
  },
  {
    id: "19",
    title: "Comédia de Erros no Casamento",
    author: "Patrícia Gomes",
    cover: "",
    rating: 4.5,
    chapters: 18,
    genre: "Comédia",
    description: "Quando tudo que pode dar errado, dá errado - e é hilário!",
    views: "1.1K",
    ageRating: "12+",
    tags: ["Comédia", "Romance", "Casamento"],
    synopsis: "Júlia está organizando o casamento dos sonhos, mas tudo começa a dar errado de forma espetacular: o bolo desaba, o noivo perde as alianças, a sogra briga com a mãe da noiva, e o padre fica preso no elevador. No meio do caos, ela percebe que talvez o casamento perfeito seja aquele cheio de imperfeições - e muito amor.",
    fullStory: [
      { id: 1, title: "O Planejamento", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true },
      { id: 2, title: "Tudo Dá Errado", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 3, title: "O Caos Total", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1400, isPaid: true }
    ]
  },
  {
    id: "20",
    title: "Meu Chefe é um Desastre",
    author: "Ricardo Nunes",
    cover: "",
    rating: 4.6,
    chapters: 22,
    genre: "Comédia",
    description: "Trabalhar nunca foi tão engraçado - e frustrante!",
    views: "1.4K",
    ageRating: "14+",
    tags: ["Comédia", "Escritório", "Romance"],
    synopsis: "Paula é contratada como assistente do CEO mais desorganizado e atrapalhado do mundo corporativo. Rodrigo pode ser um gênio nos negócios, mas na vida pessoal é um desastre completo. Entre reuniões caóticas, apresentações que dão errado e situações constrangedoras, Paula descobre que por trás do chefe desastrado existe um homem adorável - e ela está se apaixonando.",
    fullStory: [
      { id: 1, title: "Primeiro Dia", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true },
      { id: 2, title: "Desastres no Escritório", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1300, isPaid: true },
      { id: 3, title: "A Apresentação Catastrófica", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1500, isPaid: true }
    ]
  }
];

// Função helper para buscar livro por ID
export function getBookById(id: string): Book | undefined {
  return booksData.find(book => book.id === id);
}

// Função helper para buscar capítulo específico
export function getChapter(bookId: string, chapterId: number): Chapter | undefined {
  const book = getBookById(bookId);
  return book?.fullStory.find(chapter => chapter.id === chapterId);
}

// Função helper para buscar todos os livros por gênero
export function getBooksByGenre(genre: string): Book[] {
  if (genre === "Todos") return booksData;
  return booksData.filter(book => book.genre === genre);
}

// Função helper para buscar livros +18
export function getAdultBooks(): Book[] {
  return booksData.filter(book => book.ageRating === "18+");
}

// Função helper para obter todos os gêneros únicos
export function getAllGenres(): string[] {
  const genres = Array.from(new Set(booksData.map(book => book.genre)));
  return ["Todos", ...genres.sort()];
}
