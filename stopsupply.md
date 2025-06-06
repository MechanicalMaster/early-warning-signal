
### Planning Phase

Here is the step-by-step implementation plan:

**a. Implementation Plan**

1.  **Update Data Model and Dummy Data**
    *   In `app/(dashboard)/stop-supply/page.tsx`, modify the `StopSupplyDealer` interface to remove the `stopReason` property and add `programName: string` and `programCustId: string`.
    *   Update the `stopSupplyDealers` array in the same file. Replace the existing data with a new array of 20 dummy dealers with Indian names and locations. Each dealer object must include values for the new `programName` and `programCustId` fields and should not have the `stopReason` field.

2.  **Modify Table Columns**
    *   In the `TableHeader` of the `Table` component within `app/(dashboard)/stop-supply/page.tsx`:
        *   Remove the `<TableHead>` for "Stop Reason".
        *   Add a new `<TableHead>` for "Program Name" and another for "Program Cust ID", likely after "Anchor Name".
    *   In the `TableBody`, within the `map` function that renders each `TableRow`:
        *   Remove the `<TableCell>` that displays `dealer.stopReason`.
        *   Add corresponding `<TableCell>` elements to display `dealer.programName` and `dealer.programCustId` for each dealer.

3.  **Remove Reason Filter**
    *   In the `CardHeader` section of `app/(dashboard)/stop-supply/page.tsx`, locate the `Select` component responsible for filtering by "All Reasons". Remove this entire component, including its `SelectTrigger` and `SelectContent`.

4.  **Implement Pagination Logic**
    *   In the `StopSupplyPage` component in `app/(dashboard)/stop-supply/page.tsx`, introduce a new state variable to track the current page, e.g., `const [currentPage, setCurrentPage] = useState(1);`.
    *   Define a constant for the number of items to display per page, e.g., `const itemsPerPage = 10;`.
    *   Create a memoized variable using `useMemo` to calculate the data to be displayed on the current page. This will involve slicing the `stopSupplyDealers` array.
    *   Update the `TableBody`'s `.map()` to iterate over this new paginated list of dealers.

5.  **Render Pagination Controls**
    *   Below the `Table` element (but likely within the `CardContent` or in a `CardFooter`), add the pagination UI.
    *   Use the `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationPrevious`, and `PaginationNext` components from `@/components/ui/pagination`.
    *   Implement logic for the "Previous" and "Next" buttons to update the `currentPage` state. Disable the buttons when on the first or last page, respectively.
    *   Dynamically render page number links based on the total number of pages.

**b. Files to be Impacted**

*   `app/(dashboard)/stop-supply/page.tsx`: This is the only file that requires modification. All changes, including data model updates, UI adjustments for the table and filter, and pagination logic, will be implemented here.

**c. Configuration or Database Migrations**

*   None required. This is a frontend-only change involving local component state and static data.