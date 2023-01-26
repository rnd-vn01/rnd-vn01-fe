export enum SEARCH_BY {
  ALL = 0,
  CODE = 1,
  NAME = 2,
  DESCRIPTION = 3,
  LOCATION = 4,
  FUNCTIONALITIES = 5,
  METHOD = 6
}

export const passFilter = (item: any, query: string, isPoint: boolean, searchBy: SEARCH_BY) => {
  query = query.trim()
  let passed = false;

  const isAll = searchBy === SEARCH_BY.ALL
  let keyToFilter = "";
  if (!isAll) {
    switch (searchBy) {
      case SEARCH_BY.NAME:
        keyToFilter = "name";
        break;
      case SEARCH_BY.CODE:
        keyToFilter = "code";
        break;
      case SEARCH_BY.DESCRIPTION:
        keyToFilter = "description";
        break;
      case SEARCH_BY.LOCATION:
        keyToFilter = "anatomy";
        break;
      case SEARCH_BY.FUNCTIONALITIES:
        keyToFilter = "functionalities";
        break;
      case SEARCH_BY.METHOD:
        keyToFilter = "method";
        break;
    }
  }

  if (isAll) {
    Object.keys(item).forEach((key) => {
      if ((key === "functionalities" && isPoint)) {
        item[key]?.forEach((subitem) => {
          if (subitem.toUpperCase().includes(query.toUpperCase())) {
            passed = true;
          }
        })
      } else {
        if (item[key]?.toUpperCase().includes(query.toUpperCase())) {
          passed = true;
        }
      }
    })
  } else if (keyToFilter === "functionalities") {
    item[keyToFilter]?.forEach((subitem) => {
      if (subitem.toUpperCase().includes(query.toUpperCase())) {
        passed = true;
      }
    })
  } else {
    if (item[keyToFilter]?.toUpperCase().includes(query.toUpperCase())) {
      passed = true;
    }
  }

  return passed
}
