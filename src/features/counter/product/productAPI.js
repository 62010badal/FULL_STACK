// const BaseUrl = process.env.URL
export async function fetchAllProducts() {
  // TODO: we will not hard-code server URL here
  try {
    const response = await fetch("http://localhost:4000/products");
    const data = await response.json();
    return  {data} ;
  } catch (error) {
    // console.error("Error fetching count:", error);
    return { data: null, error };
  }
}


