export function setBrowserTitle(title: string | undefined | null) {
  if (!title) {
    document.title =
      "Edunity - A portal for the best classroom experience";
    return;
  }

  document.title = `${title} - Edunity`;
}