export const saveState = (key: string, value: any) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

export const loadState = <T>(key: string, defaultValue: T): T => {
  try {
    const savedState = window.localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : defaultValue;
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return defaultValue;
  }
};
