import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-claims',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-claim.html',
  styleUrls: ['./view-claim.css']
})
export class ViewClaim {
  savedClaims: any[] = [];

  constructor() {
    this.loadClaims();
  }

  loadClaims() {
    const raw = localStorage.getItem('medicalClaimForms'); // matches key used by form
    if (!raw) {
      this.savedClaims = [];
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      this.savedClaims = Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      console.error('Failed to parse saved claims', e);
      this.savedClaims = [];
    }
  }

  // optional: clear all
  clearAll() {
    if (!confirm('Delete all saved claims?')) return;
    localStorage.removeItem('medicalClaimForms');
    this.savedClaims = [];
  }
}
