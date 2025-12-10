# Team and Grade Ordering API - Frontend Integration Guide

## Endpoint

**URL:** `POST /api/account/update-team-grade-order`

**Base URL:** `https://your-domain.com/api/account/update-team-grade-order`

**Authentication:** Required (JWT Bearer Token from cookies)

**Note:** If you're getting 403 Forbidden errors, check Strapi configuration below.

---

## Request

### Headers

```http
Content-Type: application/json
```

### Request Body

```typescript
{
  accountId: number; // ID of the account
  accountType: string; // "Club" or "Association"
  orderingData: Array<{
    // Array of items to reorder
    id: number; // Team or Grade ID
    sortOrder: number; // New position (1-based or 0-based - your choice)
  }>;
}
```

### Payload Structure

**For Clubs (Teams):**

```json
{
  "accountId": 123,
  "accountType": "Club",
  "orderingData": [
    { "id": 456, "sortOrder": 1 },
    { "id": 457, "sortOrder": 2 },
    { "id": 458, "sortOrder": 3 }
  ]
}
```

**For Associations (Grades):**

```json
{
  "accountId": 789,
  "accountType": "Association",
  "orderingData": [
    { "id": 101, "sortOrder": 1 },
    { "id": 102, "sortOrder": 2 },
    { "id": 103, "sortOrder": 3 }
  ]
}
```

---

## Response

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Ordering updated successfully",
  "data": {
    "updatedCount": 3,
    "accountId": 123,
    "accountType": "Club",
    "totalItems": 3,
    "timestamp": "2025-10-27T10:30:00.000Z"
  }
}
```

### Error Responses

#### 400 Bad Request - Invalid Payload

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PAYLOAD",
    "message": "Each item must have 'id' (number) and 'sortOrder' (number) fields"
  }
}
```

#### 404 Not Found - Item Not Found

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Item with ID 999 not found"
  }
}
```

#### 403 Forbidden - Access Denied

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Item with ID 456 does not belong to account 123"
  }
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An error occurred while updating ordering",
    "details": "Error details here"
  }
}
```

---

## Frontend Integration Example

### React/Next.js Example

```typescript
interface OrderingItem {
  id: number;
  sortOrder: number;
}

interface UpdateOrderRequest {
  accountId: number;
  accountType: 'Club' | 'Association';
  orderingData: OrderingItem[];
}

const updateTeamGradeOrder = async (
  accountId: number,
  accountType: 'Club' | 'Association',
  orderingData: OrderingItem[]
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/account/update-team-grade-order`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId,
          accountType,
          orderingData,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log(`Successfully updated ${data.data.updatedCount} items`);
      return true;
    } else {
      console.error('Failed to update ordering:', data.error);
      return false;
    }
  } catch (error) {
    console.error('Error updating ordering:', error);
    return false;
  }
};

// Usage example
const handleDragEnd = async (result: any) => {
  if (!result.destination) return;

  // Reorder the items array based on drag result
  const reorderedItems = Array.from(teams);
  const [removed] = reorderedItems.splice(result.source.index, 1);
  reorderedItems.splice(result.destination.index, 0, removed);

  // Create ordering data with new sortOrder values
  const orderingData = reorderedItems.map((item, index) => ({
    id: item.id,
    sortOrder: index + 1, // 1-based indexing
  }));

  // Call the API
  await updateTeamGradeOrder(accountId, 'Club', orderingData);

  // Update local state
  setTeams(reorderedItems);
};
```

### Using React Query / TanStack Query

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateTeamGradeOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateOrderRequest) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/account/update-team-grade-order`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update ordering');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['grades'] });
    },
  });
};

// Usage
const { mutate: updateOrder, isPending } = useUpdateTeamGradeOrder();

