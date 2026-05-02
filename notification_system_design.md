# Stage 1

## Priority Inbox Solution

### Approach
The Priority Inbox is designed to always display the top 'n' most important unread notifications. Priority is determined by a combination of two factors:
1. **Weight of the Notification Type**: `Placement` (Weight: 3) > `Result` (Weight: 2) > `Event` (Weight: 1).
2. **Recency**: The timestamp of the notification.

**Scoring Algorithm**:
To combine both factors, we assign a numeric score to each notification:
`Score = Weight + Normalized Timestamp`
(Where the normalized timestamp is the epoch time divided by a large constant, e.g., `1e13`, so it acts as a tie-breaker for notifications of the same type without overriding the type weight).

### Efficient Maintenance of Top 'N'
As new notifications continuously arrive, sorting the entire list every time is inefficient `O(M log M)` where M is the total number of notifications. 

To maintain the top 'n' efficiently, we can use a **Min-Heap (Priority Queue)** of size `n`:
1. Initialize a Min-Heap based on the scoring logic.
2. For every incoming notification, compare its score with the root (minimum score in the top 'n').
3. If the new notification's score is higher than the root, pop the root and insert the new notification.
4. This ensures that processing a new notification takes only `O(log n)` time.
5. The space complexity remains strictly `O(n)`.

Since 'n' is typically small (e.g., 10, 15, 20), this approach is extremely fast and scalable, suitable for high-frequency real-time updates.

### Frontend Implementation
In our Next.js application, the logic is encapsulated in `src/utils/priority.ts`. We sort the fetched notifications using the scoring logic and slice the top 'n' based on the user's selection from the UI dropdown. The unread (new) vs viewed state is maintained via a Set of viewed IDs in the React state.
