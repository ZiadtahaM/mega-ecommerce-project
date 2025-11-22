/**
 * @file blog.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/components/blog
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
interface BlogPost {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
  category: string;
}
@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.html',
  styleUrl: './blog.css',
 
})
export class Blog {




  allPosts: BlogPost[] = [
    {
      id: 1,
      date: '20 May 2025',
      title: 'Early Minds: What Should Affect Early Childhood Education',
      description: 'We love to share our joy, happiness and daily important tips through our sharing post',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600',
      category: 'Education'
    },
    {
      id: 2,
      date: '18 May 2025',
      title: 'Facilitating the Best Skills in Kids',
      description: 'Developing essential skills through interactive play and learning activities',
      image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600',
      category: 'Development'
    },
    {
      id: 3,
      date: '15 May 2025',
      title: 'Emotional and Mental Development',
      description: 'Understanding the emotional needs of children and supporting mental growth',
      image: 'https://images.unsplash.com/photo-1587616211892-f5b4d2987c7c?w=600',
      category: 'Psychology'
    },
    {
      id: 4,
      date: '12 May 2025',
      title: 'Learning Through Play Activities',
      description: 'Creative activities that enhance learning and cognitive development',
      image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600',
      category: 'Activities'
    },
    {
      id: 5,
      date: '10 May 2025',
      title: 'Building Social Skills Early',
      description: 'Helping children develop strong communication and social abilities',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600',
      category: 'Social'
    },
    {
      id: 6,
      date: '08 May 2025',
      title: 'Creative Arts for Children',
      description: 'Encouraging creativity through art, music, and expressive activities',
      image: 'https://images.unsplash.com/photo-1587616211892-f5b4d2987c7c?w=600',
      category: 'Arts'
    },
    {
      id: 7,
      date: '05 May 2025',
      title: 'Physical Development Milestones',
      description: 'Understanding key physical development stages in early childhood',
      image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600',
      category: 'Health'
    },
    {
      id: 8,
      date: '03 May 2025',
      title: 'Nutrition for Growing Minds',
      description: 'Essential nutrition tips for optimal child development',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600',
      category: 'Nutrition'
    },
    {
      id: 9,
      date: '01 May 2025',
      title: 'Parent-Child Bonding Activities',
      description: 'Strengthening the parent-child relationship through quality time',
      image: 'https://images.unsplash.com/photo-1587616211892-f5b4d2987c7c?w=600',
      category: 'Parenting'
    }
  ];

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 3;
  
  categories = ['All Categories', 'Education', 'Development', 'Activities', 'Arts', 'Health'];
  selectedCategory = 'All Categories';

  popularTags = ['Education', 'Care', 'Learning', 'Health', 'Growth', 'Activities'];

  recentPosts = [
    { title: 'Discovering the new way of digital life', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=100', date: '4 January 2025' },
    { title: 'Care for your children', image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=100', date: '4 January 2025' },
    { title: 'Learning and Development', image: 'https://images.unsplash.com/photo-1587616211892-f5b4d2987c7c?w=100', date: '4 January 2025' }
  ];

  get filteredPosts(): BlogPost[] {
    if (this.selectedCategory === 'All Categories') {
      return this.allPosts;
    }
    return this.allPosts.filter(post => post.category === this.selectedCategory);
  }

  get paginatedPosts(): BlogPost[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredPosts.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPosts.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1; // Reset to first page when category changes
  }
}


