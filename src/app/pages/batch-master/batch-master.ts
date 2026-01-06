import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { BatchModel } from '../../model/classes/Batch.Model';
import { BatchService } from '../../core/guard/services/batch/batch-service';
import { FormsModule } from '@angular/forms';
import { IAPIResponse } from '../../model/interfaces/Common.Model';
import { DatePipe, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-batch-master',
  imports: [FormsModule, NgClass, DatePipe],
  templateUrl: './batch-master.html',
  styleUrl: './batch-master.css',
})
export class BatchMaster implements OnInit, OnDestroy {
  newBatchObj: BatchModel = new BatchModel()
  batchSrv = inject(BatchService);
  BatchList = signal<BatchModel[]>([])
  subscription: Subscription = new Subscription()


  ngOnInit(): void {
    this.loadBatches()
  }


  loadBatches() {
    this.subscription = this.batchSrv.getAllBatches().subscribe({
      next: (result: IAPIResponse) => {
        this.BatchList.set(result.data)
      }
    })
  }


  onSaveBatch() {
    debugger
    this.batchSrv.createNewBatch(this.newBatchObj).subscribe({
      next: (result: IAPIResponse) => {
        debugger
        if (result.result) {
          alert("Batch created successfully")
          this.loadBatches();
        }
      },
      error: (error) => {
        alert("Api Error" + error.error.message)
      }
    })
  }
  editBatch(data: any) {
    this.newBatchObj = data
  }
  UpdateBatch() {
    this.batchSrv.UpdateBatch(this.newBatchObj).subscribe({
    next: (result: IAPIResponse) => {
     debugger
      if (result.result) {
        alert(result.message || 'Batch updated successfully');
        this.resetForm();
        this.loadBatches();
      } else {
        alert('Update failed: ' + (result.message || 'Unknown error'));
      }
    },
    error: (error) => {
      debugger
      alert('API Error: ' + (error?.error?.message || error?.message || 'Unknown error'));
    }
  });
  }

  deleteBatch(batchId: number) {
 debugger

  if (!batchId || batchId <= 0) {
    alert('Invalid batch ID');
    return;
  }

  const isDelete = confirm('Are you sure you want to delete this batch?');
  if (isDelete) {
    this.batchSrv.DeleteBatch(batchId).subscribe({
      next: (res) => {
        debugger
        alert('Batch deleted successfully');
        this.loadBatches();
      },
      error: (err) => {
        console.error(err);
        alert('Delete failed');
      }
    });
  }
}

  resetForm(){
 this.newBatchObj = new BatchModel();
  }
  ngOnDestroy(): void {
       this.subscription.unsubscribe();
    }
}
