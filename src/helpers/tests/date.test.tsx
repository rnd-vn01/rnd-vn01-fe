import { faker } from '@faker-js/faker';
import {
  getCurrentDateShortString,
  getCurrentDateTimeFullString,
  getMonthNameFromIndex,
  getShortMonthNameFromIndex
} from 'src/helpers/date';

test("getCurrentDateTimeFullString", () => {
  const randomDate = faker.date.past()
  const dateInfo = {
    date: randomDate.getDate() < 10 ? "0" + randomDate.getDate().toString() : randomDate.getDate(),
    month: randomDate.getMonth() + 1 < 10 ? "0" + (randomDate.getMonth() + 1).toString() : randomDate.getMonth() + 1,
    year: randomDate.getFullYear(),
    hour: randomDate.getHours() % 12 < 10 ? "0" + (randomDate.getHours() % 12).toString() : randomDate.getHours() % 12,
    minute: randomDate.getMinutes() < 10 ? "0" + randomDate.getMinutes().toString() : randomDate.getMinutes()
  }

  expect(getCurrentDateTimeFullString(randomDate))
    .toBe(`${dateInfo.date}/${dateInfo.month}/${dateInfo.year} ${dateInfo.hour}:${dateInfo.minute}`)
})

test("getCurrentDateShortString", () => {
  const randomDate = faker.date.past()
  const dateInfo = {
    date: randomDate.getDate() < 10 ? "0" + randomDate.getDate().toString() : randomDate.getDate(),
    month: randomDate.getMonth() + 1 < 10 ? "0" + (randomDate.getMonth() + 1).toString() : randomDate.getMonth() + 1,
  }

  expect(getCurrentDateShortString(randomDate))
    .toBe(`${dateInfo.date}/${dateInfo.month}`)
})

test("getMonthNameFromIndex", () => {
  let array = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"];

  array.forEach((month, index) => {
    expect(getMonthNameFromIndex(index)).toBe(month)
  })
})

test("getShortMonthNameFromIndex", () => {
  let array = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"];

  array.forEach((month, index) => {
    expect(getShortMonthNameFromIndex(index)).toBe(month.substring(0, 3))
  })
})
