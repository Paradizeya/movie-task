export default function formatDate(inputDate: string): string {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const [year, month, day] = inputDate.split("-").map(Number);
  const formattedDate = `${day} ${months[month - 1]} ${year}`;

  return formattedDate;
}
