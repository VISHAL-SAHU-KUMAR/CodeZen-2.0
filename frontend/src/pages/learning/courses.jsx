import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'Modern Organic Farming',
      instructor: 'Dr. Anita Roy',
      duration: '4 Weeks',
      level: 'Beginner',
      image: null,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Hydroponics Masterclass',
      instructor: 'Rahul Sharma',
      duration: '6 Weeks',
      level: 'Intermediate',
      image: null,
      rating: 4.9
    },
    {
      id: 3,
      title: 'Pest Management Strategies',
      instructor: 'Prof. S.K. Gupta',
      duration: '3 Weeks',
      level: 'Advanced',
      image: null,
      rating: 4.7
    },
    {
      id: 4,
      title: 'Soil Health Restoration',
      instructor: 'Dr. Meera Patel',
      duration: '5 Weeks',
      level: 'Intermediate',
      image: null,
      rating: 4.8
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head>
        <title>Learning Center - AgriPredict360</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Agricultural Learning Center
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Upgrade your farming skills with expert-led courses and resources.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-lg shadow-sm inline-flex">
            <Link href="/learning/courses" className="px-4 py-2 rounded-md bg-green-100 text-green-700 font-medium">
              Courses
            </Link>
            <Link href="/learning/schemes" className="px-4 py-2 rounded-md text-gray-600 hover:text-green-600 font-medium">
              Govt Schemes
            </Link>
            <Link href="/learning/webinars" className="px-4 py-2 rounded-md text-gray-600 hover:text-green-600 font-medium">
              Webinars
            </Link>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id} className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {course.level}
                  </span>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-4">Instructor: {course.instructor}</p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {course.duration}
                </div>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
