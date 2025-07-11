import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Trash2, ArrowLeft, Calendar, Star } from "lucide-react";
import Link from "@/components/Link";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import ProtectedRoute from "@/components/ProtectedRoute";

const History = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadHistory();
  }, [user]);

  const loadHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('observations')
        .select('*')
        .eq('user_id', user.id)
        .order('observed_at', { ascending: false });

      if (error) {
        console.error('Error loading history:', error);
        toast({
          title: "Error",
          description: "Failed to load observation history",
          variant: "destructive"
        });
      } else {
        setHistory(data || []);
        setFilteredHistory(data || []);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = history;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date
    if (dateFilter) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.observed_at).toDateString();
        const filterDate = new Date(dateFilter).toDateString();
        return itemDate === filterDate;
      });
    }

    setFilteredHistory(filtered);
  }, [searchTerm, dateFilter, history]);

  const deleteItem = async (id) => {
    try {
      const { error } = await supabase
        .from('observations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting observation:', error);
        toast({
          title: "Error",
          description: "Failed to delete observation",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Deleted",
          description: "Observation removed from history",
        });
        loadHistory(); // Reload the history
      }
    } catch (error) {
      console.error('Error deleting observation:', error);
    }
  };

  const clearAllHistory = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('observations')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error clearing history:', error);
        toast({
          title: "Error",
          description: "Failed to clear observation history",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Cleared",
          description: "All observations have been removed from history",
        });
        setHistory([]);
        setFilteredHistory([]);
      }
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] to-[#0F0F1F] flex items-center justify-center">
          <div className="text-white font-orbitron">Loading history...</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] to-[#0F0F1F] relative">
        {/* Starry background */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <nav className="relative z-10 p-4 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-[#00B7EB] transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-orbitron">Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-white font-orbitron">Observation History</h1>
            <Link href="/starmap" className="text-white hover:text-[#00B7EB] transition-colors font-orbitron">
              Star Map
            </Link>
          </div>
        </nav>

        <div className="relative z-10 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-black/30 border-[#6B5B95] text-white placeholder-gray-400 focus:border-[#00B7EB] rounded-full min-w-[250px]"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="pl-10 bg-black/30 border-[#6B5B95] text-white focus:border-[#00B7EB] rounded-full"
                  />
                </div>
              </div>
              {history.length > 0 && (
                <Button
                  onClick={clearAllHistory}
                  className="bg-red-600/20 border border-red-500 text-red-400 hover:bg-red-600/40 rounded-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>

            {/* History Content */}
            {filteredHistory.length === 0 ? (
              <Card className="bg-black/40 border-[#6B5B95] backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#6B5B95]/20 flex items-center justify-center">
                    <Star className="h-12 w-12 text-[#6B5B95]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 font-orbitron">
                    {history.length === 0 ? 'No Observations Yet' : 'No Results Found'}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {history.length === 0 
                      ? 'Start exploring the star map to build your observation history!'
                      : 'Try adjusting your search filters.'}
                  </p>
                  <Link href="/starmap">
                    <Button className="bg-gradient-to-r from-[#00B7EB] to-[#6B5B95] hover:from-[#6B5B95] hover:to-[#00B7EB] text-white rounded-full font-orbitron">
                      Explore Star Map
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white font-orbitron">
                    {filteredHistory.length} Object{filteredHistory.length !== 1 ? 's' : ''} Found
                  </h2>
                </div>

                <div className="grid gap-4">
                  {filteredHistory.map((item) => (
                    <Card key={item.id} className="bg-black/40 border-[#6B5B95] backdrop-blur-sm hover:border-[#00B7EB] transition-colors">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Star className="h-5 w-5 text-[#00B7EB]" />
                              <h3 className="text-xl font-bold text-white font-orbitron">
                                {item.name}
                              </h3>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                              <div>
                                <span className="text-[#00B7EB] font-semibold text-sm">Magnitude:</span>
                                <div className="text-white">{item.magnitude}</div>
                              </div>
                              <div>
                                <span className="text-[#00B7EB] font-semibold text-sm">Distance:</span>
                                <div className="text-white">{item.distance} ly</div>
                              </div>
                              <div>
                                <span className="text-[#00B7EB] font-semibold text-sm">Observed:</span>
                                <div className="text-white text-sm">{formatDate(item.observed_at)}</div>
                              </div>
                            </div>
                            
                            <div>
                              <span className="text-[#00B7EB] font-semibold text-sm block mb-2">Description:</span>
                              <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => deleteItem(item.id)}
                            className="bg-red-600/20 border border-red-500 text-red-400 hover:bg-red-600/40 ml-4"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default History;
