// src/pages/BudgetPage/mockData.js
// Mock data for Budget Dashboard components
// TODO: Replace with real API calls to backend endpoints

// src/pages/BudgetPage/mockData.js
// Mock data for Budget Dashboard components
// TODO: Replace with real API calls to backend endpoints

export const MOCK_BUDGET = {
  id: 1,
  user_id: 1,
  trip_id: 123,
  amount: 1500,
  period: "trip",
  trip_name: "Paris Adventure",
  allocatedBreakdown: [
    { id: "food", name: "Food", allocated: 400, spent: 320, iconName: "utensils" },
    { id: "lodging", name: "Lodging", allocated: 600, spent: 450, iconName: "bed" },
    { id: "transport", name: "Transport", allocated: 250, spent: 120, iconName: "car" },
    { id: "activities", name: "Activities", allocated: 150, spent: 95, iconName: "map-pin" },
    { id: "shopping", name: "Shopping", allocated: 100, spent: 35, iconName: "shopping-bag" }
  ],
  confirmedSpent: 920,
  plannedSpent: 200,
  created_at: "2025-08-01T12:00:00Z",
  updated_at: "2025-08-12T10:30:00Z"
};

export const MOCK_EXPENSES = [
  {
    id: 1,
    date: "2025-08-12",
    category: "food",
    categoryName: "Food",
    description: "Dinner near Eiffel Tower",
    amount: 45.50,
    is_planned: false,
    trip_id: 123,
    created_at: "2025-08-12T19:30:00Z"
  },
  {
    id: 2,
    date: "2025-08-12",
    category: "transport",
    categoryName: "Transport", 
    description: "Metro day pass",
    amount: 12.00,
    is_planned: false,
    trip_id: 123,
    created_at: "2025-08-12T09:15:00Z"
  },
  {
    id: 3,
    date: "2025-08-11",
    category: "activities",
    categoryName: "Activities",
    description: "Louvre Museum ticket",
    amount: 25.00,
    is_planned: true,
    trip_id: 123,
    created_at: "2025-08-11T14:20:00Z"
  },
  {
    id: 4,
    date: "2025-08-11",
    category: "food",
    categoryName: "Food",
    description: "Café breakfast",
    amount: 18.75,
    is_planned: false,
    trip_id: 123,
    created_at: "2025-08-11T08:45:00Z"
  },
  {
    id: 5,
    date: "2025-08-10",
    category: "lodging",
    categoryName: "Lodging",
    description: "Hotel night 2",
    amount: 150.00,
    is_planned: false,
    trip_id: 123,
    created_at: "2025-08-10T22:00:00Z"
  }
];

export const MOCK_CATEGORIES = [
  { id: "food", name: "Food", iconName: "utensils" },
  { id: "lodging", name: "Lodging", iconName: "bed" },
  { id: "transport", name: "Transport", iconName: "car" },
  { id: "activities", name: "Activities", iconName: "map-pin" },
  { id: "shopping", name: "Shopping", iconName: "shopping-bag" },
  { id: "misc", name: "Miscellaneous", iconName: "more-horizontal" }
];

// Mock trips data for Create Trip Budget page
export const MOCK_TRIPS = [
  {
    id: 123,
    title: "Paris Adventure",
    destination: "Paris, France",
    start_date: "2025-09-15",
    end_date: "2025-09-22",
    status: "planned",
    hasBudget: true
  },
  {
    id: 124,
    title: "Tokyo Explorer",
    destination: "Tokyo, Japan",
    start_date: "2025-10-10",
    end_date: "2025-10-20",
    status: "planned",
    hasBudget: false
  },
  {
    id: 125,
    title: "Rome Weekend",
    destination: "Rome, Italy",
    start_date: "2025-11-05",
    end_date: "2025-11-08",
    status: "planned",
    hasBudget: false
  },
  {
    id: 126,
    title: "Barcelona Getaway",
    destination: "Barcelona, Spain",
    start_date: "2025-12-01",
    end_date: "2025-12-07",
    status: "planned",
    hasBudget: false
  }
];

// Budget preset amounts for quick selection
export const BUDGET_PRESETS = [
  { label: "Weekend Trip", amount: 500 },
  { label: "Week Long", amount: 1000 },
  { label: "Extended Stay", amount: 2000 },
  { label: "Luxury Travel", amount: 5000 }
];

// Expected API endpoints and data shapes:
// GET /user/budgets -> { budgets: [MOCK_BUDGET], current: MOCK_BUDGET }
// GET /user/expenses?trip_id=123 -> { expenses: [MOCK_EXPENSES], total: number, page: number }
// POST /user/expenses -> expects: { trip_id, amount, category, description, date, is_planned }
// PATCH /user/expenses/:id -> expects: { amount?, category?, description?, date?, is_planned? }
// DELETE /user/expenses/:id -> returns: { success: boolean, deleted_id: number }
// GET /user/trips/upcoming -> { trips: [MOCK_TRIPS] }
// POST /user/budgets -> expects: { trip_id, amount, allocatedBreakdown: [{category, allocated}] }
// PATCH /user/budgets/:id -> expects: { amount?, allocatedBreakdown? }