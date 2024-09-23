export default function definirSaudacao() {
  const now = new Date();
  const hour = now.getHours();
  if (hour < 6) {
    return "Boa madrugada";
  } else if (hour < 12) {
    return "Bom dia";
  } else if (hour < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}
