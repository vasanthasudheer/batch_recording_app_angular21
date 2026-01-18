import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { BatchService } from '../../core/guard/services/batch/batch-service';
import { RecordingService } from '../../core/guard/services/recording/recording-service';
import { IAPIResponse } from '../../model/interfaces/Common.Model';
import { BatchModel } from '../../model/classes/Batch.Model';
import { ISession } from '../../model/interfaces/Session.Module';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-session-recordings',
  templateUrl: './session-recordings.html',
  styleUrls: ['./session-recordings.css'],
  standalone: true,
  imports: [ ReactiveFormsModule,CommonModule]
})
export class SessionRecordings implements OnInit {
  fb = inject(FormBuilder);
  batchSrv = inject(BatchService);
  recordingSrv = inject(RecordingService);

  batchList$: Observable<BatchModel[]> = new Observable<BatchModel[]>();
  sessionsdata = signal<ISession[]>([]);

  sessionForm: FormGroup = this.fb.group({
    sessionId: [0],
    batchId: [null, Validators.required],
    topicName: ['', [Validators.required, Validators.minLength(3)]],
    topicDescription: [''],
    youtubeVideoId: [''],
    durationInMinutes: [null, Validators.required],
    sessionDate: [null, Validators.required],
    displayOrder: [0]
  });

  ngOnInit(): void {
    // Load batches
    this.batchList$ = this.batchSrv.getAllBatches().pipe(
      map((res: IAPIResponse) => res.data)
    );

    // Load sessions
    this.loadSessions();
  }

  loadSessions() {
    this.recordingSrv.getAllSessions().subscribe({
      next: (res: IAPIResponse) => {
        if (res.result) {
          this.sessionsdata.set(res.data);
        }
      },
      error: (err) => console.error('Load sessions error:', err)
    });
  }

  saveSession(){
    const formValue = this.sessionForm.value;
    this.recordingSrv.createNewSession(formValue).subscribe({
      next: (result: IAPIResponse) => {
        if (result.result) {
          alert('Session saved successfully!');
          this.loadSessions();
          this.resetForm();
        }
      },
      error: (err) => {
        alert('api error' + err.error.message);

      }
    });

  }

   OnUpdateSession(){
    const formValue = this.sessionForm.value;
    this.recordingSrv.updateSession (formValue.sessionId, formValue).subscribe({
      next: (result: IAPIResponse) => {
        if (result.result) {
          alert('Session updated successfully!');
          this.loadSessions();
          this.resetForm();
        }
      },
      error: (err) => {
        alert('api error' + err.error.message);
      }
    });
   }


  editSession(session: ISession) {
    this.sessionForm.patchValue({
      sessionId: session.sessionId,
      batchId: session.batchId,
      topicName: session.topicName,
      topicDescription: session.topicDescription,
      youtubeVideoId: session.youtubeVideoId,
      durationInMinutes: session.durationInMinutes,
      sessionDate: session.sessionDate,
      displayOrder: session.displayOrder
    });
  }

  deleteSession( Id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this session?');
    if (confirmDelete) {
      this.recordingSrv.deleteSession( Id).subscribe ({
        next: (result: IAPIResponse) => {
          if (result.result) {
            alert('Session deleted successfully!');
            this.loadSessions();
          }
        },
        error: (err) => {
          alert('api error' + err.error.message);
        }
      })
  }
}
  resetForm() {
    this.sessionForm.reset({
      sessionId: 0,
      batchId: null,
      topicName: '',
      topicDescription: '',
      youtubeVideoId: '',
      durationInMinutes: null,
      sessionDate: null,
      displayOrder: 0
    });
  }
}
