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
    views: "2500000",
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
      {
        id: 2,
        title: "Jantar Perigoso",
        content: `Emma trocou de roupa pela quinta vez. O restaurante que Marcus havia escolhido era um dos mais exclusivos da cidade - o tipo de lugar onde reservas eram feitas com meses de antecedência. Ela finalmente decidiu por um vestido preto simples mas elegante, que sua melhor amiga Sarah havia insistido que ela comprasse.

"Você tem certeza disso?" Sarah perguntou, observando Emma aplicar batom. "Ele é seu objeto de reportagem, Em. Isso pode complicar tudo."

"É apenas um jantar," Emma respondeu, mas até ela não acreditava nas próprias palavras.

O restaurante era ainda mais impressionante do que ela imaginava. Luzes suaves, música ao vivo, e uma vista deslumbrante da cidade. Marcus já estava esperando, e quando ele se levantou ao vê-la, Emma notou que ele não estava usando terno - apenas uma camisa branca com as mangas dobradas, revelando antebraços fortes.

"Você está linda," ele disse, e havia algo em sua voz que fez o coração dela acelerar.

"Obrigada. Você também está... diferente."

"Diferente bom ou diferente ruim?" Um sorriso brincou em seus lábios.

"Diferente humano," Emma respondeu honestamente.

Eles se sentaram, e a tensão inicial começou a se dissipar. Marcus pediu vinho - um Bordeaux de 1982 que provavelmente custava mais que o aluguel de Emma.

"Então," Marcus começou, seus olhos fixos nela. "Sem gravadores, sem notebooks. Apenas nós dois."

"Isso é muito perigoso para um homem que valoriza sua privacidade."

"Talvez eu esteja cansado de viver atrás de muros."

A conversa fluiu naturalmente. Eles falaram sobre livros, viagens, sonhos. Emma descobriu que Marcus tinha um senso de humor seco e inteligente. Ele descobriu que ela tinha uma paixão por justiça que ia além do jornalismo.

"Por que você se tornou jornalista?" ele perguntou, servindo mais vinho.

Emma hesitou. Era uma história que ela raramente contava. "Meu pai era um whistleblower. Ele expôs corrupção em uma grande corporação. Eles o destruíram - sua carreira, sua reputação, nossa família. Eu tinha 15 anos quando ele teve um colapso nervoso." Ela pausou, surpreendida com sua própria honestidade. "Eu me tornei jornalista para dar voz àqueles que não podem se defender."

Marcus estendeu a mão sobre a mesa, cobrindo a dela. O toque foi elétrico. "Seu pai seria orgulhoso da mulher que você se tornou."

Lágrimas picaram os olhos de Emma. "Como você sabe?"

"Porque eu estou," ele disse simplesmente.

O momento foi interrompido pelo celular de Marcus vibrando insistentemente. Ele olhou a tela e seu rosto se fechou. "Desculpe, preciso atender."

Ele se afastou, e Emma não pôde deixar de notar a tensão em seus ombros enquanto ele falava. Quando voltou, a máscara estava de volta.

"Problemas?" ela perguntou.

"Sempre." Ele tomou um gole de vinho. "Emma, há coisas sobre mim... sobre minha empresa... que são complicadas."

"Eu posso lidar com complicado."

"Pode?" Seus olhos a desafiaram. "Minha empresa está sendo investigada. Há acusações de práticas antiéticas. Eu não fiz nada errado, mas há pessoas poderosas que querem me ver cair."

Emma sentiu seu instinto jornalístico despertar. "Quem?"

"Isso é o que eu preciso descobrir." Ele se inclinou para frente. "E é por isso que este jantar foi um erro. Porque quanto mais perto você chega de mim, mais perigo você corre."

"Eu não tenho medo."

"Deveria ter." Mas mesmo dizendo isso, sua mão ainda segurava a dela.

"Marcus," Emma disse suavemente. "Por que você realmente me convidou para jantar?"

Ele ficou em silêncio por um longo momento. Quando finalmente falou, sua voz estava rouca. "Porque quando você entrou no meu escritório ontem, foi a primeira vez em anos que eu senti algo além de vazio. E isso me aterroriza."

O coração de Emma batia tão forte que ela tinha certeza que ele podia ouvir. "Me aterroriza também."

"Então somos dois tolos," ele murmurou, levantando a mão dela e beijando seus dedos suavemente.

Naquele momento, Emma soube que havia cruzado uma linha da qual não havia volta. Ela não era mais apenas uma jornalista buscando uma história. Ela era uma mulher caindo por um homem que carregava segredos que poderiam destruir ambos.

"Leve-me para casa," ela sussurrou.

"Emma..."

"Apenas me leve para casa, Marcus. Podemos descobrir o resto amanhã."

Ele sinalizou para a conta, e minutos depois estavam no banco de trás de sua limusine. A tensão entre eles era palpável. Quando chegaram ao apartamento de Emma, Marcus a acompanhou até a porta.

"Boa noite, Emma," ele disse, mas não se moveu.

"Boa noite, Marcus."

Eles ficaram ali, a poucos centímetros um do outro, o ar carregado de possibilidades. Finalmente, Marcus se inclinou, e Emma pensou que ele fosse beijá-la. Mas em vez disso, ele beijou sua testa suavemente.

"Você merece alguém sem tantas sombras," ele murmurou contra sua pele.

"E se eu quiser as sombras junto com a luz?"

Ele se afastou, seus olhos escuros de emoção. "Então você é mais corajosa do que eu pensava."

Ele se virou para ir embora, mas Emma o segurou pelo braço. "Marcus, espere."

Ele olhou para ela, e naquele momento, Emma tomou a decisão que mudaria tudo. Ela se inclinou e o beijou.

Foi como se o mundo parasse. Marcus ficou imóvel por um segundo, e então suas mãos estavam em seu rosto, aprofundando o beijo. Era desesperado, faminto, como se ambos estivessem se afogando e o outro fosse ar.

Quando finalmente se separaram, ambos estavam sem fôlego.

"Entre," Emma sussurrou.

"Se eu entrar, não vou querer sair."

"Então não saia."

Marcus a puxou para outro beijo, e desta vez, quando a porta se fechou atrás deles, foi o começo de algo que nenhum dos dois poderia controlar - uma paixão que desafiaria tudo que eles pensavam saber sobre amor, lealdade e verdade.`,
        wordCount: 1200,
        isPaid: false
      },
      {
        id: 3,
        title: "A Manhã Seguinte",
        content: `Emma acordou com a luz do sol atravessando as cortinas. Por um momento, ela pensou ter sonhado tudo - o jantar, o beijo, a noite inteira. Mas então sentiu o peso do braço de Marcus ao redor de sua cintura e soube que era real.

Ela se virou cuidadosamente para observá-lo dormindo. No sono, ele parecia mais jovem, mais vulnerável. As linhas de tensão que normalmente marcavam seu rosto haviam suavizado. Ela resistiu ao impulso de traçar os contornos de seu rosto com os dedos.

Como se sentisse seu olhar, Marcus abriu os olhos. Por um momento, eles apenas se olharam, e Emma viu algo em seus olhos que a fez prender a respiração - ternura misturada com medo.

"Bom dia," ele murmurou, sua voz rouca de sono.

"Bom dia."

"Você se arrepende?" A pergunta era direta, mas Emma podia ouvir a vulnerabilidade por trás dela.

"Não. E você?"

Marcus a puxou mais perto, beijando sua testa. "Deveria. Mas não."

Eles ficaram assim por alguns minutos, apenas aproveitando a proximidade. Mas a realidade começou a se infiltrar quando o telefone de Marcus começou a tocar insistentemente.

"Merda," ele murmurou, alcançando o aparelho. Sua expressão mudou drasticamente ao ler as mensagens. "Emma, eu preciso ir."

"O que aconteceu?"

Ele se levantou, começando a se vestir rapidamente. "A investigação. Eles estão convocando uma reunião de emergência do conselho." Ele pausou, olhando para ela. "Emma, sobre ontem à noite..."

"Não," ela o interrompeu, sentando-se e puxando o lençol ao redor dela. "Não faça isso. Não transforme isso em um erro só porque a realidade voltou."

Marcus se sentou na beira da cama, pegando sua mão. "Não é um erro. É a coisa mais certa que eu fiz em anos. Mas é complicado."

"Eu sei que é complicado."

"Não, você não sabe." Ele passou a mão pelo cabelo, frustrado. "Emma, há coisas sobre mim, sobre minha empresa, que você não sabe. Coisas que, se você descobrir, podem mudar tudo."

"Então me conte."

"Não posso. Não ainda." Ele se levantou, terminando de se vestir. "Mas preciso que você confie em mim."

Emma sentiu um frio no estômago. "Marcus, eu sou jornalista. Meu trabalho é descobrir a verdade."

"E se a verdade destruir tudo entre nós?"

"Então pelo menos será honesto."

Eles se olharam, e Emma viu o conflito em seus olhos. Finalmente, ele se inclinou e a beijou suavemente. "Eu ligo para você."

Depois que ele saiu, Emma ficou sentada na cama, sua mente girando. Ela pegou seu laptop e começou a pesquisar. Se Marcus não ia contar a verdade, ela teria que descobrir por conta própria.

Horas depois, ela estava imersa em documentos financeiros, relatórios de investigação e artigos antigos. Havia algo ali - um padrão de aquisições agressivas, empresas menores sendo engolidas, funcionários sendo demitidos em massa. Mas havia também doações generosas para caridade, programas de bolsas de estudo, investimentos em comunidades carentes.

Marcus Blackwood era uma contradição - um homem que podia ser implacável nos negócios, mas que também tinha um lado compassivo que ele escondia do mundo.

Seu telefone tocou. Era Sarah.

"Então? Como foi o jantar com o bilionário misterioso?"

Emma hesitou. "Complicado."

"Complicado bom ou complicado ruim?"

"Ambos." Emma suspirou. "Sarah, eu acho que estou me metendo em algo muito maior do que eu imaginava."

"Você dormiu com ele, não foi?"

"Como você sabe?"

"Porque eu conheço você, Em. E pela sua voz, eu diria que não foi apenas sexo."

Emma fechou os olhos. "Não foi. Foi... intenso. Real. Assustador."

"E agora?"

"Agora eu preciso decidir se sigo meu coração ou minha carreira. Porque eu tenho a sensação de que não posso ter ambos."

Naquele momento, seu email apitou. Era de seu editor.

"Emma, precisamos conversar. Urgente. Há rumores de que você está envolvida pessoalmente com Marcus Blackwood. Se isso for verdade, você está fora da matéria. Ligue para mim."

Emma sentiu seu mundo desmoronar. Como eles já sabiam? Tinha sido apenas uma noite.

Seu telefone tocou novamente. Desta vez era Marcus.

"Emma, precisamos conversar. Agora."

"Eu também preciso falar com você."

"Meu escritório. Uma hora."

Quando Emma chegou à Blackwood Industries, a atmosfera era tensa. Funcionários sussurravam nos corredores, e ela podia sentir os olhares curiosos seguindo-a.

Marcus a esperava em seu escritório, mas ele não estava sozinho. Havia um homem mais velho com ele - cabelos grisalhos, terno impecável, expressão severa.

"Emma, este é Richard Thornton, meu advogado," Marcus disse, sua voz formal.

"Senhorita Thompson," Richard disse, sua voz fria. "Precisamos discutir a situação delicada em que você e o Sr. Blackwood se encontram."

Emma sentiu raiva subir. "Situação delicada? Você quer dizer o fato de que dois adultos tiveram um encontro?"

"Quero dizer o fato de que uma jornalista que está escrevendo uma matéria sobre meu cliente está agora pessoalmente envolvida com ele," Richard respondeu. "Isso levanta questões sérias sobre ética jornalística e possível conflito de interesses."

"Eu não pedi para isso acontecer," Emma disse, olhando para Marcus. "Nenhum de nós pediu."

"Mas aconteceu," Marcus disse suavemente. "E agora precisamos lidar com as consequências."

"Que consequências?" Emma perguntou, embora já soubesse a resposta.

"Você precisa escolher," Richard disse. "Ou você abandona a matéria, ou você abandona o relacionamento com o Sr. Blackwood."

Emma olhou para Marcus, esperando que ele protestasse, que dissesse que havia outra maneira. Mas ele permaneceu em silêncio, seus olhos inexpressivos.

"Marcus?" ela disse suavemente.

"Ele está certo, Emma. Não há outra maneira."

Emma sentiu como se tivesse levado um soco no estômago. "Então foi isso? Uma noite e acabou?"

"Não foi apenas uma noite para mim," Marcus disse, sua voz baixa. "Mas eu não posso pedir para você sacrificar sua carreira por mim."

"E se eu quiser fazer essa escolha?"

"Então você se arrependeria. Eventualmente, você me culparia por isso."

Lágrimas picaram os olhos de Emma. "Você não sabe disso."

"Eu sei." Marcus finalmente se moveu, caminhando até ela. "Emma, você é brilhante. Você tem um futuro incrível pela frente. Eu não vou ser o homem que tira isso de você."

"E se eu disser que você vale mais que qualquer matéria?"

"Então eu diria que você não me conhece tão bem quanto pensa." Havia dor em seus olhos. "Vá, Emma. Escreva sua matéria. Conte a verdade sobre mim - toda a verdade. Eu não vou interferir."

"Marcus..."

"Por favor." Sua voz quebrou ligeiramente. "Apenas vá."

Emma olhou para ele por um longo momento, memorizando cada detalhe de seu rosto. Então, com o coração partido, ela se virou e saiu.

Mas enquanto esperava o elevador, ela tomou uma decisão. Ela ia descobrir a verdade sobre Marcus Blackwood - não para a matéria, mas para ela mesma. Porque algo não estava certo. A maneira como ele a afastou, a presença do advogado, a urgência de tudo.

Marcus estava escondendo algo. E Emma ia descobrir o quê - mesmo que isso significasse arriscar seu coração novamente.

Porque uma coisa ela sabia com certeza: o que eles tinham era real demais para terminar assim. E ela não ia desistir sem lutar.`,
        wordCount: 1500,
        isPaid: false
      },
      // Capítulos 4-25 pagos (apenas títulos para mostrar que existem)
      { id: 4, title: "Segredos Revelados", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1400, isPaid: true },
      { id: 5, title: "A Conspiração", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 800, isPaid: true },
      { id: 6, title: "O Primeiro Golpe", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 700, isPaid: true },
      { id: 7, title: "Contra-Ataque", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 750, isPaid: true },
      { id: 8, title: "O Golpe Final", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 950, isPaid: true },
      { id: 9, title: "Reconstrução", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 500, isPaid: true },
      { id: 10, title: "Novos Começos", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 650, isPaid: true },
      { id: 11, title: "Desafios Inesperados", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 800, isPaid: true },
      { id: 12, title: "A Verdade Vem à Tona", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 900, isPaid: true },
      { id: 13, title: "Decisões Difíceis", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 750, isPaid: true },
      { id: 14, title: "Reconciliação", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 850, isPaid: true },
      { id: 15, title: "O Pedido", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 600, isPaid: true },
      { id: 16, title: "Preparativos", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 700, isPaid: true },
      { id: 17, title: "O Grande Dia", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true },
      { id: 18, title: "Lua de Mel", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 800, isPaid: true },
      { id: 19, title: "Novos Desafios", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 750, isPaid: true },
      { id: 20, title: "A Notícia", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 650, isPaid: true },
      { id: 21, title: "Expectativas", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 700, isPaid: true },
      { id: 22, title: "O Nascimento", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 900, isPaid: true },
      { id: 23, title: "Família Completa", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 800, isPaid: true },
      { id: 24, title: "Novos Horizontes", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 750, isPaid: true },
      { id: 25, title: "Para Sempre", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true }
    ]
  },
  {
    id: "17",
    title: "Desejo Proibido: O Amigo do Meu Irmão",
    author: "Scarlett Moon",
    cover: "",
    rating: 4.8,
    chapters: 18,
    genre: "Romance +18",
    description: "Uma jovem inocente descobre o mundo da paixão ao flagrar o amigo do irmão em um trisal intenso.",
    views: "4200000",
    ageRating: "18+",
    tags: ["Romance", "Erótico", "Trisal", "Proibido", "Descoberta Sexual"],
    synopsis: "Melissa Santos, 22 anos, sempre foi a irmã mais nova certinha e estudiosa. Mas tudo muda quando ela volta para casa mais cedo e flagra Ethan Pierce, o melhor amigo de seu irmão, em uma situação íntima com uma mulher e dois homens. Ethan, 28 anos, é tudo que ela sempre evitou - perigoso, sedutor e completamente inadequado. Mas a imagem daquela noite fica gravada em sua mente, despertando desejos que ela nem sabia que tinha. Quando Ethan descobre que ela os viu, em vez de ficar envergonhado, ele faz uma proposta indecente: ensinar Melissa tudo sobre prazer. Entre o proibido e o irresistível, Melissa terá que decidir se está disposta a arriscar tudo - incluindo a relação com seu irmão - por uma paixão que promete consumi-la completamente.",
    fullStory: [
      {
        id: 1,
        title: "A Descoberta Chocante",
        content: `Melissa estacionou seu carro na garagem, aliviada por ter terminado a prova mais cedo. Eram apenas 21h - ela tinha planejado ficar na biblioteca até meia-noite, mas a prova havia sido mais fácil que o esperado.

A casa estava em silêncio quando ela entrou. Seu irmão Ryan devia estar fora, como sempre. Aos 30 anos, ele era o oposto dela - sociável, festeiro, sempre cercado de amigos. Especialmente Ethan Pierce, seu melhor amigo desde a faculdade.

Melissa subiu as escadas, pensando em tomar um banho relaxante, quando ouviu sons vindos do quarto de hóspedes no final do corredor. Vozes baixas, risadas abafadas, e então... gemidos.

Seu primeiro instinto foi ignorar e ir para seu quarto. Mas a curiosidade - e algo mais que ela não queria nomear - a fez caminhar silenciosamente até a porta entreaberta.

O que ela viu a deixou paralisada.

Ethan Pierce estava na cama, completamente nu, em uma cena que desafiava tudo que ela conhecia. Uma mulher loira estava ao seu lado, mas não eram apenas eles dois. Havia dois homens também - um moreno musculoso e outro de cabelos castanhos. Os quatro estavam entrelaçados em uma dança sensual de corpos, mãos e bocas explorando sem pudor.

Melissa sentiu seu rosto queimar. Ela sabia que deveria sair, deveria correr para seu quarto e fingir que não tinha visto nada. Mas seus pés pareciam grudados no chão, seus olhos incapazes de se desviar da cena à sua frente.

Ethan era bonito - ela sempre soube disso. Alto, musculoso, com cabelos castanhos escuros e olhos azuis penetrantes. Mas vê-lo assim, completamente exposto e no comando, era algo totalmente diferente. Ele não parecia apenas estar sentindo prazer - ele estava no controle completo, suas mãos guiando os outros, sua voz baixa dando instruções que faziam todos obedecerem imediatamente.

"Assim," ele murmurou, sua voz rouca. "Mais devagar. Eu quero sentir cada segundo."

Melissa sentiu algo estranho se apertar em seu baixo ventre. Calor. Desejo. Coisas que ela raramente sentia, sempre tão focada em seus estudos, em ser a filha perfeita, a irmã responsável.

Foi quando Ethan abriu os olhos.

E olhou diretamente para ela.

Melissa congelou, seu coração parando. Por um segundo que pareceu uma eternidade, eles apenas se olharam. Então, para seu horror absoluto, Ethan sorriu - um sorriso lento, pecaminoso, que dizia claramente que ele sabia exatamente o que ela estava sentindo.

Melissa finalmente conseguiu se mover, correndo para seu quarto e trancando a porta. Seu coração batia tão forte que ela podia ouvi-lo. Suas mãos tremiam. E entre suas pernas... ela estava molhada.

"Oh Deus," ela sussurrou, encostando-se na porta. "O que está acontecendo comigo?"

Ela tomou um banho frio, tentando apagar as imagens de sua mente. Mas elas persistiam - o corpo de Ethan, suas mãos habilidosas, a maneira como ele comandava aquelas pessoas, o sorriso que ele havia dado quando a viu.

Melissa estava deitada na cama, ainda acordada às 2h da manhã, quando ouviu uma batida suave em sua porta.

"Melissa?" Era a voz de Ethan. "Eu sei que você está acordada."

Ela ficou imóvel, mal respirando.

"Precisamos conversar sobre o que você viu."

"Vá embora," ela finalmente disse, sua voz mais fraca que pretendia.

"Não até conversarmos."

"Não há nada para conversar. Eu não vi nada."

Uma risada baixa. "Nós dois sabemos que isso não é verdade."

Melissa se levantou, abrindo a porta apenas uma fresta. Ethan estava encostado no batente, usando apenas jeans, seu peito nu ainda levemente suado. Ele estava sozinho.

"Onde estão...?"

"Eles foram embora." Seus olhos azuis a estudavam com uma intensidade que a fazia se sentir nua. "Você está com medo de mim?"

"Não."

"Mentirosa." Ele deu um passo mais perto. "Seu coração está acelerado. Suas pupilas estão dilatadas. Você está respirando rápido."

"Você é o melhor amigo do meu irmão," Melissa disse, tentando soar firme. "Isso é inapropriado."

"Muitas coisas são inapropriadas, Melissa. Isso não as torna menos verdadeiras." Ele inclinou a cabeça. "Você gostou do que viu?"

"Eu... eu não..."

"Não minta. Eu vi seus olhos. Vi a maneira como você me olhou." Sua voz ficou mais baixa, mais íntima. "Vi a maneira como você apertou as coxas."

Melissa sentiu seu rosto queimar. "Você é arrogante."

"Não, eu sou observador. E eu observei você, Melissa Santos. A irmãzinha certinha do Ryan, sempre com o nariz nos livros, sempre fazendo tudo certo." Ele se inclinou mais perto, e ela podia sentir o calor de seu corpo. "Mas hoje à noite, eu vi algo diferente. Vi curiosidade. Desejo. Fome."

"Você está errado."

"Estou?" Sua mão subiu, seus dedos traçando suavemente sua mandíbula. Melissa deveria se afastar, mas estava paralisada. "Então por que você está tremendo? Por que seu pulso está acelerado? Por que você não está me mandando embora?"

"Ethan..." Sua voz saiu como um sussurro.

"Diga-me para ir embora, Melissa. Diga e eu vou. Mas se você não disser..." Seus lábios estavam a centímetros dos dela. "Se você não disser, eu vou beijá-la. E então vamos descobrir exatamente o que você quer."

Melissa sabia que deveria dizer não. Sabia que isso era loucura. Ethan era o melhor amigo de seu irmão, era oito anos mais velho, era completamente inadequado para ela.

Mas quando abriu a boca, o que saiu foi: "Não vá."

O sorriso de Ethan foi triunfante e predatório. "Boa garota."

E então ele a beijou.

Não foi como os poucos beijos que Melissa havia experimentado antes - desajeitados, molhados, sem graça. Isso foi... devastador. A boca de Ethan era quente e exigente, sua língua explorando, dominando. Suas mãos estavam em seu rosto, segurando-a no lugar enquanto ele a beijava como se estivesse faminto.

Melissa se ouviu gemer, suas mãos subindo para agarrar seus ombros. Ela nunca havia sido beijada assim, nunca havia sentido esse tipo de desejo consumindo cada célula de seu corpo.

Quando Ethan finalmente se afastou, ambos estavam sem fôlego.

"Isso foi um erro," Melissa sussurrou, mas suas mãos ainda estavam em seus ombros.

"Provavelmente," Ethan concordou, seus polegares traçando seus lábios inchados. "Mas vai acontecer de novo."

"Não pode."

"Vai." Seus olhos estavam escuros de promessa. "Porque agora que eu provei você, agora que eu sei como você responde ao meu toque, eu não vou conseguir parar. E você também não."

"Você é arrogante."

"Não, eu sou honesto." Ele se inclinou, beijando seu pescoço suavemente. "Você quer saber como é, Melissa? Quer experimentar as coisas que viu hoje à noite?"

"Eu... eu não sei."

"Mentirosa." Ele mordiscou seu lóbulo, fazendo-a arfar. "Mas tudo bem. Eu posso esperar. Eu posso ser paciente." Ele se afastou, e Melissa quase protestou pela perda de contato. "Mas quando você estiver pronta, quando você admitir o que quer, eu vou te ensinar tudo. Cada toque, cada beijo, cada maneira de sentir prazer."

"E se eu nunca estiver pronta?"

Ethan sorriu, aquele sorriso pecaminoso que fazia seu estômago se apertar. "Você vai estar. Boa noite, Melissa."

Ele se virou para ir embora, mas ela o chamou. "Ethan?"

"Sim?"

"Meu irmão não pode saber."

"Nosso segredo." Ele piscou. "Por enquanto."

Depois que ele saiu, Melissa encostou-se na porta, seu corpo ainda tremendo. O que ela havia feito? O que ela estava pensando?

Mas enquanto se deitava na cama, tudo que ela conseguia pensar era no beijo de Ethan, em suas promessas, na maneira como ele a fazia sentir coisas que ela nunca havia sentido antes.

Ela estava em território perigoso. Mas pela primeira vez em sua vida certinha e planejada, Melissa Santos estava disposta a correr o risco.

Porque Ethan Pierce havia despertado algo nela. E agora que estava acordado, ela não sabia se conseguiria fazer voltar a dormir.`,
        wordCount: 1700,
        isPaid: false
      },
      {
        id: 2,
        title: "Jogo Perigoso",
        content: `Os próximos dias foram uma tortura deliciosa. Ethan estava sempre por perto - jantando com Ryan, assistindo jogos na sala, trabalhando em seu laptop na cozinha. E sempre, sempre, seus olhos encontravam os de Melissa, carregados de promessas não ditas.

"Mel, você está bem?" Ryan perguntou no jantar de sexta-feira. "Você está vermelha."

"Estou bem," ela mentiu, evitando o olhar divertido de Ethan do outro lado da mesa. "Só um pouco cansada."

"Você trabalha demais," Ethan disse casualmente. "Deveria relaxar mais. Aproveitar a vida."

Havia um duplo sentido em suas palavras que fez Melissa engasgar com sua água.

"Você está certo," Ryan concordou, completamente alheio. "Mel, por que você não sai com a gente amanhã? Vamos para aquele novo clube no centro."

"Eu não sei..."

"Vamos, vai ser divertido," Ethan disse, seus olhos fixos nela. "Você pode usar aquele vestido preto que eu sei que você tem. Aquele que realça suas curvas perfeitamente."

Melissa o encarou, chocada. Como ele sabia sobre o vestido?

"Eu vi quando sua mãe mostrou fotos da formatura," ele explicou com um sorriso inocente. "Você estava linda."

"Decidido então," Ryan disse. "Amanhã, 22h. Vista algo sexy, Mel. Está na hora de você se divertir um pouco."

Naquela noite, Melissa estava em seu quarto quando seu telefone vibrou. Mensagem de número desconhecido:

"Use o vestido preto. E nada por baixo. - E"

Seu coração disparou. Ela deveria estar indignada, deveria bloqueá-lo. Em vez disso, ela se pegou respondendo:

"Você é impossível."

A resposta veio imediatamente:

"E você está excitada só de pensar nisso. Boa noite, gatinha. Sonhe comigo."

Melissa jogou o telefone na cama, seu rosto queimando. Mas enquanto se deitava, ela não conseguia parar de pensar na mensagem dele, na ideia de usar o vestido sem nada por baixo, de Ethan sabendo disso...

Ela adormeceu com pensamentos pecaminosos e acordou molhada e frustrada.

No sábado à noite, Melissa se arrumou com cuidado. O vestido preto era justo, curto, com decote generoso. Ela se olhou no espelho, debatendo.

Seria loucura seguir a instrução de Ethan. Mas...

Antes que pudesse mudar de ideia, ela tirou a calcinha e o sutiã, vestindo apenas o vestido e saltos altos.

"Você está incrível!" Ryan disse quando ela desceu. "Minha irmãzinha cresceu."

Ethan não disse nada. Mas seus olhos percorreram seu corpo lentamente, e quando encontraram os dela, estavam escuros de desejo e aprovação.

O clube estava lotado, música alta, luzes piscando. Ryan desapareceu para encontrar amigos, deixando Melissa e Ethan sozinhos no bar.

"Você obedeceu," Ethan murmurou em seu ouvido, sua mão pousando casualmente em sua cintura. "Boa garota."

"Como você sabe?"

"Eu sei." Seus dedos traçaram a lateral de seu corpo, confirmando a ausência de linhas de calcinha. "E agora eu vou passar a noite toda imaginando o que está debaixo desse vestido."

Melissa tremeu. "Ethan..."

"Dance comigo."

Não era um pedido. Ele a levou para a pista de dança, puxando-a contra seu corpo. A música era lenta, sensual, e Ethan a segurava perto demais, suas mãos baixas demais em suas costas.

"Você está brincando com fogo," Melissa sussurrou.

"Eu sei. Mas você gosta." Sua boca estava em seu ouvido. "Você gosta de ser má, de fazer coisas que não deveria. Eu posso sentir."

"Meu irmão está aqui."

"Eu sei. Isso te excita mais, não é? O perigo de sermos pegos."

Melissa não podia negar. Havia algo emocionante em estar tão perto de Ethan, em sentir seu corpo contra o dela, sabendo que Ryan estava a apenas alguns metros de distância.

"Eu quero te mostrar algo," Ethan disse de repente.

"O quê?"

"Confie em mim."

Ele a levou para fora do clube, para um beco lateral. Era escuro, privado, apenas o som abafado da música vindo de dentro.

"Ethan, o que..."

Ele a pressionou contra a parede, suas mãos em ambos os lados de sua cabeça. "Eu não consigo mais esperar. Eu preciso te tocar."

"Aqui? Agora?"

"Aqui. Agora." Sua mão deslizou pela lateral de sua coxa, subindo sob o vestido. "Diga-me para parar."

Melissa sabia que deveria. Mas quando os dedos dele encontraram sua pele nua, ela apenas gemeu.

"Tão molhada," ele murmurou, seus dedos explorando. "Você esteve assim a noite toda?"

"Sim," ela admitiu, sem fôlego.

"Por minha causa?"

"Sim."

"Boa garota." Ele a beijou, profundo e exigente, enquanto seus dedos trabalhavam magia. Melissa se agarrou a seus ombros, perdida em sensações.

Foi rápido, intenso, avassalador. Quando ela finalmente caiu, Ethan a segurou, beijando seu pescoço suavemente.

"Isso é apenas o começo," ele prometeu. "Quando eu realmente te tiver, vai ser muito melhor."

Eles voltaram para o clube como se nada tivesse acontecido. Mas Melissa estava mudada. Ela havia cruzado uma linha, e não havia volta.

E a parte assustadora? Ela não queria voltar.

Ela queria mais. Muito mais.

E Ethan estava mais do que disposto a dar.`,
        wordCount: 1100,
        isPaid: false
      },
      {
        id: 3,
        title: "Limites Testados",
        content: `A semana seguinte foi um jogo de gato e rato. Ethan continuava aparecendo na casa, sempre com alguma desculpa para ver Ryan. Mas seus olhos sempre encontravam Melissa, e cada olhar era uma promessa silenciosa.

Na quarta-feira à noite, Melissa estava estudando na sala quando Ethan apareceu.

"Ryan está?" ele perguntou, mas seus olhos diziam que ele já sabia a resposta.

"Ele saiu. Não volta até tarde."

"Que pena." Ethan entrou, fechando a porta atrás de si. "Então estamos sozinhos."

Melissa deveria ter medo. Deveria mandá-lo embora. Mas em vez disso, ela fechou seu livro. "O que você quer, Ethan?"

"Você sabe o que eu quero." Ele se aproximou, e Melissa sentiu seu coração acelerar. "A questão é: você está pronta para admitir que quer a mesma coisa?"

"Eu não sei o que você está falando."

"Não?" Ele se ajoelhou na frente dela, suas mãos em suas coxas. "Então por que você está tremendo? Por que suas pupilas estão dilatadas? Por que você não está me mandando embora?"

"Ethan..."

"Diga-me para parar, Melissa. Diga e eu paro." Suas mãos subiram lentamente por suas coxas. "Mas se você não disser nada, eu vou continuar. E desta vez, eu não vou parar até você implorar."

Melissa deveria dizer não. Mas quando abriu a boca, nenhum som saiu.

Ethan sorriu, aquele sorriso predatório que a fazia derreter. "Boa garota."

O que se seguiu foi uma masterclass em sedução. Ethan a tocou, a beijou, a explorou de maneiras que ela nunca havia imaginado. Ele a levou à beira várias vezes, apenas para puxá-la de volta, ensinando-a sobre antecipação, sobre desejo, sobre rendição.

Quando ela finalmente implorou - "Por favor, Ethan, por favor" - ele a recompensou com um prazer tão intenso que ela viu estrelas.

Depois, enquanto ela recuperava o fôlego, Ethan a segurou, beijando sua testa suavemente.

"Você é incrível," ele murmurou. "Tão responsiva. Tão perfeita."

"Ethan, o que estamos fazendo?" Melissa perguntou, sua voz pequena.

"Estamos explorando. Descobrindo. Vivendo." Ele a fez olhá-lo. "Mas se você quiser parar, nós paramos. Sem ressentimentos."

"Eu não quero parar," ela admitiu. "Mas tenho medo."

"De quê?"

"De que isso acabe mal. De que Ryan descubra. De que eu me machuque."

Ethan ficou em silêncio por um momento. "Eu não posso prometer que será fácil. Mas posso prometer que serei honesto com você. E que farei tudo ao meu alcance para proteger você."

"Como?"

"Sendo cuidadoso. Discreto. E sempre, sempre colocando seu bem-estar em primeiro lugar."

Melissa o estudou. "Por que você está fazendo isso? Por que eu?"

"Porque você me fascina. Porque você é diferente de qualquer mulher que eu já conheci. E porque..." ele hesitou, "porque eu me importo com você. Mais do que deveria."

O coração de Melissa se apertou. "Ethan..."

"Não diga nada agora. Apenas... pense sobre isso. Sobre nós. Sobre o que você quer."

Ele se levantou para ir embora, mas Melissa o segurou. "Fique. Só mais um pouco."

Ethan sorriu, voltando para o sofá e puxando-a para seus braços. "Okay. Só mais um pouco."

Eles ficaram assim, entrelaçados, até ouvirem o carro de Ryan chegando. Então, relutantemente, se separaram, voltando para seus papéis de sempre - o amigo do irmão e a irmã mais nova.

Mas algo havia mudado. E ambos sabiam que não havia volta.`,
        wordCount: 750,
        isPaid: false
      },
      // Capítulos 4-18 pagos
      { id: 4, title: "Segredos Compartilhados", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 900, isPaid: true },
      { id: 5, title: "A Primeira Vez", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1500, isPaid: true },
      { id: 6, title: "Descoberta Perigosa", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 800, isPaid: true },
      { id: 7, title: "Confronto", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 950, isPaid: true },
      { id: 8, title: "Escolhas Difíceis", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 850, isPaid: true },
      { id: 9, title: "Reconciliação", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 700, isPaid: true },
      { id: 10, title: "Novos Limites", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 11, title: "Paixão Intensa", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1400, isPaid: true },
      { id: 12, title: "Revelações", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 900, isPaid: true },
      { id: 13, title: "Aceitação", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 800, isPaid: true },
      { id: 14, title: "Juntos Oficialmente", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 750, isPaid: true },
      { id: 15, title: "Desafios Externos", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 850, isPaid: true },
      { id: 16, title: "Superando Obstáculos", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 900, isPaid: true },
      { id: 17, title: "O Pedido", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true },
      { id: 18, title: "Para Sempre", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true }
    ]
  },
  {
    id: "19",
    title: "Sob a Lua Cheia: O Alfa e Sua Companheira",
    author: "Luna Silvermoon",
    cover: "",
    rating: 4.9,
    chapters: 24,
    genre: "Romance Paranormal",
    description: "Uma humana comum descobre que é a companheira destinada do Alfa mais poderoso e temido.",
    views: "5800000",
    ageRating: "18+",
    tags: ["Lobisomem", "Romance", "Paranormal", "Alfa", "Destino", "Paixão"],
    synopsis: "Aria Winters, 23 anos, sempre acreditou que lobisomens eram apenas lendas. Até a noite em que foi atacada na floresta e salva por um lobo gigante de olhos dourados. Quando acorda, descobre que está na mansão de Kael Blackthorn, o Alfa da matilha mais poderosa da América do Norte. Kael, 30 anos, é conhecido por sua frieza e brutalidade, mas quando seus olhos encontram os de Aria, ele sente algo que nunca sentiu antes - o vínculo de companheiros destinados. Mas aceitar uma humana como Luna vai contra todas as tradições da matilha, e há aqueles que farão qualquer coisa para impedir essa união. Entre a atração magnética que os une e os perigos que os cercam, Aria e Kael terão que lutar não apenas por seu amor, mas por suas próprias vidas.",
    fullStory: [
      {
        id: 1,
        title: "Noite de Lua Cheia",
        content: `Aria Winters sabia que não deveria estar na floresta àquela hora da noite. Mas seu carro havia quebrado na estrada, e a única opção era caminhar até a cidade mais próxima. O GPS do celular indicava um atalho pela floresta - apenas três quilômetros.

O que poderia dar errado?

A lua cheia iluminava o caminho, mas também criava sombras sinistras entre as árvores. Aria acelerou o passo, seu coração batendo mais rápido a cada ruído estranho.

Foi quando ela ouviu o rosnado.

Ela congelou, virando-se lentamente. Três pares de olhos brilhavam na escuridão - amarelos, predatórios, famintos. Não eram cães. Eram grandes demais, selvagens demais.

Eram lobos.

Aria correu. Não pensou, apenas correu, seu coração batendo tão forte que ela podia ouvi-lo. Os lobos a perseguiram, seus rosnados cada vez mais próximos. Ela podia sentir seu hálito quente em suas pernas.

Um deles a derrubou, e Aria gritou, caindo no chão. Ela se virou, vendo as mandíbulas se abrirem, prestes a...

Um rugido ecoou pela floresta - tão alto, tão poderoso que fez as árvores tremerem. Os três lobos recuaram, uivando de medo.

E então ele apareceu.

Um lobo gigante, maior que qualquer animal que Aria já havia visto. Seu pelo era negro como a noite, mas seus olhos... seus olhos eram dourados, brilhando com uma inteligência que não era animal.

O lobo negro atacou os outros três com uma ferocidade brutal. Foi rápido, violento, e quando terminou, os três lobos fugiram, feridos e derrotados.

O lobo negro se virou para Aria, e ela deveria estar aterrorizada. Mas quando seus olhos se encontraram, ela sentiu algo estranho - uma conexão, um reconhecimento, como se ela o conhecesse de algum lugar.

O lobo se aproximou lentamente, e Aria ficou imóvel. Ele cheirou seu pescoço, seu hálito quente contra sua pele. Então, gentilmente, lambeu o ferimento em seu braço onde um dos lobos havia arranhado.

"Obrigada," Aria sussurrou, sem saber por que estava falando com um animal.

O lobo a olhou por mais um momento, então se afastou, desaparecendo na floresta.

Aria tentou se levantar, mas suas pernas cederam. A adrenalina estava passando, e ela percebeu que estava sangrando mais do que pensava. Sua visão começou a escurecer.

A última coisa que ela viu antes de desmaiar foram aqueles olhos dourados voltando para ela.

Quando Aria acordou, não estava na floresta. Estava em uma cama enorme, em um quarto luxuoso que parecia saído de uma revista. Lençóis de seda, móveis antigos, e uma lareira crepitante.

"Você está acordada."

Aria se virou rapidamente, arrependendo-se imediatamente quando sua cabeça latejou. Um homem estava sentado em uma poltrona perto da lareira, observando-a.

E que homem.

Ele era alto - facilmente 1,95m - com ombros largos e músculos que eram visíveis mesmo sob a camisa casual. Cabelos negros caíam em ondas até seus ombros, e seu rosto... era como se tivesse sido esculpido por um artista. Mandíbula forte, lábios cheios, e olhos...

Olhos dourados.

Os mesmos olhos do lobo.

"Você," Aria sussurrou, seu coração acelerando. "Você era o lobo."

O homem não negou. Ele se levantou, caminhando até a cama com uma graça predatória que confirmava suas suspeitas. "Meu nome é Kael Blackthorn. E sim, eu era o lobo que te salvou."

"Lobisomens são reais," Aria disse, mais para si mesma que para ele. "Lobisomens são reais."

"Sim." Kael se sentou na beira da cama, e Aria deveria estar com medo, mas não estava. "E você está em meu território. Na minha casa. Sob minha proteção."

"Por quê? Por que você me salvou?"

Kael ficou em silêncio por um longo momento, seus olhos estudando-a com uma intensidade que a fazia se sentir nua. "Porque você é minha."

"Sua? Eu não sou de ninguém."

"Você é minha companheira." Ele disse as palavras como se fossem um fato, não uma opinião. "Minha companheira destinada. Eu senti no momento que nossos olhos se encontraram."

Aria deveria rir, deveria pensar que ele era louco. Mas havia algo em sua voz, em seus olhos, que a fazia acreditar. "Eu não entendo."

"Lobisomens têm companheiros - uma pessoa destinada a eles pelo destino. Quando nos encontramos, há um vínculo, uma conexão que não pode ser negada." Seus olhos se suavizaram ligeiramente. "Você sentiu, não sentiu? Na floresta, quando nossos olhos se encontraram."

Aria não podia negar. Ela havia sentido algo - uma atração magnética, um reconhecimento profundo. "Mas eu sou humana."

"Eu sei." E havia algo em sua voz - conflito, talvez, ou preocupação. "E isso complica tudo."

"Por quê?"

"Porque eu sou o Alfa da matilha Blackthorn. A matilha mais poderosa da América do Norte. E aceitar uma humana como Luna - como minha companheira - vai contra séculos de tradição."

"Então me deixe ir," Aria disse, embora algo dentro dela protestasse contra a ideia. "Eu não pedi por isso. Eu não quero complicar sua vida."

Kael rosnou - um som baixo, gutural, que fez algo se apertar no baixo ventre de Aria. "Você não entende. Agora que eu te encontrei, agora que eu sei que você é minha, eu não posso deixar você ir. Meu lobo não permitiria. Eu não permitiria."

"Você não pode me manter aqui contra minha vontade."

"Não posso?" Seus olhos brilharam dourados por um momento. "Você está em meu território, cercada por minha matilha. Você não tem carro, não tem telefone que funcione aqui. E há lobos rogues lá fora que tentaram te matar. Você acha que eu vou deixar você sair desprotegida?"

Aria sentiu raiva subir. "Então eu sou sua prisioneira?"

"Você é minha companheira," Kael corrigiu. "E eu vou proteger você, mesmo que você lute contra mim."

"Eu não quero ser protegida. Eu quero ir para casa."

Kael se levantou, e Aria viu frustração em seus olhos. "Você não entende o perigo que está correndo. Aqueles lobos que te atacaram? Eles eram rogues - lobos sem matilha, sem controle. E eles vão voltar. Porque agora que você carrega meu cheiro, agora que você está marcada como minha, você é um alvo."

"Marcada? Eu não estou marcada."

Kael apontou para seu pescoço. "Quando eu lambi seu ferimento, eu te marquei com meu cheiro. Todo lobisomem que chegar perto de você vai saber que você é minha."

Aria levou a mão ao pescoço, sentindo o local onde o lobo - onde Kael - havia lambido. "Você não tinha direito."

"Eu tinha todo o direito. Você é minha companheira."

"Pare de dizer isso!" Aria explodiu. "Eu não sou sua! Eu não pedi por isso! Eu só quero voltar para minha vida normal!"

Kael a olhou por um longo momento, e Aria viu algo em seus olhos - dor, talvez, ou decepção. "Sua vida normal acabou no momento que você entrou na floresta. No momento que nossos olhos se encontraram. Você pode lutar contra isso, pode me odiar por isso, mas não muda o fato de que você é minha. E eu sou seu."

Ele se virou para sair, mas parou na porta. "Descanse. Amanhã, vamos conversar sobre o que acontece agora. Mas por enquanto, saiba disso - eu vou proteger você com minha vida. Porque você é a coisa mais preciosa que eu já tive."

Depois que ele saiu, Aria ficou sozinha com seus pensamentos. Parte dela queria fugir, queria negar tudo que havia acontecido. Mas outra parte - uma parte que ela não queria admitir - estava curiosa. Curiosa sobre Kael, sobre lobisomens, sobre esse vínculo que ele dizia existir entre eles.

Porque se ela fosse honesta consigo mesma, ela havia sentido algo quando seus olhos se encontraram. Algo poderoso, algo inevitável.

E isso a assustava mais do que qualquer lobo poderia.`,
        wordCount: 1600,
        isPaid: false
      },
      {
        id: 2,
        title: "O Alfa e a Luna",
        content: `Aria acordou com o sol entrando pela janela. Por um momento, ela pensou ter sonhado tudo - lobisomens, Kael, o ataque. Mas então viu o curativo em seu braço e soube que era real.

Ela se levantou, explorando o quarto. Havia roupas novas em um armário - todas em seu tamanho, o que era perturbador. Como Kael sabia seu tamanho?

Depois de se vestir, ela abriu a porta cautelosamente. O corredor era longo, com várias portas e escadas no final. Ela desceu, seguindo o som de vozes.

A mansão era ainda mais impressionante à luz do dia. Tetos altos, móveis antigos, e obras de arte que provavelmente valiam uma fortuna. Mas o que mais chamou sua atenção foram as pessoas.

Havia pelo menos vinte pessoas na sala de estar - homens e mulheres de todas as idades. E todos pararam de falar quando ela entrou, seus olhos se virando para ela.

"Ela é humana," uma mulher loira disse, seu tom cheio de desdém. "O Alfa trouxe uma humana para nossa casa."

"Ela é mais que isso," uma voz profunda disse, e Aria viu Kael entrando pela porta oposta. Ele usava jeans e uma camisa preta que realçava seus músculos. "Ela é minha companheira."

O silêncio foi ensurdecedor. Então, todos começaram a falar ao mesmo tempo.

"Isso é impossível!"

"Uma humana não pode ser Luna!"

"Isso vai contra todas as nossas tradições!"

Kael rosnou - um som tão poderoso que fez todos se calarem imediatamente. "Eu sou o Alfa. E eu digo que ela é minha companheira. Alguém quer questionar isso?"

Ninguém falou, mas Aria podia ver a desaprovação em seus rostos.

"Bom." Kael caminhou até Aria, pegando sua mão. A eletricidade do toque a fez arfar. "Aria, estes são membros da minha matilha. Matilha, esta é Aria Winters. Minha companheira. Sua futura Luna."

"Eu não concordei com isso," Aria sussurrou, mas apenas Kael ouviu.

"Você vai concordar," ele respondeu baixinho, seus olhos fixos nos dela. "Eventualmente."

Ele a levou para fora, para um terraço que dava para uma floresta densa. "Desculpe por isso. Eles vão se acostumar."

"Eles me odeiam."

"Eles têm medo. Medo de mudança, medo do desconhecido." Kael se virou para ela. "Mas eles vão aprender a te respeitar. Porque você é forte. Eu posso sentir."

"Como você pode sentir algo sobre mim? Você mal me conhece."

"Eu conheço tudo que preciso saber. Você é corajosa - você enfrentou três lobos rogues sem desmaiar de medo. Você é inteligente - posso ver em seus olhos. E você é minha."

"Pare de dizer isso."

"Por quê? Porque te assusta? Porque faz você sentir coisas que não quer sentir?"

Aria o encarou. "Você é arrogante."

"Eu sou Alfa. Vem com o território." Ele deu um passo mais perto. "Mas eu também sou honesto. E a verdade é que eu te quero, Aria. Não apenas porque você é minha companheira, mas porque há algo em você que me fascina."

"Você não me conhece."

"Então me deixe conhecer você." Sua mão subiu, traçando sua mandíbula suavemente. "Fique. Apenas por uma semana. Conheça minha matilha, conheça meu mundo. E então, se você ainda quiser ir embora, eu não vou te impedir."

"Você promete?"

Kael hesitou, e Aria viu o conflito em seus olhos. "Eu prometo que vou tentar. Mas meu lobo... ele não vai querer deixar você ir. E eu não sei se vou conseguir controlá-lo."

Era a coisa mais honesta que ele havia dito, e Aria apreciou isso. "Uma semana. Mas você tem que me dar espaço. Sem me forçar a nada."

"Concordo. Mas..." ele se inclinou, seu hálito quente contra seu ouvido, "eu não vou esconder o que sinto. Eu vou te cortejar, Aria Winters. E no final dessa semana, você vai querer ficar."

"Você é muito confiante."

"Eu sou Alfa." Ele sorriu, e Aria sentiu seu coração pular. "E eu sempre consigo o que quero."

Nos dias seguintes, Kael foi fiel à sua palavra. Ele lhe deu espaço, mas também estava sempre por perto. Ele a apresentou aos membros da matilha, explicou sobre a hierarquia, sobre as tradições.

Aria aprendeu que lobisomens viviam em matilhas, lideradas por um Alfa e uma Luna. Que eles podiam se transformar à vontade, mas eram mais fortes durante a lua cheia. Que companheiros eram sagrados, um vínculo que não podia ser quebrado.

E ela aprendeu sobre Kael. Que ele havia se tornado Alfa aos 25 anos, quando seu pai morreu. Que ele era temido e respeitado por todas as matilhas. Que ele nunca havia encontrado sua companheira até ela.

"Por que você nunca encontrou sua companheira antes?" Aria perguntou uma noite, enquanto jantavam sozinhos.

"Porque o destino estava esperando por você," Kael respondeu simplesmente. "Eu procurei por anos. Conheci centenas de lobas. Mas nenhuma era você."

"E se eu não for o que você espera?"

"Você já é mais do que eu esperava." Seus olhos estavam intensos. "Você me desafia, me questiona, não se intimida com meu poder. Você é perfeita."

Aria sentiu seu rosto esquentar. "Você mal me conhece."

"Então me deixe conhecer você melhor." Ele estendeu a mão. "Dance comigo."

Não havia música, mas Aria pegou sua mão mesmo assim. Kael a puxou para perto, e eles dançaram em silêncio, apenas o som de seus corações batendo juntos.

"Aria," Kael murmurou, seu rosto perto do dela. "Posso te beijar?"

Ela deveria dizer não. Deveria manter distância. Mas quando olhou para aqueles olhos dourados, tudo que ela conseguiu fazer foi assentir.

O beijo foi suave, quase reverente. Mas quando Aria respondeu, aprofundando o beijo, Kael rosnou, puxando-a mais perto. Foi intenso, apaixonado, e quando finalmente se separaram, ambos estavam sem fôlego.

"Fica," Kael sussurrou. "Não apenas por uma semana. Fica para sempre."

E pela primeira vez, Aria considerou seriamente a possibilidade.

Porque talvez, apenas talvez, ela havia encontrado onde pertencia.`,
        wordCount: 1300,
        isPaid: false
      },
      {
        id: 3,
        title: "Perigos na Escuridão",
        content: `A semana passou rápido demais. Aria se viu se acostumando com a vida na mansão, com a matilha, com Kael. Ele era atencioso, protetor, mas também respeitava seu espaço quando ela precisava.

Mas nem tudo era perfeito. Havia membros da matilha que ainda a viam com desconfiança. Especialmente Lydia, a loba loira que havia falado contra ela no primeiro dia.

"Você não pertence aqui," Lydia disse uma tarde, quando Aria estava sozinha na biblioteca.

"Kael discorda."

"Kael está cego pelo vínculo de companheiros. Mas o resto de nós vê a verdade - você é fraca, humana, inadequada para ser nossa Luna."

Aria se levantou, encarando a loba. "Então me teste. Prove que eu sou fraca."

Lydia sorriu, mas não era um sorriso amigável. "Cuidado com o que você deseja, humana."

Naquela noite, Kael a levou para uma corrida pela floresta. Ele se transformou em seu lobo, e Aria montou em suas costas, sentindo o vento em seu rosto enquanto ele corria.

Foi libertador, emocionante, e quando pararam em uma clareira iluminada pela lua, Aria estava rindo.

Kael se transformou de volta, nu e glorioso sob a luz da lua. Aria deveria desviar o olhar, mas não conseguiu.

"Você é linda quando ri," ele disse, se aproximando.

"E você é... impressionante," Aria admitiu, seus olhos percorrendo seu corpo.

Kael sorriu, aquele sorriso predatório que a fazia derreter. "Você me quer, Aria. Eu posso sentir."

"Eu..." ela não podia negar. "Sim. Mas tenho medo."

"De quê?"

"De que isso seja apenas o vínculo. De que não seja real."

Kael a puxou para seus braços. "É real. Mais real que qualquer coisa que eu já senti. O vínculo apenas nos trouxe juntos. O que sentimos é nosso."

Ele a beijou, e desta vez não foi gentil. Foi possessivo, exigente, e Aria respondeu com igual intensidade. Suas mãos exploraram o corpo dele, e as dele exploraram o dela.

"Aria," ele rosnou contra seus lábios. "Se não pararmos agora, eu não vou conseguir me controlar."

"Então não pare."

Foi tudo que Kael precisou ouvir. Ele a deitou na grama macia, e sob a lua cheia, eles se tornaram um.

Foi intenso, apaixonado, e quando terminaram, Aria sabia que não havia volta. Ela era dele. E ele era dela.

"Eu te amo," Kael sussurrou, segurando-a contra seu peito. "Eu sei que é cedo, mas eu te amo."

Aria sentiu lágrimas em seus olhos. "Eu também te amo."

Mas sua felicidade foi interrompida por um uivo distante - um som de aviso.

Kael se levantou imediatamente, se transformando. Outros lobos apareceram na clareira - membros de sua matilha.

"Rogues," um deles disse, se transformando de volta. "Eles atacaram a fronteira sul. Muitos deles."

Kael rosnou, seus olhos brilhando dourados. "Quantos?"

"Pelo menos vinte. E eles estão vindo para cá."

Kael olhou para Aria, conflito em seus olhos. "Eu preciso ir. Mas você não está segura aqui."

"Eu vou com você."

"Não. É muito perigoso."

"Eu não vou ficar aqui esperando," Aria disse firmemente. "Se você vai lutar, eu vou estar ao seu lado."

Kael a olhou por um longo momento, então assentiu. "Fique perto de mim. Sempre."

O que se seguiu foi uma batalha brutal. Os rogues atacaram em massa, e a matilha de Kael lutou com ferocidade. Aria ficou perto de Kael, vendo-o lutar com uma brutalidade que deveria assustá-la, mas não assustou.

Porque ela entendia - ele estava protegendo sua matilha. Protegendo ela.

Mas então ela viu Lydia sendo cercada por três rogues. Sem pensar, Aria pegou um galho caído e correu, batendo em um dos lobos.

Foi estúpido, imprudente, mas funcionou. O lobo se virou para ela, e Kael teve tempo de chegar, derrubando-o.

Quando a batalha terminou, os rogues haviam fugido ou sido mortos. A matilha estava ferida, mas viva.

E Lydia olhou para Aria com novos olhos. "Você salvou minha vida."

"Você é da matilha," Aria disse simplesmente. "Eu protejo os meus."

Lydia assentiu, e pela primeira vez, havia respeito em seus olhos.

Kael a puxou para seus braços, verificando se ela estava ferida. "Você é louca. Corajosa e louca."

"Eu aprendi com o melhor."

Ele a beijou, profundo e possessivo. "Você é minha Luna. Agora e para sempre."

E desta vez, Aria não discutiu. Porque ela sabia que era verdade.

Ela havia encontrado seu lugar. Sua matilha. Seu companheiro.

E ela ia lutar por isso com tudo que tinha.`,
        wordCount: 1000,
        isPaid: false
      },
      // Capítulos 4-24 pagos
      { id: 4, title: "Cerimônia de Acasalamento", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 5, title: "Inimigos Ocultos", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 950, isPaid: true },
      { id: 6, title: "O Conselho dos Alfas", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true },
      { id: 7, title: "Traição Revelada", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true },
      { id: 8, title: "Poder Oculto", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1300, isPaid: true },
      { id: 9, title: "A Transformação", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1400, isPaid: true },
      { id: 10, title: "Guerra Entre Matilhas", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1500, isPaid: true },
      { id: 11, title: "Sacrifício", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 12, title: "Renascimento", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true },
      { id: 13, title: "Nova Ordem", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true },
      { id: 14, title: "Desafios da Luna", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 950, isPaid: true },
      { id: 15, title: "Segredos Ancestrais", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 16, title: "Profecia Cumprida", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1300, isPaid: true },
      { id: 17, title: "Aliança Inesperada", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true },
      { id: 18, title: "Batalha Final", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1600, isPaid: true },
      { id: 19, title: "Vitória e Perda", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 20, title: "Reconstrução", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true },
      { id: 21, title: "Novos Começos", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 950, isPaid: true },
      { id: 22, title: "Herdeiros", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true },
      { id: 23, title: "Legado", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true },
      { id: 24, title: "Eternamente Unidos", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true }
    ]
  },
  {
    id: "20",
    title: "Sangue e Lua: O Lobisomem Amaldiçoado",
    author: "Raven Nightshade",
    cover: "",
    rating: 4.8,
    chapters: 26,
    genre: "Romance Paranormal",
    description: "Um lobisomem amaldiçoado busca redenção através do amor de uma bruxa poderosa.",
    views: "4900000",
    ageRating: "18+",
    tags: ["Lobisomem", "Bruxa", "Maldição", "Romance Sombrio", "Redenção", "Magia"],
    synopsis: "Damien Nightshade, 32 anos, carrega uma maldição que o torna mais monstro que homem a cada lua cheia. Amaldiçoado por uma bruxa vingativa há dez anos, ele perdeu tudo - sua matilha, sua humanidade, sua esperança. Até conhecer Selene Moonstone, 27 anos, uma bruxa poderosa que pode ser sua única chance de salvação. Mas quebrar a maldição exige um preço alto - e Selene terá que decidir se está disposta a arriscar sua própria vida para salvar um homem que pode estar além da redenção. Entre magia negra, paixão proibida e segredos mortais, Damien e Selene descobrirão que algumas maldições só podem ser quebradas pelo amor verdadeiro - e que o amor verdadeiro pode ser a maldição mais perigosa de todas.",
    fullStory: [
      {
        id: 1,
        title: "A Maldição",
        content: `Damien Nightshade acordou coberto de sangue. Novamente.

Ele não se lembrava da noite anterior - nunca se lembrava. Mas as evidências estavam por toda parte: roupas rasgadas, arranhões profundos em seu corpo, e aquele gosto metálico de sangue em sua boca.

Ele se arrastou até o riacho próximo, lavando o sangue. Dez anos. Dez anos desde que a bruxa o amaldiçoou, e cada lua cheia era pior que a anterior.

"Você vai sofrer," ela havia dito, seus olhos negros brilhando de ódio. "Você vai se transformar em um monstro, vai perder sua humanidade pedaço por pedaço, até não restar nada além da besta."

E ela estava certa. Damien podia sentir sua humanidade escorregando a cada transformação. Logo, não haveria mais nada dele - apenas o monstro.

Ele voltou para sua cabana isolada na floresta, longe de qualquer civilização. Ele não podia arriscar estar perto de pessoas. Não quando ele não tinha controle sobre o que se tornava.

Foi quando sentiu a presença.

Alguém estava em sua propriedade.

Damien rosnou, seus instintos de lobo assumindo. Ele saiu, pronto para atacar, e então a viu.

Uma mulher estava parada na clareira, seus cabelos prateados brilhando sob o sol. Ela usava um vestido longo e escuro, e havia algo nela - um poder, uma energia - que fez Damien parar.

"Damien Nightshade," ela disse, sua voz suave mas firme. "Eu vim te ajudar."

"Vá embora," ele rosnou. "Eu sou perigoso."

"Eu sei o que você é. Eu sei sobre a maldição." Ela deu um passo mais perto, sem medo. "Meu nome é Selene Moonstone. Eu sou uma bruxa. E eu posso quebrar sua maldição."

Damien riu - um som amargo, sem humor. "Muitos tentaram. Todos falharam."

"Porque eles não eram fortes o suficiente. Eu sou." Seus olhos - violetas, ele percebeu - o estudavam. "Mas quebrar uma maldição como a sua tem um preço."

"Que preço?"

"Sua confiança. Seu tempo. E talvez..." ela hesitou, "seu coração."

Damien a encarou. "Meu coração morreu há muito tempo."

"Então vamos ressuscitá-lo." Ela estendeu a mão. "Você tem duas escolhas, Damien. Continuar vivendo como um monstro até perder completamente sua humanidade. Ou confiar em mim e lutar pela sua redenção."

Damien olhou para sua mão estendida. Ele não tinha motivos para confiar nela. Mas ele também não tinha nada a perder.

Ele pegou sua mão.

E sentiu algo que não sentia há anos - esperança.`,
        wordCount: 550,
        isPaid: false
      },
      {
        id: 2,
        title: "O Ritual",
        content: `Selene se mudou para a cabana de Damien, trazendo livros antigos, ervas, cristais e outros instrumentos de magia. Damien observava com ceticismo enquanto ela montava um círculo de proteção ao redor da cabana.

"Isso vai nos proteger durante a lua cheia," ela explicou. "A maldição te torna mais forte, mais violento. Eu preciso garantir que você não escape e machuque alguém."

"Eu sei," Damien disse amargamente. "Eu já machuquei pessoas suficientes."

Selene parou, olhando para ele. "Não foi sua culpa. Você estava sob a influência da maldição."

"Isso não muda o fato de que eu fiz isso."

Ela se aproximou, pegando seu rosto em suas mãos. "Damien, escute-me. A culpa é da bruxa que te amaldiçoou. Não sua. E nós vamos quebrar essa maldição. Eu prometo."

Havia algo em seus olhos - determinação, compaixão - que fez algo se apertar no peito de Damien. "Por que você está fazendo isso? Você nem me conhece."

"Porque ninguém merece viver assim. E porque..." ela hesitou, "porque eu sinto que devo. Como se o destino tivesse me trazido até você."

Nos dias seguintes, Selene trabalhou incansavelmente, estudando a maldição, preparando poções, realizando rituais. Damien a ajudava quando podia, mas principalmente observava, fascinado pela maneira como ela trabalhava - focada, poderosa, linda.

"Você está me olhando de novo," Selene disse sem erguer os olhos de seu livro.

"Desculpe. É que... você é diferente de qualquer bruxa que eu já conheci."

"Como assim?"

"Você não tem medo de mim. Você não me julga. Você apenas... me aceita."

Selene finalmente olhou para ele, e havia algo em seus olhos que fez o coração de Damien acelerar. "Porque eu vejo além do monstro. Eu vejo o homem."

A tensão entre eles cresceu nos dias seguintes. Toques acidentais que duravam um segundo a mais. Olhares que diziam mais que palavras. Uma atração que nenhum dos dois podia negar.

"Isso é loucura," Damien disse uma noite, quando se pegou observando Selene dormir. "Eu não posso me apaixonar por ela. Eu sou um monstro."

Mas seu coração discordava.

A lua cheia se aproximava, e Selene intensificou seus preparativos. "Esta será a primeira de três luas cheias," ela explicou. "Em cada uma, eu vou realizar um ritual para enfraquecer a maldição. Na terceira, nós a quebramos completamente."

"E se não funcionar?"

"Vai funcionar." Mas Damien viu dúvida em seus olhos.

Na noite da lua cheia, Selene o levou para o centro do círculo de proteção. Ela havia desenhado símbolos complexos no chão, e velas negras queimavam ao redor.

"Quando a transformação começar, vai doer," ela avisou. "Mais do que o normal. Porque eu vou estar lutando contra a maldição."

"Eu aguento."

Selene pegou sua mão, e Damien sentiu o poder dela fluindo para ele. "Eu estarei aqui. O tempo todo. Você não está sozinho."

Quando a lua cheia apareceu, a dor veio - excruciante, avassaladora. Damien gritou, sentindo seus ossos quebrarem e se reformarem. Mas desta vez, havia algo mais - a magia de Selene, lutando contra a maldição, tentando mantê-lo humano.

Foi uma batalha brutal. A besta dentro dele lutava para assumir o controle, mas Selene não desistia, seu poder envolvendo-o, segurando-o.

"Lute, Damien!" ela gritou. "Lute contra ela!"

E ele lutou. Com tudo que tinha, ele lutou.

Quando amanheceu, Damien estava exausto, mas ainda humano. Ele não havia se transformado completamente.

"Funcionou," Selene sussurrou, caindo de joelhos, exausta. "Funcionou."

Damien a pegou nos braços, segurando-a contra seu peito. "Obrigado. Obrigado."

Ela olhou para ele, e havia lágrimas em seus olhos. "Nós conseguimos. Juntos."

E naquele momento, Damien soube que havia se apaixonado por ela. Completamente, irrevogavelmente.

Mas ele também sabia que o perigo não havia passado. Ainda havia duas luas cheias pela frente.

E a bruxa que o havia amaldiçoado não ia deixar que ele fosse livre tão facilmente.`,
        wordCount: 850,
        isPaid: false
      },
      {
        id: 3,
        title: "Amor e Perigo",
        content: `As semanas entre a primeira e a segunda lua cheia foram as mais felizes que Damien havia tido em anos. Ele e Selene trabalhavam juntos durante o dia, e à noite, conversavam por horas sobre tudo e nada.

"Conte-me sobre sua vida antes da maldição," Selene pediu uma noite, enquanto estavam sentados perto da lareira.

Damien hesitou. "Eu era diferente. Mais jovem, mais inocente. Eu tinha uma matilha, uma família. Eu era feliz."

"O que aconteceu?"

"Eu me apaixonei pela pessoa errada. Uma bruxa chamada Morgana. Ela era linda, poderosa, e eu estava cego. Eu não vi a escuridão nela até ser tarde demais."

"O que ela fez?"

"Ela queria que eu a ajudasse a destruir minha matilha, a tomar seu poder. Quando eu recusei, quando eu a expus, ela me amaldiçoou. E então matou minha matilha inteira." Sua voz quebrou. "Todos eles. Por minha causa."

Selene pegou sua mão. "Não foi sua culpa."

"Foi. Eu trouxe ela para dentro. Eu confiei nela."

"E agora você está confiando em mim." Selene o fez olhá-la. "Damien, eu não sou ela. Eu nunca vou te machucar."

"Eu sei." E ele sabia. Selene era diferente - gentil, compassiva, boa. "Eu confio em você, Selene. Completamente."

Ela sorriu, e Damien não resistiu. Ele se inclinou e a beijou.

Foi suave no começo, exploratório. Mas quando Selene respondeu, aprofundando o beijo, algo se acendeu entre eles. Damien a puxou para seu colo, suas mãos explorando, e Selene gemeu contra seus lábios.

"Damien," ela sussurrou. "Nós não devíamos..."

"Eu sei. Mas eu não consigo parar. Eu te quero, Selene. Eu te quero tanto."

"Eu também te quero." Ela o beijou novamente, desesperada. "Mas se fizermos isso, se nos entregarmos a isso, a maldição pode ficar mais forte. Emoções intensas alimentam magia negra."

"Eu não me importo. Você vale o risco."

Eles fizeram amor naquela noite, e foi intenso, apaixonado, perfeito. E quando terminaram, deitados nos braços um do outro, Damien soube que havia encontrado algo que pensava ter perdido para sempre - amor.

Mas sua felicidade foi interrompida por uma presença sinistra.

"Que tocante," uma voz disse da porta.

Damien se levantou imediatamente, colocando-se entre Selene e a intrusa.

Morgana.

Ela estava na porta, seus olhos negros brilhando de malícia. "Meu querido Damien. Você realmente achou que eu ia deixar você quebrar minha maldição?"

"Vá embora, Morgana," Damien rosnou.

"Oh, eu não acho que vou. Não quando há tanto em jogo." Seus olhos se viraram para Selene. "E você deve ser a pequena bruxa que está tentando salvar meu lobisomem. Que nobre. Que estúpido."

Selene se levantou, seu poder brilhando ao redor dela. "Eu não tenho medo de você."

"Deveria ter." Morgana sorriu. "Porque eu vou te dar uma escolha, querida. Você para de tentar quebrar a maldição, ou eu mato Damien. Lenta e dolorosamente."

"Você não pode matá-lo," Selene disse. "A maldição o mantém vivo."

"Ah, mas eu posso torturá-lo. Eu posso fazer cada transformação ser um inferno. Eu posso fazer ele sofrer de maneiras que você nem imagina."

Damien sentiu raiva subir. "Deixe ela fora disso. Isso é entre nós."

"Não mais. Você a trouxe para isso quando se apaixonou por ela." Morgana riu. "Sim, eu posso ver. Você a ama. O que torna isso ainda mais delicioso."

Ela desapareceu em uma nuvem de fumaça negra, deixando apenas suas palavras ecoando: "Você tem até a próxima lua cheia para decidir. A maldição ou a vida dele. Escolha sabiamente."

Depois que ela se foi, Selene se virou para Damien, determinação em seus olhos. "Nós vamos quebrar essa maldição. Não importa o que ela ameace."

"Selene, ela vai me matar."

"Não se eu a matar primeiro." Havia algo em seus olhos - algo escuro, poderoso. "Eu não vou deixar ela te machucar. Eu prometo."

Damien a puxou para seus braços. "Eu te amo. Eu sei que é cedo, mas eu te amo."

"Eu também te amo." Ela o beijou. "E nós vamos vencer isso. Juntos."

Mas enquanto se preparavam para a segunda lua cheia, ambos sabiam que a verdadeira batalha estava apenas começando.

E que o preço da vitória poderia ser mais alto do que qualquer um deles estava disposto a pagar.`,
        wordCount: 950,
        isPaid: false
      },
      // Capítulos 4-26 pagos
      { id: 4, title: "A Segunda Lua", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true },
      { id: 5, title: "Poder Sombrio", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true },
      { id: 6, title: "Aliados Inesperados", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 950, isPaid: true },
      { id: 7, title: "Segredos do Passado", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 8, title: "Traição", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true },
      { id: 9, title: "Sacrifício Necessário", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1300, isPaid: true },
      { id: 10, title: "A Terceira Lua", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1400, isPaid: true },
      { id: 11, title: "Confronto Final", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1500, isPaid: true },
      { id: 12, title: "Quebra da Maldição", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1300, isPaid: true },
      { id: 13, title: "Consequências", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true },
      { id: 14, title: "Recuperação", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 950, isPaid: true },
      { id: 15, title: "Nova Ameaça", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true },
      { id: 16, title: "Poder Unido", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 17, title: "Batalha das Bruxas", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1300, isPaid: true },
      { id: 18, title: "Revelação Chocante", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true },
      { id: 19, title: "Escolha Impossível", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true },
      { id: 20, title: "Redenção", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true },
      { id: 21, title: "Vitória Amarga", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true },
      { id: 22, title: "Recomeço", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 950, isPaid: true },
      { id: 23, title: "Matilha Renascida", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true },
      { id: 24, title: "União Eterna", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1100, isPaid: true },
      { id: 25, title: "Legado de Amor", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1000, isPaid: true },
      { id: 26, title: "Para Sempre Livres", content: "[Conteúdo disponível apenas para assinantes]", wordCount: 1200, isPaid: true }
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
  return booksData.filter(book => book.genre === genre);
}

// Função helper para buscar livros +18
export function getAdultBooks(): Book[] {
  return booksData.filter(book => book.ageRating === "18+");
}
