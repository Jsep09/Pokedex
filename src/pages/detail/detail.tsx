import { useEffect, useState } from "react";
import { pokemonDetailServices, pokemonListServices } from "@/service";
import Logo from "../../../public/images/logo.webp";
import { useParams } from "react-router-dom";
import { IPokemonDetailResponse } from "@/interface/pokemonDetail";

type pokemonType = {
  data: IPokemonDetailResponse | undefined;
  loading: boolean;
  error: null | any;
};

const DetailPage = () => {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState<pokemonType>({
    data: undefined,
    loading: true,
    error: null,
  });

  const callData = async (name: string) => {
    const response = await pokemonDetailServices.getpokemonDetail(name);
    if (response.status === 200) {
      setPokemon({ data: response.data, loading: false, error: null });
    } else {
      setPokemon({
        data: undefined,
        loading: false,
        error: response.error,
      });
    }
  };
  useEffect(() => {
    if (name) callData(name);
  }, []);
  return (
    <div className=" w-[90%] m-[auto] max-width-[1100px]">
      <div className="flex justify-center ">
        <img src={Logo} alt="logo" className="max-h[80px] mt-[20px]" />
      </div>
      {name}

      {/* <div className="grid place-content-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-[50px] w-full mt-[40px]">
        {pokemon.data?.map((item) => {
          return (
            <PokemonCard
              image={item.image || " "}
              name={item.name}
              id={item.id}
              types={item.types}
            />
          );
        })}
      </div> */}
    </div>
  );
};

export default DetailPage;
