const API_URL = "https://api.ynab.com/v1/budgets";
const API_KEY = null; // Replace with your actual API key

/** 
 * Fetches the budgets that exist based on the given API key.
 * Returns a promise that resolves to an array of { id, name } objects.
 */
async function fetchBudgets() {
    try {
        const response = await fetch(API_URL, {
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

// // Example usage
// fetchBudgets()
//     .then(data => console.log("Budgets:", data))
//     .catch(error => console.error("Error:", error));


