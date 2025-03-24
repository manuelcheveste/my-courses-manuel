type CourseListProps = {
  courses: Course[];
};

export default function CourseList({ courses }: CourseListProps) {
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
        <div
          key={course.id}
          className={`
            p-4 border rounded-lg flex items-center gap-4 cursor-pointer transition-all 
          `}
        >
          <div className="relative">
            <img
              src={course.instructorImageUrl}
              alt={course.instructorName}
              className="w-16 h-16 object-cover rounded-full"
            />
          </div>

          <div>
            <h3 className="font-bold text-lg">{course.instructorName}</h3>
            <p className="text-gray-600">{course.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
