// Courses Marketplace Types

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  category:
    | "business"
    | "finance"
    | "marketing"
    | "technology"
    | "leadership"
    | "compliance";
  level: "beginner" | "intermediate" | "advanced";
  format: "online" | "in_person" | "hybrid";
  duration: {
    hours: number;
    weeks?: number;
  };
  schedule?: {
    startDate: string;
    endDate: string;
    sessions: CourseSession[];
  };
  price: {
    amount: number;
    currency: string;
  };
  maxParticipants?: number;
  currentEnrollments: number;
  prerequisites: string[];
  learningOutcomes: string[];
  materials: string[];
  certification: boolean;
  status: "draft" | "published" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface CourseSession {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  meetingLink?: string;
  materials?: string[];
}

export interface CourseEnrollment {
  id: string;
  courseId: string;
  studentId: string;
  enrolledAt: string;
  status: "enrolled" | "in_progress" | "completed" | "dropped" | "failed";
  progress: number; // 0-100
  completedSessions: string[];
  grade?: number;
  certificateIssued?: boolean;
  certificateId?: string;
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  bio: string;
  expertise: string[];
  qualifications: string[];
  experience: number; // years
  rating: number;
  coursesCount: number;
  studentsCount: number;
  verified: boolean;
}
