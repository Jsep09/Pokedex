import { Type } from "@/interface/pokemonDetail";
import { Link } from "react-router-dom";

interface PokemonCardProps {
  image: string;
  name: string;
  id: number;
  types: Type[];
}
const PokemonCard = ({ image, name, types }: PokemonCardProps) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-110 transition-all duration-300">
      <Link to={`/detail/${name}`}>
        <img
          className="rounded-t-lg h-[218px] w-full p-[20px]"
          src={image}
          alt=""
        />
      </Link>
      <div className="p-5 bg-white">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
          {name.toUpperCase()}
        </h5>
        <div className="capitalize flex gap-2">
          {types.map((item) => {
            return (
              <span
                key={item.type.name}
                className={`badge-type-${item.type.name} px-2 py-1 rounded-[5px]`}
              >
                {item.type.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
