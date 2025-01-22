const API_URL = "https://api.ynab.com/v1";
const API_KEY = null; // Replace with your actual API key

/** 
 * Fetches the budgets that exist based on the given API key.
 * Returns a promise that resolves to an array of { id, name } objects.
 */
async function fetchBudgets() {
    try {
        const response = await fetch(`${API_URL}/budgets`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching budgets: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const budgets = data.data.budgets.map(budget => ({
            id: budget.id,
            name: budget.name
        }));

        return budgets;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

async function fetchCategories(budgetId, showHidden = false) {
    try {
        const response = await fetch(`${API_URL}/budgets/${budgetId}/categories`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching budgets: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const category_groups = data.data.category_groups.map(category_group => ({
            id: category_group.id,
            name: category_group.name,
            categories: category_group.categories
                .filter(category => showHidden || !category.hidden)
                .map(category => ({
                    id: category.id,
                    name: category.name,
                    goal_target: category.goal_target
                }))
        }));

        return category_groups;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// // Example usage
// fetchBudgets()
//     .then(data => console.log("Budgets:", data))
//     .catch(error => console.error("Error:", error));