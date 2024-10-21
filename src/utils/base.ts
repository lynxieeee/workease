export const scrollToElement = (domID: string) => {
  const el = document.getElementById(domID);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
