import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from "../constants/actionsTypes";

const fetchProductsBegin = () => ({
type: FETCH_PRODUCTS_BEGIN
});

const fetchProductsSuccess = products => ({
type: FETCH_PRODUCTS_SUCCESS,
payload: { products }
});

const fetchProductsFailure = error => ({
type: FETCH_PRODUCTS_FAILURE,
payload: { error }
});

function fakeGetProducts() {
  return new Promise(resolve => {
    // Resolve after a timeout so we can see the loading indicator
    setTimeout(
      () =>
        resolve({
          products: [
            {
              id: 0,
              name: "Apple"
            },
            {
              id: 1,
              name: "Bananas"
            },
            {
              id: 2,
              name: "Strawberries"
            }
          ]
        }),
      1000
    );
  });
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return fakeGetProducts()
      .then(json => {
        dispatch(fetchProductsSuccess(json.products));
        return json.products;
      })
      .catch(error =>
        dispatch(fetchProductsFailure(error))
      );
  };
}
  