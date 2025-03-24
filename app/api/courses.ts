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

export async function addToFavorites(courseId: number): Promise<Course> {
  try {
    const response = await fetch(`${BASE_URL}/jsonapi/v1/favorite`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: USER_EMAIL,
        course_id: courseId,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const course = await response.json();

    return camelizeKeys(course) as Course;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
}

export async function removeFromFavorites(courseId: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/jsonapi/v1/favorite`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({
        email: USER_EMAIL,
        course_id: courseId,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
}
