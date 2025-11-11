# Google Analytics Event Tracking Plan

## Hong Kong A&E Wait Times Application

## Event Naming Convention

Following GA4 best practices:

- **Event names**: Use snake_case (e.g., `hospital_sheet_opened`)
- **Event parameters**: Use camelCase (e.g., `hospitalSlug`, `waitTime`)
- **Categories**: Use descriptive, hierarchical naming

---

## 1. Page & Data Loading Events

### 1.1 Page View (Automatic)

- **Event**: Automatically tracked by GA4
- **Note**: No manual tracking needed unless we want custom page view events

### 1.2 Data Auto-Fetch

- **Event Name**: `data_auto_fetch`
- **Trigger**: When `useHospitalWaitTimes` hook automatically refetches data
- **Parameters**:
    - `fetchType`: "wait_times" | "trends"
    - `lastUpdated`: string (timestamp of previous data)
    - `isStale`: boolean (whether data was stale)
- **Location**: `hooks/useHospitalWaitTimes.ts`

### 1.3 Data Fetch Error

- **Event Name**: `data_fetch_error`
- **Trigger**: When data fetch fails
- **Parameters**:
    - `fetchType`: "wait_times" | "trends"
    - `errorMessage`: string
- **Location**: `hooks/useHospitalWaitTimes.ts`, `hooks/useHospitalTrends.ts`

---

## 2. Table Interaction Events

### 2.1 Hospital Row Click

- **Event Name**: `hospital_row_clicked`
- **Trigger**: When user clicks a row in the hospital table
- **Parameters**:
    - `hospitalSlug`: string (e.g., "QEH")
    - `hospitalName`: string (localized)
    - `region`: string
    - `waitTime`: number (minutes)
- **Location**: `components/HospitalTable/DataTable.tsx`

### 2.2 Table Column Sort

- **Event Name**: `table_column_sorted`
- **Trigger**: When user sorts by a column
- **Parameters**:
    - `columnName`: "name" | "region" | "waitTimes"
    - `sortDirection`: "asc" | "desc"
- **Location**: `components/HospitalTable/Columns.tsx`

### 2.3 Region Filter Applied

- **Event Name**: `region_filter_applied`
- **Trigger**: When user selects a region filter
- **Parameters**:
    - `region`: string | "all"
- **Location**: `components/HospitalTable/Toolbar.tsx`

### 2.4 Critical Cases Filter Toggle

- **Event Name**: `critical_cases_filter_toggled`
- **Trigger**: When user toggles the "Hide hospitals managing critical cases" switch
- **Parameters**:
    - `isEnabled`: boolean
- **Location**: `components/HospitalTable/Toolbar.tsx`

---

## 3. Hospital Sheet Events

### 3.1 Hospital Sheet Opened

- **Event Name**: `hospital_sheet_opened`
- **Trigger**: When hospital detail sheet opens
- **Parameters**:
    - `hospitalSlug`: string
    - `hospitalName`: string (localized)
    - `region`: string
    - `waitTime`: number (minutes)
- **Location**: `components/HospitalWaitTimeView.tsx` (in handleRowSelect)

### 3.2 Hospital Sheet Closed

- **Event Name**: `hospital_sheet_closed`
- **Trigger**: When hospital detail sheet closes
- **Parameters**:
    - `hospitalSlug`: string
- **Location**: `components/HospitalSheet/HospitalSheet.tsx` (in handleOpenChange)

### 3.3 Day of Week Selector Changed

- **Event Name**: `trend_day_changed`
- **Trigger**: When user changes the day selector in the trend chart
- **Parameters**:
    - `hospitalSlug`: string
    - `selectedDay`: string (e.g., "Monday", "Tuesday")
    - `previousDay`: string
- **Location**: `components/HospitalTrendChart.tsx`

### 3.4 External Link Clicked (Sheet)

- **Event Name**: `external_link_clicked`
- **Trigger**: When user clicks external links in hospital sheet
- **Parameters**:
    - `linkType`: "google_maps" | "phone" | "email" | "ha_profile" | "website"
    - `hospitalSlug`: string
- **Location**: `components/HospitalSheet/HospitalSheetInformation.tsx`

---

## 4. Information Drawer Events

### 4.1 Information Drawer Opened

