# AI Coding Guidelines for Batch Recording App (Angular 21)

## Architecture Overview
This is an Angular standalone application for batch recording and fee tracking. Key architectural decisions:
- **Standalone Components**: All components use the `imports` array instead of NgModules
- **Zoneless Change Detection**: Enabled in `app.config.ts` for better performance
- **Layout Wrapper**: Protected routes (`dashboard`, `batch`) are children of a `Layout` component
- **Service Location**: Services are placed under `src/app/core/guard/services/` (not standard, but project-specific)

## Core Patterns

### Component Structure
- Use `inject()` for dependency injection instead of constructor injection
- Implement `OnInit` and `OnDestroy` for lifecycle management
- Use Angular signals for reactive state (e.g., `BatchList = signal<BatchModel[]>([])`)
- Manage subscriptions with a `Subscription` object and unsubscribe in `ngOnDestroy`

Example from `batch-master.ts`:
```typescript
export class BatchMaster implements OnInit, OnDestroy {
  batchSrv = inject(BatchService);
  BatchList = signal<BatchModel[]>([]);
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.loadBatches();
  }

  loadBatches() {
    this.subscription = this.batchSrv.getAllBatches().subscribe({
      next: (result: IAPIResponse) => {
        this.BatchList.set(result.data);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
```

### API Integration
- All API calls return `Observable<IAPIResponse>` with structure: `{result: boolean, message: string, data: any}`
- Base URL defined in `src/environments/environment.ts`
- API endpoints use constants from `src/app/constant/Global.constant.ts`
- HTTP client provided in `app.config.ts`

Example service method:
```typescript
createNewBatch(obj: BatchModel): Observable<IAPIResponse> {
  return this.http.post<IAPIResponse>(environment.API_URL + ApiMethodconstant.BATCH, obj);
}
```

### Authentication
- Login stores user data in `localStorage` with key `'batchuser'` (from `Globalconstat.LOCAL_KEY_LOGIN`)
- Auth guard checks for this key and redirects to `/login` if absent
- Only `dashboard` route is protected; `batch` is accessible without auth

### Data Models
- Classes in `src/app/model/classes/` with constructors initializing default values
- Interfaces in `src/app/model/interfaces/` for API responses

Example model:
```typescript
export class BatchModel {
  batchId: number;
  batchName: string;
  // ... other properties

  constructor() {
    this.batchId = 0;
    this.batchName = " ";
    // ... initialize others
  }
}
```

## Development Workflow
- **Start Dev Server**: `npm start` (runs `ng serve`)
- **Build**: `npm run build` (runs `ng build`)
- **Test**: `npm test` (runs `ng test` with Karma)
- **Debugging**: Use `debugger` statements in code (common in this codebase)
- **Code Style**: Prettier configured with `printWidth: 100`, `singleQuote: true`, Angular parser for HTML

## Key Files
- `src/app/app.config.ts`: Application configuration with zoneless change detection
- `src/app/app.routes.ts`: Routing setup with layout wrapper
- `src/app/core/guard/auth-guard.ts`: Authentication guard logic
- `src/app/constant/Global.constant.ts`: API endpoints and localStorage keys
- `src/environments/environment.ts`: API base URL configuration

## External Dependencies
- API hosted at `https://feestracking.freeprojectapi.com/api/`
- Bootstrap 5.3.8 for styling
- RxJS for reactive programming</content>
<parameter name="filePath">c:\Users\ADMIN\Pictures\feestracking\batch_recording_app_angular21\.github\copilot-instructions.md