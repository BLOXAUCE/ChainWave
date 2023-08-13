export function formatDate(timestamp) {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  return date.toLocaleString(); // Adjust formatting as needed
}
