### ms_20242_grupo 5

Projeto definido em criar um buscador de produtos usados em mais de uma plataforma

### Nome do Projeto:

WideSurchBr

### Descrição:

Este projeto é um buscador de produtos usados, que funciona como um compilador de anúncios.

### Problema

A experiência de buscar produtos usados em várias plataformas (como OLX, Facebook Marketplace, entre outras) pode ser fragmentada e demorada. Os usuários precisam acessar diferentes sites, realizar buscas separadas e comparar manualmente os preços, condições e localizações dos produtos, o que torna o processo cansativo e ineficiente.

Além disso, essas plataformas não têm mecanismos centralizados de comparação, o que dificulta encontrar as melhores ofertas disponíveis. O usuário pode perder oportunidades ou deixar de visualizar produtos relevantes, simplesmente por não ter tempo de visitar todas as fontes possíveis.

### Objetivos da Solução

O objetivo do projeto é criar uma plataforma centralizada que agregue anúncios de produtos usados de diferentes fontes, facilitando a busca e comparação em um único lugar. Essa solução visa:

Agilizar o processo de busca.

Oferecer filtros avançados.

Facilitar a comparação de preços e produtos.

Economizar tempo e melhorar a experiência do usuário.

Fornecer notificações e alertas.

### Grupo

Este projeto será desenvolvido pelos componentes do grupo 5:

