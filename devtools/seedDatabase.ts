import { faker } from '@faker-js/faker';

export async function seedDatabase(
  models: Record<string, any>,
  count: number = 10 // количество книг и бронирований
) {
  const userModel = models.User;
  const bookModel = models.Book;
  const bookingModel = models.Booking;

  // Очищаем таблицы
  await bookingModel.destroy({ where: {}, truncate: true });
  await bookModel.destroy({ where: {}, truncate: true });
  await userModel.destroy({ where: {}, truncate: true });

  // ------------------ Users ------------------ //
  const fakeUsers = Array.from({ length: 5 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    accessToken: faker.string.uuid(),
  }));
  const users: any[] = await userModel.bulkCreate(fakeUsers, { returning: true });

  // ------------------ Books ------------------ //
  const fakeBooks = Array.from({ length: count }, () => {
    const owner = faker.helpers.arrayElement(users);
    return {
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      ownerId: owner.id,
      status: 'free',
      givenToId: null as number | null,
    };
  });
  const books: any[] = await bookModel.bulkCreate(fakeBooks, { returning: true });

  // ------------------ Bookings ------------------ //
  const today = new Date();
  const fakeBookings = Array.from({ length: count }, (_, i) => {
    const user = faker.helpers.arrayElement(users);
    const book = faker.helpers.arrayElement(books);
    const from = new Date(today);
    from.setDate(today.getDate() + i); // каждый день вперёд
    const to = new Date(from);
    to.setDate(from.getDate() + 1); // на 1 день
    return {
      userId: user.id,
      bookId: book.id,
      from,
      to,
      status: 'active',
    };
  });
  await bookingModel.bulkCreate(fakeBookings);
}
