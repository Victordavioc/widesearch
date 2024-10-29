import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient, getDefaultAxiosConfig } from "../../utils/axios";

interface Anuncio {
  Título: string;
  Preço: string;
  Link: string;
}

export const useGetProdutos = () => {
  const response = useQuery<Anuncio, AxiosError>({
    queryKey: ["GET_PRODUTOS"],

    queryFn: async () => {
      const accessToken = localStorage.getItem("accessToken");

      const { data } = await axiosClient.get(
        "/categories",
        getDefaultAxiosConfig(accessToken)
      );

      const fetchAnuncios = async (produto: string): Promise<Anuncio[]> => {
        const response = await axios.get(
          `/anuncios?pesquisa=${encodeURIComponent(produto)}`
        );
        return response.data; // Retorna os dados diretamente
      };

      return data;
    },
  });

  return response;
};
