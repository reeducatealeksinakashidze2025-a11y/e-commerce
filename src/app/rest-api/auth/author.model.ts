export interface Author {
  _id: string;            
  fullName: string;
  userName: string;
  birthDate?: Date;       
  gender?: number;        
  email: string;
  password?: string;      
  posts: string[];        
  createdAt?: Date;       
  updatedAt?: Date;       
}
