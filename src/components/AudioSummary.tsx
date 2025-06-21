import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Play, Pause, Volume2, Info } from 'lucide-react';

const AudioSummary = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      console.log('Audio loaded, duration:', audioRef.current.duration);
    }
  };

  const handleError = (error: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.error('Audio error:', error);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Audio Summary</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Listen to a comprehensive summary of "The Technological Republic"
        </p>
      </div>

      <Card className="border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <CardTitle>Book Summary Podcast</CardTitle>
                <CardDescription>AI-generated audio summary</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              ~9 min
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Audio Player */}
          <div className="bg-slate-50 rounded-lg p-6">
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              onError={handleError}
              className="hidden"
            >
              <source src="/audio/The Technological Republic.wav" type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
            
            <div className="flex items-center space-x-4 mb-4">
              <Button
                onClick={handlePlayPause}
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              
              <div className="flex-1">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #9333ea 0%, #9333ea ${(currentTime / (duration || 1)) * 100}%, #e2e8f0 ${(currentTime / (duration || 1)) * 100}%, #e2e8f0 100%)`
                  }}
                />
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-slate-600">
                {isPlaying ? 'Now playing...' : 'Click play to start listening'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-purple-200 bg-purple-50">
        <Info className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-purple-800">
          <strong>Audio Source:</strong> This summary was generated using AI tools and provides a comprehensive 
          overview of the book's key themes and arguments.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AudioSummary; 