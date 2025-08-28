'use client';
import React, { useState } from 'react';
import { Search, Star, Users, Calendar, BookOpen } from 'lucide-react';

const TutorsPage = () => {
 const [searchTerm, setSearchTerm] = useState('');

 const tutors = [
   {
     id: 1,
     name: "Amira Bennaceur",
     rating: 4.9,
     subject: "Mathematics",
     tags: ["Algebra", "Calculus", "Geometry"],
     students: 95,
     experience: "10+ years",
     monthlyRate: 350,
     image: "https://images.unsplash.com/photo-1494790108755-2616c9a3b9d8?w=400&h=400&fit=crop&crop=face"
   },
   {
     id: 2,
     name: "Youssef El Mansouri",
     rating: 4.8,
     subject: "Physics",
     tags: ["Mechanics", "Electricity", "Thermodynamics"],
     students: 78,
     experience: "8+ years",
     monthlyRate: 350,
     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
   },
   {
     id: 3,
     name: "Salma Alaoui",
     rating: 5.0,
     subject: "Literature",
     tags: ["French", "Arabic", "Writing"],
     students: 124,
     experience: "12+ years",
     monthlyRate: 400,
     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
   },
   {
     id: 4,
     name: "Ahmed Benjelloun",
     rating: 4.7,
     subject: "Chemistry",
     tags: ["Organic", "Physical", "Analytical"],
     students: 89,
     experience: "9+ years",
     monthlyRate: 320,
     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
   },
   {
     id: 5,
     name: "Fatima Zahra El Idrissi",
     rating: 4.9,
     subject: "English",
     tags: ["Grammar", "Speaking", "Literature"],
     students: 156,
     experience: "11+ years",
     monthlyRate: 380,
     image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face"
   },
   {
     id: 6,
     name: "Omar Tazi",
     rating: 4.8,
     subject: "Computer Science",
     tags: ["Programming", "Algorithms", "Database"],
     students: 67,
     experience: "7+ years",
     monthlyRate: 420,
     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
   },
   {
     id: 7,
     name: "Layla Benali",
     rating: 4.6,
     subject: "Biology",
     tags: ["Genetics", "Ecology", "Anatomy"],
     students: 73,
     experience: "6+ years",
     monthlyRate: 300,
     image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
   },
   {
     id: 8,
     name: "Rachid Alami",
     rating: 4.5,
     subject: "Geography",
     tags: ["Physical", "Human", "Cartography"],
     students: 45,
     experience: "5+ years",
     monthlyRate: 280,
     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
   },
   {
     id: 9,
     name: "Khadija Mansouri",
     rating: 4.9,
     subject: "History",
     tags: ["Ancient", "Modern", "Moroccan"],
     students: 102,
     experience: "13+ years",
     monthlyRate: 360,
     image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face"
   }
 ];

 return (
   <div className="min-h-screen bg-gray-50">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       {/* Page Header */}
       <div className="text-center mb-12">
         <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Tutors</h1>
         <p className="text-lg text-gray-600">Meet our experienced teaching professionals</p>
       </div>

       {/* Search and Filters */}
       <div className="flex flex-col md:flex-row gap-4 mb-12">
         <div className="flex-1 relative">
           <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
           <input
             type="text"
             placeholder="Search tutors..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
           />
         </div>
         <select className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
           <option>All Departments</option>
           <option>Mathematics</option>
           <option>Physics</option>
           <option>Chemistry</option>
           <option>Literature</option>
           <option>English</option>
         </select>
         <select className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
           <option>All Status</option>
           <option>Available</option>
           <option>Busy</option>
           <option>Offline</option>
         </select>
       </div>

       {/* Tutors Grid - Row 1 */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
         {tutors.slice(0, 3).map((tutor) => (
           <div key={tutor.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
             {/* Tutor Image */}
             <div className="relative">
               <img
                 src={tutor.image}
                 alt={tutor.name}
                 className="w-full h-64 object-cover"
               />
               <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-sm">
                 <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                 <span className="text-sm font-semibold text-gray-900">{tutor.rating}</span>
               </div>
             </div>

             {/* Tutor Info */}
             <div className="p-6">
               <h3 className="text-xl font-bold text-gray-900 mb-2">{tutor.name}</h3>
               
               {/* Subject */}
               <div className="mb-4">
                 <span className="text-lg font-semibold text-blue-600">{tutor.subject}</span>
               </div>

               {/* Tags */}
               <div className="mb-4">
                 <div className="flex flex-wrap gap-2">
                   {tutor.tags.map((tag, index) => (
                     <span
                       key={index}
                       className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                     >
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>

               {/* Stats */}
               <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                 <div className="flex items-center">
                   <Users className="w-4 h-4 mr-1" />
                   {tutor.students} students
                 </div>
                 <div className="flex items-center">
                   <Calendar className="w-4 h-4 mr-1" />
                   {tutor.experience}
                 </div>
               </div>

               {/* Price and Action */}
               <div className="flex items-center justify-between">
                 <div className="text-lg font-bold text-blue-600">
                   {tutor.monthlyRate} MAD/month
                 </div>
                 <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                   View Profile
                 </button>
               </div>
             </div>
           </div>
         ))}
       </div>

       {/* Tutors Grid - Row 2 */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
         {tutors.slice(3, 6).map((tutor) => (
           <div key={tutor.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
             <div className="relative">
               <img
                 src={tutor.image}
                 alt={tutor.name}
                 className="w-full h-64 object-cover"
               />
               <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-sm">
                 <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                 <span className="text-sm font-semibold text-gray-900">{tutor.rating}</span>
               </div>
             </div>
             <div className="p-6">
               <h3 className="text-xl font-bold text-gray-900 mb-2">{tutor.name}</h3>
               <div className="mb-4">
                 <span className="text-lg font-semibold text-blue-600">{tutor.subject}</span>
               </div>
               <div className="mb-4">
                 <div className="flex flex-wrap gap-2">
                   {tutor.tags.map((tag, index) => (
                     <span
                       key={index}
                       className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                     >
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
               <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                 <div className="flex items-center">
                   <Users className="w-4 h-4 mr-1" />
                   {tutor.students} students
                 </div>
                 <div className="flex items-center">
                   <Calendar className="w-4 h-4 mr-1" />
                   {tutor.experience}
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <div className="text-lg font-bold text-blue-600">
                   {tutor.monthlyRate} MAD/month
                 </div>
                 <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                   View Profile
                 </button>
               </div>
             </div>
           </div>
         ))}
       </div>

       {/* Tutors Grid - Row 3 */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {tutors.slice(6, 9).map((tutor) => (
           <div key={tutor.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
             <div className="relative">
               <img
                 src={tutor.image}
                 alt={tutor.name}
                 className="w-full h-64 object-cover"
               />
               <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-sm">
                 <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                 <span className="text-sm font-semibold text-gray-900">{tutor.rating}</span>
               </div>
             </div>
             <div className="p-6">
               <h3 className="text-xl font-bold text-gray-900 mb-2">{tutor.name}</h3>
               <div className="mb-4">
                 <span className="text-lg font-semibold text-blue-600">{tutor.subject}</span>
               </div>
               <div className="mb-4">
                 <div className="flex flex-wrap gap-2">
                   {tutor.tags.map((tag, index) => (
                     <span
                       key={index}
                       className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                     >
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
               <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                 <div className="flex items-center">
                   <Users className="w-4 h-4 mr-1" />
                   {tutor.students} students
                 </div>
                 <div className="flex items-center">
                   <Calendar className="w-4 h-4 mr-1" />
                   {tutor.experience}
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <div className="text-lg font-bold text-blue-600">
                   {tutor.monthlyRate} MAD/month
                 </div>
                 <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                   View Profile
                 </button>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );
};

export default TutorsPage;