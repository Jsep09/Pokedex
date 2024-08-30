import { usePokemonListStore } from "@/store/pokemonList";
import Logo from "../../../public/images/logo.webp";
import SearchForm from "@/components/searchForm";
import PokemonCard from "@/components/PokemonCard";
import ReactLoading from "react-loading";

const HomePage = () => {
  const { pokemon, fetchPokemon } = usePokemonListStore();

  return (
    <div className=" w-[90%] m-[auto] max-width-[1100px]  pb-10">
      <div className="flex justify-center ">
        <img src={Logo} alt="logo" className="max-h[80px] mt-[20px]" />
      </div>
      <SearchForm />
      {fetchPokemon.loading && (
        <div className="h-[600px] flex justify-center items-center">
          <ReactLoading type="cylon" color="#fff" />
        </div>
      )}
      {!fetchPokemon.loading && (
        <div className="grid place-content-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-[50px] w-full mt-[40px]">
          {pokemon.data?.map((item) => {
            return (
              <PokemonCard
                key={item.id}
                image={item.image || " "}
                name={item.name}
                id={item.id}
                types={item.types}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