updateOrder({
  accountId: 123,
  accountType: 'Club',
  orderingData: reorderedItems,
});
```

---

## Validation Rules

### Request Validation

1. **accountId**: Required, must be a number
2. **accountType**: Required, must be "Club" or "Association"
3. **orderingData**: Required, must be an array with at least 1 item
4. **Each item in orderingData**:
   - `id`: Required, must be a number
   - `sortOrder`: Required, must be a number

### Server-Side Validation

1. All items must exist in the database
2. All items must belong to the specified account
3. Account type must match the item type:
   - "Club" → only teams can be updated
   - "Association" → only grades can be updated

---

## Important Notes

### About sortOrder Values

- You can use **1-based indexing** (1, 2, 3...) or **0-based indexing** (0, 1, 2...)
- The backend just stores the values you send
- Make sure to **use the same indexing consistently** throughout your app

### Transaction Safety

- All updates happen in a **database transaction**
- If any update fails, **all changes are rolled back**
- You either update all items or none

### Performance

- Best for updating **up to ~100 items** at once
- For larger datasets, consider batching

### When to Call This API

Call this endpoint when:

- ✅ User completes a drag-and-drop reordering
- ✅ User saves manual ordering changes
- ✅ User reorders items in bulk

Don't call this endpoint:

- ❌ While dragging (use local state)
- ❌ On every keystroke
- ❌ For real-time collaborative editing (consider WebSocket instead)

---

## Testing

### Test Case 1: Success with Club

```bash
curl -X POST http://localhost:1337/api/account/update-team-grade-order \
  -H "Content-Type: application/json" \
  -d '{
    "accountId": 123,
    "accountType": "Club",
    "orderingData": [
      {"id": 456, "sortOrder": 1},
      {"id": 457, "sortOrder": 2}
    ]
  }'
```

### Test Case 2: Success with Association

```bash
curl -X POST http://localhost:1337/api/account/update-team-grade-order \
  -H "Content-Type: application/json" \
  -d '{
    "accountId": 789,
    "accountType": "Association",
    "orderingData": [
      {"id": 101, "sortOrder": 1},
      {"id": 102, "sortOrder": 2}
    ]
  }'
```

### Test Case 3: Invalid Item (Should Return 404)

```bash
curl -X POST http://localhost:1337/api/account/update-team-grade-order \
  -H "Content-Type: application/json" \
  -d '{
    "accountId": 123,
    "accountType": "Club",
    "orderingData": [
      {"id": 99999, "sortOrder": 1}
    ]
  }'
```

### Test Case 4: Missing Fields (Should Return 400)

```bash
curl -X POST http://localhost:1337/api/account/update-team-grade-order \
  -H "Content-Type: application/json" \
  -d '{
    "accountId": 123,
    "accountType": "Club",
    "orderingData": [
      {"id": 456}
    ]
  }'
```

---

## Environment Variables

Make sure your frontend has:

```env
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-url.com
```

Or for local development:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

---

## Troubleshooting 403 Forbidden Error

If you're getting **403 Forbidden**, this is a **Strapi backend permission issue**. Check these:

### Option 1: Disable Auth for Testing (Quick Fix)

In your Strapi route configuration, set `auth: false`:

```javascript
// /src/api/account/routes/account.js
{
  method: 'POST',
  path: '/account/update-team-grade-order',
  handler: 'account.updateTeamGradeOrder',
  config: {
    auth: false,  // ← Add this for testing
    policies: [],
    middlewares: [],
  },
}
```

### Option 2: Enable Permissions in Strapi Admin (Production Fix)

1. Go to **Strapi Admin** → Settings → Users & Permissions → Roles
2. Click on **Authenticated** role (or your custom role)
3. Scroll to **Account** section
4. Enable the checkbox for **`updateTeamGradeOrder`**
5. Click **Save**

### Check Response Body

In your browser Network tab → Click the failed request → **Response** tab should show:

```json
{
  "error": {
    "status": 403,
    "name": "ForbiddenError",
    "message": "Forbidden"
  }
}
```

This confirms it's a permission issue in Strapi.

---

## Questions or Issues?

If you encounter any issues integrating this API:

1. Check the browser console for error messages
2. Verify the `accountId` and `accountType` are correct
3. Ensure all item IDs exist in the database
4. Check that items belong to the specified account
5. Review the error response for specific details

---

**Last Updated:** 2025-10-27
**API Version:** 1.0
