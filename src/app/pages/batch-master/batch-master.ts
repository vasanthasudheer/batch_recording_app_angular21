import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { BatchModel } from '../../model/classes/Batch.Model';
import { BatchService } from '../../core/guard/services/batch/batch-service';
import { FormsModule } from '@angular/forms';
import { IAPIResponse } from '../../model/interfaces/Common.Model';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { finalize, Subscription } from 'rxjs';
import { Userservices } from '../../core/guard/services/userservices';
import { genericSearch } from '../../core/helper/helper';
@Component({
  selector: 'app-batch-master',
  imports: [FormsModule, NgClass, DatePipe,CommonModule],
  templateUrl: './batch-master.html',
  styleUrl: './batch-master.css',
})
export class BatchMaster implements OnInit, OnDestroy {
  newBatchObj: BatchModel = new BatchModel()
  batchSrv = inject(BatchService);
  BatchList = signal<BatchModel[]>([])
  OriginalBatchList = signal<BatchModel[]>([])
  subscription: Subscription = new Subscription();
  loadding = signal<boolean>(false);
  userSrv = inject(Userservices)


  ngOnInit(): void {
    this.loadBatches();
     this.userSrv.OnsearchChange.subscribe((searchText: string) => {
      debugger;
      if (searchText == '') {
        this. BatchList.set(this.OriginalBatchList())

      } else {
        const filterRecord = genericSearch(this.BatchList(), searchText)
        this.BatchList.set(filterRecord);
      }

    })


  }


// loadBatches() {
//   this.loadding.set(true);

//   this.subscription = this.batchSrv.getAllBatches() .pipe(finalize(() => this.loadding.set(false))).subscribe({
//     next: (result: IAPIResponse) => {
//       this.BatchList.set(result.data);
//       this.loadding.set(false); // ✅ stop loader
//     },
//     error: () => {
//       this.loadding.set(false); // ✅ stop loader on error
//     }
//   });
// }
loadBatches() {
  this.loadding.set(true);

  setTimeout(() => {
    this.subscription = this.batchSrv.getAllBatches().subscribe({
      next: (result: IAPIResponse) => {
        this.BatchList.set(result.data);
        this.OriginalBatchList.set(result.data);
        this.loadding.set(false);
      },
      error: () => {
        this.loadding.set(false);
      }
    });
  }, 3000);  
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
    this.newBatchObj = data;

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
        next: (res: IAPIResponse) => {
          debugger
          alert('Batch deleted successfully');
          this.loadBatches();
        },
        error: (err) => {
        
          alert('Delete failed');
        }
      });
    }
  }

  resetForm() {
    this.newBatchObj = new BatchModel();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
