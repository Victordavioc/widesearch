import requests
from bs4 import BeautifulSoup

def search_enjoei(query):
    # Formata a URL de busca com o termo fornecido
    url = f"https://www.enjoei.com.br/busca/{query.replace(' ', '%20')}"
    
    # Faz a requisição à página
    response = requests.get(url)
    
    # Verifica se a requisição foi bem-sucedida
    if response.status_code != 200:
        print("Erro ao acessar o site.")
        return

    # Analisa o conteúdo HTML da página
    soup = BeautifulSoup(response.text, 'html.parser')
   

    
    # Encontra todos os elementos que representam os produtos
    products = soup.find_all('div', class_='c-product-card')

    if not products:
        print("Nenhum produto encontrado.")
        return

    # Itera sobre os produtos encontrados
    for product in products:
        try:
            # Título do produto
            title = product.find('h2', class_='c-product-card__title').text.strip()
            
            # Preço do produto (primeiro preço exibido, pode ser o promocional ou normal)
            price = product.find('span', class_='c-product-card__price').text.strip()
            
            # Link do produto
            link = "https://www.enjoei.com.br" + product.find('a')['href']
            
            print(f"Produto: {title}\nPreço: {price}\nLink: {link}\n")
        except AttributeError:
            # Se algum dos atributos não for encontrado, ele ignora e passa para o próximo
            continue

# Solicita ao usuário que insira o termo de busca
query = input("Digite o termo de busca: ")
search_enjoei(query)
