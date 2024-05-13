import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/cart.service';
import { CartItem } from 'src/app/model/cart-item';
import { ProductService } from 'src/app/shared/product.service';

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

  constructor(private cartService: CartService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
    this.productService.getDistinctCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  // Function to toggle the dropdown menu
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Function to get subcategories of a category
 // Function to get subcategories of a category
getSubcategories(category: string) {
  this.activeCategory = category;
  this.activeSubcategory = ''; // Reset the active subcategory
  this.productService.getDistinctSubcategories(category).subscribe(subcategories => {
    this.subcategories = subcategories;
  });
}

// Function to get sub-subcategories of a subcategory
getSubSubcategories(subcategory: string) {
  this.activeSubcategory = subcategory;
  this.productService.getDistinctSubSubcategories(this.activeCategory, subcategory).subscribe(subSubcategories => {
    this.subSubcategories = subSubcategories;
  });
}


  // Function to navigate to category products page
  navigateToCategory(category: string) {
    this.router.navigate(['/category', category]);
  }

  // Function to navigate to subcategory products page
  navigateToSubcategory(category: string, subcategory: string) {
    this.router.navigate(['/category', category, subcategory]);
  }

  // Function to navigate to sub-subcategory products page
  navigateToSubSubcategory(category: string, subcategory: string, subSubcategory: string) {
    this.router.navigate(['/category', category, subcategory, subSubcategory]);
  }
}
