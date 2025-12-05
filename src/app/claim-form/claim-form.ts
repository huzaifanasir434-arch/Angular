
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-claim-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './claim-form.html',
  styleUrls: ['./claim-form.css']
})
export class ClaimFormComponent {
  claimForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm() {
    this.claimForm = this.fb.group({
      holder: this.fb.group({
        organization: [''],
        hrEmpId: [''],
        employeeName: ['', Validators.required],
        designation: [''],
        officeAddress: [''],
        contactNo: [''],
        patientName: ['', Validators.required],
        patientAge: [''],
        cnic: [''],
        relation: [''],
        sex: ['']
      }),

      claim: this.fb.group({
        clinicHospitalDoctor: [''],
        admissionFrom: [''],
        admissionTo: [''],
        surgeonFee: [''],
        otCharges: [''],
        anesthesia: [''],
        consultationFee: [''],
        medicineCost: [''],
        labTestCost: [''],
        otherCharges: [''],
        totalCost: [''],
        natureOfClaim: ['']
      })
    });
  }

  // Reset form
  reset() {
    this.claimForm.reset();
  }

  // Submit & Save to LocalStorage (append to array)
  onSubmit() {
    if (!this.claimForm.valid) {
      alert('Form invalid — fill all required fields');
      return;
    }

    const savedData = {
      ...this.claimForm.value,
      _savedAt: new Date().toISOString() // save timestamp
    };

    // Read existing array (if any), append, and save back
    const key = 'medicalClaimForms';
    const existingRaw = localStorage.getItem(key);
    let arr: any[] = [];

    try {
      arr = existingRaw ? JSON.parse(existingRaw) : [];
      if (!Array.isArray(arr)) arr = [];
    } catch {
      arr = [];
    }

    arr.unshift(savedData); // newest first
    localStorage.setItem(key, JSON.stringify(arr));

    // Auto reset
    this.reset();

    alert('Form submitted & saved to LocalStorage!');
  }
}
