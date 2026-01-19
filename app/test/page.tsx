"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supabase } from '@/app/lib/supabase'; // Import from your new file

export default function TestPage() {
  const [status, setStatus] = useState("Testing connection...");
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkConnection() {
      try {
        // Simple query to check if we can talk to Supabase
        // We select from 'projects' - make sure that table exists!
        // If 'projects' is empty, it will return [] (which is a success)
        const { data, error } = await supabase.from("projects").select("*").limit(1);

        if (error) {
          setStatus("Connection Failed ❌");
          setError(error.message);
          console.error("Supabase Error:", error);
        } else {
          setStatus("Connection Successful! ✅");
          console.log("Data received:", data);
        }
      } catch (err: any) {
        setStatus("Code Error ❌");
        setError(err.message);
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="p-20 font-sans">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      <div className={`p-4 rounded-lg border-2 ${error ? "border-red-500 bg-red-50" : "border-green-500 bg-green-50"}`}>
        <p className="font-bold text-xl">{status}</p>
        {error && (
          <div className="mt-4">
            <p className="font-bold">Error Details:</p>
            <code className="block bg-black text-white p-4 mt-2 rounded">
              {error}
            </code>
          </div>
        )}
      </div>
    </div>
  );
}