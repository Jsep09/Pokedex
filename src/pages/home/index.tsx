import { usePokemonListStore } from "@/store/pokemonList";
import Logo from "../../../public/images/logo.webp";
import SearchForm from "@/components/searchForm";
import PokemonCard from "@/components/PokemonCard";

const HomePage = () => {
  const { pokemon } = usePokemonListStore();

  return (
    <div className=" w-[90%] m-[auto] max-width-[1100px]">
      <div className="flex justify-center ">
        <img src={Logo} alt="logo" className="max-h[80px] mt-[20px]" />
      </div>
      <SearchForm />
      <div className="grid place-content-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-[50px] w-full mt-[40px]">
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
      </div>
    </div>
  );
};

export default HomePage;
