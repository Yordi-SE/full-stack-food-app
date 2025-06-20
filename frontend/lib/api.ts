const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:30001';

export async function fetchMeals() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/foods`);
    if (!response.ok) {
      throw new Error('Failed to fetch meals');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching meals:', error);
    throw error;
  }
}

export async function createMeal(meal: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/foods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meal),
    });
    if (!response.ok) {
      throw new Error('Failed to create meal');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating meal:', error);
    throw error;
  }
}

export async function updateMeal(id: string, meal: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/foods/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meal),
    });
    if (!response.ok) {
      throw new Error('Failed to update meal');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating meal:', error);
    throw error;
  }
}

export async function deleteMealAPI(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/foods/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete meal');
    }
    return true;
  } catch (error) {
    console.error('Error deleting meal:', error);
    throw error;
  }
}

export async function searchMeals(searchTerm: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/foods?name=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      throw new Error('Failed to search meals');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching meals:', error);
    throw error;
  }
}