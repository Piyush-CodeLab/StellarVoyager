
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Map, History, Telescope, LogOut, User } from "lucide-react";
import Link from "@/components/Link";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] to-[#0F0F1F] flex items-center justify-center">
        <div className="text-white font-orbitron">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] to-[#0F0F1F] relative">
      {/* Starry background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-4 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Star className="h-6 w-6 text-[#00B7EB]" />
            <span className="text-xl font-bold text-white font-orbitron">Space Explorer</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-white">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <Button
                  onClick={signOut}
                  variant="outline"
                  size="sm"
                  className="border-[#00B7EB] text-[#00B7EB] hover:bg-[#00B7EB] hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-[#00B7EB] to-[#6B5B95] hover:from-[#6B5B95] hover:to-[#00B7EB] text-white font-orbitron">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#00B7EB] to-[#6B5B95] flex items-center justify-center">
              <Telescope className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-orbitron">
              Space Explorer
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover the wonders of the cosmos with our interactive star map. 
              Explore constellations, learn about celestial objects, and track your astronomical observations.
            </p>
            
            {user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/starmap">
                  <Button size="lg" className="bg-gradient-to-r from-[#00B7EB] to-[#6B5B95] hover:from-[#6B5B95] hover:to-[#00B7EB] text-white text-lg px-8 py-3 font-orbitron">
                    <Map className="mr-2 h-5 w-5" />
                    Explore Star Map
                  </Button>
                </Link>
                <Link href="/history">
                  <Button size="lg" variant="outline" className="border-[#6B5B95] text-[#6B5B95] hover:bg-[#6B5B95] hover:text-white text-lg px-8 py-3 font-orbitron">
                    <History className="mr-2 h-5 w-5" />
                    View History
                  </Button>
                </Link>
              </div>
            ) : (
              <Link href="/auth">
                <Button size="lg" className="bg-gradient-to-r from-[#00B7EB] to-[#6B5B95] hover:from-[#6B5B95] hover:to-[#00B7EB] text-white text-lg px-8 py-3 font-orbitron">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 font-orbitron">
            Explore the Universe
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black/40 border-[#6B5B95] backdrop-blur-sm hover:border-[#00B7EB] transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#00B7EB]/20 flex items-center justify-center mb-4">
                  <Map className="h-6 w-6 text-[#00B7EB]" />
                </div>
                <CardTitle className="text-white font-orbitron">Interactive Star Map</CardTitle>
                <CardDescription className="text-gray-300">
                  Navigate through an accurate representation of the night sky with real-time positioning.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-[#6B5B95] backdrop-blur-sm hover:border-[#00B7EB] transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#6B5B95]/20 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-[#6B5B95]" />
                </div>
                <CardTitle className="text-white font-orbitron">Celestial Database</CardTitle>
                <CardDescription className="text-gray-300">
                  Access detailed information about stars, constellations, and other celestial objects.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-[#6B5B95] backdrop-blur-sm hover:border-[#00B7EB] transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#00B7EB]/20 flex items-center justify-center mb-4">
                  <History className="h-6 w-6 text-[#00B7EB]" />
                </div>
                <CardTitle className="text-white font-orbitron">Observation Tracking</CardTitle>
                <CardDescription className="text-gray-300">
                  Keep track of your astronomical observations and build your personal stargazing log.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
