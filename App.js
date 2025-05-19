npm install @supabase/supabase-js
// PostEvaluation.js
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { ShieldCheck, Trophy, Star, BadgeCheck } from "lucide-react";

const supabaseUrl = "https://gcnbnfslimduochpoynf.supabase.co";
const supabaseKey = "F@milia123"; // substitua pela sua anon key
const supabase = createClient(supabaseUrl, supabaseKey);

export default function PostEvaluation() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const { data, error } = await supabase
        .from("perguntas")
        .select("*")
        .eq("etapa", "pos");

      if (error) {
        console.error("Erro ao buscar perguntas:", error);
      } else {
        setQuestions(data);
      }
    }

    fetchQuestions();
  }, []);

  const getIcon = (elemento) => {
    const icons = {
      usabilidade: BadgeCheck,
      valor: Trophy,
      desejabilidade: Star,
      conforto: ShieldCheck,
      adaptabilidade: BadgeCheck,
    };
    return icons[elemento] || Star;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-6 text-indigo-800"
      >
        🌟 Missão Final: Avaliação da sua Jornada com TDICs 🌟
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {questions.map((q) => {
          const Icon = getIcon(q.elemento);
          return (
            <div
              key={q.id}
              className="bg-white rounded-lg shadow-xl hover:scale-105 transition-transform p-4"
            >
              <div className="flex items-center gap-2 mb-2 text-indigo-700">
                <Icon className="w-5 h-5" />
                <h2 className="font-semibold text-lg capitalize">{q.elemento}</h2>
              </div>
              <p className="text-gray-700 text-sm mb-4">{q.pergunta}</p>
              <button className="w-full border rounded py-2 text-indigo-700 hover:bg-indigo-100">
                Responder missão
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
