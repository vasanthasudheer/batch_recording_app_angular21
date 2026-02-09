import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CandidateSerives } from '../../core/guard/services/batch/candidates/candidate-serives';
import { IAPIResponse } from '../../model/interfaces/Common.Model';
import { CandidatesModel } from '../../model/classes/candidate.Model';
import { CommonModule, NgFor } from '@angular/common';
import { signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Userservices } from '../../core/guard/services/userservices';
import { genericSearch } from '../../core/helper/helper';
@Component({
  selector: 'app-candidates',
  imports: [ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './candidates.html',
  styleUrl: './candidates.css',
})
export class Candidates implements OnInit, OnDestroy {

  candidateForm: FormGroup = new FormGroup({});
  candidateSrv = inject(CandidateSerives)

  subscription: Subscription = new Subscription()
  candidateList = signal<CandidatesModel[]>([]);
  OcandidateList = signal<CandidatesModel[]>([]);
  loading = signal<boolean>(false);
  userSrv = inject(Userservices)


  constructor() {
    this.initializeForm();
    this.userSrv.OnsearchChange.subscribe((searchText: string) => {
      debugger;
      if (searchText == '') {
        this.candidateList.set(this.OcandidateList())

      } else {
        const filterRecord = genericSearch(this.candidateList(), searchText)
        this.candidateList.set(filterRecord);
      }

    })

  }
  ngOnInit(): void {
    this.getCandidates()
  }




  getCandidates() {
    this.subscription = this.candidateSrv.getAllCandidates().subscribe({
      next: (res: IAPIResponse) => {
        this.candidateList.set(res.data)
        this.OcandidateList.set(res.data)
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
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('', [Validators.required]),
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


  onEdit(from: CandidatesModel) {
    this.candidateForm.setValue(from)
  }


  ondelete(id: number) {
    const isDelete = confirm('Are you sure you want to delete this candidate?');
    if (!isDelete) return;

    this.candidateSrv.DeleteCandidate(id).subscribe({
      next: (res: IAPIResponse) => {

        if (res.result) {
          alert('Candidate deleted successfully');
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

  resetForm() {
    this.candidateForm.reset();
  }
}

