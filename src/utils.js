
export function frenchToNumber(frgrade) {
  switch (frgrade.toUpperCase()) {
  case '8B+':
    return 0;
  case '8C':
    return 1;
  case '8C+':
    return 2;
  case '9A':
    return 3;
  case '9A+':
    return 4;
  case '9B':
    return 5;
  case '9B+':
    return 6;
  case '9C':
    return 7;
  default:
    return null;
  }
}
