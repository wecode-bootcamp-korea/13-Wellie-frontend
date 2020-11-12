const INITIAL_STATE = {
  books: null,
  type: "all",
  sort: "keyword",
  searchValue: null,
  categories: null,
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case searchTypes.SET_BOOKS:
      return { ...state, books: action.payload };
    case searchTypes.SET_TYPE:
      return { ...state, type: action.payload };
    case searchTypes.SET_SORT:
      return { ...state, sort: action.payload };
    case searchTypes.SET_SEARCHVALUE:
      return { ...state, searchValue: action.payload };
    case searchTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

const searchTypes = {
  SET_BOOKS: "SET_BOOKS",
  SET_TYPE: "SET_TYPE",
  SET_SORT: "SET_SORT",
  SET_SEARCHVALUE: "SET_SEARCHVALUE",
  SET_CATEGORIES: "SET_CATEGORIES",
};

export default searchReducer;
