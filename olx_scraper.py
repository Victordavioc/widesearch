import requests
from bs4 import BeautifulSoup
import pandas as pd
import json

# Função para coletar anúncios de produtos da OLX usando a API do ZenRows
def coletar_anuncios_olx(pesquisa):
    # URL da API do ZenRows
    api_key = '274b22252aebc489f974960ac96c5d68dd09d445'
    url = f"https://api.zenrows.com/v1/?apikey={api_key}&url=https%3A%2F%2Fwww.olx.com.br%2Fbrasil%3Fq%3D{pesquisa}"

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    
    # Fazendo a requisição à API do ZenRows
    response = requests.get(url, headers=headers)
    
    # Verificando o status da requisição
    if response.status_code != 200:
        print(f"Erro ao acessar a API do ZenRows: {response.status_code}")
        return
    
    # Utilizando BeautifulSoup para parsear o HTML retornado pela API
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Coletar os 10 primeiros anúncios
    anuncios = []
    for i, item in enumerate(soup.find_all('li', class_='sc-1fcmfeb-2'), start=1):
        titulo = item.find('h2').text if item.find('h2') else "Título não encontrado"
        preco = item.find('span', class_='sc-ifAKCX ePGONJ').text if item.find('span', class_='sc-ifAKCX ePGONJ') else "Preço não informado"
        localizacao = item.find('span', class_='sc-1c3ysll-1').text if item.find('span', class_='sc-1c3ysll-1') else "Localização não disponível"
        link = item.find('a')['href'] if item.find('a') else "Link não disponível"
        
        anuncios.append({
            'Título': titulo,
            'Preço': preco,
            'Localização': localizacao,
            'Link': link
        })
        
        if i == 10:
            break
    
    return pd.DataFrame(anuncios)

# Função para exibir os anúncios na tela
def mostrar_anuncios(df):
    if df is not None and not df.empty:
        print(df[['Título', 'Preço', 'Localização', 'Link']].to_string(index=False))
    else:
        print("Nenhum anúncio encontrado.")

if _name_ == "_main_":
    pesquisa = input("Digite o produto que deseja buscar: ").strip().replace(" ", "%20")  # Codificando espaços como %20
    df_anuncios = coletar_anuncios_olx(pesquisa)
    mostrar_anuncios(df_anuncios)