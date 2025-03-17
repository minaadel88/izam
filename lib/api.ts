export async function fetchNavigation() {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: [
          { id: "dashboard", label: "Dashboard", icon: "dashboard", visible: true },
          { id: "job-application", label: "Job Application", icon: "application", visible: true },
          { id: "john-doe", label: "John Doe", icon: "user", visible: true },
          { id: "james-bond", label: "James Bond", icon: "user", visible: true },
          { id: "scarlett", label: "Scarlett Johansson", icon: "user", visible: false },
          { id: "qualifications", label: "Qualifications", icon: "qualifications", visible: true },
          { id: "about", label: "About", icon: "about", visible: true },
          { id: "contact", label: "Contact", icon: "contact", visible: true },
        ]
      });
    }, 500);
  });
}

export async function updateNavigation(items: any[]) {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
}

export async function trackNavChange(change: { id: string; from: number; to: number }) {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
}