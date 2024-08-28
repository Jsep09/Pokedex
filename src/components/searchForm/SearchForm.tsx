import { generationList, typesList, sortList } from "@/util/optionList";
import { useSearchForm } from "@/components/searchForm";
const SearchForm = () => {
  const { fieldKeyword } = useSearchForm();
  return (
    <div className="grid grid-cols-4 gap-x-[20px]">
      <div>
        <form className="max-w-sm mx-auto">
          <label htmlFor="generation" className="sr-only">
            Generation
          </label>
          <select
            id="generation"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 white:text-black dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            {generationList.map((item, index) => {
              return (
                <option
                  className="capitalize"
                  key={`generation-key-${index}`}
                  value={index}
                >
                  {item.name}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      <div>
        <form className="max-w-sm mx-auto">
          <label htmlFor="type" className="sr-only">
            Generation
          </label>
          <select
            id="type"
            className="capitalize block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 white:text-black dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            {typesList.map((item, index) => {
              return (
                <option key={`generation-key-${index}`} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      <div>
        <form className="max-w-sm mx-auto">
          <label htmlFor="Sort" className="sr-only">
            Sort
          </label>
          <select
            id="Sort"
            className=" capitalize block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 white:text-black dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Sort</option>
            {sortList.map((item, index) => {
              return (
                <option key={`generation-key-${index}`} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      <div>
        <form className="max-w-sm mx-auto">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>
          <input
            {...fieldKeyword}
            id="Search"
            placeholder="Search"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 white:text-black dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
