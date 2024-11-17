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