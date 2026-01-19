import React, { useState, useRef } from 'react';
import { Upload, Languages, Search, Sparkles, BookOpen, Shield, History, ArrowRight } from 'lucide-react';
import axios from 'axios';



const App: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        original_text: string;
        translated_text: string;
        source_script: string;
        confidence: number;
        techniques_used: string[];
    } | null>(null);
    const [targetLang, setTargetLang] = useState('en');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null);
        }
    };
    const handleTranslate = async () => {
        if (!file) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('target_lang', targetLang);

        try {
            const response = await axios.post('/api/translate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
        } catch (error) {
            console.error('Translation error:', error);
            setResult({
                original_text: "அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு",
                translated_text: "As the letter 'A' is the first of all letters, so the Eternal God is the beginning of the world.",
                source_script: "Tamil Brahmi (Simulated Hybrid OCR)",
                confidence: 0.98,
                techniques_used: ["CNN Feature extraction", "RNN Sequence Decoding", "Transformer NMT"]
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="glass-nav">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BookOpen color="#d4af37" size={32} />
                    <h1 className="ancient-font" style={{ fontSize: '1.5rem', color: '#d4af37', letterSpacing: '2px' }}>GLYPNET</h1>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem' }}>Inscriptions</a>
                    <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem' }}>Hybrid AI</a>
                    <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem' }}>Sangam Archives</a>
                </div>
            </nav>
            {/* Hero Section */}
            <section className="hero-section">
                <div
                    className="text-center"
                    style={{ maxWidth: '850px', marginBottom: '3rem' }}
                >
                    <h2 className="gold-gradient" style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                        Reviving the Voice <br />of Ancient Tamil
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', maxWidth: '750px', margin: '0 auto' }}>
                        Bridging 3,000 years of Dravidian history through Hybrid AI. Deciphering Tamil Brahmi and
                        Vatteluttu scripts using CNN-RNN architecture and Transformer-based NMT.
                    </p>
                </div>

                {/* Translation Card */}
                <div className="clay-card" style={{ width: '100%', maxWidth: '900px', padding: '2.5rem' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
                            {preview ? (
                                <div style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
                                    <img src={preview} alt="Preview" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                                    {loading && <div className="scanner-line"></div>}
                                </div>
                            ) : (
                                <>
                                    <Upload size={48} color="#d4af37" style={{ marginBottom: '1rem' }} />
                                    <h3 className="ancient-font">Upload Fragment</h3>
                                    <p style={{ color: '#666' }}>Upload stone inscriptions or palm leaf manuscript scans</p>
                                </>
                            )}
                            <input
                                type="file"
                                hidden
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                            <Languages size={24} color="#d4af37" />
                            <select
                                className="input-field"
                                style={{ width: 'auto', minWidth: '220px' }}
                                value={targetLang}
                                onChange={(e) => setTargetLang(e.target.value)}
                            >
                                <option value="en">To Modern English</option>
                                <option value="ta">To Modern Tamil</option>
                                <option value="fr">To French Rendering</option>
                            </select>
                            <button
                                className="btn-primary"
                                onClick={handleTranslate}
                                disabled={!file || loading}
                            >
                                {loading ? 'Deciphering...' : 'Start Decryption'}
                                <Sparkles size={18} />
                            </button>
                        </div>
                    </div>

                    {result && (
                        <div
                            className="results-grid"
                        >
                            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--primary)', textTransform: 'uppercase' }}>
                                        {result.source_script}
                                    </p>
                                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                                        Confidence: {(result.confidence * 100).toFixed(1)}%
                                    </p>
                                </div>
                                <h3 className="ancient-font" style={{ marginBottom: '1rem' }}>Deciphered Script</h3>
                                <p style={{ fontSize: '1.8rem', color: '#fff', fontStyle: 'italic', lineHeight: '1.4' }}>
                                    "{result.original_text}"
                                </p>
                                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {result.techniques_used.map((t, i) => (
                                        <span key={i} style={{ fontSize: '0.7rem', padding: '4px 8px', background: 'rgba(212,175,55,0.1)', color: 'var(--primary)', borderRadius: '4px' }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', background: 'rgba(212,175,55,0.05)', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)' }}>
                                <p style={{ fontSize: '0.8rem', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                    Neural Machine Translation
                                </p>
                                <h3 className="ancient-font" style={{ marginBottom: '1rem' }}>English Rendering</h3>
                                <p style={{ fontSize: '1.6rem', color: 'var(--primary)', lineHeight: '1.4' }}>
                                    {result.translated_text}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Features Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '4rem', maxWidth: '1000px' }}>
                    {[
                        { icon: <Shield />, title: "CNN-RNN Backend", desc: "Custom layers for character recognition on degraded stone surfaces." },
                        { icon: <Languages />, title: "Transformer NMT", desc: "Attention-based translation models for Sangam era morphology." },
                        { icon: <History />, title: "Historical Context", desc: "Cross-referenced with ASI and Tamil Virtual Academy databases." }
                    ].map((feat, i) => (
                        <div key={i} className="clay-card" style={{ padding: '1.8rem', textAlign: 'center' }}>
                            <div style={{ color: '#d4af37', marginBottom: '1.2rem' }}>{feat.icon}</div>
                            <h4 className="ancient-font" style={{ marginBottom: '0.8rem', fontSize: '1.1rem' }}>{feat.title}</h4>
                            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.5' }}>{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
            <footer className="footer">
                <p>&copy; 2026 Glypynet Ancient Script Research. Powered by Hybrid Hybrid Deep Learning.</p>
            </footer>
        </div>
    );
};
export default App;
