import { camelizeKeys } from 'humps';

const BASE_URL = 'https://pr-42389.masterclass.dev';
const USER_EMAIL = 'manuel@rootstrap.com';

const headers = {
  'Content-Type': 'application/json',
  Accept: '',
};

export async function fetchCourses(limit = 20, offset = 0): Promise<Course[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/jsonapi/v1/courses?email=${USER_EMAIL}&page[limit]=${limit}&page[offset]=${offset}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const courses = await response.json();

    return camelizeKeys(courses) as Course[];
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
}
