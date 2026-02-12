# Coinnect - Maya Cash In & Cash Out Kiosk

A Next.js application for a self-service kiosk handling Cash In and Cash Out transactions via Maya, integrated with MacroDroid for automated payment verification.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Supabase Account](https://supabase.com/) (for transaction database)
- An Android Phone with [MacroDroid](https://play.google.com/store/apps/details?id=com.arlosoft.macrodroid) installed
- A Maya Account (on the Android phone)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    cd YOUR_REPO_NAME
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # Manually install supabase-js if needed
    npm install @supabase/supabase-js
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev -- -H 0.0.0.0
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 📱 MacroDroid Setup (For Cash Out)

This system uses MacroDroid on an Android phone to listen for Maya payment notifications and forward them to the PC/Server.

### Step 1: Find Your PC's IP Address
Run the included script in your terminal:
```bash
node get_ip.js
```
*Take note of the IPv4 address (e.g., `192.168.1.15`).*

### Step 2: Create the Macro on Your Phone
1.  Open **MacroDroid**.
2.  Tap **Add Macro**.
3.  **Trigger:**
    -   Select **Notification Received**.
    -   Select **Select Application(s)** -> **Maya**.
    -   Content: Select **Contains** and enter `received` (or any keyword Maya uses for payments).
4.  **Action:**
    -   Select **Connectivity** -> **HTTP Request**.
    -   **Request Method:** `POST`
    -   **URL:** `http://[YOUR_PC_IP]:3000/api/maya/notification`
        -   *Example:* `http://192.168.1.15:3000/api/maya/notification`
    -   **Content Body:**
        -   Content Type: `application/json`
        -   Body: `{"notification": "{notification}"}`
        -   *(Note: Use the blue [...] button to select the `{notification}` variable)*
5.  **Save Macro:** Name it "Coinnect Maya Listener".

### Step 3: Test It
1.  On the Kiosk, go to **Cash Out** -> **Scan QR**.
2.  Pay using your Maya app.
3.  Wait for the notification on the phone.
4.  The Kiosk screen should automatically update to "Success"!

---

## 🛠️ Troubleshooting

-   **Kiosk Not Updating?**
    -   Check if the phone and PC are on the **same Wi-Fi network**.
    -   Verify your IP address hasn't changed (run `node get_ip.js` again).
    -   Check the MacroDroid logs for errors (System Log tile).
-   **"Could not parse amount"?**
    -   Ensure your MacroDroid body is strictly `{"notification": "{notification}"}`.
