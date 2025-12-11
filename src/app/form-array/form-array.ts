import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-medical-array',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-array.html',
  styleUrls: ['./form-array.css']
})
export class MedicalArray {

  medicalForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.medicalForm = this.fb.group({
      patients: this.fb.array([this.createPatientGroup()])
    });
  }

  // Create a single patient group
  createPatientGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^03\d{2}-\d{7}$/)]],

      // each patient has its OWN testArray
      testArray: this.fb.array([])
    });
  }

  // Get patients array
  get patientsArray(): FormArray {
    return this.medicalForm.get('patients') as FormArray;
  }

    // Add a new patient
  addPatient() {
    this.patientsArray.push(this.createPatientGroup());
  }

  // Create test field
  createTestField(): FormGroup {
    return this.fb.group({
      testField: new FormControl('')
    });
  }

  // Add a test field to selected patient
  addTestField(patientIndex: number) {
    this.getTestArray(patientIndex).push(this.createTestField());
  }

  // Get testArray of a specific patient
  getTestArray(i: number): FormArray {
    return this.patientsArray.at(i).get('testArray') as FormArray;
  }

  // Delete a test field
  deleteTestField(patientIndex: number, testIndex: number) {
    this.getTestArray(patientIndex).removeAt(testIndex);
  }

  // Delete a patient row
  deletePatient(i: number) {
    this.patientsArray.removeAt(i);
  }

  // Submit all patients
  onSubmit() {
    if (this.medicalForm.valid) {
      console.log("Saved Patients:", this.medicalForm.value);
      localStorage.setItem('patientsList', JSON.stringify(this.medicalForm.value));
      alert("Saved Successfully!");
    }
  }
}
