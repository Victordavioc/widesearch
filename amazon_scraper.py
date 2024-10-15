import requests
from bs4 import BeautifulSoup

url = 'https://www.amazon.com.br/s?k=sansung&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=21DK7OHXQ9ATI&sprefix=sansun%2Caps%2C283&ref=nb_sb_noss_2'


headers = {'User-Agent':"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"}




def proximapagina(soup):
    #procurar botao proxima

    paginas = soup.find('a',{'class':'s-pagination-item s-pagination-next s-pagination-button s-pagination-separator'})

    #ir na ultima pagina com o botao proxima desativado

    if not paginas.find('span',{'class':'s-pagination-item s-pagination-next s-pagination-disabled'}):
        url = 'https://www.amazon.com.br/'
    prox = soup.find('a','s-pagination-item s-pagination-next s-pagination-button s-pagination-separator',href=True)
    url_final = (url+str(prox['href']))
    return url_final
    

site = requests.get(url,headers=headers)

soup = BeautifulSoup(site.content,'html.parser')

url = proximapagina(soup)

print(url)