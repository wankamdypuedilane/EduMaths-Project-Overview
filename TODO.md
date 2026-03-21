# TODO.md - EduMaths Setup & Fix Progress

## ✅ [DONE] User Confirmation

Plan approuvé pour DB + Auth fixes

## 📋 Steps to Complete (Progress Tracking)

### 1. [PENDING] Execute DB Schema (Critical - Execute NOW)

```
Supabase Dashboard → SQL Editor → Copy ALL backend/sql/01_content_schema.sql → Ctrl+Enter
→ backend/sql/02_import_data.sql → Ctrl+Enter
→ backend/sql/03_promote_admin.sql (wankamdypuedilane@gmail.com super admin) → Ctrl+Enter
```

**Expected** : No 500 errors + classes visibles

### 2. ✅ [DONE] Edit SignupPage.tsx

Removed redundant useEffect → No more auth loop

### 3. ✅ [DONE] Edit AppRouter.tsx

ProtectedRoute + PublicOnlyRoute guards added

### 4. [PENDING] Test Complete Flow

```
npm run dev → Signup → Terms → Classes (no auth reset!)
F12 Console : 0 errors 500/401
```
