const API_URL = "http://127.0.0.1:8000";

export async function getKpis() {
  const response = await fetch(`${API_URL}/kpis`);
  return response.json();
}

export async function getStatus() {
  const response = await fetch(`${API_URL}/status`);
  return response.json();
}

export async function getPayments() {
  const response = await fetch(`${API_URL}/payments`);
  return response.json();
}

export async function getReviews() {
  const response = await fetch(`${API_URL}/reviews`);
  return response.json();
}