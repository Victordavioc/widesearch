## **História de Usuário**

### **ID:**  
HU-001

### **Título:**  
Coleta de Dados de Anúncios via Web Scraping/API

### **Descrição:**  
Como **administrador do sistema**, eu quero **coletar automaticamente anúncios de produtos usados de várias plataformas (OLX, Facebook Marketplace, etc.)**, para que **possa centralizar e organizar essas informações em um único local**.

### **Critérios de Aceitação:**

#### Cenário 1: Coleta de dados bem-sucedida via Web Scraping/API
- **Dado** que as plataformas de anúncios são suportadas pelo sistema de coleta,
- **Quando** o sistema realiza a coleta automática dos dados dos anúncios,
- **Então** os anúncios devem ser armazenados corretamente no banco de dados,
- **E** os dados dos anúncios, como título, descrição, preço e imagens, devem estar disponíveis para consulta no sistema.

#### Cenário 2: Falha na coleta de dados por plataforma não disponível
- **Dado** que uma plataforma de anúncios não está acessível via Web Scraping ou API,
- **Quando** o sistema tenta coletar os dados dessa plataforma,
- **Então** uma mensagem de erro deve ser gerada no log do sistema,
- **E** a coleta dos dados deve continuar normalmente para as plataformas disponíveis.

#### Cenário 3: Atualização automática de anúncios coletados
- **Dado** que já existem anúncios previamente coletados no sistema,
- **Quando** o sistema realizar uma nova coleta,
- **Então** os anúncios antigos devem ser atualizados com informações recentes, como preço ou disponibilidade,
- **E** os novos anúncios devem ser adicionados ao banco de dados sem duplicatas.

### **Prioridade:**  
Alta

### **Estimativa de Esforço:**  
13 Story Points

### **Dependências:**  
- Integração com APIs ou desenvolvimento do processo de Web Scraping para as plataformas suportadas.  
- Armazenamento de dados em banco de dados.

### **Notas/Comentários Adicionais:**
- Garantir que o sistema respeite os Termos de Serviço das plataformas de onde os dados serão coletados.  
- Definir uma frequência de coleta adequada para evitar sobrecarga no sistema e nas plataformas.

/////////////////////////////////////////////

### **ID:**  
HU-002

### **Título:**  
Sistema de Busca Centralizada com Filtros Avançados

### **Descrição:**  
Como **usuário final**, eu quero **buscar por produtos usados compilados de várias plataformas (OLX, Facebook Marketplace, etc.)** utilizando **filtros avançados**, para que **eu possa encontrar rapidamente o produto que atenda às minhas necessidades**.

### **Critérios de Aceitação:**

#### Cenário 1: Busca bem-sucedida com filtros avançados
- **Dado** que o usuário está na página de busca,
- **Quando** o usuário insere um termo de busca e utiliza os filtros (como faixa de preço, localização, categoria, estado do produto),
- **Então** os resultados da busca devem exibir produtos relevantes de várias plataformas de forma centralizada,
- **E** os filtros aplicados devem refinar corretamente os resultados exibidos.

#### Cenário 2: Nenhum resultado encontrado
- **Dado** que o usuário está na página de busca,
- **Quando** o usuário insere um termo de busca e aplica filtros que não correspondem a nenhum produto,
- **Então** uma mensagem deve ser exibida informando que nenhum resultado foi encontrado,
- **E** o usuário deve ter a opção de ajustar os filtros ou modificar o termo de busca.

#### Cenário 3: Exibição de resultados com ordenação
- **Dado** que o usuário realizou uma busca e recebeu uma lista de resultados,
- **Quando** o usuário escolhe uma opção de ordenação (como menor preço, maior preço, mais recentes),
- **Então** os resultados devem ser reordenados conforme o critério escolhido.

### **Prioridade:**  
Alta

### **Estimativa de Esforço:**  
8 Story Points

### **Dependências:**  
- Funcionalidade de coleta de dados das plataformas (História HU-004).  
- Sistema de banco de dados centralizado para armazenar os anúncios.

### **Notas/Comentários Adicionais:**
- O sistema deve ser capaz de realizar buscas em tempo real, considerando a atualização constante dos produtos nas plataformas.  
- Definir a melhor estratégia para indexação e filtragem dos dados coletados.

/////////////////////////////////////////

## **História de Usuário**

### **ID:**  
HU-003

### **Título:**  
Página de Detalhes do Produto

### **Descrição:**  
Como **usuário final**, eu quero **visualizar os detalhes completos de cada produto**, incluindo **informações sobre qual plataforma ele foi extraído**, para que **possa tomar uma decisão informada antes de comprar**.

### **Critérios de Aceitação:**

#### Cenário 1: Exibição de detalhes do produto
- **Dado** que o usuário clicou em um produto na lista de resultados de busca,
- **Quando** o sistema exibe a página de detalhes do produto,
- **Então** todas as informações relevantes do produto (como título, descrição, preço, imagens, vendedor, data de publicação) devem ser exibidas,
- **E** o sistema deve informar claramente de qual plataforma o produto foi extraído.

#### Cenário 2: Link para a plataforma original
- **Dado** que o usuário está na página de detalhes do produto,
- **Quando** visualiza as informações do produto,
- **Então** deve ser exibido um link para a página original do produto na plataforma de origem,
- **E** o link deve abrir a página do produto na plataforma em uma nova aba.

#### Cenário 3: Produto indisponível na plataforma original
- **Dado** que o produto foi removido ou está indisponível na plataforma de origem,
- **Quando** o usuário tenta acessar a página de detalhes do produto,
- **Então** uma mensagem deve ser exibida informando que o produto não está mais disponível,
- **E** o link para a plataforma original deve ser desativado ou removido.

### **Prioridade:**  
Média

### **Estimativa de Esforço:**  
5 Story Points

### **Dependências:**  
- Sistema de coleta e armazenamento de dados de várias plataformas (História HU-004).  
- Funcionalidade de busca centralizada (História HU-005).

### **Notas/Comentários Adicionais:**
- O sistema deve verificar periodicamente a disponibilidade dos produtos para evitar exibir itens que já foram removidos das plataformas.
