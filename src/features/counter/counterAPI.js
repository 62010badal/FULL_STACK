// // A mock function to mimic making an async request for data
// export function fetchCount(amount = 1) {
//   return new Promise((resolve) => {
//     const response  = await fetch('http://localhost8080')
//   const data = await response.json();
//   resolve({data});
//   }
// );
// }


export async function fetchCount(amount = 1) {
  try {
    const response = await fetch('http://localhost:8080');
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Error fetching count:', error);
    return { data: null, error };
  }
}
