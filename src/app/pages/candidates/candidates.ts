import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CandidateSerives } from '../../core/guard/services/batch/candidates/candidate-serives';
import { IAPIResponse } from '../../model/interfaces/Common.Model';
import { CandidatesModel } from '../../model/classes/candidate.Model';
import { NgFor } from '@angular/common';
import { signal } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-candidates',
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './candidates.html',
  styleUrl: './candidates.css',
})
export class Candidates implements OnInit, OnDestroy {

  candidateForm: FormGroup = new FormGroup({});
  candidateSrv = inject(CandidateSerives)
  
    subscription: Subscription = new Subscription()
  //  candidateList = signal<CandidatesModel[]>([]);
        candidateList:CandidatesModel[]= [];

  constructor() {
    this.initializeForm();
  }
  ngOnInit(): void {
    this.getCandidates()
  }




  getCandidates() {
  this.subscription=  this.candidateSrv.getAllCandidates().subscribe({
      next: (res: IAPIResponse) => {
        this.candidateList = res.data
      }
    })
  }

  onSaveCandidate() {
    debugger;
    const formValue = this.candidateForm.value;
    this.candidateSrv.createNewCandidate(formValue).subscribe({
      next: (res: IAPIResponse) => {
        debugger;
        if (res.result) {
          alert("Candidate create successfully");
          this.getCandidates();
         
        } else {
          alert(res.message)
        }
      }
    })
  }

  initializeForm() {
    this.candidateForm = new FormGroup({
      candidateId: new FormControl(0),
      fullName: new FormControl(""),
      email: new FormControl(""),
      mobileNumber: new FormControl(""),
      password: new FormControl(""),
      role: new FormControl(""),
      isActive: new FormControl(false),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),

    })
  }
  onUpdateCandidate() {
  debugger;
  this.candidateSrv.UpdateCandidate(this.candidateForm.value).subscribe({
    next: (res: IAPIResponse) => {
      debugger;
      alert('Candidate updated');
      this.getCandidates();
      this.resetForm();
    },
    error: (err) => {
      console.error(err);
      alert(err.error.message);
    }
  });
}


  onEdit(from:CandidatesModel){
    this.candidateForm.setValue(from)
  }

  
  ondelete (id: number){
  const isDelete = confirm('Are you sure you want to delete this candidate?');
  if (!isDelete) return;

  this.candidateSrv.DeleteCandidate(id).subscribe({
    next: (res: IAPIResponse) => {
      
      if (res.result) {
        alert(  'Candidate deleted successfully');
        this.getCandidates();
        
      } else {
        alert(res.message || 'Delete failed');
      }
    },
    error: (err) => {
    debugger
      alert('apiError.message');
    }
  });
}
ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

resetForm(){
  this.candidateForm.reset();
}
  }
 
