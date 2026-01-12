import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BatchService } from '../../core/guard/services/batch/batch-service';
import { IAPIResponse } from '../../model/interfaces/Common.Model';
import { BatchModel } from '../../model/classes/Batch.Model';
import { map, Observable } from 'rxjs';
import { CandidatesModel } from '../../model/classes/candidate.Model';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { CandidateSerives } from '../../core/guard/services/batch/candidates/candidate-serives';
import { enrollmentModel } from '../../model/classes/enrollment.Model';
import { EnrollmentService } from '../../core/guard/services/enrollment/enrollment-service';

@Component({
  selector: 'app-enrollment',
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule ],
  templateUrl: './enrollment.html',
  styleUrl: './enrollment.css',
})
export class Enrollment implements OnInit {


  enrollmetForm: FormGroup = new FormGroup({});

 formBuilder = inject(FormBuilder);
  batchSrv = inject(BatchService);
  batchDate = signal<BatchModel[]>([]);
  candidateSrv = inject(CandidateSerives)
  enrollmentSrv = inject(EnrollmentService);

  enrollmentdata = signal<enrollmentModel[]>([]);

// enrollmentdata: enrollmentModel[] = [];
  candidateList$: Observable<CandidatesModel[]> = new Observable<CandidatesModel[]>;
 


  constructor() {
 
 this.initializeForm();
}

 

  ngOnInit(): void {
    this.getAllBatches();
   this. getAllEnrollments()
    this.candidateList$ = this.candidateSrv.getAllCandidates().pipe(
      map((result: IAPIResponse) => result.data)
    )

  }

  initializeForm()  {
  this.enrollmetForm = this.formBuilder.group({
      enrollmentId:0,
      batchId: 0,
      candidateId: 0,
      enrollmentDate:  new Date() ,
      isActive:  true 
    });
  }
  getAllBatches() {
    this.batchSrv.getAllBatches().subscribe({
      next: (res: IAPIResponse) => {
        this.batchDate.set(res.data)
      }
    })
  }
  getAllEnrollments() {
  debugger
    this.enrollmentSrv.getAllEnrollments().subscribe({
      next: (res: IAPIResponse) => {
        debugger;
        this. enrollmentdata.set(res.data);

      }
    })
  }
 onSaveEnrollment()
  {  
     debugger;
    const formValue = this.enrollmetForm.value;
    this.enrollmentSrv.createNewEnrollment(formValue).subscribe({
      next: (res: IAPIResponse) => {
        debugger;
        if (res.result) {
          alert("Enrollment created successfully");
          this.getAllEnrollments();
        }  
      },
      error: (error) => {
        alert("Api Error" + error.error.message)
      }
    })
  }

 
  resetForm() { }
}