| Matrícula | Nome                            | Usuário Git                                         |
| --------- | ------------------------------- | --------------------------------------------------- |
| 202400422 | Victor Davi de Oliveira Cunha   | [Victordavioc](https://github.com/Victordavioc)     |
| 202403082 | Lucas Gontijo de Moraes         | [Luucasgontijo](https://github.com/Luucasgontijo)   |
| 202403062 | Arthur Andrade Mendes Fernandes | [ArthurAndrad3](https://github.com/ArthurAndrad3)   |
| 202403085 | Marcos Henrique Lima Martins    | [marcosmartins2](https://github.com/marcosmartins2) |
| 202400420 | José Felipe Pinto Faria         | [ZeFelipePF](https://github.com/ZeFelipePF)         |

### Backlog do Produto

1. RF001 - Coleta de Dados (Web Scraping\API): <Coletar anúncios de produtos usados de várias plataformas (OLX, Facebook Marketplace, etc.)>.
2. RF002 - Sistema de Busca Centralizada: <Permitir que os usuários busquem por produtos compilados de várias plataformas com filtros avançados>.
3. RF003 - Página de Detalhes do Produto: <Exibir detalhes de cada produto, incluindo informações de qual plataforma ele foi extraído>.
4. RF004 - Sistema de Filtros Avançados: <Notificar usuários quando um produto específico ou uma categoria de produtos aparecer com um preço desejado.>.
5. RF005 - Monitoramento de Preços e Notificações: <Geolocalização e Filtros por Distância>.
6. RF006 - Análise de Dados e Estatísticas: <Coletar e exibir dados de tendências de mercado, como variação de preço por categoria e popularidade de produtos>.

### Requisitos Não Funcionais

1. RNF001 - Usabilidade: A interface do usuário deve ser intuitiva e de fácil navegação, com elementos gráficos e textuais bem organizados. A experiência de busca deve ser fluida e responsiva, garantindo que o usuário consiga visualizar e interagir com as informações de forma rápida e eficiente, tanto em dispositivos móveis quanto em desktop.
2. RNF002 - Segurança: O sistema deve garantir a proteção dos dados do usuário e das informações coletadas das plataformas parceiras. Assegurar que todas as comunicações sejam feitas através de protocolos seguros (HTTPS) e implementar medidas de controle de acesso para prevenir uso não autorizado.
3. RNF003 - Desempenho: O sistema deve ser capaz de processar e exibir resultados de busca em menos de 3 segundos para consultas comuns. O tempo de resposta não deve exceder 5 segundos para consultas complexas (com vários filtros). A coleta de dados deve ser otimizada para evitar sobrecarga nos servidores das plataformas externas.
4. RNF004 - Confiabilidade: A aplicação deve funcionar de forma contínua, garantindo um tempo de atividade (uptime) de no mínimo 99%. A coleta de dados deve ser robusta o suficiente para lidar com mudanças eventuais nas estruturas das plataformas externas.
5. RNF005 - Manutenibilidade: O código deve ser modular e seguir boas práticas de desenvolvimento, facilitando manutenção e evolução do sistema. Devem ser documentadas as interfaces com as APIs e fontes de dados externas, para garantir que novos desenvolvedores possam entender e modificar o sistema com facilidade.
6. RNF006 - Portabilidade: A aplicação deve ser capaz de ser executada em diferentes ambientes de execução, como Windows, Linux e macOS, e deve funcionar corretamente em navegadores modernos. A escolha da tecnologia de frontend deve priorizar frameworks responsivos para adaptar o layout a diferentes resoluções.
7. RNF007 - Conectividade: O sistema deve ser capaz de se conectar a diferentes APIs de forma confiável, mesmo em ambientes com latência alta ou intermitência de rede. Devem ser implementados mecanismos de reintento e fallback para evitar falhas durante a coleta de dados.

### Regras de Negócio

1. RN01 - Os usuários não devem ser cobrados para realizar buscas na plataforma. O modelo de monetização será baseado em anúncios ou parcerias.
2. RN02 - A plataforma deve exibir sempre a fonte original do anúncio e redirecionar o usuário para o site de origem ao clicar no link de compra.
3. RN03 - Os produtos exibidos devem ser sempre atualizados com informações mais recentes, conforme a coleta de dados das plataformas originais.
4. RN04 - O sistema deve permitir que usuários cadastrados salvem buscas e ativem notificações para produtos específicos.
5. RN05 - A plataforma não deve armazenar dados pessoais de usuários sem consentimento explícito, respeitando as diretrizes da LGPD (Lei Geral de Proteção de Dados) e do GDPR.

### Modelo Arquitetural

<Apresentar uma descrição sucinta do modelo arquitetural do Produto.>

### Modelo de Interfaces Gráficas

O modelo de interfaces será baseado em um layout de página única (SPA - Single Page Application), com uma barra de busca na parte superior, filtros avançados no lado esquerdo e os resultados das buscas ocupando a maior parte da tela. Os detalhes dos produtos serão exibidos em uma modal que incluirá as informações do produto e um link para o site de origem.

Os filtros incluirão categorias como preço, localização, estado de conservação e plataforma de origem. Haverá uma seção para os produtos "mais populares" e "em alta" com base nas buscas recentes dos usuários.

### Tecnologia de Persistência de Dados

<Apresentar uma descrição sucinta do modelo de persistência do Produto.>

### Local do _Deploy_

O nosso planejamento inicial é hospedar nossa aplicação no Heroku ou no Firebase do Google, sendo crucial para nossa escolha a facilidade de configuração e também os recursos ofertados na versão gratuita.

### Cronograma de Desenvolvimento

| Iteração | Descrição                   | Data Início | Data Fim   | Responsável | Situação   |
| -------- | --------------------------- | ----------- | ---------- | ----------- | ---------- |
| 1        | Concepção                   | 30/08/2024  | 13/09/2024 | Grupo       | Concluída  |
| 2        | Preparação                  | 14/09/2024  | 27/09/2024 | Grupo       | Programada |
| 3        | Item(ns) do backlog <x,y,z> | 28/09/2024  | 11/10/2024 | Grupo       | Programada |
| 4        | Item(ns) do backlog <x,y,z> | 12/10/2024  | 25/10/2024 | Grupo       | Programada |
| 5        | Item(ns) do backlog <x,y,z> | 26/10/2024  | 08/11/2024 | Grupo       | Programada |
| 6        | Item(ns) do backlog <x,y,z> | 09/11/2024  | 22/11/2024 | Grupo       | Programada |
| 7        | Item(ns) do backlog <x,y,z> | 23/11/2024  | 06/12/2024 | Grupo       | Programada |
| 8        | Apresentação do Projeto     | 07/12/2024  | 20/12/2024 | Grupo       | Programada |

### Iterações x Atividades

| Iteração | Tarefa                                                                | Data Início | Data Fim   | Responsável | Situação   |
| -------- | --------------------------------------------------------------------- | ----------- | ---------- | ----------- | ---------- |
| 1        | Definição do grupo de trabalho                                        | 30/08/2024  | 30/08/2024 | Grupo       | Concluída  |
| 1        | Definição do Tema do Trabalho                                         | 30/08/2024  | 13/09/2024 | Grupo       | Concluída  |
| 2        | Definição do Backlog do produto                                       | 13/09/2024  | 27/09/2024 | Grupo       | Programada |
| 2        | Descrição dos itens do backlog do produto                             | 14/09/2024  | 27/09/2024 | Grupo       | Programada |
| 2        | Distribuição dos itens do backlog entre as iterações                  | 14/09/2024  | 27/09/2024 | Grupo       | Programada |
| 2        | Definição do modelo arquitetural                                      | 14/09/2024  | 27/09/2024 | Grupo       | Programada |
| 3        | Especificação de estórias de usuários dos Item(ns) do backlog <x,y,z> | 28/09/2024  | 11/10/2024 |             | Programada |
| 3        | Diagrama de classes dos Item(ns) do backlog <x,y,z>                   | 28/09/2024  | 11/10/2024 |             | Programada |
| 3        | Diagrama de interação/sequencia dos itens do backlog <x,y,z>          | 28/09/2024  | 11/10/2024 |             | Programada |
| 3        | Projeto de Interfaces gráficas dos itens do backlog <x,y,z>           | 28/09/2024  | 11/10/2024 |             | Programada |
| 3        | Projeto de persistência dos itens do backlog <x,y,z>                  | 28/09/2024  | 11/10/2024 |             | Programada |
| 3        | Implementação dos itens do backlog <x,y,z>\*                          | 28/09/2024  | 11/10/2024 |             | Programada |
| 4        | Especificação de estórias de usuários dos Item(ns) do backlog <x,y,z> | 12/10/2024  | 25/10/2024 |             | Programada |
| 4        | Diagrama de classes dos Item(ns) do backlog <x,y,z>                   | 12/10/2024  | 25/10/2024 |             | Programada |
| 4        | Diagrama de interação/sequencia dos itens do backlog <x,y,z>          | 12/10/2024  | 25/10/2024 |             | Programada |
| 4        | Projeto de Interfaces gráficas dos itens do backlog <x,y,z>           | 12/10/2024  | 25/10/2024 |             | Programada |
| 4        | Projeto de persistência dos itens do backlog <x,y,z>                  | 12/10/2024  | 25/10/2024 |             | Programada |
| 4        | Implementação dos itens do backlog <x,y,z>\*                          | 12/10/2024  | 25/10/2024 |             | Programada |
| 5        | Especificação de estórias de usuários dos Item(ns) do backlog <x,y,z> | 26/10/2024  | 08/11/2024 |             | Programada |
| 5        | Diagrama de classes dos Item(ns) do backlog <x,y,z>                   | 26/10/2024  | 08/11/2024 |             | Programada |
| 5        | Diagrama de interação/sequencia dos itens do backlog <x,y,z>          | 26/10/2024  | 08/11/2024 |             | Programada |
| 5        | Projeto de Interfaces gráficas dos itens do backlog <x,y,z>           | 26/10/2024  | 08/11/2024 |             | Programada |
| 5        | Projeto de persistência dos itens do backlog <x,y,z>                  | 26/10/2024  | 08/11/2024 |             | Programada |
| 5        | Implementação dos itens do backlog <x,y,z>\*                          | 26/10/2024  | 08/11/2024 |             | Programada |
| 6        | Especificação de estórias de usuários dos Item(ns) do backlog <x,y,z> | 09/11/2024  | 22/11/2024 |             | Programada |
| 6        | Diagrama de classes dos Item(ns) do backlog <x,y,z>                   | 09/11/2024  | 22/11/2024 |             | Programada |
| 6        | Diagrama de interação/sequencia dos itens do backlog <x,y,z>          | 09/11/2024  | 22/11/2024 |             | Programada |
| 6        | Projeto de Interfaces gráficas dos itens do backlog <x,y,z>           | 09/11/2024  | 22/11/2024 |             | Programada |
| 6        | Projeto de persistência dos itens do backlog <x,y,z>                  | 09/11/2024  | 22/11/2024 |             | Programada |
| 6        | Implementação dos itens do backlog <x,y,z>\*                          | 09/11/2024  | 22/11/2024 |             | Programada |
| 7        | Especificação de estórias de usuários dos Item(ns) do backlog <x,y,z> | 23/11/2024  | 06/12/2024 |             | Programada |
| 7        | Diagrama de classes dos Item(ns) do backlog <x,y,z>                   | 23/11/2024  | 06/12/2024 |             | Programada |
| 7        | Diagrama de interação/sequencia dos itens do backlog <x,y,z>          | 23/11/2024  | 06/12/2024 |             | Programada |
| 7        | Projeto de Interfaces gráficas dos itens do backlog <x,y,z>           | 23/11/2024  | 06/12/2024 |             | Programada |
| 7        | Projeto de persistência dos itens do backlog <x,y,z>                  | 23/11/2024  | 06/12/2024 |             | Programada |
| 7        | Implementação dos itens do backlog <x,y,z>\*                          | 23/11/2024  | 06/12/2024 |             | Programada |
| 8        | Apresentação do Projeto                                               | 07/12/2024  | 20/12/2024 | Grupo       | Programada |

- Implementação se aplicará, se os itens da iteração em andamento, forem eleitos para validação do projeto do trabalho.
