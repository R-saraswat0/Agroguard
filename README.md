# 🌿 Plant Disease Identification and Treatment Recommendation System

A web-based AI-powered platform that helps **farmers, home gardeners, and agriculture officers** identify plant diseases and receive treatment recommendations. Users can upload plant images, consult AI for solutions, contact regional managers, read articles, and even purchase fertilizers — all in one platform.

---

## 🛠️ Technologies Used

- **Frontend**: React.js (Vite), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (MERN Stack)
- **AI Integration**:
  - Custom trained **Plant Disease Classification Model**
  - **Gemini API** (via Google AI Studio and Google Cloud) for treatment recommendations
- **Geo API**: For bubble map visualization of plant disease locations
- **Authentication & Authorization**

---

## ⚙️ Key Features

### 🌱 Plant Disease Identification
- Users upload a plant image.
- The system uses a trained ML model to predict the plant disease.

### 🤖 AI Treatment Recommendations
- Gemini API provides actionable treatment suggestions based on disease input.

### 🧑‍💼 Regional Manager Assistance
- If users are unsatisfied with AI recommendations, they can submit a form to a **regional manager**.
- Managers view inquiries and locations on a **Geo API bubble map**.
- Managers can respond via the dashboard.

### 🧪 Fertilizer Store
- Users can browse and purchase fertilizers.

### 📚 Articles and Resources
- Read informative articles about plant diseases and prevention techniques.

### 🔐 Admin Dashboard
- Admins manage users, content, and view system insights.

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

```bash
# Clone the repository
git clone https://github.com/Mihirannanayakkara/SMART_AGRIGUARD_Mern.git

# Install dependencies
npm install

# Start the development server
npm run dev
```
## Note on the Disease Prediction Model

Due to file size or privacy restrictions, the trained prediction model files are *not included* in this repository. 
If you would like to access the model or need assistance setting it up, please contact me directly nanayakkaramihiran@gmail.com

### Some User Interfaces of the website
![Screenshot_13-6-2025_163231_localhost](https://github.com/user-attachments/assets/072fe11e-15f6-44b2-b01e-f22ea8996325)
![Screenshot 2025-06-13 163606](https://github.com/user-attachments/assets/bcc541d3-698b-417b-bb05-2ccf72fea165)
![screencapture-localhost-5173-dashboard-aitreatment-2025-05-05-07_17_13](https://github.com/user-attachments/assets/c12190c7-80d2-47c1-9829-b1d2064da3e1)
![Screenshot_13-6-2025_164211_localhost](https://github.com/user-attachments/assets/c9e44dae-a579-4238-9d1d-eeb69e0c4357)




