import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/cart.service';
import { CartItem } from 'src/app/model/cart-item';
import { ProductService } from 'src/app/shared/product.service';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItems: CartItem[] = [];
  isDropdownOpen: boolean = false;
  categories: string[] = [];
  subcategories: string[] = [];
  subSubcategories: string[] = [];
  activeCategory: string = '';
  activeSubcategory: string = '';
  activeSubSubcategory: string = ''; // Ajoutez cette propriété

  constructor(private cartService: CartService, private productService: ProductService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
    this.productService.getDistinctCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  // Fonction pour afficher les sous-catégories d'une catégorie
  getSubcategories(category: string) {
    this.activeCategory = category;
    this.activeSubcategory = ''; // Réinitialise la sous-catégorie active
    this.productService.getDistinctSubcategories(category).subscribe(subcategories => {
      this.subcategories = subcategories;
    });
  }

  // Fonction pour afficher les sous-sous-catégories d'une sous-catégorie
  getSubSubcategories(subcategory: string) {
    this.activeSubcategory = subcategory;
    this.productService.getDistinctSubSubcategories(this.activeCategory, subcategory).subscribe(subSubcategories => {
      this.subSubcategories = subSubcategories;
    });
  }

  // Fonction pour naviguer vers la page des produits de la catégorie
  navigateToCategory(category: string) {
    this.router.navigate(['/category', category]);
  }

  // Fonction pour naviguer vers la page des produits de la sous-catégorie
  navigateToSubcategory(category: string, subcategory: string) {
    this.router.navigate(['/category', category, subcategory]);
  }

  // Fonction pour naviguer vers la page des produits de la sous-sous-catégorie
  navigateToSubSubcategory(category: string, subcategory: string, subSubcategory: string) {
    this.router.navigate(['/category', category, subcategory, subSubcategory]);
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    }).catch(err => {
      alert('Erreur lors de la déconnexion : ' + err.message);
    });
  }
}

