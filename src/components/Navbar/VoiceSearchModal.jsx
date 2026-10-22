import { useState, useEffect } from 'react';
import { Mic, X, AlertCircle } from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';

export default function VoiceSearchModal({ isOpen, onClose }) {
  const { setSearchQuery } = useYouTube();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    let recognition = null;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setErrorMsg('');
      };

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
        if (event.results[current].isFinal) {
          setSearchQuery(text);
          setTimeout(() => {
            onClose();
          }, 800);
        }
      };

      recognition.onerror = () => {
        setErrorMsg('Microphone permission or speech recognition unavailable. You can type query manually!');
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      try {
        recognition.start();
      } catch (e) {
        console.error(e);
      }
    } else {
      // Simulation for browsers without Web Speech API
      const sampleSearches = [
        "Harvard CS50 algorithms",
        "React 19 compiler tutorial",
        "Web development full course",
        "Computer science lab lecture"
      ];
      const randomPick = sampleSearches[Math.floor(Math.random() * sampleSearches.length)];
      
      const timer1 = setTimeout(() => {
        setIsListening(true);
        setTranscript("Listening for speech in university lab...");
      }, 300);

      const timer2 = setTimeout(() => {
        setTranscript(`"${randomPick}"`);
      }, 1500);

      const timer3 = setTimeout(() => {
        setSearchQuery(randomPick);
        setIsListening(false);
        onClose();
      }, 2300);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isOpen, setSearchQuery, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md mx-4 p-6 rounded-2xl bg-white dark:bg-[#212121] text-zinc-900 dark:text-zinc-100 shadow-2xl border border-zinc-200 dark:border-zinc-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          aria-label="Close voice search"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-semibold mb-6">Search with your voice</h3>

        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative mb-6">
            {isListening && (
              <span className="absolute -inset-3 rounded-full bg-red-500/20 animate-ping"></span>
            )}
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isListening ? 'bg-red-600 text-white scale-105 shadow-lg shadow-red-500/40' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}>
              <Mic className="w-9 h-9" />
            </div>
          </div>

          <p className="text-base font-medium text-center text-zinc-700 dark:text-zinc-300 min-h-[2rem]">
            {transcript || (isListening ? 'Listening... Speak now' : 'Tap microphone to speak')}
          </p>

          {errorMsg && (
            <div className="mt-4 flex items-center gap-2 text-xs text-amber-500 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500 text-center">
            Say something like &quot;React 19 tutorial&quot; or &quot;Harvard CS50 lecture&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
