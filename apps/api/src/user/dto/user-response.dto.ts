export class UserResponseDto {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profileBio?: string;
  profileSkills?: string[];
  profileResume?: string;
  profileResumeOriginalName?: string;
  profileCompanyId?: string;
  profilePhoto?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
