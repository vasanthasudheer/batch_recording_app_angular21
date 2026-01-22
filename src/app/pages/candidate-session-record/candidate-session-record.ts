import { Component, ElementRef, inject, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { GlobalConstant } from '../../constant/Global.constant';
import { EnrollmentService } from '../../core/guard/services/enrollment/enrollment-service';
import { CommonModule } from '@angular/common';
import { Userservices } from '../../core/guard/services/userservices';
import { CandidatesModel } from '../../model/classes/candidate.Model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-candidate-session-record',
  imports: [CommonModule],
  templateUrl: './candidate-session-record.html',
  styleUrl: './candidate-session-record.css',
})
export class CandidateSessionRecord implements OnInit {
  loggedUserData: any;
  enrollSer = inject(EnrollmentService)
  enrollmentList = signal<any[]>([]);
  usersrv = inject(Userservices);
  SessionList = signal<any[]>([]);
  batcsrv = inject(EnrollmentService)
  @ViewChild('VideoModel') ViewModelRef!:ElementRef;
  VideoUrl!:SafeResourceUrl


  constructor(private sanitizer:  DomSanitizer) {
    const localData=localStorage.getItem(GlobalConstant.LOCAL_KEY_LOGIN)
    if(localData != null){
     this. loggedUserData=JSON.parse(localData);
      this.getBatchesByCandidate(this.loggedUserData.candidateId);
    }
    this.usersrv.loggedUserData$.subscribe((res: CandidatesModel) => {

      this.getBatchesByCandidate(res.candidateId);
    })

  }

 openModal(url: string) {
    this.ViewModelRef.nativeElement.style.display = 'block';
    const videoId = this.getVideoId(url);
    this.VideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }
getVideoId(url: string): string {
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : '';
}

  closeModal() {
    if (this.ViewModelRef) {
      this.ViewModelRef.nativeElement.style.display = "none";
    }
  }


  ngOnInit(): void {

  }
  getBatchesByCandidate(id: number) {
    this.enrollSer.getEnrollmentsBatchByCandidateId(id).subscribe({
      next: (res) => {
        console.log(res)
        this.enrollmentList.set(res.data)
      }
    })
  }
  getSessionRecording(bId: number) {
    this.batcsrv.getSessionRecordingbyBatchId(bId).subscribe({
      next: (res) => {
        console.log(res)
        this.SessionList.set(res.data)
      }
    })
  }
} 
