import { useState, KeyboardEvent } from 'react';
import { addToFavorites, removeFromFavorites } from '@/app/api/courses';
import Image from 'next/image';
import toast from 'react-hot-toast';

type CourseListProps = {
  courses: Course[];
  onFavoriteToggle: (updatedCourse: Course) => void;
};

export default function CourseList({
  courses,
  onFavoriteToggle,
}: CourseListProps) {
  const [processingIds, setProcessingIds] = useState(new Set());

  const handleFavoriteToggle = async (course: Course) => {
    if (processingIds.has(course.id)) return;

    try {
      setProcessingIds((prev) => new Set([...prev, course.id]));

      if (course.favorite) {
        await removeFromFavorites(course.id);
        toast.success(`Removed "${course.title}" from favorites`);
      } else {
        await addToFavorites(course.id);
        toast.success(`Added "${course.title}" to favorites`);
      }

      const updatedCourse = { ...course, favorite: !course.favorite };
      onFavoriteToggle(updatedCourse);
    } catch (error) {
      toast.error(`Failed to update favorites for "${course.title}"`);
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set([...prev]);
        newSet.delete(course.id);
        return newSet;
      });
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    course: Course
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFavoriteToggle(course);
    }
  };

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No courses found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {courses.map((course) => (
        <button
          key={course.id}
          onClick={() => handleFavoriteToggle(course)}
          onKeyDown={(e) => handleKeyDown(e, course)}
          disabled={processingIds.has(course.id)}
          aria-pressed={course.favorite}
          aria-busy={processingIds.has(course.id)}
          aria-label={`${course.favorite ? 'Remove' : 'Add'} ${
            course.title
          } by ${course.instructorName} ${
            course.favorite ? 'from' : 'to'
          } favorites`}
          className={`
            p-4 border rounded-lg flex items-center gap-4 transition-all w-full text-left
            ${processingIds.has(course.id) ? 'opacity-70' : ''}
            ${
              course.favorite
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          <div className="relative">
            <img
              src={course.instructorImageUrl}
              alt=""
              className="w-16 h-16 object-cover rounded-full"
            />

            {course.favorite && (
              <div
                className="absolute -top-2 -right-2 bg-yellow-400 text-white rounded-full w-6 h-6 flex items-center justify-center"
                aria-hidden="true"
              >
                <Image
                  className="dark:invert"
                  src="/star-icon.svg"
                  alt=""
                  width={14}
                  height={14}
                />
              </div>
            )}

            {processingIds.has(course.id) && (
              <div
                className="absolute inset-0 bg-white bg-opacity-70 rounded-full flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <div>
            <h2
              className={`text-gray-500 font-bold text-lg ${
                !course.favorite ? 'text-white' : ''
              }`}
            >
              {course.instructorName}
            </h2>
            <p
              className={`text-gray-600 ${
                !course.favorite ? 'text-neutral-300' : ''
              }`}
            >
              {course.title}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
