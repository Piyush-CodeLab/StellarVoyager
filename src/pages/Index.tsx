
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Telescope, Stars, Navigation } from "lucide-react";
import Link from "@/components/Link";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] to-[#0F0F1F] relative overflow-hidden">
      {/* Starry background */}
      <div className="absolute inset-0 opacity-60">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Telescope className="h-8 w-8 text-[#00B7EB]" />
            <h1 className="text-2xl font-bold text-white font-orbitron">StarMap</h1>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-white hover:text-[#00B7EB] transition-colors font-orbitron">
              Home
            </Link>
            <Link href="/starmap" className="text-white hover:text-[#00B7EB] transition-colors font-orbitron">
              Star Map
            </Link>
            <Link href="/history" className="text-white hover:text-[#00B7EB] transition-colors font-orbitron">
              History
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-orbitron bg-gradient-to-r from-[#00B7EB] to-[#6B5B95] bg-clip-text text-transparent">
            Discover the Night Sky!
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Explore a 3D interactive star map, identify constellations, and learn about celestial objects based on your location and time.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-black/30 border-[#6B5B95] backdrop-blur-sm hover:border-[#00B7EB] transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <Stars className="h-12 w-12 text-[#00B7EB] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 font-orbitron">3D Star Map</h3>
                <p className="text-gray-300">Interactive 3D visualization of stars and constellations</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 border-[#6B5B95] backdrop-blur-sm hover:border-[#00B7EB] transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <Navigation className="h-12 w-12 text-[#00B7EB] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 font-orbitron">Location-Based</h3>
                <p className="text-gray-300">See stars visible from your exact location and time</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 border-[#6B5B95] backdrop-blur-sm hover:border-[#00B7EB] transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <Telescope className="h-12 w-12 text-[#00B7EB] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 font-orbitron">AI Descriptions</h3>
                <p className="text-gray-300">Learn about celestial objects with AI-generated insights</p>
              </CardContent>
            </Card>
          </div>

          <Link href="/starmap">
            <Button className="bg-gradient-to-r from-[#00B7EB] to-[#6B5B95] hover:from-[#6B5B95] hover:to-[#00B7EB] text-white px-12 py-4 text-xl font-bold rounded-full border-2 border-[#00B7EB] hover:border-[#6B5B95] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#00B7EB]/50 font-orbitron">
              Explore Stars
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