- **Event Name**: `information_drawer_opened`
- **Trigger**: When information drawer opens
- **Parameters**: None
- **Location**: `components/InformationDrawer.tsx`
- **Note**: Replace existing `open_information` event

### 4.2 Information Drawer Closed

- **Event Name**: `information_drawer_closed`
- **Trigger**: When information drawer closes
- **Parameters**: None
- **Location**: `components/InformationDrawer.tsx`

### 4.3 Information Accordion Expanded

- **Event Name**: `information_accordion_expanded`
- **Trigger**: When user expands an accordion item in information drawer
- **Parameters**:
    - `accordionItemId`: string
- **Location**: `components/InformationDrawer.tsx`

### 4.4 External Link Clicked (Drawer)

- **Event Name**: `external_link_clicked`
- **Trigger**: When user clicks HA Service Guide link
- **Parameters**:
    - `linkType`: "ha_service_guide"
- **Location**: `components/InformationDrawer.tsx`

---

## 5. UI Preference Events

### 5.1 Language Changed

- **Event Name**: `language_changed`
- **Trigger**: When user changes language
- **Parameters**:
    - `newLanguage`: "en" | "zh" | "cn"
    - `previousLanguage`: "en" | "zh" | "cn"
- **Location**: `components/LanguageSwitcher.tsx`

### 5.2 Theme Changed

- **Event Name**: `theme_changed`
- **Trigger**: When user toggles theme
- **Parameters**:
    - `newTheme`: "light" | "dark"
    - `previousTheme`: "light" | "dark"
- **Location**: `components/ThemeSwitcher.tsx`

---

## 6. Footer Link Events

### 6.1 Footer Link Clicked

- **Event Name**: `footer_link_clicked`
- **Trigger**: When user clicks footer links
- **Parameters**:
    - `linkType`: "original_site" | "open_data" | "github"
- **Location**: `components/Footer.tsx`

---

## Implementation Notes

1. **Event Parameters**: All events should include relevant context without exposing PII
2. **Non-Interaction Events**: Auto-fetch events should be marked as non-interaction to avoid affecting bounce rate
3. **Error Handling**: Ensure events don't break the application if GA fails
4. **Consistency**: Use the same parameter names across similar events (e.g., `hospitalSlug` always for hospital identifier)

---

## Event Summary Table

| Event Name                       | Category     | Key Parameters                     | Location                                   |
| -------------------------------- | ------------ | ---------------------------------- | ------------------------------------------ |
| `data_auto_fetch`                | Data         | fetchType, lastUpdated             | hooks/useHospitalWaitTimes.ts              |
| `data_fetch_error`               | Data         | fetchType, errorMessage            | hooks/useHospitalWaitTimes.ts              |
| `hospital_row_clicked`           | Table        | hospitalSlug, region, waitTime     | components/HospitalTable/DataTable.tsx     |
| `table_column_sorted`            | Table        | columnName, sortDirection          | components/HospitalTable/Columns.tsx       |
| `region_filter_applied`          | Table        | region                             | components/HospitalTable/Toolbar.tsx       |
| `critical_cases_filter_toggled`  | Table        | isEnabled                          | components/HospitalTable/Toolbar.tsx       |
| `hospital_sheet_opened`          | Sheet        | hospitalSlug, hospitalName, region | components/HospitalWaitTimeView.tsx        |
| `hospital_sheet_closed`          | Sheet        | hospitalSlug                       | components/HospitalSheet/HospitalSheet.tsx |
| `trend_day_changed`              | Sheet        | hospitalSlug, selectedDay          | components/HospitalTrendChart.tsx          |
| `external_link_clicked`          | Sheet/Drawer | linkType, hospitalSlug             | Multiple locations                         |
| `information_drawer_opened`      | UI           | -                                  | components/InformationDrawer.tsx           |
| `information_drawer_closed`      | UI           | -                                  | components/InformationDrawer.tsx           |
| `information_accordion_expanded` | UI           | accordionItemId                    | components/InformationDrawer.tsx           |
| `language_changed`               | UI           | newLanguage, previousLanguage      | components/LanguageSwitcher.tsx            |
| `theme_changed`                  | UI           | newTheme, previousTheme            | components/ThemeSwitcher.tsx               |
| `footer_link_clicked`            | UI           | linkType                           | components/Footer.tsx                      |
