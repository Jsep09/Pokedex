import { useEffect } from "react";
import { pokemonListServices, pokemonDetailServices } from "@/service/index";
import { usePokemonListStore } from "@/store/pokemonList";
import { useForm } from "react-hook-form";
import { generationList } from "@/util/optionList";
// import { IPokemonListItem } from "@/interface/pokemonList";
import { IPokemonDetailResponse } from "@/interface/pokemonDetail";
const useSearchForm = () => {
  const {
    register,
    // handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { setFetchPokemonList, fetchPokemon, setPokemonList } =
    usePokemonListStore();

  const keyword = watch("keyword");
  const generation = watch("generation");
  const type = watch("type");
  const sort = watch("sort");

  const callData = async (filter: {
    name: string;
    limit: number;
    offset: number;
  }) => {
    setFetchPokemonList({
      data: [],
      loading: true,
      error: null,
    });
    const responseList = await pokemonListServices.getpokemonList(
      filter.limit,
      filter.offset
    );
    const pokeList = [];

    if (responseList.status === 200) {
      const responseResult = responseList.data?.results || [];
      for (const pokemon of responseResult) {
        const response = await pokemonDetailServices.getpokemonDetail(
          pokemon.name
        );
        const pokeData = response.data;
        if (pokeData) {
          pokeList.push({
            ...pokeData,
            image:
              pokeData.sprites.other.dream_world.front_default ||
              pokeData.sprites.other["official-artwork"].front_default,
          });
        }
      }

      setFetchPokemonList({
        data: pokeList,
        loading: false,
        error: null,
      });
      setPokemonList({
        data: pokeList,
        loading: false,
        error: null,
      });
    } else {
      setFetchPokemonList({
        data: [],
        loading: false,
        error: responseList.error,
      });
    }
  };
  const filterPokemon = (
    keyword: string,
    type: string,
    sort: "id" | "name"
  ) => {
    const keywordFilter = fetchPokemon.data.filter((item) =>
      item.name.includes(keyword?.toLowerCase())
    );

    const typeFilter =
      type !== "all types"
        ? keywordFilter.filter((item) =>
            item.types.find((f) =>
              f.type.name.toLowerCase().includes(type.toLowerCase())
            )
          )
        : keywordFilter;

    return sortBy(typeFilter, sort);
  };

  const sortBy = (data: IPokemonDetailResponse[], type: "id" | "name") => {
    switch (type) {
      case "id":
        return data.sort((a, b) => a.id - b.id);
      case "name":
        return data.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
      default:
        return data.sort((a, b) => a.id - b.id);
    }
  };

  useEffect(() => {
    if (generation !== undefined) {
      callData(generationList[generation]);
    }
  }, [generation]);

  useEffect(() => {
    const data = filterPokemon(keyword, type, sort);
    setPokemonList({
      data: data,
      loading: false,
      error: null,
    });
  }, [keyword, type, sort]);
  return {
    fieldKeyword: register("keyword"),
    fieldGeneration: register("generation"),
    fieldType: register("type"),
    fieldSort: register("sort"),
  };
};

export { useSearchForm };
