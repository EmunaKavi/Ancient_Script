# Ancient Tamil Inscription Deciphering

A full-stack application for the OCR and translation of ancient Tamil scripts (Brahmi, Vatteluttu) using a hybrid deep learning approach.

## 🧠 Architecture Overview

### 1. OCR Subsystem (CNN-RNN Hybrid)
*   **CNN (Convolutional Neural Network):** Used for robust feature extraction from noisy and degraded input images (e.g., weathered stone inscriptions, faded palm leaves). It captures spatial patterns and script-specific strokes.
*   **RNN (Recurrent Neural Network - LSTM/GRU):** Processes the feature sequences extracted by the CNN to handle the sequential nature of scripts. This "CRNN" architecture is ideal for line-level script recognition without pre-segmenting characters.
*   **CTC (Connectionist Temporal Classification):** Used as the loss function to align the predicted sequence with the ground truth transcriptions.

### 2. Translation Subsystem (Transformer NMT)
*   **Transformer Architecture:** Utilizing multi-head self-attention mechanisms to understand the complex morphology and context of Old Tamil compared to Modern Tamil or English.
*   **NMT (Neural Machine Translation):** An Encoder-Decoder Transformer-based system that maps the deciphered ancient text into fluent modern languages.
*   **Pre-training:** Leverages models like M2M-100 or IndicTrans trained on large-scale Dravidian linguistic corpora.

## 🚀 Tech Stack
*   **Frontend:** React, TypeScript, Vite, Framer Motion (for animations), Lucide React (icons).
*   **Backend:** FastAPI, Python, Uvicorn.
*   **DL Libraries:** PyTorch, Transformers (Hugging Face), EasyOCR (as base).

## 🛠️ Setup

### Backend
1. Navigate to `backend/`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Run: `python main.py`.

### Frontend
1. Navigate to `frontend/`.
2. Install dependencies: `npm install`.
3. Run: `npm run dev`.
"# Ancient_Script" 
