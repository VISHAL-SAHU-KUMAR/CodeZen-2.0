import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Webinars = () => {
  const webinars = [
    {
      id: 1,
      title: 'Climate Smart Agriculture',
      speaker: 'Dr. R.K. Singh',
      date: 'Aug 15, 2026',
      time: '10:00 AM - 12:00 PM',
      status: 'Upcoming',
      attendees: 120
    },
    {
      id: 2,
      title: 'Digital Marketing for Farmers',
      speaker: 'Ms. Priya Verma',
      date: 'Aug 20, 2026',
      time: '02:00 PM - 04:00 PM',
      status: 'Upcoming',
      attendees: 85
    },
    {
      id: 3,
      title: 'Water Conservation Techniques',
      speaker: 'Mr. Amit Kumar',
      date: 'Jul 25, 2026',
      time: '11:00 AM - 01:00 PM',
      status: 'Past',
      attendees: 210
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head>
        <title>Webinars - AgriPredict360</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Agricultural Webinars
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Join live sessions with experts and learn from the community.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-lg shadow-sm inline-flex">
            <Link href="/learning/courses" className="px-4 py-2 rounded-md text-gray-600 hover:text-green-600 font-medium">
              Courses
            </Link>
            <Link href="/learning/schemes" className="px-4 py-2 rounded-md text-gray-600 hover:text-green-600 font-medium">
              Govt Schemes
            </Link>
            <Link href="/learning/webinars" className="px-4 py-2 rounded-md bg-green-100 text-green-700 font-medium">
              Webinars
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {webinars.map((webinar) => (
            <div key={webinar.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  webinar.status === 'Upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {webinar.status}
                </span>
                <span className="text-sm text-gray-500">{webinar.attendees} registered</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{webinar.title}</h3>
              <p className="text-sm text-gray-600 mb-4">Speaker: {webinar.speaker}</p>
              
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {webinar.date}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {webinar.time}
                </div>
              </div>
              
              <button className={`mt-6 w-full px-4 py-2 rounded-md font-medium transition-colors ${
                webinar.status === 'Upcoming' 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-100 text-gray-500 cursor-not-allowed'
              }`}>
                {webinar.status === 'Upcoming' ? 'Register Now' : 'View Recording'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Webinars;
