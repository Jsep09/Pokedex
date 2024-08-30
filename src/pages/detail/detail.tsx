import { useEffect, useState } from "react";
import { pokemonDetailServices, pokemonListServices } from "@/service";
import Logo from "../../../public/images/logo.webp";
import { useParams } from "react-router-dom";
import { IPokemonDetailResponse } from "@/interface/pokemonDetail";
import { Link } from "react-router-dom";
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
      if (response.data)
        setPokemon({
          data: {
            ...response.data,
            image:
              response.data.sprites.other.dream_world.front_default ||
              response.data.sprites.other["official-artwork"].front_default,
          },
          loading: false,
          error: null,
        });
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
    <div className=" w-[90%] m-[auto] max-width-[1100px] pb-10 ">
      <div className="flex">
        <Link to={"/"}>
          <div className="mt-[20px] text-white ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </div>
        </Link>

        <div className="flex justify-center w-full ">
          <img src={Logo} alt="logo" className="max-h[80px] mt-[20px]" />
        </div>
        <div className="mt-[20px]  ">
          <svg
            xmlns="#"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          ></svg>
        </div>
      </div>

      {pokemon.data && (
        <div className="  grid-cols-1  sm:grid-cols-1 md:grid-cols-2 grid gap-[50px] mt-3 ">
          <div>
            <div className="img">
              //{" "}
              <img
                className=" min-h-[299px] max-h-[500px]  w-full hover:scale-110 transition-all duration-700 "
                src={pokemon.data.image}
                alt=""
              />
            </div>
            <div className="flex justify-between mt-10">
              <div className="name&type">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                  {pokemon.data.name.toUpperCase()}
                </h5>
              </div>
              <div className="flex gap-2">
                {pokemon.data.types.map((item) => {
                  return (
                    <span
                      className={`badge-type-${item.type.name} px-2 pt-2 rounded-[5px]`}
                    >
                      {item.type.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className=" h-[100%] w-[100%] grid grid-cols- bg-gray-800 text-white rounded-[5px] justify-self-center p-[30px]">
            <div className="h-[25%]">
              <h5 className="text-white font-semibold text-3xl">Ability</h5>
              <div className="flex justify-center items-center flex-col">
                {pokemon.data.abilities.map((item) => {
                  return (
                    <div className="capitalize w-[50%] bg-[#1f8ae1] mt-3 p-3 flex justify-center rounded-[16px]">
                      {item.ability.name}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" h-[50%] ">
              <h5 className="text-white font-semibold text-3xl ">State</h5>
              <div className="grid gird-cols-1 gap-[10px] mt-[16px]">
                {pokemon.data.stats.map((item) => {
                  return (
                    <div className="flex gap-x-[10px] justify-between">
                      <div className="capitalize w-[50%] mt-3 p-3 flex justify-center rounded-[16px]">
                        {item.stat.name}
                      </div>
                      <div className="capitalize w-[50%]  mt-3 p-3 flex justify-center rounded-[16px]">
                        {item.base_stat}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;

// <div className=" w-[100%] h-[90%]  mt-[20px]">
//   <div>
//     <img
//       className=" min-h-[299px] max-h-[500px]  w-full "
//       src={pokemon.data.image}
//       alt=""
//     />
//   </div>
//   <div className=" flex flex-row justify-between gap-2">
//     <h5 className="mb-2 text-2xl font-bold tracking-tight text-white ">
//       {pokemon.data.name.toUpperCase()}
//     </h5>
//     <div className="capitalize flex gap-2 ">
//       {pokemon.data.types.map((item) => {
//         return (
//           <span
//             className={`badge-type-${item.type.name} px-2 pt-2 rounded-[5px]`}
//           >
//             {item.type.name}
//           </span>
//         );
//       })}
//     </div>
//   </div>
