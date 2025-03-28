'use client';

import { useState, useEffect } from 'react';
import { fetchCourses } from '@/app/api/courses';
import CourseList from '@/app/components/CourseList';
import FilterToggle from '@/app/components/FilterToggle';
import { Toaster } from 'react-hot-toast';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError('Failed to load courses. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();

    // In a production app, could implement a cache refresh interval here
    // Commented implementation would look like:
    /*
    const refreshInterval = setInterval(() => {
      loadCourses();
    }, 60 * 60 * 1000); // Refresh every hour
    
    return () => clearInterval(refreshInterval);
    */
  }, []);

  const displayedCourses = showOnlyFavorites
    ? courses.filter((course) => course.favorite)
    : courses;

  const handleFavoriteToggle = (updatedCourse: Course) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">MasterClass Courses</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">MasterClass Courses</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">MasterClass Courses</h1>

        <FilterToggle
          showOnlyFavorites={showOnlyFavorites}
          setShowOnlyFavorites={setShowOnlyFavorites}
        />
      </div>

      <CourseList
        courses={displayedCourses}
        onFavoriteToggle={handleFavoriteToggle}
      />

      {/* Commented out - would implement for infinite scroll
      <div >
        <button 
          onClick={() => loadMore()}
        >
          Load More
        </button>
      </div>
      */}
    </div>
  );
}
