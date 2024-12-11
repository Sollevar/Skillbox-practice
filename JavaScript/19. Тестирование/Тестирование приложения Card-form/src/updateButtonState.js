export const validityMap = new Map();
export function updateButtonState(sendButton) {
  sendButton.disabled = true;
  if (validityMap.size === 4) {
    const allValid = Array.from(validityMap.values()).every((valid) => valid);
    sendButton.disabled = !allValid;
  }
  return;
}
