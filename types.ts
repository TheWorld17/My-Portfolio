
export type ProjectCategory = "Web Development" | "Network Administration";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  longDescription?: string;
  image?: string;
  price: string;
  specs?: string[];
  link?: string;
}

export interface Service {
  title: string;
  features: string[];
  delivery: string;
  price: string;
  icon: string;
}
