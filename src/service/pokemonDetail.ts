import axios from "axios";
import { POKEMON_BASE_URL } from "@/util/constant";
import { IPokemonDetailResponse } from "@/interface/pokemonDetail";
import { handelResponse, IResponse } from "@/util/handelResponse";

interface IGetPokemonDetailResponse extends IResponse {
  status: number | undefined;
  data?: IPokemonDetailResponse;
}

export const pokemonDetailServices = {
  getpokemonDetail: async (
    name: string
  ): Promise<IGetPokemonDetailResponse> => {
    try {
      const response = await axios.get(`${POKEMON_BASE_URL}/pokemon/${name}`);
      return handelResponse.success(response);
    } catch (error: any) {
      return handelResponse.error(error);
    }
  },
};
