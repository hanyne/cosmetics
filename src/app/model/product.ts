export interface Product {
  id?: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  category: {
    main: string; // Catégorie principale
    subcategory?: string; // Sous-catégorie
    subSubcategory?: string; // Sous-sous-catégorie
  };
  price: number;
}
