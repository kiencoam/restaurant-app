export function formatDateTime(input: string): string {
  const date = new Date(input);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return date.toLocaleString("en-GB", options);
}

//convert from HH:mm:ss dd-MM-yyyy to yyyy-MM-dd HH:mm:ss
export function convertToISODateTime(input: string): string {
  const [time, date] = input.split(" ");
  const [day, month, year] = date.split("-");
  const [hours, minutes, seconds] = time.split(":");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// convert from yyyy-MM-dd HH:mm:ss to HH:mm:ss dd-MM-yyyy x
// convert date to yyyy-MM-dd HH:mm:ss 
export function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatDateToISOString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export function formatTimeToYYYYMMDDTHHMM(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function formatDateToVietnameseFormat(date: Date) {
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = ("0" + date.getDate()).slice(-2); // Ensures the day of the month is two digits

  return `${dayOfWeek} ngày ${dayOfMonth}`;
}

export function formatDateToTimeString(date: Date) {
  const hours = ("0" + date.getHours()).slice(-2); // Ensures the hours are two digits
  const minutes = ("0" + date.getMinutes()).slice(-2); // Ensures the minutes are two digits

  return `${hours}:${minutes}`;
}

export function formatDateToReactComponent(date: Date): JSX.Element {
  // Define month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, "0"); // Pad single digit days with a leading zero
  const month = monthNames[date.getMonth()]; // Get month name from monthNames array
  const year = date.getFullYear();

  // Format the date as "DD Month YYYY"
  return (
    <span>
      <span className="text-[#8c8c8c]">{day}</span> {month}{" "}
      <span className="text-[#8c8c8c]">{year}</span>
    </span>
  );
}

export function getFirstDayOfWeek(date: Date) {
  const firstDayOffset = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const firstDay = new Date(date); // Clone the date object
  firstDay.setDate(date.getDate() - firstDayOffset); // Set the date to the previous Sunday
  return firstDay;
}

export function formatToDDMMYYYY(dateInput) {
  if (!dateInput) return null;

  // Chuyển đổi dateInput sang đối tượng Date nếu cần
  const date = typeof dateInput === 'string' || typeof dateInput === 'number'
    ? new Date(dateInput)
    : dateInput;

  if (isNaN(date)) {
    throw new Error('Invalid date input');
  }

  const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày, thêm '0' nếu cần
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng 0-11, nên +1)
  const year = date.getFullYear(); // Lấy năm

  return `${day}/${month}/${year}`;
}

//"yyyy-MM-dd HH:mm:ss" => "HH:mm"
export function formatToHHColonMM(datetime: string): string {
  // Kiểm tra định dạng chuỗi (nếu cần)
  if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(datetime)) {
    throw new Error("Invalid datetime format. Expected 'yyyy-MM-dd HH:mm:ss'.");
  }

  // Tách phần thời gian từ chuỗi
  const timePart = datetime.split(" ")[1]; // Lấy phần 'HH:mm:ss'
  const hhmm = timePart.slice(0, 5); // Lấy 'HH:mm'

  return hhmm;
}