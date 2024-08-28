import axios from "axios";
import { POKEMON_BASE_URL } from "@/util/constant";
import { IPokemonListResponse } from "@/interface/pokemonList";
import { handelResponse, IResponse } from "@/util/handelResponse";

interface IGetPokemonListResponse extends IResponse {
  status: number | undefined;
  data?: IPokemonListResponse;
}

export const pokemonListServices = {
  getpokemonList: async (
    limit?: number,
    offset?: number
  ): Promise<IGetPokemonListResponse> => {
    try {
      const response = await axios.get(
        `${POKEMON_BASE_URL}/pokemon?limit=${limit || 151}&offset=${
          offset || 0
        }`
      );
      return handelResponse.success(response);
    } catch (error: any) {
      return handelResponse.error(error);
    }
  },
};
