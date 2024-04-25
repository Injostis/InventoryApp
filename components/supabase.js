import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://webygufnjsnhtxgbsdcy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlYnlndWZuanNuaHR4Z2JzZGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1ODU2MjgsImV4cCI6MjAyOTE2MTYyOH0.JB7F4oOfBTAaftUMOhRDgq6qbImYNqAzIT1waq5DKJs";
export const supabase = createClient(supabaseUrl, supabaseKey);
