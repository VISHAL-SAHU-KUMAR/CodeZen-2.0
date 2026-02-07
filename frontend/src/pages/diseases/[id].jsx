import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

const DiseaseDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // Mock Data (In a real app, fetch based on ID)
  const disease = {
    id: 1,
    name: 'Wheat Rust',
    category: 'Fungal',
    scientificName: 'Puccinia triticina',
    symptoms: [
      'Small, round, orange-yellow pustules on leaves',
      'Pustules turn black as the plant matures',
      'Stunted growth and reduced grain yield'
    ],
    causes: [
      'High humidity and moisture',
      'Cool temperatures (15-25°C)',
      'Wind-borne spores from infected plants'
    ],
    treatment: [
      'Apply fungicides like Tebuconazole or Propiconazole',
      'Plant resistant wheat varieties',
      'Practice crop rotation to break the disease cycle'
    ],
    prevention: [
      'Remove volunteer wheat plants',
      'Avoid excessive nitrogen fertilization',
      'Monitor fields regularly for early signs'
    ]
  };

  if (!id) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head>
        <title>{disease.name} - Disease Detail</title>
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/diseases" className="text-green-600 hover:text-green-800 font-medium mb-6 inline-block">
          &larr; Back to Library
        </Link>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="h-64 bg-gray-300 w-full flex items-center justify-center">
             <span className="text-gray-500 text-lg">Disease Image Placeholder</span>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{disease.name}</h1>
                <p className="text-sm text-gray-500 italic">{disease.scientificName}</p>
              </div>
              <span className="mt-2 md:mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                High Severity
              </span>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b pb-2">Symptoms</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {disease.symptoms.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b pb-2">Causes</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {disease.causes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <div className="grid md:grid-cols-2 gap-8">
                <section className="bg-green-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-green-900 mb-3">Treatment</h2>
                  <ul className="space-y-2 text-green-800">
                    {disease.treatment.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-blue-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-blue-900 mb-3">Prevention</h2>
                  <ul className="space-y-2 text-blue-800">
                    {disease.prevention.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetail;
