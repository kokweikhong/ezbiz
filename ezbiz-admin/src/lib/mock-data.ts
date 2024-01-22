import { UserValues } from "@/interfaces/user";

// export function mockUsers(length: number): UserValues[] {
//   const mockUserArray: UserValues[] = [];

//   for (let i = 0; i < length; i++) {
//     const mockUser: UserValues = {
//       id: i + 1, // Assuming id starts from 1
//       firstName: `User${i + 1}`,
//       lastName: `Last${i + 1}`,
//       email: `user${i + 1}@example.com`,
//       password: `password${i + 1}`,
//       role: i % 2 === 0 ? "Admin" : "User", // Alternating roles for variety
//       isActive: i % 2 === 0, // Alternating active status for variety
//       pageLimit: Math.floor(Math.random() * 100) + 1, // Random page limit between 1 and 100
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     mockUserArray.push(mockUser);
//   }

//   return mockUserArray;
// }
//

export const mockUsers: UserValues[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    role: "Admin",
    isActive: true,
    pageLimit: 20,
    createdAt: "2022-01-01T12:00:00.000Z",
    updatedAt: "2022-01-02T10:30:00.000Z",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "pass456",
    role: "User",
    isActive: false,
    pageLimit: 30,
    createdAt: "2022-01-03T14:45:00.000Z",
    updatedAt: "2022-01-04T08:20:00.000Z",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    password: "alicePass",
    role: "User",
    isActive: true,
    pageLimit: 25,
    createdAt: "2022-01-05T09:15:00.000Z",
    updatedAt: "2022-01-06T11:10:00.000Z",
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Williams",
    email: "bob.williams@example.com",
    password: "bob123",
    role: "Admin",
    isActive: false,
    pageLimit: 15,
    createdAt: "2022-01-07T16:30:00.000Z",
    updatedAt: "2022-01-08T13:45:00.000Z",
  },
  {
    id: 5,
    firstName: "Eva",
    lastName: "Miller",
    email: "eva.miller@example.com",
    password: "evaPass",
    role: "User",
    isActive: true,
    pageLimit: 18,
    createdAt: "2022-01-09T22:00:00.000Z",
    updatedAt: "2022-01-10T18:55:00.000Z",
  },
  {
    id: 6,
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    password: "davidPass",
    role: "User",
    isActive: false,
    pageLimit: 22,
    createdAt: "2022-01-11T03:40:00.000Z",
    updatedAt: "2022-01-12T20:25:00.000Z",
  },
  {
    id: 7,
    firstName: "Sophie",
    lastName: "Lee",
    email: "sophie.lee@example.com",
    password: "sophiePass",
    role: "User",
    isActive: true,
    pageLimit: 28,
    createdAt: "2022-01-13T14:20:00.000Z",
    updatedAt: "2022-01-14T12:15:00.000Z",
  },
  {
    id: 8,
    firstName: "Michael",
    lastName: "Clark",
    email: "michael.clark@example.com",
    password: "michaelPass",
    role: "Admin",
    isActive: false,
    pageLimit: 35,
    createdAt: "2022-01-15T18:00:00.000Z",
    updatedAt: "2022-01-16T16:10:00.000Z",
  },
  {
    id: 9,
    firstName: "Olivia",
    lastName: "Moore",
    email: "olivia.moore@example.com",
    password: "oliviaPass",
    role: "User",
    isActive: true,
    pageLimit: 21,
    createdAt: "2022-01-17T09:50:00.000Z",
    updatedAt: "2022-01-18T08:05:00.000Z",
  },
  {
    id: 10,
    firstName: "Charlie",
    lastName: "Taylor",
    email: "charlie.taylor@example.com",
    password: "charliePass",
    role: "User",
    isActive: false,
    pageLimit: 24,
    createdAt: "2022-01-19T15:30:00.000Z",
    updatedAt: "2022-01-20T14:25:00.000Z",
  },
];
