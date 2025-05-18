npm install framer-motion
npm install lucide-react


import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="/logo LEEM.png" // Substitua pelo caminho da sua imagem real
          alt="Logo LEEM"
          className="w-28 h-28 mb-6"
        />
      </motion.div>

      {/* Título */}
      <motion.h1
        className="text-2xl md:text-3xl font-semibold text-blue-700 text-center mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Laboratório de Experiência em Ensino Mediado
      </motion.h1>

      <div className="w-20 border-b-2 border-blue-600 mb-4"></div>

      {/* Objetivo */}
      <motion.div
        className="text-center text-gray-700 max-w-xl mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-blue-700 font-semibold text-lg mb-2">Objetivo</h2>
        <p>
          O LEEM tem como objetivo avaliar a experiência do aprendiz ao usar
          Tecnologia Digital de comunicação e informação.
        </p>
        <p className="mt-2">
          Este questionário está dividido em quatro etapas para compreender sua
          experiência completa.
        </p>
      </motion.div>

      {/* Como funciona */}
      <motion.div
        className="bg-blue-50 border border-blue-100 rounded-xl p-5 w-full max-w-md shadow-md mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-blue-700 font-semibold text-lg mb-3">
          Como funciona:
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            Responda cada pergunta para desbloquear a próxima
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            Ganhe pontos de experiência (XP) ao completar perguntas
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            Veja seu progresso e pontuação no dashboard final
          </li>
        </ul>
      </motion.div>

      {/* Botão */}
      <motion.button
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-2 rounded-full shadow-md transition duration-300"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        Iniciar Questionário
      </motion.button>
    </div>
  );
}
