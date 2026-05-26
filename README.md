# 🛠️ SuperUtility — Premium Offline-First Utility Suite

SuperUtility is a blazing-fast, state-of-the-art, and **100% free, private-by-design** utility suite. It houses over **50+ professional-grade developer, security, mathematical, and media tools** running entirely client-side inside your browser sandbox. 

**Zero registrations, zero subscriptions, zero limits, and absolutely zero server uploads.** 

---

## 🌟 Key Pillars of SuperUtility

* **Privacy-by-Design**: By leveraging browser-based APIs (Web Cryptography, Canvas, WebAssembly), all calculations, text hashing, PDF manipulation, and image conversions happen locally on your computer. Your files and data **never** touch our servers.
* **Local Neural Network AI**: Our background remover runs deep-learning extraction entirely client-side using **ONNX Runtime Web** and compiled **WebAssembly** instructions, running directly on your CPU/GPU hardware.
* **State-of-the-Art UX**: Styled using a premium, harmonic HSL-tailored visual design with full responsive layout support for mobile, tablet, and desktop viewports, sticky sidebars, and micro-animations.
* **Blazing Fast**: Bootstrapped and statically compiled with **Next.js** and **Turbopack** for instantaneous page pre-rendering and loading times.

---

## 🛠️ Complete Tools Suite (50+ Utilities)

SuperUtility organizes its toolset into folders for frictionless discovery, complete with global fuzzy keyword search (`Ctrl + K` or `Esc` to clear):

### 📸 Media & Image Processing
* **AI Background Remover**: Extract background matting, isolate fine hair details, add professional depth-of-field blurs, screen-blend backlit bloom halos, and solidify clothing/skin holes with our real-time **Subject Edge Sensitivity (Hole-Fill)** canvas slider.
* **Unified Image Editor**: Sequential batch compiler for resizing, cropping, flipping, and compressing images.
* **Lossless PNG to WEBP Converter**: Visual compression presets (`low` / `medium` / `high` / `max`) with real-time compression metrics cards.
* **Color Picker from Image**: Interactive canvas-based loupe color sampler.
* **Image to Base64 & vice versa**: Base64 binary string generator.

### 📄 Document & PDF Tools
* **Unified PDF Editor Workspace**: Drag-and-drop page reordering, page rotations, text watermarking overlays, auto-page numbering, and metadata sanitizer dictionary cleaning.
* **Document Scanner**: Camera capture stream with Black & White clean-print shaders (removes camera shadows for clean document prints) and A4 PDF compilation.
* **PDF Security Vulnerability Scanner**: Safely scans PDF binary streams client-side for auto-launch scripts, attachments, embedded JavaScript, and linkages.
* **Local OCR Text Extractor**: Neural optical character recognition run locally via WASM.
* **PDF Merger & Splitter**: Fast page extraction or ZIP archive compile.

### 🔐 Security & Dev Tools
* **Cryptography**: Password strength checkers, Bcrypt generators, HMAC generators, UUID v4 generators, Random String generators, and SHA-1/256/512 Hashing.
* **Encoding**: HTML converter, URL parser, Base64/Unicode converter, Case converter, JWT decoder.
* **Code Refiners**: CSS Minifier, JS Minifier, Regex tester.

### 🧮 Calculations & Converters
* **Calculators**: Loan & EMI builders, GST calculators, Percentage calculators, Profit margins, and Age trackers.
* **Dynamic Currency Converter**: Real-time conversion using live API fetch with instant offline local cache fallback status indicators.
* **Unit & Measurement Suite**: Real-time conversions across 7 dimensions: Length, Weight, Area, Volume, Temperature, Speed, and Data storage.

---

## 🧠 Technical Architecture

### 1. Offline AI Inference
SuperUtility compiles the **RMBG-1.4 (Robust Multiclass Background Removal)** neural network model into optimized WebAssembly instructions. It executes client-side using **ONNX Runtime Web**, dynamically caching model weights (~72MB) once inside your browser's local **IndexedDB** database cache.

### 2. High-Performance Compositing
Adjustments (like Gaussian Bokeh blurs or screen-blended glowing light wraps) are written in hardware-accelerated canvas filter properties. Alpha-mask processing clamps transparency levels using pixel-by-pixel color buffers:
$$\alpha_{\text{new}} = \alpha \ge (100 - \text{threshold}) \times 2.55 \text{ ? } 255 \text{ : } \min\left(255, \operatorname{round}\left(\alpha \times \frac{255}{(100 - \text{threshold}) \times 2.55}\right)\right)$$

This executes instantly inside the user's thread (0ms lag), allowing smooth real-time slider updates at 60 FPS without repeating heavy neural extraction calculations.

---

## 🚀 Getting Started (Local Setup)

To spin up a local instance of SuperUtility on your computer:

### Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **npm** or **yarn**

### 1. Clone the repository
```bash
git clone https://github.com/synkfr/SuperUtility.git
cd SuperUtility
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root of the project to add your keys:
```env
# Optional: Supply your own Web3Forms access key for the contact form
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
```
*(If no key is supplied, the project automatically falls back to the default fallback key so contact forms work out-of-the-box).*

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for Production (Static Export)
SuperUtility compiles statically for maximum loading speeds and server-free hosting:
```bash
npm run build
```
This builds and exports the entire suite into the `/out` directory, which can be deployed to any static host (Cloudflare Pages, Netlify, Vercel, or GitHub Pages).

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. Free for commercial, personal, and educational use.
