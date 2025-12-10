# Team and Grade Ordering - Custom Route Specification

## Document Information

- **Feature**: Team and Grade Ordering Management
- **Type**: Custom Route Handler on Existing Account API
- **Version**: 1.0
- **Date**: October 2025
- **Author**: Development Team

---

## Table of Contents

1. [Overview](#overview)
2. [What We're Doing](#what-were-doing)
3. [Route Specification](#route-specification)
4. [Request Payload](#request-payload)
5. [How to Handle It](#how-to-handle-it)
6. [Response Specification](#response-specification)
7. [Implementation Guide](#implementation-guide)

---

## Overview

This document specifies a **new custom route** to be added to the existing **Account API** (`/api/account`) that handles the storage of user-defined sort orders for Teams (Clubs) and Grades (Associations).

### What We're Adding

This is **NOT a new endpoint** - we're adding to the existing Account API:

- ✅ **One new route** in existing routes file
- ✅ **One new handler method** in existing Account controller
- ✅ **Two new service methods** in existing Account service (or one if access check already exists)

### Problem Statement

Users need the ability to customize the display order of their teams or competition grades within categorized groups (e.g., Junior, Senior, Masters for clubs; Competition names for associations). The default ordering from the CMS may not match the user's organizational preferences.

### Solution

Create a drag-and-drop interface in the frontend that allows users to reorder items, then persist this custom ordering to the CMS via a **new custom route handler** added to the existing Account API.

---

## What We're Doing

### Purpose

Allow users to customize the display order of their teams (Clubs) or grades (Associations) by dragging and dropping items in the frontend, then saving that custom order to the database.

### For Clubs:

- Reorder teams within age group categories (Junior, Senior, Masters, Special)
- Grouping depends on account setting `group_assets_by`
- Each team gets a `sortOrder` number and `category` name

### For Associations:

- Reorder grades within competition categories
- Each competition name becomes a category
- Each grade gets a `sortOrder` number and `category` name

### What Happens:

1. User drags items in frontend to reorder them
2. Frontend sends complete list with new positions to backend
3. Backend updates `sortOrder` and `category` fields for each team/grade
4. New order persists and appears everywhere teams/grades are displayed

---

## Route Specification

### New Route to Add to Account API

**Route Path:**

```
POST /api/account/update-team-grade-order
```

**Method:** `POST`

**Handler:** `account.updateTeamGradeOrder` (new method to add to existing Account controller)

**Authentication:** Required (JWT Bearer Token) - Uses existing Account API authentication

**Content-Type:** `application/json`

### What Needs to Be Added

1. **New Route** in `/src/api/account/routes/account.js`
2. **New Handler Method** `updateTeamGradeOrder()` in `/src/api/account/controllers/account.js`
3. **New Service Methods** in `/src/api/account/services/account.js`:
   - `updateOrdering()`
   - Optional: `verifyAccountAccess()` (if not already present)

---

## Request Payload

### Headers

```http
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

### Request Body Structure

```typescript
{
  accountId: number; // ID of the account making the request
  accountType: string; // "Club" or "Association"
  orderingData: Array<{
    id: number; // Team or Grade ID
    sortOrder: number; // Position (1-based indexing)
    category: string; // Group category name
    type: string; // "team" or "grade"
    name: string; // Item name (for logging/validation)
  }>;
}
```

### Example Payload - Club (Teams)

```json
{
  "accountId": 123,
  "accountType": "Club",
  "orderingData": [
    {
      "id": 456,
      "sortOrder": 1,
      "category": "Junior",
      "type": "team",
      "name": "Under 12s Blue"
    },
    {
      "id": 457,
      "sortOrder": 2,
      "category": "Junior",
      "type": "team",
      "name": "Under 14s"
    },
    {
      "id": 458,
      "sortOrder": 1,
      "category": "Senior",
      "type": "team",
      "name": "First Grade"
    }
  ]
}
```

### Example Payload - Association (Grades)

```json
{
  "accountId": 789,
  "accountType": "Association",
  "orderingData": [
    {
      "id": 42588,
      "sortOrder": 1,
      "category": "Junior Cricket",
      "type": "grade",
      "name": "Development Grade"
    },
    {
      "id": 42587,
      "sortOrder": 2,
      "category": "Junior Cricket",
      "type": "grade",
      "name": "Kiwi Cricket Term 1"
    },
    {
      "id": 55503,
      "sortOrder": 1,
      "category": "Premier Cricket",
      "type": "grade",
      "name": "Premier 1 T20"
    }
  ]
}
```

---

## How to Handle It

### Processing Steps in the Handler

#### 1. **Authentication & Authorization**

```
- JWT token validation (handled by existing Account API middleware)
- Extract user from ctx.state.user (provided by Strapi auth)
- Verify user has access to accountId
- Leverage existing account permissions
```

#### 2. **Validation**

```javascript
// Validate request structure
- accountId is required and valid number
- accountType is "Club" or "Association"
- orderingData is array with length > 0
- Each item has: id, sortOrder, category, type, name

// Validate data integrity
- All IDs exist in database
- All IDs belong to the specified account
- Type matches accountType (team for Club, grade for Association)
- sortOrder values are positive integers
```

#### 3. **Database Transaction**

```
BEGIN TRANSACTION

For each item in orderingData:
  1. Find record by ID and type
  2. Verify it belongs to accountId
  3. Update fields:
     - sortOrder = item.sortOrder
     - category = item.category
     - updatedAt = NOW()
  4. If error, ROLLBACK and return error

If all successful:
  COMMIT TRANSACTION
  Log success event
  Return success response
```

#### 4. **Audit Logging**

```javascript
{
  action: "ORDER_UPDATE",
  accountId: 123,
  accountType: "Club",
  userId: 456,
  itemCount: 15,
  timestamp: "2025-10-27T10:30:00Z",
  success: true
}
```

---

## Response Specification

### Success Response

**Status Code:** `200 OK`

**Response Body:**

```json
{
  "success": true,
  "message": "Ordering updated successfully",
  "data": {
    "updatedCount": 15,
    "accountId": 123,
    "accountType": "Club",
    "timestamp": "2025-10-27T10:30:00.000Z"
  },
  "meta": {
    "categories": ["Junior", "Senior", "Masters"],
    "totalItems": 15
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
    "message": "Request validation failed",
    "details": [
      {
        "field": "orderingData[2].sortOrder",
        "issue": "Must be a positive integer"
      }
    ]
  }
}
```

#### 401 Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing authentication token"
  }
}
```

#### 403 Forbidden

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have permission to modify this account's ordering"
  }
}
```

#### 404 Not Found

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "One or more items not found",
    "details": [
      {
        "id": 12345,
        "type": "team",
        "issue": "Team does not exist or does not belong to this account"
      }
    ]
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
    "requestId": "req_abc123xyz"
  }
}
```

---

## Implementation Guide

### Step 1: Add Route to Existing Account Routes

**File:** `/src/api/account/routes/account.js`

Add this route to the existing routes array:

```javascript
{
  method: 'POST',
  path: '/account/update-team-grade-order',
  handler: 'account.updateTeamGradeOrder',
  config: {
    policies: [],
    middlewares: [],
  },
}
```

---

### Step 2: Add Handler to Existing Account Controller

**File:** `/src/api/account/controllers/account.js`

Add this new method to the existing module.exports object:

```javascript
async updateTeamGradeOrder(ctx) {
    try {
      const { accountId, accountType, orderingData } = ctx.request.body;
      const userId = ctx.state.user.id;

      // Validation
      if (!accountId || !accountType || !Array.isArray(orderingData)) {
        return ctx.badRequest('Invalid request payload');
      }

      // Verify user has access to this account
      const hasAccess = await strapi
        .service('api::account.account')
        .verifyAccountAccess(userId, accountId);

      if (!hasAccess) {
        return ctx.forbidden(
          'You do not have permission to modify this account'
        );
      }

      // Process the ordering update
      const result = await strapi
        .service('api::account.account')
        .updateOrdering(accountId, accountType, orderingData);

      // Return success response
      return ctx.send({
        success: true,
        message: 'Ordering updated successfully',
        data: {
          updatedCount: result.updatedCount,
          accountId: accountId,
          accountType: accountType,
          timestamp: new Date().toISOString(),
        },
        meta: {
          categories: result.categories,
          totalItems: orderingData.length,
        },
      });
    } catch (error) {
      strapi.log.error('Error updating ordering:', error);

      return ctx.internalServerError({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while updating ordering',
          requestId: ctx.state.requestId || 'unknown',
        },
      });
    } catch (error) {
      strapi.log.error('Error updating ordering:', error);

      return ctx.internalServerError({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while updating ordering',
          requestId: ctx.state.requestId || 'unknown',
        },
      });
    }
  }
```

---

### Step 3: Add Service Methods to Existing Account Service

**File:** `/src/api/account/services/account.js`

Add these new methods to the existing module.exports object:

```javascript
async verifyAccountAccess(userId, accountId) {
    // Check if user is linked to this account
    const account = await strapi.entityService.findOne(
      'api::account.account',
      accountId,
      {
        populate: ['users'],
      }
    );

    if (!account) return false;

    // Check if user is in the account's users
    const userHasAccess = account.users.some(u => u.id === userId);
    return userHasAccess;
  },

  async updateOrdering(accountId, accountType, orderingData) {
    const contentType =
      accountType === 'Club' ? 'api::team.team' : 'api::grade.grade';
    let updatedCount = 0;
    const categories = new Set();

    // Use transaction for atomic updates
    await strapi.db.transaction(async ({ trx }) => {
      for (const item of orderingData) {
        // Verify item belongs to account
        const entity = await strapi.entityService.findOne(contentType, item.id);

        if (!entity) {
          throw new Error(`${item.type} with ID ${item.id} not found`);
        }

        // Update the entity
        await strapi.entityService.update(contentType, item.id, {
          data: {
            sortOrder: item.sortOrder,
            category: item.category,
          },
        });

        updatedCount++;
        categories.add(item.category);
      }
    });

    return {
      updatedCount,
      categories: Array.from(categories),
    };
  }
```

**Note:** If `verifyAccountAccess()` already exists in your Account service, you can skip adding it again.

---

## Frontend Integration

### Expected API Call from Frontend

```javascript
import { fetcher } from '../lib/api';
import Cookies from 'js-cookie';

const saveTeamGradeOrdering = async orderingData => {
  try {
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/account/update-team-grade-order`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('jwt')}`,
        },
        body: JSON.stringify({
          accountId: accountId,
          accountType: AccType,
          orderingData: orderingData,
        }),
      }
    );

    if (response.success) {
      // Show success notification
      // Clear unsaved changes flag
      return response;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    // Handle error
    console.error('Failed to save ordering:', error);
    throw error;
  }
};
```

---

## Quick Implementation Summary

### Files to Modify (NOT Create)

1. **`/src/api/account/routes/account.js`**

   - Add one route object to existing routes array

2. **`/src/api/account/controllers/account.js`**

   - Add `updateTeamGradeOrder()` method to existing exports

3. **`/src/api/account/services/account.js`**

   - Add `updateOrdering()` method
   - Add `verifyAccountAccess()` method (if not already present)

### That's It!

No new API folders, no new modules. Just add methods to existing Account API files. The route will be accessible at `/api/account/update-team-grade-order` using existing authentication.

---

**End of Specification**
