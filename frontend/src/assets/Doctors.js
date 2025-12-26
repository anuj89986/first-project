import doc1 from '/icons/doc1.png'
import doc2 from '/icons/doc2.png'

const doctors = [
  {
    id: 41,
    name: "Dr. Aparna Iyer",
    speciality: "Dermatologist",
    gender: "Female",
    img: doc1,
    qualification: "MBBS, MD (Dermatology)",
    experience: 10,
    phone: "+91 98111 22009",
    hospital: "Radiant Skin Clinic",
    address: "45 MG Road, Bengaluru",
    about:
      "Dr. Aparna specializes in treating acne, pigmentation, and cosmetic dermatology. Known for her gentle approach and patient-friendly consultations."
  },
  {
    id: 42,
    name: "Dr. Rakesh Nair",
    speciality: "General Physician",
    gender: "Male",
    img: doc2,
    qualification: "MBBS, MD (General Medicine)",
    experience: 12,
    phone: "+91 99000 77121",
    hospital: "HealthPoint Hospital",
    address: "22 Residency Road, Bengaluru",
    about:
      "A highly experienced physician focused on preventive medicine and chronic disease management with a holistic care approach."
  },
  {
    id: 43,
    name: "Dr. Meenakshi Rao",
    speciality: "Gynecologist",
    gender: "Female",
    img: doc1,
    qualification: "MBBS, MS (Obstetrics & Gynecology)",
    experience: 14,
    phone: "+91 98188 55670",
    hospital: "Mother's Hope Clinic",
    address: "16 Jubilee Hills, Hyderabad",
    about:
      "Dr. Meenakshi is known for her compassionate care in women's health, with expertise in pregnancy, fertility, and laparoscopic procedures."
  },
  {
    id: 44,
    name: "Dr. Nitin Agarwal",
    speciality: "Pediatrician",
    gender: "Male",
    img: doc2,
    qualification: "MBBS, MD (Pediatrics)",
    experience: 9,
    phone: "+91 98212 66780",
    hospital: "Little Angels Hospital",
    address: "8 MG Road, Delhi",
    about:
      "Dedicated to child care and development, Dr. Nitin focuses on preventive pediatrics, vaccinations, and child nutrition."
  },
  {
    id: 45,
    name: "Dr. Shreya Patel",
    speciality: "Neurologist",
    gender: "Female",
    img: doc1,
    qualification: "MBBS, DM (Neurology)",
    experience: 11,
    phone: "+91 99333 11098",
    hospital: "NeuroWell Institute",
    address: "54 Park Street, Kolkata",
    about:
      "Expert in managing migraine, epilepsy, and neurological disorders, Dr. Shreya is known for her detailed diagnosis and empathetic counseling."
  },
  {
    id: 46,
    name: "Dr. Vikas Reddy",
    speciality: "Gastroenterologist",
    gender: "Male",
    img: doc2,
    qualification: "MBBS, DM (Gastroenterology)",
    experience: 13,
    phone: "+91 98109 22341",
    hospital: "Digestive Health Clinic",
    address: "11 Sector 15, Gurugram",
    about:
      "Dr. Vikas specializes in treating liver, pancreas, and stomach-related diseases with a patient-focused and evidence-based approach."
  },
  {
    id: 47,
    name: "Dr. Priyanka Soni",
    speciality: "Dermatologist",
    gender: "Female",
    img: doc1,
    qualification: "MBBS, MD (Dermatology)",
    experience: 8,
    phone: "+91 99099 44520",
    hospital: "SkinAura Centre",
    address: "23 CG Road, Ahmedabad",
    about:
      "Aesthetic dermatologist with expertise in laser treatments, hair fall management, and non-surgical skin rejuvenation."
  },
  {
    id: 48,
    name: "Dr. Rohan Das",
    speciality: "General Physician",
    gender: "Male",
    img: doc2,
    qualification: "MBBS, MD (General Medicine)",
    experience: 15,
    phone: "+91 98880 22456",
    hospital: "LifeLine Hospital",
    address: "65 Salt Lake, Kolkata",
    about:
      "Specialist in internal medicine and lifestyle diseases, Dr. Rohan emphasizes early diagnosis and patient education for long-term wellness."
  },
  {
    id: 49,
    name: "Dr. Anjali Tiwari",
    speciality: "Gynecologist",
    gender: "Female",
    img: doc1,
    qualification: "MBBS, MS (Gynecology)",
    experience: 9,
    phone: "+91 98213 77890",
    hospital: "Women’s Wellness Centre",
    address: "78 Gomti Nagar, Lucknow",
    about:
      "Dr. Anjali focuses on maternal health, infertility, and preventive gynecology with over a decade of experience."
  },
  {
    id: 50,
    name: "Dr. Saurabh Sharma",
    speciality: "Neurologist",
    gender: "Male",
    img: doc2,
    qualification: "MBBS, DM (Neurology)",
    experience: 12,
    phone: "+91 98100 56781",
    hospital: "NeuroBridge Hospital",
    address: "33 MG Road, Pune",
    about:
      "Dr. Saurabh is a skilled neurologist known for treating movement disorders, stroke rehabilitation, and neurodegenerative diseases."
  },
  {
    id: 51,
    name: "Dr. Komal Jain",
    speciality: "Pediatrician",
    gender: "Female",
    img: doc1,
    qualification: "MBBS, MD (Pediatrics)",
    experience: 7,
    phone: "+91 99887 22009",
    hospital: "Happy Hearts Clinic",
    address: "11 Civil Lines, Jaipur",
    about:
      "Pediatric specialist passionate about preventive healthcare and developmental milestones in infants and young children."
  },
  {
    id: 52,
    name: "Dr. Ravi Malhotra",
    speciality: "Gastroenterologist",
    gender: "Male",
    img: doc2,
    qualification: "MBBS, DM (Gastroenterology)",
    experience: 10,
    phone: "+91 97777 99210",
    hospital: "GutWell Centre",
    address: "28 Sector 12, Noida",
    about:
      "Experienced in advanced endoscopy and digestive health, Dr. Ravi has a calm approach and strong patient communication."
  },
  {
    id: 53,
    name: "Dr. Smita Deshmukh",
    speciality: "Dermatologist",
    gender: "Female",
    img: doc1,
    qualification: "MBBS, MD (Dermatology)",
    experience: 12,
    phone: "+91 98111 66509",
    hospital: "SkinRevive Clinic",
    address: "12 JM Road, Pune",
    about:
      "Renowned for anti-aging and pigmentation treatments, Dr. Smita blends clinical expertise with aesthetic care."
  },
  {
    id: 54,
    name: "Dr. Arjun Kapoor",
    speciality: "General Physician",
    gender: "Male",
    img: doc2,
    qualification: "MBBS, MD (General Medicine)",
    experience: 18,
    phone: "+91 98760 12345",
    hospital: "CareLife Multispeciality",
    address: "56 Civil Lines, Delhi",
    about:
      "A senior general physician with a deep focus on lifestyle diseases, hypertension, and preventive health."
  },
  {
    id: 55,
    name: "Dr. Divya Menon",
    speciality: "Gynecologist",
    gender: "Female",
    img: doc1,
    qualification: "MBBS, MS (Obstetrics & Gynecology)",
    experience: 13,
    phone: "+91 99090 88900",
    hospital: "Harmony Health Centre",
    address: "88 MG Road, Kochi",
    about:
      "Dr. Divya has a special interest in reproductive medicine and ensures a comfortable experience for all her patients."
  }
];
export default doctors;
